import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Anchor } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Disney Cruise Port Guides — What to Know Before You Dock',
  description: 'Complete guides for every major Disney Cruise Line port: Port Canaveral, Nassau, Castaway Cay, and Cozumel. Excursion tips, hotel recommendations, and insider advice.',
  keywords: ['disney cruise ports', 'port canaveral guide', 'nassau bahamas cruise', 'castaway cay guide', 'cozumel cruise port'],
}

const ports = [
  {
    slug: 'port-canaveral',
    name: 'Port Canaveral',
    location: 'Florida, USA',
    flag: '🇺🇸',
    description: 'Disney\'s primary Florida departure port — close to the parks and one of the most organized cruise embarkation experiences in the industry.',
    highlights: ['Kennedy Space Center nearby', '45 min from Orlando theme parks', 'Multiple Disney pre-cruise hotels', 'Fast, organized boarding'],
    sailings: 'Most Bahamian and Caribbean itineraries depart here',
    color: 'blue',
  },
  {
    slug: 'nassau',
    name: 'Nassau, Bahamas',
    location: 'New Providence Island, Bahamas',
    flag: '🇧🇸',
    description: 'The capital of the Bahamas — colonial architecture, lively markets, and clear blue water. Disney\'s most frequent port stop on 3- and 4-night cruises.',
    highlights: ['Atlantis Paradise Island day pass', 'Blue Lagoon Island beach day', 'Historic Queen\'s Staircase', 'Swimming with pigs excursion'],
    sailings: '3-night and 4-night Bahamas itineraries',
    color: 'cyan',
  },
  {
    slug: 'castaway-cay',
    name: 'Castaway Cay',
    location: "Disney's Private Island, Bahamas",
    flag: '🏝️',
    description: "Disney's own private island — exclusively for Disney Cruise Line guests. The most magical beach day you'll ever have, with miles of white sand and zero crowds from other cruise lines.",
    highlights: ['Adults-only Serenity Bay beach', "Cookies BBQ (best lunch at sea)", 'Tram to the beaches', 'Floating waterslide', 'Dedicated snorkel trail'],
    sailings: 'Included on most Bahamian and Caribbean itineraries',
    color: 'emerald',
  },
  {
    slug: 'cozumel',
    name: 'Cozumel, Mexico',
    location: 'Quintana Roo, Mexico',
    flag: '🇲🇽',
    description: 'World-class scuba and snorkeling on the Mesoamerican Reef — the second-largest coral reef system on earth. Disney\'s premier Mexican Riviera port stop.',
    highlights: ['Palancar Reef snorkeling', 'Chichen Itza day trip', 'El Cedral Mayan ruins', 'Dolphin Discovery', 'Authentic Mexican cuisine'],
    sailings: '7-night Western Caribbean itineraries',
    color: 'orange',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
}

const badgeMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  orange: 'bg-orange-100 text-orange-800',
}

export default function PortsHubPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/guides" className="text-blue-300 hover:text-[#D4AF37] text-sm transition-colors">
              Guides
            </Link>
            <span className="text-blue-400">/</span>
            <span className="text-blue-300 text-sm">Port Guides</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Anchor className="w-12 h-12 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Disney Cruise Port Guides
              </h1>
              <p className="font-fraunces text-xl text-[#D4AF37] mt-2">Know before you dock.</p>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            In-depth guides for every major Disney Cruise Line port — what to expect, the best
            excursions, where to stay pre-cruise, and the insider tips that make a half-day port
            stop feel like a full adventure.
          </p>
        </div>
      </section>

      {/* Port Cards */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ports.map((port) => (
              <Link
                key={port.slug}
                href={`/guides/ports/${port.slug}`}
                className="group block rounded-2xl border-2 border-slate-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-[#1E3A5F] px-6 py-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">{port.flag}</span>
                      <h2 className="font-fraunces text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {port.name}
                      </h2>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-300" />
                    <p className="text-blue-300 text-sm">{port.location}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 bg-white">
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{port.description}</p>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {port.highlights.map((h) => (
                        <span
                          key={h}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium border ${colorMap[port.color]}`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`text-xs px-3 py-2 rounded-lg font-medium ${badgeMap[port.color]}`}>
                    <span className="font-bold">Sailings: </span>{port.sailings}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-3">Quick Port Comparison</h2>
          <p className="text-slate-600 mb-8">Which Disney Cruise Line port is best for you?</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1E3A5F] text-white">
                  <th className="text-left p-4 font-semibold rounded-tl-xl">Port</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                  <th className="text-left p-4 font-semibold">Activity Level</th>
                  <th className="text-left p-4 font-semibold rounded-tr-xl">Typical Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {[
                  { port: 'Port Canaveral', bestFor: 'Families flying in, park extensions', activity: 'Relaxed', time: 'Embarkation day' },
                  { port: 'Nassau', bestFor: 'Beaches, water sports, quick excursions', activity: 'Moderate', time: '8 hrs in port' },
                  { port: 'Castaway Cay', bestFor: 'Everyone — pure Disney magic', activity: 'All levels', time: '7–8 hrs' },
                  { port: 'Cozumel', bestFor: 'Snorkeling, diving, Mexican culture', activity: 'Active', time: '7–9 hrs in port' },
                ].map((row, i) => (
                  <tr key={row.port} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="p-4 font-semibold text-[#1E3A5F]">{row.port}</td>
                    <td className="p-4 text-slate-600">{row.bestFor}</td>
                    <td className="p-4 text-slate-600">{row.activity}</td>
                    <td className="p-4 text-slate-600">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Amex CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/concierge"
            className="block rounded-2xl overflow-hidden border border-[#D4AF37] shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#D4AF37] font-bold text-lg leading-tight">Plan Your Disney Port Adventure</p>
                <p className="text-blue-200 text-sm mt-1">Our advisors help you choose the right sailing and make the most of every port stop.</p>
              </div>
              <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap">
                Start Planning →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
