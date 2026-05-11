import type { Metadata } from 'next'
import Link from 'next/link'
import { Anchor, Calendar, Clock, MapPin, Ship, ArrowRight } from 'lucide-react'
import { getSailings } from '@/lib/data'
import { formatPrice, formatDate, daysUntil } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'All Disney Cruise Sailings — Browse Every Itinerary',
  description:
    'Every Disney Cruise Line sailing in our index, organized by region. Compare itineraries, ships, dates, and starting prices — info-only, no booking required.',
  openGraph: {
    title: 'All Disney Cruise Sailings — GatGridCruises',
    description:
      'Browse every Disney cruise sailing — Caribbean, Bahamas, Alaska, and more. Itinerary details, dates, and starting prices for each.',
    url: 'https://gatgridcruises.com/sailings',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Disney Cruise Sailings',
    description: 'Every Disney cruise sailing in our index — itineraries, dates, and starting prices.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const REGION_LABELS: Record<string, string> = {
  bahamas: 'Bahamas',
  caribbean: 'Caribbean',
  alaska: 'Alaska',
  europe: 'Europe',
  mediterranean: 'Mediterranean',
  pacific: 'Pacific & Mexican Riviera',
  transatlantic: 'Transatlantic',
}

function regionLabel(region: string | null | undefined): string {
  if (!region) return 'Other'
  return REGION_LABELS[region] ?? region.charAt(0).toUpperCase() + region.slice(1)
}

export default function SailingsIndexPage() {
  const sailings = getSailings()

  // Group by region for browsable sections, then sort each group by sail date
  const byRegion = new Map<string, typeof sailings>()
  for (const s of sailings) {
    const key = regionLabel(s.region)
    if (!byRegion.has(key)) byRegion.set(key, [])
    byRegion.get(key)!.push(s)
  }
  // Best deals first (highest sailing_score), then earliest sail date as tiebreaker
  for (const list of byRegion.values()) {
    list.sort((a, b) => {
      const scoreDiff = (b.sailing_score ?? 0) - (a.sailing_score ?? 0)
      if (scoreDiff !== 0) return scoreDiff
      return a.sail_date.localeCompare(b.sail_date)
    })
  }

  // Stable region ordering: Bahamas, Caribbean, Alaska, then alphabetical
  const preferred = ['Bahamas', 'Caribbean', 'Alaska']
  const regions = Array.from(byRegion.keys()).sort((a, b) => {
    const ai = preferred.indexOf(a)
    const bi = preferred.indexOf(b)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return a.localeCompare(b)
  })

  const totalCount = sailings.length

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 text-white py-16 md:py-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Anchor className="w-9 h-9 text-[#D4AF37]" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">All Sailings</h1>
          </div>
          <p className="font-inter text-lg text-blue-200 max-w-2xl mb-6">
            Every Disney Cruise Line sailing in our index — {totalCount} itineraries across {regions.length}{' '}
            {regions.length === 1 ? 'region' : 'regions'}. Browse, compare, and read the details. We&apos;re an
            info site, not a booking platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-slate-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Filter & sort by score <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ships"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse by ship
            </Link>
          </div>
        </div>
      </section>

      {/* Region table of contents */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-slate-500 mr-2">Jump to:</span>
            {regions.map(region => (
              <a
                key={region}
                href={`#${region.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#162d4a] hover:text-[#0a1628] hover:underline font-medium"
              >
                {region} ({byRegion.get(region)!.length})
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sailings grouped by region */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {regions.map(region => {
          const list = byRegion.get(region)!
          const regionId = region.toLowerCase().replace(/\s+/g, '-')
          return (
            <section key={region} id={regionId}>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                  {region} <span className="text-slate-400 text-lg font-normal">· {list.length} sailings</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map(sailing => {
                  const days = daysUntil(sailing.sail_date)
                  const isPast = days < 0
                  return (
                    <Link
                      key={sailing.id}
                      href={`/sailing/${sailing.id}`}
                      className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display text-base font-semibold text-slate-900 group-hover:text-[#162d4a] transition-colors leading-tight">
                          {sailing.itinerary_name}
                        </h3>
                        {sailing.sailing_score != null && (
                          <span className="flex-shrink-0 text-xs font-bold bg-blue-50 text-[#162d4a] border border-blue-200 px-2 py-1 rounded-full">
                            {sailing.sailing_score}
                          </span>
                        )}
                      </div>

                      <dl className="space-y-1.5 text-sm text-slate-600 mb-4">
                        {sailing.ship && (
                          <div className="flex items-center gap-2">
                            <Ship className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>{sailing.ship.name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>
                            {formatDate(sailing.sail_date)}
                            {!isPast && days >= 0 && (
                              <span className="text-slate-400"> · in {days} {days === 1 ? 'day' : 'days'}</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{sailing.length_nights} nights</span>
                        </div>
                        {sailing.departure_port && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span>From {sailing.departure_port.name}</span>
                          </div>
                        )}
                      </dl>

                      <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-wide text-slate-400 block">From</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatPrice(sailing.current_lowest_price)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-[#1E3A5F] group-hover:text-[#0a1628] transition-colors flex items-center gap-1">
                          Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer note */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600">
          <p className="mb-2">
            <strong className="text-slate-900">About these listings.</strong> Prices updated daily. Request a
            quote for exact pricing with your group. We don&apos;t sell cruises directly — we help you
            research them and forward inquiries to a partner agency at no extra cost.
          </p>
          <p>
            Looking for filters and a deal score?{' '}
            <Link href="/deals" className="text-[#162d4a] hover:text-[#0a1628] underline">
              Try the Deals browser →
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
