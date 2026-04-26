import { Metadata } from 'next'
import Link from 'next/link'
import { CreditCard, CheckCircle, ArrowRight, Star, Shield, Zap, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Disney Cruises 2026 | GatGridCruises',
  description:
    'The best credit cards for booking Disney cruises and earning travel rewards. Compare signup bonuses, points multipliers, lounge access, and trip insurance to maximize every cruise dollar.',
  openGraph: {
    title: 'Best Credit Cards for Disney Cruises 2026',
    description:
      'Compare the best travel credit cards for Disney cruise families — real affiliate links, honest reviews, and a proven 3-card strategy.',
    url: 'https://gatgridcruises.com/tools/credit-cards',
    images: [
      {
        url: 'https://gatgridcruises.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Best Credit Cards for Disney Cruises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Credit Cards for Disney Cruises 2026',
    description: 'The 3-card strategy that pays for flights, covers trip insurance, and earns points toward your next Disney cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const LINKS = {
  chaseInk: 'https://www.referyourchasecard.com/226m/6ZT33F9TOQ',
  capitalOneSpark: 'https://i.capitalone.com/JKlfRwN3f',
  amexBizPlat:
    'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',
  concierge: '/concierge',
}

export default function CreditCardsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#1E3A5F] to-[#0a1628] text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CreditCard className="w-4 h-4" aria-hidden="true" />
            Travel Hacks
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Best Credit Cards for<br />Disney Cruises
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mb-8">
            The right card stack pays for your flights, covers your trip insurance, and earns
            points toward your next cruise — automatically.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-blue-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Updated April 2026
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Real affiliate links
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Honest editorial reviews
            </div>
          </div>
        </div>
      </section>

      {/* ── Affiliate Disclosure ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-amber-800">
              <span className="font-bold">Affiliate Disclosure:</span> GatGridCruises earns a
              commission when you are approved through our referral links — at no extra cost to
              you. We only feature cards we genuinely recommend. Card terms change frequently;
              verify current offers with the issuer before applying. Not financial advice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* ── Strategy Intro ── */}
        <section aria-labelledby="strategy-heading">
          <div className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] rounded-2xl p-8 text-white">
            <h2
              id="strategy-heading"
              className="font-fraunces text-2xl font-bold mb-3 text-[#D4AF37]"
            >
              The Disney Cruise Wallet Strategy
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl text-sm leading-relaxed">
              Most families overpay for Disney cruises by leaving thousands in credit card value
              untouched. The right 3-card stack covers trip insurance, earns on the cruise fare, and
              funds your flights. Here&rsquo;s exactly how to do it.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: '✈️',
                  label: 'Fly Free',
                  desc: 'Stack Chase Ultimate Rewards from the Ink Preferred signup for free flights to MCO',
                },
                {
                  icon: '🛡️',
                  label: 'Free Insurance',
                  desc: "Amex Biz Plat covers trip cancellation — skip Disney's add-on insurance entirely",
                },
                {
                  icon: '💰',
                  label: '2% Back',
                  desc: 'Capital One Spark earns 2% cash back on every dollar with zero category tracking',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 border border-white/20 rounded-xl p-5"
                >
                  <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-blue-200 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CATEGORY 1 — BEST OVERALL
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="best-overall-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#D4AF37] text-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="best-overall-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Best Overall
            </h2>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                  Our Top Pick
                </span>
                <h3 className="font-fraunces text-2xl font-bold text-white mt-1">
                  Chase Ink Business Preferred
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                  $95 / yr
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">100,000 pts</p>
                  <p className="text-xs text-slate-400">≈ $1,250+ value</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">On Travel</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">3x points</p>
                  <p className="text-xs text-slate-400">Flights &amp; hotels</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$95</p>
                  <p className="text-xs text-slate-400">Pays for itself fast</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Trip Insurance</p>
                  <p className="font-fraunces font-bold text-emerald-600 text-lg">✓ Yes</p>
                  <p className="text-xs text-slate-400">Cancel + delay</p>
                </div>
              </div>

              {/* Why This Card */}
              <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The Ink Business Preferred is the single best card for Disney cruise families at
                  $95/year. The 100,000-point signup bonus is worth $1,250 minimum — redeemable as
                  cash, flights, or hotel nights. Use 3x points when you pay for the cruise, flights,
                  and internet. Chase Ultimate Rewards transfer 1:1 to Southwest, Hyatt, United, and
                  British Airways, making these the most flexible travel points available.
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {[
                  {
                    title: '100,000 point welcome bonus',
                    sub: 'Worth $1,250–$2,000+ when transferred to airlines or hotels',
                  },
                  {
                    title: '3x points on travel, shipping, internet, and streaming',
                    sub: 'Your cruise fare, flights, and home phone/internet bill all earn 3x',
                  },
                  {
                    title: 'Trip cancellation &amp; interruption insurance',
                    sub: 'Up to $5,000 per trip — covered automatically when you pay with the card',
                  },
                  {
                    title: 'Cell phone protection up to $1,000',
                    sub: 'Pay your monthly phone bill on the card and get comprehensive device coverage',
                  },
                  {
                    title: 'Transfer to Southwest, Hyatt, United, British Airways',
                    sub: 'Points move 1:1 to top airline and hotel programs — maximizes cruise rewards',
                  },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p
                        className="text-sm font-semibold text-slate-900"
                        dangerouslySetInnerHTML={{ __html: b.title }}
                      />
                      <p className="text-xs text-slate-500 mt-0.5">{b.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href={LINKS.chaseInk}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
              >
                Apply for Chase Ink Business Preferred{' '}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <p className="text-xs text-slate-400 mt-2">
                Opens Chase&rsquo;s referral page · Affiliate link
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CATEGORY 2 — BEST FOR POINTS & LUXURY PERKS
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="best-points-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="best-points-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Best for Points &amp; Luxury Perks
            </h2>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                  Premium Pick
                </span>
                <h3 className="font-fraunces text-2xl font-bold text-white mt-1">
                  Amex Business Platinum
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                  $895 / yr
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">150K–300K</p>
                  <p className="text-xs text-slate-400">≈ $1,500–$3,000+</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">On Flights</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">5x points</p>
                  <p className="text-xs text-slate-400">Booked direct</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Big Purchases</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">1.5x points</p>
                  <p className="text-xs text-slate-400">On $5,000+ charges</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Lounge Access</p>
                  <p className="font-fraunces font-bold text-emerald-600 text-lg">Centurion</p>
                  <p className="text-xs text-slate-400">Best lounges period</p>
                </div>
              </div>

              {/* Why This Card */}
              <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your Disney cruise is likely a $5,000–$15,000 charge. The Amex Business Platinum
                  earns 1.5x Membership Rewards on purchases over $5,000 — so your cruise fare
                  qualifies automatically. Pair that with automatic trip cancellation insurance worth
                  up to $10,000 per trip, Centurion Lounge access at MCO and your home airport, and
                  the massive signup bonus. High annual fee, but credits and perks make it nearly
                  break-even for frequent travelers.
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {[
                  {
                    title: 'Up to 150,000–300,000 Membership Rewards bonus',
                    sub: 'Offer varies by applicant — check your targeted offer before applying',
                  },
                  {
                    title: '1.5x points on purchases over $5,000',
                    sub: 'Your cruise fare almost certainly qualifies — big reward on big bookings',
                  },
                  {
                    title: 'Trip cancellation & interruption insurance',
                    sub: "Up to $10,000 per trip — skip Disney's expensive cruise insurance add-on",
                  },
                  {
                    title: 'Centurion Lounge + Priority Pass access',
                    sub: 'Best airport lounges in the US — free food, open bar, and showers at MCO',
                  },
                  {
                    title: '$200 airline fee credit + $189 CLEAR credit annually',
                    sub: 'Offsets a meaningful chunk of the annual fee automatically each year',
                  },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{b.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{b.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href={LINKS.amexBizPlat}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
              >
                Apply for Amex Business Platinum{' '}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <p className="text-xs text-slate-400 mt-2">
                Opens American Express&rsquo;s referral page · Affiliate link
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CATEGORY 3 — BEST FOR EVERYDAY SPENDING
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="best-cashback-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="best-cashback-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Best for Everyday Spending &amp; Cash Back
            </h2>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#990000] to-[#CC0000] px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  Cash Back Pick
                </span>
                <h3 className="font-fraunces text-2xl font-bold text-white mt-1">
                  Capital One Spark Cash Plus
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="bg-white text-[#990000] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                  $150 / yr
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Cash Bonus</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$2,000</p>
                  <p className="text-xs text-slate-400">After $30K spend</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Earn Rate</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">2% flat</p>
                  <p className="text-xs text-slate-400">No categories</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                  <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$150</p>
                  <p className="text-xs text-slate-400">Paid back fast</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Foreign Fees</p>
                  <p className="font-fraunces font-bold text-emerald-600 text-lg">None</p>
                  <p className="text-xs text-slate-400">Use in every port</p>
                </div>
              </div>

              {/* Why This Card */}
              <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Simplest card in the wallet: 2% cash back on every single purchase, no categories
                  to track, no annual cap. Use it for groceries, dining, gas, and Disney
                  merchandise. A family spending $3,000/month earns $720/year — enough for on-ship
                  credits, port excursions, or a deposit on next year&rsquo;s cruise. No foreign
                  transaction fees means it works in every port with zero extra charge.
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {[
                  {
                    title: '2% cash back on every purchase, unlimited',
                    sub: 'No categories, no caps — the simplest high-reward card you can carry',
                  },
                  {
                    title: '$2,000 cash bonus after $30,000 in first 3 months',
                    sub: 'High threshold — ideal if you have significant business expenses to front-load',
                  },
                  {
                    title: 'No foreign transaction fees',
                    sub: 'Use it in Nassau, Cozumel, St. Maarten, and every port without surcharges',
                  },
                  {
                    title: 'Annual fee refunded when you spend $150,000+',
                    sub: 'High-volume businesses effectively pay $0 in annual fees',
                  },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{b.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{b.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href={LINKS.capitalOneSpark}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
              >
                Apply for Capital One Spark Cash Plus{' '}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <p className="text-xs text-slate-400 mt-2">
                Opens Capital One&rsquo;s referral page · Affiliate link
              </p>
            </div>
          </div>
        </section>

        {/* ── How the Stack Works ── */}
        <section aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading" className="font-fraunces text-2xl font-bold text-slate-900 mb-6">
            How the 3-Card Stack Works Together
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  color: 'bg-[#D4AF37] text-[#1E3A5F]',
                  title: 'Book flights on Chase Ink — transfer points to Southwest or United',
                  desc: 'Chase Ultimate Rewards transfer 1:1 to Southwest Rapid Rewards. A 100K signup bonus = enough for 2–3 round trips to MCO. You effectively fly free to the cruise.',
                },
                {
                  step: 2,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Book the cruise on Amex Biz Plat — get free trip insurance',
                  desc: "Cruises over $5,000 earn 1.5x Membership Rewards automatically. Plus automatic trip cancellation up to $10,000 per trip — skip Disney's add-on insurance entirely.",
                },
                {
                  step: 3,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Use Capital One Spark for every other dollar',
                  desc: 'Groceries, dining, gas, school supplies, Disney merchandise — 2% back on all of it, no thinking required. Cash accumulates for on-ship credits or next year\'s deposit.',
                },
                {
                  step: 4,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Use Amex lounge access at MCO — start the vacation early',
                  desc: 'Centurion or Priority Pass lounges at Orlando International. Free food, open bar, and a quiet spot to wait — before you even board the ship.',
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div
                    className={`w-9 h-9 ${s.color} rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{s.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-[#1E3A5F] text-white rounded-xl">
              <p className="text-sm font-semibold text-[#D4AF37] mb-2">
                Bottom line for a typical Disney cruise family
              </p>
              <p className="text-sm text-blue-100 leading-relaxed">
                A family booking a $10,000 cruise, spending $1,500 on flights, and $2,000/month on
                everyday expenses can realistically earn <strong>$2,500–$4,000+ in travel value
                per year</strong> using this stack — enough to fund flights, cover a stateroom
                upgrade, or make a significant dent in next year&rsquo;s cruise fare.
              </p>
            </div>
          </div>
        </section>

        {/* ── Also Consider ── */}
        <section aria-labelledby="also-consider-heading">
          <h2 id="also-consider-heading" className="font-fraunces text-2xl font-bold text-slate-900 mb-2">
            Also Consider
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Strong cards we recommend — ask an advisor to find the right fit.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Chase Sapphire Preferred',
                fee: '$95 / yr',
                bonus: '60,000 pts ($750)',
                earn: '2x travel · 3x dining',
                why: 'Best starter travel card. Solid cruise protections, flexible Chase points, and the lowest fee in the Sapphire lineup.',
              },
              {
                name: 'Capital One Venture X',
                fee: '$395 / yr',
                bonus: '75,000 miles ($750)',
                earn: '2x on everything',
                why: 'Premium Capital One card with Priority Pass and a $300 travel credit that nearly covers the fee.',
              },
              {
                name: 'Chase Ink Business Unlimited',
                fee: '$0 / yr',
                bonus: '$750 cash back',
                earn: '1.5x on all purchases',
                why: 'Zero-fee workhorse. Pair with Ink Business Preferred to make all points transferable to airlines and hotels.',
              },
              {
                name: 'Amex Gold Card',
                fee: '$250 / yr',
                bonus: '60,000 pts ($720)',
                earn: '4x dining · 3x flights',
                why: 'Best for foodies. Port restaurant meals and excursion dining earn 4x Membership Rewards.',
              },
              {
                name: 'Capital One Spark Cash Select',
                fee: '$0 / yr',
                bonus: '$750 cash back',
                earn: '1.5x on all purchases',
                why: "Zero-fee Capital One option. Great if you're not ready for a fee card but want flat-rate cash back.",
              },
              {
                name: 'Citi Premier Card',
                fee: '$95 / yr',
                bonus: '60,000 pts ($600)',
                earn: '3x cruise · 3x dining',
                why: 'Underrated gem. 3x on cruise bookings at $95/year is exceptional value for a single-card strategy.',
              },
            ].map((card) => (
              <div
                key={card.name}
                className="border border-slate-200 rounded-xl p-5 flex flex-col"
              >
                <h3 className="font-fraunces text-base font-bold text-slate-900 mb-1">
                  {card.name}
                </h3>
                <div className="flex gap-2 text-xs text-slate-400 mb-3 flex-wrap">
                  <span>{card.fee}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.bonus}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-1">{card.earn}</p>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed flex-1">{card.why}</p>
                <Link
                  href={LINKS.concierge}
                  className="inline-flex items-center gap-1 text-[#1E3A5F] text-xs font-semibold hover:text-[#D4AF37] transition-colors"
                >
                  Ask an advisor{' '}
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Concierge CTA ── */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-4">
            Not sure which card is right for you?
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Our licensed Disney cruise advisors help you pick the right card strategy and pair it
            with the best sailings — completely free of charge.
          </p>
          <Link
            href={LINKS.concierge}
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors text-base"
          >
            Talk to a Disney Cruise Advisor{' '}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <p className="text-blue-300 text-xs mt-4">Free consultation · No obligation</p>
        </div>
      </section>

      {/* ── Full Disclaimer ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate-400 border-t border-slate-200 pt-6 leading-relaxed">
          <span className="font-semibold">Affiliate Disclosure &amp; Disclaimer:</span>{' '}
          GatGridCruises participates in affiliate programs and earns a commission when you are
          approved for a credit card through our referral links. This does not increase your cost
          in any way. Card details, signup bonuses, annual fees, and terms are subject to change
          and may differ from what is shown here — always verify current offers directly with the
          card issuer before applying. GatGridCruises does not provide financial, legal, or tax
          advice. Credit card approval is subject to issuer requirements. Rates and fees are
          accurate as of April 2026.
        </p>
      </div>
    </main>
  )
}
