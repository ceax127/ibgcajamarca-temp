// Mirrors src/types/sermons.ts on the frontend. Duplicated on purpose so
// this Function App stays a self-contained, independently deployable
// project — keep the two shapes in sync by hand.

export interface SermonVideo {
  videoId: string
  title: string
  thumbnail: string
  publishedAt: string
}

export interface SermonPlaylist {
  id: string
  label: string
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
