import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../data/config'

export interface EventFlyer {
  id: string
  title: string
  link: string
  details: string
  startDate: string
  endDate: string
  // Changes when the flyer is edited, so a replaced image isn't served from cache.
  version: string
}

export const flyerImageUrl = (id: string, version = '') =>
  `${API_BASE_URL}/events/${id}/image${version ? `?v=${encodeURIComponent(version)}` : ''}`

/**
 * Currently-active monthly event flyers (managed from /admin/eventos). A
 * failed or empty response just means "no flyers" — the homepage hero then
 * renders exactly as it did before this feature existed.
 */
export function useEventFlyers() {
  const [flyers, setFlyers] = useState<EventFlyer[]>([])

  useEffect(() => {
    let cancelled = false
    // 'no-cache' makes the browser re-check with the server every time, so an
    // edit or removal in /admin/eventos shows on the next page load instead of
    // after the server's 60s max-age. The payload is tiny.
    fetch(`${API_BASE_URL}/events`, { cache: 'no-cache', signal: AbortSignal.timeout(8000) })
      .then((res) => (res.ok ? res.json() : { events: [] }))
      .then((json: { events?: EventFlyer[] }) => {
        if (!cancelled) setFlyers(json.events ?? [])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return flyers
}
