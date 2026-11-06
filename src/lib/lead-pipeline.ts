// The full lead pipeline for the newer entry points (/api/meta-lead and
// /api/obc-estimate): CRM upsert, agent email alert, consented SMS, AI details
// email, Pushover. Each step is best effort and the outcome of each is reported
// in the push, so a failed email is visible instead of silently assumed sent.

import { AGENT_REPLY_TO, agentNotifyRecipients } from './agent-inbox'
import { saveLeadSafely, type LeadInput } from './airtable-leads'
import { deliverLeadAutoText, textOutcomeLabel, type LeadSource, type TextOutcome } from './lead-autotext'
import { sendLeadDetailsEmail, type LeadDetailsInput } from './lead-details-email'
import { sendPushover } from './pushover'
import { emailTransportConfigured, sendLifecycleEmail } from './send-email'

export interface PipelineLead {
  crm: LeadInput
  details: LeadDetailsInput
  smsConsent: boolean
  textSource: LeadSource
  /** Heading for the push and alert email, e.g. "Meta Lead Form". */
  label: string
}

export interface PipelineResult {
  crm: 'created' | 'updated' | 'duplicate' | 'failed'
  alertEmail: boolean
  detailsEmail: boolean
  text: TextOutcome
}

function esc(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function runLeadPipeline(lead: PipelineLead): Promise<PipelineResult> {
  const { crm, details } = lead
  const saved = await saveLeadSafely(crm)
  if (saved?.outcome === 'duplicate') {
    return { crm: 'duplicate', alertEmail: false, detailsEmail: false, text: 'no-consent' }
  }

  const summary = [
    `Name: ${crm.name}`,
    `Email: ${crm.email}`,
    `Phone: ${crm.phone || 'not provided'}`,
    `Source: ${lead.label}`,
    `Interest: ${crm.sailingInterest || 'not specified'}`,
    `Guests: ${crm.guests || 'not provided'}`,
    `Qualified: ${crm.qualified ?? 'N'}`,
    `SMS opt-in: ${lead.smsConsent ? 'yes' : 'no'}`,
    crm.notes ? `Notes: ${crm.notes}` : null,
  ].filter((line): line is string => line !== null)

  let alertEmail = false
  if (emailTransportConfigured()) {
    try {
      for (const to of agentNotifyRecipients()) {
        await sendLifecycleEmail({
          to,
          subject: `New lead (${lead.label}): ${crm.name}`,
          html: `<p>${summary.map(esc).join('<br>').replace(/\n/g, '<br>')}</p>`,
          fromName: 'GatGrid Leads',
          replyTo: crm.email || AGENT_REPLY_TO,
        })
      }
      alertEmail = true
    } catch (err) {
      console.error('[lead-pipeline] agent alert email failed:', err)
    }
  }

  const text = await deliverLeadAutoText(crm.phone ?? '', lead.smsConsent, {
    name: details.name,
    source: lead.textSource,
    knownPartySize: crm.guests,
  })
  const detailsEmail = await sendLeadDetailsEmail(crm.email, details)

  await sendPushover({
    title: `New GatGrid lead: ${crm.name}`,
    priority: 1,
    message: [
      ...summary.filter((line) => !line.startsWith('Notes:')),
      '',
      `CRM: ${saved ? saved.outcome : 'NOT SAVED'}`,
      `Email alert: ${alertEmail ? 'sent' : 'FAILED'}`,
      `Details email: ${detailsEmail ? 'sent' : 'FAILED'}`,
      `Auto-text: ${textOutcomeLabel(text)}`,
    ].join('\n'),
  })

  return { crm: saved ? saved.outcome : 'failed', alertEmail, detailsEmail, text }
}
