import Link from 'next/link'
import {
  TrendingDown,
  Calculator,
  Plane,
  ArrowRight,
<<<<<<< HEAD
<<<<<<< HEAD
  Search,
  Ship,
  Zap,
  CreditCard,
=======
  Ship,
  Zap,
  Leaf,
>>>>>>> claude/tender-sutherland-edf4ad
  Users,
  Sparkles,
  MapPin,
  Clock,
  Trophy,
<<<<<<< HEAD
  Bot,
  Gift,
} from 'lucide-react'
import { SailingCard } from '@/components/ui/sailing-card'
import { EmailSignup } from '@/components/ui/email-signup'
import { GetQuoteCTA } from '@/components/get-quote-cta'
import { HeroEmailCapture } from '@/components/ui/hero-email-capture'
=======
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
>>>>>>> claude/focused-mcclintock-8fe348
=======
} from 'lucide-react'
import { SailingCard } from '@/components/ui/sailing-card'
import { EmailSignup } from '@/components/ui/email-signup'
import { GetQuoteCTA } from '@/components/get-quote-cta'
>>>>>>> claude/tender-sutherland-edf4ad
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

<<<<<<< HEAD
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* AI badge */}
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
              <Bot className="w-3.5 h-3.5" aria-hidden="true" />
              AI-Powered Deal Scanning
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Magically Valuable Disney Cruises
          </h1>

          <p className="font-inter text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our AI monitors hundreds of Disney cruise prices daily to surface the best deals —
            honest advice, transparent pricing, and free tools to help you book smarter.
          </p>

<<<<<<< HEAD
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Our AI scans thousands of sailings to find you the best Disney Cruise deals
          </div>

=======
>>>>>>> claude/tender-sutherland-edf4ad
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link href="/deals?filter=ship" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors shadow-sm">
              <Ship className="w-4 h-4" aria-hidden="true" />
              By Ship
            </Link>
            <Link href="/deals?filter=destination" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors shadow-sm">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Destination
            </Link>
            <Link href="/deals?filter=duration" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors shadow-sm">
              <Clock className="w-4 h-4" aria-hidden="true" />
              Duration
            </Link>
            <Link href="/deals?sort=score" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A5F] border-2 border-[#1E3A5F] text-white font-semibold text-sm hover:bg-[#162d4a] transition-colors shadow-sm">
              <Trophy className="w-4 h-4" aria-hidden="true" />
              Best Deal Score
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/deals"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#D4AF37] text-slate-900 font-semibold hover:bg-yellow-300 transition-colors duration-200"
            >
              Browse Deals
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              Calculate Trip Cost
            </Link>
          </div>

<<<<<<< HEAD
          {/* Hero Email Capture */}
          <div className="flex justify-center mt-6 mb-2">
            <HeroEmailCapture />
          </div>

          {/* Amex Affiliate Banner */}
          <div className="flex justify-center mt-8">
<<<<<<< HEAD
=======
          {/* Amex Affiliate Banner */}
          <div className="flex justify-center mt-8">
>>>>>>> claude/tender-sutherland-edf4ad
            <a
              href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full max-w-2xl rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
<<<<<<< HEAD
=======
            <AdSlot placement="homepage-top" size="728x90" />
=======
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                  Learn More →
                </span>
              </div>
            </a>
>>>>>>> claude/tender-sutherland-edf4ad
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            <a href="mailto:robobuckstar@gmail.com" className="hover:text-slate-600 transition-colors">Advertise your travel agency here — contact us</a>
          </p>
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
>>>>>>> claude/stupefied-fermat-7d3200
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                  Learn More →
                </span>
              </div>
            </a>
=======
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
>>>>>>> claude/focused-mcclintock-8fe348
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

<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSailings.map((sailing, index) => (
              <div key={sailing.id}>
                <SailingCard sailing={sailing} />

                {/* Amex affiliate banner after 6th card */}
                {index === 5 && (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> claude/tender-sutherland-edf4ad
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
                    <a
                      href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                          <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                        </div>
                        <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                          Learn More →
                        </span>
                      </div>
                    </a>
<<<<<<< HEAD
=======
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8">
                    <AdSlot placement="homepage-mid" size="300x250" />
>>>>>>> claude/stupefied-fermat-7d3200
=======
                    <p className="text-xs text-slate-400 mt-1.5">
                      <a href="mailto:robobuckstar@gmail.com" className="hover:text-slate-600 transition-colors">Advertise your travel agency here — contact us</a>
                    </p>
>>>>>>> claude/tender-sutherland-edf4ad
                  </div>
                )}
              </div>
=======
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
>>>>>>> claude/focused-mcclintock-8fe348
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
<<<<<<< HEAD

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* AI Search Finder */}
            <Link
              href="/search"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Search className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                AI Cruise Finder
              </h3>
              <p className="text-gray-600 text-sm">
                Describe your dream cruise in plain English and we'll find it
              </p>
            </Link>

            {/* Cost Calculator */}
            <Link
              href="/tools/cost-calculator"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Calculator className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                Cost Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Find out what a Disney cruise really costs — beyond the advertised price
              </p>
            </Link>

            {/* Flight Finder */}
            <Link
              href="/tools/flights"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Plane className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                Flight Finder
              </h3>
              <p className="text-gray-600 text-sm">
                Find the best flights to your departure port
              </p>
            </Link>

            {/* Credit Card Hack */}
            <Link
              href="/tools/credit-cards"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <CreditCard className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                Credit Card Hack
              </h3>
              <p className="text-gray-600 text-sm">
                The best card combo for Disney cruises — fly free, get trip insurance
              </p>
            </Link>

            {/* Travel Hacks */}
            <Link
              href="/travel-hacks"
              className="group p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 group-hover:bg-blue-600 mb-4 transition-colors">
                <Sparkles className="w-6 h-6 text-blue-600 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                Travel Hacks
              </h3>
              <p className="text-gray-600 text-sm">
                Learn insider strategies to make your cruise cheaper — or free
              </p>
            </Link>
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

      {/* Email Signup Section — full dark navy banner */}
      <section className="bg-[#1E3A5F] py-16 md:py-20" aria-labelledby="newsletter-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Copy */}
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

            {/* Form */}
            <div className="w-full lg:w-auto lg:min-w-[400px]">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8">
                <p className="text-[#D4AF37] font-semibold text-sm mb-1">Free deal alerts</p>
                <p className="text-white font-fraunces text-xl font-bold mb-5">Join thousands of Disney cruise fans</p>
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
<<<<<<< HEAD
=======

      {/* Ship Quick Links */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-20 border-t border-slate-200" aria-labelledby="fleet-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="fleet-heading" className="font-fraunces text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Explore Disney's Fleet
          </h2>
>>>>>>> claude/tender-sutherland-edf4ad

=======
          <p className="text-blue-200 mb-8">
            Weekly Disney cruise price drops, travel tips, and flash deals. No spam.
          </p>
          <EmailSignup />
        </div>
      </section>

>>>>>>> claude/focused-mcclintock-8fe348
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
