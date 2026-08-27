// Twilio's inbound-message webhook for the business line (405) 526-4956.
//
// Twilio POSTs form-encoded and expects TwiML back within 15 seconds; anything
// else shows up as an 11200 error in the console and can eventually get the
// number's webhook disabled. So every failure path here still returns an empty
// <Response/> — the message is logged for us to chase, never bounced to Twilio.

import { NextRequest, NextResponse } from 'next/server'
import {
  hasBookingIntent,
  lookupContactName,
  saveMessageSafely,
} from '@/lib/airtable-messages'
import { notifyInboundMessage } from '@/lib/sms-notify'
import { normalizePhone, validateTwilioSignature, webhookUrlFor } from '@/lib/twilio'

// Node runtime: signature validation needs Node's crypto.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Empty TwiML — accept the text without auto-replying to the sender. */
const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response/>'

// Rotating auto-acknowledgment so every inbound text gets an instant, human
// reply instead of silence. Variations keep it from reading like a robot.
const AUTO_ACKS = [
  "I see your message! I'll get to you ASAP. Is text better, or should I give you a call?",
  "Got your message, thank you! I'll reply as soon as I can. Do you prefer text or a call?",
  "Message received! I'm on it and will get back to you ASAP. Text or call, whichever's easier?",
  "Thanks for reaching out! I'll be with you shortly. Is text good, or would a call be better?",
  "I see this and I'll respond ASAP! Would you rather keep it on text or hop on a quick call?",
]

// Carrier-handled opt-out / help keywords. Never auto-reply to these — Twilio
// manages STOP/HELP itself and an extra message would be non-compliant.
const OPTOUT_KEYWORDS = new Set([
  'stop', 'stopall', 'unsubscribe', 'cancel', 'end', 'quit',
  'help', 'info', 'start', 'unstop', 'yes', 'no',
])

function pickAck(): string {
  return AUTO_ACKS[Math.floor(Math.random() * AUTO_ACKS.length)]
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function twiml(reply?: string): NextResponse {
  const xml = reply
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(reply)}</Message></Response>`
    : EMPTY_TWIML
  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

function inboxUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') || 'https://gatgridcruises.com'
  return `${base}/admin/messages`
}

export async function POST(request: NextRequest) {
  const params: Record<string, string> = {}

  try {
    const form = await request.formData()
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') params[key] = value
    }
  } catch (err) {
    console.error('[sms/inbound] could not parse the Twilio form body:', err)
    return twiml()
  }

  // Authenticity check. The auth token is what proves a POST really came from
  // Twilio; until it is set in Vercel there is nothing to verify against, so
  // the route accepts and logs loudly rather than silently dropping real texts
  // during setup. Once TWILIO_AUTH_TOKEN exists, a bad signature is rejected.
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  if (authToken) {
    const signature = request.headers.get('x-twilio-signature') || ''
    const url = webhookUrlFor(request)
    if (!validateTwilioSignature(url, params, signature, authToken)) {
      console.error(
        `[sms/inbound] rejected: X-Twilio-Signature did not validate for ${url}. ` +
          'If the number works otherwise, check that the webhook URL in the Twilio console ' +
          'matches this URL exactly (scheme, host, no trailing slash) or set TWILIO_WEBHOOK_URL.',
      )
      return new NextResponse('Invalid Twilio signature', { status: 403 })
    }
  } else {
    console.warn(
      '[sms/inbound] TWILIO_AUTH_TOKEN is not set — accepting this webhook WITHOUT signature ' +
        'validation. Add the token in Vercel to lock this endpoint down.',
    )
  }

  const from = normalizePhone(params.From)
  const to = normalizePhone(params.To)
  const body = (params.Body ?? '').trim()

  if (!from) {
    console.error('[sms/inbound] webhook had no From number; params:', Object.keys(params).join(','))
    return twiml()
  }

  // Match the sender to the CRM so the thread shows a name instead of digits.
  let contactName = ''
  try {
    contactName = await lookupContactName(from)
  } catch (err) {
    console.error('[sms/inbound] contact lookup failed:', err)
  }

  const readyToBook = hasBookingIntent(body)

  const stored = await saveMessageSafely({
    from,
    to,
    body,
    direction: 'inbound',
    contactName: contactName || undefined,
    status: 'Unread',
  })

  if (!stored) {
    // The text is lost to the inbox at this point, so make sure the alert email
    // still carries the full content — that becomes the only copy.
    console.error(`[sms/inbound] NOT PERSISTED — from ${from}: ${body.slice(0, 200)}`)
  }

  // Awaited on purpose: the serverless invocation freezes the moment we
  // respond, which would kill an in-flight alert send.
  await notifyInboundMessage({ from, body, contactName, readyToBook, inboxUrl: inboxUrl() })

  // Auto-acknowledge every real inbound text so the sender never hears silence.
  // Skip opt-out/help keywords (carrier handles those) and empty bodies.
  const firstWord = body.toLowerCase().split(/\s+/)[0] || ''
  const shouldAck = body.length > 0 && !OPTOUT_KEYWORDS.has(firstWord)

  if (shouldAck) {
    const ack = pickAck()
    // Log the auto-reply as outbound so the inbox thread stays complete.
    await saveMessageSafely({
      from: to,
      to: from,
      body: ack,
      direction: 'outbound',
      contactName: contactName || undefined,
      status: 'Sent',
    }).catch(() => {})
    return twiml(ack)
  }

  return twiml()
}

/** Twilio can be configured to GET; answer with valid TwiML either way. */
export async function GET() {
  return twiml()
}
