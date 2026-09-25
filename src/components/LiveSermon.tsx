import { useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { useSermonsData } from '../hooks/useSermonsData'
import type { SermonVideo } from '../types/sermons'
import { type ModalVideo, VideoModal } from './VideoModal'

/**
 * Shows the church's current YouTube live stream when (and only when)
 * they're actually live, plus curated playlists of past sermons. Data comes
 * from useSermonsData, which polls a standalone Azure Function (functions/)
 * that itself polls YouTube on a timer — see functions/README.md. This
 * component never calls YouTube directly, so there's no API key exposed to
 * the browser and no per-visitor YouTube quota usage.
 *
 * Every past-sermon thumbnail opens an on-site VideoModal rather than
 * linking out to youtube.com — visitors watch without leaving the site.
 *
 * The church only streams live on Sundays, so the live video block is
 * omitted entirely the rest of the time rather than showing an empty
 * placeholder every day:
 * - `variant="compact"` (home page teaser): live video when live, otherwise
 *   a small "latest sermon" card instead of a full-size empty box.
 * - `variant="full"` (Sermons page): live video when live, otherwise a
 *   featured card for the newest sermon, then search/filter + playlists.
 */
export function LiveSermon({ variant = 'full' }: { variant?: 'compact' | 'full' }) {
  const { t, lang } = useLanguage()
  const { data } = useSermonsData()
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null)
  const [query, setQuery] = useState('')
  const [activePlaylist, setActivePlaylist] = useState<string>('all')

  const hasAnyContent = data.live || data.playlists.some((p) => p.videos.length > 0)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const latestVideo = data.playlists.find((p) => p.kind === 'uploads')?.videos[0]

  // Only used by variant="full": which playlists to render given the active
  // filter pill and search query, with empty-after-search playlists dropped.
  // The uploads playlist's first video is excluded here since it's already
  // shown above as the featured card — no reason to show it twice.
  const visiblePlaylists = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.playlists
      .filter((p) => activePlaylist === 'all' || p.id === activePlaylist)
      .map((p) => ({
        ...p,
        videos: p.videos
          .filter((v) => !(p.kind === 'uploads' && !data.live && v.videoId === latestVideo?.videoId))
          .filter((v) => (q ? v.title.toLowerCase().includes(q) : true)),
      }))
      .filter((p) => p.videos.length > 0)
  }, [data.playlists, activePlaylist, query, data.live, latestVideo])

  if (!hasAnyContent) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-8 text-center dark:border-night-600 dark:bg-night-900">
        <p className="text-slate-600 dark:text-night-300">{t.sermons.notConfigured}</p>
        <a
          href={churchInfo.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
        >
          {t.sermons.visitChannel}
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {data.live && (
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-950 shadow-lg dark:bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${data.live.videoId}?autoplay=0&origin=${encodeURIComponent(window.location.origin)}`}
              title={data.live.title}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {t.sermons.liveBadge}
            </span>
            <p className="text-slate-500 dark:text-night-400">{data.live.title}</p>
          </div>
        </div>
      )}

      {!data.live && latestVideo && (
        <FeaturedSermonCard video={latestVideo} label={t.sermons.latestSermon} onPlay={setModalVideo}>
          <button
            type="button"
            onClick={() => setModalVideo(latestVideo)}
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
          >
            {t.sermons.watchSermon} →
          </button>
        </FeaturedSermonCard>
      )}

      {variant === 'full' && data.playlists.length > 0 && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActivePlaylist('all')}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activePlaylist === 'all'
                    ? 'border-brand-700 bg-brand-700 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-night-950'
                    : 'border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50 dark:border-night-700 dark:text-night-300 dark:hover:border-gold-500/50 dark:hover:bg-white/5'
                }`}
              >
                {t.sermons.filterAll}
              </button>
              {data.playlists.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlaylist(p.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    activePlaylist === p.id
                      ? 'border-brand-700 bg-brand-700 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-night-950'
                      : 'border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50 dark:border-night-700 dark:text-night-300 dark:hover:border-gold-500/50 dark:hover:bg-white/5'
                  }`}
                >
                  {p.kind === 'uploads' ? t.sermons.pastSermons : p.label}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.sermons.searchPlaceholder}
              className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-night-600 dark:bg-night-800 dark:text-white dark:focus:border-gold-400 dark:focus:ring-gold-400 sm:w-64"
            />
          </div>

          {visiblePlaylists.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-night-400">{t.sermons.noResults}</p>
          ) : (
            visiblePlaylists.map((playlist) => (
              <div key={playlist.id}>
                <h3 className="mb-4 text-xl font-semibold text-brand-950 dark:text-white">
                  {playlist.kind === 'uploads' ? t.sermons.pastSermons : playlist.label}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {playlist.videos.map((video) => (
                    <button
                      key={video.videoId}
                      type="button"
                      onClick={() => setModalVideo(video)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 text-left transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:hover:border-gold-500/40"
                    >
                      <SermonThumbnail video={video} sizeClass="h-5 w-5" />
                      <div className="flex flex-1 flex-col gap-1 p-3">
                        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-brand-950 dark:text-white">
                          {video.title}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2 text-xs dark:border-night-800">
                          <span className="text-slate-500 dark:text-night-400">{formatDate(video.publishedAt)}</span>
                          <span className="font-semibold text-brand-700 transition-colors group-hover:text-brand-800 dark:text-gold-400 dark:group-hover:text-gold-300">
                            {t.sermons.watchSermon} →
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <VideoModal
        video={modalVideo}
        onClose={() => setModalVideo(null)}
        closeLabel={t.sermons.closeVideo}
        openInYoutubeLabel={t.sermons.openInYoutube}
      />
    </div>
  )
}

// Standardized 16:9 thumbnail treatment shared across mismatched YouTube
// thumbnail styles: a uniform dark gradient plus a centered play icon that
// scales on hover, so the grid reads as one system regardless of each
// video's own graphic style.
function SermonThumbnail({ video, sizeClass }: { video: SermonVideo; sizeClass: string }) {
  return (
    <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-night-800">
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className={`ml-0.5 ${sizeClass}`} fill="currentColor">
            <path d="M8 5v14l11-7Z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

function FeaturedSermonCard({
  video,
  label,
  onPlay,
  children,
}: {
  video: SermonVideo
  label: string
  onPlay: (video: SermonVideo) => void
  children: React.ReactNode
}) {
  const { lang } = useLanguage()
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:hover:border-gold-500/40 sm:flex-row">
      <button
        type="button"
        onClick={() => onPlay(video)}
        aria-label={label}
        className="w-full sm:w-5/12"
      >
        <SermonThumbnail video={video} sizeClass="h-6 w-6" />
      </button>
      <div className="flex flex-1 flex-col justify-center gap-2 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">{label}</p>
        <p className="line-clamp-2 text-lg font-semibold text-brand-950 dark:text-white">{video.title}</p>
        <p className="text-sm text-slate-500 dark:text-night-400">{formatDate(video.publishedAt)}</p>
        {children}
      </div>
    </div>
  )
}
