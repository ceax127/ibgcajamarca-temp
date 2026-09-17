import { useEffect, useRef, useState } from 'react'
import generatedSermons from '../data/sermons.generated.json'
import { SERMONS_API_URL, SERMONS_POLL_INTERVAL_MS } from '../data/config'
import type { SermonsData } from '../types/sermons'

// Seed state from the build-time snapshot (src/data/sermons.generated.json,
// written by scripts/fetch-sermons.mjs) so the page has real content to
// paint immediately, even before the first fetch to the Azure Function
// resolves — and still has *something* if that fetch fails entirely.
const initialData = generatedSermons as SermonsData

/**
 * Fetches live/sermon data from the Azure Function (functions/src/functions/getSermons.ts)
 * and re-polls it periodically so the "live now" state updates without a
 * page reload. Falls back to (and never errors past) the build-time snapshot.
 */
export function useSermonsData() {
  const [data, setData] = useState<SermonsData>(initialData)
  const [error, setError] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    async function poll() {
      try {
        const res = await fetch(SERMONS_API_URL, { signal: AbortSignal.timeout(8000) })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as SermonsData
        if (isMounted.current) {
          setData(json)
          setError(false)
        }
      } catch {
        // Keep showing the last known-good data (build-time snapshot or a
        // previous successful poll) — never blank the page over a network hiccup.
        if (isMounted.current) setError(true)
      }
    }

    poll()
    const interval = setInterval(poll, SERMONS_POLL_INTERVAL_MS)

    return () => {
      isMounted.current = false
      clearInterval(interval)
    }
  }, [])

  return { data, error }
}
