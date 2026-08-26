// Twilio's inbound-call webhook for the business line (405) 526-4956.
//
// Two jobs, and it must never drop a real call doing them:
//   1. Log the call into the same per-contact thread as texts, so the "brain"
//      shows calls next to messages for that customer.
//   2. Forward the call to Grayson's cell, exactly like the old TwiML Bin did.
//
// Twilio calls this URL twice per call: once when the call comes in (no
// DialCallStatus), and once more after the forward finishes (DialCallStatus is
// set). We log on the first hit and, on the second, fire a high-priority alert
// if the call went unanswered — the answered ones already rang his phone.

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
// Ring Grayson's cell this long before rolling to the GatGrid voicemail. Kept
// short on purpose: a personal cell's own carrier voicemail usually answers
// around 25 seconds, and if it picks up first Twilio counts the call as
// "answered" and never reaches our greeting. Giving up at 13s beats the carrier
// voicemail to the punch so callers hear GatGrid, not Grayson's personal box.
const RING_SECONDS = 13

function xml(body: string): NextResponse {
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

/** Forward to the cell, showing the business number so he answers as GatGrid. */
function forwardTwiml(): NextResponse {
  return xml(
    `<Response><Dial callerId="${DEFAULT_BUSINESS_NUMBER}" answerOnBridge="true" timeout="${RING_SECONDS}" action="/api/voice/inbound" method="POST">${FORWARD_TO}</Dial></Response>`,
  )
}

/** Nothing left to do after the forward; end the call cleanly. */
function hangupTwiml(): NextResponse {
  return xml('<Response><Hangup/></Response>')
}

// Grayson's own recorded greeting, hosted on the site. When present it plays
// instead of the robotic fallback; drop the file at public/voicemail-greeting.mp3
// (or point VOICE_GREETING_URL at any mp3/wav) and callers hear his voice.
const GREETING_URL =
  process.env.VOICE_GREETING_URL?.trim() || 'https://gatgridcruises.com/voicemail-greeting.mp3'
// Grayson's recording (public/voicemail-greeting.mp3) plays by default now that
// it's in place; set VOICE_GREETING_READY=false to fall back to the spoken text.
const USE_RECORDED_GREETING = process.env.VOICE_GREETING_READY !== 'false'

const FALLBACK_GREETING =
  "Hi, you've reached Grayson with GatGrid Cruises. I'm sorry I missed your call. " +
  'Please leave your name, your number, and a little about the Disney cruise you are planning, ' +
  "and I'll call you right back. Thanks so much."

/**
 * Played when the forward goes unanswered, so callers hear GatGrid instead of
 * Grayson's personal voicemail. Records a message, transcribes it, and hands
 * both off to /api/voice/voicemail for the alert + CRM log.
 */
function voicemailTwiml(): NextResponse {
  const greeting = USE_RECORDED_GREETING
    ? `<Play>${GREETING_URL}</Play>`
    : `<Say voice="alice">${FALLBACK_GREETING}</Say>`
  return xml(
    `<Response>` +
      greeting +
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
    return forwardTwiml()
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
  const dialStatus = (params.DialCallStatus ?? '').trim()

  // Second hit: the forward has finished. If it went unanswered, send the caller
  // to the GatGrid voicemail (which logs + alerts from /api/voice/voicemail).
  // An answered call already reached his phone, so just end cleanly.
  if (dialStatus) {
    const missed = dialStatus !== 'completed' && dialStatus !== 'answered'
    return missed ? voicemailTwiml() : hangupTwiml()
  }

  // First hit: a call is coming in. Match the caller, log it, buzz once at
  // normal priority (the phone is already ringing), then forward.
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

  return forwardTwiml()
}

/** Twilio can be set to GET; forward the call either way. */
export async function GET() {
  return forwardTwiml()
}
