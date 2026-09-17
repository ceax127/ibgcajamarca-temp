import type { PollConfig } from './youtube'

export function loadPollConfig(): PollConfig {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  const playlistsJson = process.env.YOUTUBE_PLAYLISTS_JSON

  if (!apiKey) throw new Error('Missing app setting: YOUTUBE_API_KEY')
  if (!channelId) throw new Error('Missing app setting: YOUTUBE_CHANNEL_ID')

  let playlists: { id: string; label: string }[] = []
  if (playlistsJson) {
    try {
      playlists = JSON.parse(playlistsJson)
    } catch {
      throw new Error('YOUTUBE_PLAYLISTS_JSON is not valid JSON')
    }
  }

  return { apiKey, channelId, playlists }
}
