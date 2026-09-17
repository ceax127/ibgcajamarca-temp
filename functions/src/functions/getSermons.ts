import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { readSermonsCache } from '../lib/storage'
import type { SermonsData } from '../lib/types'

const EMPTY_DATA: SermonsData = { live: null, playlists: [], updatedAt: null }

function corsHeaders(): Record<string, string> {
  // Public, read-only church content — no auth, no cookies, so a permissive
  // origin is safe. Set ALLOWED_ORIGIN as an app setting to lock it down to
  // the site's real domain once it's live.
  const origin = process.env.ALLOWED_ORIGIN || '*'
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, max-age=30',
  }
}

export async function getSermons(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders() }
  }

  try {
    const data = await readSermonsCache()
    return {
      status: 200,
      jsonBody: data ?? EMPTY_DATA,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    }
  } catch (err) {
    // Cache not readable (e.g. storage hiccup, or pollYouTube hasn't run
    // yet) — return an empty-but-valid payload rather than an error, so the
    // frontend just shows "not live" instead of breaking.
    context.error('getSermons failed to read cache', err)
    return {
      status: 200,
      jsonBody: EMPTY_DATA,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    }
  }
}

app.http('getSermons', {
  route: 'sermons',
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: getSermons,
})
