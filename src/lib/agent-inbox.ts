// Who actually gets pinged when a lead comes in.
//
// Every lead form used to send its internal alert to bookings@gatgridcruises.com
// and nothing else. That address is the right public face — it's the From and
// the Reply-To on everything a customer sees — but it is not a mailbox Grayson
// reads on his phone, so live submissions produced a customer auto-ack and a
// CRM row while the alert itself went nowhere anyone was watching.
//
// So the two roles are split apart here:
//
//   AGENT_REPLY_TO       — public-facing. Appears in From/Reply-To on customer
//                          mail. Never change this to a personal address.
//   agentNotifyRecipients() — internal only. Never shown to a customer; it is
//                          only ever the `to` on a lead alert.
//
// Both default to working values so a deploy needs no env change; set
// AGENT_NOTIFY_EMAILS (comma-separated) to redirect alerts without a code push.

/** Public-facing address: From / Reply-To on customer-visible mail. */
export const AGENT_REPLY_TO = 'bookings@gatgridcruises.com'

/**
 * Grayson's real, phone-alerted inbox. Kept first in the default list so the
 * alert lands somewhere he sees within seconds; bookings@ stays on as the
 * shared archive copy.
 */
const DEFAULT_NOTIFY = ['robobuckstar@gmail.com', AGENT_REPLY_TO]

/**
 * Recipients for an internal "new lead" alert.
 *
 * Resend accepts an array for `to`, so every address gets the same message.
 * A malformed AGENT_NOTIFY_EMAILS falls back to the defaults rather than
 * silently sending the alert to nobody — losing a lead alert is the exact
 * failure this module exists to prevent.
 */
export function agentNotifyRecipients(): string[] {
  const configured = process.env.AGENT_NOTIFY_EMAILS?.trim()
  if (!configured) return DEFAULT_NOTIFY

  const parsed = configured
    .split(',')
    .map(address => address.trim())
    .filter(address => address.includes('@'))

  if (!parsed.length) {
    console.warn(
      '[agent-inbox] AGENT_NOTIFY_EMAILS is set but contains no valid address — using defaults',
    )
    return DEFAULT_NOTIFY
  }

  return parsed
}
