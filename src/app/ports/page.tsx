import { Metadata } from 'next'
import Link from 'next/link'
import { getPorts } from '@/lib/data'
import { MapPin, Plane, DollarSign, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Ports',
  description: 'Explore all Disney Cruise Line departure ports. Complete guides with parking, weather, activities, and pre-cruise hotel recommendations for every port.',
}

// Map port IDs to estimated sailings per year (approximate)
const sailingsPerPort: Record<string, number> = {
  'port-0001': 15, // Port Canaveral
  'port-0002': 18, // Miami
  'port-0003': 12, // Galveston
  'port-0004': 8,  // New York
  'port-0005': 6,  // Vancouver
  'port-0006': 4,  // Southampton
  'port-0007': 5,  // Barcelona
  'port-0008': 4,  // Sydney
  'port-0009': 3,  // Tokyo
  'port-0010': 3,  // Singapore
}

// Continent/region grouping
const portGroups: Record<string, string[]> = {
  'Caribbean & Bahamas (USA)': ['port-0001', 'port-0002', 'port-0003'],
  'Northeast USA & Canada': ['port-0004', 'port-0005'],
  'Europe': ['port-0006', 'port-0007'],
  'Asia-Pacific': ['port-0008', 'port-0009', 'port-0010'],
}

export default function PortsIndexPage() {
  const allPorts = getPorts()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight text-slate-900">
              Disney Cruise Ports
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              Comprehensive guides for all Disney Cruise Line departure ports. Parking, weather, activities, and honest hotel recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto prose prose-slate mb-12">
          <p className="text-lg leading-relaxed text-slate-700">
            Whether you're sailing from Florida, New York, Canada, Europe, or the Asia-Pacific, every port has a story. This guide covers everything you need to know about arriving, parking, getting through the terminal, and making the most of your time before your cruise.
          </p>
        </div>

        {/* Ports by Region */}
        {Object.entries(portGroups).map(([region, portIds]) => {
          const regionPorts = allPorts.filter(p => portIds.includes(p.id))
          if (regionPorts.length === 0) return null

          return (
            <div key={region} className="mb-16">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                {region}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionPorts.map(port => (
                  <Link
                    key={port.id}
                    href={`/hotels/${port.slug}`}
                    className="group border border-slate-300 rounded-lg p-6 hover:border-[#D4AF37] hover:shadow-lg transition-all"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#D4AF37] transition-colors">
                            {port.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {port.city}, {port.country}
                          </p>
                        </div>
                      </div>

                      {/* Code Badge */}
                      <div className="inline-block bg-[#1E3A5F]/20 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold">
                        {port.code}
                      </div>
                    </div>

                    {/* Overview */}
                    <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                      {port.overview}
                    </p>

                    {/* Key Stats */}
                    <div className="space-y-2 mb-5 pb-5 border-b border-slate-200">
                      {/* Sailings */}
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>
                          ~{sailingsPerPort[port.id] || 2} sailings/year
                        </span>
                      </div>

                      {/* Nearest Airport */}
                      {port.nearest_airports.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Plane className="w-4 h-4 text-slate-500" />
                          <span>
                            {port.nearest_airports[0].code} ({port.nearest_airports[0].distance_miles} mi)
                          </span>
                        </div>
                      )}

                      {/* Parking Info */}
                      {port.parking && port.parking.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span>
                            Parking from ${Math.min(...port.parking.map(p => p.dailyRate))}/day
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-sm font-semibold text-slate-900">Explore port guide</span>
                      <svg className="w-5 h-5 text-slate-900 group-hover:translate-x-1 group-hover:text-[#D4AF37] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
              Prepare for your departure
            </h2>
            <p className="text-slate-700 mb-6">
              Each port guide includes parking options, driving directions, weather forecasts, terminal tips, nearby activities, and honest recommendations for pre-cruise hotels.
            </p>
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Pre-Cruise Hotels
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
