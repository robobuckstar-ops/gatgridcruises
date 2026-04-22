import Link from 'next/link'
import {
  TrendingDown,
  Calculator,
  Plane,
  ArrowRight,
  Ship,
  Zap,
  Leaf,
  Sparkles,
  Search,
} from 'lucide-react'
import { SailingCard } from '@/components/ui/sailing-card'
import { EmailSignup } from '@/components/ui/email-signup'
import { AdSlot } from '@/components/ui/ad-slot'
import { HomeDeals } from '@/components/ui/home-deals'
import {
  getBiggestPriceDrops,
  getShips,
  getSailings,
} from '@/lib/data'

export const metadata = {
  title: 'Disney Cruise Deal Finder — GatGridCruises',
  description:
    'Find the best Disney cruise deals with our Deal Score system. Compare prices, filter by ship, duration, and guest count. Deals tracked daily — honest advice, no booking pressure.',
  openGraph: {
    title: 'Disney Cruise Deal Finder — GatGridCruises',
    description:
      'Find the best Disney cruise deals with our Deal Score system. Filter by ship, duration, and guests. Updated daily.',
    url: 'https://gatgridcruises.com',
  },
}

export default async function Home() {
  const allSailings = getSailings()
  const priceDrops = getBiggestPriceDrops()
  const ships = getShips()

  const priceDropsWithSnapshots = priceDrops.map((sailing) => {
    const drop = 'drop' in sailing ? (sailing as any).drop : 0
    return { ...sailing, percentBelow: Math.round(drop) }
  })

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0D2145] to-[#1a3a6e] text-white py-20 md:py-28">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-6 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
              Deals tracked daily · No booking pressure
            </div>

            <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Find Your Perfect
              <span className="block text-[#D4AF37]">Disney Cruise Deal</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our Deal Score system analyzes price history, timing, and value
              so you know exactly when to act — and when to wait.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/deals"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#D4AF37] text-slate-900 font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
              >
                View All Deals
              </Link>
              <Link
                href="/deals/flash-deals"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                <Zap className="w-4 h-4 mr-2 text-amber-400" />
                Flash Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Finder Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Disney Cruise Deal Finder
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Filter by ship, duration, and guest count. Prices update in real time.
            </p>
          </div>

          <HomeDeals sailings={allSailings} ships={ships} />
        </div>
      </section>

      {/* Biggest Price Drops */}
      <section className="bg-white py-16 md:py-20 border-t border-slate-100" aria-labelledby="price-drops-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <TrendingDown className="w-7 h-7 text-blue-600" aria-hidden="true" />
            <h2 id="price-drops-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
              Biggest Price Drops This Week
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {priceDropsWithSnapshots.map((sailing) => (
              <SailingCard
                key={sailing.id}
                sailing={sailing}
                percentBelow={sailing.percentBelow}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Deals <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Amex Banner */}
      <section className="bg-slate-50 py-8 border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AdSlot size="728x90" />
        </div>
      </section>

      {/* Quick Tools */}
      <section className="bg-white py-16 md:py-20 border-t border-slate-100" aria-labelledby="tools-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="tools-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">
            Planning Tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { href: '/search', icon: Search, label: 'AI Cruise Finder', desc: 'Describe your dream cruise in plain English' },
              { href: '/tools/cost-calculator', icon: Calculator, label: 'Cost Calculator', desc: 'True all-in cost beyond the advertised price' },
              { href: '/tools/flights', icon: Plane, label: 'Flight Finder', desc: 'Best flights to your departure port' },
              { href: '/tools/carbon-calculator', icon: Leaf, label: 'Carbon Calculator', desc: 'Environmental impact of your cruise' },
              { href: '/travel-hacks', icon: Sparkles, label: 'Travel Hacks', desc: 'Insider strategies to cruise cheaper — or free' },
            ].map(({ href, icon: Icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group p-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600 group-hover:text-white" aria-hidden="true" />
                </div>
                <h3 className="font-fraunces text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {label}
                </h3>
                <p className="text-slate-500 text-xs leading-snug">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a3a6e] py-16 md:py-20" aria-labelledby="newsletter-heading">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="newsletter-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-3">
            Never Miss a Deal
          </h2>
          <p className="text-blue-200 mb-8">
            Weekly Disney cruise price drops, travel tips, and flash deals. No spam.
          </p>
          <EmailSignup />
        </div>
      </section>

      {/* Ship Quick Links */}
      <section className="bg-slate-50 py-12 border-t border-slate-200" aria-labelledby="fleet-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Ship className="w-5 h-5 text-slate-500" aria-hidden="true" />
            <h2 id="fleet-heading" className="font-fraunces text-xl font-bold text-slate-700">
              Explore Disney&apos;s Fleet
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {ships.map((ship) => (
              <Link
                key={ship.id}
                href={`/ships/${ship.slug}`}
                className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold text-sm border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors duration-200 shadow-sm"
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
