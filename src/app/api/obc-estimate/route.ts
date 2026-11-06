import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { selectLeadSailings } from '@/lib/lead-details-email'
import { runLeadPipeline } from '@/lib/lead-pipeline'
import { computeQualified, readAttribution } from '@/lib/lead-tracking'
import { readSmsConsent, smsConsentNote } from '@/lib/sms-consent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(body: Record<string, unknown>, key: string, maxLen = 120): string {
  return String(body[key] ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
}

export async function POST(request: NextRequest) {
  const { allowed, retryAfter } = checkRateLimit(getClientIp({ headers: request.headers }), 'obc-estimate', 5, 3_600_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (body._honeypot) return NextResponse.json({ success: true, sailings: [] })

  const email = field(body, 'email', 200).toLowerCase()
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const name = field(body, 'name', 200) || email.split('@')[0]
  const phone = field(body, 'phone', 50)
  const ship = field(body, 'ship', 60)
  const whenMonth = /^\d{4}-\d{2}$/.test(field(body, 'when', 7)) ? field(body, 'when', 7) : ''
  const partySize = parseInt(field(body, 'party_size', 10), 10) || 2
  const alreadyBooked = field(body, 'already_booked', 5) === 'yes'
  const smsConsent = readSmsConsent(body.sms_consent)

  const details = {
    name,
    ship: ship && ship !== 'not-sure' ? ship : undefined,
    transfer: alreadyBooked,
    partySize,
    windowStart: whenMonth ? `${whenMonth}-01` : undefined,
    windowEnd: whenMonth ? `${whenMonth}-31` : undefined,
  }
  const { cards } = selectLeadSailings(details)

  const interest = [ship && ship !== 'not-sure' ? ship : null, whenMonth || null].filter(Boolean).join(', ')
  const result = await runLeadPipeline({
    label: 'OBC Estimate Page',
    textSource: alreadyBooked ? 'transfer' : 'inquiry',
    smsConsent,
    crm: {
      name,
      email,
      phone,
      notes: [
        'Onboard credit estimate request (/obc-estimate).',
        `Already booked direct: ${alreadyBooked ? 'yes' : 'no'}`,
        smsConsentNote(smsConsent, 'obc-estimate'),
      ].join('\n'),
      source: 'obc-estimate',
      leadSource: 'OBC Estimate Page',
      sailingInterest: interest || 'Not sure yet',
      guests: String(partySize),
      qualified: computeQualified({ alreadyBooked, sailDate: details.windowStart }),
      smsConsent,
      smsConsentSource: 'obc-estimate',
      ...readAttribution(body),
    },
    details,
  })

  return NextResponse.json({
    success: true,
    recorded: result.crm !== 'failed' || result.alertEmail,
    alreadyBooked,
    sailings: cards.map((c) => ({
      ship: c.ship,
      dates: c.dates,
      itinerary: c.itinerary,
      obcEstimate: c.obcEstimate,
    })),
  })
}
