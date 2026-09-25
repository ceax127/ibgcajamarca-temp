import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { useSermonsData } from '../hooks/useSermonsData'
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
 * - `variant="full"` (Sermons page): live video when live, otherwise
 *   straight to the playlists — no placeholder in between.
 */
export function LiveSermon({ variant = 'full' }: { variant?: 'compact' | 'full' }) {
  const { t, lang } = useLanguage()
  const { data } = useSermonsData()
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null)

  const hasAnyContent = data.live || data.playlists.some((p) => p.videos.length > 0)

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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  const latestVideo = data.playlists.find((p) => p.kind === 'uploads')?.videos[0]

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

      {!data.live && variant === 'compact' && latestVideo && (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:border-brand-300 hover:shadow-md dark:border-night-800 dark:bg-night-900 dark:hover:border-gold-500/40 sm:flex-row">
          <button
            type="button"
            onClick={() => setModalVideo(latestVideo)}
            aria-label={t.sermons.watchSermon}
            className="relative aspect-video w-full flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-night-800 sm:w-5/12"
          >
            <img
              src={latestVideo.thumbnail}
              alt={latestVideo.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-lg transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                  <path d="M8 5v14l11-7Z" />
                </svg>
              </span>
            </div>
          </button>
          <div className="flex flex-1 flex-col justify-center gap-2 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
              {t.sermons.latestSermon}
            </p>
            <p className="line-clamp-2 text-lg font-semibold text-brand-950 dark:text-white">{latestVideo.title}</p>
            <p className="text-sm text-slate-500 dark:text-night-400">{formatDate(latestVideo.publishedAt)}</p>
            <button
              type="button"
              onClick={() => setModalVideo(latestVideo)}
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
            >
              {t.sermons.watchSermon} →
            </button>
          </div>
        </div>
      )}

      {variant === 'full' && data.playlists.length > 0 && (
        <div className="flex flex-col gap-8">
          {data.playlists.map((playlist) => (
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
                    <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-night-800">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-3">
                      <p className="line-clamp-2 text-sm font-medium text-brand-950 dark:text-white">{video.title}</p>
                      <p className="mt-auto text-xs text-slate-500 dark:text-night-400">
                        {formatDate(video.publishedAt)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
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
