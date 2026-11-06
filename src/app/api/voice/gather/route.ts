// Handles the keypress from the press-1 prompt on the business line.
// 1 forwards to Grayson's cell. Any other key goes to voicemail, with no ring.

import { NextRequest, NextResponse } from 'next/server'
import { normalizePhone, validateTwilioSignature, webhookUrlFor } from '@/lib/twilio'
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
  if (params.Digits === '1' && normalizePhone(params.From) !== FORWARD_TO) {
    return forwardTwiml()
  }
  return voicemailOnlyTwiml()
}
