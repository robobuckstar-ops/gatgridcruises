import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, AlertCircle } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug, getBestCardsFor } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'How to Fly Free to Your Cruise Port | Travel Hacks',
  description:
    'Turn credit card signup bonuses into free flights to your cruise port. Learn which cards offer the best travel values and how to maximize your points.',
  keywords: [
    'free flights',
    'credit card rewards',
    'travel points',
    'cruise flights',
    'airline miles',
  ],
}

export default function FlyFreeToCruisePort() {
  const sapphirePreferred = getCardBySlug('chase-sapphire-preferred')
  const sapphireReserve = getCardBySlug('chase-sapphire-reserve')
  const ventureX = getCardBySlug('capital-one-venture-x')
  const flightCards = getBestCardsFor('flights')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/travel-hacks"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-[#D4AF37] text-sm font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Hacks
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
              Travel Hacks
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-white mb-4">
            How to Fly Free to Your Cruise Port
          </h1>

          <p className="text-lg text-blue-100 mb-6">
            Turn credit card signup bonuses into enough points for free flights. We show you
            exactly which cards work best and how to maximize their value.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-100">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <span>💰</span>
              <span>Save up to $1,500</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* The Basics Section */}
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            How Credit Card Signup Bonuses Work
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Most premium travel credit cards offer generous welcome bonuses—typically between
            50,000 and 150,000 points or miles. These are designed to incentivize new cardholders
            and can be worth $500-1,500 depending on the card.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            The process is straightforward: apply for the card, meet the minimum spending
            requirement (usually $3,000-$5,000 in the first 3 months), and the bonus posts to your
            account. You can then redeem those points for flights, hotel stays, or even cash back.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Key insight:</span> The Chase Sapphire Preferred
              offers 60,000 points worth roughly $750 via the Chase Travel Portal—enough to cover
              flights for most cruisers traveling within North America.
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Real Example: Family of 2 Flying to Miami
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Let"s say you're a family of two flying from Orlando (MCO) to Miami for a 7-night
"            cruise. Direct flights typically cost $100-150 per person each way, totaling roughly
            $400-600 for both of you.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            With Chase Sapphire Preferred's 60,000 point welcome bonus (worth $750 in the Chase
            Travel Portal), you can cover your flights three times over. That's free travel for
            your entire family, plus $150-200 left over for other pre-cruise expenses.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Card-to-Airline Transfer Partners
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            For maximum flexibility, some premium cards let you transfer points directly to
            airline partners at a 1:1 ratio. This is particularly valuable if you're earning
            points at a specific airline or want to book premium cabin awards.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Chase Sapphire cards transfer to partners like United, Southwest, British Airways,
            Virgin Atlantic, and more. Capital One Venture X transfers to virtually any airline
            without restrictions, giving you ultimate flexibility.
          </p>
        </section>

        {/* Recommended Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Best Cards for Free Flights to Your Cruise
          </h2>

          <div className="space-y-6">
            {sapphirePreferred && (
              <CreditCardRecommendation card={sapphirePreferred} showEditorialTake={true} />
            )}

            {sapphireReserve && (
              <CreditCardRecommendation card={sapphireReserve} showEditorialTake={true} />
            )}

            {ventureX && (
              <CreditCardRecommendation card={ventureX} showEditorialTake={true} />
            )}
          </div>
        </section>

        {/* Strategy Section */}
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            The Strategy: Timing & Application
          </h2>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Step 1: Apply 3-4 Months Before Your Cruise
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Credit card issuers typically require you to meet the minimum spend within 3 months of
            opening the account. If your cruise is in 6 months, applying now gives you 3 months to
            meet minimum spend and another 3 months of "buffer" before you need to book your
            flights.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Step 2: Meet the Minimum Spend
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Most cards require $3,000-$5,000 in purchases within 3 months. The key is to only
            apply if you can naturally meet this threshold with planned spending (groceries,
            utilities, gas). Never artificially inflate spending just to hit a minimum—that's a
            quick way to ring up debt that outweighs any rewards value.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Tip: Time your application to coincide with a major purchase you were already planning
            (home repairs, new appliances, etc.).
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Step 3: Book Your Flights in the Travel Portal or via Transfer
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Once the bonus posts (typically 1-2 weeks after hitting minimum spend), you can
            redeem. Use the card issuer's travel portal for convenience, or transfer points
            directly to an airline partner if booking a specific award seat or premium cabin.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded my-6">
            <h4 className="font-semibold text-slate-900 mb-2">Pro Tip: Travel Portal vs. Transfer</h4>
            <p className="text-sm text-slate-700 mb-3">
              <strong>Travel Portal:</strong> Simpler, fixed redemption rates, covers any airline.
              Example: 60,000 Chase points = $750 credit to book any flight.
            </p>
            <p className="text-sm text-slate-700">
              <strong>Airline Transfer:</strong> More flexibility but requires some research. 75,000
              Capital One miles might book a $900+ award flight if you're strategic.
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            What About Airline-Specific Cards?
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Cards like United MileagePlus, American AAdvantage, and Delta SkyMiles offer decent
            bonuses too. However, the downside is inflexibility—your miles only work with that
            airline. General travel cards like Chase Sapphire work with any airline via the portal
            or transfer partners, making them safer choices if you haven't locked in your flight
            routing yet.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Maximize Value: Stack Multiple Cards
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            If you have 6-12 months before your cruise, consider applying for 2-3 travel cards
            strategically (spacing them 2-3 months apart). This allows you to meet multiple minimum
            spend requirements with different spending patterns and earn multiple signup bonuses.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            For example: Chase Sapphire Preferred (60K points) + Capital One Venture (75K miles) =
            enough for flights for a family of four.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded my-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Important: Credit Impact</h4>
                <p className="text-sm text-slate-700">
                  Each new credit card application triggers a hard inquiry and lowers your credit
                  score slightly (typically 5-10 points per inquiry). Space applications 2-3 months
                  apart and plan for a temporary dip in your score during this period.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Final Tips
          </h3>

          <ul className="text-slate-600 space-y-3 mb-4">
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Pay your balance in full:</strong> Interest charges will erase any rewards
                value. Only apply for cards if you'll pay the balance monthly.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Watch annual fees:</strong> Most travel cards charge $95-695 per year. Make
                sure your spending and benefits justify the fee.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Check for public vs. targeted offers:</strong> Sometimes better bonuses are
                available through targeted emails or business credit line applications.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Read the terms:</strong> Bonus expiration dates, minimum spend requirements,
                and redemption restrictions vary. Always confirm before applying.
              </span>
            </li>
          </ul>
        </section>

        {/* Related Guides */}
        <section className="bg-slate-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">
            Related Travel Hacks Guides
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
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
              href="/travel-hacks/cruise-port-lounge-access"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                Cruise Port Lounge Access
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
