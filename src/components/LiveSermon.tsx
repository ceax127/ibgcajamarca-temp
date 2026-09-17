import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { useSermonsData } from '../hooks/useSermonsData'

/**
 * Shows the church's current YouTube live stream when (and only when)
 * they're actually live, plus curated playlists of past sermons. Data comes
 * from useSermonsData, which polls a standalone Azure Function (functions/)
 * that itself polls YouTube on a timer — see functions/README.md. This
 * component never calls YouTube directly, so there's no API key exposed to
 * the browser and no per-visitor YouTube quota usage.
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
              src={`https://www.youtube.com/embed/${data.live.videoId}?autoplay=0`}
              title={data.live.title}
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
        <a
          href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-3 transition-shadow hover:shadow-md dark:border-night-700 dark:bg-night-900"
        >
          <div className="aspect-video w-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-night-800">
            <img
              src={latestVideo.thumbnail}
              alt={latestVideo.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
              {t.sermons.latestSermon}
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium text-brand-950 dark:text-white">
              {latestVideo.title}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-night-400">{formatDate(latestVideo.publishedAt)}</p>
          </div>
        </a>
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
                  <a
                    key={video.videoId}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-md dark:border-night-700 dark:bg-night-900 dark:hover:shadow-night-800"
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
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
