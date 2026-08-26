import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { logReferralLead } from '@/lib/airtable-referrals'
import { sendLeadAutoText } from '@/lib/lead-autotext'
import { sendPushover } from '@/lib/pushover'

export const runtime = 'nodejs'

const CODE_REGEX = /^[A-Z0-9]{6,10}$/

function clean(s: unknown, max = 500): string {
  if (typeof s !== 'string') return ''
  return s.replace(/[<>]/g, '').trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const { allowed } = checkRateLimit(ip, 'referral-lead', 30, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const code = clean(body.referral_code, 12).toUpperCase()
  if (!CODE_REGEX.test(code)) {
    return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
  }

  const lead_name = clean(body.lead_name, 120)
  const lead_email = clean(body.lead_email, 200).toLowerCase()
  const lead_source = clean(body.lead_source, 80) || 'Site'
  const notes = clean(body.notes, 500)
  // No caller sends a phone today, so the welcome text is a no-op until one
  // does. Read here rather than later so adding the field is a form change.
  const lead_phone = clean(body.lead_phone, 50) || clean(body.phone, 50)

  /**
   * A word-of-mouth lead is the warmest kind there is, so Grayson's phone
   * buzzes for it. Best effort and awaited in both directions: the serverless
   * invocation freezes at the response, and neither call may fail the request.
   * There is no customer acknowledgment email on this endpoint.
   */
  const fireInstantFollowUps = async (persisted: boolean): Promise<void> => {
    const textOk = lead_phone
      ? await sendLeadAutoText(lead_phone, { name: lead_name, source: 'referral' })
      : false

    await sendPushover({
      title: `New GatGrid lead: ${lead_name || 'name not given'}`,
      priority: 1,
      message: [
        `Name: ${lead_name || 'not provided'}`,
        `Phone: ${lead_phone || 'not provided'}`,
        `Email: ${lead_email || 'not provided'}`,
        `Source: referral (code ${code}, via ${lead_source})`,
        notes ? `Notes: ${notes.replace(/\s+/g, ' ').slice(0, 200)}` : null,
        persisted ? null : 'Heads up: not written to Airtable, log this one by hand.',
        '',
        `Auto-text: ${textOk ? 'sent' : lead_phone ? 'not sent (check Twilio env)' : 'no phone on the form'}`,
        'Auto-email: none on this form',
      ]
        .filter((line) => line !== null)
        .join('\n'),
    })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    // Without Airtable creds we can't persist — return ok so the client
    // doesn't surface an error to the visitor. Make.com is still primary.
    // The push still fires: an unpersisted lead is the one most worth knowing
    // about, since nothing else will surface it.
    await fireInstantFollowUps(false)
    return NextResponse.json({ ok: true, persisted: false })
  }

  const result = await logReferralLead(
    {
      referral_code: code,
      lead_name,
      lead_email,
      lead_source,
      notes,
    },
    apiKey,
  )

  await fireInstantFollowUps(Boolean(result))

  return NextResponse.json({ ok: true, persisted: Boolean(result) })
}
