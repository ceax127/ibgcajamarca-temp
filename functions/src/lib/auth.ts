import { createHash, timingSafeEqual } from 'node:crypto'
import type { HttpRequest } from '@azure/functions'

function sha256(value: string): Buffer {
  return createHash('sha256').update(value).digest()
}

function safeEqual(a: string, b: string): boolean {
  // Hash first so the buffers are always the same length (timingSafeEqual
  // throws otherwise) and comparison time doesn't leak the real value's length.
  return timingSafeEqual(sha256(a), sha256(b))
}

/**
 * Checks HTTP Basic credentials against the ADMIN_USER / ADMIN_PASSWORD app
 * settings. Fails closed: if either setting is missing, nobody gets in. On a
 * wrong attempt it waits briefly, which makes guessing passwords against the
 * public endpoint impractically slow without needing any rate-limit storage.
 */
export async function isAuthorized(request: HttpRequest): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USER
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedUser || !expectedPassword) return false

  const header = request.headers.get('authorization') ?? ''
  const match = header.match(/^Basic\s+(.+)$/i)
  let ok = false
  if (match) {
    const decoded = Buffer.from(match[1], 'base64').toString('utf-8')
    const separator = decoded.indexOf(':')
    if (separator !== -1) {
      const user = decoded.slice(0, separator)
      const password = decoded.slice(separator + 1)
      ok = safeEqual(user, expectedUser) && safeEqual(password, expectedPassword)
    }
  }

  if (!ok) await new Promise((resolve) => setTimeout(resolve, 800))
  return ok
}
