import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { leadMagnetDeliveryEmail } from '@/lib/email-templates'

export const runtime = 'nodejs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PDF_URL = 'https://gatgridcruises.com/downloads/disney-cruise-insiders-guide.pdf'

function sanitize(s: string, max = 200): string {
  return s.replace(/[<>"'&]/g, '').trim().slice(0, max)
}

async function addBrevoContact(
  apiKey: string,
  email: string,
  firstName: string,
  source: string
): Promise<void> {
  const body: Record<string, unknown> = {
    email,
    updateEnabled: true,
    attributes: {
      FIRSTNAME: firstName || undefined,
      SOURCE: source,
      LEAD_MAGNET: 'disney-cruise-insiders-guide',
    },
  }
  const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : null
  if (listId && !isNaN(listId)) body.listIds = [listId]

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok && res.status !== 204) {
    const text = await res.text()
    console.error('Brevo contact creation failed:', res.status, text)
  }
}

async function sendBrevoEmail(
  apiKey: string,
  email: string,
  name: string,
  subject: string,
  html: string
): Promise<void> {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Grayson Starbuck — GatGrid Cruises', email: 'bookings@gatgridcruises.com' },
      to: [{ email, name: name || email.split('@')[0] }],
      subject,
      htmlContent: html,
      tags: ['lead-magnet', 'insiders-guide'],
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error('Brevo email send failed:', res.status, text)
    throw new Error(`Brevo send failed: ${res.status}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const { allowed, retryAfter } = checkRateLimit(ip, 'lead-magnet', 5, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Please try again later' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const body = await request.json()
    const { email, name, _honeypot, source } = body

    if (_honeypot) {
      return NextResponse.json({ success: true, sent: true })
    }

    const cleanEmail = sanitize(String(email || ''))
    const cleanName = sanitize(String(name || ''), 80)
    const cleanSource = sanitize(String(source || 'lead-magnet'), 60)

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    const firstName = cleanName.split(/\s+/)[0] || cleanEmail.split('@')[0]

    const brevoKey = process.env.BREVO_API_KEY
    if (!brevoKey) {
      // In dev: don't fail the form — the PDF is still downloadable.
      console.warn('BREVO_API_KEY missing — skipping Brevo calls')
      return NextResponse.json({ success: true, sent: false, dev: true })
    }

    // Add to Brevo and send delivery email in parallel — both should succeed,
    // but we don't want a contact-create blip to block the delivery email.
    await Promise.allSettled([
      addBrevoContact(brevoKey, cleanEmail, firstName, cleanSource),
      sendBrevoEmail(
        brevoKey,
        cleanEmail,
        firstName,
        'Your free Disney Cruise Insider’s Guide is here 🎁',
        leadMagnetDeliveryEmail(firstName, PDF_URL)
      ),
    ])

    return NextResponse.json({ success: true, sent: true })
  } catch (err) {
    console.error('lead-magnet route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
