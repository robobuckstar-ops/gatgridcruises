import { Metadata } from 'next'
import Link from 'next/link'
import { CreditCard, Plane, BedDouble, ArrowLeftRight, DollarSign, Bell, Bot } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disney Cruise Planning Tools — Calculators & Finders',
  description:
    'Free tools for planning a Disney cruise: OBC calculator, credit card optimizer, flight finder, stateroom picker, sailing comparison, and more.',
  openGraph: {
    title: 'Disney Cruise Planning Tools — Calculators & Finders',
    description:
      'Free tools for planning a Disney cruise: OBC calculator, credit card optimizer, flight finder, stateroom picker, and more.',
    url: 'https://gatgridcruises.com/tools',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disney Cruise Planning Tools — Calculators & Finders',
    description: 'Free tools for planning a Disney cruise: OBC calculator, credit card optimizer, flight finder, and more.',
    images: ['https://gatgridcruises.com/og-image.png'],
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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-16 md:py-20 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4">Disney Cruise Planning Tools</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Free calculators and finders to help you plan the perfect Disney cruise — from budgeting to booking.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </div>
    </main>
  )
}
