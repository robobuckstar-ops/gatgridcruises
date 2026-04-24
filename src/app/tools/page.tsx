import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, CreditCard, Plane, Ship, ArrowRight, MapPin, BarChart3, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Tools — Free Planning Tools | GatGridCruises',
  description:
    'Free tools to plan your Disney cruise: cost calculator, OBC calculator, credit card comparison, flight finder, stateroom finder, transfer guide, sailing comparison, and price tracker.',
  openGraph: {
    title: 'Disney Cruise Planning Tools',
    description:
      'Free tools for planning a Disney cruise — cost estimator, OBC calculator, credit cards, flights, staterooms, and more.',
    url: 'https://gatgridcruises.com/tools',
  },
}

const tools = [
  {
    icon: Search,
    title: 'AI Cruise Finder',
    description: 'Tell us your dates, budget, and preferences. Our AI finds the best Disney cruise match for your family.',
    href: '/search',
    cta: 'Find My Cruise',
    highlight: true,
  },
  {
    icon: Calculator,
    title: 'Cost Calculator',
    description: 'Estimate the true cost of a Disney cruise by stateroom type, ship, duration, and party size.',
    href: '/tools/cruise-cost-calculator',
    cta: 'Calculate Cost',
  },
  {
    icon: Ship,
    title: 'OBC Calculator',
    description: 'See exactly how much free onboard credit you earn when booking through GatGrid Cruises.',
    href: '/tools/obc-calculator',
    cta: 'Calculate OBC',
  },
  {
    icon: CreditCard,
    title: 'Credit Card Comparison',
    description: 'Find the best credit cards for booking Disney cruises — maximize points, get trip insurance, earn rewards.',
    href: '/tools/credit-cards',
    cta: 'Compare Cards',
  },
  {
    icon: Plane,
    title: 'Flight Finder',
    description: 'Search for flights to your Disney cruise departure port. Tips for timing, airports, and booking.',
    href: '/tools/flights',
    cta: 'Find Flights',
  },
  {
    icon: Ship,
    title: 'Stateroom Finder',
    description: 'Compare Disney cruise stateroom categories with reviews, photos, and detailed specs by ship.',
    href: '/tools/staterooms',
    cta: 'Browse Staterooms',
  },
  {
    icon: MapPin,
    title: 'Transfer Guide',
    description: 'Ground transfer options from airports and hotels to Disney cruise ports — with pricing and booking tips.',
    href: '/tools/transfers',
    cta: 'View Transfers',
  },
  {
    icon: BarChart3,
    title: 'Compare Sailings',
    description: 'Side-by-side comparison of two Disney cruise sailings — price, itinerary, ship, and deal score.',
    href: '/tools/compare',
    cta: 'Compare Sailings',
  },
  {
    icon: BarChart3,
    title: 'Price Tracker',
    description: 'Track Disney cruise prices over time. See historical pricing and spot the best time to buy.',
    href: '/price-tracker',
    cta: 'Track Prices',
  },
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-blue-950 text-white py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Disney Cruise Planning Tools
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Free tools to help you plan, compare, and book the best Disney cruise for your family.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group p-6 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col ${
                  tool.highlight
                    ? 'border-[#D4AF37] bg-amber-50 hover:bg-amber-100'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl mb-4 ${
                  tool.highlight ? 'bg-[#D4AF37]/20' : 'bg-blue-50'
                }`}>
                  <Icon className={`h-5 w-5 ${tool.highlight ? 'text-[#D4AF37]' : 'text-blue-600'}`} />
                </div>
                <h2 className="font-semibold text-slate-900 mb-2">{tool.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{tool.description}</p>
                <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${
                  tool.highlight ? 'text-[#1E3A5F]' : 'text-blue-600'
                } group-hover:gap-2.5 transition-all`}>
                  {tool.cta}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
