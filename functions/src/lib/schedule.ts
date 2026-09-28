// Cajamarca, Perú is UTC-5 year-round (no daylight saving), so this offset
// is safe to hardcode — no timezone database or Azure app-setting needed.
const LIMA_UTC_OFFSET_HOURS = -5

function toLimaTime(date: Date): { day: number; hour: number; minute: number } {
  const limaMs = date.getTime() + LIMA_UTC_OFFSET_HOURS * 60 * 60 * 1000
  const lima = new Date(limaMs)
  // getUTCDay/Hours/Minutes on a shifted timestamp = Lima local values.
  return { day: lima.getUTCDay(), hour: lima.getUTCHours(), minute: lima.getUTCMinutes() }
}

/**
 * True during the church's Sunday service window (Lima time), roughly
 * 9:00am–1:00pm to cover the 10am service plus setup/overrun buffer. Used
 * to skip YouTube live-status calls the rest of the week, since the church
 * only streams live on Sundays.
 */
export function isWithinSundayLiveWindow(date: Date = new Date()): boolean {
  const { day, hour } = toLimaTime(date)
  return day === 0 && hour >= 9 && hour < 13
}

/**
 * True once per hour, on the hour, every day of the week, 10am–10pm Lima —
 * a baseline safety net in case an off-schedule event (a special weekday
 * service, a seminar, an early/late Sunday stream outside its own window)
 * goes live. The timer itself still fires every 5 minutes (see
 * pollLiveStatus.ts); the `minute === 0` check is what limits actual
 * YouTube calls to once/hour here. Sunday gets this same hourly baseline
 * plus the tighter every-5-minutes window below during the service itself.
 */
export function isHourlyCheck(date: Date = new Date()): boolean {
  const { hour, minute } = toLimaTime(date)
  return hour >= 10 && hour <= 22 && minute === 0
}

/** Whether pollLiveStatus should call YouTube on this invocation. */
export function shouldCheckLiveStatus(date: Date = new Date()): boolean {
  return isWithinSundayLiveWindow(date) || isHourlyCheck(date)
}
