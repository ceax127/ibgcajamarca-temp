import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router doesn't reset scroll position on navigation by default — a
// link clicked while scrolled down the page (e.g. "Conocer más" on a
// ministry card, "Ver todos") would otherwise land on the new page at that
// same pixel offset, which usually means the bottom of a shorter page.
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Explicit "instant" so the site's global scroll-behavior: smooth
    // (meant for in-page anchor links) doesn't turn this into an animated
    // scroll — a route change should land at the top immediately.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
