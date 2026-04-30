import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/portal-auth'
import { AirtableError, fetchBookingById } from '@/lib/portal-airtable'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) {
    console.error('[portal/me] AIRTABLE_API_KEY missing')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const data = await fetchBookingById(session.bookingId, apiKey)
    if (!data) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const sessionEmail = session.email.toLowerCase()
    const recordEmail = data.client.email.toLowerCase()
    if (recordEmail && recordEmail !== sessionEmail) {
      return NextResponse.json({ error: 'Session does not match booking' }, { status: 403 })
    }

    return NextResponse.json({
      booking: data.booking,
      client: data.client,
    })
  } catch (err) {
    if (err instanceof AirtableError) {
      console.error('[portal/me] Airtable error:', err.message)
      return NextResponse.json({ error: 'Failed to load booking' }, { status: 502 })
    }
    console.error('[portal/me] Unexpected error:', err)
    return NextResponse.json({ error: 'Failed to load booking' }, { status: 500 })
  }
}
