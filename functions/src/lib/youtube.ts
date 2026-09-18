import type { LiveInfo, SermonPlaylist, SermonVideo } from './types'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

/**
 * Finds the video ID YouTube's own "/channel/<id>/live" page currently
 * resolves to, without spending any YouTube Data API quota (it's a plain
 * HTML fetch, not an API call — the official `search.list` endpoint that
 * finds live broadcasts costs 100 quota units per call against a default
 * daily quota of 10,000, which a 5-minute poll would exhaust in under an
 * hour). This alone isn't proof the channel is live *right now* — YouTube's
 * "/live" page can also resolve to the most recent broadcast after it has
 * ended — so callers must verify with getLiveInfo() below.
 */
async function findLiveCandidateVideoId(channelId: string): Promise<string | null> {
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

/**
 * Confirms actual live status (1 quota unit) for the candidate video found
 * above. Returns null if the channel isn't live right now.
 */
export async function getLiveInfo(apiKey: string, channelId: string): Promise<LiveInfo | null> {
  const candidateId = await findLiveCandidateVideoId(channelId)
  if (!candidateId) return null

  const url = new URL(`${YOUTUBE_API_BASE}/videos`)
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('id', candidateId)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`YouTube videos.list failed: ${res.status}`)
  const json = (await res.json()) as {
    items?: { snippet: { title: string; liveBroadcastContent: string; thumbnails?: Record<string, { url: string }> } }[]
  }
  const item = json.items?.[0]
  if (!item || item.snippet.liveBroadcastContent !== 'live') return null

  return {
    videoId: candidateId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? '',
  }
}

/**
 * Fetches videos in a playlist (1 quota unit per call).
 *
 * `order`:
 * - "newest-first" (used for the channel's auto "uploads" playlist): most
 *   recently published video first — that's what "past sermons" should
 *   show.
 * - "playlist-order" (used for curated series playlists, e.g. a Bible book
 *   study): the order the channel owner actually arranged the playlist in
 *   (YouTube's playlistItems.list already returns items in that order), so
 *   a series plays chapter 1, 2, 3... instead of newest-uploaded-first.
 */
export async function getPlaylistVideos(
  apiKey: string,
  playlistId: string,
  maxResults = 8,
  order: 'newest-first' | 'playlist-order' = 'newest-first',
): Promise<SermonVideo[]> {
  const url = new URL(`${YOUTUBE_API_BASE}/playlistItems`)
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('playlistId', playlistId)
  url.searchParams.set('maxResults', String(maxResults))
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`YouTube playlistItems.list failed for ${playlistId}: ${res.status}`)
  const json = (await res.json()) as {
    items?: {
      snippet: {
        title: string
        publishedAt: string
        resourceId?: { videoId?: string }
        thumbnails?: Record<string, { url: string }>
      }
    }[]
  }

  const videos = (json.items ?? [])
    .filter((item) => item.snippet.resourceId?.videoId)
    .filter((item) => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
    .map((item) => ({
      videoId: item.snippet.resourceId!.videoId!,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? '',
      publishedAt: item.snippet.publishedAt,
    }))

  if (order === 'newest-first') {
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }
  return videos
}

export interface PollConfig {
  apiKey: string
  channelId: string
  playlists: { id: string; label: string }[]
}

// Every channel has an auto-generated "uploads" playlist: swap the leading
// "UC" of the channel ID for "UU" to get its ID. Fetching it (1 quota unit)
// is how we surface recent past live streams — once a broadcast ends,
// YouTube files it there as a normal video — without the 100-unit cost of
// search.list.
export function uploadsPlaylistId(channelId: string): string {
  return `UU${channelId.slice(2)}`
}

/** Fetches the auto "uploads" playlist plus every configured curated playlist. */
export async function fetchAllPlaylists(config: PollConfig): Promise<SermonPlaylist[]> {
  const [uploadsVideos, curatedPlaylists] = await Promise.all([
    getPlaylistVideos(config.apiKey, uploadsPlaylistId(config.channelId), 8, 'newest-first').catch(() => []),
    Promise.all(
      config.playlists.map(
        async (playlist): Promise<SermonPlaylist> => ({
          id: playlist.id,
          label: playlist.label,
          kind: 'curated',
          videos: await getPlaylistVideos(config.apiKey, playlist.id, 8, 'playlist-order').catch(() => []),
        }),
      ),
    ),
  ])

  const uploadsPlaylist: SermonPlaylist = {
    id: uploadsPlaylistId(config.channelId),
    label: 'uploads',
    kind: 'uploads',
    videos: uploadsVideos,
  }

  return [uploadsPlaylist, ...curatedPlaylists]
}
