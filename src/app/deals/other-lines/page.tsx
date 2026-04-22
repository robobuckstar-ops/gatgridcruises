import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Other Cruise Lines — Compare Alternatives to Disney Cruise Line',
  description: 'Explore deals and guides for Royal Caribbean, Norwegian, Carnival, and other cruise lines. Find the best cruise for your family.',
}

export default function OtherLinesPage() {
  const lines = [
    {
      name: 'Royal Caribbean',
      description: 'Mega-ships with thrilling activities. Great for adventurous families and teens.',
      href: '/guides/disney-cruise-vs-royal-caribbean',
      color: 'bg-blue-600',
    },
    {
      name: 'Norwegian Cruise Line',
      description: "Freestyle dining and flexible itineraries. Strong value for adults and couples.",
      href: '#',
      color: 'bg-red-600',
    },
    {
      name: 'Carnival',
      description: "Budget-friendly fun with wide port selection. Best for spontaneous travelers.",
      href: '#',
      color: 'bg-orange-500',
    },
    {
      name: 'Celebrity Cruises',
      description: 'Premium experience with a modern, sophisticated feel. Great for adults.',
      href: '#',
      color: 'bg-indigo-600',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Other Cruise Lines
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Disney Cruise Line is exceptional — but not always the right fit. Here are the top alternatives worth considering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {lines.map((line) => (
            <Link
              key={line.name}
              href={line.href}
              className="group block border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div className={`h-3 ${line.color}`} />
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {line.name}
                </h2>
                <p className="text-slate-600">{line.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-slate-700">
            <span className="font-semibold">Comparing cruises?</span> Check out our{' '}
            <Link href="/guides/disney-cruise-vs-royal-caribbean" className="text-blue-600 hover:underline font-medium">
              Disney vs. Royal Caribbean guide
            </Link>{' '}
            or use the{' '}
            <Link href="/tools/cost-calculator" className="text-blue-600 hover:underline font-medium">
              cost calculator
            </Link>{' '}
            to see what fits your budget.
          </p>
        </div>
      </div>
    </div>
  )
}
