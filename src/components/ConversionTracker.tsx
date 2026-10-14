import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { googleAdsConversion } from '../data/config'

type Gtag = (command: 'event', name: string, params: Record<string, unknown>) => void

// The site is a single-page app, so Google's "paste this on the conversion
// page" snippet can't just sit in the HTML: the page never reloads. Instead
// the conversion event is sent each time the visitor lands on the configured
// route (base tag lives in index.html). Skipped outside production so local
// testing doesn't register fake conversions in the Google Ads account.
export function ConversionTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!import.meta.env.PROD || pathname !== googleAdsConversion.path) return
    const gtag = (window as unknown as { gtag?: Gtag }).gtag
    gtag?.('event', 'conversion', { send_to: googleAdsConversion.sendTo })
  }, [pathname])

  return null
}
