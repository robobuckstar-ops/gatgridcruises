'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { TrendingDown, TrendingUp, Minus, Calendar, Clock, MapPin, ArrowRight, Filter } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'
import type { SailingWithTrend } from '@/lib/price-utils'

interface Props {
  sailings: SailingWithTrend[]
  ships: string[]
  regions: string[]
}

const REGION_LABELS: Record<string, string> = {
  caribbean: 'Caribbean',
  bahamas: 'Bahamas',
  alaska: 'Alaska',
  pacific: 'Pacific',
  europe: 'Europe',
  other: 'Other',
}

function MiniSparkline({ prices, isGood }: { prices: number[]; isGood: boolean }) {
  if (prices.length < 3) return null

  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1
  const W = 72
  const H = 24

  const pts = prices.map((p, i) => {
    const x = ((i / (prices.length - 1)) * W).toFixed(1)
    const y = (H - ((p - min) / range) * (H - 4) - 2).toFixed(1)
    return `${x},${y}`
  })

  const stroke = isGood ? '#10b981' : '#ef4444'
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block flex-shrink-0">
      <path
        d={`M ${pts.join(' L ')}`}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PriceTrackerClient({ sailings, ships, regions }: Props) {
  const [shipFilter, setShipFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'deal' | 'price' | 'date'>('deal')

  const months = useMemo(
    () => [...new Set(sailings.map(s => s.sail_date.slice(0, 7)))].sort(),
    [sailings]
  )

  const filtered = useMemo(() => {
    const r = sailings.filter(s => {
      if (shipFilter !== 'all' && s.ship_name !== shipFilter) return false
      if (regionFilter !== 'all' && s.region !== regionFilter) return false
      if (monthFilter !== 'all' && !s.sail_date.startsWith(monthFilter)) return false
      return true
    })

    if (sortBy === 'price') r.sort((a, b) => a.current_lowest_price - b.current_lowest_price)
    else if (sortBy === 'date') r.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
    else r.sort((a, b) => a.trend.percentVsAvg - b.trend.percentVsAvg)

    return r
  }, [sailings, shipFilter, regionFilter, monthFilter, sortBy])

  const hasFilters = shipFilter !== 'all' || regionFilter !== 'all' || monthFilter !== 'all'
  const clearFilters = () => {
    setShipFilter('all')
    setRegionFilter('all')
    setMonthFilter('all')
  }

  const selectClass =
    'text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <section className="py-10 bg-slate-50 min-h-[60vh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Filter className="w-4 h-4" />
            Filter:
          </div>

          <select value={shipFilter} onChange={e => setShipFilter(e.target.value)} className={selectClass}>
            <option value="all">All Ships</option>
            {ships.map(s => (
              <option key={s} value={s}>{s.replace('Disney ', '')}</option>
            ))}
          </select>

          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className={selectClass}>
            <option value="all">All Destinations</option>
            {regions.map(r => (
              <option key={r} value={r}>{REGION_LABELS[r] ?? r}</option>
            ))}
          </select>

          <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className={selectClass}>
            <option value="all">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>
                {new Date(m + '-02').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className={selectClass}
            >
              <option value="deal">Best Deal First</option>
              <option value="price">Lowest Price</option>
              <option value="date">Earliest Date</option>
            </select>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-5">
          Showing <strong className="text-slate-900">{filtered.length}</strong> of {sailings.length} sailings
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(s => {
            const { trend } = s
            const isGood = trend.dealRating === 'good'
            const isAbove = trend.dealRating === 'above-average'
            const pctAbs = Math.abs(trend.percentVsAvg)

            return (
              <Link
                key={s.id}
                href={`/sailing/${s.id}`}
                className="group block bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Deal indicator stripe */}
                <div className={`h-1 ${isGood ? 'bg-emerald-500' : isAbove ? 'bg-red-400' : 'bg-slate-200'}`} />

                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium mb-0.5 truncate">{s.ship_name}</p>
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {s.itinerary_name}
                      </h3>
                    </div>
                    <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isGood
                        ? 'bg-emerald-100 text-emerald-700'
                        : isAbove
                          ? 'bg-red-100 text-red-600'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isGood ? 'Good Deal' : isAbove ? 'Above Avg' : 'Average'}
                    </span>
                  </div>

                  {/* Trip details */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(s.sail_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {s.length_nights}n
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {REGION_LABELS[s.region] ?? s.region}
                    </span>
                  </div>

                  {/* Price + sparkline + trend */}
                  <div className="flex items-end justify-between border-t border-slate-100 pt-3 gap-3">
                    <div>
                      <p className="text-xl font-bold text-slate-900">{formatPrice(s.current_lowest_price)}</p>
                      <p className={`text-xs font-semibold flex items-center gap-0.5 mt-0.5 ${
                        trend.percentVsAvg < 0
                          ? 'text-emerald-600'
                          : trend.percentVsAvg > 0
                            ? 'text-red-500'
                            : 'text-slate-400'
                      }`}>
                        {trend.trend === 'down'
                          ? <TrendingDown className="w-3 h-3" />
                          : trend.trend === 'up'
                            ? <TrendingUp className="w-3 h-3" />
                            : <Minus className="w-3 h-3" />}
                        {trend.percentVsAvg === 0
                          ? 'At average'
                          : trend.percentVsAvg < 0
                            ? `${pctAbs}% below avg`
                            : `${pctAbs}% above avg`}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <MiniSparkline prices={s.recent_prices} isGood={trend.percentVsAvg <= 0} />
                      <p className="text-xs text-slate-400">avg {formatPrice(trend.avgPrice)}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{s.snapshot_count} data points</span>
                    <span className="text-xs font-medium text-blue-500 group-hover:text-blue-700 flex items-center gap-0.5 transition-colors">
                      View full history <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg mb-3">No sailings match your filters</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
