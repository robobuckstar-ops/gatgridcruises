import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeString(str: string): string {
  return str.replace(/[<>"'&]/g, '').trim().slice(0, 500)
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    // Rate limit: 3 signups per IP per hour
    const { allowed, retryAfter } = checkRateLimit(ip, 'subscribe', 3, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Please try again later' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const body = await request.json()
    const { email, name = '', preferences = {}, _honeypot } = body

    // Honeypot check — bots fill this field, real users never see it
    if (_honeypot) {
      return NextResponse.json({ success: true, message: 'Subscribed successfully' })
    }

    const sanitizedEmail = sanitizeString(email || '')
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (subscribers.some(s => s.email === sanitizedEmail)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    const sanitizedPreferences: Record<string, unknown> = {}
    if (preferences && typeof preferences === 'object') {
      for (const [k, v] of Object.entries(preferences)) {
        sanitizedPreferences[sanitizeString(String(k))] =
          typeof v === 'string' ? sanitizeString(v) : v
      }
    }

    const unsubscribe_token = randomUUID()
    const subscriber: Subscriber = {
      id: randomUUID(),
      email: sanitizedEmail,
      name: sanitizeString(name),
      preferences: sanitizedPreferences,
      confirmed: true,
      unsubscribe_token,
      created_at: new Date().toISOString(),
    }
    subscribers.push(subscriber)

    // Add contact to Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        const brevoBody: Record<string, unknown> = {
          email: sanitizedEmail,
          updateEnabled: false,
          attributes: {
            ...(sanitizedPreferences.source ? { SOURCE: String(sanitizedPreferences.source) } : {}),
          },
        }
        const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : null
        if (listId && !isNaN(listId)) {
          brevoBody.listIds = [listId]
        }
        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(brevoBody),
        })
        if (!brevoRes.ok && brevoRes.status !== 204) {
          const brevoErr = await brevoRes.text()
          console.error('Brevo contact creation failed:', brevoRes.status, brevoErr)
        }
      } catch (brevoErr) {
        console.error('Brevo API error:', brevoErr)
        // Don't fail the subscription if Brevo is unavailable
      }
    }

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const topDeals = getTopDeals()
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          to: sanitizedEmail,
          subject: 'Welcome to GatGrid Cruises — your first deal alert is ready',
          html: welcomeEmail1(name || sanitizedEmail.split('@')[0], unsubscribe_token, topDeals),
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
