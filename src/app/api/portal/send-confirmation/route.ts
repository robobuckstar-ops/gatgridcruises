import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createMagicLinkToken } from '@/lib/portal-auth'
import { fetchBookingById } from '@/lib/portal-airtable'
import { BOOKING_CONFIRMED } from '@/lib/email-templates'

export const runtime = 'nodejs'

// Admin-gated: anyone with CRON_SECRET can trigger a confirmation send.
// Without this, a hostile caller could re-email arbitrary bookings.
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization') ?? ''
  const headerSecret = request.headers.get('x-cron-secret') ?? ''
  const querySecret = new URL(request.url).searchParams.get('secret') ?? ''
  const expected = process.env.CRON_SECRET
  if (!expected) return false
  return (
    authHeader === `Bearer ${expected}` ||
    headerSecret === expected ||
    querySecret === expected
  )
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = iso.includes('T') ? new Date(iso) : new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

// DCL final payment is due 90 days before sailing for non-suite categories.
// We use that as a sensible default — the email already flags this in red.
function computeFinalPaymentDate(sailIso: string): string {
  if (!sailIso) return 'See your booking confirmation'
  const sail = sailIso.includes('T') ? new Date(sailIso) : new Date(`${sailIso}T12:00:00`)
  if (Number.isNaN(sail.getTime())) return 'See your booking confirmation'
  const due = new Date(sail)
  due.setDate(due.getDate() - 90)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(due)
}

// Best-effort port extraction from the itinerary string. Airtable stores the
// itinerary as free text (e.g. "Bahamian: Nassau & Castaway Cay") so this is
// a heuristic — if nothing parses, we fall back to the itinerary as one bullet.
function extractPorts(itinerary: string): string[] {
  if (!itinerary) return []
  const afterColon = itinerary.includes(':')
    ? itinerary.split(':').slice(1).join(':')
    : itinerary
  const parts = afterColon
    .split(/,| & | and /i)
    .map(p => p.trim())
    .filter(Boolean)
  return parts.length > 1 ? parts : [itinerary]
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const bookingId = typeof body?.bookingId === 'string' ? body.bookingId.trim() : ''
    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })
    }

    const apiKey = process.env.AIRTABLE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AIRTABLE_API_KEY not configured' }, { status: 503 })
    }
    if (!process.env.PORTAL_JWT_SECRET) {
      return NextResponse.json({ error: 'PORTAL_JWT_SECRET not configured' }, { status: 503 })
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 503 })
    }

    const result = await fetchBookingById(bookingId, apiKey)
    if (!result) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const { booking, client } = result
    if (!client.email) {
      return NextResponse.json({ error: 'Booking has no client email on file' }, { status: 422 })
    }

    const token = createMagicLinkToken({ bookingId: booking.id, email: client.email })
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gatgridcruises.com'
    const magicLinkUrl = `${siteUrl}/api/portal/auth?token=${encodeURIComponent(token)}`

    const html = BOOKING_CONFIRMED({
      guestName: client.fullName || client.firstName,
      shipName: booking.ship,
      sailDate: formatDate(booking.sailingDate),
      returnDate: formatDate(booking.returnDate),
      nights: booking.nights ?? 0,
      itinerary: booking.itinerary,
      stateroomCategory: booking.stateroomCategory,
      stateroomNumber: booking.stateroomNumber || undefined,
      bookingRef: booking.number,
      totalPaid: booking.bookingPrice ?? 0,
      finalPaymentDate: computeFinalPaymentDate(booking.sailingDate),
      ports: extractPorts(booking.itinerary),
      portalUrl: magicLinkUrl,
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const sendResult = await resend.emails.send({
      from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
      to: client.email,
      subject: `Your Disney cruise is booked — ${booking.number}`,
      html,
    })

    if (sendResult.error) {
      console.error('[portal/send-confirmation] Resend error:', sendResult.error)
      return NextResponse.json(
        { error: 'Email send failed', detail: sendResult.error.message },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      bookingNumber: booking.number,
      sentTo: client.email,
      messageId: sendResult.data?.id ?? null,
    })
  } catch (err) {
    console.error('[portal/send-confirmation] error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Something went wrong', detail: message }, { status: 500 })
  }
}
