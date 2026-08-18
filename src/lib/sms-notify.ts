// Email alert for an inbound text, so Grayson hears about it without the
// Messages inbox being open. Reuses the existing Resend sender identity that
// the inquiry and concierge routes already send from.

import { Resend } from 'resend'
import { formatPhoneDisplay } from './twilio'

const NOTIFY_TO = process.env.SMS_NOTIFY_EMAIL?.trim() || 'bookings@gatgridcruises.com'
const FROM = '"GatGrid Texts" <bookings@gatgridcruises.com>'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export interface InboundAlert {
  from: string
  body: string
  contactName?: string
  readyToBook: boolean
  /** Absolute URL of the inbox, so the alert is one click from a reply. */
  inboxUrl: string
}

function alertHtml(alert: InboundAlert): string {
  const who = alert.contactName
    ? `${escapeHtml(alert.contactName)} · ${escapeHtml(formatPhoneDisplay(alert.from))}`
    : escapeHtml(formatPhoneDisplay(alert.from))

  const banner = alert.readyToBook
    ? `<p style="margin:0 0 16px;padding:10px 14px;background:#ecfdf5;border-left:4px solid #059669;border-radius:6px;color:#065f46;font-weight:600;">
         Looks like booking intent — worth answering fast.
       </p>`
    : ''

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#0f172a;">
    <p style="margin:0 0 4px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;">New text message</p>
    <h1 style="margin:0 0 18px;font-size:20px;">${who}</h1>
    ${banner}
    <blockquote style="margin:0 0 20px;padding:14px 16px;background:#f1f5f9;border-radius:10px;font-size:16px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(alert.body)}</blockquote>
    <p style="margin:0 0 8px;">
      <a href="${escapeHtml(alert.inboxUrl)}" style="display:inline-block;padding:11px 20px;background:#0f2c52;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Open the Messages inbox</a>
    </p>
    <p style="margin:16px 0 0;font-size:13px;color:#64748b;">Replying to this email does not text them back — use the inbox.</p>
  </div>`
}

/** Best effort: an alert that fails must never fail the inbound webhook. */
export async function notifyInboundMessage(alert: InboundAlert): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.warn('[sms-notify] RESEND_API_KEY not set — no email alert sent for inbound text')
    return false
  }

  const preview = alert.body.replace(/\s+/g, ' ').slice(0, 60)
  const label = alert.contactName || formatPhoneDisplay(alert.from)

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `${alert.readyToBook ? '🔥 Ready to book — ' : ''}Text from ${label}: ${preview}`,
      html: alertHtml(alert),
    })
    return true
  } catch (err) {
    console.error('[sms-notify] alert email failed:', err)
    return false
  }
}
