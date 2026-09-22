import { useEffect } from 'react'

export interface ModalVideo {
  videoId: string
  title: string
}

interface VideoModalProps {
  video: ModalVideo | null
  onClose: () => void
  closeLabel: string
  openInYoutubeLabel: string
}

/**
 * Plays a YouTube video in an on-site overlay instead of sending visitors
 * to youtube.com — every video thumbnail on the site opens this instead of
 * an external link, so people stay on the church's site to watch.
 */
export function VideoModal({ video, onClose, closeLabel, openInYoutubeLabel }: VideoModalProps) {
  useEffect(() => {
    if (!video) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [video, onClose])

  if (!video) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 pb-3">
          <p className="line-clamp-1 text-sm font-medium text-white">{video.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex-shrink-0 rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-xs text-white/60 hover:text-white/90 hover:underline"
        >
          {openInYoutubeLabel} ↗
        </a>
      </div>
    </div>
  )
}
