// Twilio's inbound-call webhook for the business line (405) 526-4956.
//
// Flow:
//   1. A blocked caller is rejected (VOICE_BLOCK_LIST, or Spam ticked in Messages).
//   2. Log the call into the same per-contact thread as texts, and push.
//   3. Failed caller-ID verification (StirVerstat) goes straight to voicemail.
//   4. Ask the caller to press 1. Pressing 1 (/api/voice/gather) rings Grayson's
//      cell. No key or a wrong key goes to the GatGrid voicemail with no ring.

import { NextRequest, NextResponse } from 'next/server'
import { lookupContactName, saveMessageSafely } from '@/lib/airtable-messages'
import { sendPushover } from '@/lib/pushover'
import {
  failedCallerVerification,
  isBlockedCaller,
  pressOneTwiml,
  rejectTwiml,
  voicemailOnlyTwiml,
} from '@/lib/voice'
import {
  formatPhoneDisplay,
  normalizePhone,
  validateTwilioSignature,
  webhookUrlFor,
} from '@/lib/twilio'

// Node runtime: signature validation needs Node's crypto.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const params: Record<string, string> = {}
  try {
    const form = await request.formData()
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') params[key] = value
    }
  } catch (err) {
    console.error('[voice/inbound] could not parse the Twilio form body:', err)
    return pressOneTwiml()
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

  if (await isBlockedCaller(from)) {
    console.log(`[voice/inbound] rejected blocked caller ${from}`)
    return rejectTwiml()
  }

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

  // Failed caller-ID verification goes straight to voicemail, with no prompt.
  if (failedCallerVerification(params.StirVerstat)) {
    console.log(`[voice/inbound] ${from} failed verification: ${params.StirVerstat}`)
    return voicemailOnlyTwiml()
  }

  return pressOneTwiml()
}

/** Twilio can be set to GET; route the call the same way. */
export async function GET() {
  return pressOneTwiml()
}
