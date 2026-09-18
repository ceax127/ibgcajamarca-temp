import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { EmailClient } from '@azure/communication-email'

interface ContactPayload {
  name?: string
  email?: string
  message?: string
  // Honeypot: a hidden field real visitors never fill in. Any value here
  // means it's almost certainly a bot — accept the request (so the bot
  // doesn't learn to avoid the field) but silently skip sending the email.
  website?: string
}

function corsHeaders(): Record<string, string> {
  const origin = process.env.ALLOWED_ORIGIN || '*'
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function sendContactMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders() }
  }

  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return { status: 400, jsonBody: { error: 'invalid_json' }, headers: corsHeaders() }
  }

  if (payload.website) {
    // Honeypot tripped — pretend success, do nothing further.
    return { status: 200, jsonBody: { ok: true }, headers: corsHeaders() }
  }

  const name = (payload.name ?? '').trim().slice(0, 200)
  const email = (payload.email ?? '').trim().slice(0, 200)
  const message = (payload.message ?? '').trim().slice(0, 5000)

  if (!name || !email || !message || !isValidEmail(email)) {
    return { status: 400, jsonBody: { error: 'invalid_input' }, headers: corsHeaders() }
  }

  const connectionString = process.env.ACS_CONNECTION_STRING
  const senderAddress = process.env.ACS_SENDER_ADDRESS
  const recipientAddress = process.env.CONTACT_RECIPIENT_EMAIL

  if (!connectionString || !senderAddress || !recipientAddress) {
    context.error(
      'sendContactMessage: missing ACS_CONNECTION_STRING / ACS_SENDER_ADDRESS / CONTACT_RECIPIENT_EMAIL app setting',
    )
    return { status: 500, jsonBody: { error: 'not_configured' }, headers: corsHeaders() }
  }

  try {
    const client = new EmailClient(connectionString)
    const poller = await client.beginSend({
      senderAddress,
      content: {
        subject: `Mensaje del sitio web — ${name}`,
        plainText: `${message}\n\n— ${name} (${email})`,
      },
      recipients: { to: [{ address: recipientAddress }] },
      replyTo: [{ address: email, displayName: name }],
    })
    await poller.pollUntilDone()

    return { status: 200, jsonBody: { ok: true }, headers: corsHeaders() }
  } catch (err) {
    context.error('sendContactMessage: failed to send email', err)
    return { status: 502, jsonBody: { error: 'send_failed' }, headers: corsHeaders() }
  }
}

app.http('sendContactMessage', {
  route: 'contact',
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: sendContactMessage,
})
