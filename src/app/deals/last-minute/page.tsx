import { Metadata } from 'next'
import { getLastMinuteDeals, getShips, getPorts } from '@/lib/data'
import { LastMinuteDealGrid } from './last-minute-deal-grid'

export const metadata: Metadata = {
  title: 'Flash Deals | Last-Minute Disney Cruise Deals',
  description: 'Flash deals on Disney cruises departing within 90 days. Steep discounts, limited availability. Check prices before they change.',
}

export default function LastMinuteDealsPage() {
  const deals = getLastMinuteDeals()
  const ships = getShips()
  const ports = getPorts()

  return <LastMinuteDealGrid deals={deals} ships={ships} ports={ports} />
}
