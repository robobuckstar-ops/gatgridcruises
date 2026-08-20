import { Metadata } from 'next'
import { getSailings } from '@/lib/data'
import { CompareTool } from './compare-tool'

// Sailing lists are filtered against "today" in America/Chicago, so this page
// has to render per request — prerendering would freeze the expiry cutoff at
// build time and keep departed sailings on the page until the next deploy.
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  alternates: { canonical: '/tools/compare' },
  title: 'Compare Sailings — Side-by-Side Disney Cruise Comparison',
  description: 'Compare up to 4 Disney cruise sailings side by side. See prices, ships, itineraries, cabin categories, and deal scores.',
  openGraph: {
    title: 'Compare Sailings — Side-by-Side Disney Cruise Comparison',
    description: 'Compare up to 4 Disney cruise sailings side by side — prices, ships, itineraries, cabin categories, and deal scores.',
    url: 'https://gatgridcruises.com/tools/compare',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Disney Cruise Sailings Side by Side',
    description: 'Compare up to 4 Disney cruise sailings — prices, ships, itineraries, and deal scores.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function ComparePage() {
  const sailings = getSailings()
  return <CompareTool sailings={sailings} />
}
