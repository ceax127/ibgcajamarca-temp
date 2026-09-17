import { app, InvocationContext, Timer } from '@azure/functions'
import { loadPollConfig } from '../lib/config'
import { writeSermonsCache } from '../lib/storage'
import { buildSermonsData } from '../lib/youtube'

export async function pollYouTube(timer: Timer, context: InvocationContext): Promise<void> {
  try {
    const config = loadPollConfig()
    const data = await buildSermonsData(config)
    await writeSermonsCache(data)
    context.log(
      `Sermons cache updated: live=${data.live ? data.live.videoId : 'none'}, playlists=${data.playlists.length}`,
    )
  } catch (err) {
    // Never throw out of a timer trigger over a transient YouTube/network
    // issue — log it and let getSermons keep serving the last good cache
    // until the next poll succeeds.
    context.error('pollYouTube failed', err)
  }
}

app.timer('pollYouTube', {
  // Every 5 minutes. Quota cost per run: ~1 unit for live verification (only
  // when a live candidate is found) + 1 unit per configured playlist — well
  // under the default 10,000/day YouTube Data API quota even at this cadence.
  schedule: '0 */5 * * * *',
  handler: pollYouTube,
})
