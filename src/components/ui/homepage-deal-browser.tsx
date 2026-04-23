'use client'

import { useState, useMemo } from 'react'
import { SailingCard } from './sailing-card'
import type { Sailing, Ship, Port } from '@/types/database'
import { ChevronDown } from 'lucide-react'

interface HomepageDealBrowserProps {
  sailings: (Sailing & { percentBelow?: number })[]
  ships: Ship[]
  ports: Port[]
}

const DESTINATIONS = [
  { label: 'Bahamas', value: 'bahamas' },
  { label: 'Eastern Caribbean', value: 'caribbean' },
  { label: 'Western Caribbean', value: 'caribbean' },
  { label: 'Alaska', value: 'alaska' },
  { label: 'Mediterranean', value: 'europe' },
]

const DURATIONS = [
  { label: '3–4 nights', min: 3, max: 4 },
  { label: '5 nights', min: 5, max: 5 },
  { label: '7 nights', min: 7, max: 7 },
  { label: '10+ nights', min: 10, max: 999 },
]

const GUEST_OPTIONS = [1, 2, 3, 4] as const

export function HomepageDealBrowser({ sailings, ships, ports }: HomepageDealBrowserProps) {
  const [destination, setDestination] = useState<string | null>(null)
  const [duration, setDuration] = useState<{ min: number; max: number } | null>(null)
  const [selectedShip, setSelectedShip] = useState<string | null>(null)
  const [selectedPort, setSelectedPort] = useState<string | null>(null)
  const [guests, setGuests] = useState(2)
  const [minScore, setMinScore] = useState(0)

  const filtered = useMemo(() => {
    return sailings.filter(s => {
      if (destination && s.region !== destination) return false
      if (duration && (s.length_nights < duration.min || s.length_nights > duration.max)) return false
      if (selectedShip && s.ship_id !== selectedShip) return false
      if (selectedPort && s.departure_port_id !== selectedPort) return false
      if (minScore > 0 && (s.sailing_score ?? 0) < minScore) return false
      return true
    })
  }, [sailings, destination, duration, selectedShip, selectedPort, minScore])

  const activeDest = destination
  const activeDur = duration

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
        {/* Destination pills */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Destination</p>
          <div className="flex flex-wrap gap-2">
            {DESTINATIONS.map(d => (
              <button
                key={d.label}
                onClick={() => setDestination(activeDest === d.value ? null : d.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeDest === d.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration pills */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Duration</p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map(d => {
              const isActive = activeDur?.min === d.min && activeDur?.max === d.max
              return (
                <button
                  key={d.label}
                  onClick={() => setDuration(isActive ? null : { min: d.min, max: d.max })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Ship buttons */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Ship</p>
          <div className="flex flex-wrap gap-2">
            {ships.map(ship => (
              <button
                key={ship.id}
                onClick={() => setSelectedShip(selectedShip === ship.id ? null : ship.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedShip === ship.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {ship.name.replace('Disney ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom row: port dropdown, guest selector, deal score slider */}
        <div className="flex flex-wrap items-end gap-4 pt-3 border-t border-slate-100">
          {/* Departure Port */}
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Departure Port</p>
            <div className="relative">
              <select
                value={selectedPort ?? ''}
                onChange={e => setSelectedPort(e.target.value || null)}
                className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Ports</option>
                {ports.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Guests */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Guests</p>
            <div className="flex gap-1">
              {GUEST_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setGuests(n)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold border transition-colors ${
                    guests === n
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {n === 4 ? '4+' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Min Deal Score */}
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Min Deal Score: <span className="text-blue-600 font-bold">{minScore}</span>
            </p>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Clear filters */}
          {(destination || duration || selectedShip || selectedPort || minScore > 0) && (
            <button
              onClick={() => {
                setDestination(null)
                setDuration(null)
                setSelectedShip(null)
                setSelectedPort(null)
                setMinScore(0)
              }}
              className="text-sm text-slate-500 hover:text-slate-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing <strong className="text-slate-900">{filtered.length}</strong> sailings
        {guests > 1 && <> · pricing shown for <strong className="text-slate-900">{guests === 4 ? '4+' : guests} guests</strong></>}
      </p>

      {/* Sailing grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <div className="text-4xl mb-3">🚢</div>
          <p className="font-semibold text-slate-700 mb-2">No sailings match your filters</p>
          <button
            onClick={() => { setDestination(null); setDuration(null); setSelectedShip(null); setSelectedPort(null); setMinScore(0) }}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(sailing => (
            <SailingCard key={sailing.id} sailing={sailing} percentBelow={sailing.percentBelow} />
          ))}
        </div>
      )}
    </div>
  )
}
