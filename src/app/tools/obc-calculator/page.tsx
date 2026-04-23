'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gift, ArrowRight, CheckCircle, DollarSign } from 'lucide-react'
import { OBC_TIERS, getOBC } from '@/lib/obc'
import { OBCDisclaimer } from '@/components/ui/obc-disclaimer'

const SPEND_IDEAS = [
  { emoji: '🧖', label: 'Spa treatments & massages' },
  { emoji: '🍽️', label: 'Specialty dining (Palo, Remy, Enchanted Garden)' },
  { emoji: '🏝️', label: 'Shore excursions & port adventures' },
  { emoji: '📸', label: 'Professional photo packages' },
  { emoji: '🛍️', label: 'Disney merchandise & souvenirs' },
  { emoji: '🍹', label: 'Beverages, cocktails & specialty drinks' },
  { emoji: '🎮', label: 'Arcade credits & family activities' },
  { emoji: '🌟', label: 'Character meet-and-greet experiences' },
]

export default function OBCCalculatorPage() {
  const [fare, setFare] = useState('')
  const numericFare = parseFloat(fare.replace(/[^0-9.]/g, '')) || 0
  const obc = numericFare > 0 ? getOBC(numericFare) : 0

  const activeTierIndex = numericFare > 0
    ? OBC_TIERS.findIndex(
        (t) => numericFare >= t.minFare && (t.maxFare === null || numericFare <= t.maxFare)
      )
    : -1

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <section className="bg-[#1E3A5F] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wide mb-5">
            <Gift className="w-3.5 h-3.5" aria-hidden="true" />
            Exclusive GatGrid Perk
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4">
            Free Onboard Credit Calculator
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Book through GatGrid Cruises and get free spending money to use onboard — the more you cruise, the more you earn.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Calculate Your OBC</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your estimated cruise fare (total, before taxes &amp; port fees)</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Fare Input */}
            <div>
              <label htmlFor="fare" className="block text-sm font-semibold text-slate-700 mb-2">
                Estimated Cruise Fare
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                <input
                  id="fare"
                  type="text"
                  inputMode="numeric"
                  value={fare}
                  onChange={(e) => setFare(e.target.value)}
                  placeholder="e.g. 4500"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent text-slate-900 text-lg font-semibold"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Total fare for all guests, before taxes and port fees</p>
            </div>

            {/* Result */}
            {numericFare > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border-2 border-slate-200 p-5 text-center">
                  <p className="text-sm font-semibold text-slate-500 mb-1">Book Direct with Disney</p>
                  <p className="font-fraunces text-4xl font-bold text-slate-400">$0</p>
                  <p className="text-xs text-slate-400 mt-1">No onboard credit</p>
                </div>
                <div className="rounded-xl border-2 border-[#D4AF37] bg-amber-50 p-5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#1E3A5F] text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Your Perk
                  </div>
                  <p className="text-sm font-semibold text-[#1E3A5F] mb-1">Book with GatGrid</p>
                  <p className="font-fraunces text-4xl font-bold text-[#1E3A5F]">${obc}</p>
                  <p className="text-xs text-amber-700 mt-1 font-semibold">Free onboard credit*</p>
                </div>
              </div>
            )}

            {numericFare === 0 && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-center text-slate-400">
                <Gift className="w-10 h-10 mx-auto mb-2 opacity-40" aria-hidden="true" />
                <p className="text-sm">Enter your fare above to see your free OBC amount</p>
              </div>
            )}
          </div>
        </div>

        {/* Tier Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50">
            <h2 className="font-fraunces text-xl font-bold text-slate-900">OBC Tiers at a Glance</h2>
            <p className="text-slate-500 text-sm mt-0.5">The more you cruise, the more free credit you earn</p>
          </div>
          <div className="divide-y divide-slate-100">
            {OBC_TIERS.map((tier, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-8 py-4 transition-colors ${
                  i === activeTierIndex
                    ? 'bg-amber-50 border-l-4 border-l-[#D4AF37]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {i === activeTierIndex ? (
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${i === activeTierIndex ? 'text-[#1E3A5F] font-semibold' : 'text-slate-700'}`}>
                    {tier.label}
                  </span>
                </div>
                <span className={`font-fraunces font-bold text-lg ${i === activeTierIndex ? 'text-[#1E3A5F]' : 'text-slate-900'}`}>
                  ${tier.obc} OBC
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What to spend it on */}
        <div className="bg-[#1E3A5F] rounded-2xl p-8">
          <h2 className="font-fraunces text-2xl font-bold text-white mb-2">What Can You Spend OBC On?</h2>
          <p className="text-blue-200 text-sm mb-6">Use your onboard credit on virtually anything charged to your stateroom folio</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SPEND_IDEAS.map((idea) => (
              <div key={idea.label} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <span className="text-xl" aria-hidden="true">{idea.emoji}</span>
                <span className="text-blue-100 text-sm">{idea.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#D4AF37] to-amber-400 rounded-2xl p-8 text-center">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-3">
            Ready to Claim Your Free Onboard Credit?
          </h2>
          <p className="text-[#1E3A5F]/80 mb-6 max-w-xl mx-auto">
            Book your Disney cruise through GatGrid Cruises and your OBC is automatically applied to your reservation — no codes, no hassle.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E3A5F] text-white font-bold text-lg hover:bg-[#162d4a] transition-colors shadow-lg"
          >
            Start My Free Booking Inquiry
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <p className="text-xs text-[#1E3A5F]/60 mt-4">Free, no-obligation quote. No booking pressure.</p>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200 pt-6">
          <OBCDisclaimer />
        </div>

      </div>
    </main>
  )
}
