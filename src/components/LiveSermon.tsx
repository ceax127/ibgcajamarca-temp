import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { useSermonsData } from '../hooks/useSermonsData'
import type { SermonVideo } from '../types/sermons'
import { type ModalVideo, VideoModal } from './VideoModal'

/**
 * Shows the church's current YouTube live stream when (and only when)
 * they're actually live, plus the single latest past sermon. Data comes
 * from useSermonsData, which polls a standalone Azure Function (functions/)
 * that itself polls YouTube on a timer — see functions/README.md. This
 * component never calls YouTube directly, so there's no API key exposed to
 * the browser and no per-visitor YouTube quota usage.
 *
 * Most older videos carry a third-party YouTube Content ID claim that
 * disables embedding — a restriction set on YouTube's side, not something
 * this site can work around — so only the newest sermon gets an on-site
 * player; everything older links out to the channel's own /streams page.
 *
 * The church only streams live on Sundays, so the live video block is
 * omitted entirely the rest of the time rather than showing an empty
 * placeholder every day.
 */
export function LiveSermon({ variant = 'full' }: { variant?: 'compact' | 'full' }) {
  const { t } = useLanguage()
  const { data } = useSermonsData()
  const [modalVideo, setModalVideo] = useState<ModalVideo | null>(null)

  const hasAnyContent = data.live || data.playlists.some((p) => p.videos.length > 0)

  const latestVideo = data.playlists.find((p) => p.kind === 'uploads')?.videos[0]

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
    <div className="flex flex-col gap-6">
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

      {variant === 'full' && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-night-700">
          <p className="max-w-md text-sm text-slate-600 dark:text-night-300">{t.sermons.pastSermonsNote}</p>
          <a
            href={churchInfo.youtubeStreamsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 dark:bg-gold-500 dark:text-night-950 dark:hover:bg-gold-400"
          >
            {t.sermons.watchPastSermons} ↗
          </a>
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

// Standardized 16:9 thumbnail treatment for the featured card — a uniform
// dark gradient plus a centered play icon, regardless of that video's own
// graphic style.
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
