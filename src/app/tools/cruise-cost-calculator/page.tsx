import { Metadata } from 'next'
import Link from 'next/link'
import { CruiseCostCalculator } from './cruise-cost-calculator'

export const metadata: Metadata = {
  title: 'Disney Cruise Cost Calculator 2026 | GatGridCruises',
  description:
    'Estimate the cost of a Disney cruise by guests, stateroom type, cruise length, and ship. See total cost, cost per person, and cost per person per night.',
  openGraph: {
    title: 'Disney Cruise Cost Calculator 2026',
    description:
      'Quickly estimate Disney cruise prices by stateroom type, ship, length, and party size. Includes tips to save money.',
    type: 'website',
    url: 'https://gatgridcruises.com/tools/cruise-cost-calculator',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Cost Calculator 2026',
    description: 'Quickly estimate Disney cruise prices by stateroom type, ship, length, and party size. Includes tips to save money.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function CruiseCostCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-sm text-blue-300 font-medium mb-3">Tools</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Disney Cruise Cost Calculator
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Get a quick estimate based on ship, stateroom type, cruise length, and party size.
            Prices reflect typical Disney Cruise Line ranges as of 2026.
          </p>
        </div>
        <CruiseCostCalculator />

        {/* Ways to Reduce Your Cruise Costs */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Ways to Reduce Your Cruise Costs
          </h2>
          <p className="text-blue-200 text-sm mb-6">
            The right credit card strategy can offset hundreds — or thousands — of dollars on your Disney cruise.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">✈️</div>
              <p className="text-white font-semibold text-sm">Fly Free</p>
              <p className="text-blue-200 text-xs mt-1">Southwest Companion Pass flies your partner free for up to 2 years</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-white font-semibold text-sm">Skip Trip Insurance</p>
              <p className="text-blue-200 text-xs mt-1">Amex Biz Platinum includes trip cancellation — skip Disney&apos;s add-on</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-white font-semibold text-sm">Earn Signup Bonuses</p>
              <p className="text-blue-200 text-xs mt-1">Chase Sapphire Preferred 60K bonus is worth $750 toward travel</p>
            </div>
          </div>
          <Link
            href="/tools/credit-cards"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1E3A5F] font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
          >
            See the Full Credit Card Hack Strategy →
          </Link>
        </div>
      </div>
    </div>
  )
}
