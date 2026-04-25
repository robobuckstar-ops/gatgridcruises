'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Sailing } from '@/types/database'
import { ArrowRight, TrendingDown } from 'lucide-react'

interface CompareSailingsProps {
  sailings: (Sailing & { avgPrice: number })[]
}

export function CompareSailings({ sailings }: CompareSailingsProps) {
  const [sailingAId, setSailingAId] = useState<string | null>(null)
  const [sailingBId, setSailingBId] = useState<string | null>(null)

  const sailingA = sailings.find(s => s.id === sailingAId)
  const sailingB = sailings.find(s => s.id === sailingBId)

  const comparison = useMemo(() => {
    if (!sailingA || !sailingB) return null

    return {
      sailingA,
      sailingB,
      cheaperSailing: sailingA.current_lowest_price <= sailingB.current_lowest_price ? 'A' : 'B',
      betterDeal: ((sailingA.avgPrice - sailingA.current_lowest_price) / sailingA.avgPrice * 100) >= ((sailingB.avgPrice - sailingB.current_lowest_price) / sailingB.avgPrice * 100) ? 'A' : 'B',
      betterScore: sailingA.sailing_score >= sailingB.sailing_score ? 'A' : 'B',
    }
  }, [sailingA, sailingB])

  const formatPrice = (price: number | null) => {
    if (price === null) return '—'
    return `$${price.toLocaleString()}`
  }

  const formatPctBelowAvg = (current: number, avg: number) => {
    const pct = ((avg - current) / avg * 100).toFixed(1)
    return `${pct}%`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 text-slate-900">Compare Sailings</h1>
          <p className="text-slate-600 text-lg">Choose two sailings to see how they stack up side by side</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="block font-display text-lg font-bold text-slate-900 mb-3">Sailing A</label>
            <select
              value={sailingAId || ''}
              onChange={(e) => setSailingAId(e.target.value || null)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="">Select a sailing...</option>
              {sailings.map(s => (
                <option key={s.id} value={s.id} disabled={s.id === sailingBId}>
                  {s.ship?.name} • {s.itinerary_name} • {new Date(s.sail_date).toLocaleDateString()} • ${s.current_lowest_price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-display text-lg font-bold text-slate-900 mb-3">Sailing B</label>
            <select
              value={sailingBId || ''}
              onChange={(e) => setSailingBId(e.target.value || null)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-700 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="">Select a sailing...</option>
              {sailings.map(s => (
                <option key={s.id} value={s.id} disabled={s.id === sailingAId}>
                  {s.ship?.name} • {s.itinerary_name} • {new Date(s.sail_date).toLocaleDateString()} • ${s.current_lowest_price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {!comparison && (
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
            <p className="text-slate-600 text-lg">Select two sailings above to compare them side by side.</p>
          </div>
        )}

        {/* Comparison Table */}
        {comparison && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border-b border-slate-300">
                    <th className="px-4 py-3 text-left font-bold">Attribute</th>
                    <th className="px-4 py-3 text-center font-bold">Sailing A</th>
                    <th className="px-4 py-3 text-center font-bold">Sailing B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Ship</td>
                    <td className={`px-4 py-4 text-center font-medium ${comparison.sailingA.ship!.year_launched > comparison.sailingB.ship!.year_launched ? 'bg-[#1E3A5F]/10 text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {comparison.sailingA.ship?.name} ({comparison.sailingA.ship?.year_launched})
                    </td>
                    <td className={`px-4 py-4 text-center font-medium ${comparison.sailingB.ship!.year_launched > comparison.sailingA.ship!.year_launched ? 'bg-[#1E3A5F]/10 text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {comparison.sailingB.ship?.name} ({comparison.sailingB.ship?.year_launched})
                    </td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Itinerary</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingA.itinerary_name}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingB.itinerary_name}</td>
                  </tr>

                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Sail Date</td>
                    <td className="px-4 py-4 text-center text-slate-700">{new Date(comparison.sailingA.sail_date).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{new Date(comparison.sailingB.sail_date).toLocaleDateString()}</td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Length</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingA.length_nights} nights</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingB.length_nights} nights</td>
                  </tr>

                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Departure Port</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingA.departure_port?.name}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{comparison.sailingB.departure_port?.name}</td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Current Lowest Price</td>
                    <td className={`px-4 py-4 text-center font-bold text-lg ${comparison.cheaperSailing === 'A' ? 'bg-[#1E3A5F]/10 text-blue-600' : 'text-slate-700'}`}>
                      ${comparison.sailingA.current_lowest_price.toLocaleString()}
                    </td>
                    <td className={`px-4 py-4 text-center font-bold text-lg ${comparison.cheaperSailing === 'B' ? 'bg-[#1E3A5F]/10 text-blue-600' : 'text-slate-700'}`}>
                      ${comparison.sailingB.current_lowest_price.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Avg Historical Price</td>
                    <td className="px-4 py-4 text-center text-slate-700">${comparison.sailingA.avgPrice.toLocaleString()}</td>
                    <td className="px-4 py-4 text-center text-slate-700">${comparison.sailingB.avgPrice.toLocaleString()}</td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">% Below Average</td>
                    <td className={`px-4 py-4 text-center font-bold ${comparison.betterDeal === 'A' ? 'bg-[#1E3A5F]/10 text-blue-600 flex items-center justify-center gap-1' : 'text-slate-700'}`}>
                      {comparison.betterDeal === 'A' && <TrendingDown className="h-4 w-4" />}
                      {formatPctBelowAvg(comparison.sailingA.current_lowest_price, comparison.sailingA.avgPrice)}
                    </td>
                    <td className={`px-4 py-4 text-center font-bold ${comparison.betterDeal === 'B' ? 'bg-[#1E3A5F]/10 text-blue-600 flex items-center justify-center gap-1' : 'text-slate-700'}`}>
                      {comparison.betterDeal === 'B' && <TrendingDown className="h-4 w-4" />}
                      {formatPctBelowAvg(comparison.sailingB.current_lowest_price, comparison.sailingB.avgPrice)}
                    </td>
                  </tr>

                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Sailing Score</td>
                    <td className={`px-4 py-4 text-center font-bold text-lg ${comparison.betterScore === 'A' ? 'bg-[#1E3A5F]/10 text-blue-600' : 'text-slate-700'}`}>
                      {comparison.sailingA.sailing_score}/100
                    </td>
                    <td className={`px-4 py-4 text-center font-bold text-lg ${comparison.betterScore === 'B' ? 'bg-[#1E3A5F]/10 text-blue-600' : 'text-slate-700'}`}>
                      {comparison.sailingB.sailing_score}/100
                    </td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Inside Cabin</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingA.current_inside_price)}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingB.current_inside_price)}</td>
                  </tr>

                  <tr className="bg-white border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Oceanview Cabin</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingA.current_oceanview_price)}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingB.current_oceanview_price)}</td>
                  </tr>

                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="px-4 py-4 font-bold text-slate-900">Verandah Cabin</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingA.current_verandah_price)}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingB.current_verandah_price)}</td>
                  </tr>

                  <tr className="bg-white">
                    <td className="px-4 py-4 font-bold text-slate-900">Concierge Cabin</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingA.current_concierge_price)}</td>
                    <td className="px-4 py-4 text-center text-slate-700">{formatPrice(comparison.sailingB.current_concierge_price)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              <div className="bg-white border border-slate-300 rounded-xl p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Sailing A</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ship</span>
                    <span className="font-bold text-slate-900">{comparison.sailingA.ship?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Itinerary</span>
                    <span className="font-bold text-slate-900">{comparison.sailingA.itinerary_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sail Date</span>
                    <span className="font-bold text-slate-900">{new Date(comparison.sailingA.sail_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Current Price</span>
                    <span className="font-bold text-blue-600 text-lg">${comparison.sailingA.current_lowest_price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Score</span>
                    <span className="font-bold text-slate-900">{comparison.sailingA.sailing_score}/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-xl p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Sailing B</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ship</span>
                    <span className="font-bold text-slate-900">{comparison.sailingB.ship?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Itinerary</span>
                    <span className="font-bold text-slate-900">{comparison.sailingB.itinerary_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sail Date</span>
                    <span className="font-bold text-slate-900">{new Date(comparison.sailingB.sail_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Current Price</span>
                    <span className="font-bold text-blue-600 text-lg">${comparison.sailingB.current_lowest_price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Score</span>
                    <span className="font-bold text-slate-900">{comparison.sailingB.sailing_score}/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Details Links */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Link
                href={`/sailing/${sailingAId}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white rounded-lg font-bold hover:bg-[#0a1628] transition-colors"
              >
                View Sailing A Details <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/sailing/${sailingBId}`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white rounded-lg font-bold hover:bg-[#0a1628] transition-colors"
              >
                View Sailing B Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
