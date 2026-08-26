import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { saveLeadSafely } from '@/lib/airtable-leads'
import { AGENT_REPLY_TO, agentNotifyRecipients } from '@/lib/agent-inbox'
import { leadFirstName, missingLeadDetails, sendLeadAutoText } from '@/lib/lead-autotext'
import { sendPushover } from '@/lib/pushover'

// Quote requests from the /free-quote paid-ad landing page.
//
// Same delivery contract as /api/transfer: the lead is written to the Airtable
// CRM and emailed to the agent inbox, and the request only fails if BOTH paths
// fail. Kept as its own route rather than folded into /api/concierge so the
// Source column reads "free-quote": ad spend is only worth measuring if the
// leads it buys are distinguishable in the CRM.
//
// Once the lead is safely recorded, three best-effort follow-ups fire: the
// email acknowledgment, a welcome text to the lead, and a high-priority push to
// Grayson. None of them can fail the submission.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AGENT_INBOX = AGENT_REPLY_TO

function sanitize(value: unknown, maxLen: number): string {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, maxLen)
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function agentNotificationHtml(p: {
  name: string
  email: string
  phone: string
  timeframe: string
  party_size: string
  sailing_interest: string
  notes: string
  referral_code?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}): string {
  const blank = '<em style="color:#94A3B8;">not provided</em>'
  const rows: [string, string][] = [
    ['Name', escapeHtml(p.name)],
    ['Email', `<a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a>`],
    ['Phone', p.phone ? escapeHtml(p.phone) : blank],
    ['Sail timeframe', escapeHtml(p.timeframe)],
    ['Party size', escapeHtml(p.party_size)],
    ['Ship / itinerary', p.sailing_interest ? escapeHtml(p.sailing_interest) : blank],
  ]
  if (p.referral_code) rows.push(['Referral code', escapeHtml(p.referral_code)])
  if (p.utm_source) rows.push(['UTM source', escapeHtml(p.utm_source)])
  if (p.utm_medium) rows.push(['UTM medium', escapeHtml(p.utm_medium)])
  if (p.utm_campaign) rows.push(['UTM campaign', escapeHtml(p.utm_campaign)])

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;font-size:13px;color:#64748B;width:38%;">${k}</td><td style="padding:6px 10px;font-size:13px;color:#0F172A;font-weight:600;">${v}</td></tr>`,
    )
    .join('')

  const notesBlock = p.notes
    ? `<div style="margin-top:18px;background:#F8FAFC;border-left:4px solid #1E3A5F;padding:12px 14px;font-size:13px;color:#334155;line-height:1.5;"><strong>Notes:</strong><br>${escapeHtml(p.notes).replace(/\n/g, '<br>')}</div>`
    : ''

  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:18px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:18px;font-weight:bold;">Free quote request (paid ad)</td></tr>
<tr><td style="padding:22px 24px;">
<div style="margin-bottom:16px;background:#FEF3C7;border-left:4px solid #D4AF37;padding:10px 14px;font-size:13px;color:#78350F;line-height:1.5;">
<strong>Paid traffic.</strong> This lead cost money to acquire, so reply today while the ad click is still fresh.
</div>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">${rowsHtml}</table>
${notesBlock}
<p style="margin:24px 0 0;font-size:11px;color:#94A3B8;">Submitted via gatgridcruises.com /free-quote. Reply directly to respond to ${escapeHtml(p.name)}.</p>
</td></tr></table>
</td></tr></table></body></html>`
}

function questionListHtml(questions: string[]): string {
  if (!questions.length) return ''
  const items = questions
    .map((q) => `<li style="margin:0 0 6px;">${escapeHtml(q.charAt(0).toUpperCase() + q.slice(1))}?</li>`)
    .join('')
  return `<ul style="margin:0 0 14px;padding-left:20px;color:#334155;">${items}</ul>`
}

// Customer-facing acknowledgment. Written as Grayson, first person, no dashes,
// and no fare quoted anywhere. The questions come from the same helper the
// welcome text uses, so the email and the SMS never ask different things.
function confirmationHtml(name: string, questions: string[]): string {
  const firstName = leadFirstName(name)
  const asks = questionListHtml(questions)
  return `<!DOCTYPE html>
<html><body style="margin:0;background:#F1F5F9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:24px 12px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
<tr><td style="background:#1E3A5F;padding:20px 24px;color:#D4AF37;font-family:Georgia,serif;font-size:20px;font-weight:bold;">I got your quote request</td></tr>
<tr><td style="padding:24px;font-size:15px;color:#334155;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 14px;">It's Grayson. Your request just landed and I'm on it. I'll put together options that fit your dates and your group and send them back to you today.</p>
${asks ? `<p style="margin:0 0 8px;">A couple of quick things would help me get this right the first time:</p>${asks}` : ''}
<p style="margin:0 0 14px;">Just hit reply and tell me. I may have texted you the same questions, so whichever is easier is fine by me.</p>
<div style="background:#F0F7FF;border:1px solid #BFDBFE;border-radius:8px;padding:20px;margin:0 0 14px;text-align:center;">
<p style="margin:0 0 6px;color:#1E3A5F;font-weight:600;font-size:15px;">📇 Save my contact so we don't get lost in spam</p>
<p style="margin:0 0 14px;color:#64748B;font-size:13px;line-height:1.5;">My texts and emails sometimes land in spam or the Promotions tab. Tap below to save my number and email (works on iPhone and Android), and you won't miss anything I send.</p>
<a href="https://gatgridcruises.com/grayson-gatgrid.vcf" style="display:inline-block;background:#1E3A5F;color:#D4AF37;padding:12px 26px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Save Grayson's Contact &rarr;</a>
<p style="margin:14px 0 0;color:#94A3B8;font-size:12px;line-height:1.5;">Prefer to add it by hand? Cell <strong>(405) 526-4956</strong> · <strong>bookings@gatgridcruises.com</strong></p>
</div>
<p style="margin:0 0 14px;">One thing worth saying up front: Disney sets the fare, so booking through me costs you nothing extra. The onboard credit your booking earns comes out of the commission Disney pays the agency, not out of your pocket.</p>
<p style="margin:0 0 14px;">There's no obligation either. If you look everything over and decide to book somewhere else, that is completely fine.</p>
<p style="margin:0 0 4px;">Talk soon,</p>
<p style="margin:0 0 4px;">Dr. Grayson Starbuck, DPT</p>
<p style="margin:0;font-size:13px;color:#64748B;">GatGrid Cruises · bookings@gatgridcruises.com</p>
</td></tr></table>
</td></tr></table></body></html>`
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  // 3 quote requests per hour per IP, matching /api/transfer and /api/concierge.
  const { allowed, retryAfter } = checkRateLimit(ip, 'free-quote', 3, 60 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: bots fill it, humans never see it. Silently 200 to avoid hinting.
  if (body._honeypot) {
    return NextResponse.json({ success: true })
  }

  const name = sanitize(body.name, 200)
  const email = sanitize(body.email, 200).toLowerCase()
  const timeframe = sanitize(body.timeframe, 80)
  const party_size = sanitize(body.party_size, 80)

  if (!name || !email || !EMAIL_REGEX.test(email) || !timeframe || !party_size) {
    return NextResponse.json({ error: 'Required fields missing or invalid' }, { status: 400 })
  }

  const phone = sanitize(body.phone, 50)
  const sailing_interest = sanitize(body.sailing_interest, 300)
  const notes = sanitize(body.notes, 2000)
  const referral_code = body.referral_code ? sanitize(body.referral_code, 60) : undefined
  const utm_source = body.utm_source ? sanitize(body.utm_source, 80) : undefined
  const utm_medium = body.utm_medium ? sanitize(body.utm_medium, 80) : undefined
  const utm_campaign = body.utm_campaign ? sanitize(body.utm_campaign, 80) : undefined

  // Everything the agent needs is folded into Notes as well as its own column,
  // so the record is still actionable if the base lacks the detail columns.
  const crmNotes = [
    'Free quote request (ad landing page).',
    `Sail timeframe: ${timeframe}`,
    `Party size: ${party_size}`,
    sailing_interest ? `Ship / itinerary interest: ${sailing_interest}` : null,
    notes ? `\n${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const leadWrite = saveLeadSafely({
    name,
    email,
    phone,
    notes: crmNotes,
    source: 'free-quote',
    sailingInterest: sailing_interest || timeframe,
    guests: party_size,
    referralCode: referral_code,
    utmSource: utm_source,
    utmMedium: utm_medium,
    utmCampaign: utm_campaign,
    // A quote is only answerable with the dates and party size attached, so a
    // repeat submission refreshes them rather than just bumping the date.
    refreshDetailsOnUpdate: true,
  })

  const resendKey = process.env.RESEND_API_KEY
  const resend = resendKey ? new Resend(resendKey) : null
  let notifyOk = false

  if (resend) {
    try {
      await resend.emails.send({
        from: '"GatGrid Quotes" <bookings@gatgridcruises.com>',
        // Internal alert: the inbox Grayson actually watches. Not customer-visible.
        to: agentNotifyRecipients(),
        replyTo: email,
        subject: `Free quote request: ${name} (${timeframe}, ${party_size})`,
        html: agentNotificationHtml({
          name,
          email,
          phone,
          timeframe,
          party_size,
          sailing_interest,
          notes,
          referral_code,
          utm_source,
          utm_medium,
          utm_campaign,
        }),
      })
      notifyOk = true
    } catch (err) {
      console.error('[free-quote] agent notification email failed:', err)
    }
  } else {
    console.warn('[free-quote] RESEND_API_KEY not set; agent notification email not sent')
  }

  // Awaited here because a serverless invocation is frozen once it responds.
  const crmOk = (await leadWrite) !== null

  if (!crmOk && !notifyOk) {
    console.error('[free-quote] all delivery paths failed, request lost', { email, name })
    return NextResponse.json({ error: 'Submission failed' }, { status: 502 })
  }

  // The quote form never asks for a departure port, so that question is always
  // still open. Timeframe and party size are required fields, so in practice
  // the port is the one thing left to ask.
  const openQuestions = missingLeadDetails({
    name,
    source: 'free-quote',
    knownTimeframe: timeframe,
    knownPartySize: party_size,
  })

  // Best-effort acknowledgment. A delivery path already succeeded, so this
  // never fails the request.
  let ackOk = false
  if (resend) {
    try {
      await resend.emails.send({
        from: '"Dr. Grayson Starbuck, DPT" <bookings@gatgridcruises.com>',
        replyTo: AGENT_INBOX,
        to: email,
        subject: 'Got your quote request, working on it now',
        html: confirmationHtml(name, openQuestions),
      })
      ackOk = true
    } catch (err) {
      console.error('[free-quote] auto-ack email failed:', err)
    }
  }

  // Awaited, not fire-and-forget: the serverless invocation freezes the moment
  // the response goes out, which would kill an in-flight text or push.
  const textOk = phone
    ? await sendLeadAutoText(phone, {
        name,
        source: 'free-quote',
        knownTimeframe: timeframe,
        knownPartySize: party_size,
      })
    : false

  await sendPushover({
    title: `New GatGrid lead: ${name}`,
    priority: 1,
    message: [
      `Name: ${name}`,
      `Phone: ${phone || 'not provided'}`,
      `Email: ${email}`,
      'Source: free-quote (paid ad landing page)',
      `Timeframe: ${timeframe}`,
      `Party: ${party_size}`,
      `Interest: ${sailing_interest || 'not specified'}`,
      notes ? `Notes: ${notes.replace(/\s+/g, ' ').slice(0, 200)}` : null,
      '',
      `Auto-text: ${textOk ? 'sent' : phone ? 'not sent (check Twilio env)' : 'no phone on the form'}`,
      `Auto-email: ${ackOk ? 'sent' : 'not sent (check Resend)'}`,
    ]
      .filter((line) => line !== null)
      .join('\n'),
  })

  return NextResponse.json({ success: true })
}
