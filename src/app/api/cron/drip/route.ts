import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { welcomeEmail2, welcomeEmail3 } from '@/lib/email-templates'
import { bulkSend } from '@/lib/bulk-send'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import {
  daysSince,
  isSubscriberStoreConfigured,
  listActiveSubscribers,
  markSubscriberEmailed,
  type DripStage,
  type Subscriber,
} from '@/lib/subscriber-store'

export const runtime = 'nodejs'
export const maxDuration = 60

interface DripStep {
  /** Earliest day-since-signup this step may go out. */
  day: number
  /** Stage a subscriber must be in to receive it. */
  from: DripStage[]
  /** Stage recorded after a successful send. */
  to: DripStage
  subject: string
  template: (name: string, token: string) => string
}

// Progress is tracked per subscriber in Airtable ("Drip Stage") rather than
// derived from an exact day count. The old version only matched `days === 3`
// and `days === 7`, so a subscriber was skipped forever if the cron missed a
// day, and could be mailed twice if it ran twice. Stage-based means each email
// goes out exactly once, on or after its day.
const DRIP_STEPS: DripStep[] = [
  {
    day: 3,
    from: ['', 'Welcome Sent'],
    to: 'Day 3 Sent',
    subject: 'How we find deals most people miss',
    template: welcomeEmail2,
  },
  {
    day: 7,
    from: ['Day 3 Sent'],
    to: 'Completed',
    subject: 'The credit cards that save you $500+ on a Disney cruise',
    template: welcomeEmail3,
  },
]

function nextStepFor(sub: Subscriber): DripStep | null {
  const age = daysSince(sub.createdAt)
  return (
    DRIP_STEPS.find(step => step.from.includes(sub.dripStage) && age >= step.day) ?? null
  )
}

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

  const preview = new URL(request.url).searchParams.get('preview') === '1'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const subscribers = await listActiveSubscribers()
    const due = subscribers
      .map(sub => ({ sub, step: nextStepFor(sub) }))
      .filter((entry): entry is { sub: Subscriber; step: DripStep } => entry.step !== null)

    if (preview) {
      return NextResponse.json({
        preview: true,
        subscribers: subscribers.length,
        due: due.map(({ sub, step }) => `day${step.day}:${sub.email}`),
      })
    }

    const sentLabels: string[] = []

    const result = await bulkSend(
      due,
      ({ sub }) => sub.email,
      async ({ sub, step }) => {
        await resend.emails.send({
          from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
          replyTo: 'bookings@gatgridcruises.com',
          to: sub.email,
          subject: step.subject,
          html: step.template(sub.name || sub.email.split('@')[0], sub.unsubscribeToken),
        })
        await markSubscriberEmailed(sub.id, { dripStage: step.to })
        sentLabels.push(`day${step.day}:${sub.email}`)
        return 'sent'
      }
    )

    return NextResponse.json({
      subscribers: subscribers.length,
      due: due.length,
      sent: result.sent,
      sent_list: sentLabels,
      failed: result.failed,
      truncated: result.truncated,
      remaining: result.remaining,
      errors: result.errors,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Drip send failed', detail: String(err) },
      { status: 500 }
    )
  }
}
