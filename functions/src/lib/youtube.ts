import type { LiveInfo, SermonPlaylist, SermonVideo } from './types'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

/**
 * Checks whether the channel is live right now via the official
 * `search.list` endpoint (100 quota units/call).
 *
 * A previous version used a free HTML-scraping trick (fetching
 * youtube.com/channel/<id>/live and parsing the redirect) specifically to
 * avoid this cost, since the old polling schedule ran 24/7. That trick
 * turned out to be unreliable when called from a cloud/datacenter IP (like
 * Azure's) — YouTube frequently serves those a consent or bot-check page
 * instead of the real redirect, so live streams went undetected. Now that
 * this only runs within the Sunday service window (see schedule.ts), the
 * official API's cost is trivial: at most ~48 calls in a 4-hour window
 * (4,800 units), once a week, against a 10,000/day quota — so there's no
 * reason to keep the fragile workaround.
 */
export async function getLiveInfo(apiKey: string, channelId: string): Promise<LiveInfo | null> {
  const url = new URL(`${YOUTUBE_API_BASE}/search`)
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('eventType', 'live')
  url.searchParams.set('type', 'video')
  url.searchParams.set('key', apiKey)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`YouTube search.list failed: ${res.status}`)
  const json = (await res.json()) as {
    items?: {
      id: { videoId?: string }
      snippet: { title: string; thumbnails?: Record<string, { url: string }> }
    }[]
  }
  const item = json.items?.[0]
  if (!item?.id.videoId) return null

  return {
    videoId: item.id.videoId,
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
