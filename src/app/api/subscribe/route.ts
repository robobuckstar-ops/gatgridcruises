import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { welcomeEmail1 } from '@/lib/email-templates'
import { getBiggestPriceDrops } from '@/lib/data'
import { randomUUID } from 'crypto'

export interface Subscriber {
  id: string
  email: string
  name: string
  preferences: Record<string, unknown>
  confirmed: boolean
  unsubscribe_token: string
  created_at: string
}

// In-memory store (MVP — swap for Supabase when ready)
const subscribers: Subscriber[] = []

function getTopDeals() {
  return getBiggestPriceDrops()
    .slice(0, 3)
    .map(s => ({
      name: s.itinerary_name,
      ship: s.ship?.name ?? 'Disney',
      sailDate: s.sail_date,
      nights: s.length_nights,
      price: s.current_lowest_price,
      percentBelow: 'drop' in s ? Math.round((s as any).drop) : 0,
    }))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name = '', preferences = {} } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (subscribers.some(s => s.email === email)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    const unsubscribe_token = randomUUID()
    const subscriber: Subscriber = {
      id: randomUUID(),
      email,
      name,
      preferences,
      confirmed: true,
      unsubscribe_token,
      created_at: new Date().toISOString(),
    }
    subscribers.push(subscriber)

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const topDeals = getTopDeals()
        await resend.emails.send({
          from: 'Grayson Starbuck <bookings@gatgridcruises.com>',
          to: email,
          subject: 'Welcome to GatGrid Cruises — your first deal alert is ready',
          html: welcomeEmail1(name || email.split('@')[0], unsubscribe_token, topDeals),
        })
      } catch (emailErr) {
        console.error('Welcome email failed:', emailErr)
        // Don't fail the subscription if email sending fails
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Admin endpoint — protect with auth in production
  return NextResponse.json({ count: subscribers.length, subscribers })
}

// Exported for drip cron access
export { subscribers }
