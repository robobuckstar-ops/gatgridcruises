import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getShipBySlug, getShips, getSailings } from '@/lib/data'
import { CabinComparison } from './cabin-comparison'
import { Calendar, Anchor, Check, DollarSign, ArrowRight, Ship as ShipIcon } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const ship = getShipBySlug(slug)
  if (!ship) return { title: 'Ship Not Found' }
  const title = `${ship.name} — Disney Cruise Line`
  const description = `Explore the ${ship.name}. Launched ${ship.year_launched}, capacity ${ship.capacity.toLocaleString()} guests. Read our complete ship guide, reviews, and available sailings.`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gatgridcruises.com/ships/${ship.slug}`,
      images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://gatgridcruises.com/og-image.png'],
    },
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
      <div className="relative bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 text-white border-b border-white/10 overflow-hidden">
        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
            <defs>
              <pattern id="wavePattern" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 30 Q 30 0 60 30 T 120 30" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#wavePattern)" />
          </svg>
        </div>
        {/* Ship icon glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none hidden lg:block">
          <ShipIcon className="w-[28rem] h-[28rem] text-[#D4AF37]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide uppercase">
            <Anchor className="w-3.5 h-3.5" />
            Disney Cruise Line · Ship Guide
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            {ship.name}
          </h1>
          <p className="font-inter text-lg sm:text-xl text-blue-100/90 max-w-2xl leading-relaxed">
            {ship.highlights[0]}
          </p>

          {/* Ship Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Year Launched</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.year_launched}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Guest Capacity</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.capacity.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Gross Tonnage</p>
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">{ship.tonnage.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Intro */}
            <section>
              <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">About the {ship.name}</h2>
              <p className="font-inter text-lg text-gray-700 leading-relaxed">
                {ship.editorial_take}
              </p>
            </section>

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
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white font-semibold text-sm rounded-lg hover:bg-[#0a1628] transition-colors w-full justify-center"
              >
                Stateroom Finder
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
