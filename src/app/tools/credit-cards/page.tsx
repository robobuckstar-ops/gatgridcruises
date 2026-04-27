import { Metadata } from 'next'
import Link from 'next/link'
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  AlertCircle,
  TrendingUp,
  Gift,
  Package,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Disney Cruises 2026 | GatGrid Cruises',
  description:
    'The best credit cards for Disney cruise families — compare signup bonuses, points multipliers, lounge access, and trip insurance. Maximize every cruise dollar with our expert picks.',
  openGraph: {
    title: 'Best Credit Cards for Disney Cruises 2026',
    description:
      'Compare the best travel credit cards for Disney cruise families — honest reviews and a proven multi-card strategy.',
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
    description:
      'The card strategy that pays for flights, covers trip insurance, and earns points toward your next Disney cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const LINKS = {
  // Consumer cards — editorial recommendations, no affiliate relationship
  chaseSapphire: 'https://creditcards.chase.com/travel-credit-cards/sapphire/preferred',
  amexPlatinum: 'https://www.americanexpress.com/us/credit-cards/card/platinum/',
  capitalOneVenture: 'https://www.capitalone.com/credit-cards/venture/',

  // Business cards — referral / affiliate links
  chaseInk: 'https://creditcards.chase.com/business-credit-cards/ink/preferred', // referral link pending
  amexBizPlat:
    'https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS',
  capitalOneSpark: 'https://www.capitalone.com/small-business/credit-cards/spark-miles/', // referral link pending

  // Amazon affiliate (tag: thm1230b0300-20)
  amazonPacking: 'https://www.amazon.com/s?k=packing+cubes+travel+set&tag=thm1230b0300-20',
  amazonWallet: 'https://www.amazon.com/s?k=rfid+blocking+travel+wallet&tag=thm1230b0300-20',
  amazonPowerbank: 'https://www.amazon.com/s?k=portable+power+bank+20000mah&tag=thm1230b0300-20',
  amazonLuggage: 'https://www.amazon.com/s?k=carry+on+luggage+spinner&tag=thm1230b0300-20',

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
            Travel Rewards
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Best Credit Cards for<br />Disney Cruises
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mb-8">
            The right cards pay for your flights, cover your trip insurance, and earn points
            toward your next sailing — automatically. Here&rsquo;s exactly how to do it.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-blue-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Updated April 2026
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Honest editorial reviews
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              FTC-compliant disclosures
            </div>
          </div>
        </div>
      </section>

      {/* ── FTC / Affiliate Disclosure ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-amber-800">
              <span className="font-bold">Affiliate Disclosure:</span> This page contains affiliate
              links. GatGrid Cruises may earn a commission if you are approved for a card through
              our referral links — at no extra cost to you. Cards marked &ldquo;Editorial Pick&rdquo; have
              no affiliate relationship and are included based solely on merit. Card terms change
              frequently; verify current offers with the issuer before applying. Not financial advice.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* ── Strategy Intro ── */}
        <section aria-labelledby="strategy-heading">
          <div className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] rounded-2xl p-8 text-white">
            <h2 id="strategy-heading" className="font-fraunces text-2xl font-bold mb-3 text-[#D4AF37]">
              The Disney Cruise Family Strategy
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl text-sm leading-relaxed">
              A typical Disney cruise costs $5,000–$15,000 for a family of four. The right card
              combination can fund your flights, cover your trip insurance automatically, and earn
              back $1,500–$4,000+ in travel value every year — with no extra spending required.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { icon: '✈️', label: 'Free Flights', desc: 'Sign-up bonuses fund round trips to MCO' },
                { icon: '🛡️', label: 'Trip Insurance', desc: "Built-in cancellation coverage replaces Disney's add-on" },
                { icon: '🏖️', label: 'Airport Lounges', desc: 'Centurion and Priority Pass access before you sail' },
                { icon: '💰', label: 'Ongoing Rewards', desc: '2–5% back on cruise fare, flights, and daily spend' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-blue-200 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PART 1 — BEST CARDS FOR DISNEY CRUISE FAMILIES
        ══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#D4AF37] text-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 className="font-fraunces text-3xl font-bold text-slate-900">
              Best Cards for Disney Cruise Families
            </h2>
          </div>
          <p className="text-slate-500 ml-11 mb-10 text-sm">
            Consumer cards with the best combination of cruise rewards, trip protections, and everyday value.
          </p>

          <div className="space-y-10">

            {/* ── Chase Sapphire Preferred ── */}
            <section aria-labelledby="sapphire-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                      Best Overall · Editorial Pick
                    </span>
                    <h3 id="sapphire-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      Chase Sapphire Preferred
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $95 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">60,000 pts</p>
                      <p className="text-xs text-slate-400">≈ $750 value</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">On Travel</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">2x–5x pts</p>
                      <p className="text-xs text-slate-400">5x via Chase Travel</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$95</p>
                      <p className="text-xs text-slate-400">Easily justified</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Trip Insurance</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">✓ Yes</p>
                      <p className="text-xs text-slate-400">Up to $10,000</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The Chase Sapphire Preferred is the best starter travel card for Disney cruise families.
                      The 60,000-point signup bonus is worth $750 toward flights or hotels — or significantly
                      more when transferred to Southwest, United, Hyatt, or Marriott. Book your cruise fare
                      for 2x points and get automatic trip cancellation insurance up to $10,000 per trip with
                      no extra enrollment required.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      {
                        title: '60,000 points after $4,000 spend in first 3 months',
                        sub: 'Worth $750 in Chase Travel — or more when transferred to Southwest or Hyatt',
                      },
                      {
                        title: '5x on travel through Chase Travel · 3x on dining',
                        sub: 'Book flights to MCO or port hotels through Chase Travel for maximum earning',
                      },
                      {
                        title: '2x on all other travel purchases including cruise fare',
                        sub: 'Disney cruise charges, car rentals, and hotel stays all earn 2x',
                      },
                      {
                        title: 'Trip cancellation &amp; interruption insurance up to $10,000',
                        sub: 'Covered automatically when you pay for the trip with the card',
                      },
                      {
                        title: 'Transfer 1:1 to Southwest, United, Hyatt, Marriott &amp; more',
                        sub: 'Points often worth 1.5–2¢ each when redeemed through transfer partners',
                      },
                    ].map((b) => (
                      <li key={b.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                    href={LINKS.chaseSapphire}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                  >
                    View Chase Sapphire Preferred <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Opens Chase.com · Editorial recommendation — no affiliate relationship
                  </p>
                </div>
              </div>
            </section>

            {/* ── Amex Platinum ── */}
            <section aria-labelledby="amex-plat-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                      Best Premium · Editorial Pick
                    </span>
                    <h3 id="amex-plat-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      American Express Platinum
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $695 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">150,000 pts</p>
                      <p className="text-xs text-slate-400">≈ $1,500+ value</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">On Flights</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">5x points</p>
                      <p className="text-xs text-slate-400">Direct or Amex Travel</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$695</p>
                      <p className="text-xs text-slate-400">Credits offset it</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Lounge Access</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">Centurion</p>
                      <p className="text-xs text-slate-400">1,300+ airports</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      For families who fly to cruise ports, the Amex Platinum is unmatched on perks.
                      Centurion Lounge access at MCO (Orlando) means free food and an open bar before
                      you board — worth $100+ per trip for a family. The 150,000-point signup bonus
                      can fund flights, and $200 in annual airline credits plus hotel credits offset
                      most of the $695 fee.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      {
                        title: '150,000 Membership Rewards points after $8,000 spend in 6 months',
                        sub: 'Worth $1,500+ in travel — or more via transfers to Delta, British Airways, or Singapore',
                      },
                      {
                        title: '5x points on flights booked direct or through Amex Travel',
                        sub: 'Maximize on flights to MCO, Port Canaveral, Miami, or Galveston',
                      },
                      {
                        title: 'Centurion Lounge + Priority Pass access at 1,300+ airports',
                        sub: 'Free food, drinks, and a quiet space including at MCO before your cruise',
                      },
                      {
                        title: 'Trip cancellation &amp; interruption insurance up to $10,000',
                        sub: "Skip Disney's add-on cruise insurance — coverage is built in",
                      },
                      {
                        title: '$200 airline credit + $200 hotel credit annually',
                        sub: 'Nearly $400/year in automatic credits helps offset the annual fee',
                      },
                    ].map((b) => (
                      <li key={b.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                    href={LINKS.amexPlatinum}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                  >
                    View Amex Platinum <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Opens AmericanExpress.com · Editorial recommendation — no affiliate relationship
                  </p>
                </div>
              </div>
            </section>

            {/* ── Capital One Venture ── */}
            <section aria-labelledby="venture-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#8B1A2A] to-[#C41E3A] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                      Best Simple Miles · Editorial Pick
                    </span>
                    <h3 id="venture-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      Capital One Venture Rewards
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-white text-[#8B1A2A] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $95 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Miles Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">75,000 miles</p>
                      <p className="text-xs text-slate-400">≈ $750 value</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Earn Rate</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">2x miles</p>
                      <p className="text-xs text-slate-400">On everything</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$95</p>
                      <p className="text-xs text-slate-400">Pays for itself</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Foreign Fees</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">None</p>
                      <p className="text-xs text-slate-400">Use in every port</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      No category tracking, no rotating bonuses — just 2 miles per dollar on every
                      purchase. A family spending $3,000/month earns 72,000 miles/year, enough for a
                      round trip to a cruise port. Capital One&rsquo;s 15+ transfer partners include Air
                      Canada, Turkish Airlines, and Avianca — excellent options for Caribbean and
                      Bahamian routes on points.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      {
                        title: '75,000 miles after $4,000 spend in first 3 months',
                        sub: 'Worth $750 toward any travel purchase, or more via transfer partners',
                      },
                      {
                        title: '2x miles on every purchase with no categories',
                        sub: 'Groceries, Disney merchandise, school supplies — all earn the same flat rate',
                      },
                      {
                        title: '5x miles on hotels and rental cars through Capital One Travel',
                        sub: 'Maximize on port hotels the night before sailing',
                      },
                      {
                        title: 'Transfer to 15+ airline and hotel partners',
                        sub: 'Air Canada, Avianca, Turkish Airlines, Wyndham, and more',
                      },
                      {
                        title: 'No foreign transaction fees',
                        sub: 'Use in Nassau, Cozumel, St. Maarten, and every port with zero surcharges',
                      },
                    ].map((b) => (
                      <li key={b.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{b.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{b.sub}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={LINKS.capitalOneVenture}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                  >
                    View Capital One Venture <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Opens CapitalOne.com · Editorial recommendation — no affiliate relationship
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — HOW TO MAXIMIZE POINTS
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="maximize-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#D4AF37] text-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="maximize-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              How to Maximize Points on Disney Cruise Bookings
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-2xl p-8">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  color: 'bg-[#D4AF37] text-[#1E3A5F]',
                  title: 'Put cruise fare on the card with the best large-purchase rate',
                  desc: "Disney cruise fares hit $5,000–$15,000. Amex Business Platinum earns 1.5x on charges over $5,000 automatically — that's a cruise-specific advantage no other card matches. Otherwise, use your highest flat-rate card (Venture or Spark Miles at 2x on everything).",
                },
                {
                  step: 2,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Transfer Chase or Amex points to airline partners for flights',
                  desc: 'Chase Ultimate Rewards transfer 1:1 to Southwest Rapid Rewards. A 60,000-point Sapphire bonus can fund 2 round trips to MCO. Amex Membership Rewards transfer to Delta, British Airways, and Singapore Airlines for premium cabin redemptions.',
                },
                {
                  step: 3,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Book port hotels through Chase Travel or Capital One Travel for 5x',
                  desc: 'Staying near Port Canaveral or Miami the night before sailing? Chase Sapphire earns 5x on Chase Travel; Capital One Venture earns 5x on Capital One Travel. One hotel night through the right portal adds meaningful points.',
                },
                {
                  step: 4,
                  color: 'bg-[#1E3A5F] text-white',
                  title: 'Use miles to erase travel charges with Capital One Venture',
                  desc: 'Venture miles can be applied as a statement credit against any travel purchase at 1¢/mile — including Disney cruise fare. No blackout dates, no transfer required. Buy the cruise, then offset with accumulated miles.',
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
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — SIGN-UP BONUS STRATEGIES
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="bonus-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="bonus-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Sign-Up Bonus Strategies for Cruise Families
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '📅',
                title: 'Time your application 3–6 months before booking',
                body: "Apply when you're 3–6 months from booking a cruise. The minimum spend deadline (typically 3 months) aligns perfectly with a large cruise deposit. You meet the spend naturally without changing your habits.",
              },
              {
                icon: '💳',
                title: 'Use cruise fare to meet minimum spend in one shot',
                body: 'A $5,000–$15,000 cruise charge nearly always satisfies the entire signup spend requirement in one transaction. This is the most efficient path to a bonus with zero lifestyle changes.',
              },
              {
                icon: '⚠️',
                title: "Don't apply for multiple cards at once",
                body: 'Each application is a hard credit inquiry. Space applications 3–6 months apart. Chase has a "5/24" rule — applications are denied if you\'ve opened 5+ credit cards in the past 24 months from any issuer.',
              },
              {
                icon: '🎯',
                title: 'Check for targeted elevated offers before applying',
                body: 'Amex sometimes offers 150,000–300,000 points to targeted applicants vs the public 150K offer. Check CardMatch.com or try an incognito browser — you may have a higher targeted offer available.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-xl p-6">
                <div className="text-2xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-fraunces text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — BEST EARN RATES COMPARISON
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="earn-rates-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="earn-rates-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Best Earn Rates on Travel Purchases
            </h2>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1E3A5F] text-white">
                    <th className="text-left px-5 py-4 font-semibold">Card</th>
                    <th className="text-center px-3 py-4 font-semibold">Cruise Fare</th>
                    <th className="text-center px-3 py-4 font-semibold">Flights</th>
                    <th className="text-center px-3 py-4 font-semibold">Hotels</th>
                    <th className="text-center px-3 py-4 font-semibold">Dining</th>
                    <th className="text-center px-3 py-4 font-semibold">Everything Else</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      card: 'Chase Sapphire Preferred',
                      cruise: '2x',
                      flights: '5x*',
                      hotels: '5x*',
                      dining: '3x',
                      other: '1x',
                      affiliate: false,
                    },
                    {
                      card: 'Amex Platinum',
                      cruise: '1x',
                      flights: '5x',
                      hotels: '5x*',
                      dining: '1x',
                      other: '1x',
                      affiliate: false,
                    },
                    {
                      card: 'Capital One Venture',
                      cruise: '2x',
                      flights: '5x*',
                      hotels: '5x*',
                      dining: '2x',
                      other: '2x',
                      affiliate: false,
                    },
                    {
                      card: 'Chase Ink Biz Preferred',
                      cruise: '1x',
                      flights: '3x',
                      hotels: '3x',
                      dining: '1x',
                      other: '1x',
                      affiliate: true,
                    },
                    {
                      card: 'Amex Biz Platinum',
                      cruise: '1.5x†',
                      flights: '5x',
                      hotels: '5x*',
                      dining: '1x',
                      other: '1x',
                      affiliate: true,
                    },
                    {
                      card: 'Capital One Spark Miles',
                      cruise: '2x',
                      flights: '5x*',
                      hotels: '5x*',
                      dining: '2x',
                      other: '2x',
                      affiliate: true,
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.card}
                      className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${row.affiliate ? 'border-l-4 border-l-[#D4AF37]' : ''}`}
                    >
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {row.card}
                        {row.affiliate && (
                          <span className="ml-2 text-xs bg-[#D4AF37]/20 text-[#1E3A5F] px-2 py-0.5 rounded font-semibold">
                            Affiliate
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-center font-semibold text-[#1E3A5F]">{row.cruise}</td>
                      <td className="px-3 py-4 text-center font-semibold text-[#1E3A5F]">{row.flights}</td>
                      <td className="px-3 py-4 text-center font-semibold text-[#1E3A5F]">{row.hotels}</td>
                      <td className="px-3 py-4 text-center font-semibold text-[#1E3A5F]">{row.dining}</td>
                      <td className="px-3 py-4 text-center font-semibold text-[#1E3A5F]">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                * Through issuer&rsquo;s own travel portal only &middot; † On individual charges over $5,000 &middot; Rates subject to change; verify with issuer before applying.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PART 2 — BUSINESS CARD POWER STACK
        ══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 className="font-fraunces text-3xl font-bold text-slate-900">
              Business Owner Power Stack
            </h2>
          </div>
          <p className="text-slate-500 ml-11 mb-10 text-sm">
            If you have a business — even a side business or freelance income — these cards offer higher limits,
            better bonuses, and stronger cruise-specific perks. GatGrid Cruises has affiliate relationships with
            all three.
          </p>

          <div className="space-y-8">

            {/* Chase Ink Business Preferred */}
            <section aria-labelledby="ink-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                      Best Business Card · Affiliate
                    </span>
                    <h3 id="ink-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      Chase Ink Business Preferred
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $95 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">100,000 pts</p>
                      <p className="text-xs text-slate-400">≈ $1,250+ value</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">On Travel</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">3x points</p>
                      <p className="text-xs text-slate-400">Travel &amp; shipping</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$95</p>
                      <p className="text-xs text-slate-400">Pays for itself fast</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Trip Insurance</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">✓ Yes</p>
                      <p className="text-xs text-slate-400">Up to $5,000</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Why This Card?</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The Ink Business Preferred is the single best business card for Disney cruise families at
                      $95/year. The 100,000-point bonus is worth $1,250 minimum — redeemable as cash, flights,
                      or hotel stays. Earns 3x on travel, internet, phone, and shipping. Chase Ultimate Rewards
                      transfer 1:1 to Southwest, Hyatt, United, and British Airways.
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      '100,000 points after $15,000 spend in 3 months — worth $1,250+ in travel',
                      '3x on travel, shipping, internet, cable, and phone services',
                      'Trip cancellation &amp; interruption insurance up to $5,000 per trip',
                      'Cell phone protection up to $1,000 when you pay your monthly bill on the card',
                      'Transfer 1:1 to Southwest, United, Hyatt, and British Airways',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p
                          className="text-sm text-slate-700"
                          dangerouslySetInnerHTML={{ __html: b }}
                        />
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
                    Opens Chase.com · Affiliate link — referral link pending
                  </p>
                </div>
              </div>
            </section>

            {/* Amex Business Platinum */}
            <section aria-labelledby="amex-biz-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                      Premium Business · Affiliate
                    </span>
                    <h3 id="amex-biz-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      Amex Business Platinum
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $895 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Signup Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">150K–300K</p>
                      <p className="text-xs text-slate-400">≈ $1,500–$3,000+</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Big Purchases</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">1.5x pts</p>
                      <p className="text-xs text-slate-400">On $5,000+ charges</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$895</p>
                      <p className="text-xs text-slate-400">Credits offset it</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Lounge Access</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">Centurion</p>
                      <p className="text-xs text-slate-400">Best lounges period</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
                    <p className="text-sm font-semibold text-slate-900 mb-1">Cruise-Specific Advantage</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Disney cruise fares over $5,000 automatically earn 1.5x Membership Rewards — no
                      enrollment required. Combined with trip cancellation insurance up to $10,000 per trip,
                      you can skip Disney&rsquo;s costly add-on insurance entirely. The massive signup bonus
                      often offsets the annual fee for multiple years.
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      '150,000–300,000 Membership Rewards signup bonus — check your targeted offer',
                      '1.5x points on all purchases over $5,000 — cruise fare qualifies automatically',
                      'Trip cancellation &amp; interruption insurance up to $10,000 per trip',
                      'Centurion Lounge + Priority Pass at 1,300+ airports including MCO',
                      '$200 airline fee credit + $189 CLEAR credit annually',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p
                          className="text-sm text-slate-700"
                          dangerouslySetInnerHTML={{ __html: b }}
                        />
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={LINKS.amexBizPlat}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                  >
                    Apply via Crystal&rsquo;s Referral Link{' '}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Opens AmericanExpress.com · Affiliate link via Crystal&rsquo;s referral code
                  </p>
                </div>
              </div>
            </section>

            {/* Capital One Spark Miles */}
            <section aria-labelledby="spark-heading">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#8B1A2A] to-[#C41E3A] px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                      Business Miles · Affiliate
                    </span>
                    <h3 id="spark-heading" className="font-fraunces text-2xl font-bold text-white mt-1">
                      Capital One Spark Miles
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex bg-white text-[#8B1A2A] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
                    $95 / yr
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Miles Bonus</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">50,000 miles</p>
                      <p className="text-xs text-slate-400">≈ $500 value</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Earn Rate</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">2x miles</p>
                      <p className="text-xs text-slate-400">On everything</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Annual Fee</p>
                      <p className="font-fraunces font-bold text-[#1E3A5F] text-lg">$95</p>
                      <p className="text-xs text-slate-400">Waived year 1</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Foreign Fees</p>
                      <p className="font-fraunces font-bold text-emerald-600 text-lg">None</p>
                      <p className="text-xs text-slate-400">Use in every port</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {[
                      '50,000 miles after $4,500 spend in 3 months — worth $500 toward travel',
                      '2x miles on every business purchase with no categories to track',
                      "Transfer to Capital One's 15+ airline and hotel partners",
                      'No foreign transaction fees — ideal for port excursion purchases',
                      'Annual fee waived in the first year',
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-slate-700">{b}</p>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={LINKS.capitalOneSpark}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors text-sm"
                  >
                    Apply for Capital One Spark Miles{' '}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="text-xs text-slate-400 mt-2">
                    Opens CapitalOne.com · Affiliate link — referral link pending
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — AMAZON TRAVEL ESSENTIALS
        ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="amazon-heading">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#D4AF37] text-[#1E3A5F] rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="amazon-heading" className="font-fraunces text-2xl font-bold text-slate-900">
              Use Your Rewards on Cruise Essentials
            </h2>
          </div>
          <p className="text-slate-500 mb-6 text-sm max-w-2xl">
            Put your cash back and travel credits to work before you sail. These are the essentials
            families actually use on Disney cruises — all searchable on Amazon with our affiliate link.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                emoji: '🧳',
                title: 'Packing Cubes',
                desc: 'Keep four family members organized in a shared stateroom. Compression cubes maximize every cubic inch of cruise luggage.',
                href: LINKS.amazonPacking,
              },
              {
                emoji: '👛',
                title: 'RFID Travel Wallet',
                desc: 'Protect credit cards and passports in foreign ports. Essential for Nassau, Cozumel, St. Maarten, and other Disney cruise stops.',
                href: LINKS.amazonWallet,
              },
              {
                emoji: '🔋',
                title: 'Portable Power Bank',
                desc: 'Keep phones charged during port excursions. Disney ships have limited outlets — an external battery is a must for families.',
                href: LINKS.amazonPowerbank,
              },
              {
                emoji: '🎒',
                title: 'Carry-On Luggage',
                desc: 'Save on checked bag fees with the right size spinner. Use your cash-back rewards to upgrade before this year\'s cruise.',
                href: LINKS.amazonLuggage,
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group border border-slate-200 rounded-xl p-5 hover:border-[#D4AF37] hover:shadow-md transition-all flex flex-col"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{item.emoji}</div>
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-[#1E3A5F]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#1E3A5F] text-xs font-semibold group-hover:text-[#D4AF37] transition-colors">
                  Shop on Amazon <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
                <p className="text-xs text-slate-300 mt-1">Affiliate link</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Also Consider ── */}
        <section aria-labelledby="also-consider-heading">
          <h2 id="also-consider-heading" className="font-fraunces text-2xl font-bold text-slate-900 mb-2">
            Also Consider
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Strong alternatives — ask an advisor to find the right fit for your situation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Chase Sapphire Reserve',
                fee: '$550 / yr',
                bonus: '75,000 pts ($1,125)',
                earn: '3x travel · 10x Chase Travel',
                why: 'Premium Chase card with $300 annual travel credit, Priority Pass lounge access, and superior trip protections. Best if you travel 4+ times per year.',
              },
              {
                name: 'Capital One Venture X',
                fee: '$395 / yr',
                bonus: '75,000 miles ($750)',
                earn: '2x everything · 10x portal',
                why: '$300 annual travel credit nearly offsets the fee. Priority Pass + Capital One lounge access. Excellent value premium card.',
              },
              {
                name: 'Chase Ink Business Unlimited',
                fee: '$0 / yr',
                bonus: '$900 cash back',
                earn: '1.5x on all purchases',
                why: 'Zero-fee workhorse. Pair with Ink Business Preferred to pool points and unlock airline/hotel transfers at no added cost.',
              },
              {
                name: 'Amex Gold Card',
                fee: '$250 / yr',
                bonus: '60,000 pts ($720)',
                earn: '4x dining · 3x grocery',
                why: 'Best for foodies. Earn 4x at port restaurants and excursion dining. Pairs perfectly with Amex Platinum for a full Membership Rewards stack.',
              },
              {
                name: 'Citi Strata Premier',
                fee: '$95 / yr',
                bonus: '70,000 pts ($700)',
                earn: '3x travel · dining · grocery',
                why: 'Underrated gem. 3x on almost everything, 1:1 transfers to Turkish Airlines Miles & Smiles — a hidden gem for Caribbean award redemptions.',
              },
              {
                name: 'Barclays Aviator Red',
                fee: '$99 / yr',
                bonus: '60,000 AA miles',
                earn: '2x on American purchases',
                why: 'Best American Airlines miles card. Single purchase earns the bonus — easiest signup bonus in the market for AA flyers.',
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
                  Ask an advisor <ArrowRight className="w-3 h-3" aria-hidden="true" />
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
            Our Disney cruise specialists help you build the right card strategy and pair it
            with the best sailings — completely free of charge.
          </p>
          <Link
            href={LINKS.concierge}
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors text-base"
          >
            Talk to a Disney Cruise Specialist{' '}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <p className="text-blue-300 text-xs mt-4">Free consultation · No obligation</p>
        </div>
      </section>

      {/* ── Full Disclaimer ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate-400 border-t border-slate-200 pt-6 leading-relaxed">
          <span className="font-semibold">Affiliate Disclosure &amp; Disclaimer:</span>{' '}
          GatGrid Cruises participates in affiliate programs and may earn a commission when you are
          approved for a credit card through our referral links. Editorial picks (Chase Sapphire
          Preferred, American Express Platinum, Capital One Venture) have no affiliate relationship
          and are included based solely on merit. Amazon links use affiliate tag thm1230b0300-20.
          This does not increase your cost in any way. Card details, signup bonuses, annual fees,
          and terms are subject to change — always verify current offers directly with the card
          issuer before applying. GatGrid Cruises does not provide financial, legal, or tax advice.
          Credit card approval is subject to issuer requirements. Rates and fees are accurate as
          of April 2026.
        </p>
      </div>

    </main>
  )
}
