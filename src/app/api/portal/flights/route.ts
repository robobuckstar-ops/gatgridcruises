// Client-portal endpoint for the Flights section. The guest records each
// flight (airline, number, date, direction) so the concierge can keep an eye on
// arrivals and departures. There's no automated parser: clients can also just
// forward their airline confirmation to the business inbox and the agent reads
// it by hand. This endpoint only stores what the client types here.

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/portal-auth'
import { AirtableError, fetchFlights, saveFlights, type FlightInfo } from '@/lib/portal-airtable'

export const runtime = 'nodejs'

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function sanitize(input: unknown): FlightInfo[] {
  if (!Array.isArray(input)) return []
  return input
    .map((f): FlightInfo => {
      const row = (f ?? {}) as Record<string, unknown>
      const direction = String(row.direction ?? '') === 'departure' ? 'departure' : 'arrival'
      return {
        direction,
        airline: clean(row.airline, 80),
        flightNumber: clean(row.flightNumber, 20),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(row.date ?? '')) ? String(row.date) : '',
        notes: clean(row.notes, 300),
      }
    })
    .filter(f => f.airline || f.flightNumber || f.date)
    .slice(0, 12)
}

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const flights = await fetchFlights(session.bookingId, apiKey)
    return NextResponse.json({ flights })
  } catch (err) {
    console.error('[portal/flights] load failed:', err)
    return NextResponse.json({ error: 'Failed to load flights' }, { status: 502 })
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const flights = sanitize((body as { flights?: unknown })?.flights)

  try {
    await saveFlights(session.bookingId, apiKey, flights)
    return NextResponse.json({ flights, saved: true })
  } catch (err) {
    if (err instanceof AirtableError) {
      console.error('[portal/flights] Airtable save error:', err.message)
      return NextResponse.json({ error: 'Failed to save flights' }, { status: 502 })
    }
    console.error('[portal/flights] unexpected error:', err)
    return NextResponse.json({ error: 'Failed to save flights' }, { status: 500 })
  }
}
