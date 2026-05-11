import { NextRequest, NextResponse } from 'next/server'
import {
  leadNurtureDay1,
  leadNurtureDay3,
  leadNurtureDay7,
  leadNurtureDay14,
  leadNurtureDay21,
  leadNurtureDay30,
  leadNurtureDay45,
} from '@/lib/email-templates'

export const runtime = 'nodejs'

const AIRTABLE_BASE = 'applSFcQkOus2fFsx'
const LEADS_TABLE = 'tblc8JHpcgEOnmCoj'

// Field IDs from the GatGrid Leads table
const F = {
  leadName: 'fldGvA1skW1RV2sji',
  email: 'fldagqzAWVT2rbvYT',
  pipelineStage: 'fld4tGfjFmJnYw0uV',
  firstContactDate: 'fldMdxtmz7wmzRuUj',
  lastContactDate: 'fldsrvDbLelP46dnw',
  nextFollowUp: 'fldPUqtPvTJKMDqgV',
  dripSequence: 'fldeDE4WvAVi7ZyGs',
}

// Pipeline stages that should NOT receive drip emails
const EXCLUDED_STAGES = ['Converted', 'Lost', 'Unsubscribed', 'Ready to Book']

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000)
}

interface DripStep {
  day: number
  sequenceLabel: string
  templateFn: (name: string) => string
  subject: string
}

const DRIP_STEPS: DripStep[] = [
  {
    day: 1,
    sequenceLabel: 'Day 1 - Welcome',
    templateFn: leadNurtureDay1,
    subject: 'Thanks for reaching out — here are some resources',
  },
  {
    day: 3,
    sequenceLabel: 'Day 3 - Value Add',
    templateFn: leadNurtureDay3,
    subject: 'Quick question about your Disney cruise plans',
  },
  {
    day: 7,
    sequenceLabel: 'Day 7 - Social Proof',
    templateFn: leadNurtureDay7,
    subject: 'What other families are saying about GatGrid Cruises',
  },
  {
    day: 14,
    sequenceLabel: 'Day 14 - Urgency',
    templateFn: leadNurtureDay14,
    subject: 'Disney cruise prices are moving — here\'s what to know',
  },
  {
    day: 21,
    sequenceLabel: 'Day 21 - Ship Choice',
    templateFn: leadNurtureDay21,
    subject: 'Which Disney ship is right for your family?',
  },
  {
    day: 30,
    sequenceLabel: 'Day 30 - Last Chance',
    templateFn: leadNurtureDay30,
    subject: 'Still thinking about a Disney cruise?',
  },
  {
    day: 45,
    sequenceLabel: 'Day 45 - Soft Close',
    templateFn: leadNurtureDay45,
    subject: 'A friendly goodbye for now — keep in touch',
  },
]

async function airtableFetch(url: string, apiKey: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Airtable ${res.status}: ${text}`)
  }
  return res.json()
}

async function sendBrevoEmail(
  apiKey: string,
  to: { email: string; name: string },
  subject: string,
  htmlContent: string
) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Grayson Starbuck - GatGrid Cruises', email: 'bookings@gatgridcruises.com' },
      to: [to],
      subject,
      htmlContent,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Brevo ${res.status}: ${text}`)
  }
  return res.json()
}

export async function GET(request: NextRequest) {
  const secret =
    request.headers.get('x-cron-secret') ??
    new URL(request.url).searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const airtableKey = process.env.AIRTABLE_API_KEY
  const brevoKey = process.env.BREVO_API_KEY
  if (!airtableKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY not configured' }, { status: 500 })
  }
  if (!brevoKey) {
    return NextResponse.json({ error: 'BREVO_API_KEY not configured' }, { status: 500 })
  }

  const sent: string[] = []
  const errors: string[] = []
  const updated: string[] = []

  try {
    // Fetch all leads that are NOT converted/lost/unsubscribed and have NOT completed the drip
    const excludeFormula = EXCLUDED_STAGES.map(
      (s) => `{Pipeline Stage}!="${s}"`
    ).join(',')
    const formula = encodeURIComponent(
      `AND(${excludeFormula},{Drip Sequence}!="Completed",{Drip Sequence}!="Opted Out",{Email}!="")`
    )
    const fieldParams = Object.values(F)
      .map((id) => `fields[]=${id}`)
      .join('&')
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${LEADS_TABLE}?filterByFormula=${formula}&${fieldParams}`

    const data = await airtableFetch(url, airtableKey)
    const records = data.records ?? []

    for (const record of records) {
      const fields = record.fields
      const name = String(fields[F.leadName] ?? '').split(' ')[0] || 'there'
      const email = String(fields[F.email] ?? '')
      const firstContact = String(fields[F.firstContactDate] ?? '')
      const currentDrip = String(fields[F.dripSequence] ?? 'Not Started')

      if (!email || !firstContact) continue

      const elapsed = daysSince(firstContact)

      // Find the next drip step this lead should receive
      const currentStepIndex = DRIP_STEPS.findIndex(
        (s) => s.sequenceLabel === currentDrip
      )

      // Determine which step to send
      let stepToSend: DripStep | null = null

      if (currentDrip === 'Not Started' || currentDrip === '') {
        // Haven't started — send Day 1 if at least 1 day has passed
        if (elapsed >= 1) {
          stepToSend = DRIP_STEPS[0]
        }
      } else if (currentStepIndex >= 0 && currentStepIndex < DRIP_STEPS.length - 1) {
        // Already on a step — check if it's time for the next one
        const nextStep = DRIP_STEPS[currentStepIndex + 1]
        if (elapsed >= nextStep.day) {
          stepToSend = nextStep
        }
      }

      if (!stepToSend) continue

      try {
        const html = stepToSend.templateFn(name)
        await sendBrevoEmail(brevoKey, { email, name }, stepToSend.subject, html)
        sent.push(`${stepToSend.sequenceLabel}:${email}`)

        // Determine new drip sequence value
        const isLastStep =
          DRIP_STEPS.indexOf(stepToSend) === DRIP_STEPS.length - 1
        const newDripValue = isLastStep ? 'Completed' : stepToSend.sequenceLabel

        // Update the lead record in Airtable
        await airtableFetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE}/${LEADS_TABLE}/${record.id}`,
          airtableKey,
          {
            method: 'PATCH',
            body: JSON.stringify({
              fields: {
                [F.dripSequence]: newDripValue,
                [F.lastContactDate]: new Date().toISOString().split('T')[0],
              },
            }),
          }
        )
        updated.push(record.id)
      } catch (err) {
        errors.push(`${email}: ${err}`)
      }
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to process leads', detail: String(err) },
      { status: 500 }
    )
  }

  return NextResponse.json({
    processed: sent.length,
    sent,
    updated,
    errors,
    timestamp: new Date().toISOString(),
  })
}
