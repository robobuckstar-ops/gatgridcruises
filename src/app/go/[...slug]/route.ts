import { NextRequest, NextResponse } from 'next/server'
import { TRAVEL_AFFILIATES, AMAZON_CONFIG, getCardReferralLink } from '@/lib/affiliate-config'

// Click tracking (in-memory for MVP, Supabase table later)
const clickLog: { provider: string; target: string; timestamp: string; referrer: string | null }[] = []

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const [provider, ...targetParts] = slug
  const target = targetParts.join('/')

  // Log the click
  clickLog.push({
    provider,
    target,
    timestamp: new Date().toISOString(),
    referrer: request.headers.get('referer'),
  })

  let redirectUrl: string | null = null

  // Handle card referral redirects: /go/cards/chase-sapphire-preferred
  if (provider === 'cards') {
    return NextResponse.redirect(new URL('/concierge', request.url), { status: 302 })
  }

  // Handle Amazon redirects: redirect to concierge
  if (provider === 'amazon') {
    return NextResponse.redirect(new URL('/concierge', request.url), { status: 302 })
  }

  // Handle travel affiliate redirects: /go/skyscanner, /go/booking, etc.
  const affiliate = TRAVEL_AFFILIATES[provider]
  if (affiliate) {
    redirectUrl = affiliate.baseUrl
    if (target) redirectUrl += '/' + target
    const searchParams = request.nextUrl.searchParams.toString()
    if (searchParams) redirectUrl += '?' + searchParams
    if (affiliate.affiliateParam && affiliate.affiliateId) {
      const separator = redirectUrl.includes('?') ? '&' : '?'
      redirectUrl += `${separator}${affiliate.affiliateParam}=${affiliate.affiliateId}`
    }
    return NextResponse.redirect(redirectUrl, { status: 302 })
  }

  // Unknown provider — redirect to homepage
  return NextResponse.redirect(new URL('/', request.url), { status: 302 })
}
