// Attribution, qualification and reporting rules shared by every lead path.

export interface LeadAttribution {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  fbclid?: string
}

function clean(value: unknown, maxLen: number): string | undefined {
  const text = String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
  return text || undefined
}

/** Pull the tracking params a form forwarded from its cookies. */
export function readAttribution(body: Record<string, unknown>): LeadAttribution {
  return {
    utmSource: clean(body.utm_source, 80),
    utmMedium: clean(body.utm_medium, 80),
    utmCampaign: clean(body.utm_campaign, 80),
    utmContent: clean(body.utm_content, 80),
    fbclid: clean(body.fbclid, 500),
  }
}

/** Anything with TEST in the name stays out of reports and nurture emails. */
export function isTestLead(name: string): boolean {
  return name.includes('TEST')
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** First date a free-text answer names, as YYYY-MM-DD. Null when it names none. */
export function dateFromText(text: string): string | null {
  const t = text.toLowerCase()
  const iso = t.match(/\b(20\d{2})-(\d{2})(?:-(\d{2}))?/)
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3] ?? '01'}`
  const slash = t.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/)
  if (slash) return `${slash[3]}-${slash[1].padStart(2, '0')}-${slash[2].padStart(2, '0')}`
  const named = t.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(?:\d{1,2},?\s+)?(20\d{2})\b/)
  if (named) return `${named[2]}-${String(MONTHS.indexOf(named[1]) + 1).padStart(2, '0')}-01`
  const year = t.match(/\b(20\d{2})\b/)
  return year ? `${year[1]}-01-01` : null
}

/** Y when the lead already booked, or names a sailing within 18 months. */
export function computeQualified(
  input: { alreadyBooked?: boolean; sailDate?: string | null },
  today: string = new Date().toISOString().slice(0, 10),
): 'Y' | 'N' {
  if (input.alreadyBooked) return 'Y'
  if (!input.sailDate) return 'N'
  const limit = new Date(`${today}T12:00:00Z`)
  limit.setUTCMonth(limit.getUTCMonth() + 18)
  return input.sailDate.slice(0, 10) <= limit.toISOString().slice(0, 10) ? 'Y' : 'N'
}
