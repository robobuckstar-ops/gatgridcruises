import { NextRequest, NextResponse } from 'next/server'

const SCRAPER_PATTERNS = [
  /python-requests/i,
  /scrapy/i,
  /\bwget\b/i,
  /\bcurl\b/i,
  /httrack/i,
  /libwww/i,
  /lwp-/i,
  /go-http-client/i,
  /okhttp/i,
  /mechanize/i,
  /phantomjs/i,
  /headlesschrome/i,
  /selenium/i,
  /webdriver/i,
  /puppeteer/i,
  /playwright/i,
  /urllib/i,
  /httpx/i,
  /aiohttp/i,
  /http_simple/i,
  /java\/[0-9]/i,
  /perl\/[0-9]/i,
  /ruby\/[0-9]/i,
  /node-fetch/i,
  /axios\/[0-9]/i,
  /got\/[0-9]/i,
  /superagent/i,
]

// Always allow legitimate search engine and social crawlers
const ALLOWED_CRAWLERS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterestbot/i,
  /applebot/i,
  /ia_archiver/i,
  /msnbot/i,
  /adsbot-google/i,
  /mediapartners-google/i,
]

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''

  // Always let legitimate search engine crawlers through
  if (ALLOWED_CRAWLERS.some((p) => p.test(ua))) {
    const res = NextResponse.next()
    Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v))
    return res
  }

  // Block known scraper user agents
  if (SCRAPER_PATTERNS.some((p) => p.test(ua))) {
    return new NextResponse(
      JSON.stringify({ error: 'Forbidden', message: 'Automated access is not permitted.' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    )
  }

  const res = NextResponse.next()
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v))
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.svg|.*\\.png|.*\\.ico).*)'],
}
