// Send a text from the business line and log it to the same Messages thread.

import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedMessagesRequest } from '@/lib/messages-auth'
import { lookupContactName, saveMessageSafely } from '@/lib/airtable-messages'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { getBusinessNumber, missingTwilioEnv, normalizePhone, sendSms } from '@/lib/twilio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** One SMS segment is 160 chars; Twilio splits past that and bills per segment. */
const MAX_BODY_LENGTH = 1600

export async function POST(request: NextRequest) {
  if (!isAuthorizedMessagesRequest(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  // A stuck retry loop in the browser shouldn't be able to bill out a hundred texts.
  const { allowed, retryAfter } = checkRateLimit(getClientIp(request), 'sms-send', 30, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Sending too fast — give it a few seconds.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter ?? 60) } },
    )
  }

  let payload: { to?: unknown; body?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body' }, { status: 400 })
  }

  const to = normalizePhone(typeof payload.to === 'string' ? payload.to : '')
  const body = typeof payload.body === 'string' ? payload.body.trim() : ''

  if (!to) return NextResponse.json({ error: 'A recipient phone number is required.' }, { status: 400 })
  if (!body) return NextResponse.json({ error: 'Message text is required.' }, { status: 400 })
  if (body.length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: `Message is too long (${body.length}/${MAX_BODY_LENGTH} characters).` },
      { status: 400 },
    )
  }

  const missing = missingTwilioEnv()
  if (missing.length) {
    console.error(`[sms/send] blocked — missing env: ${missing.join(', ')}`)
    return NextResponse.json(
      {
        error: `Texting isn't live yet. Add ${missing.join(' and ')} to the Vercel project and redeploy.`,
        code: 'TWILIO_NOT_CONFIGURED',
        missing,
      },
      { status: 503 },
    )
  }

  const result = await sendSms(to, body)

  // Log either way: a failed send is still something Grayson needs to see in
  // the thread, otherwise the reply just vanishes from the conversation.
  const contactName = await lookupContactName(to).catch(() => '')
  const stored = await saveMessageSafely({
    from: getBusinessNumber(),
    to,
    body,
    direction: 'outbound',
    contactName: contactName || undefined,
    status: result.ok ? 'Sent' : 'Failed',
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'Twilio could not send the message.', message: stored },
      { status: result.status ?? 502 },
    )
  }

  return NextResponse.json({ success: true, sid: result.sid, message: stored })
}
