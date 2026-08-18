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

function twiml(): NextResponse {
  return new NextResponse(EMPTY_TWIML, {
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

  return twiml()
}

/** Twilio can be configured to GET; answer with valid TwiML either way. */
export async function GET() {
  return twiml()
}
