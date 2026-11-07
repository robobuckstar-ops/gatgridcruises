// Handles the keypress from the press-1 prompt on the business line.
// 1 forwards to Grayson's cell. Any other key goes to voicemail, with no ring.

import { NextRequest, NextResponse } from 'next/server'
import { lookupContactName } from '@/lib/airtable-messages'
import { sendPushover } from '@/lib/pushover'
import { formatPhoneDisplay, normalizePhone, validateTwilioSignature, webhookUrlFor } from '@/lib/twilio'
import { FORWARD_TO, forwardTwiml, voicemailOnlyTwiml } from '@/lib/voice'

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
    console.error('[voice/gather] could not parse the Twilio form body:', err)
    return voicemailOnlyTwiml()
  }

  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  if (authToken) {
    const signature = request.headers.get('x-twilio-signature') || ''
    if (!validateTwilioSignature(webhookUrlFor(request), params, signature, authToken)) {
      console.error('[voice/gather] rejected: X-Twilio-Signature did not validate')
      return new NextResponse('Invalid Twilio signature', { status: 403 })
    }
  }

  // A call from the forward-to cell can't ring itself, so it goes to voicemail.
  const from = normalizePhone(params.From)
  if (params.Digits === '1' && from !== FORWARD_TO) {
    let contactName = ''
    try {
      contactName = await lookupContactName(from)
    } catch (err) {
      console.error('[voice/gather] contact lookup failed:', err)
    }
    const who = contactName ? `${contactName} (${formatPhoneDisplay(from)})` : formatPhoneDisplay(from)
    await sendPushover({
      title: 'Incoming call',
      message: `${who} pressed 1 and is ringing through from the business line.`,
      priority: 0,
    })
    return forwardTwiml()
  }
  return voicemailOnlyTwiml()
}
