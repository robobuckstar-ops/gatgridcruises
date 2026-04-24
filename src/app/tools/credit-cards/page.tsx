import { Metadata } from 'next'
import Link from 'next/link'
import { CreditCard, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Disney Cruises — The Disney Cruise Wallet | GatGridCruises',
  description:
    'The best credit card strategy for Disney cruises. Use Amex Business Platinum, Southwest, and Capital One to fly free, get trip insurance, and earn points toward your next cruise.',
}

export default function CreditCardsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F]/5 to-white py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#8B6914] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CreditCard className="w-4 h-4" aria-hidden="true" />
            Travel Hack
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            The Disney Cruise Wallet
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The 3-card strategy that pays for your flights, covers your trip insurance, and earns
            points toward your next cruise — automatically.
          </p>
        </div>
      </section>

      {/* Strategy Overview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-8 mb-12">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">
            The Strategy at a Glance
          </h2>
          <p className="text-slate-600 mb-6">
            Most families overpay for Disney cruises because they leave thousands of dollars in
            credit card value on the table. The Disney Cruise Wallet uses three cards in specific
            roles to maximize every dollar you spend.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-2xl mb-2">✈️</div>
              <p className="font-semibold text-slate-900 text-sm">Fly Free</p>
              <p className="text-slate-600 text-xs mt-1">
                Southwest Companion Pass flies your partner free all year
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="font-semibold text-slate-900 text-sm">Free Insurance</p>
              <p className="text-xs text-slate-600 mt-1">
                Amex Biz Plat covers trip cancellation, delays, and baggage
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="text-2xl mb-2">💰</div>
              <p className="font-semibold text-slate-900 text-sm">Earn Points</p>
              <p className="text-xs text-slate-600 mt-1">
                Stack Membership Rewards toward future cruise upgrades
              </p>
            </div>
          </div>
        </div>

        {/* Card 1: Amex Biz Plat */}
        <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wide">
                  Card #1 — Cruise Booking
                </span>
                <h2 className="font-fraunces text-xl font-bold text-white mt-1">
                  Amex Business Platinum
                </h2>
              </div>
              <div className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-1.5 rounded-lg">
                Best for booking
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 mb-4">
              Put your entire cruise fare on the Amex Business Platinum. You'll earn 1.5x
              Membership Rewards on purchases over $5,000 — which your cruise almost certainly
              qualifies for — plus get automatic trip cancellation insurance worth hundreds.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    150,000+ Membership Rewards signup bonus
                  </p>
                  <p className="text-xs text-slate-500">Worth $1,500–$3,000+ in travel value</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    Trip cancellation &amp; interruption insurance
                  </p>
                  <p className="text-xs text-slate-500">
                    Up to $10,000 per trip — skip buying Disney's cruise insurance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    Global Lounge Collection access
                  </p>
                  <p className="text-xs text-slate-500">
                    Centurion, Delta SkyClub, Priority Pass — free lounge access at MCO and your
                    home airport
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    $200 airline fee credit annually
                  </p>
                  <p className="text-xs text-slate-500">Offset baggage fees and flight extras</p>
                </div>
              </div>
            </div>
            <a
              href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Apply for Amex Business Platinum <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-slate-400 mt-2">
              Affiliate link — we may earn a commission at no cost to you.
            </p>
          </div>
        </div>

        {/* Card 2: Southwest */}
        <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wide">
                  Card #2 — Flights
                </span>
                <h2 className="font-fraunces text-xl font-bold text-white mt-1">
                  Chase Southwest Card
                </h2>
              </div>
              <div className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-1.5 rounded-lg">
                Best for flights
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 mb-4">
              Southwest is the best airline for Disney cruise families — free checked bags, no
              change fees, and the Companion Pass flies your partner free for up to two years. Hit
              the signup bonus and you're halfway to unlocking it.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    2 free checked bags per passenger
                  </p>
                  <p className="text-xs text-slate-500">Save $30–$60 per flight for a family</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    Companion Pass — fly 2 for the price of 1
                  </p>
                  <p className="text-xs text-slate-500">
                    Earn 135,000 points in a calendar year to unlock for the rest of that year +
                    all of next year
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    No change or cancellation fees
                  </p>
                  <p className="text-xs text-slate-500">Perfect when cruise dates shift</p>
                </div>
              </div>
            </div>
            <a
              href="https://www.referyourchasecard.com/226m/6ZT33F9TOQ"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#2a4f7a] transition-colors"
            >
              Apply for Southwest Card <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-slate-400 mt-2">
              Affiliate link — we may earn a commission at no cost to you.
            </p>
          </div>
        </div>

        {/* Card 3: Capital One Spark */}
        <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wide">
                  Card #3 — Everyday Spending
                </span>
                <h2 className="font-fraunces text-xl font-bold text-white mt-1">
                  Capital One Spark
                </h2>
              </div>
              <div className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-1.5 rounded-lg">
                Best for spending
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-600 mb-4">
              Use Capital One Spark for everyday purchases — groceries, gas, dining — to earn 2%
              cash back on everything. Simple, reliable, and pairs perfectly with the other two
              cards in the wallet.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    2% cash back on every purchase, unlimited
                  </p>
                  <p className="text-xs text-slate-500">No categories, no caps, no thinking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">$500 signup bonus</p>
                  <p className="text-xs text-slate-500">
                    After spending $4,500 in first 3 months
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    No foreign transaction fees
                  </p>
                  <p className="text-xs text-slate-500">
                    Use it in any port without extra charges
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://i.capitalone.com/JKlfRwN3f"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#2a4f7a] transition-colors"
            >
              Apply for Capital One Spark <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-slate-400 mt-2">
              Affiliate link — we may earn a commission at no cost to you.
            </p>
          </div>
        </div>

        {/* Full Strategy Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">
            How It All Works Together
          </h2>
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#D4AF37] text-[#1E3A5F] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Book your cruise on Amex Biz Plat</p>
                <p className="text-sm text-slate-600">
                  Earn 1.5x points on large purchases + get automatic trip cancellation insurance.
                  No need to buy Disney's add-on insurance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Book flights on Southwest — bags fly free
                </p>
                <p className="text-sm text-slate-600">
                  Use Southwest points or Rapid Rewards for flights to MCO. Earn toward Companion
                  Pass so your partner flies free next year.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Use Capital One Spark for everything else
                </p>
                <p className="text-sm text-slate-600">
                  Groceries, dining, gas — 2% back on all of it. Accumulate cash to offset
                  on-ship spending.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-900 mb-1">💡 The bottom line</p>
            <p className="text-sm text-slate-600">
              A family spending $8,000 on a Disney cruise, $1,200 on flights, and $500/month on
              everyday expenses can realistically earn $2,000–$3,000+ in travel value per year
              using this strategy — enough to significantly offset the cost of cruising.
            </p>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-[#1E3A5F] py-12 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-2xl font-bold text-white mb-3">
            Ready to Book Your Disney Cruise?
          </h2>
          <p className="text-slate-300 mb-6">
            Get a free quote from our licensed travel advisors — they know how to stack these
            perks for maximum value.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-slate-400 border-t border-slate-200 pt-6">
          Affiliate disclosure: Some links on this page are referral links. We may earn a
          commission if you apply and are approved for a card. This does not affect our
          recommendations — we only feature cards we genuinely use or recommend for Disney cruise
          planning. Card offers and terms change frequently; always verify current offers before
          applying.
        </p>
      </div>
    </main>
  )
}
