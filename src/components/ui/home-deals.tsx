'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react'
import { SailingCard } from '@/components/ui/sailing-card'
import { GuestCountSelector } from '@/components/ui/guest-count-selector'
import type { Sailing, Ship } from '@/types/database'

interface HomeDealsProps {
  sailings: Sailing[]
  ships: Ship[]
}

const DURATION_OPTIONS = [
  { label: '3 nights', value: 3 },
  { label: '4 nights', value: 4 },
  { label: '5 nights', value: 5 },
  { label: '7+ nights', value: 7 },
]


export function HomeDeals({ sailings, ships }: HomeDealsProps) {
  const [selectedShip, setSelectedShip] = useState<string>('')
  const [selectedDurations, setSelectedDurations] = useState<number[]>([])
  const [minScore, setMinScore] = useState(0)
  const [guestCount, setGuestCount] = useState(2)
  const [privateIsland, setPrivateIsland] = useState(false)

  const filtered = useMemo(() => {
    let results = [...sailings]
    if (selectedShip) results = results.filter(s => s.ship_id === selectedShip)
    if (selectedDurations.length) {
      results = results.filter(s => {
        if (selectedDurations.includes(7) && s.length_nights >= 7) return true
        return selectedDurations.includes(s.length_nights)
      })
    }
    if (minScore > 0) results = results.filter(s => s.sailing_score >= minScore)
    if (privateIsland) {
      results = results.filter(s =>
        s.itinerary_details?.some(day =>
          day.port?.toLowerCase().includes('castaway cay') ||
          day.port?.toLowerCase().includes('lighthouse point')
        )
      )
    }
    return results.sort((a, b) => b.sailing_score - a.sailing_score)
  }, [sailings, selectedShip, selectedDurations, minScore, privateIsland])

  const toggleDuration = (val: number) => {
    setSelectedDurations(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    )
  }

  const clearFilters = () => {
    setSelectedShip('')
    setSelectedDurations([])
    setMinScore(0)
    setPrivateIsland(false)
  }

  const hasFilters = selectedShip || selectedDurations.length > 0 || minScore > 0 || privateIsland

  return (
    <div>
      {/* Filter Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Ship */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Ship
            </label>
            <select
              value={selectedShip}
              onChange={e => setSelectedShip(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>{ship.name}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Duration
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DURATION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => toggleDuration(opt.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedDurations.includes(opt.value)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Guests
            </label>
            <GuestCountSelector value={guestCount} onChange={setGuestCount} />
          </div>

          {/* Min Deal Score */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Min Deal Score: <span className="text-blue-600">{minScore > 0 ? minScore : 'Any'}</span>
            </label>
            <input
              type="range"
              min={0}
              max={90}
              step={10}
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Any</span><span>90+</span>
            </div>
          </div>
        </div>

        {/* Private Island */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => setPrivateIsland(prev => !prev)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              privateIsland
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
            }`}
          >
            <span>🏝️</span>
            Private Island Stop
          </button>
          <p className="text-[11px] text-slate-400 mt-1">Includes Castaway Cay or Lighthouse Point</p>
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          {filtered.length} sailing{filtered.length !== 1 ? 's' : ''} found
        </p>
        <Link
          href="/deals"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all deals <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(0, 9).map((sailing, index) => (
            <div key={sailing.id}>
              <SailingCard sailing={sailing} guestCount={guestCount} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl">
          <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No sailings match your filters</p>
          <button
            onClick={clearFilters}
            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
