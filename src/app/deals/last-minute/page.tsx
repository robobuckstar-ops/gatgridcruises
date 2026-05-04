import { Metadata } from 'next'
import { getLastMinuteDeals, getShips, getPorts } from '@/lib/data'
import { LastMinuteDealGrid } from './last-minute-deal-grid'

export const metadata: Metadata = {
  title: 'Last-Minute Disney Cruise Deals — Departing Within 90 Days',
  description:
    "Last-minute Disney cruise deals on sailings departing within 90 days. Steep discounts, limited availability. Prices update daily — request a quote for exact pricing with your group.",
  openGraph: {
    title: 'Last-Minute Disney Cruise Deals — Departing Within 90 Days',
    description:
      'Last-minute Disney cruise deals on sailings departing within 90 days. Steep discounts, limited availability.',
    url: 'https://gatgridcruises.com/deals/last-minute',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last-Minute Disney Cruise Deals — Departing Within 90 Days',
    description: 'Last-minute Disney cruise deals on sailings departing within 90 days. Steep discounts, limited availability.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function LastMinuteDealsPage() {
  const deals = getLastMinuteDeals()
  const ships = getShips()
  const ports = getPorts()

  return <LastMinuteDealGrid deals={deals} ships={ships} ports={ports} />
}
