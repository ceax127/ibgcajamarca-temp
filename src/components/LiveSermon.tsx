import { useLanguage } from '../context/LanguageContext'
import { churchInfo } from '../data/config'
import { useSermonsData } from '../hooks/useSermonsData'

/**
 * Shows the church's current YouTube live stream (if any) and curated
 * playlists of past sermons. Data comes from useSermonsData, which polls a
 * standalone Azure Function (functions/) that itself polls YouTube on a
 * timer — see functions/README.md. This component never calls YouTube
 * directly, so there's no API key exposed to the browser and no per-visitor
 * YouTube quota usage.
 *
 * `variant="compact"` (home page teaser) shows only the live/latest video.
 * `variant="full"` (Sermons page) also lists the curated playlists.
 */
export function LiveSermon({ variant = 'full' }: { variant?: 'compact' | 'full' }) {
  const { t, lang } = useLanguage()
  const { data } = useSermonsData()

  const hasAnyContent = data.live || data.playlists.length > 0

  if (!hasAnyContent) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-8 text-center">
        <p className="text-slate-600">{t.sermons.notConfigured}</p>
        <a
          href={churchInfo.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          {t.sermons.visitChannel}
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        {data.live ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-950 shadow-lg">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${data.live.videoId}?autoplay=0`}
              title={data.live.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-brand-950 p-8 text-center shadow-lg">
            <p className="text-brand-100">{t.sermons.notLive}</p>
          </div>
        )}
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          {data.live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {t.sermons.liveBadge}
            </span>
          )}
          <p className="text-slate-500">{data.live ? data.live.title : t.sermons.liveDescription}</p>
        </div>
      </div>

      {variant === 'full' && data.playlists.length > 0 && (
        <div className="flex flex-col gap-8">
          {data.playlists.map((playlist) => (
            <div key={playlist.id}>
              <h3 className="mb-4 text-xl font-semibold text-brand-950">
                {playlist.kind === 'uploads' ? t.sermons.pastSermons : playlist.label}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {playlist.videos.map((video) => (
                  <a
                    key={video.videoId}
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-3">
                      <p className="line-clamp-2 text-sm font-medium text-brand-950">{video.title}</p>
                      <p className="mt-auto text-xs text-slate-500">
                        {new Date(video.publishedAt).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
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
