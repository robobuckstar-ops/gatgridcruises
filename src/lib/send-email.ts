import { Resend } from 'resend'

/**
 * Shared transactional-email sender for lifecycle / drip emails.
 *
 * Why this exists: the booking-milestones and lead-nurture crons used to send
 * ONLY through Brevo (BREVO_API_KEY). That key was never set in production, so
 * every lifecycle/drip email failed silently (or the whole cron 500'd). Resend
 * is already configured and proven for every other transactional path on the
 * site (inquiry, portal, transfer, deal-alerts, digest...), so this helper
 * prefers Resend and only falls back to Brevo if, for some reason, Resend is
 * not configured. Net effect: lifecycle emails now ride the working provider.
 */

const FROM_EMAIL = 'bookings@gatgridcruises.com'
const DEFAULT_FROM_NAME = 'Grayson Starbuck - GatGrid Cruises'

export interface LifecycleEmailArgs {
  to: string
  name?: string
  subject: string
  html: string
  fromName?: string
  replyTo?: string
}

/** True when at least one email transport (Resend or Brevo) is configured. */
export function emailTransportConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY || process.env.BREVO_API_KEY)
}

/**
 * Send one transactional email. Prefers Resend; falls back to Brevo.
 * Throws if neither provider is configured or the send fails, so callers can
 * log/record the error per-recipient instead of failing silently.
 */
export async function sendLifecycleEmail(
  args: LifecycleEmailArgs,
): Promise<{ provider: 'resend' | 'brevo' }> {
  const fromName = args.fromName ?? DEFAULT_FROM_NAME
  const replyTo = args.replyTo ?? FROM_EMAIL

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const resend = new Resend(resendKey)
    const { error } = await resend.emails.send({
      from: `"${fromName}" <${FROM_EMAIL}>`,
      to: args.to,
      replyTo,
      subject: args.subject,
      html: args.html,
    })
    if (error) {
      throw new Error(`Resend: ${typeof error === 'string' ? error : JSON.stringify(error)}`)
    }
    return { provider: 'resend' }
  }

  const brevoKey = process.env.BREVO_API_KEY
  if (brevoKey) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': brevoKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: fromName, email: FROM_EMAIL },
        to: [{ email: args.to, name: args.name ?? 'there' }],
        replyTo: { email: FROM_EMAIL, name: 'GatGrid Cruises' },
        subject: args.subject,
        htmlContent: args.html,
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Brevo ${res.status}: ${text}`)
    }
    return { provider: 'brevo' }
  }

  throw new Error('No email transport configured (set RESEND_API_KEY or BREVO_API_KEY)')
}
