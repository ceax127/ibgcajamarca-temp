import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seo from '../data/seo.json'

type SeoPath = keyof typeof seo.pages

/** Title and description for a top-level page, from src/data/seo.json (shared with the build-time prerender). */
export function seoFor(path: SeoPath, lang: 'es' | 'en') {
  return seo.pages[path][lang]
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * Sets the page's title, description, canonical URL and social-preview tags.
 * This is an SPA, so without it every route would share index.html's head and
 * look identical to search engines. The canonical always points at the
 * current route, never at the homepage, so inner pages aren't treated as
 * duplicates of it. Title/description are restored on unmount so a route
 * change never shows the previous page's values in between.
 */
export function usePageMeta(title: string, description?: string, options?: { noIndex?: boolean }) {
  const noIndex = options?.noIndex ?? false
  const { pathname } = useLocation()

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const descTag = description ? document.querySelector('meta[name="description"]') : null
    const previousDescription = descTag?.getAttribute('content') ?? null
    if (descTag && description) descTag.setAttribute('content', description)

    const url = `${seo.siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    if (description) {
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }

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
  }, [title, description, noIndex, pathname])
}
