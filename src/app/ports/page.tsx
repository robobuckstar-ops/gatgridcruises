import { Metadata } from 'next'
import Link from 'next/link'
import { getPorts } from '@/lib/data'
import { allDestinationPorts } from '@/data/destination-ports'
import { MapPin, Plane, DollarSign, Calendar, Anchor, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Ports — Destination Guides & Departure Ports',
  description: 'Complete Disney Cruise Line port guides. In-depth destination guides for Nassau, Castaway Cay, Lookout Cay, Cozumel, Grand Cayman, and St. Thomas — plus departure-port info for every Disney embarkation port.',
  openGraph: {
    title: 'Disney Cruise Ports — Destination Guides & Departure Ports',
    description: 'In-depth port guides for every Disney Cruise Line destination — Nassau, Castaway Cay, Lookout Cay, Cozumel, Grand Cayman, St. Thomas — plus departure-port info.',
    url: 'https://gatgridcruises.com/ports',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Ports — Destination Guides & Departure Ports',
    description: 'In-depth port guides for every Disney Cruise Line destination plus departure-port info.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight text-white">
              Disney Cruise Ports
            </h1>
            <p className="text-lg sm:text-xl text-blue-200">
              In-depth port guides for every Disney Cruise Line destination — what to do, where to eat, which excursions are worth it — plus departure-port info for every embarkation port.
            </p>
          </div>
        </div>
      </div>

      {/* DESTINATION PORT GUIDES */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#1E3A5F] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
              <Anchor className="w-3.5 h-3.5" />
              Cruise Destination Guides
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Where Disney Cruises Stop
            </h2>
            <p className="text-slate-700 max-w-2xl leading-relaxed">
              Comprehensive port-day guides for the destinations Disney ships visit most often. Top things to do, excursion comparisons, dining picks, family-tested tips, and weather windows for every cruise stop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allDestinationPorts.map(port => (
              <Link
                key={port.slug}
                href={`/ports/${port.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white hover:border-[#D4AF37] hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="bg-gradient-to-br from-[#1E3A5F] to-slate-900 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-3xl flex-shrink-0" aria-hidden="true">
                        {port.flag}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                          {port.shortName}
                        </h3>
                        <p className="text-blue-300 text-xs mt-0.5">{port.country}</p>
                      </div>
                    </div>
                    {port.isPrivateIsland && (
                      <span className="text-[10px] font-bold uppercase bg-[#D4AF37] text-[#1E3A5F] px-2 py-0.5 rounded-full whitespace-nowrap">
                        Disney Island
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {port.heroTagline}
                  </p>
                  <div className="space-y-1.5 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">⏱️</span>
                      <span>{port.typicalDockTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">⚓</span>
                      <span className="capitalize">
                        {port.dockType === 'pier'
                          ? 'Pier docking (no tender)'
                          : port.dockType === 'tender'
                            ? 'Tender port'
                            : 'Pier or tender'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-sm font-semibold text-[#1E3A5F]">Read full guide</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* DEPARTURE PORTS */}
      <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            <Plane className="w-3.5 h-3.5" />
            Departure Ports
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Where Disney Cruises Sail From
          </h2>
          <p className="text-slate-700 max-w-2xl leading-relaxed">
            Embarkation-port guides covering parking, driving directions, terminal tips, weather, and pre-cruise hotel recommendations for every Disney Cruise Line departure port.
          </p>
        </div>

        {/* Ports by Region */}
        {Object.entries(portGroups).map(([region, portIds]) => {
          const regionPorts = allPorts.filter(p => portIds.includes(p.id))
          if (regionPorts.length === 0) return null

          return (
            <div key={region} className="mb-16">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                {region}
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionPorts.map(port => (
                  <Link
                    key={port.id}
                    href={`/hotels/${port.slug}`}
                    className="group border border-slate-300 rounded-lg p-6 hover:border-[#1E3A5F] hover:shadow-lg transition-all"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">
                            {port.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {port.city}, {port.country}
                          </p>
                        </div>
                      </div>

                      {/* Code Badge */}
                      <div className="inline-block bg-[#1E3A5F]/10 text-[#1E3A5F] px-2.5 py-1 rounded text-xs font-semibold">
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
                      <svg className="w-5 h-5 text-slate-900 group-hover:translate-x-1 group-hover:text-[#1E3A5F] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0a1628] transition-colors"
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
