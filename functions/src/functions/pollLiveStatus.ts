import { app, InvocationContext, Timer } from '@azure/functions'
import { loadPollConfig } from '../lib/config'
import { shouldCheckLiveStatus } from '../lib/schedule'
import { updateSermonsCache } from '../lib/storage'
import { getLiveInfo } from '../lib/youtube'

export async function pollLiveStatus(timer: Timer, context: InvocationContext): Promise<void> {
  // The church streams live every Sunday (~10am service) and, occasionally,
  // a weekday event — skip the YouTube call the rest of the time rather
  // than burning quota (and log noise) checking a status that never
  // changes. The timer still fires every 5 minutes so it's actually
  // checking during the Sunday window; on weekdays shouldCheckLiveStatus()
  // only lets one call/hour through (see schedule.ts). Outside both, this
  // is a no-op.
  if (!shouldCheckLiveStatus()) return

  try {
    const config = loadPollConfig()
    const live = await getLiveInfo(config.apiKey, config.channelId)
    await updateSermonsCache({ live })
    context.log(`Live status updated: ${live ? live.videoId : 'not live'}`)
  } catch (err) {
    context.error('pollLiveStatus failed', err)
  }
}

app.timer('pollLiveStatus', {
  // Every 5 minutes, every day — the isWithinSundayLiveWindow() check above
  // is what actually restricts real work to Sunday mornings. Keeping the
  // cron itself simple (no day/hour restriction) avoids any timezone
  // ambiguity in NCRONTAB — the Lima-time window check lives in code
  // instead (see lib/schedule.ts).
  schedule: '0 */5 * * * *',
  handler: pollLiveStatus,
})
