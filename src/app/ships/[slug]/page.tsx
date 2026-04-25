import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getShipBySlug, getShips, getSailings } from '@/lib/data'
import { CabinComparison } from './cabin-comparison'
import { Ship, Calendar, Users, Anchor, Check, DollarSign, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const ship = getShipBySlug(slug)
  if (!ship) return { title: 'Ship Not Found' }
  return {
    title: `${ship.name} — Disney Cruise Line`,
    description: `Explore the ${ship.name}. Launched ${ship.year_launched}, capacity ${ship.capacity.toLocaleString()} guests. Read our complete ship guide, reviews, and available sailings.`,
  }
}

export async function generateStaticParams() {
  const ships = getShips()
  return ships.map((ship) => ({
    slug: ship.slug,
  }))
}

export default async function ShipDetailPage({ params }: PageProps) {
  const { slug } = await params
  const ship = getShipBySlug(slug)
  if (!ship) notFound()

  // Get all sailings and filter by this ship
  const allSailings = getSailings()
  const shipSailings = allSailings
    .filter(s => s.ship_id === ship.id)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {ship.name}
          </h1>

          {/* Ship Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-300 mb-1">Year Launched</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.year_launched}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-300 mb-1">Guest Capacity</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.capacity.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-300 mb-1">Gross Tonnage</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.tonnage.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Highlights */}
            <section>
              <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">What Makes This Ship Special</h2>
              <ul className="space-y-3">
                {ship.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                    <Anchor className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="font-inter text-gray-700">{highlight}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">What's Included in Your Fare</h2>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="space-y-4">
                  {ship.whats_included.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-semibold text-emerald-800 flex items-center gap-2 mb-2">
                        <Check className="w-5 h-5" /> {category.category}
                      </h3>
                      <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1">
                        {category.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What Costs Extra */}
            <section>
              <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Costs Extra</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="space-y-4">
                  {ship.whats_extra.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5" /> {category.category}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-amber-700">
                            {item.name}: <span className="font-semibold">{item.price_range}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cabin Comparison */}
            <section>
              <CabinComparison shipSlug={slug} />
            </section>

            {/* Editorial Take */}
            <section>
              <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Our Take</h2>
              <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded">
                <p className="font-inter text-lg text-gray-700 leading-relaxed">
                  {ship.editorial_take}
                </p>
              </div>
            </section>

            {/* Upcoming Sailings */}
            {shipSailings.length > 0 && (
              <section>
                <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Upcoming Sailings on This Ship</h2>
                <div className="space-y-4">
                  {shipSailings.map((sailing) => (
                    <Link
                      key={sailing.id}
                      href={`/sailing/${sailing.id}`}
                      className="block p-5 border-2 border-gray-200 rounded-lg hover:border-blue-600 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-fraunces text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {sailing.itinerary_name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(sailing.sail_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Anchor className="w-4 h-4" />
                              {sailing.length_nights} nights
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold text-blue-600">
                            ${sailing.current_lowest_price}
                          </p>
                          <p className="text-xs text-gray-500">per stateroom</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-900 font-semibold text-sm group-hover:text-blue-600 transition-colors">
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center border border-slate-200">
                  <p className="text-sm text-gray-600 mb-3">Want to see all sailings on this ship?</p>
                  <Link
                    href={`/deals?ship=${ship.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Browse All Sailings
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ship Info Card */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4">Ship Overview</h3>
              <div className="space-y-4 font-inter text-sm text-gray-700">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Year Launched</p>
                  <p className="font-semibold text-slate-900">{ship.year_launched}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Passenger Capacity</p>
                  <p className="font-semibold text-slate-900">{ship.capacity.toLocaleString()} guests</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Gross Tonnage</p>
                  <p className="font-semibold text-slate-900">{ship.tonnage.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Stateroom Finder CTA */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-3">Find Your Stateroom</h3>
              <p className="font-inter text-sm text-gray-600 mb-4">
                Browse stateroom reviews, noise ratings, and our honest recommendations for the best cabins on this ship.
              </p>
              <Link
                href="/tools/staterooms"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
              >
                Stateroom Finder
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cost Calculator CTA */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-3">What Will Your Cruise Cost?</h3>
              <p className="font-inter text-sm text-gray-600 mb-4">
                Add flights, hotels, excursions, and dining packages to see the true cost of your dream cruise.
              </p>
              <Link
                href="/tools/cost-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-slate-900 font-semibold text-sm rounded-lg hover:bg-yellow-300 transition-colors w-full justify-center"
              >
                Cost Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Ships */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4">Explore Other Ships</h3>
              <Link
                href="/ships"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
              >
                View All Ships
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
