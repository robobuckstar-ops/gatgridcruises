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
