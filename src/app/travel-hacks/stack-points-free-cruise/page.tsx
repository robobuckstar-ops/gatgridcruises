import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { creditCards } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'How to Stack Points for a Free Cruise | Travel Hacks',
  description:
    'Learn the math of earning 200K+ points to cover a $6,000 7-night cruise. We break down three proven strategies using Chase, Amex, and Capital One cards.',
  keywords: [
    'free cruise',
    'credit card points',
    'rewards stacking',
    'signup bonuses',
    'travel rewards',
  ],
}

export default function StackPointsForFreeCruise() {
  // Get specific cards for the strategy breakdown
  const sapphirePreferred = creditCards.find((c) => c.slug === 'chase-sapphire-preferred')
  const sapphireReserve = creditCards.find((c) => c.slug === 'chase-sapphire-reserve')
  const amexGold = creditCards.find((c) => c.slug === 'amex-gold')
  const amexBusiness = creditCards.find((c) => c.slug === 'amex-business-platinum')
  const ventureX = creditCards.find((c) => c.slug === 'capital-one-venture-x')
  const inkBusiness = creditCards.find((c) => c.slug === 'chase-ink-business-preferred')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/travel-hacks"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white text-sm font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Hacks
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
              Travel Hacks
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-fraunces font-bold text-white mb-4">
            How to Stack Points for a Free Cruise
          </h1>

          <p className="text-lg text-blue-200 mb-6">
            The math is simple: three signup bonuses equal one free cruise. Learn exactly which
            cards to apply for and how to turn 200K+ points into a completely free 7-night sailing.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-300">
              <Clock className="h-4 w-4" />
              <span>6 min read</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span>💰</span>
              <span>Save up to $6,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            The Math of Free Cruises
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            A 7-night Disney cruise for a family of four typically costs $6,000-8,000 total. With
            careful card selection and timing, you can cover this entirely through signup bonuses
            and earned points within 12 months.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-3">
              <strong>The Formula:</strong>
            </p>
            <p className="text-sm text-slate-700 font-mono">
              3 cards × ~$1,500-2,000 value per signup bonus = $4,500-6,000 free cruise
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Strategy 1: The Chase Trifecta
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            If you prefer to keep everything in one ecosystem, Chase offers a powerful trio:
          </p>

          <ul className="text-slate-600 space-y-4 mb-6">
            <li>
              <strong>Card 1 - Chase Sapphire Preferred (60K points / $750 value):</strong> This is
              your anchor card for flights and travel bookings through the Chase portal
            </li>
            <li>
              <strong>Card 2 - Chase Freedom Unlimited (150K points value total):</strong> Solid
              all-around rewards; every $1 earns 1.5x points on everything
            </li>
            <li>
              <strong>Card 3 - Chase Ink Business Preferred (90K points / $1,125 value):</strong> If
              you're a solo entrepreneur or can qualify for a business card, the bonus is the
              highest in Chase's lineup
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Chase Trifecta Total Bonuses:</strong> 60K + 150K + 90K = 300K points
            </p>
            <p className="text-sm text-slate-700">
              <strong>Value:</strong> ~$4,500 in the Chase Travel Portal (enough for a full 7-night
              cruise or flights + cruise combined)
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Strategy 2: The Amex Ecosystem
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            If you love dining rewards and premium perks, Amex offers a powerful ecosystem:
          </p>

          <ul className="text-slate-600 space-y-4 mb-6">
            <li>
              <strong>Card 1 - Amex Platinum (150K points / $1,500 value):</strong> Huge welcome
              bonus and incredible travel protections; annual fee is high but justified for
              frequent travelers
            </li>
            <li>
              <strong>Card 2 - Amex Gold (60K points / $720 value):</strong> Perfect pairing for
              dining rewards; 4x on food makes it powerful for cruises
            </li>
            <li>
              <strong>Card 3 - Amex Blue Business Plus (250K points value):</strong> No annual fee
              and solid earning rates; good for organic spending between major cards
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Amex Ecosystem Total Bonuses:</strong> 150K + 60K + 250K = 460K Amex points
            </p>
            <p className="text-sm text-slate-700">
              <strong>Value:</strong> ~$5,000-5,500 via transfer partners (Amex points are valuable
              to airline partners)
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Strategy 3: The Hybrid Mix (Best Overall)
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Mix and match the best cards from different issuers for maximum flexibility:
          </p>

          <ul className="text-slate-600 space-y-4 mb-6">
            <li>
              <strong>Month 1 - Chase Sapphire Preferred (60K / $750):</strong> Flexible travel
              portal rewards
            </li>
            <li>
              <strong>Month 3 - Capital One Venture X (75K / $750):</strong> Flat-rate miles with
              excellent flexibility
            </li>
            <li>
              <strong>Month 6 - Amex Gold (60K / $720):</strong> 4x dining for onboard charges
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Hybrid Mix Total Bonuses:</strong> 60K + 75K + 60K = 195K points/miles
            </p>
            <p className="text-sm text-slate-700">
              <strong>Value:</strong> ~$4,500-5,000 (plenty for a 7-night cruise, or a combination
              of flights + cruise)
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Timeline: Start 6-12 Months Before Your Cruise
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            This spacing is crucial for two reasons: (1) you need time to meet minimum spend
            requirements without straining your budget, and (2) spacing applications protects your
            credit score.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 1:</span>
              <span className="text-slate-600">
                Apply for Card 1 (e.g., Chase Sapphire Preferred)
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 2-3:</span>
              <span className="text-slate-600">
                Hit minimum spend on Card 1; bonus posts mid-Month 3
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 3:</span>
              <span className="text-slate-600">
                Apply for Card 2 (space 2-3 months apart from Card 1)
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 5-6:</span>
              <span className="text-slate-600">
                Hit minimum spend on Card 2; bonus posts; apply for Card 3
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 8-9:</span>
              <span className="text-slate-600">
                Hit minimum spend on Card 3; bonus posts; you now have 3 signup bonuses in hand
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-blue-600 flex-shrink-0">Month 9-12:</span>
              <span className="text-slate-600">
                Book your cruise with the accumulated points
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Real Example: Family of 4 / 7-Night Disney Cruise
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Cruise cost:</strong> $6,500 (let's say a reasonable estimate)
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Points earned via bonuses:</strong>
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>Chase Sapphire Preferred: 60,000 points = $900 in travel portal</li>
            <li>Capital One Venture X: 75,000 miles = $750 in travel credit</li>
            <li>Amex Gold: 60,000 points = $720 via Amex Travel</li>
          </ul>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Total: 195,000 points = ~$2,370 in bonuses alone</strong>
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            But wait—you're also earning points on your everyday spending:
          </p>

          <ul className="text-slate-600 space-y-2 mb-6">
            <li>
              <strong>Earning on minimum spend:</strong> Meet $3,000-5,000 minimums per card using
              planned spending
            </li>
            <li>
              <strong>Earning beyond minimums:</strong> Continue using the cards for 6-12 months
              post-application
            </li>
            <li>
              <strong>Additional points from ongoing spending:</strong> Another $1,500-2,000 in
              value
            </li>
          </ul>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700 mb-2">
              <strong>Total points + earning power:</strong>
            </p>
            <p className="text-sm text-slate-700 mb-2">
              $2,370 (bonuses) + $1,500-2,000 (ongoing earning) = <strong>$3,870-4,370</strong>
            </p>
            <p className="text-sm text-slate-700">
              <strong>Your 7-night $6,500 cruise now costs only $2,130-3,130</strong>—saving $3,370+
            </p>
          </div>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Final Considerations
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Only apply for cards if you meet spend naturally:</strong> Don't artificially
                inflate spending just to qualify for bonuses
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Pay your balance monthly:</strong> Interest charges erase all rewards value;
                only apply if you can pay in full
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Space applications 2-3 months apart:</strong> Multiple applications in a short
                window can hurt your credit score
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Account for annual fees:</strong> If cards charge $95-550/year, ensure your
                earning and benefits justify it
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                <strong>Keep cards open after earning bonuses:</strong> Closing accounts hurts your
                credit score and average age of accounts
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
              href="/travel-hacks/best-cards-for-cruises"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                Best Credit Cards for Cruise Purchases
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
