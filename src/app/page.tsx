import Link from 'next/link'
import {
  Anchor,
  TrendingDown,
  Calculator,
  Plane,
  BedDouble,
  ArrowRight,
  Ship,
  Star,
  Zap,
  Leaf,
  Users,
  Sparkles,
} from 'lucide-react'
import { HomepageDealBrowser } from '@/components/ui/homepage-deal-browser'
import { EmailSignup } from '@/components/ui/email-signup'
import {
  getFeaturedSailings,
  getBiggestPriceDrops,
  getShips,
  getPorts,
  getLastMinuteDeals,
  getSailings,
  getSnapshotsForSailing,
} from '@/lib/data'

export const metadata = {
  title: 'Disney Cruise Deal Finder — GatGridCruises',
  description:
    'Find the best Disney cruise deals, compare prices, and plan your trip with free tools. Deals watched daily, honest advice, no booking pressure.',
}

export default async function Home() {
  const ships = getShips()
  const ports = getPorts()
  const allSailings = getSailings()

  // Pre-calculate percent below average for each sailing
  const sailingsWithDrops = allSailings.map(s => {
    const snapshots = getSnapshotsForSailing(s.id)
    const avg =
      snapshots.length > 0
        ? snapshots.reduce((sum, sn) => sum + sn.lowest_price, 0) / snapshots.length
        : s.current_lowest_price
    const percentBelow = avg > 0 ? Math.round(((avg - s.current_lowest_price) / avg) * 100) : 0
    return { ...s, percentBelow: Math.max(0, percentBelow) }
  })

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-900 py-16 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Disney Cruise Deal Finder
          </h1>

          <p className="font-inter text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Deals watched daily, honest advice, and free tools to plan smarter — no booking pressure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/deals"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#D4AF37] text-slate-900 font-semibold hover:bg-yellow-300 transition-colors duration-200"
            >
              Browse All Deals
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Calculate Trip Cost
            </Link>
          </div>
        </div>
      </section>

      {/* Deal Browser with filters + guest selector + score slider */}
      <section className="bg-slate-50 py-12 md:py-16 border-t border-slate-200" aria-labelledby="deals-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Anchor className="w-7 h-7 text-blue-600" aria-hidden="true" />
            <h2 id="deals-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
              Find Your Cruise
            </h2>
          </div>
          <HomepageDealBrowser sailings={sailingsWithDrops} ships={ships} ports={ports} />
        </div>
      </section>

      {/* Quick Tools */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="tools-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="tools-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Planning Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link
              href="/search"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Sparkles className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">AI Cruise Finder</h3>
              <p className="text-gray-600 text-sm">Describe your dream cruise in plain English and we&apos;ll find it</p>
            </Link>

            <Link
              href="/tools/cost-calculator"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Calculator className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">Cost Calculator</h3>
              <p className="text-gray-600 text-sm">Find out what a Disney cruise really costs — beyond the advertised price</p>
            </Link>

            <Link
              href="/tools/flights"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Plane className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">Flight Finder</h3>
              <p className="text-gray-600 text-sm">Find the best flights to your departure port</p>
            </Link>

            <Link
              href="/tools/carbon-calculator"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Leaf className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">Carbon Calculator</h3>
              <p className="text-gray-600 text-sm">See the environmental impact of your cruise</p>
            </Link>

            <Link
              href="/travel-hacks"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Star className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">Travel Hacks</h3>
              <p className="text-gray-600 text-sm">Learn insider strategies to make your cruise cheaper — or free</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-slate-50 py-16 md:py-20" aria-labelledby="newsletter-heading">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 id="newsletter-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-gray-600">
              Get weekly updates on Disney cruise price drops, travel tips, and exclusive deals.
            </p>
          </div>
          <EmailSignup />
        </div>
      </section>

      {/* Solo Cruising CTA */}
      <section className="bg-gradient-to-r from-purple-50 via-white to-purple-50 py-16 md:py-20 border-t border-purple-100" aria-labelledby="solo-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-600" aria-hidden="true" />
                <h2 id="solo-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
                  Cruising Solo?
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                Discover our dedicated solo traveler hub with tips, deals, and community
              </p>
            </div>
            <div>
              <Link
                href="/solo-cruising"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                Explore Solo Cruising
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Quick Links */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-20 border-t border-slate-200" aria-labelledby="fleet-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="fleet-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Explore Disney&apos;s Fleet
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {ships.map((ship) => (
              <Link
                key={ship.id}
                href={`/ships/${ship.slug}`}
                className="px-6 py-2 rounded-full bg-white text-blue-600 font-semibold border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                {ship.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
