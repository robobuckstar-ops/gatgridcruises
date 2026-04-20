'use client'

import { useState, useMemo } from 'react'
import type { Sailing, Ship, Port } from '@/types/database'
import { SailingCard } from '@/components/ui/sailing-card'
import { AdSlot } from '@/components/ui/ad-slot'
import { Search, SlidersHorizontal, X } from 'lucide-react'

type SortOption = 'score' | 'price_asc' | 'price_desc' | 'date' | 'drop'
type SailingWithDrop = Sailing & { percentBelow: number }

interface DealGridProps {
  sailings: SailingWithDrop[]
  ships: Ship[]
  ports: Port[]
}

export function DealGrid({ sailings, ships, ports }: DealGridProps) {
  // Filter state
  const [search, setSearch] = useState('')
  const [selectedShips, setSelectedShips] = useState<string[]>([])
  const [selectedPorts, setSelectedPorts] = useState<string[]>([])
  const [lengthFilter, setLengthFilter] = useState<number[]>([])
  const [minScore, setMinScore] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0) // 0 = no limit
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [showFilters, setShowFilters] = useState(false)

  const lengthOptions = [3, 4, 5, 7]

  // Filter and sort logic
  const filtered = useMemo(() => {
    let results = [...sailings]

    // Text search
    if (search) {
      const q = search.toLowerCase()
      results = results.filter(s =>
        s.itinerary_name.toLowerCase().includes(q) ||
        s.ship?.name.toLowerCase().includes(q) ||
        s.departure_port?.name.toLowerCase().includes(q)
      )
    }

    // Ship filter
    if (selectedShips.length) {
      results = results.filter(s => selectedShips.includes(s.ship_id))
    }

    // Port filter
    if (selectedPorts.length) {
      results = results.filter(s => selectedPorts.includes(s.departure_port_id))
    }

    // Length filter
    if (lengthFilter.length) {
      results = results.filter(s => {
        if (lengthFilter.includes(7) && s.length_nights >= 7) return true
        return lengthFilter.includes(s.length_nights)
      })
    }

    // Score filter
    if (minScore > 0) {
      results = results.filter(s => s.sailing_score >= minScore)
    }

    // Price filter
    if (maxPrice > 0) {
      results = results.filter(s => s.current_lowest_price <= maxPrice)
    }

    // Sort
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
  }, [sailings, search, selectedShips, selectedPorts, lengthFilter, minScore, maxPrice, sortBy])

  const activeFilterCount = [
    selectedShips.length > 0,
    selectedPorts.length > 0,
    lengthFilter.length > 0,
    minScore > 0,
    maxPrice > 0,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedShips([])
    setSelectedPorts([])
    setLengthFilter([])
    setMinScore(0)
    setMaxPrice(0)
    setSearch('')
  }

  const toggleShip = (id: string) => {
    setSelectedShips(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const togglePort = (id: string) => {
    setSelectedPorts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleLength = (len: number) => {
    setLengthFilter(prev =>
      prev.includes(len) ? prev.filter(l => l !== len) : [...prev, len]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-900 border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Disney Cruise Deals
          </h1>
          <p className="text-slate-600 text-lg">
            {sailings.length} sailings tracked · Updated daily
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search sailings, ships, ports..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
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
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-5">
            {/* Ships */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ships
              </label>
              <div className="flex flex-wrap gap-2">
                {ships.map(ship => (
                  <button
                    key={ship.id}
                    onClick={() => toggleShip(ship.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedShips.includes(ship.id)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-600'
                    }`}
                  >
                    {ship.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Ports */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Departure Port
              </label>
              <div className="flex flex-wrap gap-2">
                {ports
                  .filter(p => sailings.some(s => s.departure_port_id === p.id))
                  .map(port => (
                    <button
                      key={port.id}
                      onClick={() => togglePort(port.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        selectedPorts.includes(port.id)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:border-blue-600'
                      }`}
                    >
                      {port.name}
                    </button>
                  ))}
              </div>
            </div>

            {/* Length */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cruise Length
              </label>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map(len => (
                  <button
                    key={len}
                    onClick={() => toggleLength(len)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      lengthFilter.includes(len)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-600'
                    }`}
                  >
                    {len === 7 ? '7+ nights' : `${len} nights`}
                  </button>
                ))}
              </div>
            </div>

            {/* Score and Price range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Min Score: {minScore || 'Any'}
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={minScore}
                  onChange={e => setMinScore(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max Price: {maxPrice ? `$${maxPrice.toLocaleString()}` : 'Any'}
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {sailings.length} sailings
        </p>

        {/* Grid of results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sailing, index) => (
              <div key={sailing.id}>
                <SailingCard
                  sailing={sailing}
                  percentBelow={sailing.percentBelow}
                />
                {/* Insert ad after 6th card */}
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
            <p className="text-lg text-slate-500 mb-2">
              No sailings match your filters
            </p>
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
