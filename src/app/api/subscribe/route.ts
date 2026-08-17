import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { Resend } from 'resend'
import { welcomeEmail1 } from '@/lib/email-templates'
import { getBiggestPriceDrops } from '@/lib/data'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { AirtableRequestError } from '@/lib/airtable-client'
import {
  isSubscriberStoreConfigured,
  listActiveSubscribers,
  markSubscriberEmailed,
  SUBSCRIBERS_TABLE,
  upsertSubscriber,
} from '@/lib/subscriber-store'

export const runtime = 'nodejs'

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

    const sanitizedPreferences: Record<string, unknown> = {}
    if (preferences && typeof preferences === 'object') {
      for (const [k, v] of Object.entries(preferences)) {
        sanitizedPreferences[sanitizeString(String(k))] =
          typeof v === 'string' ? sanitizeString(v) : v
      }
    }

    if (!isSubscriberStoreConfigured()) {
      // Better to tell the visitor it failed than to accept an address we
      // have nowhere to put — that's the leak this route used to have.
      console.error('[subscribe] AIRTABLE_API_KEY not set — refusing to accept a signup we cannot persist')
      return NextResponse.json({ error: 'Signup is temporarily unavailable' }, { status: 503 })
    }

    const sanitizedName = sanitizeString(String(name ?? ''))
    const source = sanitizedPreferences.source ? String(sanitizedPreferences.source) : 'site'

    let subscriber
    let outcome
    try {
      ;({ subscriber, outcome } = await upsertSubscriber({
        email: sanitizedEmail,
        name: sanitizedName,
        source,
        preferences: sanitizedPreferences,
      }))
    } catch (storeErr) {
      // Name the likely cause rather than leaving a bare 500 in the logs.
      if (storeErr instanceof AirtableRequestError) {
        if (storeErr.status === 404) {
          console.error(
            `[subscribe] Airtable table "${SUBSCRIBERS_TABLE}" not found in the base — create it (see docs/NEWSLETTER-SETUP.md) or set AIRTABLE_SUBSCRIBERS_TABLE`
          )
        } else if (storeErr.status === 401 || storeErr.status === 403) {
          console.error(
            '[subscribe] AIRTABLE_API_KEY is missing data.records:write on the base — signups cannot be stored'
          )
        }
      }
      // Tagged so a failed signup is always recoverable from the logs even
      // though the visitor is told to retry.
      console.error(`[subscribe] LOST SIGNUP email=${sanitizedEmail} source=${source}:`, storeErr)
      return NextResponse.json(
        { error: 'Something went wrong saving your signup. Please try again.' },
        { status: 500 }
      )
    }

    if (outcome === 'existing') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

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
          html: welcomeEmail1(
            sanitizedName || sanitizedEmail.split('@')[0],
            subscriber.unsubscribeToken,
            topDeals
          ),
        })
        // Record the send so /api/cron/drip picks up at day 3 instead of
        // re-sending the welcome.
        await markSubscriberEmailed(subscriber.id, { dripStage: 'Welcome Sent' })
      } catch (emailErr) {
        console.error('Welcome email failed:', emailErr)
        // Don't fail the subscription if email sending fails — the address is
        // already persisted, which is what matters.
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Admin list read. Now that the list is durable this returns real subscriber
 * PII, so it requires CRON_SECRET (Bearer, x-cron-secret, or ?secret=) — it
 * used to be an open endpoint that dumped every address.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSubscriberStoreConfigured()) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY not configured' }, { status: 503 })
  }

  try {
    const subscribers = await listActiveSubscribers()
    return NextResponse.json({ count: subscribers.length, subscribers })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to read subscribers', detail: String(err) },
      { status: 502 }
    )
  }
}
