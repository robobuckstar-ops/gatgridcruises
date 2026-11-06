// A submission that trips a bot check (the hidden field was filled, or the form
// came back in under 2 seconds) is usually a bot, but autofill can trip both. So
// it is never dropped: it goes to the CRM and Grayson flagged "possible bot".
// Nothing is sent to the address, since a bot may have typed a stranger's email,
// and the response carries `flagged` so the form skips its conversion events.

import { NextResponse } from 'next/server'
import { AGENT_REPLY_TO, agentNotifyRecipients } from './agent-inbox'
import { saveLeadSafely } from './airtable-leads'
import { readAttribution } from './lead-tracking'
import { sendPushover } from './pushover'
import { emailTransportConfigured, sendLifecycleEmail } from './send-email'

export const POSSIBLE_BOT_SOURCE = 'Possible Bot'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, maxLen: number): string {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function esc(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function recordPossibleBot(
  body: Record<string, unknown>,
  route: string,
  reason: string,
): Promise<NextResponse> {
  const email = clean(body.email, 200).toLowerCase()
  const name = clean(body.name ?? body.full_name, 200) || email || 'Unknown'
  const phone = clean(body.phone, 50)
  const notes = [
    `POSSIBLE BOT (${reason}) on ${route}. No auto-email or text was sent.`,
    clean(body.notes, 2000),
  ]
    .filter(Boolean)
    .join('\n')

  // No usable way to reach them means there is no lead to save.
  if (!EMAIL_REGEX.test(email) && !phone) {
    console.warn(`[possible-bot] ${route}: ${reason}, with no valid email or phone`)
    return NextResponse.json({ success: true, flagged: true })
  }

  const saved = EMAIL_REGEX.test(email)
    ? await saveLeadSafely({
        name,
        email,
        phone,
        notes,
        source: `possible-bot-${route}`,
        leadSource: POSSIBLE_BOT_SOURCE,
        ...readAttribution(body),
      })
    : null

  const summary = `${name} | ${email || 'no email'} | ${phone || 'no phone'} | ${route} | ${reason}`
  if (emailTransportConfigured()) {
    for (const to of agentNotifyRecipients()) {
      await sendLifecycleEmail({
        to,
        subject: `Possible bot lead on ${route}: ${name}`,
        html: `<p>${esc(summary)}</p><p>${esc(notes).replace(/\n/g, '<br>')}</p>`,
        fromName: 'GatGrid Leads',
        replyTo: AGENT_REPLY_TO,
      }).catch((err) => console.error('[possible-bot] alert email failed:', err))
    }
  }
  await sendPushover({
    title: `Possible bot lead: ${name}`,
    message: `${summary}\nCRM: ${saved ? saved.outcome : 'NOT SAVED'}\nNothing was sent to them. Check it if it looks real.`,
    priority: 0,
  })

  return NextResponse.json({ success: true, flagged: true })
}
