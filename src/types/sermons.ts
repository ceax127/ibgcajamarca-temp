// Shared shape for sermon/live data, produced by:
//  - scripts/fetch-sermons.mjs at build time (writes src/data/sermons.generated.json)
//  - functions/src/functions/pollYouTube.ts at runtime (writes to Blob Storage,
//    served by functions/src/functions/getSermons.ts)
//
// Keep this file's shape in sync with functions/src/lib/types.ts — they're
// duplicated (not imported across the two deployable projects) on purpose,
// so each project stays self-contained for deployment.

export interface SermonVideo {
  videoId: string
  title: string
  thumbnail: string
  publishedAt: string
}

export interface SermonPlaylist {
  id: string
  label: string
  // "uploads" is the channel's own auto-generated uploads list, always
  // included first — it's the only reliable way to surface recent past
  // live streams (once a broadcast ends, YouTube files it as a normal
  // upload) without expensive, quota-heavy search.list calls. "curated" is
  // one of the playlists configured via YOUTUBE_PLAYLISTS_JSON.
  kind: 'uploads' | 'curated'
  videos: SermonVideo[]
}

export interface LiveInfo {
  videoId: string
  title: string
  thumbnail: string
}

export interface SermonsData {
  live: LiveInfo | null
  playlists: SermonPlaylist[]
  updatedAt: string | null
}

export const emptySermonsData: SermonsData = {
  live: null,
  playlists: [],
  updatedAt: null,
}
