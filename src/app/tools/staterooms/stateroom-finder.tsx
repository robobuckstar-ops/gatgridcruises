'use client'

import { useState, useMemo } from 'react'
import { Info, Waves, Eye, Volume2, Users, DoorOpen, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Ship, Stateroom } from '@/types/database'

interface StateroomFinderProps {
  ships: Ship[]
  stateroomsByShip: Record<string, Stateroom[]>
}

type SortOption = 'noise' | 'view' | 'deck_low' | 'deck_high' | 'number'
type Position = 'forward' | 'mid' | 'aft'
type Category = 'Inside' | 'Oceanview' | 'Verandah' | 'Concierge'

const categoryColors: Record<Category, { badge: string; text: string }> = {
  Inside: { badge: 'bg-slate-200 text-slate-800', text: 'slate' },
  Oceanview: { badge: 'bg-blue-200 text-blue-800', text: 'blue' },
  Verandah: { badge: 'bg-emerald-200 text-emerald-800', text: 'emerald' },
  Concierge: { badge: 'bg-amber-100 text-amber-900', text: 'amber' },
}

function RatingBar({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-3 rounded-sm ${
            i < rating ? 'bg-slate-700' : 'bg-slate-300'
          }`}
        />
      ))}
    </div>
  )
}

export function StateroomFinder({ ships, stateroomsByShip }: StateroomFinderProps) {
  // Filter state
  const [selectedShipId, setSelectedShipId] = useState<string | null>(
    Object.keys(stateroomsByShip)[0] || null
  )
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [deckRange, setDeckRange] = useState<[number, number]>([1, 14])
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([])
  const [minNoiseRating, setMinNoiseRating] = useState(1)
  const [minViewRating, setMinViewRating] = useState(1)
  const [onlyAccessible, setOnlyAccessible] = useState(false)
  const [onlyConnecting, setOnlyConnecting] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('noise')

  // Get all decks from staterooms
  const allDecks = useMemo(() => {
    const decks = new Set<number>()
    Object.values(stateroomsByShip).forEach(rooms => {
      rooms.forEach(room => decks.add(room.deck))
    })
    return Array.from(decks).sort((a, b) => a - b)
  }, [stateroomsByShip])

  // Get staterooms for selected ship
  const staterooms = useMemo(() => {
    if (!selectedShipId) return []
    return stateroomsByShip[selectedShipId] || []
  }, [selectedShipId, stateroomsByShip])

  // Filter and sort logic
  const filtered = useMemo(() => {
    let results = [...staterooms]

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(s => selectedCategories.includes(s.category as Category))
    }

    // Deck range filter
    results = results.filter(s => s.deck >= deckRange[0] && s.deck <= deckRange[1])

    // Position filter
    if (selectedPositions.length > 0) {
      results = results.filter(s => selectedPositions.includes(s.position as Position))
    }

    // Noise rating filter
    results = results.filter(s => s.noise_rating >= minNoiseRating)

    // View rating filter
    results = results.filter(s => s.view_rating >= minViewRating)

    // Accessible filter
    if (onlyAccessible) {
      results = results.filter(s => s.accessible)
    }

    // Connecting rooms filter
    if (onlyConnecting) {
      results = results.filter(s => s.connecting_room !== null)
    }

    // Sort
    switch (sortBy) {
      case 'noise':
        results.sort((a, b) => b.noise_rating - a.noise_rating)
        break
      case 'view':
        results.sort((a, b) => b.view_rating - a.view_rating)
        break
      case 'deck_low':
        results.sort((a, b) => a.deck - b.deck)
        break
      case 'deck_high':
        results.sort((a, b) => b.deck - a.deck)
        break
      case 'number':
        results.sort((a, b) => a.room_number.localeCompare(b.room_number))
        break
    }

    return results
  }, [staterooms, selectedCategories, deckRange, selectedPositions, minNoiseRating, minViewRating, onlyAccessible, onlyConnecting, sortBy])

  const selectedShip = ships.find(s => s.id === selectedShipId)
  const allCategories: Category[] = ['Inside', 'Oceanview', 'Verandah', 'Concierge']
  const positions: Position[] = ['forward', 'mid', 'aft']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div
        className="py-12 px-6 sm:px-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <DoorOpen className="w-8 h-8 text-blue-600" />
            <h1
              className="text-4xl font-bold text-slate-900"
              style={{ fontFamily: 'Fraunces' }}
            >
              Stateroom Finder
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl">
            Find your ideal Disney cruise stateroom with noise ratings, view ratings, and honest pros/cons for every room.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        {/* Info Box */}
        <div className="bg-[#1E3A5F]/10 border border-blue-200 rounded-lg p-4 mb-8 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <strong>How ratings work:</strong> Stateroom ratings are based on location analysis, not guest reviews. Noise ratings consider proximity to elevators, restaurants, pools, and engines. View ratings consider obstructions and sight lines. Your experience may vary.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
          <h2
            className="text-2xl font-bold mb-6 text-slate-900"
            style={{
              fontFamily: 'Fraunces',
            }}
          >
            Filter Staterooms
          </h2>

          <div className="space-y-8">
            {/* Ship Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Ship
              </label>
              <div className="flex flex-wrap gap-2">
                {ships.map(ship => (
                  <button
                    key={ship.id}
                    onClick={() => setSelectedShipId(ship.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedShipId === ship.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ship.name}
                    {!stateroomsByShip[ship.id] || stateroomsByShip[ship.id].length === 0 ? (
                      <span className="text-xs ml-2 opacity-75">Coming soon</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategories(prev =>
                          prev.includes(cat)
                            ? prev.filter(c => c !== cat)
                            : [...prev, cat]
                        )
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        selectedCategories.includes(cat)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Position Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Position
                </label>
                <div className="flex flex-wrap gap-2">
                  {positions.map(pos => (
                    <button
                      key={pos}
                      onClick={() => {
                        setSelectedPositions(prev =>
                          prev.includes(pos)
                            ? prev.filter(p => p !== pos)
                            : [...prev, pos]
                        )
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize ${
                        selectedPositions.includes(pos)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deck Range */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Deck Range: {deckRange[0]} - {deckRange[1]}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min={Math.min(...allDecks)}
                  max={Math.max(...allDecks)}
                  value={deckRange[0]}
                  onChange={(e) =>
                    setDeckRange([parseInt(e.target.value), deckRange[1]])
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min={Math.min(...allDecks)}
                  max={Math.max(...allDecks)}
                  value={deckRange[1]}
                  onChange={(e) =>
                    setDeckRange([deckRange[0], parseInt(e.target.value)])
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Noise Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Minimum Noise Rating: {minNoiseRating}
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={minNoiseRating}
                  onChange={(e) => setMinNoiseRating(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-slate-600 mt-1">
                  1 = Loudest, 5 = Quietest
                </p>
              </div>

              {/* View Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Minimum View Rating: {minViewRating}
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={minViewRating}
                  onChange={(e) => setMinViewRating(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-slate-600 mt-1">
                  1 = Worst View, 5 = Best View
                </p>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setOnlyAccessible(!onlyAccessible)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  onlyAccessible
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ♿ Accessible Only
              </button>
              <button
                onClick={() => setOnlyConnecting(!onlyConnecting)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  onlyConnecting
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                🔗 Connecting Rooms
              </button>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Sort By
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'noise' as SortOption, label: 'Noise (Best First)' },
                  { value: 'view' as SortOption, label: 'View (Best First)' },
                  { value: 'deck_low' as SortOption, label: 'Deck (Low to High)' },
                  { value: 'deck_high' as SortOption, label: 'Deck (High to Low)' },
                  { value: 'number' as SortOption, label: 'Room Number' },
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      sortBy === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <h2
            className="text-2xl font-bold mb-6 text-slate-900"
            style={{
              fontFamily: 'Fraunces',
            }}
          >
            Results ({filtered.length})
          </h2>

          {filtered.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600">
                No staterooms match your filters. Try adjusting your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(room => (
                <div
                  key={room.id}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
                >
                  {/* Card Header */}
                  <div
                    className="p-4 text-white bg-blue-600"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: 'Fraunces' }}>
                        {room.room_number}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          categoryColors[room.category as Category].badge
                        }`}
                      >
                        {room.category_code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{room.category}</span>
                      <span className="opacity-75">Deck {room.deck} {room.position}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-4">
                    {/* Ratings */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Volume2 className="w-4 h-4" />
                          Noise
                        </div>
                        <span className="text-sm font-semibold">{room.noise_rating}/5</span>
                      </div>
                      <RatingBar rating={room.noise_rating} />

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Eye className="w-4 h-4" />
                          View
                        </div>
                        <span className="text-sm font-semibold">{room.view_rating}/5</span>
                      </div>
                      <RatingBar rating={room.view_rating} />
                    </div>

                    {/* Details */}
                    <div className="pt-2 border-t border-slate-200 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-700">Max {room.max_occupancy} guests</span>
                      </div>

                      {room.accessible && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Accessible</span>
                        </div>
                      )}

                      {room.connecting_room && (
                        <div className="flex items-center gap-2">
                          <DoorOpen className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700 text-xs">
                            Connecting to {room.connecting_room.replace('stateroom-', '')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pros */}
                    {room.pros && room.pros.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-xs font-semibold text-emerald-700 mb-2">Pros</p>
                        <ul className="space-y-1">
                          {room.pros.map((pro, i) => (
                            <li key={i} className="text-xs text-emerald-800 flex gap-2">
                              <span className="text-emerald-600 flex-shrink-0">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Cons */}
                    {room.cons && room.cons.length > 0 && (
                      <div className="pt-2">
                        <p className="text-xs font-semibold text-red-700 mb-2">Cons</p>
                        <ul className="space-y-1">
                          {room.cons.map((con, i) => (
                            <li key={i} className="text-xs text-red-800 flex gap-2">
                              <span className="text-red-600 flex-shrink-0">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Notes */}
                    {room.notes && (
                      <div className="pt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-600 italic">{room.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
