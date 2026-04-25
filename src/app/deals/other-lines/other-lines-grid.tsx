'use client'

import { useState, useMemo } from 'react'
import type { OtherCruiseDeal } from '@/data/other-cruise-lines'
import { GuestSelector } from '@/components/ui/guest-selector'
import { useGuestCount } from '@/context/guest-count-context'
import { formatPrice, formatDate, cn } from '@/lib/utils'
import { Ship, Calendar, MapPin, TrendingDown, ExternalLink, Search, X, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

const CRUISE_LINES = ['Royal Caribbean', 'Carnival', 'Norwegian', 'MSC Cruises', 'Celebrity Cruises', 'Princess Cruises', 'Holland America']

const REGIONS = [
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'pacific', label: 'Pacific / Hawaii' },
  { value: 'europe', label: 'Europe' },
  { value: 'other', label: 'Other' },
]

const LINE_COLORS: Record<string, string> = {
  'Royal Caribbean': 'bg-blue-100 text-blue-800',
  'Carnival': 'bg-red-100 text-red-800',
  'Norwegian': 'bg-sky-100 text-sky-800',
  'MSC Cruises': 'bg-navy/10 text-slate-800',
  'Celebrity Cruises': 'bg-purple-100 text-purple-800',
  'Princess Cruises': 'bg-pink-100 text-pink-800',
  'Holland America': 'bg-amber-100 text-amber-800',
}

interface OtherLinesGridProps {
  deals: OtherCruiseDeal[]
}

export function OtherLinesGrid({ deals }: OtherLinesGridProps) {
  const { guests } = useGuestCount()
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [aiSearch, setAiSearch] = useState('')
  const [sortBy, setSortBy] = useState<'savings' | 'price_asc' | 'date'>('savings')

  const filtered = useMemo(() => {
    let results = [...deals]

    if (aiSearch) {
      const q = aiSearch.toLowerCase()
      results = results.filter(d =>
        d.line.toLowerCase().includes(q) ||
        d.ship_name.toLowerCase().includes(q) ||
        d.itinerary_name.toLowerCase().includes(q) ||
        d.departure_port.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q)
      )
    }

    if (selectedLines.length) {
      results = results.filter(d => selectedLines.includes(d.line))
    }

    if (selectedRegions.length) {
      results = results.filter(d => selectedRegions.includes(d.region))
    }

    switch (sortBy) {
      case 'savings':
        results.sort((a, b) => b.savings_percent - a.savings_percent)
        break
      case 'price_asc':
        results.sort((a, b) => a.current_price - b.current_price)
        break
      case 'date':
        results.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
        break
    }

    return results
  }, [deals, aiSearch, selectedLines, selectedRegions, sortBy])

  const activeFilterCount = [selectedLines.length > 0, selectedRegions.length > 0].filter(Boolean).length

  const toggle = <T,>(arr: T[], val: T, setter: (v: T[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const clearFilters = () => {
    setSelectedLines([])
    setSelectedRegions([])
    setAiSearch('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/deals" className="text-slate-400 hover:text-white text-sm transition-colors">
              Disney Deals
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 text-sm">Other Lines</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                Bargain Steals Beyond Disney
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                When other lines drop prices by 55%+, we flag them. Only the most significant discounts — not the usual cruise sales.
              </p>
            </div>
            <GuestSelector className="text-white [&>svg]:text-slate-400 [&_button]:bg-slate-700 [&_button]:text-slate-200 [&_button]:border-slate-600" />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-amber-800">
            <strong>Heads up:</strong> These deals are on non-Disney cruise lines. Prices link to official cruise line websites. GatGridCruises earns no commission on these referrals — we share them purely because they represent exceptional value.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors',
              showFilters || activeFilterCount > 0
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="savings">Biggest Savings %</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="date">Sail Date</option>
          </select>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Cruise Line</p>
              <div className="flex flex-wrap gap-2">
                {CRUISE_LINES.map(line => (
                  <button
                    key={line}
                    onClick={() => toggle(selectedLines, line, setSelectedLines)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedLines.includes(line)
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                    )}
                  >
                    {line}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Destination</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(r => (
                  <button
                    key={r.value}
                    onClick={() => toggle(selectedRegions, r.value, setSelectedRegions)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedRegions.includes(r.value)
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Secondary search */}
        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-1.5">Or search for something specific...</p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={aiSearch}
              onChange={e => setAiSearch(e.target.value)}
              placeholder="e.g. Alaska, Mediterranean, Royal Caribbean..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 text-slate-700 placeholder:text-slate-400"
            />
            {aiSearch && (
              <button
                onClick={() => setAiSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} deals — all 55%+ off original price
        </p>

        {/* Deals grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(deal => {
              const totalForGuests = deal.current_price * guests
              const savingsTotal = (deal.original_price - deal.current_price) * guests

              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* Savings banner */}
                  <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      <TrendingDown className="h-4 w-4" />
                      {deal.savings_percent}% off
                    </span>
                    <span className="text-xs opacity-90">Save {formatPrice(savingsTotal)} for {guests === 4 ? '4+' : guests} guest{guests !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Line badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={cn(
                        'inline-block px-2.5 py-1 rounded-full text-xs font-semibold',
                        LINE_COLORS[deal.line] || 'bg-slate-100 text-slate-700'
                      )}>
                        {deal.line}
                      </span>
                      <span className="text-xs text-slate-400 capitalize">{deal.cabin_type === 'inside' ? 'Interior' : deal.cabin_type}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-slate-900 mb-1">
                      {deal.itinerary_name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">{deal.ship_name}</p>

                    {/* Details */}
                    <div className="space-y-1.5 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span>{formatDate(deal.sail_date)} · {deal.length_nights} nights</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span>{deal.departure_port}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-4 flex-1">
                      {deal.highlights.slice(0, 3).map(h => (
                        <li key={h} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Deal note */}
                    <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
                      <p className="text-xs text-amber-800">{deal.deal_note}</p>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-slate-100 pt-3 mb-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm text-slate-500">From (per stateroom)</span>
                        <span className="text-xs line-through text-slate-400">{formatPrice(deal.original_price)}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-slate-900">{formatPrice(deal.current_price)}</span>
                        <span className="text-xs text-slate-500">≈ {formatPrice(Math.round(totalForGuests / guests))} pp ({guests === 4 ? '4+' : guests} guests)</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={deal.line_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Check Price on {deal.line}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-slate-500 mb-2">No deals match your filters</p>
            <button
              onClick={clearFilters}
              className="text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Disney CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">
            Looking for Disney Cruises?
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            GatGridCruises is primarily a Disney cruise information site. See all Disney cruise deals, scored and tracked daily.
          </p>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#0a1628] transition-colors"
          >
            View Disney Cruise Deals
          </Link>
        </div>
      </div>
    </div>
  )
}
