import { Metadata } from 'next'
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
      </div>
    </div>
  )
}
