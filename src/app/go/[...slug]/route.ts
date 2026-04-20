import { NextRequest, NextResponse } from 'next/server'

// Click tracking (in-memory for MVP, Supabase table later)
const clickLog: { provider: string; target: string; timestamp: string; referrer: string | null }[] = []

const AFFILIATE_URLS: Record<string, string> = {
  skyscanner: 'https://www.skyscanner.com/transport/flights',
  booking: 'https://www.booking.com/hotel',
  expedia: 'https://www.expedia.com/Hotel-Search',
}

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

  // Build redirect URL
  const searchParams = request.nextUrl.searchParams.toString()
  let redirectUrl = AFFILIATE_URLS[provider]

  if (redirectUrl) {
    if (target) redirectUrl += '/' + target
    if (searchParams) redirectUrl += '?' + searchParams
  } else {
    // Unknown provider — redirect to homepage
    redirectUrl = '/'
  }

  // TODO: Add affiliate IDs from env
  // if (provider === 'booking') redirectUrl += `&aid=${process.env.BOOKING_AFFILIATE_ID}`
  // if (provider === 'expedia') redirectUrl += `&AFFLID=${process.env.EXPEDIA_AFFILIATE_ID}`

  return NextResponse.redirect(redirectUrl, { status: 302 })
}
