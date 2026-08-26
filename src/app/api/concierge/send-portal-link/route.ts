// Concierge action: send a client their private My Trip portal link over BOTH
// email and SMS. Agent-triggered, so it's gated by CRON_SECRET the same way the
// other admin sends are — never expose this without the secret, or anyone could
// blast links (and texts) to any booking.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createMagicLinkToken } from '@/lib/portal-auth'
import { fetchBookingById } from '@/lib/portal-airtable'
import { MAGIC_LINK_EMAIL } from '@/lib/email-templates'
import { sendSms } from '@/lib/twilio'

export const runtime = 'nodejs'

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.CRON_SECRET
  if (!expected) return false
  const authHeader = request.headers.get('authorization') ?? ''
  const headerSecret = request.headers.get('x-cron-secret') ?? ''
  const querySecret = new URL(request.url).searchParams.get('secret') ?? ''
  return authHeader === `Bearer ${expected}` || headerSecret === expected || querySecret === expected
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey || !process.env.PORTAL_JWT_SECRET) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let body: { bookingId?: string; channels?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const bookingId = (body.bookingId ?? '').trim()
  if (!bookingId) return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })

  // Which channels to use; default both.
  const channels = Array.isArray(body.channels) && body.channels.length ? body.channels : ['email', 'sms']

  let data
  try {
    data = await fetchBookingById(bookingId, apiKey)
  } catch (err) {
    console.error('[concierge/send-portal-link] booking fetch failed:', err)
    return NextResponse.json({ error: 'Failed to load booking' }, { status: 502 })
  }
  if (!data) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  const { booking, client } = data
  const token = createMagicLinkToken({ bookingId: booking.id, email: client.email })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'
  const magicLinkUrl = `${siteUrl}/api/portal/auth?token=${encodeURIComponent(token)}`

  const result: Record<string, unknown> = { bookingId: booking.id, to: {} }

  // Email
  if (channels.includes('email') && client.email) {
    ;(result.to as Record<string, string>).email = client.email
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          to: client.email,
          subject: 'Your GatGrid Cruises trip dashboard',
          html: MAGIC_LINK_EMAIL(client.firstName, magicLinkUrl, booking.number),
        })
        result.emailSent = true
      } catch (err) {
        console.error('[concierge/send-portal-link] email failed:', err)
        result.emailSent = false
      }
    } else {
      result.emailSent = false
      result.emailNote = 'RESEND_API_KEY not set'
    }
  }

  // SMS
  if (channels.includes('sms') && client.phone) {
    ;(result.to as Record<string, string>).phone = client.phone
    const smsBody =
      `Hi ${client.firstName}, it's Grayson with GatGrid Cruises. Here's your private trip ` +
      `dashboard to add your travel details and see your countdown: ${magicLinkUrl} ` +
      `Reply STOP to opt out.`
    const sms = await sendSms(client.phone, smsBody)
    result.smsSent = sms.ok
    if (!sms.ok) result.smsError = sms.error
  } else if (channels.includes('sms')) {
    result.smsSent = false
    result.smsError = 'No phone on the client record'
  }

  return NextResponse.json(result)
}
