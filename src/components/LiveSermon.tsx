import { useLanguage } from '../context/LanguageContext'
import { churchInfo, YOUTUBE_CHANNEL_ID, youtubeUploadsPlaylistId } from '../data/config'

/**
 * Shows the church's current YouTube live stream, if any, using YouTube's own
 * "live_stream" embed endpoint — it automatically swaps to whatever the
 * channel is broadcasting live, with no polling or API key needed. When
 * nothing is live, YouTube's own player shows its "offline" state.
 *
 * `variant="compact"` is used on the home page teaser; `variant="full"` adds
 * the past-sermons playlist underneath, used on the Sermons page.
 */
export function LiveSermon({ variant = 'full' }: { variant?: 'compact' | 'full' }) {
  const { t } = useLanguage()

  if (!YOUTUBE_CHANNEL_ID) {
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
    <div className="flex flex-col gap-6">
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-950 shadow-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}`}
            title={t.sermons.liveNow}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-center text-sm text-slate-500">{t.sermons.notLive}</p>
      </div>

      {variant === 'full' && youtubeUploadsPlaylistId && (
        <div>
          <h3 className="mb-3 text-xl font-semibold text-brand-950">{t.sermons.pastSermons}</h3>
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-950 shadow-lg">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/videoseries?list=${youtubeUploadsPlaylistId}`}
              title={t.sermons.pastSermons}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
