'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Sailing, Ship, Port } from '@/types/database'
import { formatPrice, formatDate, daysUntil, cn } from '@/lib/utils'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { DealScoreBadge } from '@/components/ui/deal-score-badge'
import { Search, SlidersHorizontal, X, ArrowRight, Zap } from 'lucide-react'

type SailingWithDrop = Sailing & { percentBelow?: number }

interface LastMinuteDealGridProps {
  deals: SailingWithDrop[]
  ships: Ship[]
  ports: Port[]
}

export function LastMinuteDealGrid({ deals: initialDeals, ships, ports }: LastMinuteDealGridProps) {
  // Filter state
  const [search, setSearch] = useState('')
  const [selectedShips, setSelectedShips] = useState<string[]>([])
  const [selectedNights, setSelectedNights] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'soonest' | 'savings' | 'score'>('soonest')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort logic
  const filtered = useMemo(() => {
    let results = [...initialDeals]

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

    // Nights filter
    if (selectedNights.length) {
      results = results.filter(s => {
        if (selectedNights.includes('7+') && s.length_nights >= 7) return true
        return selectedNights.some(n => {
          const [min, max] = n.split('-').map(Number)
          return s.length_nights >= min && s.length_nights <= max
        })
      })
    }

    // Region filter
    if (selectedRegions.length) {
      results = results.filter(s => s.region && selectedRegions.includes(s.region))
    }

    // Sort
    switch (sortBy) {
      case 'soonest':
        results.sort((a, b) => a.sail_date.localeCompare(b.sail_date))
        break
      case 'savings':
        results.sort((a, b) => {
          const savingsA = Math.round(a.current_lowest_price * 0.2) // Assume 20% discount
          const savingsB = Math.round(b.current_lowest_price * 0.2)
          return savingsB - savingsA
        })
        break
      case 'score':
        results.sort((a, b) => (b.sailing_score || 0) - (a.sailing_score || 0))
        break
    }

    return results
  }, [initialDeals, search, selectedShips, selectedNights, selectedRegions, sortBy])

  const activeFilterCount = [
    selectedShips.length > 0,
    selectedNights.length > 0,
    selectedRegions.length > 0,
  ].filter(Boolean).length

  const handleClearFilters = () => {
    setSelectedShips([])
    setSelectedNights([])
    setSelectedRegions([])
    setSearch('')
  }

  const handleShipToggle = (shipId: string) => {
    setSelectedShips(prev =>
      prev.includes(shipId) ? prev.filter(id => id !== shipId) : [...prev, shipId]
    )
  }

  const handleNightsToggle = (nights: string) => {
    setSelectedNights(prev =>
      prev.includes(nights) ? prev.filter(n => n !== nights) : [...prev, nights]
    )
  }

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    )
  }

  const uniqueShips = Array.from(new Set(initialDeals.map(d => d.ship_id)))
    .map(id => ships.find(s => s.id === id))
    .filter(Boolean) as Ship[]

  const regions = Array.from(new Set(initialDeals.map(d => d.region).filter(Boolean)))
    .sort() as string[]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-12">
        {/* Animated pulse background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
              <Zap className="h-5 w-5" />
              <span className="font-semibold text-sm">FLASH DEALS</span>
            </div>
          </div>
          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            ⚡ Flash Deals
          </h1>
          <p className="text-xl text-slate-700 mb-2 max-w-2xl mx-auto">
            Last-minute sailings at steep discounts
          </p>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Prices can change any moment — act fast on these incredible limited-time offers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filter and Sort Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by itinerary, ship, or port..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
            />
          </div>

          {/* Filter Toggle and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'soonest' | 'savings' | 'score')}
              className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="soonest">Soonest Departure</option>
              <option value="savings">Biggest Savings</option>
              <option value="score">Best Deal Score</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-6 p-6 bg-white rounded-lg border border-slate-200">
              {/* Ships Filter */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Ship</h3>
                <div className="space-y-2">
                  {uniqueShips.map(ship => (
                    <label key={ship.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedShips.includes(ship.id)}
                        onChange={() => handleShipToggle(ship.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-slate-700">{ship.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nights Filter */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Cruise Length</h3>
                <div className="space-y-2">
                  {['3-4', '5-6', '7+'].map(range => (
                    <label key={range} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedNights.includes(range)}
                        onChange={() => handleNightsToggle(range)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-slate-700">
                        {range === '7+' ? '7+ nights' : `${range} nights`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Region</h3>
                <div className="space-y-2">
                  {regions.map(region => (
                    <label key={region} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() => handleRegionToggle(region)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-slate-700 capitalize">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚢</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No deals found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your filters or check back soon for new last-minute deals.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Deals
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-600 mb-6">
              Showing <strong>{filtered.length}</strong> last-minute deal{filtered.length !== 1 ? 's' : ''} within 90 days
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(sailing => {
                const originalPrice = Math.round(sailing.current_lowest_price / 0.8) // Assume 20% discount
                const savings = originalPrice - sailing.current_lowest_price
                const daysLeft = daysUntil(sailing.sail_date)

                return (
                  <Link
                    key={sailing.id}
                    href={`/sailing/${sailing.id}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden">
                      {/* Header with Countdown */}
                      <div className="relative px-5 pt-5 pb-4 bg-gradient-to-r from-blue-50 to-slate-50">
                        <div className="absolute top-3 right-3">
                          <CountdownTimer sailDate={sailing.sail_date} size="md" />
                        </div>
                        <h3 className="font-fraunces text-lg font-bold text-slate-900 pr-32">
                          {sailing.itinerary_name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {sailing.ship?.name || 'Disney Cruise'}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="flex-1 px-5 py-4 space-y-3">
                        {/* Itinerary snippet */}
                        <div className="text-sm">
                          <p className="text-slate-600 font-medium mb-1">
                            {sailing.length_nights} nights
                          </p>
                          <p className="text-xs text-slate-500">
                            Departs {formatDate(sailing.sail_date)}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="border-t border-slate-100 pt-3">
                          <p className="text-xs text-slate-500 mb-1">From</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-slate-900">
                              {formatPrice(sailing.current_lowest_price)}
                            </span>
                            <span className="text-sm line-through text-slate-400">
                              {formatPrice(originalPrice)}
                            </span>
                          </div>
                          {sailing.length_nights > 0 && (
                            <p className="text-xs text-emerald-600 font-semibold mt-1">
                              {formatPrice(Math.round(sailing.current_lowest_price / 2 / sailing.length_nights))}/night per guest
                            </p>
                          )}
                          {savings > 0 && (
                            <p className="text-sm text-emerald-600 font-semibold mt-2">
                              Save {formatPrice(savings)}
                            </p>
                          )}
                        </div>

                        {/* Deal Score */}
                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-medium">Deal Score</span>
                            <DealScoreBadge score={sailing.sailing_score || 80} size="md" />
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                        <button className="w-full px-4 py-3 bg-gold hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors text-center">
                          View Deal
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
