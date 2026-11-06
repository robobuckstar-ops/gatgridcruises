import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { dateFromText, computeQualified } from '@/lib/lead-tracking'
import { runLeadPipeline } from '@/lib/lead-pipeline'
import { smsConsentNote } from '@/lib/sms-consent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Meta Lead Ads leads, relayed by Make. Authenticated with a shared secret in
// the x-meta-lead-secret header. Fails closed when the env var is not set.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const YES = new Set(['yes', 'y', 'true', '1', 'on', 'checked', 'agree', 'i agree'])

function field(body: Record<string, unknown>, key: string, maxLen = 300): string {
  return String(body[key] ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function secretMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  const expected = process.env.META_LEAD_WEBHOOK_SECRET?.trim()
  if (!expected) {
    console.error('[meta-lead] META_LEAD_WEBHOOK_SECRET is not set; rejecting the webhook')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }
  if (!secretMatches(request.headers.get('x-meta-lead-secret') ?? '', expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = field(body, 'full_name', 200)
  const email = field(body, 'email', 200).toLowerCase()
  if (!name || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'full_name and a valid email are required' }, { status: 400 })
  }

  const phone = field(body, 'phone', 50)
  const shipOrDates = field(body, 'ship_or_dates')
  const partySize = field(body, 'party_size', 40)
  const alreadyBooked = YES.has(field(body, 'already_booked').toLowerCase())
  const smsConsent = YES.has(field(body, 'sms_consent').toLowerCase())
  const leadId = field(body, 'lead_id', 100)
  const formId = field(body, 'form_id', 100)
  const adName = field(body, 'ad_name')
  const adsetName = field(body, 'adset_name')
  const campaignName = field(body, 'campaign_name')
  const sailDate = dateFromText(shipOrDates)
  const guests = parseInt(partySize, 10)

  const notes = [
    'Meta Lead Ads form.',
    leadId ? `Meta lead ID: ${leadId}` : null,
    formId ? `Meta form ID: ${formId}` : null,
    field(body, 'created_time') ? `Meta created time: ${field(body, 'created_time')}` : null,
    `Already booked: ${alreadyBooked ? 'yes' : 'no'}`,
    adName ? `Ad: ${adName}` : null,
    adsetName ? `Ad set: ${adsetName}` : null,
    campaignName ? `Campaign: ${campaignName}` : null,
    smsConsentNote(smsConsent, formId ? `Meta lead form ${formId}` : 'Meta lead form'),
  ]
    .filter(Boolean)
    .join('\n')

  const result = await runLeadPipeline({
    label: 'Meta Lead Form',
    textSource: alreadyBooked ? 'transfer' : 'inquiry',
    smsConsent,
    crm: {
      name,
      email,
      phone,
      notes,
      source: 'meta-lead',
      leadSource: 'Meta Lead Form',
      sailingInterest: shipOrDates || undefined,
      guests: partySize || undefined,
      qualified: computeQualified({ alreadyBooked, sailDate }),
      smsConsent,
      smsConsentSource: formId ? `Meta lead form ${formId}` : 'Meta lead form',
      adName: adName || undefined,
      adsetName: adsetName || undefined,
      campaignName: campaignName || undefined,
      metaLeadId: leadId || undefined,
      metaFormId: formId || undefined,
    },
    details: {
      name,
      interest: shipOrDates,
      transfer: alreadyBooked,
      partySize: Number.isFinite(guests) ? guests : undefined,
      windowStart: sailDate ?? undefined,
    },
  })

  // A lead saved nowhere must fail, so Make can show the error and retry.
  if (result.crm === 'failed' && !result.alertEmail) {
    return NextResponse.json({ error: 'Lead could not be recorded' }, { status: 502 })
  }
  return NextResponse.json({ success: true, ...result })
}
