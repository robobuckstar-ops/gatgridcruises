// Shared TwiML and caller checks for the business line (405) 526-4956.

import { NextResponse } from 'next/server'
import { escapeFormulaValue, getAirtableKey, listRecords } from './airtable-client'
import { MESSAGE_FIELDS, MESSAGES_TABLE } from './airtable-messages'
import { DEFAULT_BUSINESS_NUMBER, normalizePhone } from './twilio'

/** The cell that answers the business line. Overridable for testing. */
export const FORWARD_TO = normalizePhone(process.env.VOICE_FORWARD_NUMBER) || '+15804306511'
const RING_SECONDS = 20
const PRESS_ONE_SECONDS = 6
const PROMPT = 'Thanks for calling Gat Grid Cruises. To reach a travel advisor, press 1.'

// Grayson's own recorded greeting, hosted on the site. Set VOICE_GREETING_READY
// = false to fall back to spoken text, or VOICE_GREETING_URL to point elsewhere.
const GREETING_URL =
  process.env.VOICE_GREETING_URL?.trim() || 'https://gatgridcruises.com/voicemail-greeting.mp3'
const USE_RECORDED_GREETING = process.env.VOICE_GREETING_READY !== 'false'
const FALLBACK_GREETING =
  "Hi, you've reached Grayson with GatGrid Cruises. I'm sorry I missed your call. " +
  'Please leave your name, your number, and a little about the Disney cruise you are planning, ' +
  "and I'll call you right back. Thanks so much."

export function xml(body: string): NextResponse {
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

function voicemailBody(): string {
  const greeting = USE_RECORDED_GREETING
    ? `<Play>${GREETING_URL}</Play>`
    : `<Say voice="alice">${FALLBACK_GREETING}</Say>`
  return (
    greeting +
    `<Record maxLength="120" playBeep="true" timeout="5" transcribe="true" ` +
    `transcribeCallback="/api/voice/voicemail" action="/api/voice/voicemail" method="POST"/>` +
    `<Say voice="alice">I did not catch a message. Goodbye.</Say>` +
    `<Hangup/>`
  )
}

/** Press 1 goes to /api/voice/gather. No key falls through to voicemail. */
export function pressOneTwiml(): NextResponse {
  return xml(
    `<Response>` +
      `<Gather numDigits="1" timeout="${PRESS_ONE_SECONDS}" action="/api/voice/gather" method="POST">` +
      `<Say voice="alice">${PROMPT}</Say>` +
      `</Gather>` +
      voicemailBody() +
      `</Response>`,
  )
}

/** Ring the cell behind the accept-a-call whisper, then voicemail if unanswered. */
export function forwardTwiml(): NextResponse {
  return xml(
    `<Response>` +
      `<Dial callerId="${DEFAULT_BUSINESS_NUMBER}" answerOnBridge="true" timeout="${RING_SECONDS}">` +
      `<Number url="/api/voice/screen" method="POST">${FORWARD_TO}</Number>` +
      `</Dial>` +
      voicemailBody() +
      `</Response>`,
  )
}

export function voicemailOnlyTwiml(): NextResponse {
  return xml(`<Response>${voicemailBody()}</Response>`)
}

/** Twilio plays a busy signal. No ring, voicemail, push or CRM row. */
export function rejectTwiml(): NextResponse {
  return xml('<Response><Reject reason="busy"/></Response>')
}

function envBlockList(): Set<string> {
  return new Set(
    (process.env.VOICE_BLOCK_LIST ?? '')
      .split(',')
      .map((number) => normalizePhone(number.trim()))
      .filter(Boolean),
  )
}

/**
 * A caller is blocked if listed in VOICE_BLOCK_LIST, or if any of their rows in
 * the Airtable Messages table has the Spam box ticked, which takes effect without
 * a deploy. Any failure here lets the call through: a real caller matters more.
 */
export async function isBlockedCaller(from: string): Promise<boolean> {
  if (!from) return false
  if (envBlockList().has(from)) return true
  const apiKey = getAirtableKey()
  if (!apiKey) return false
  try {
    const rows = await listRecords(
      MESSAGES_TABLE,
      {
        filterByFormula: `AND({${MESSAGE_FIELDS.conversationId}}="${escapeFormulaValue(from)}",{Spam})`,
        maxRecords: 1,
      },
      apiKey,
    )
    return rows.length > 0
  } catch (err) {
    console.error('[voice] spam lookup failed, letting the call through:', err)
    return false
  }
}
