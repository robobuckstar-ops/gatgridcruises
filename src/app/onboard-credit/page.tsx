import { Metadata } from 'next'
import Link from 'next/link'
import { Gift, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { OBC_TIERS } from '@/lib/obc'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'

export const metadata: Metadata = {
  title: 'Free Onboard Credit — GatGrid Cruises',
  description:
    'Book your Disney cruise through GatGrid Cruises and receive up to $1,000 in free onboard credit. Learn what OBC is, what you can spend it on, and how to qualify.',
  openGraph: {
    title: 'Free Onboard Credit — GatGrid Cruises',
    description: 'Book your Disney cruise through GatGrid Cruises and receive up to $1,000 in free onboard credit.',
    url: 'https://gatgridcruises.com/onboard-credit',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Onboard Credit — GatGrid Cruises',
    description: 'Book your Disney cruise through GatGrid Cruises and receive up to $1,000 in free onboard credit.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const WHAT_OBC_BUYS = [
  { emoji: '🧖', label: 'Spa & Fitness', desc: 'Massages, facials, hair salon, and fitness classes' },
  { emoji: '🍽️', label: 'Specialty Dining', desc: 'Palo, Remy, Enchanté, and other premium restaurants' },
  { emoji: '🏝️', label: 'Shore Excursions', desc: 'Disney-organized port adventures and tours' },
  { emoji: '📸', label: 'Photo Packages', desc: 'Professional onboard photography and prints' },
  { emoji: '🛍️', label: 'Merchandise', desc: 'Disney cruise apparel, gifts, and collectibles' },
  { emoji: '🍹', label: 'Beverages', desc: 'Cocktails, specialty drinks, and beverage packages' },
  { emoji: '🎮', label: 'Arcade & Activities', desc: 'Arcade credits, art classes, and onboard entertainment' },
  { emoji: '🌿', label: 'Castaway Cay', desc: 'Rentals, food & beverages at Disney\'s private island' },
]

const FAQ = [
  {
    q: 'When is OBC applied to my account?',
    a: 'OBC is applied to your onboard folio after final payment has been received — typically 90 to 120 days before your sailing date.',
  },
  {
    q: 'Can I get OBC as cash if I don\'t use it all?',
    a: 'No. Onboard credit has no cash value. Any unused OBC is forfeited at the end of the voyage, so plan to use every dollar.',
  },
  {
    q: 'Does OBC stack with Disney promotions?',
    a: 'OBC from GatGrid cannot be combined with other travel agent promotions. However, it can generally be used alongside Disney Cruise Line\'s own onboard offers.',
  },
  {
    q: 'What fare amount is used to calculate my OBC tier?',
    a: 'OBC is calculated based on the total cruise fare for all guests before taxes and port fees.',
  },
  {
    q: 'What if I transfer my booking away from Boardwalk Travel?',
    a: 'OBC is not available on bookings transferred away from Boardwalk Travel Agency. Your booking must remain with us through the end of the voyage.',
  },
  {
    q: 'Is there a minimum cruise length?',
    a: 'No minimum cruise length is required. OBC applies to any Disney Cruise Line voyage booked through GatGrid Cruises / Boardwalk Travel Agency.',
  },
]

export default function OnboardCreditPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wide mb-5">
            <Gift className="w-3.5 h-3.5" aria-hidden="true" />
            Exclusive GatGrid Perk
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-5">
            Get Up to $1,000 in Free Onboard Credit
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-8">
            When you book your Disney cruise through GatGrid Cruises, we pass a portion of our commission back to you as free spending money onboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools/obc-calculator"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] text-[#0a1628] font-bold text-base hover:bg-yellow-300 transition-colors shadow-lg"
            >
              <Gift className="w-5 h-5" aria-hidden="true" />
              Calculate My OBC
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-base hover:bg-white/20 transition-colors"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16">

        {/* What is OBC */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">What Is Onboard Credit?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Onboard credit (OBC) is free spending money loaded directly onto your Disney Cruise stateroom folio — think of it as a gift card you can use for nearly anything you purchase on the ship.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              When you plan your cruise through a travel agent partner like GatGrid Cruises (via Boardwalk Travel Agency), Disney Cruise Line pays the agency a commission. Rather than keeping all of it, we share a portion back with you as OBC. You get free money to spend onboard; the agency earns a modest commission. Everyone wins.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Unlike planning your cruise directly through Disney, where you receive $0 in OBC as a standard perk, planning through our concierge gives you instant value — no loyalty programs, no credit cards required.
            </p>
          </div>
        </section>

        {/* What you can spend it on */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-2">What Can You Spend OBC On?</h2>
          <p className="text-slate-500 mb-8">Almost anything charged to your stateroom folio, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHAT_OBC_BUYS.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-200 transition-colors">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OBC Tier Table */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-2">GatGrid OBC Tiers</h2>
          <p className="text-slate-500 mb-6">The more you cruise, the more free credit you earn. OBC is calculated on your total cruise fare before taxes and port fees.*</p>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-[#1E3A5F] px-6 py-4 grid grid-cols-2 gap-4">
              <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest">Total Cruise Fare</span>
              <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest text-right">Free OBC</span>
            </div>
            <div className="divide-y divide-slate-100">
              {OBC_TIERS.map((tier, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 px-6 py-4 items-center hover:bg-amber-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 font-medium text-sm">{tier.label}</span>
                  </div>
                  <span className="font-fraunces font-bold text-xl text-[#1E3A5F] text-right">${tier.obc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/tools/obc-calculator"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
            >
              Calculate exactly how much OBC you'd earn →
            </Link>
          </div>
        </section>

        {/* How to Qualify */}
        <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] rounded-2xl p-8">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">How to Qualify</h2>
          <div className="space-y-4">
            {[
              'Submit a booking inquiry through GatGrid Cruises (/book)',
              'Work with Dr. Grayson Starbuck, DPT at Boardwalk Travel Agency to finalize your cruise reservation',
              'Complete final payment for your cruise (typically 90 days before sailing)',
              'Your OBC is automatically applied to your onboard account — no code needed',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Book With GatGrid */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Why Book Through GatGrid?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: '💰',
                title: 'Free Onboard Credit',
                desc: 'Up to $1,000 in free spending money — automatically applied to your account.',
              },
              {
                icon: '🎯',
                title: 'Same Price as Disney',
                desc: 'Disney Cruise Line sets the price. You pay exactly the same whether you book direct or through us.',
              },
              {
                icon: '🤝',
                title: 'Personal Expert Service',
                desc: 'Grayson handles the paperwork, price drops, and re-fares so you don\'t have to.',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3 p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                <p className="font-fraunces font-bold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Common Questions</h2>
          <div className="space-y-5">
            {FAQ.map((item) => (
              <div key={item.q} className="flex items-start gap-4 pb-5 border-b border-slate-100 last:border-0">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.q}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#D4AF37] rounded-2xl p-8 text-center">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-3">
            Don't Leave Free Money on the Table
          </h2>
          <p className="text-[#1E3A5F]/80 mb-6 max-w-xl mx-auto">
            Every Disney cruise booked directly through Disney comes with $0 in OBC. Booking through GatGrid is free and gets you hundreds of dollars in spending money onboard.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-lg hover:bg-[#162d4a] transition-colors shadow-lg"
          >
            Get My Free Quote
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-6">
          <OBCDisclaimer />
        </div>

      </div>
      </div>
    </main>
  )
}
