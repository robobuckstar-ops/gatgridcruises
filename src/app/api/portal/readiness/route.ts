// Client-portal endpoint for the Traveler Readiness section: the guest records
// each traveler's travel-doc expiration and confirms their name matches the
// booking. Deliberately stores no passport numbers or images — just what the
// concierge needs to confirm everyone can board.

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/portal-auth'
import {
  AirtableError,
  fetchReadiness,
  saveReadiness,
  type TravelerReadiness,
} from '@/lib/portal-airtable'

export const runtime = 'nodejs'

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function sanitize(input: unknown): TravelerReadiness[] {
  if (!Array.isArray(input)) return []
  return input
    .map((t): TravelerReadiness => {
      const row = (t ?? {}) as Record<string, unknown>
      return {
        name: clean(row.name, 120),
        // Keep only a plain YYYY-MM-DD date; ignore anything else.
        expiration: /^\d{4}-\d{2}-\d{2}$/.test(String(row.expiration ?? ''))
          ? String(row.expiration)
          : '',
        country: clean(row.country, 60),
        nameMatches: row.nameMatches === true,
      }
    })
    .filter(t => t.name || t.expiration || t.country)
    .slice(0, 12)
}

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const apiKey = process.env.AIRTABLE_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const travelers = await fetchReadiness(session.bookingId, apiKey)
    return NextResponse.json({ travelers })
  } catch (err) {
    console.error('[portal/readiness] load failed:', err)
    return NextResponse.json({ error: 'Failed to load readiness' }, { status: 502 })
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

  const travelers = sanitize((body as { travelers?: unknown })?.travelers)

  try {
    await saveReadiness(session.bookingId, apiKey, travelers)
    return NextResponse.json({ travelers, saved: true })
  } catch (err) {
    if (err instanceof AirtableError) {
      console.error('[portal/readiness] Airtable save error:', err.message)
      return NextResponse.json({ error: 'Failed to save readiness' }, { status: 502 })
    }
    console.error('[portal/readiness] unexpected error:', err)
    return NextResponse.json({ error: 'Failed to save readiness' }, { status: 500 })
  }
}
