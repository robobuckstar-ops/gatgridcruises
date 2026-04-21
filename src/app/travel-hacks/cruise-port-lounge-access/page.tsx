

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, Coffee, Wifi, Utensils } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { creditCards } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'Cruise Port Lounge Access | Travel Hacks',
  description:
    'Get premium lounge access at major cruise ports (Miami, Port Canaveral, Houston, etc.) with the right credit card. Priority Pass and Amex lounge strategies for cruisers.',
  keywords: [
    'lounge access',
    'airport lounge',
    'priority pass',
    'cruise port',
    'amex lounge',
    'travel rewards',
  ],
}

export default function CruisePortLoungeAccess() {
  const sapphireReserve = creditCards.find((c) => c.slug === 'chase-sapphire-reserve')
  const ventureX = creditCards.find((c) => c.slug === 'capital-one-venture-x')
  const amexPlatinum = creditCards.find((c) => c.slug === 'amex-business-platinum')
  const sapphirePreferred = creditCards.find((c) => c.slug === 'chase-sapphire-preferred')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/travel-hacks"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Hacks
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Travel Hacks
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-slate-900 mb-4">
            Cruise Port Lounge Access
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Most cruisers wait in airport terminals. With the right credit card, you can access
            premium lounges at major cruise ports—free drinks, meals, Wi-Fi, and a quiet place to
            relax before boarding.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="h-4 w-4" />
              <span>4 min read</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <span>💰</span>
              <span>Save up to $200</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Why Lounge Access Matters for Cruisers
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            A typical cruise day means arriving at the airport 3+ hours early, waiting in long
            security lines, and then sitting in a crowded terminal. With family in tow, this can
            be stressful.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Airport and cruise port lounges offer:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li className="flex gap-3">
              <Coffee className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>Free snacks, drinks, and meals</span>
            </li>
            <li className="flex gap-3">
              <Wifi className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>High-speed Wi-Fi and charging stations</span>
            </li>
            <li className="flex gap-3">
              <Utensils className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>A quiet, comfortable place to rest (showers available at some lounges)</span>
            </li>
          </ul>

          <p className="text-slate-600 leading-relaxed mb-4">
            A single lounge visit can save $50-100 in food and drinks—and make your pre-cruise
            experience infinitely more relaxed. For families cruising twice per year, this adds up
            quickly.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Three Ways to Get Lounge Access
          </h3>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            1. Priority Pass (Most Flexible)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            Priority Pass is a third-party lounge network with 1,400+ lounges in 600+ cities
            worldwide, including most major cruise ports. Here's what you need to know:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Membership tiers:</strong> Standard ($99/year = 10 visits), Plus ($299/year =
              unlimited), Prestige ($699/year = unlimited + guests free)
            </li>
            <li>
              <strong>Credit cards that include it:</strong> Chase Sapphire Preferred/Reserve
              (1 pass included), Capital One Venture X (included)
            </li>
            <li>
              <strong>Coverage:</strong> Works at major cruise ports like Miami, Port Canaveral,
              Houston, New York, and many others
            </li>
          </ul>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            2. Amex Centurion Lounges (Premium Experience)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            American Express operates its own premium lounge network:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Locations:</strong> Amex Centurion Lounges in major airports like Miami (MIA),
              Dallas (DFW), New York (JFK), and more
            </li>
            <li>
              <strong>Included with:</strong> Amex Platinum and Amex Business Platinum
            </li>
            <li>
              <strong>Experience:</strong> Premium amenities, full meals, premium beverages, spa
              services at some locations
            </li>
            <li>
              <strong>Catch:</strong> High annual fees ($550-695); justified if you fly/cruise
              frequently
            </li>
          </ul>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            3. Capital One Lounges (Growing Option)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            Capital One is building its own lounge network at major hubs. Venture X cardholders get
            access to a smaller but growing network. Also get Priority Pass as a backup.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Best Lounge Cards for Cruisers
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Here's the best value if lounge access is a priority:
          </p>
        </section>

        {/* Card Recommendations */}
        <section className="mb-12">
          <div className="space-y-6">
            {sapphireReserve && (
              <CreditCardRecommendation card={sapphireReserve} showEditorialTake={true} />
            )}

            {ventureX && (
              <CreditCardRecommendation card={ventureX} showEditorialTake={true} />
            )}

            {amexPlatinum && (
              <CreditCardRecommendation card={amexPlatinum} showEditorialTake={true} />
            )}

            {sapphirePreferred && (
              <CreditCardRecommendation card={sapphirePreferred} showEditorialTake={true} />
            )}
          </div>
        </section>

        <section className="prose prose-slate max-w-none mb-12">
          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Which Lounges Are Available at Major Cruise Ports?
          </h3>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Miami International (MIA)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Priority Pass lounges:</strong> Multiple Priority Pass lounges throughout the
            airport
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Amex Centurion:</strong> Yes (premium lounge)
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Port Canaveral (MCO - Orlando)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Priority Pass lounges:</strong> Several lounges available
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Amex Centurion:</strong> No, but Priority Pass is strong here
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            Houston (IAH / Hobby Ports)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Priority Pass lounges:</strong> Available at IAH
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Amex Centurion:</strong> Yes at DFW (nearby alternative)
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            New York (JFK / Newark)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Priority Pass lounges:</strong> Multiple options at both airports
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Amex Centurion:</strong> Yes at both JFK and Newark
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Pro Tips for Lounge Access
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Arrive early enough to use the lounge:</strong> International flights / early
                morning departures give you the most time to enjoy lounge amenities
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Check lounge policies on children:</strong> Most lounges allow kids free with
                an adult; some charge for ages 13+
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Download the Priority Pass app:</strong> Shows lounge locations, amenities,
                and hours before you travel
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Guest policies vary:</strong> Chase Sapphire Reserve includes 1 guest free;
                Amex varies; Capital One includes guests. Check your card's benefits.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Use lounge day passes strategically:</strong> If cruising solo or without
                card access, most lounges sell day passes ($35-50)—cheaper than meals in the terminal
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            The ROI on Lounge Access
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Let's do the math: If you cruise twice per year and use a lounge each time, you save:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>2 lounge visits × $40-60 value per visit = $80-120 per year in savings</li>
            <li>Plus meals/snacks not purchased in terminal = another $50-100</li>
            <li>
              <strong>Total annual value: $130-220 in lounge access alone</strong>
            </li>
          </ul>

          <p className="text-slate-600 leading-relaxed mb-4">
            If your lounge card has a $95 annual fee (Sapphire Preferred), the lounge benefit
            often covers it. If it's $550+ (Sapphire Reserve, Amex Platinum), you need to justify
            it with other benefits and spending.
          </p>
        </section>

        {/* Related Guides */}
        <section className="bg-slate-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">
            Related Travel Hacks Guides
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/travel-hacks/fly-free-to-cruise-port"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                How to Fly Free to Your Cruise Port
              </span>
              <span className="text-blue-600">→</span>
            </Link>
            <Link
              href="/travel-hacks/free-trip-insurance"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                Free Trip Insurance You Already Have
              </span>
              <span className="text-blue-600">→</span>
            </Link>
            <Link
              href="/travel-hacks/best-cards-for-cruises"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                Best Credit Cards for Cruise Purchases
              </span>
              <span className="text-blue-600">→</span>
            </Link>
            <Link
              href="/travel-hacks/stack-points-free-cruise"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                How to Stack Points for a Free Cruise
              </span>
              <span className="text-blue-600">→</span>
            </Link>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h3 className="font-semibold text-slate-900 mb-2">Affiliate Disclosure</h3>
            <p className="text-sm text-slate-700">
              This guide contains referral links to credit card offers. We may earn a commission if
              you apply through our links at no additional cost to you. We only recommend cards we
              genuinely believe offer value for cruise travelers.
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
