import { Metadata } from 'next'
import Link from 'next/link'
import { BarChart2 } from 'lucide-react'
import { getSailings, getSnapshotsForSailing } from '@/lib/data'
import { calculatePriceTrend } from '@/lib/price-utils'
import type { SailingWithTrend } from '@/lib/price-utils'
import { PriceTrackerClient } from '@/components/ui/price-tracker-client'
import { formatPrice } from '@/lib/utils'
import { PRICES_LAST_UPDATED } from '@/lib/constants'

// Sailing lists are filtered against "today" in America/Chicago, so this page
// has to render per request — prerendering would freeze the expiry cutoff at
// build time and keep departed sailings on the page until the next deploy.
export const dynamic = 'force-dynamic'


export const metadata: Metadata = {
  alternates: { canonical: '/price-tracker' },
  title: 'Disney Cruise Price Tracker — Lowest Fare on Every Sailing',
  description: 'Browse the lowest tracked fare for every Disney Cruise Line sailing, filterable by ship, destination, and month.',
  keywords: ['disney cruise price tracker', 'disney cruise prices', 'disney cruise deals', 'cruise price comparison'],
  openGraph: {
    title: 'Disney Cruise Price Tracker — Lowest Fare on Every Sailing',
    description: 'The lowest tracked fare for every Disney Cruise Line sailing, filterable by ship, destination, and month.',
    url: 'https://gatgridcruises.com/price-tracker',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Price Tracker — Lowest Fare on Every Sailing',
    description: 'The lowest tracked fare for every Disney Cruise Line sailing, filterable by ship, destination, and month.',
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

  // A sailing only has a meaningful trend once it has at least two snapshots to
  // compare. Until the snapshot feed is populated this is empty, and the page
  // renders in "no history yet" mode rather than showing zeroed-out deal maths.
  const withHistory = sailingsWithTrends.filter(s => s.snapshot_count >= 2)
  const hasHistory = withHistory.length > 0

  if (hasHistory) {
    // Best deals first
    sailingsWithTrends.sort((a, b) => a.trend.percentVsAvg - b.trend.percentVsAvg)
  } else {
    // No history to rank against — lead with the lowest fares instead.
    sailingsWithTrends.sort((a, b) => a.current_lowest_price - b.current_lowest_price)
  }

  const ships = [...new Set(sailingsWithTrends.map(s => s.ship_name))].sort()
  const regions = [...new Set(sailingsWithTrends.map(s => s.region))].sort()

  const prices = sailingsWithTrends.map(s => s.current_lowest_price).filter(p => p > 0)
  const lowestFare = prices.length > 0 ? Math.min(...prices) : 0
  const months = new Set(sailingsWithTrends.map(s => s.sail_date.slice(0, 7)))

  const goodDeals = withHistory.filter(s => s.trend.dealRating === 'good').length
  const belowAvgItems = withHistory.filter(s => s.trend.percentVsAvg < 0)
  const avgDrop = belowAvgItems.length > 0
    ? Math.round(belowAvgItems.reduce((sum, s) => sum + Math.abs(s.trend.percentVsAvg), 0) / belowAvgItems.length)
    : 0

  const stats = hasHistory
    ? [
        { value: sailingsWithTrends.length.toString(), label: 'Sailings tracked' },
        { value: goodDeals.toString(), label: 'Good deals now', highlight: true },
        { value: `${avgDrop}%`, label: 'Avg below avg (deals)' },
        { value: withHistory.length.toString(), label: 'Sailings with history' },
      ]
    : [
        { value: sailingsWithTrends.length.toString(), label: 'Sailings tracked' },
        { value: ships.length.toString(), label: 'Disney ships' },
        { value: lowestFare > 0 ? formatPrice(lowestFare) : '—', label: 'Lowest tracked fare', highlight: true },
        { value: months.size.toString(), label: 'Departure months' },
      ]

  return (
    <main className="bg-slate-50">
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
                {hasHistory
                  ? 'Every sailing compared against the price history we’ve recorded — see whether today’s fare is above or below its own average.'
                  : 'The lowest tracked fare on every Disney sailing, filterable by ship, destination, and month.'}
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

          {!hasHistory && (
            <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-white text-sm font-semibold">
                Price history isn&apos;t live yet
              </p>
              <p className="text-blue-200 text-sm mt-1 max-w-3xl">
                We&apos;re building a price record from the ground up, so we don&apos;t yet have enough
                snapshots to tell you whether a fare is above or below its own average. Rather than
                show you a made-up trend, we show the fare itself. Want to know the moment a fare on
                your sailing moves?{' '}
                <Link href="/price-watch" className="text-[#D4AF37] underline underline-offset-2 hover:text-yellow-300">
                  Set up a price watch
                </Link>{' '}
                and we&apos;ll email you.
              </p>
            </div>
          )}

          <p className="text-blue-400 text-xs mt-6">
            Fares shown are per stateroom, base fare only, and exclude taxes and port fees.
            Last verified {PRICES_LAST_UPDATED}. Request a quote for live pricing on your dates.
          </p>
        </div>
      </section>

      <PriceTrackerClient
        sailings={sailingsWithTrends}
        ships={ships}
        regions={regions}
        hasHistory={hasHistory}
      />
    </main>
  )
}
