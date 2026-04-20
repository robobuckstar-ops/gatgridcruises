import { NextRequest, NextResponse } from 'next/server'
import { getBiggestPriceDrops, getFeaturedSailings, getSailings } from '@/lib/data'
import { weeklyDigestTemplate } from '@/lib/email-templates'

// Vercel Cron: runs every Sunday at 10 AM EST
// Configure in vercel.json: { "path": "/api/cron/digest", "schedule": "0 15 * * 0" }

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

    // TODO: When Resend is configured, send to all confirmed subscribers
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // const { data: subscribers } = await supabase.from('subscribers').select('email, unsubscribe_token').eq('confirmed', true)
    // for (const sub of subscribers) {
    //   await resend.emails.send({
    //     from: 'GatGridCruises <deals@gatgridcruises.com>',
    //     to: sub.email,
    //     subject: `Disney Cruise Deals — ${weekDate}`,
    //     html: html.replace('{{unsubscribe_token}}', sub.unsubscribe_token),
    //   })
    // }

    return NextResponse.json({
      success: true,
      message: 'Digest generated (sending disabled until Resend is configured)',
      stats: {
        topDeals: topDeals.length,
        featured: featured.length,
        totalTracked: allSailings.length,
      },
      previewHtml: html.substring(0, 500) + '...',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Digest generation failed', details: String(error) }, { status: 500 })
  }
}
