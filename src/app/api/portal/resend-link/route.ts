import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createMagicLinkToken } from '@/lib/portal-auth'
import {
  BOOKING_FIELDS,
  fetchBookingByEmail,
  fetchClientName,
} from '@/lib/portal-airtable'
import { MAGIC_LINK_EMAIL } from '@/lib/email-templates'

export const runtime = 'nodejs'

// Always 200 with the same body — never reveal whether an email is on file.
function successResponse() {
  return NextResponse.json({
    success: true,
    message: "If that email matches a booking on file, we've sent a fresh access link. Check your inbox in a minute or two.",
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const rawEmail = typeof body?.email === 'string' ? body.email : ''
    const email = rawEmail.trim().toLowerCase()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const apiKey = process.env.AIRTABLE_API_KEY
    if (!apiKey || !process.env.PORTAL_JWT_SECRET) {
      console.error('[portal/resend-link] Missing AIRTABLE_API_KEY or PORTAL_JWT_SECRET')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const record = await fetchBookingByEmail(email, apiKey)
    const recordEmail = record ? String(record.fields[BOOKING_FIELDS.clientEmail] ?? '').toLowerCase() : ''

    // No matching booking — return success anyway to avoid leaking which emails are clients.
    if (!record || recordEmail !== email) {
      return successResponse()
    }

    const token = createMagicLinkToken({ bookingId: record.id, email })
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'
    const magicLinkUrl = `${siteUrl}/api/portal/auth?token=${encodeURIComponent(token)}`

    if (!process.env.RESEND_API_KEY) {
      // Without Resend configured we can't actually send — log and pretend success.
      console.error('[portal/resend-link] RESEND_API_KEY missing; magic link generated but not sent')
      return successResponse()
    }

    const clientIds = record.fields[BOOKING_FIELDS.client] as string[] | undefined
    const fullName = clientIds?.length ? await fetchClientName(clientIds[0], apiKey) : ''
    const greeting = fullName.trim().split(/\s+/)[0] || email.split('@')[0]
    const bookingRef = String(record.fields[BOOKING_FIELDS.bookingName] ?? '')

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
        to: email,
        subject: 'Your My Trip dashboard link',
        html: MAGIC_LINK_EMAIL(greeting, magicLinkUrl, bookingRef),
      })
    } catch (sendErr) {
      // Log but still return generic success — the user shouldn't see infra errors.
      console.error('[portal/resend-link] Resend send failed:', sendErr)
    }

    return successResponse()
  } catch (err) {
    console.error('[portal/resend-link] error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
