'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Sailing } from '@/types/database'
import { ArrowRight, X, Plus, Crown } from 'lucide-react'
import { calculateOutTheDoorPrice, getPricePerNight } from '@/lib/pricing'
import { calculateDealScore } from '@/lib/deal-score'
import { formatPrice, formatDate } from '@/lib/utils'

interface CompareToolProps {
  sailings: Sailing[]
}

export function CompareTool({ sailings }: CompareToolProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchOpen, setSearchOpen] = useState<number | null>(null)

  const selected = selectedIds
    .map(id => sailings.find(s => s.id === id))
    .filter((s): s is Sailing => s !== undefined)

  const handleAddSlot = () => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, ''])
    }
  }

  const handleSelectSailing = (index: number, sailingId: string) => {
    const newIds = [...selectedIds]
    newIds[index] = sailingId
    setSelectedIds(newIds)
    setSearchOpen(null)
  }

  const handleRemove = (index: number) => {
    setSelectedIds(selectedIds.filter((_, i) => i !== index))
  }

  // Calculate best value and best deal for each category
  const analysis = useMemo(() => {
    if (selected.length === 0) return null

    const categories = ['inside', 'oceanview', 'verandah', 'concierge'] as const
    const categoryPrices: Record<string, { sailing: Sailing; price: number; index: number }[]> = {}

    categories.forEach(cat => {
      const prices: { sailing: Sailing; price: number; index: number }[] = []
      selected.forEach((sailing, idx) => {
        let price = 0
        switch (cat) {
          case 'inside':
            price = sailing.current_inside_price || sailing.current_lowest_price
            break
          case 'oceanview':
            price = sailing.current_oceanview_price || sailing.current_lowest_price
            break
          case 'verandah':
            price = sailing.current_verandah_price || sailing.current_lowest_price
            break
          case 'concierge':
            price = sailing.current_concierge_price || sailing.current_lowest_price
            break
        }
        if (price > 0) {
          prices.push({ sailing, price, index: idx })
        }
      })
      if (prices.length > 0) {
        categoryPrices[cat] = prices.sort((a, b) => a.price - b.price)
      }
    })

    // Calculate deal scores
    const dealScores = selected.map(s => ({
      sailing: s,
      score: calculateDealScore(s),
    }))

    const bestDealIndex = dealScores.reduce((best, current, idx) => {
      return current.score.score > dealScores[best].score.score ? idx : best
    }, 0)

    return {
      categoryPrices,
      dealScores,
      bestDealIndex,
    }
  }, [selected])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 text-slate-900 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold mb-4">
            Compare Cruises Side by Side
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Stack up to 4 sailings to find your perfect match. Compare prices, ships, itineraries, and cabin categories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Selection Slots */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">
              Select Sailings ({selectedIds.length}/4)
            </h2>
            {selectedIds.length < 4 && (
              <button
                onClick={handleAddSlot}
                className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#0a1628] transition-colors font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Sailing
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedIds.map((id, idx) => (
              <div key={idx} className="relative">
                <div className="relative">
                  <button
                    onClick={() => setSearchOpen(searchOpen === idx ? null : idx)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-left text-slate-700 hover:border-blue-400 transition-colors font-medium flex items-center justify-between"
                  >
                    <span className="truncate">
                      {id ? selected.find(s => s.id === id)?.itinerary_name || 'Select...' : 'Select a sailing...'}
                    </span>
                    {id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(idx)
                        }}
                        className="ml-2 p-1 hover:bg-red-100 rounded"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </button>

                  {/* Dropdown */}
                  {searchOpen === idx && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                      {sailings.map(sailing => (
                        <button
                          key={sailing.id}
                          onClick={() => handleSelectSailing(idx, sailing.id)}
                          disabled={selectedIds.includes(sailing.id) && sailing.id !== id}
                          className="w-full px-4 py-3 text-left border-b border-slate-100 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <div className="font-semibold text-slate-900">
                            {sailing.ship?.name} • {sailing.itinerary_name}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {formatDate(sailing.sail_date)} • {sailing.length_nights}N • {formatPrice(sailing.current_lowest_price)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {selectedIds.length === 0 && (
            <div className="mt-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
              <p className="text-slate-600 text-lg mb-4">Start by selecting sailings to compare them side by side.</p>
              <button
                onClick={handleAddSlot}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#0a1628] transition-colors font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add First Sailing
              </button>
            </div>
          )}
        </div>

        {/* Comparison Grid */}
        {selected.length >= 1 && analysis && (
          <div className="space-y-12">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selected.map((sailing, idx) => {
                const score = analysis.dealScores[idx]
                const isBestDeal = idx === analysis.bestDealIndex
                return (
                  <div
                    key={sailing.id}
                    className={`rounded-xl p-6 border-2 transition-all ${
                      isBestDeal
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {isBestDeal && (
                      <div className="flex items-center gap-1 text-amber-700 text-xs font-bold uppercase mb-3 pb-3 border-b border-amber-200">
                        <Crown className="w-4 h-4" />
                        Best Overall Deal
                      </div>
                    )}
                    <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-1">
                      {sailing.ship?.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{sailing.itinerary_name}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-600 uppercase font-semibold">Lowest Price</p>
                        <p className="font-fraunces text-2xl font-bold text-blue-600">
                          {formatPrice(sailing.current_lowest_price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 uppercase font-semibold">Deal Score</p>
                        <div className="flex items-end gap-2 mt-1">
                          <p className="font-fraunces text-2xl font-bold text-slate-900">
                            {score.score.score}
                          </p>
                          <p className="text-xs text-slate-600 mb-0.5">/100</p>
                          <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded ${
                            score.score.score >= 85
                              ? 'bg-emerald-100 text-emerald-700'
                              : score.score.score >= 70
                                ? 'bg-blue-100 text-blue-700'
                                : score.score.score >= 55
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                          }`}>
                            {score.score.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Ship Details */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Ship Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selected.map((sailing, idx) => (
                  <div key={sailing.id} className="bg-white rounded-lg p-4 border border-slate-200">
                    <h4 className="font-fraunces font-bold text-slate-900 mb-4">{sailing.ship?.name}</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-slate-600 font-semibold">Year Launched</p>
                        <p className="text-slate-900 font-bold">{sailing.ship?.year_launched}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-semibold">Capacity</p>
                        <p className="text-slate-900 font-bold">{sailing.ship?.capacity.toLocaleString()} guests</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-semibold">Tonnage</p>
                        <p className="text-slate-900 font-bold">{sailing.ship?.tonnage.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sailing Details */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Sailing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selected.map((sailing) => (
                  <div key={sailing.id} className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-slate-600 font-semibold">Sail Date</p>
                        <p className="text-slate-900 font-bold">{formatDate(sailing.sail_date)}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-semibold">Duration</p>
                        <p className="text-slate-900 font-bold">{sailing.length_nights} nights</p>
                      </div>
                      <div>
                        <p className="text-slate-600 font-semibold">Departure</p>
                        <p className="text-slate-900 font-bold">{sailing.departure_port?.name}</p>
                      </div>
                      {sailing.itinerary_details && sailing.itinerary_details.length > 0 && (
                        <div>
                          <p className="text-slate-600 font-semibold">Ports</p>
                          <p className="text-slate-900 font-bold text-xs">
                            {sailing.itinerary_details
                              .filter(d => d.port !== 'At Sea' && !d.port.includes('Port Canaveral'))
                              .slice(0, 2)
                              .map(d => d.port)
                              .join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cabin Price Comparison */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
              <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Cabin Category Pricing</h3>

              {/* Inside */}
              <div className="mb-8">
                <h4 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-slate-200">
                  Inside Cabins
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selected.map((sailing, idx) => {
                    const price = sailing.current_inside_price || sailing.current_lowest_price
                    const isLowest =
                      analysis.categoryPrices.inside &&
                      analysis.categoryPrices.inside[0]?.index === idx
                    const pricing = calculateOutTheDoorPrice(sailing, 'inside', 2)
                    return (
                      <div
                        key={sailing.id}
                        className={`rounded-lg p-4 border-2 ${
                          isLowest
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <p className="text-slate-600 text-sm font-semibold mb-2">{sailing.ship?.name}</p>
                        <p className="font-fraunces text-2xl font-bold text-slate-900 mb-1">
                          {formatPrice(price)}
                        </p>
                        <p className="text-xs text-slate-600 mb-3">
                          {formatPrice(pricing.perPerson)} per person
                        </p>
                        {isLowest && (
                          <span className="inline-block text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                            Best Value
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Oceanview */}
              <div className="mb-8">
                <h4 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-slate-200">
                  Oceanview Cabins
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selected.map((sailing, idx) => {
                    const price = sailing.current_oceanview_price || sailing.current_lowest_price
                    const isLowest =
                      analysis.categoryPrices.oceanview &&
                      analysis.categoryPrices.oceanview[0]?.index === idx
                    const pricing = calculateOutTheDoorPrice(sailing, 'oceanview', 2)
                    return (
                      <div
                        key={sailing.id}
                        className={`rounded-lg p-4 border-2 ${
                          isLowest
                            ? 'bg-blue-50 border-blue-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <p className="text-slate-600 text-sm font-semibold mb-2">{sailing.ship?.name}</p>
                        <p className="font-fraunces text-2xl font-bold text-slate-900 mb-1">
                          {formatPrice(price)}
                        </p>
                        <p className="text-xs text-slate-600 mb-3">
                          {formatPrice(pricing.perPerson)} per person
                        </p>
                        {isLowest && (
                          <span className="inline-block text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Best Value
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Verandah */}
              <div className="mb-8">
                <h4 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-slate-200">
                  Verandah Cabins
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selected.map((sailing, idx) => {
                    const price = sailing.current_verandah_price || sailing.current_lowest_price
                    const isLowest =
                      analysis.categoryPrices.verandah &&
                      analysis.categoryPrices.verandah[0]?.index === idx
                    const pricing = calculateOutTheDoorPrice(sailing, 'verandah', 2)
                    return (
                      <div
                        key={sailing.id}
                        className={`rounded-lg p-4 border-2 ${
                          isLowest
                            ? 'bg-teal-50 border-teal-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <p className="text-slate-600 text-sm font-semibold mb-2">{sailing.ship?.name}</p>
                        <p className="font-fraunces text-2xl font-bold text-slate-900 mb-1">
                          {formatPrice(price)}
                        </p>
                        <p className="text-xs text-slate-600 mb-3">
                          {formatPrice(pricing.perPerson)} per person
                        </p>
                        {isLowest && (
                          <span className="inline-block text-xs font-bold px-2 py-1 bg-teal-100 text-teal-700 rounded">
                            Best Value
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Concierge */}
              <div>
                <h4 className="font-fraunces text-lg font-bold text-slate-900 mb-4 pb-3 border-b-2 border-slate-200">
                  Concierge Cabins
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selected.map((sailing, idx) => {
                    const price = sailing.current_concierge_price || sailing.current_lowest_price
                    const isLowest =
                      analysis.categoryPrices.concierge &&
                      analysis.categoryPrices.concierge[0]?.index === idx
                    const pricing = calculateOutTheDoorPrice(sailing, 'concierge', 2)
                    return (
                      <div
                        key={sailing.id}
                        className={`rounded-lg p-4 border-2 ${
                          isLowest
                            ? 'bg-yellow-50 border-yellow-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <p className="text-slate-600 text-sm font-semibold mb-2">{sailing.ship?.name}</p>
                        <p className="font-fraunces text-2xl font-bold text-slate-900 mb-1">
                          {formatPrice(price)}
                        </p>
                        <p className="text-xs text-slate-600 mb-3">
                          {formatPrice(pricing.perPerson)} per person
                        </p>
                        {isLowest && (
                          <span className="inline-block text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                            Best Value
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Details Links */}
            {selected.length > 0 && (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
                <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">View Full Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selected.map((sailing) => (
                    <Link
                      key={sailing.id}
                      href={`/sailing/${sailing.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#0a1628] transition-colors font-semibold text-sm"
                    >
                      {sailing.itinerary_name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
