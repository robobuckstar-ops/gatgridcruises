import { Metadata } from 'next'
import Link from 'next/link'
import { getPorts, getHotelsForPort } from '@/lib/data'
import { MapPin, Home, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pre-Cruise Hotel Guide',
  description: 'Honest hotel recommendations near Disney cruise ports. Find the best places to stay the night before your departure.',
}

export default function HotelsIndexPage() {
  const ports = getPorts().filter(p => ['port-0001', 'port-0002', 'port-0003', 'port-0004'].includes(p.id))

  // Get hotel data for each port
  const portData = ports.map(port => {
    const hotels = getHotelsForPort(port.id)

    // Parse price ranges to find min and max
    const prices = hotels.flatMap(h => {
      const match = h.price_range.match(/\$(\d+)–\$(\d+)/)
      return match ? [parseInt(match[1]), parseInt(match[2])] : []
    })

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
    const disneyPartnerCount = hotels.filter(h => h.is_disney_partner).length
    const independentCount = hotels.filter(h => !h.is_disney_partner).length

    return {
      port,
      hotels,
      hotelCount: hotels.length,
      minPrice,
      maxPrice,
      disneyPartnerCount,
      independentCount,
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight text-slate-900">
              Pre-Cruise Hotel Guide
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              Where to stay the night before your Disney cruise — honest picks for every port.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto prose prose-slate mb-12">
          <p className="text-lg leading-relaxed text-slate-700">
            We recommend arriving the night before your cruise whenever possible. It eliminates flight delay stress and lets you start vacation mode early. Here are our honest picks for every major departure port.
          </p>
        </div>

        {/* Port Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {portData.map(({ port, hotelCount, minPrice, maxPrice, disneyPartnerCount, independentCount }) => (
            <Link
              key={port.id}
              href={`/hotels/${port.slug}`}
              className="group border border-slate-300 rounded-lg p-6 hover:border-[#D4AF37] hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A5F]/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-900 group-hover:text-[#D4AF37] transition-colors">
                      {port.name}
                    </h2>
                    <p className="text-sm text-slate-500">{port.city}, {port.country}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {/* Hotel Count */}
                <div className="flex items-center gap-2 text-slate-700">
                  <Home className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium">
                    {hotelCount} {hotelCount === 1 ? 'hotel' : 'hotels'} reviewed
                  </span>
                </div>

                {/* Price Range */}
                <div className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">${minPrice}–${maxPrice}</span>
                  <span className="text-slate-600"> per night</span>
                </div>

                {/* Breakdown */}
                <div className="flex items-center gap-4 text-sm text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-blue-600 fill-blue-600" />
                    <span><strong className="text-slate-900">{disneyPartnerCount}</strong> Disney partner</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">{independentCount}</strong> independent
                  </div>
                </div>
              </div>

              {/* CTA Arrow */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-sm font-semibold text-slate-900">View all options</span>
                <svg className="w-5 h-5 text-slate-900 group-hover:translate-x-1 group-hover:text-[#D4AF37] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
              Arrive calm, cruise happy
            </h2>
            <p className="text-slate-700 mb-6">
              The night before your cruise matters. A good pre-cruise hotel means better sleep, less stress, and you'll start your vacation refreshed instead of rushed.
            </p>
            <p className="text-sm text-slate-600">
              Each port guide includes our honest take on Disney partner hotels, independent alternatives, price comparisons, and port-specific tips to help you choose.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
