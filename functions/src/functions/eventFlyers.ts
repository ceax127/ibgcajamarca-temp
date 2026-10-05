import { randomUUID } from 'node:crypto'
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { isAuthorized } from '../lib/auth'
import {
  type EventFlyer,
  addFlyer,
  isActive,
  readFlyerImage,
  readFlyers,
  removeFlyer,
} from '../lib/flyers'

const MAX_IMAGE_BYTES = 3 * 1024 * 1024
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function toPublic(flyer: EventFlyer) {
  const { id, title, link, startDate, endDate } = flyer
  return { id, title, link, startDate, endDate }
}

export async function listActiveFlyers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders() }
  try {
    const flyers = (await readFlyers()).filter((f) => isActive(f)).map(toPublic)
    return {
      status: 200,
      jsonBody: { events: flyers },
      headers: { ...corsHeaders(), 'Cache-Control': 'public, max-age=60' },
    }
  } catch (err) {
    // Never break the homepage over this — no flyers is a valid state.
    context.error('listActiveFlyers failed', err)
    return { status: 200, jsonBody: { events: [] }, headers: corsHeaders() }
  }
}

export async function getFlyerImage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders() }
  const id = request.params.id ?? ''
  if (!/^[a-f0-9-]{36}$/.test(id)) return { status: 404, headers: corsHeaders() }
  try {
    const image = await readFlyerImage(id)
    if (!image) return { status: 404, headers: corsHeaders() }
    return {
      status: 200,
      body: image,
      headers: { ...corsHeaders(), 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' },
    }
  } catch (err) {
    context.error('getFlyerImage failed', err)
    return { status: 500, headers: corsHeaders() }
  }
}

export async function adminListFlyers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders() }
  if (!(await isAuthorized(request))) return { status: 401, jsonBody: { error: 'unauthorized' }, headers: corsHeaders() }
  try {
    const flyers = (await readFlyers()).map((f) => ({ ...toPublic(f), active: isActive(f) }))
    return { status: 200, jsonBody: { events: flyers }, headers: { ...corsHeaders(), 'Cache-Control': 'no-store' } }
  } catch (err) {
    context.error('adminListFlyers failed', err)
    return { status: 500, jsonBody: { error: 'storage_failed' }, headers: corsHeaders() }
  }
}

interface CreatePayload {
  title?: string
  link?: string
  startDate?: string
  endDate?: string
  image?: string // base64-encoded JPEG (the admin page resizes + re-encodes before upload)
}

export async function adminCreateFlyer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders() }
  if (!(await isAuthorized(request))) return { status: 401, jsonBody: { error: 'unauthorized' }, headers: corsHeaders() }

  let payload: CreatePayload
  try {
    payload = (await request.json()) as CreatePayload
  } catch {
    return { status: 400, jsonBody: { error: 'invalid_json' }, headers: corsHeaders() }
  }

  const title = (payload.title ?? '').trim().slice(0, 120)
  const link = (payload.link ?? '').trim().slice(0, 500)
  const startDate = payload.startDate ?? ''
  const endDate = payload.endDate ?? ''
  const image = Buffer.from(payload.image ?? '', 'base64')

  if (!title || !DATE_PATTERN.test(startDate) || !DATE_PATTERN.test(endDate) || endDate < startDate) {
    return { status: 400, jsonBody: { error: 'invalid_input' }, headers: corsHeaders() }
  }
  if (link && !/^https?:\/\//i.test(link)) {
    return { status: 400, jsonBody: { error: 'invalid_link' }, headers: corsHeaders() }
  }
  const isJpeg = image.length > 3 && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff
  if (!isJpeg || image.length > MAX_IMAGE_BYTES) {
    return { status: 400, jsonBody: { error: 'invalid_image' }, headers: corsHeaders() }
  }

  const flyer: EventFlyer = {
    id: randomUUID(),
    title,
    link,
    startDate,
    endDate,
    createdAt: new Date().toISOString(),
  }

  try {
    await addFlyer(flyer, image)
    return { status: 201, jsonBody: { event: toPublic(flyer) }, headers: corsHeaders() }
  } catch (err) {
    context.error('adminCreateFlyer failed', err)
    return { status: 500, jsonBody: { error: 'storage_failed' }, headers: corsHeaders() }
  }
}

export async function adminDeleteFlyer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders() }
  if (!(await isAuthorized(request))) return { status: 401, jsonBody: { error: 'unauthorized' }, headers: corsHeaders() }

  const id = request.params.id ?? ''
  if (!/^[a-f0-9-]{36}$/.test(id)) return { status: 404, jsonBody: { error: 'not_found' }, headers: corsHeaders() }

  try {
    const removed = await removeFlyer(id)
    return removed
      ? { status: 200, jsonBody: { ok: true }, headers: corsHeaders() }
      : { status: 404, jsonBody: { error: 'not_found' }, headers: corsHeaders() }
  } catch (err) {
    context.error('adminDeleteFlyer failed', err)
    return { status: 500, jsonBody: { error: 'storage_failed' }, headers: corsHeaders() }
  }
}

app.http('listActiveFlyers', {
  route: 'events',
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: listActiveFlyers,
})

app.http('getFlyerImage', {
  route: 'events/{id}/image',
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: getFlyerImage,
})

app.http('adminListFlyers', {
  route: 'manage/events',
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: adminListFlyers,
})

app.http('adminCreateFlyer', {
  route: 'manage/events',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: adminCreateFlyer,
})

app.http('adminDeleteFlyer', {
  route: 'manage/events/{id}',
  methods: ['DELETE', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: adminDeleteFlyer,
})
