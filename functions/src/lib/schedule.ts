// Cajamarca, Perú is UTC-5 year-round (no daylight saving), so this offset
// is safe to hardcode — no timezone database or Azure app-setting needed.
const LIMA_UTC_OFFSET_HOURS = -5

/**
 * True during the church's Sunday service window (Lima time), roughly
 * 9:00am–1:00pm to cover the 10am service plus setup/overrun buffer. Used
 * to skip YouTube live-status calls the rest of the week, since the church
 * only streams live on Sundays.
 */
export function isWithinSundayLiveWindow(date: Date = new Date()): boolean {
  const limaMs = date.getTime() + LIMA_UTC_OFFSET_HOURS * 60 * 60 * 1000
  const lima = new Date(limaMs)
  const day = lima.getUTCDay() // getUTCDay on a shifted timestamp = Lima local day-of-week
  const hour = lima.getUTCHours()
  return day === 0 && hour >= 9 && hour < 13
}
