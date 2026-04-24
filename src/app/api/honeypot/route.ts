import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const ua = req.headers.get('user-agent') || 'unknown'
  const referer = req.headers.get('referer') || 'direct'

  console.warn(
    `[HONEYPOT HIT] ${new Date().toISOString()} | ip=${ip} | ua=${ua} | referer=${referer}`
  )

  // Return a convincing but useless page to waste scraper cycles
  return new NextResponse(
    `<!DOCTYPE html><html><head><title>GatGrid Deals</title><meta name="robots" content="noindex,nofollow"></head><body><p>Loading deals...</p></body></html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store',
      },
    }
  )
}

export async function POST(req: NextRequest) {
  return GET(req)
}
