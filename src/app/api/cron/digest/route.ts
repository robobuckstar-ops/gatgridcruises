import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getBiggestPriceDrops, getFeaturedSailings, getSailings } from '@/lib/data'
import { weeklyDigestTemplate } from '@/lib/email-templates'
import { bulkSend } from '@/lib/bulk-send'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import {
  isSubscriberStoreConfigured,
  listActiveSubscribers,
  markSubscriberEmailed,
} from '@/lib/subscriber-store'

// Vercel Cron: runs every Sunday at 10 AM EST ("0 15 * * 0" in vercel.json).
// Sending was previously commented out because the subscriber list lived in
// process memory and was always empty; it now reads the durable Airtable list
// (see src/lib/subscriber-store.ts) and sends through Resend.

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * Don't re-send to anyone who already got a digest within this window. Guards
 * against a cron retry, a manual re-trigger, or a resumed run double-mailing
 * the list.
 */
const RESEND_GUARD_MS = 3 * 86_400_000

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ?preview=1 builds the digest and reports the audience without sending —
  // the safe way to verify the pipeline against the real list.
  const preview = new URL(request.url).searchParams.get('preview') === '1'

  try {
    // Get deal data
    const topDeals = getBiggestPriceDrops().map(s => ({
      ...s,
      percentBelow: 'drop' in s ? Math.round((s as any).drop) : 0,
    }))
    const featured = getFeaturedSailings()
    const allSailings = getSailings()

    const weekDate = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    })

    const html = weeklyDigestTemplate({
      topDeals,
      featuredSailings: featured,
      totalSailingsTracked: allSailings.length,
      weekDate,
    })

    const stats = {
      topDeals: topDeals.length,
      featured: featured.length,
      totalTracked: allSailings.length,
    }

    if (!isSubscriberStoreConfigured()) {
      return NextResponse.json(
        { error: 'AIRTABLE_API_KEY not configured — no durable subscriber list to send to', stats },
        { status: 503 }
      )
    }

    const subscribers = await listActiveSubscribers()

    if (preview) {
      return NextResponse.json({
        success: true,
        preview: true,
        message: 'Digest built from the durable subscriber list — nothing sent',
        recipients: subscribers.length,
        stats,
        previewHtml: html.substring(0, 500) + '...',
      })
    }

    // Never mail a contentless digest. Price drops are derived from scraper
    // snapshots, so a stalled scrape can empty the deals section; featured
    // sailings are the floor for having something worth sending.
    if (topDeals.length === 0 && featured.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Nothing to send — no price drops and no featured sailings this week',
        recipients: subscribers.length,
        sent: 0,
        stats,
      })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured', recipients: subscribers.length, stats },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const sentAt = new Date().toISOString()

    const result = await bulkSend(
      subscribers,
      sub => sub.email,
      async sub => {
        const lastDigest = sub.lastDigestSent ? new Date(sub.lastDigestSent).getTime() : 0
        if (lastDigest && Date.now() - lastDigest < RESEND_GUARD_MS) return 'skipped'

        await resend.emails.send({
          from: 'Grayson at GatGrid Cruises <bookings@gatgridcruises.com>',
          replyTo: 'bookings@gatgridcruises.com',
          to: sub.email,
          subject: `Disney Cruise Deals — ${weekDate}`,
          html: html.replace(/\{\{unsubscribe_token\}\}/g, encodeURIComponent(sub.unsubscribeToken)),
        })
        // Recorded per recipient so a run cut short by the time budget resumes
        // where it stopped instead of starting the list over.
        await markSubscriberEmailed(sub.id, { digestSentAt: sentAt })
        return 'sent'
      }
    )

    return NextResponse.json({
      success: true,
      message: `Digest sent to ${result.sent} subscriber(s)`,
      recipients: subscribers.length,
      sent: result.sent,
      skipped: result.skipped,
      failed: result.failed,
      truncated: result.truncated,
      remaining: result.remaining,
      errors: result.errors,
      stats,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Digest send failed', details: String(error) }, { status: 500 })
  }
}
