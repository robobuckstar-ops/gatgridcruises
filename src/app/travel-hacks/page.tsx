import { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  Plane,
  Shield,
  CreditCard,
  Layers,
  DoorOpen,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getBestCardsFor, creditCards } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'Travel Hacks: Make Your Disney Cruise Cheaper (or Free)',
  description:
    'Insider strategies for using credit card rewards, points, and perks to dramatically reduce your cruise vacation costs. Learn how to fly free, get trip insurance, and stack points for free cruises.',
  keywords: [
    'credit card rewards',
    'cruise rewards',
    'free flights',
    'trip insurance',
    'travel hacks',
    'disney cruise deals',
    'credit card strategy',
  ],
}

const strategies = [
  {
    id: 'fly-free',
    title: 'How to Fly Free to Your Cruise Port',
    description: 'Turn credit card signup bonuses into free flights worth $500-750.',
    icon: Plane,
    savings: 'Save up to $1,500',
    readTime: '5 min',
    href: '/travel-hacks/fly-free-to-cruise-port',
  },
  {
    id: 'trip-insurance',
    title: 'Free Trip Insurance You Already Have',
    description: 'Most premium credit cards cover trip cancellation, delays, and more.',
    icon: Shield,
    savings: 'Save up to $300',
    readTime: '4 min',
    href: '/travel-hacks/free-trip-insurance',
  },
  {
    id: 'best-cards',
    title: 'Best Credit Cards for Cruise Purchases',
    description: 'Maximize points on your cruise fare and onboard spending.',
    icon: CreditCard,
    savings: 'Save up to $400',
    readTime: '5 min',
    href: '/travel-hacks/best-cards-for-cruises',
  },
  {
    id: 'stack-points',
    title: 'How to Stack Points for a Free Cruise',
    description: 'Use multiple cards to earn 200K+ points and cover your entire cruise.',
    icon: Layers,
    savings: 'Save up to $6,000',
    readTime: '6 min',
    href: '/travel-hacks/stack-points-free-cruise',
  },
  {
    id: 'lounge-access',
    title: 'Cruise Port Lounge Access',
    description: 'Get premium lounge perks at major cruise ports with the right card.',
    icon: DoorOpen,
    savings: 'Save up to $200',
    readTime: '4 min',
    href: '/travel-hacks/cruise-port-lounge-access',
  },
]

export default function TravelHacksHub() {
  const topCards = getBestCardsFor('signup-bonus')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A5F]/5 via-white to-[#D4AF37]/10 text-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#1E3A5F] uppercase tracking-wider">
              Travel Hacks
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-6 max-w-3xl">
            Travel Hacks: Make Your Disney Cruise Cheaper (or Free)
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
            Insider strategies for using credit card rewards, points, and perks to dramatically
            reduce your cruise vacation costs.
          </p>

          {/* Quick Stats Banner */}
          <div className="bg-[#1E3A5F] rounded-xl p-6 text-white max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-semibold">Average Savings</p>
            </div>
            <p className="text-3xl font-bold">$1,200+</p>
            <p className="text-[#D4AF37]/80 text-sm mt-1">
              The average GatGrid reader saves over $1,200 per cruise using these strategies
            </p>
          </div>
        </div>
      </section>

      {/* Strategy Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-12">
          Five Proven Strategies
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy) => {
            const Icon = strategy.icon
            return (
              <Link
                key={strategy.id}
                href={strategy.href}
                className="group flex flex-col p-6 rounded-xl border border-slate-200 bg-white hover:border-[#1E3A5F]/30 hover:shadow-lg hover:bg-[#1E3A5F]/5 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center group-hover:bg-[#1E3A5F]/20 transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                    {strategy.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-2 group-hover:text-[#1E3A5F] transition-colors">
                  {strategy.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 flex-1">{strategy.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm font-semibold text-emerald-600">{strategy.savings}</span>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-12 text-center">
            How It Works: Three Simple Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Pick the Right Cards',
                description:
                  'Choose 2-3 credit cards based on your travel plans and spending habits. Look for high signup bonuses and category bonuses that match your spending.',
              },
              {
                step: '2',
                title: 'Meet Signup Bonuses',
                description:
                  'Use your new cards for regular spending to meet the minimum spend requirement and unlock the welcome bonus (usually within 3-6 months).',
              },
              {
                step: '3',
                title: 'Redeem for Free Travel',
                description:
                  'Convert your earned points into airline miles, travel credits, or direct cash back to cover flights, the cruise, or both.',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center font-fraunces text-lg font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-fraunces font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-6 text-[#1E3A5F]/30">
                    <ArrowRight className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Planning CTA */}
      <section className="bg-[#1E3A5F] text-white py-16 border-y border-[#1E3A5F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-3">
                Ready to plan your cruise?
              </p>
              <h2 className="text-2xl md:text-3xl font-fraunces font-bold mb-4">
                Turn these strategies into your actual cruise
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed max-w-xl">
                Once you've got your rewards plan in place, our travel advisors at Boardwalk Travel
                Agency can help you find the best sailing, stateroom, and timing — at no extra cost
                to you.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Card Picks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-12">
          Featured Card Picks
        </h2>

        <div className="space-y-6">
          {topCards.slice(0, 3).map((card) => (
            <CreditCardRecommendation
              key={card.id}
              card={card}
              showEditorialTake={true}
              compact={false}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-[#1E3A5F]/5 rounded-lg border border-[#1E3A5F]/20">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Tip:</span> These are just our top
            three. Browse our full comparison of 8+ cards to find the best fit for your specific
            cruise plans and spending patterns.
          </p>
        </div>
      </section>

      {/* Key Principles */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-12">
            Key Principles
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Start 6-12 Months Early',
                description:
                  "The best rewards strategies require time. Apply for cards 6-12 months before your cruise to meet minimum spend requirements and strategically space out applications.",
              },
              {
                title: "Pay Your Balance in Full",
                description:
                  'Credit card rewards only work if you pay your full balance every month. Interest charges will erase any rewards value.',
              },
              {
                title: 'Spend You Were Already Planning',
                description:
                  "Don't inflate your spending just to meet minimum requirements. Only apply for cards when the minimum spend aligns with your normal spending patterns.",
              },
              {
                title: "Understand Your Cards' Benefits",
                description:
                  'Read the fine print on trip insurance, lounges, and protections. Not all benefits apply in all situations—knowing what you have saves money.',
              },
            ].map((principle, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white border border-slate-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                  {principle.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1E3A5F] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-fraunces font-bold mb-4">Ready to Save on Your Cruise?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Dive into any of our five strategy guides to start building your rewards plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/travel-hacks/fly-free-to-cruise-port"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1E3A5F] font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200"
            >
              Start Reading
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-colors duration-200"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Affiliate Disclosure</h3>
          <p className="text-sm text-slate-700">
            This guide contains referral links to credit card offers. We may earn a commission if
            you apply through our links at no additional cost to you. We only recommend cards we
            genuinely believe offer value for cruise travelers. Always compare offers and apply for
            the card that best matches your situation and spending patterns.
          </p>
        </div>
      </section>
    </div>
  )
}
