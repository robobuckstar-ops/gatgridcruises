/**
 * A2P 10DLC SMS opt-in, shared by the lead forms and the API routes they post to.
 *
 * SMS_CONSENT_TEXT is the exact consent language registered with Twilio for the
 * 10DLC campaign — carriers compare the copy on the page against what was
 * submitted, so the string is the single source of truth for every form that
 * shows the checkbox. Change it here (and in the campaign registration)
 * together, never in one place only.
 *
 * Consent is always optional and never gates a submission; the routes record
 * whichever answer came back so the opt-in is auditable per lead.
 */

export const SMS_CONSENT_TEXT =
  'I agree to receive recurring SMS text messages from GatGrid Cruises about my cruise (price-drop and deal alerts, booking and quote updates). Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.'

/** Truthy only for a real boolean/`"true"` — an absent field reads as no consent. */
export function readSmsConsent(value: unknown): boolean {
  return value === true || value === 'true'
}

/**
 * The line appended to a lead's notes. Written for both answers so a record
 * without an opt-in is distinguishable from one submitted before this existed.
 */
export function smsConsentNote(consented: boolean, source: string): string {
  return consented
    ? `SMS consent: YES — opted in to recurring SMS via the ${source} form at ${new Date().toISOString()} (registered 10DLC language)`
    : 'SMS consent: no (box left unchecked)'
}
