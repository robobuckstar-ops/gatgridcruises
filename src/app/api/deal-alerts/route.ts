import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { dealAlertEmail } from '@/lib/email-templates'
import { subscribers } from '@/app/api/subscribe/route'
import { getBiggestPriceDrops } from '@/lib/data'

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret') ?? new URL(request.url).searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

  const resend = new Resend(process.env.RESEND_API_KEY)
  const confirmedSubs = subscribers.filter(s => s.confirmed)
  let sent = 0
  const errors: string[] = []

  for (const sub of confirmedSubs) {
    try {
      await resend.emails.send({
        from: 'Grayson Starbuck <bookings@gatgridcruises.com>',
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
          sub.unsubscribe_token
        ),
      })
      sent++
    } catch (err) {
      errors.push(`${sub.email}: ${err}`)
    }
  }

  return NextResponse.json({ alerts_sent: sent, sailings_checked: drops.length, errors })
}
