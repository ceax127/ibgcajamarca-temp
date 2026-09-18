import { useEffect } from 'react'

/**
 * Sets a unique document title (and, optionally, the meta description) for
 * the current page — this is an SPA, so index.html's static <title> would
 * otherwise apply to every route, which hurts SEO (every page looking
 * identical to search engines) and is a worse UX for browser tabs/history.
 * Restores the previous values on unmount so navigating away doesn't leak
 * one page's title into another's brief transition state.
 */
export function usePageMeta(title: string, description?: string, options?: { noIndex?: boolean }) {
  const noIndex = options?.noIndex ?? false

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const descTag = description ? document.querySelector('meta[name="description"]') : null
    const previousDescription = descTag?.getAttribute('content') ?? null
    if (descTag && description) descTag.setAttribute('content', description)

    let robotsTag: HTMLMetaElement | null = null
    if (noIndex) {
      robotsTag = document.createElement('meta')
      robotsTag.setAttribute('name', 'robots')
      robotsTag.setAttribute('content', 'noindex')
      document.head.appendChild(robotsTag)
    }

    return () => {
      document.title = previousTitle
      if (descTag && previousDescription !== null) descTag.setAttribute('content', previousDescription)
      if (robotsTag) robotsTag.remove()
    }
  }, [title, description, noIndex])
}
