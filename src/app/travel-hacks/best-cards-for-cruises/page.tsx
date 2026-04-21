import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug, getBestCardsFor } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Cruise Purchases | Travel Hacks',
  description:
    'Learn which credit cards offer the best rewards on cruise fares, onboard dining, excursions, and specialty experiences. Strategic card stacking can earn 50,000+ bonus points.',
  keywords: [
    'cruise rewards',
    'credit card points',
    'cruise spending',
    'dining rewards',
    'travel rewards strategy',
  ],
}

export default function BestCardsForCruises() {
  const amexGold = getCardBySlug('amex-gold')
  const sapphireReserve = getCardBySlug('chase-sapphire-reserve')
  const inkBusiness = getCardBySlug('chase-ink-business-preferred')

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
            Best Credit Cards for Cruise Purchases
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Not all cruising happens at once. Learn which cards reward you on the cruise fare,
            onboard dining, excursions, and specialty experiences. The right strategy can earn you
            50,000+ bonus points on a single cruise.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <span>💰</span>
              <span>Save up to $400</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            How Cruise Purchases Get Coded
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Here"s what most cruisers don't realize: your cruise fare, onboard charges, and
"            excursions hit your credit card differently depending on how you pay and which card
            you use.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Disney Cruise Line charges typically code as:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Cruise fare:</strong> Travel category (eligible for 2-3x points on most
              travel cards)
            </li>
            <li>
              <strong>Onboard dining:</strong> Dining category (eligible for 3-4x on dining cards)
            </li>
            <li>
              <strong>Specialty dining:</strong> Usually dining, sometimes travel
            </li>
            <li>
              <strong>Excursions:</strong> Travel category (3x on most cards)
            </li>
            <li>
              <strong>Onboard shopping:</strong> General purchases (1-2x on most cards)
            </li>
          </ul>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            The Card Stacking Strategy
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Instead of putting your entire cruise on one card, use the card with the best rewards
            for each spending category:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-3">
              <strong>Example: $6,000 Disney Cruise for Family of 2</strong>
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>
                • Cruise fare ($4,000): American Express Gold (3x = 12,000 points / $144 value)
              </li>
              <li>
                • Onboard dining ($1,200): American Express Gold (4x = 4,800 points / $58 value)
              </li>
              <li>
                • Excursions ($800): Chase Sapphire Reserve (3x = 2,400 points / $36 value)
              </li>
              <li>
                <strong>Total: 19,200 points / ~$238 value</strong> (vs. ~$100 on a flat 2x card)
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Why This Matters
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            A family spending $6,000 on a cruise can earn an extra $100-150 in rewards value just
            by choosing the right card for each purchase. Over a lifetime of cruising, that's
            thousands of dollars in free travel.
          </p>
        </section>

        {/* Card Recommendations */}
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Top Cards for Cruise Spending
          </h2>

          <div className="space-y-6">
            {amexGold && (
              <CreditCardRecommendation card={amexGold} showEditorialTake={true} />
            )}

            {sapphireReserve && (
              <CreditCardRecommendation card={sapphireReserve} showEditorialTake={true} />
            )}

            {inkBusiness && (
              <CreditCardRecommendation card={inkBusiness} showEditorialTake={true} />
            )}
          </div>
        </section>

        <section className="prose prose-slate max-w-none mb-12">
          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Detailed Card-by-Category Breakdown
          </h3>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            For Cruise Fare (Travel Category)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Best choice: Chase Sapphire Reserve or Capital One Venture X</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Both offer 3x points on travel, which is the highest category multiplier for cruise
            fares. Sapphire Reserve gives you 3x = 3 cents per dollar in the travel portal, while
            Capital One Venture's miles work slightly differently (flat-rate approach).
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            For Onboard Dining (Dining Category)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Best choice: American Express Gold</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Amex Gold dominates here with 4x points on dining, including fine dining restaurants
            that code as dining. This is where Amex Gold shines—a family spending $1,200 onboard
            gets 4,800 Amex points (worth $58+) versus 3,600 on Chase Sapphire (worth $54).
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            For Excursions (Travel Category)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Best choice: Chase Sapphire Reserve</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Most excursion charges (through Disney or other tour operators) code as travel. Chase
            Sapphire Reserve's 3x applies here, and if you book directly through an airline or
            travel provider, the benefits are even stronger.
          </p>

          <h4 className="text-xl font-fraunces font-bold text-slate-900 mt-6 mb-3">
            For Onboard Shopping (General Purchases)
          </h4>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Best choice: Capital One Venture X or Chase Sapphire Preferred</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            Onboard gift shops, clothing, and merchandise don't always code as travel. They fall
            into "other purchases" at 1-1.5x on most cards. Capital One Venture's flat 2x miles
            on everything guarantees solid returns, and Sapphire Preferred's 1x backstop is
            still better than many alternatives.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Pro Tips for Maximum Rewards
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Pre-pay onboard charges:</strong> Some cards let you pre-purchase onboard
                credit before sailing. Check if this codes as dining (4x with Amex Gold!) vs.
                travel.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Separate accounts for clarity:</strong> Using multiple cards per cruise
                helps you track which spending earned which rewards and ensures you don't
                accidentally exceed limits.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Account transfers:</strong> If your spouse doesn't have a premium card,
                time their card application to the cruise. One new card + bonus can cover the
                entire family's onboard credits.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Annual fees vs. value:</strong> Amex Gold ($250/year) and Chase Sapphire
                Reserve ($550/year) are expensive. Only use them if you're spending enough to earn
                back the fee in value.
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
              href="/travel-hacks/fly-free-to-cruise-port"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                How to Fly Free to Your Cruise Port
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
