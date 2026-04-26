import { Metadata } from 'next'
import { BarChart2 } from 'lucide-react'
import { getSailings, getSnapshotsForSailing } from '@/lib/data'
import { calculatePriceTrend } from '@/lib/price-utils'
import type { SailingWithTrend } from '@/lib/price-utils'
import { PriceTrackerClient } from '@/components/ui/price-tracker-client'

export const metadata: Metadata = {
  title: 'Disney Cruise Price Tracker — Historical Pricing Data',
  description: 'Track Disney Cruise Line pricing history for every sailing. See if today\'s price is a deal, at average, or above average compared to historical data.',
  keywords: ['disney cruise price tracker', 'disney cruise price history', 'disney cruise deals', 'cruise price comparison'],
  openGraph: {
    title: 'Disney Cruise Price Tracker — Historical Pricing Data',
    description: 'Track Disney Cruise Line pricing history. See if today\'s price is a deal compared to historical data.',
    url: 'https://gatgridcruises.com/price-tracker',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Price Tracker — Historical Pricing Data',
    description: 'Track Disney Cruise Line pricing history for every sailing and find the best time to buy.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function PriceTrackerPage() {
  const sailings = getSailings()

  const sailingsWithTrends: SailingWithTrend[] = sailings.map(s => {
    const snapshots = getSnapshotsForSailing(s.id)
    const trend = calculatePriceTrend(snapshots, s.current_lowest_price)
    const recent_prices = snapshots.slice(-14).map(snap => snap.lowest_price)

    return {
      id: s.id,
      itinerary_name: s.itinerary_name,
      ship_name: s.ship?.name ?? 'Disney',
      sail_date: s.sail_date,
      length_nights: s.length_nights,
      departure_port_name: s.departure_port?.name ?? '',
      region: s.region ?? 'other',
      current_lowest_price: s.current_lowest_price,
      trend,
      snapshot_count: snapshots.length,
      recent_prices,
    }
  })

  // Default sort: best deals first
  sailingsWithTrends.sort((a, b) => a.trend.percentVsAvg - b.trend.percentVsAvg)

  const goodDeals = sailingsWithTrends.filter(s => s.trend.dealRating === 'good').length
  const belowAvgItems = sailingsWithTrends.filter(s => s.trend.percentVsAvg < 0)
  const avgDrop = belowAvgItems.length > 0
    ? Math.round(belowAvgItems.reduce((sum, s) => sum + Math.abs(s.trend.percentVsAvg), 0) / belowAvgItems.length)
    : 0

  const ships = [...new Set(sailingsWithTrends.map(s => s.ship_name))].sort()
  const regions = [...new Set(sailingsWithTrends.map(s => s.region))].sort()

  const stats = [
    { value: sailingsWithTrends.length.toString(), label: 'Sailings tracked' },
    { value: goodDeals.toString(), label: 'Good deals now', highlight: true },
    { value: `${avgDrop}%`, label: 'Avg below avg (deals)' },
    { value: '45+', label: 'Data points / sailing' },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1E3A5F] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <BarChart2 className="w-10 h-10 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Price Tracker
              </h1>
              <p className="text-blue-200 text-lg mt-2 max-w-2xl">
                Every sailing compared against historical data — see instantly whether today&apos;s price is a real deal or not.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ value, label, highlight }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4">
                <p className={`text-3xl font-bold ${highlight ? 'text-[#D4AF37]' : 'text-white'}`}>{value}</p>
                <p className="text-blue-300 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-blue-400 text-xs mt-6">
            Price data updated periodically. Historical data based on synthesized price curves from Feb–Apr 2026.
            Prices shown are per stateroom, base fare only.
          </p>
        </div>
      </section>

      <PriceTrackerClient
        sailings={sailingsWithTrends}
        ships={ships}
        regions={regions}
      />
    </main>
  )
}
