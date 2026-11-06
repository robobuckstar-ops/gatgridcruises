// Days 3, 5, 8 and 12 after a lead comes in. Short, useful, signed by Grayson.
// No Disney logos. Always "onboard credit".

import { selectLeadSailings, type LeadDetailsInput } from './lead-details-email'
import { leadFirstName } from './lead-autotext'

export interface NurtureStep {
  day: number
  /** Value written to the Drip Sequence column once this step has gone out. */
  label: string
  subject: string
  body: (lead: NurtureLead) => string
}

export interface NurtureLead {
  name: string
  interest: string
  windowStart?: string
}

const p = (html: string) => `<p style="margin:0 0 14px;">${html}</p>`
const li = (html: string) => `<li style="margin:0 0 8px;">${html}</li>`
const link = (path: string, text: string) =>
  `<a href="https://gatgridcruises.com${path}" style="color:#1E3A5F;">${text}</a>`

function esc(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function seasonTips(month: number | null): string[] {
  const tips: string[] = []
  if (month === null) {
    tips.push('Shoulder-season sailings in late spring and early fall tend to be less crowded than school breaks.')
    return tips
  }
  if (month >= 6 && month <= 11) {
    tips.push('Caribbean and Bahamas sailings in June through November fall in hurricane season. Itineraries can change, so travel insurance is worth a look.')
  }
  if (month >= 5 && month <= 9) tips.push('Alaska sailings run in the summer. Pack layers, because port days can swing from sunny to wet.')
  if (month === 9 || month === 10) tips.push('Fall sailings can include Halloween on the High Seas, which adds costume fun to the trip.')
  if (month === 11 || month === 12) tips.push('Holiday sailings can include Very Merrytime Cruises, and those dates tend to book early.')
  if (!tips.length) tips.push('Winter and spring sailings sell out around school breaks, so check your dates against the school calendar first.')
  return tips
}

export const NURTURE_STEPS: NurtureStep[] = [
  {
    day: 3,
    label: 'Nurture Day 3',
    subject: 'The first-timer mistakes I see most',
    body: () =>
      p('Here are the first-timer mistakes I see most, so you can skip them:') +
      `<ul style="margin:0 0 14px;padding-left:20px;">${[
        'Booking without a travel advisor on the reservation. The fare is the same either way, but one version comes with onboard credit.',
        'Missing the final payment date, and with it the chance to get a refundable deposit back.',
        'Waiting until boarding day to think about dining changes, spa times or Port Adventures.',
        'Assuming a fare is locked. Prices move, and a drop before final payment can often be rebooked.',
      ].map(li).join('')}</ul>` +
      p(`More in the ${link('/guides/first-time-disney-cruise-tips', 'first-time tips guide')}.`),
  },
  {
    day: 5,
    label: 'Nurture Day 5',
    subject: 'How onboard credit and booking transfers work',
    body: () =>
      p('Onboard credit is spending money on your stateroom account for things like spa time, specialty dining and Port Adventures. You pay the same Disney fare either way. The credit comes out of the commission the cruise line pays the agency.') +
      p('It goes on your account after final payment, and the amount is confirmed in writing when you book.') +
      p('If you already booked directly with Disney, you may still be able to transfer the booking to us. Your ship, dates and stateroom stay the same. Disney sets the rules, including a limited window after booking, so sooner is better.') +
      p(`See ${link('/onboard-credit', 'how onboard credit works')} or ${link('/transfer', 'check a transfer')}. Already have a quote? Reply with it and I&#39;ll take a look.`),
  },
  {
    day: 8,
    label: 'Nurture Day 8',
    subject: 'Ship and itinerary tips for your dates',
    body: (lead) => {
      const input: LeadDetailsInput = { name: lead.name, interest: lead.interest, windowStart: lead.windowStart }
      const cards = selectLeadSailings(input).cards.slice(0, 2)
      const month = lead.windowStart ? Number(lead.windowStart.slice(5, 7)) : null
      const sailings = cards
        .map((c) => li(`<strong>${esc(c.ship)}</strong>: ${esc(c.itinerary)} (${esc(c.dates)})`))
        .join('')
      return (
        p('A few thoughts based on what you told me:') +
        (sailings ? `<ul style="margin:0 0 14px;padding-left:20px;">${sailings}</ul>` : '') +
        `<ul style="margin:0 0 14px;padding-left:20px;">${seasonTips(month).map((t) => li(esc(t))).join('')}</ul>` +
        p(`Compare the ships in the ${link('/ships', 'ship guide')}. If your dates have changed, just reply and tell me.`)
      )
    },
  },
  {
    day: 12,
    label: 'Nurture Day 12',
    subject: 'Placeholder bookings and when to book',
    body: () =>
      p('Two things worth knowing before you commit:') +
      `<ul style="margin:0 0 14px;padding-left:20px;">${[
        '<strong>Placeholder bookings.</strong> If you are on a ship now or have a placeholder from a past cruise, it can lower your fare on the next one. It also lowers the onboard credit estimate, so tell me and I&#39;ll run both numbers.',
        '<strong>Booking window.</strong> Popular dates and stateroom types go first. Book early for school breaks and holidays, and keep your final payment date on the calendar.',
      ].map(li).join('')}</ul>` +
      p(`More on ${link('/guides/best-time-to-book-disney-cruise', 'when to book')}. I&#39;m happy to help whenever you&#39;re ready. Just reply to this email.`),
  },
]

export function nurtureEmailHtml(step: NurtureStep, lead: NurtureLead, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;">
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${esc(leadFirstName(lead.name))},</p>
${step.body(lead)}
<p style="margin:0 0 4px;">Grayson</p>
<p style="margin:0 0 18px;font-size:13px;color:#64748B;">GatGrid Cruises &middot; bookings@gatgridcruises.com &middot; (405) 526-4956</p>
<p style="margin:0;padding-top:12px;border-top:1px solid #E2E8F0;font-size:12px;color:#94A3B8;">You got this because you asked GatGrid Cruises about a cruise. <a href="${esc(unsubscribeUrl)}" style="color:#64748B;">Unsubscribe</a></p>
</td></tr></table>
</td></tr></table></body></html>`
}

/** Next step due, or null. Legacy drip values and finished leads get nothing. */
export function nextNurtureStep(currentLabel: string, elapsedDays: number): NurtureStep | null {
  const current = currentLabel.trim()
  if (current === '' || current === 'Not Started') {
    return elapsedDays >= NURTURE_STEPS[0].day ? NURTURE_STEPS[0] : null
  }
  const index = NURTURE_STEPS.findIndex((s) => s.label === current)
  if (index < 0 || index === NURTURE_STEPS.length - 1) return null
  const next = NURTURE_STEPS[index + 1]
  return elapsedDays >= next.day ? next : null
}
