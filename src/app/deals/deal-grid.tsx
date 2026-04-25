'use client'

import { useState, useMemo } from 'react'
import type { Sailing, Ship, Port } from '@/types/database'
import { SailingCard } from '@/components/ui/sailing-card'
import { GuestCountSelector } from '@/components/ui/guest-count-selector'
import { Search, SlidersHorizontal, X, Bell, ArrowRight } from 'lucide-react'
import { calculateDealScore } from '@/lib/deal-score'
import Link from 'next/link'
import { ReportIssueForm } from '@/components/ui/report-issue-form'
import { PRICES_LAST_UPDATED } from '@/lib/constants'

type SortOption = 'score' | 'price_asc' | 'price_desc' | 'price_per_night' | 'date' | 'duration' | 'drop'
type SailingWithDrop = Sailing & { percentBelow: number }

interface DealGridProps {
  sailings: SailingWithDrop[]
  ships: Ship[]
  ports: Port[]
}

export function DealGrid({ sailings, ships, ports }: DealGridProps) {
  const [search, setSearch] = useState('')
  const [selectedCruiseLines, setSelectedCruiseLines] = useState<string[]>([])
  const [selectedPorts, setSelectedPorts] = useState<string[]>([])
  const [lengthFilter, setLengthFilter] = useState<number[]>([])
  const [minScore, setMinScore] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [privateIsland, setPrivateIsland] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [showFilters, setShowFilters] = useState(false)
  const [guestCount, setGuestCount] = useState(2)

  const lengthOptions = [3, 4, 5, 7]

  // Unique cruise lines from ships in active sailings
  const cruiseLines = useMemo(() => {
    const lines = new Set<string>()
    sailings.forEach(s => {
      const line = s.ship?.cruise_line || (s.ship?.name?.split(' ')[0] ?? 'Other')
      lines.add(line)
    })
    return Array.from(lines).sort()
  }, [sailings])

  const filtered = useMemo(() => {
    let results = [...sailings]

    if (search) {
      const q = search.toLowerCase()
      results = results.filter(s =>
        s.itinerary_name.toLowerCase().includes(q) ||
        s.ship?.name.toLowerCase().includes(q) ||
        s.departure_port?.name.toLowerCase().includes(q)
      )
    }

    if (selectedCruiseLines.length) {
      results = results.filter(s => {
        const line = s.ship?.cruise_line || (s.ship?.name?.split(' ')[0] ?? 'Other')
        return selectedCruiseLines.includes(line)
      })
    }

    if (selectedPorts.length) {
      results = results.filter(s => selectedPorts.includes(s.departure_port_id))
    }

    if (lengthFilter.length) {
      results = results.filter(s => {
        if (lengthFilter.includes(7) && s.length_nights >= 7) return true
        return lengthFilter.includes(s.length_nights)
      })
    }

    // Score filter — uses the same dynamic calculation shown on each card
    if (minScore > 0) {
      results = results.filter(s => calculateDealScore(s, s.price_snapshots).score >= minScore)
    }

    if (maxPrice > 0) {
      results = results.filter(s => s.current_lowest_price <= maxPrice)
    }

    if (privateIsland) {
      results = results.filter(s =>
        s.itinerary_details?.some(day =>
          day.port?.toLowerCase().includes('castaway cay') ||
          day.port?.toLowerCase().includes('lighthouse point')
        )
      )
    }

    switch (sortBy) {
      case 'score':
        results.sort((a, b) =>
          calculateDealScore(b, b.price_snapshots).score - calculateDealScore(a, a.price_snapshots).score
        )
        break
      case 'price_asc':
        results.sort((a, b) => a.current_lowest_price - b.current_lowest_price)
        break
      case 'price_desc':
        results.sort((a, b) => b.current_lowest_price - a.current_lowest_price)
        break
      case 'price_per_night':
        results.sort((a, b) =>
          (a.current_lowest_price / a.length_nights) - (b.current_lowest_price / b.length_nights)
        )
        break
      case 'date':
        results.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
        break
      case 'duration':
        results.sort((a, b) => a.length_nights - b.length_nights)
        break
      case 'drop':
        results.sort((a, b) => b.percentBelow - a.percentBelow)
        break
    }

    return results
  }, [sailings, search, selectedCruiseLines, selectedPorts, lengthFilter, minScore, maxPrice, privateIsland, sortBy])

  const activeFilterCount = [
    selectedCruiseLines.length > 0,
    selectedPorts.length > 0,
    lengthFilter.length > 0,
    minScore > 0,
    maxPrice > 0,
    privateIsland,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCruiseLines([])
    setSelectedPorts([])
    setLengthFilter([])
    setMinScore(0)
    setMaxPrice(0)
    setPrivateIsland(false)
    setSearch('')
  }

  const toggleCruiseLine = (line: string) => {
    setSelectedCruiseLines(prev =>
      prev.includes(line) ? prev.filter(l => l !== line) : [...prev, line]
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
            Cruise Deals
          </h1>
          <p className="text-slate-600 text-lg">
            {sailings.length} sailings tracked · Prices approximate, verify at cruise line
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Prices last updated: {PRICES_LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest count selector — prominent, sticky-feeling */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <GuestCountSelector value={guestCount} onChange={setGuestCount} />
          <p className="text-xs text-slate-400">Price/person/night updates with guest count</p>
        </div>

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
              <option value="score">Best Deal Score</option>
              <option value="price_per_night">$/Person/Night</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="duration">Duration</option>
              <option value="date">Sail Date</option>
              <option value="drop">Biggest Price Drop</option>
            </select>
          </div>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-5">
            {/* Cruise Lines */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cruise Line
              </label>
              <div className="flex flex-wrap gap-2">
                {cruiseLines.map(line => (
                  <button
                    key={line}
                    onClick={() => toggleCruiseLine(line)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedCruiseLines.includes(line)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-blue-600'
                    }`}
                  >
                    {line}
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

            {/* Score and Price */}
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

            {/* Private Island */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Special Stops
              </label>
              <button
                onClick={() => setPrivateIsland(prev => !prev)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  privateIsland
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-blue-600'
                }`}
              >
                <span>🏝️</span>
                Private Island
              </button>
              <p className="text-xs text-slate-400 mt-1">Castaway Cay or Lighthouse Point</p>
            </div>

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

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((sailing, index) => (
              <div key={sailing.id} className={index === 11 ? 'contents' : ''}>
                <div>
                  <SailingCard
                    sailing={sailing}
                    percentBelow={sailing.percentBelow}
                  />
                  {/* Insert ad after 6th card */}
                </div>
                {/* Email CTA after 11th card (0-indexed) */}
                {index === 11 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-white font-bold text-lg mb-1">Never miss a price drop</h3>
                        <p className="text-blue-200 text-sm">Get personal email alerts when prices drop on sailings like these. Free, no spam.</p>
                      </div>
                      <Link
                        href="/deal-alerts"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap"
                      >
                        Get Free Alerts
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
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


        {/* Report an Issue */}
        <div className="mt-8">
          <ReportIssueForm page="/deals" />
        </div>
      </div>
    </div>
  )
}
