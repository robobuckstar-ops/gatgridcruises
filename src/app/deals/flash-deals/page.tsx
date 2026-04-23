import { Metadata } from 'next'
import { getLastMinuteDeals, getShips, getPorts } from '@/lib/data'
import { LastMinuteDealGrid } from '../last-minute/last-minute-deal-grid'

export const metadata: Metadata = {
  title: 'Flash Deals — Disney Cruise Discounts Within 90 Days',
  description: 'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability. Check prices before they change.',
  title: 'Flash Deals — Disney Cruises Departing Within 90 Days',
  description:
    'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability. Prices change fast — check before they\'re gone.',
  openGraph: {
    title: 'Flash Deals — Disney Cruises Departing Within 90 Days',
    description:
      'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability.',
    url: 'https://gatgridcruises.com/deals/flash-deals',
  },
  title: 'Flash Deals — Disney Cruise Discounts Within 90 Days',
  description: 'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability. Check prices before they change.',
}

export default function FlashDealsPage() {
  const deals = getLastMinuteDeals()
  const ships = getShips()
  const ports = getPorts()

  return <LastMinuteDealGrid deals={deals} ships={ships} ports={ports} />
}
