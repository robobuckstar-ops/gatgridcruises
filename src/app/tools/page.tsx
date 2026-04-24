import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, CreditCard, Plane, BedDouble, ArrowLeftRight, DollarSign, Bell, Bot } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Planning Tools — Calculators & Finders',
  description:
    'Free tools for planning a Disney cruise: OBC calculator, cost estimator, credit card optimizer, flight finder, stateroom picker, sailing comparison, and more.',
  openGraph: {
    title: 'Disney Cruise Planning Tools — Calculators & Finders',
    description:
      'Free tools for planning a Disney cruise: OBC calculator, cost estimator, credit card optimizer, flight finder, stateroom picker, and more.',
    url: 'https://gatgridcruises.com/tools',
  },
}

const tools = [
  {
    href: '/tools/obc-calculator',
    icon: DollarSign,
    title: 'OBC Calculator',
    description: 'Find out exactly how much onboard credit you qualify for based on your booking fare.',
    cta: 'Calculate OBC',
  },
  {
    href: '/tools/cost-calculator',
    icon: Calculator,
    title: 'Cost Calculator',
    description: 'Get a full estimate of your Disney cruise total cost — fare, gratuities, excursions, drinks, and more.',
    cta: 'Estimate Cost',
  },
  {
    href: '/tools/credit-cards',
    icon: CreditCard,
    title: 'Credit Card Optimizer',
    description: 'See which credit cards maximize rewards on Disney cruise bookings and onboard spending.',
    cta: 'Compare Cards',
  },
  {
    href: '/tools/flights',
    icon: Plane,
    title: 'Flight Finder',
    description: 'Find the best flights to Port Canaveral, Miami, and other Disney cruise departure ports.',
    cta: 'Find Flights',
  },
  {
    href: '/tools/staterooms',
    icon: BedDouble,
    title: 'Stateroom Finder',
    description: 'Browse and filter staterooms across the Disney fleet. Read real reviews and find the right cabin.',
    cta: 'Find Staterooms',
  },
  {
    href: '/tools/transfers',
    icon: ArrowLeftRight,
    title: 'Transfer Guide',
    description: 'Compare transfer options from airports and hotels to Disney cruise terminals.',
    cta: 'Compare Transfers',
  },
  {
    href: '/tools/compare',
    icon: ArrowLeftRight,
    title: 'Compare Sailings',
    description: 'Side-by-side comparison of Disney cruises by itinerary, ship, price, and duration.',
    cta: 'Compare Sailings',
  },
  {
    href: '/search',
    icon: Bot,
    title: 'AI Cruise Finder',
    description: 'Describe your ideal Disney cruise and our AI assistant will find the best matching sailings.',
    cta: 'Start Searching',
  },
  {
    href: '/price-tracker',
    icon: Bell,
    title: 'Price Tracker',
    description: "Track Disney cruise prices and get notified when fares drop on sailings you're watching.",
    cta: 'Track Prices',
  },
]

export default function ToolsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">Disney Cruise Planning Tools</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Free calculators and finders to help you plan the perfect Disney cruise — from budgeting to booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col gap-3 p-5 rounded-xl border border-slate-200 bg-white hover:border-navy hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-navy/10 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-navy" />
                </div>
                <h2 className="font-semibold text-slate-900 group-hover:text-navy transition-colors duration-200">
                  {tool.title}
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">{tool.description}</p>
              <span className="text-sm font-medium text-navy group-hover:underline">{tool.cta} →</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
