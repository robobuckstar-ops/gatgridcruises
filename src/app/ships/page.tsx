import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Ship } from 'lucide-react'
import { getShips } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Disney Cruise Line Ships — Fleet Guide & Comparison',
  description:
    'Compare every Disney Cruise Line ship — Disney Magic, Wonder, Dream, Fantasy, Wish, Treasure, and Adventure. Specs, highlights, staterooms, and deals for each vessel.',
  openGraph: {
    title: 'Disney Cruise Line Ships — Fleet Guide & Comparison',
    description:
      'Compare every Disney Cruise Line ship. Specs, stateroom categories, highlights, and current deals.',
    url: 'https://gatgridcruises.com/ships',
  },
}

export default function ShipsPage() {
  const ships = getShips()

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 py-16 md:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Ship className="w-10 h-10 text-blue-600" />
            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold">
              Disney's Fleet
            </h1>
          </div>
          <p className="font-inter text-lg md:text-xl text-slate-600 max-w-2xl">
            Each ship in Disney's fleet has its own personality. Whether you prefer the intimate charm of the Magic or the modern innovations of the Wish, find the perfect ship for your family.
          </p>
        </div>
      </section>

      {/* Ships Grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ships.map((ship) => (
              <Link
                key={ship.id}
                href={`/ships/${ship.slug}`}
                className="group h-full rounded-xl border-2 border-gray-200 hover:border-blue-600 overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 h-48 flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                  <Ship className="w-16 h-16 text-blue-600 opacity-30 group-hover:opacity-50 transition-opacity" />
                </div>

                <div className="p-6">
                  <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {ship.name.replace('Disney ', '')}
                  </h3>

                  <div className="space-y-2 mb-6 font-inter text-sm text-gray-600">
                    <p><span className="font-semibold text-slate-900">Launched:</span> {ship.year_launched}</p>
                    <p><span className="font-semibold text-slate-900">Capacity:</span> {ship.capacity.toLocaleString()} guests</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {ship.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-blue-600 font-bold text-sm">•</span>
                        <p className="font-inter text-sm text-gray-600">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-gray-600 mb-6">
            Ready to compare sailings? Check the latest deals on all ships.
          </p>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#1E3A5F] text-white font-semibold hover:bg-[#0a1628] transition-colors"
          >
            Browse All Sailings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
