// Twilio's inbound-call webhook for the business line (405) 526-4956.
//
// Flow:
//   1. Log the incoming call into the same per-contact thread as texts.
//   2. Ring Grayson's cell, but SCREEN it: when his phone (or his carrier
//      voicemail) answers, it first hears "press any key to accept." Only a real
//      person pressing a key bridges the call. A voicemail can't press a key, so
//      it never silently swallows the call.
//   3. If the call isn't accepted (no answer, or the carrier voicemail grabbed
//      it), the caller falls through to the GatGrid greeting + voicemail here,
//      never Grayson's personal voicemail.

import { NextRequest, NextResponse } from 'next/server'
import { lookupContactName, saveMessageSafely } from '@/lib/airtable-messages'
import { sendPushover } from '@/lib/pushover'
import {
  DEFAULT_BUSINESS_NUMBER,
  formatPhoneDisplay,
  normalizePhone,
  validateTwilioSignature,
  webhookUrlFor,
} from '@/lib/twilio'

// Node runtime: signature validation needs Node's crypto.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** The cell that answers the business line. Overridable for testing. */
const FORWARD_TO = normalizePhone(process.env.VOICE_FORWARD_NUMBER) || '+15804306511'
/** Ring Grayson's cell this long before rolling to voicemail. Screening means a
 * carrier voicemail can't falsely "answer," so this can be a normal ring length. */
const RING_SECONDS = 20

// Grayson's own recorded greeting, hosted on the site. Set VOICE_GREETING_READY
// = false to fall back to spoken text, or VOICE_GREETING_URL to point elsewhere.
const GREETING_URL =
  process.env.VOICE_GREETING_URL?.trim() || 'https://gatgridcruises.com/voicemail-greeting.mp3'
const USE_RECORDED_GREETING = process.env.VOICE_GREETING_READY !== 'false'
const FALLBACK_GREETING =
  "Hi, you've reached Grayson with GatGrid Cruises. I'm sorry I missed your call. " +
  'Please leave your name, your number, and a little about the Disney cruise you are planning, ' +
  "and I'll call you right back. Thanks so much."

function xml(body: string): NextResponse {
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

function greetingVerb(): string {
  return USE_RECORDED_GREETING
    ? `<Play>${GREETING_URL}</Play>`
    : `<Say voice="alice">${FALLBACK_GREETING}</Say>`
}

/**
 * Ring the cell behind a keypress screen, then — if the caller is still on the
 * line because the call was never accepted — play the GatGrid greeting and take
 * a voicemail. A bridged (accepted) call ends when the parties hang up and never
 * reaches the voicemail verbs.
 */
function callTwiml(): NextResponse {
  return xml(
    `<Response>` +
      `<Dial callerId="${DEFAULT_BUSINESS_NUMBER}" answerOnBridge="true" timeout="${RING_SECONDS}">` +
      `<Number url="/api/voice/screen" method="POST">${FORWARD_TO}</Number>` +
      `</Dial>` +
      greetingVerb() +
      `<Record maxLength="120" playBeep="true" timeout="5" transcribe="true" ` +
      `transcribeCallback="/api/voice/voicemail" action="/api/voice/voicemail" method="POST"/>` +
      `<Say voice="alice">I did not catch a message. Goodbye.</Say>` +
      `<Hangup/>` +
      `</Response>`,
  )
}

export async function POST(request: NextRequest) {
  const params: Record<string, string> = {}
  try {
    const form = await request.formData()
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') params[key] = value
    }
  } catch (err) {
    console.error('[voice/inbound] could not parse the Twilio form body:', err)
    return callTwiml()
  }

  // Same authenticity check as the SMS webhook: prove the POST is really Twilio.
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  if (authToken) {
    const signature = request.headers.get('x-twilio-signature') || ''
    const url = webhookUrlFor(request)
    if (!validateTwilioSignature(url, params, signature, authToken)) {
      console.error(
        `[voice/inbound] rejected: X-Twilio-Signature did not validate for ${url}. ` +
          'Check that the Voice webhook URL in the Twilio console matches this URL exactly.',
      )
      return new NextResponse('Invalid Twilio signature', { status: 403 })
    }
  } else {
    console.warn('[voice/inbound] TWILIO_AUTH_TOKEN not set — accepting webhook WITHOUT validation.')
  }

  const from = normalizePhone(params.From)
  const to = normalizePhone(params.To)

  // Match the caller, log the call, and buzz once at normal priority (the phone
  // is already ringing). The high-priority missed/voicemail alert comes later
  // from /api/voice/voicemail if the call isn't accepted.
  let contactName = ''
  try {
    contactName = await lookupContactName(from)
  } catch (err) {
    console.error('[voice/inbound] contact lookup failed:', err)
  }
  const who = contactName ? `${contactName} (${formatPhoneDisplay(from)})` : formatPhoneDisplay(from)

  if (from) {
    await saveMessageSafely({
      from,
      to,
      body: 'Incoming call',
      direction: 'inbound',
      channel: 'Voice',
      contactName: contactName || undefined,
      status: 'Unread',
    })
    await sendPushover({
      title: 'Incoming call',
      message: `${who} is calling the business line.`,
      priority: 0,
    })
  } else {
    console.error('[voice/inbound] webhook had no From number; params:', Object.keys(params).join(','))
  }

  return callTwiml()
}

/** Twilio can be set to GET; route the call the same way. */
export async function GET() {
  return callTwiml()
}
