'use client'

import { useState, useCallback } from 'react'
import { SearchBar } from '@/components/ui/search-bar'
import { searchSailings } from '@/lib/search-engine'
import { getSailings } from '@/lib/data'
import { formatPrice, formatDateShort } from '@/lib/utils'
import type { Sailing } from '@/types/database'
import Link from 'next/link'
import { Star, MapPin, Calendar, Users, Anchor, Bell, ArrowRight } from 'lucide-react'

const SUGGESTED_SEARCHES = [
  '7-night Alaska',
  'Weekend getaway under $4000',
  'Best deal this month',
  'Family cruise with kids',
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Sailing[]>([])

  const sailings = getSailings()

  const handleSearch = useCallback((q: string) => {
    setIsLoading(true)
    setQuery(q)

    // Simulate brief processing delay for better UX
    setTimeout(() => {
      const filtered = searchSailings(q, sailings)
      setResults(filtered)
      setIsLoading(false)
    }, 150)
  }, [sailings])

  const handleSuggestedSearch = (suggestion: string) => {
    handleSearch(suggestion)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-slate-900 mb-4 text-center">
            Find Your Perfect Cruise
          </h1>
          <p className="text-center text-slate-600 mb-8 text-lg">
            Describe what you&rsquo;re looking for in natural language
          </p>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Suggested Searches */}
          {!query && (
            <div className="mt-10">
              <p className="text-center text-sm text-slate-600 mb-4 font-inter font-medium">
                Try one of these searches:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {SUGGESTED_SEARCHES.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestedSearch(suggestion)}
                    className="px-4 py-2 rounded-full bg-white border border-slate-300 text-slate-700 text-sm font-inter hover:border-blue-400 hover:bg-[#1E3A5F]/10 transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {query && (
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Results count */}
            <div className="mb-8">
              <h2 className="font-fraunces text-2xl font-bold text-slate-900">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </h2>
              {query && (
                <p className="text-slate-600 text-sm mt-1 font-inter">
                  for &ldquo;<span className="font-semibold">{query}</span>&rdquo;
                </p>
              )}
            </div>

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((sailing) => (
                  <Link
                    key={sailing.id}
                    href={`/sailing/${sailing.id}`}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-lg border border-slate-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
                      {/* Card Header */}
                      <div className="p-6 border-b border-slate-200 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-fraunces text-xl font-bold text-slate-900">
                              {sailing.itinerary_name}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1 font-inter">
                              {sailing.ship?.name || 'Disney Ship'}
                            </p>
                          </div>

                          {/* Sailing Score Badge */}
                          {sailing.sailing_score && (
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-fraunces font-bold text-lg">
                                {sailing.sailing_score}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Details Row */}
                        <div className="flex flex-wrap gap-4 text-xs text-slate-700 font-inter">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDateShort(sailing.sail_date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Anchor className="w-4 h-4" />
                            {sailing.length_nights} nights
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {sailing.departure_port?.name || 'Departs'}
                          </div>
                        </div>
                      </div>

                      {/* Pricing Section */}
                      <div className="p-6 flex-grow">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                              From
                            </p>
                            <p className="font-fraunces text-3xl font-bold text-blue-600">
                              {formatPrice(sailing.current_lowest_price)}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 font-inter">
                              per person
                            </p>
                            {sailing.length_nights > 0 && (
                              <p className="text-xs text-emerald-600 font-semibold mt-1 font-inter">
                                {formatPrice(Math.round(sailing.current_lowest_price / 2 / sailing.length_nights))}/night per guest
                              </p>
                            )}
                          </div>

                          {/* Cabin Types */}
                          <div className="pt-3 space-y-2 text-xs font-inter">
                            {sailing.current_inside_price && (
                              <div className="flex justify-between">
                                <span className="text-slate-600">Inside Cabin:</span>
                                <span className="text-slate-900 font-semibold">
                                  {formatPrice(sailing.current_inside_price)}
                                </span>
                              </div>
                            )}
                            {sailing.current_oceanview_price && (
                              <div className="flex justify-between">
                                <span className="text-slate-600">Ocean View:</span>
                                <span className="text-slate-900 font-semibold">
                                  {formatPrice(sailing.current_oceanview_price)}
                                </span>
                              </div>
                            )}
                            {sailing.current_verandah_price && (
                              <div className="flex justify-between">
                                <span className="text-slate-600">Verandah:</span>
                                <span className="text-slate-900 font-semibold">
                                  {formatPrice(sailing.current_verandah_price)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 border-t border-slate-200 bg-slate-50 group-hover:bg-[#1E3A5F]/10 transition-colors">
                        <button className="w-full bg-blue-600 text-white font-inter font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Anchor className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-2">
                  No cruises found
                </h3>
                <p className="text-slate-600 font-inter mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setQuery('')
                    setResults([])
                  }}
                  className="px-6 py-2 bg-blue-600 text-white font-inter font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Email CTA below results */}
            {results.length > 0 && (
              <div className="mt-12 rounded-xl bg-gradient-to-r from-[#0a1628] to-[#1E3A5F] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white font-bold text-lg mb-1">Don't see what you're looking for?</h3>
                  <p className="text-blue-200 text-sm">Get a personal alert when prices drop on your preferred dates — Grayson will find it for you.</p>
                </div>
                <Link
                  href="/deal-alerts"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0a1628] font-bold rounded-lg hover:bg-yellow-300 transition-colors text-sm whitespace-nowrap"
                >
                  Get Free Alerts
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
