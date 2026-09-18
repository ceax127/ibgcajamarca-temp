#!/usr/bin/env node
// Runs before `npm run build` (see package.json "prebuild"). Fetches the
// current YouTube live status + curated playlists once and writes
// src/data/sermons.generated.json, so the deployed static bundle always
// ships with real (if slightly stale) content even before the Azure
// Function (functions/) has run its first poll — and keeps working for
// local `npm run dev` without any Azure resources at all.
//
// Never fails the build: on any error (missing config, network, quota),
// it logs a warning and leaves the existing generated file untouched.

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputPath = path.join(rootDir, 'src', 'data', 'sermons.generated.json')

loadDotEnvLocal()

const apiKey = process.env.YOUTUBE_API_KEY
const channelId = process.env.YOUTUBE_CHANNEL_ID
const playlistsJson = process.env.YOUTUBE_PLAYLISTS_JSON

if (!apiKey || !channelId) {
  console.warn(
    '[fetch-sermons] YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID not set — skipping, keeping existing src/data/sermons.generated.json as-is.\n' +
      '  See functions/README.md for how to get these, and put them in a .env.local file (see .env.local.example).',
  )
  process.exit(0)
}

let playlists = []
try {
  playlists = playlistsJson ? JSON.parse(playlistsJson) : []
} catch {
  console.warn('[fetch-sermons] YOUTUBE_PLAYLISTS_JSON is not valid JSON — treating as empty.')
}

try {
  const data = await buildSermonsData({ apiKey, channelId, playlists })
  writeFileSync(outputPath, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `[fetch-sermons] Wrote ${outputPath} (live=${data.live ? data.live.videoId : 'none'}, playlists=${data.playlists.length})`,
  )
} catch (err) {
  console.warn('[fetch-sermons] Failed to fetch YouTube data, keeping existing generated file:', err.message)
}

// --- helpers (plain-JS mirror of functions/src/lib/youtube.ts) ---

function uploadsPlaylistId(channelId) {
  return `UU${channelId.slice(2)}`
}

async function buildSermonsData({ apiKey, channelId, playlists }) {
  const [live, uploadsVideos, curatedPlaylists] = await Promise.all([
    getLiveInfo(apiKey, channelId).catch(() => null),
    getPlaylistVideos(apiKey, uploadsPlaylistId(channelId), 8, 'newest-first').catch(() => []),
    Promise.all(
      playlists.map(async (p) => ({
        id: p.id,
        label: p.label,
        kind: 'curated',
        videos: await getPlaylistVideos(apiKey, p.id, 8, 'playlist-order').catch(() => []),
      })),
    ),
  ])
  const uploadsPlaylist = {
    id: uploadsPlaylistId(channelId),
    label: 'uploads',
    kind: 'uploads',
    videos: uploadsVideos,
  }
  return { live, playlists: [uploadsPlaylist, ...curatedPlaylists], updatedAt: new Date().toISOString() }
}

async function findLiveCandidateVideoId(channelId) {
  const res = await fetch(`https://www.youtube.com/channel/${channelId}/live`, {
    redirect: 'follow',
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IBGCajamarcaSermonsBot/1.0)' },
  })
  const fromRedirect = res.url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (fromRedirect) return fromRedirect[1]

  const html = await res.text()
  const fromCanonical = html.match(
    /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/,
  )
  return fromCanonical ? fromCanonical[1] : null
}

async function getLiveInfo(apiKey, channelId) {
  const candidateId = await findLiveCandidateVideoId(channelId)
  if (!candidateId) return null

  const url = new URL('https://www.googleapis.com/youtube/v3/videos')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('id', candidateId)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`YouTube videos.list failed: ${res.status}`)
  const json = await res.json()
  const item = json.items?.[0]
  if (!item || item.snippet.liveBroadcastContent !== 'live') return null

  return {
    videoId: candidateId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? '',
  }
}

async function getPlaylistVideos(apiKey, playlistId, maxResults = 8, order = 'newest-first') {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('playlistId', playlistId)
  url.searchParams.set('maxResults', String(maxResults))
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`YouTube playlistItems.list failed for ${playlistId}: ${res.status}`)
  const json = await res.json()
  const videos = (json.items ?? [])
    .filter((item) => item.snippet?.resourceId?.videoId)
    .filter((item) => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
    .map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? '',
      publishedAt: item.snippet.publishedAt,
    }))

  if (order === 'newest-first') {
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }
  return videos
}

function loadDotEnvLocal() {
  const envPath = path.join(rootDir, '.env.local')
  if (!existsSync(envPath)) return
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}
