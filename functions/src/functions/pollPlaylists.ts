import { app, InvocationContext, Timer } from '@azure/functions'
import { loadPollConfig } from '../lib/config'
import { updateSermonsCache } from '../lib/storage'
import { fetchAllPlaylists } from '../lib/youtube'

export async function pollPlaylists(timer: Timer, context: InvocationContext): Promise<void> {
  try {
    const config = loadPollConfig()
    const playlists = await fetchAllPlaylists(config)
    await updateSermonsCache({ playlists })
    context.log(`Playlists updated: ${playlists.length} (${playlists.map((p) => p.videos.length).join(', ')} videos)`)
  } catch (err) {
    context.error('pollPlaylists failed', err)
  }
}

app.timer('pollPlaylists', {
  // New sermons only get uploaded roughly once a week — every 6 hours is
  // plenty to catch that promptly without polling YouTube all day for
  // content that essentially never changes between Sundays.
  schedule: '0 0 */6 * * *',
  handler: pollPlaylists,
})
