import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Robots-Tag', value: 'index, follow' },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'none'",
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/tools/cost-calculator', destination: '/tools', permanent: true },
      { source: '/tools/cruise-cost-calculator', destination: '/tools', permanent: true },
      { source: '/tools/credit-card-hacks', destination: '/tools/credit-cards', permanent: true },
      // /already-booked was the same pitch without a capture form. /transfer
      // supersedes it, so the old URL keeps its inbound links and search equity
      // rather than competing with the new page for the same query.
      { source: '/already-booked', destination: '/transfer', permanent: true },
      { source: '/referral', destination: '/refer', permanent: true },
      { source: '/referral/dashboard', destination: '/refer/dashboard', permanent: true },
      // Two quote pages competed. /book is the canonical one — the site-wide
      // Get-a-Quote CTA, the header, and the homepage all point to it — so the
      // lighter /free-quote folds in and stops splitting search + link equity.
      { source: '/free-quote', destination: '/book', permanent: true },
      // Two deal-alert pages. /deal-alerts is the richer, primary one (header and
      // the deals grid link to it, with testimonials and segmented signup), so
      // the older /alerts folds into it.
      { source: '/alerts', destination: '/deal-alerts', permanent: true },
      // Duplicate guides that grew up under parallel slugs. Each topic now has
      // one canonical URL; the runners-up 301 to it so the inbound links and
      // search equity consolidate instead of competing with each other.
      //
      // Packing -> the printable list, which is the fuller of the two.
      { source: '/guides/packing-gear', destination: '/guides/disney-cruise-packing-list', permanent: true },
      // Staterooms -> the comparison page: same four categories, but with the
      // feature table, price ranges, ratings and decision guide.
      { source: '/guides/best-disney-cruise-staterooms', destination: '/guides/stateroom-comparison', permanent: true },
      // Ports and islands live under /ports, which is data-driven and already
      // covers every destination. The hand-written /guides/ports/* copies and
      // the standalone Castaway Cay guide fold into it.
      { source: '/guides/ports', destination: '/ports', permanent: true },
      { source: '/guides/ports/:slug', destination: '/ports/:slug', permanent: true },
      { source: '/guides/castaway-cay-guide', destination: '/ports/castaway-cay', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Extra no-archive directive for bot-facing content pages
      {
        source: '/deals/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'X-Robots-Tag', value: 'index, follow, noarchive' },
        ],
      },
      {
        source: '/tools/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'X-Robots-Tag', value: 'index, follow, noarchive' },
        ],
      },
    ]
  },
}

export default nextConfig
