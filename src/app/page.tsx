import Link from 'next/link'
import {
  TrendingDown,
  Calculator,
  Plane,
  ArrowRight,
  Search,
  Ship,
  Zap,
  CreditCard,
  Users,
  Sparkles,
  MapPin,
  Clock,
  Trophy,
  Bot,
  Gift,
} from 'lucide-react'
import { SailingCard } from '@/components/ui/sailing-card'
import { EmailSignup } from '@/components/ui/email-signup'
import { GetQuoteCTA } from '@/components/get-quote-cta'
import { HeroSearch } from '@/components/ui/hero-search'
import { HomeDeals } from '@/components/ui/home-deals'
import {
  getBiggestPriceDrops,
  getShips,
  getSailings,
  getLastMinuteDeals,
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
  const lastMinuteDealsList = getLastMinuteDeals().slice(0, 3)

  const priceDropsWithSnapshots = priceDrops.map((sailing) => {
    const drop = 'drop' in sailing ? (sailing as any).drop : 0
    return { ...sailing, percentBelow: Math.round(drop) }
  })

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-24 md:py-36">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust signal pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Prices watched daily · No booking pressure · Free tools
          </div>

          <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.05]">
            The Smarter Way to<br className="hidden md:block" /> Plan a Disney Cruise
          </h1>

          <p className="font-inter text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time deal tracking, honest guides, and free tools — everything you need
            before you book Disney Cruise Line.
          </p>

          {/* AI Search Bar */}
          <div className="mb-10 max-w-2xl mx-auto">
            <HeroSearch />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#D4AF37] text-slate-900 font-semibold hover:bg-yellow-300 transition-colors duration-200 shadow-lg shadow-yellow-900/20"
            >
              <TrendingDown className="w-4 h-4" aria-hidden="true" />
              View Current Deals
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            >
              Calculate Trip Cost
            </Link>
          </div>
        </div>
      </section>

      {/* Last-Minute Deals */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16 md:py-20 border-t border-amber-100" aria-labelledby="last-minute-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Zap className="w-8 h-8 text-amber-600" aria-hidden="true" />
            <h2 id="last-minute-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900">
              Last-Minute Steals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {lastMinuteDealsList.map((sailing) => (
              <SailingCard key={sailing.id} sailing={sailing} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/deals/last-minute"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              View All Last-Minute Deals <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
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
              { href: '/tools/credit-cards', icon: CreditCard, label: 'Credit Card Hack', desc: 'The best card combo for Disney cruises' },
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

      {/* OBC Value Proposition */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] py-14 md:py-18" aria-labelledby="obc-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-7 h-7 text-[#D4AF37]" aria-hidden="true" />
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Exclusive Perk</span>
              </div>
              <h2 id="obc-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-3">
                Get Up to $400 in Free Onboard Credit
              </h2>
              <p className="text-blue-200 text-base max-w-xl">
                Book your Disney cruise through GatGrid and we&rsquo;ll add free spending money to your onboard account — for spa, dining, excursions, and more. Zero extra cost to you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/tools/obc-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D4AF37] text-[#1E3A5F] font-bold hover:bg-yellow-300 transition-colors"
              >
                <Gift className="w-4 h-4" aria-hidden="true" />
                Calculate My OBC
              </Link>
              <Link
                href="/onboard-credit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
              >
                Learn More
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="bg-[#1E3A5F] py-16 md:py-20" aria-labelledby="newsletter-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <h2 id="newsletter-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-4">
                Never Miss a Price Drop
              </h2>
              <p className="text-blue-200 text-lg mb-6 max-w-lg mx-auto lg:mx-0">
                Get notified when Disney cruise prices drop on your preferred dates. Our AI scans hundreds of sailings every day — you only hear about the ones worth booking.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-blue-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  Weekly deal digest every Sunday
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  Mid-week price drop alerts
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  Personal reply from Grayson
                </span>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[400px]">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8">
                <p className="text-[#D4AF37] font-semibold text-sm mb-1">Free deal alerts</p>
                <p className="text-white font-fraunces text-xl font-bold mb-5">Join Our Disney Cruise Community</p>
                <EmailSignup />
                <p className="text-blue-300 text-xs mt-3 text-center">
                  No spam. Unsubscribe anytime. Sent by Grayson, not a bot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solo Cruising CTA Banner */}
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

      {/* Get a Quote CTA */}
      <GetQuoteCTA />

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
