'use client'

import { useState, useMemo } from 'react'
import type { Sailing, Ship, Port } from '@/types/database'
import { SailingCard } from '@/components/ui/sailing-card'
import { GuestSelector } from '@/components/ui/guest-selector'
import { AdSlot } from '@/components/ui/ad-slot'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'score' | 'price_asc' | 'price_desc' | 'date' | 'drop'
type SailingWithDrop = Sailing & { percentBelow: number }

const REGIONS = [
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'pacific', label: 'Pacific / Baja' },
  { value: 'europe', label: 'Europe' },
  { value: 'other', label: 'Other' },
]

const CABIN_TYPES = [
  { value: 'inside', label: 'Interior' },
  { value: 'oceanview', label: 'Oceanview' },
  { value: 'verandah', label: 'Verandah' },
  { value: 'concierge', label: 'Concierge' },
]

const MONTHS = [
  { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' },
]

interface DealGridProps {
  sailings: SailingWithDrop[]
  ships: Ship[]
  ports: Port[]
}

export function DealGrid({ sailings, ships, ports }: DealGridProps) {
  // Structured filter state
  const [selectedShips, setSelectedShips] = useState<string[]>([])
  const [selectedPorts, setSelectedPorts] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedLengths, setSelectedLengths] = useState<number[]>([])
  const [selectedCabins, setSelectedCabins] = useState<string[]>([])
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])
  const [maxPrice, setMaxPrice] = useState(0)
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [showFilters, setShowFilters] = useState(false)
  // AI search as secondary option
  const [aiSearch, setAiSearch] = useState('')

  const lengthOptions = [3, 4, 5, 7]

  const filtered = useMemo(() => {
    let results = [...sailings]

    // AI search fallback
    if (aiSearch) {
      const q = aiSearch.toLowerCase()
      results = results.filter(s =>
        s.itinerary_name.toLowerCase().includes(q) ||
        s.ship?.name.toLowerCase().includes(q) ||
        s.departure_port?.name.toLowerCase().includes(q) ||
        (s.region && s.region.toLowerCase().includes(q))
      )
    }

    if (selectedShips.length) {
      results = results.filter(s => selectedShips.includes(s.ship_id))
    }

    if (selectedPorts.length) {
      results = results.filter(s => selectedPorts.includes(s.departure_port_id))
    }

    if (selectedRegions.length) {
      results = results.filter(s => s.region && selectedRegions.includes(s.region))
    }

    if (selectedLengths.length) {
      results = results.filter(s => {
        if (selectedLengths.includes(7) && s.length_nights >= 7) return true
        return selectedLengths.includes(s.length_nights)
      })
    }

    if (selectedCabins.length) {
      results = results.filter(s => {
        if (selectedCabins.includes('inside') && s.current_inside_price) return true
        if (selectedCabins.includes('oceanview') && s.current_oceanview_price) return true
        if (selectedCabins.includes('verandah') && s.current_verandah_price) return true
        if (selectedCabins.includes('concierge') && s.current_concierge_price) return true
        return false
      })
    }

    if (selectedMonths.length) {
      results = results.filter(s => {
        const month = new Date(s.sail_date).getMonth() + 1
        return selectedMonths.includes(month)
      })
    }

    if (maxPrice > 0) {
      results = results.filter(s => s.current_lowest_price <= maxPrice)
    }

    switch (sortBy) {
      case 'score':
        results.sort((a, b) => b.sailing_score - a.sailing_score)
        break
      case 'price_asc':
        results.sort((a, b) => a.current_lowest_price - b.current_lowest_price)
        break
      case 'price_desc':
        results.sort((a, b) => b.current_lowest_price - a.current_lowest_price)
        break
      case 'date':
        results.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
        break
      case 'drop':
        results.sort((a, b) => b.percentBelow - a.percentBelow)
        break
    }

    return results
  }, [sailings, aiSearch, selectedShips, selectedPorts, selectedRegions, selectedLengths, selectedCabins, selectedMonths, maxPrice, sortBy])

  const activeFilterCount = [
    selectedShips.length > 0,
    selectedPorts.length > 0,
    selectedRegions.length > 0,
    selectedLengths.length > 0,
    selectedCabins.length > 0,
    selectedMonths.length > 0,
    maxPrice > 0,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedShips([])
    setSelectedPorts([])
    setSelectedRegions([])
    setSelectedLengths([])
    setSelectedCabins([])
    setSelectedMonths([])
    setMaxPrice(0)
    setAiSearch('')
  }

  const toggle = <T,>(arr: T[], val: T, setter: (v: T[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-1">
                Disney Cruise Deals
              </h1>
              <p className="text-slate-600">
                {sailings.length} sailings tracked · Updated daily
              </p>
            </div>
            <GuestSelector />
          </div>
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
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="score">Best Score</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="date">Sail Date</option>
            <option value="drop">Biggest Drop</option>
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

        {/* Expandable structured filter panel */}
        {showFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-5">
            {/* Ships */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Ship</p>
              <div className="flex flex-wrap gap-2">
                {ships.map(ship => (
                  <button
                    key={ship.id}
                    onClick={() => toggle(selectedShips, ship.id, setSelectedShips)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedShips.includes(ship.id)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                    )}
                  >
                    {ship.name.replace('Disney ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination */}
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
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Departure Port */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Departure Port</p>
              <div className="flex flex-wrap gap-2">
                {ports
                  .filter(p => sailings.some(s => s.departure_port_id === p.id))
                  .map(port => (
                    <button
                      key={port.id}
                      onClick={() => toggle(selectedPorts, port.id, setSelectedPorts)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                        selectedPorts.includes(port.id)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                      )}
                    >
                      {port.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Nights */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Number of Nights</p>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map(len => (
                  <button
                    key={len}
                    onClick={() => toggle(selectedLengths, len, setSelectedLengths)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedLengths.includes(len)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                    )}
                  >
                    {len === 7 ? '7+ nights' : `${len} nights`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cabin Type */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Cabin Type</p>
              <div className="flex flex-wrap gap-2">
                {CABIN_TYPES.map(c => (
                  <button
                    key={c.value}
                    onClick={() => toggle(selectedCabins, c.value, setSelectedCabins)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedCabins.includes(c.value)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Month */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Sail Month</p>
              <div className="flex flex-wrap gap-2">
                {MONTHS.map(m => (
                  <button
                    key={m.value}
                    onClick={() => toggle(selectedMonths, m.value, setSelectedMonths)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                      selectedMonths.includes(m.value)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Max Price: {maxPrice ? `$${maxPrice.toLocaleString()}` : 'Any'}
              </p>
              <input
                type="range"
                min={0}
                max={10000}
                step={500}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full max-w-xs accent-blue-600"
              />
            </div>
          </div>
        )}

        {/* Secondary AI search */}
        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-1.5">Or describe what you&apos;re looking for...</p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={aiSearch}
              onChange={e => setAiSearch(e.target.value)}
              placeholder="e.g. 7-night Alaska in summer, family cruise under $5000..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-slate-700 placeholder:text-slate-400"
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

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {sailings.length} sailings
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sailing, index) => (
              <div key={sailing.id}>
                <SailingCard sailing={sailing} percentBelow={sailing.percentBelow} />
                {index === 5 && (
                  <div className="mt-5">
                    <AdSlot location="deals_grid_native" size="native" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-slate-500 mb-2">No sailings match your filters</p>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Bottom ad */}
        <div className="mt-10">
          <AdSlot location="deals_bottom_banner" size="728x90" />
        </div>
      </div>
    </div>
  )
}
