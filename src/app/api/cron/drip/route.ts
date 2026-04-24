import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { welcomeEmail2, welcomeEmail3 } from '@/lib/email-templates'
import { subscribers } from '@/app/api/subscribe/route'

function daysSince(isoDate: string): number {
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / 86_400_000)
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret') ?? new URL(request.url).searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const sent: string[] = []
  const errors: string[] = []

  for (const sub of subscribers) {
    if (!sub.confirmed) continue
    const days = daysSince(sub.created_at)

    try {
      if (days === 3) {
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          to: sub.email,
          subject: 'How we find deals most people miss',
          html: welcomeEmail2(sub.name || sub.email.split('@')[0], sub.unsubscribe_token),
        })
        sent.push(`day3:${sub.email}`)
      } else if (days === 7) {
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          to: sub.email,
          subject: 'The credit cards that save you $500+ on a Disney cruise',
          html: welcomeEmail3(sub.name || sub.email.split('@')[0], sub.unsubscribe_token),
        })
        sent.push(`day7:${sub.email}`)
      }
    } catch (err) {
      errors.push(`${sub.email}: ${err}`)
    }
  }

  return NextResponse.json({ sent: sent.length, sent_list: sent, errors })
}
