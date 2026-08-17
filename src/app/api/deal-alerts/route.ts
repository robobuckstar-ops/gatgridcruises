import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { dealAlertEmail } from '@/lib/email-templates'
import { getBiggestPriceDrops } from '@/lib/data'
import { bulkSend } from '@/lib/bulk-send'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import {
  isSubscriberStoreConfigured,
  listActiveSubscribers,
  markSubscriberEmailed,
} from '@/lib/subscriber-store'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isSubscriberStoreConfigured()) {
    return NextResponse.json(
      { error: 'AIRTABLE_API_KEY not configured — no durable subscriber list' },
      { status: 503 }
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  // Find sailings with significant price drops (>10% below average)
  const drops = getBiggestPriceDrops().filter(s => {
    const drop = 'drop' in s ? (s as any).drop : 0
    return drop >= 10
  })

  if (drops.length === 0) {
    return NextResponse.json({ message: 'No significant drops to alert', alerts_sent: 0 })
  }

  // Take the best deal to alert on
  const topDrop = drops[0]
  const drop = Math.round('drop' in topDrop ? (topDrop as any).drop : 0)
  const avgPrice = topDrop.current_lowest_price / (1 - drop / 100)
  const savings = Math.round(avgPrice - topDrop.current_lowest_price)

  const preview = new URL(request.url).searchParams.get('preview') === '1'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const subscribers = await listActiveSubscribers()

    if (preview) {
      return NextResponse.json({
        preview: true,
        sailing: topDrop.itinerary_name,
        percent_drop: drop,
        recipients: subscribers.filter(s => s.lastAlertSailing !== topDrop.id).length,
        subscribers: subscribers.length,
      })
    }

    const result = await bulkSend(
      subscribers,
      sub => sub.email,
      async sub => {
        // This cron runs daily but the top drop often doesn't change for days.
        // Without this check the same alert would go out every morning.
        if (sub.lastAlertSailing === topDrop.id) return 'skipped'

        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          replyTo: 'bookings@gatgridcruises.com',
          to: sub.email,
          subject: `Price drop: ${topDrop.itinerary_name} — ${drop}% below average`,
          html: dealAlertEmail(
            {
              subscriberName: sub.name || sub.email.split('@')[0],
              sailingName: topDrop.itinerary_name,
              ship: topDrop.ship?.name ?? 'Disney',
              sailDate: topDrop.sail_date,
              nights: topDrop.length_nights,
              departurePort: topDrop.departure_port?.name ?? '',
              oldPrice: Math.round(avgPrice),
              newPrice: topDrop.current_lowest_price,
              savings,
              percentDrop: drop,
              dealUrl: `https://gatgridcruises.com/deals`,
            },
            sub.unsubscribeToken
          ),
        })
        await markSubscriberEmailed(sub.id, { alertSailingId: topDrop.id })
        return 'sent'
      }
    )

    return NextResponse.json({
      alerts_sent: result.sent,
      already_alerted: result.skipped,
      subscribers: subscribers.length,
      sailings_checked: drops.length,
      failed: result.failed,
      truncated: result.truncated,
      remaining: result.remaining,
      errors: result.errors,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Deal alert send failed', detail: String(err) },
      { status: 500 }
    )
  }
}
