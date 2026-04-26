import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, COOKIE_NAME } from '@/lib/portal-auth'

// Required: Node.js runtime for crypto module — edge runtime does not support Node's crypto
export const runtime = 'nodejs'

const AIRTABLE_BASE = 'applSFcQkOus2fFsx'
const BOOKINGS_TABLE = 'tblOrV5YCbhg0Lbcw'
const CLIENTS_TABLE = 'tbldsgnJfdvwq0UHB'

const F = {
  bookingName: 'fldudzWVLJKexg3EX',
  ship: 'fld5f1KYgrbiiTFjo',
  sailingDate: 'fldOqulAXwFKhz4o5',
  returnDate: 'fldKpg3IiPV6dVURb',
  nights: 'fldHEImBfezP4v9DT',
  itinerary: 'fldr3Gm7U8qGYkZ9L',
  stateroomCategory: 'fldHCyzsnnC8gtmhT',
  stateroomNumber: 'fldX6YrRpiebssAbc',
  bookingPrice: 'fldEcNlprggM5r8rS',
  commissionEstimated: 'fldc055RT4xllonhl',
  obcAmount: 'fldvKZ0tpzhDygEfS',
  phase: 'fldv7osctT7kB1QAI',
  clientEmail: 'fldo5NBN0Vra8wgYj',
  client: 'fld6tu0nat2TiEgCZ',
}

const CF = {
  name: 'fldKgygvHS6sTCMQG',
}

function airtableUrl(base: string, table: string, params?: string): string {
  return `https://api.airtable.com/v0/${base}/${table}${params ? `?${params}` : ''}`
}

async function airtableFetch(url: string, apiKey: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable ${res.status}: ${text}`)
  }
  return res.json()
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY
    if (!apiKey) {
      // Vercel env diagnostic: log which portal/airtable vars are present
      const presentVars = Object.keys(process.env).filter(
        k => k.includes('AIRTABLE') || k.includes('PORTAL') || k.includes('BREVO')
      )
      console.error('[portal/login] AIRTABLE_API_KEY missing. Present env vars:', presentVars)
      return NextResponse.json({ error: 'Service unavailable', code: 'NO_AIRTABLE_KEY' }, { status: 503 })
    }
    if (!process.env.PORTAL_JWT_SECRET) {
      console.error('[portal/login] PORTAL_JWT_SECRET missing')
      return NextResponse.json({ error: 'Service unavailable', code: 'NO_JWT_SECRET' }, { status: 503 })
    }

    const body = await request.json()
    const { bookingNumber, lastName, email } = body

    if (!bookingNumber || !lastName || !email) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const normalizedNumber = bookingNumber.trim().replace(/^#*/, '#')
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedLastName = lastName.trim().toLowerCase()

    const formula = encodeURIComponent(`{Booking Name}="${normalizedNumber}"`)
    const fieldParams = Object.values(F).map(id => `fields[]=${id}`).join('&')
    const searchUrl = airtableUrl(
      AIRTABLE_BASE,
      BOOKINGS_TABLE,
      `filterByFormula=${formula}&${fieldParams}`
    )

    const data = await airtableFetch(searchUrl, apiKey)
    const records = data.records ?? []

    if (records.length === 0) {
      return NextResponse.json({ error: 'Booking not found. Please check your booking number.' }, { status: 401 })
    }

    const booking = records[0]
    const fields = booking.fields

    const bookingEmail = String(fields[F.clientEmail] ?? '').toLowerCase()
    if (!bookingEmail || bookingEmail !== normalizedEmail) {
      return NextResponse.json({ error: 'The details you entered do not match our records.' }, { status: 401 })
    }

    const clientIds = fields[F.client] as string[] | undefined
    let clientName = ''

    if (clientIds && clientIds.length > 0) {
      try {
        const clientRes = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE}/${CLIENTS_TABLE}/${clientIds[0]}?fields[]=${CF.name}`,
          { headers: { Authorization: `Bearer ${apiKey}` }, next: { revalidate: 0 } }
        )
        if (clientRes.ok) {
          const clientData = await clientRes.json()
          clientName = String(clientData.fields?.[CF.name] ?? '')
        }
      } catch {
        // Fall back to email-only verification if client lookup fails
      }
    }

    if (clientName) {
      const words = clientName.trim().split(/\s+/)
      const lastWord = words[words.length - 1].toLowerCase()
      if (lastWord !== normalizedLastName) {
        return NextResponse.json({ error: 'The details you entered do not match our records.' }, { status: 401 })
      }
    }

    const token = createSessionToken({
      bookingId: booking.id,
      bookingName: normalizedNumber,
      email: normalizedEmail,
      clientName: clientName || normalizedEmail.split('@')[0],
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Portal login error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
