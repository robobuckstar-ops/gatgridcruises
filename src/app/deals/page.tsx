import { Metadata } from 'next'
import { getSailings, getSnapshotsForSailing } from '@/lib/data'
import { getShips, getPorts } from '@/lib/data'
import { DealGrid } from './deal-grid'

export const metadata: Metadata = {
  title: 'Disney Cruise Deals — Filter by Ship, Duration & Score',
  description:
    'Browse every Disney cruise sailing with our Deal Score system. Filter by ship, departure port, duration, and guest count. Prices tracked daily.',
  openGraph: {
    title: 'Disney Cruise Deals — Filter by Ship, Duration & Score',
    description:
      'Filter Disney cruise deals by ship, duration, port, and guest count. Deal Score ranks every sailing by value.',
    url: 'https://gatgridcruises.com/deals',
  },
}

export default function DealsPage() {
  const sailings = getSailings()
  const ships = getShips()
  const ports = getPorts()

  // Pre-calculate percent below average for each sailing
  const sailingsWithDrops = sailings.map(s => {
    const snapshots = getSnapshotsForSailing(s.id)
    const avg =
      snapshots.length > 0
        ? snapshots.reduce((sum, sn) => sum + sn.lowest_price, 0) / snapshots.length
        : s.current_lowest_price
    const percentBelow = avg > 0 ? Math.round(((avg - s.current_lowest_price) / avg) * 100) : 0
    return { ...s, percentBelow: Math.max(0, percentBelow) }
  })

  return <DealGrid sailings={sailingsWithDrops} ships={ships} ports={ports} />
}
