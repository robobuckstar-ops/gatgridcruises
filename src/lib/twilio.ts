// Twilio REST + webhook helpers for the shared SMS inbox.
//
// Credentials live entirely in env vars (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN
// / TWILIO_PHONE_NUMBER). None of them are set yet, so every entry point here
// reports a specific, actionable failure instead of throwing — an unconfigured
// deploy should surface "TWILIO_AUTH_TOKEN is not set", not a 500.

import { createHmac, timingSafeEqual } from 'crypto'

/** The GatGrid business line. Overridable so a test number can be swapped in. */
export const DEFAULT_BUSINESS_NUMBER = '+14055264956'

/**
 * The A2P-registered Messaging Service. Sending through this instead of the raw
 * From number is what keeps carriers from bouncing traffic with error 30034
 * ("message from an unregistered number") once volume picks up. Built in as a
 * default so a deploy sends registered without another env var to set; override
 * with TWILIO_MESSAGING_SERVICE_SID, or blank it to fall back to From.
 */
export const DEFAULT_MESSAGING_SERVICE_SID = 'MG533fff6462df2c6ac9cc5b444dd8bc83'

/** The messaging service to send through, or '' to send from the raw number. */
export function getMessagingServiceSid(): string {
  const override = env('TWILIO_MESSAGING_SERVICE_SID')
  if (override) return override
  // An explicit empty string in the env means "use the From number instead".
  if (process.env.TWILIO_MESSAGING_SERVICE_SID !== undefined) return ''
  return DEFAULT_MESSAGING_SERVICE_SID
}

export interface TwilioConfig {
  accountSid: string
  authToken: string
  fromNumber: string
}

function env(name: string): string {
  return process.env[name]?.trim() || ''
}

/** Which of the required Twilio env vars are still missing, in setup order. */
export function missingTwilioEnv(): string[] {
  const missing: string[] = []
  if (!env('TWILIO_ACCOUNT_SID')) missing.push('TWILIO_ACCOUNT_SID')
  if (!env('TWILIO_AUTH_TOKEN')) missing.push('TWILIO_AUTH_TOKEN')
  // TWILIO_PHONE_NUMBER falls back to the known business line, so it is only
  // reported as missing when the fallback has been blanked out deliberately.
  if (!env('TWILIO_PHONE_NUMBER') && !DEFAULT_BUSINESS_NUMBER) {
    missing.push('TWILIO_PHONE_NUMBER')
  }
  return missing
}

export function getTwilioConfig(): TwilioConfig | null {
  if (missingTwilioEnv().length) return null
  return {
    accountSid: env('TWILIO_ACCOUNT_SID'),
    authToken: env('TWILIO_AUTH_TOKEN'),
    fromNumber: normalizePhone(env('TWILIO_PHONE_NUMBER')) || DEFAULT_BUSINESS_NUMBER,
  }
}

/** The number texts are sent from — usable before credentials are configured. */
export function getBusinessNumber(): string {
  return normalizePhone(env('TWILIO_PHONE_NUMBER')) || DEFAULT_BUSINESS_NUMBER
}

/**
 * Normalize to E.164. Threading keys off this, so "(405) 526-4956",
 * "405-526-4956" and "+14055264956" all have to collapse to one conversation.
 * Anything that isn't a recognizable US/E.164 number is returned trimmed so a
 * short code or international sender still threads consistently with itself.
 */
export function normalizePhone(raw: string | null | undefined): string {
  const value = (raw ?? '').trim()
  if (!value) return ''

  const digits = value.replace(/\D/g, '')
  if (value.startsWith('+') && digits.length >= 8) return `+${digits}`
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return value
}

/** Last 10 digits — used to match a stored CRM phone written in any format. */
export function phoneDigits(raw: string | null | undefined): string {
  const digits = (raw ?? '').replace(/\D/g, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

export function formatPhoneDisplay(raw: string | null | undefined): string {
  const digits = phoneDigits(raw)
  if (digits.length !== 10) return (raw ?? '').trim() || 'Unknown'
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Verify Twilio's X-Twilio-Signature: base64 HMAC-SHA1, keyed with the auth
 * token, over the request URL followed by every POST parameter concatenated as
 * key+value in alphabetical order.
 * https://www.twilio.com/docs/usage/security#validating-requests
 */
export function validateTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string,
  authToken: string,
): boolean {
  if (!signature || !authToken) return false

  const payload = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url)

  const expected = createHmac('sha1', authToken).update(Buffer.from(payload, 'utf8')).digest('base64')

  const given = Buffer.from(signature)
  const want = Buffer.from(expected)
  if (given.length !== want.length) return false
  return timingSafeEqual(given, want)
}

/**
 * Rebuild the URL Twilio signed. The signature covers the exact string
 * configured in the Twilio console, so a proxy that rewrites the scheme or host
 * breaks validation — TWILIO_WEBHOOK_URL is the override for that case.
 */
export function webhookUrlFor(request: Request): string {
  const override = env('TWILIO_WEBHOOK_URL')
  if (override) return override

  const url = new URL(request.url)
  const proto = request.headers.get('x-forwarded-proto') || 'https'
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host
  return `${proto}://${host}${url.pathname}${url.search}`
}

export interface SendSmsResult {
  ok: boolean
  sid?: string
  /** Set when the send failed; safe to show to Grayson in the inbox UI. */
  error?: string
  status?: number
}

/** Send one SMS through the Twilio REST API. Never throws. */
export async function sendSms(to: string, body: string): Promise<SendSmsResult> {
  const missing = missingTwilioEnv()
  if (missing.length) {
    return {
      ok: false,
      status: 503,
      error: `Texting isn't configured yet — add ${missing.join(' and ')} in Vercel, then redeploy.`,
    }
  }

  const config = getTwilioConfig()!
  const toNumber = normalizePhone(to)
  if (!toNumber) return { ok: false, status: 400, error: 'A destination phone number is required.' }
  if (!body.trim()) return { ok: false, status: 400, error: 'Message text is required.' }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(config.accountSid)}/Messages.json`
  const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64')

  // Prefer the A2P-registered Messaging Service; Twilio picks the sending number
  // from the service's pool. Fall back to the raw From only if it is blanked out.
  const messagingServiceSid = getMessagingServiceSid()
  const params: Record<string, string> = { To: toNumber, Body: body }
  if (messagingServiceSid) {
    params.MessagingServiceSid = messagingServiceSid
  } else {
    params.From = config.fromNumber
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params).toString(),
      cache: 'no-store',
    })

    const data = (await res.json().catch(() => ({}))) as {
      sid?: string
      message?: string
      code?: number
    }

    if (!res.ok) {
      console.error('[twilio] send failed:', res.status, data?.code, data?.message)
      return {
        ok: false,
        status: res.status,
        // Twilio 21608 = unverified recipient on a trial account, 21606/21610
        // = from-number or opt-out problems. The raw message is the clearest
        // thing to show, so pass it through with the code for lookup.
        error: data?.message
          ? `Twilio ${data.code ?? res.status}: ${data.message}`
          : `Twilio rejected the message (HTTP ${res.status}).`,
      }
    }

    return { ok: true, sid: data.sid }
  } catch (err) {
    console.error('[twilio] send request threw:', err)
    return { ok: false, status: 502, error: 'Could not reach Twilio. Try again in a moment.' }
  }
}
