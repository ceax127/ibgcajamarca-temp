type Gtag = (command: 'event', name: string, params: Record<string, unknown>) => void

/**
 * Sends a Google Ads conversion event (the base Google tag lives in
 * index.html). A no-op outside production builds so local testing can't
 * register fake conversions in the Google Ads account.
 */
export function trackConversion(sendTo: string) {
  if (!import.meta.env.PROD) return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.('event', 'conversion', { send_to: sendTo })
}
