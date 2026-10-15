import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { googleAds } from '../data/config'
import { trackConversion } from '../hooks/useTrackConversion'

// The site is a single-page app, so Google's "paste this on the conversion
// page" snippet can't just sit in the HTML: the page never reloads. Instead
// the page-view conversion is sent each time the visitor lands on the
// configured route.
export function ConversionTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === googleAds.pageView.path) trackConversion(googleAds.pageView.sendTo)
  }, [pathname])

  return null
}
