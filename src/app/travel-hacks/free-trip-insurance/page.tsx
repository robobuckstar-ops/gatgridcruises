import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, CheckCircle, AlertCircle } from 'lucide-react'
import { CreditCardRecommendation } from '@/components/ui/credit-card-recommendation'
import { getCardBySlug } from '@/lib/credit-card-config'

export const metadata: Metadata = {
  title: 'Free Trip Insurance You Already Have | Travel Hacks',
  description:
    "Most cruise travelers buy expensive trip insurance without realizing their credit card already covers them. Learn what's actually covered and when to buy separate insurance.",
  keywords: [
    'trip insurance',
    'trip cancellation',
    'travel insurance',
    'credit card benefits',
    'cruise insurance',
  ],
}

export default function FreeTripInsurance() {
  const sapphireReserve = getCardBySlug('chase-sapphire-reserve')
  const amexPlatinum = getCardBySlug('amex-business-platinum')
  const ventureX = getCardBySlug('capital-one-venture-x')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
            Free Trip Insurance You Already Have
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Most cruisers buy separate trip insurance for $150-300 without realizing their credit
            card already covers them. We break down exactly what's included and when you might need
            extra coverage.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="h-4 w-4" />
              <span>4 min read</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <span>💰</span>
              <span>Save up to $300</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            The Problem: Redundant Insurance Purchases
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Disney Cruise Line and third-party travel insurance companies advertise trip insurance
            heavily—especially to first-time cruisers. A typical policy costs $150-300 and covers
            trip cancellation, baggage delays, and medical emergencies.
          </p>

          <p className="text-slate-600 leading-relaxed mb-4">
            But here's the secret: most premium credit cards already include these protections at
            no extra cost. That $200 trip insurance policy? You might already have it covered by
            your Chase Sapphire or American Express Platinum card.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            What Premium Credit Cards Actually Cover
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Premium travel credit cards typically include:
          </p>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Trip Cancellation Insurance:</strong> Up to $5,000-$10,000 per person if
                you cancel for a covered reason before departure
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Trip Delay Insurance:</strong> $200-500+ per day if you miss your
                embarkation due to transportation delays
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Baggage Delay Insurance:</strong> Up to $100-300 per day if your luggage
                is delayed
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Travel Accident Insurance:</strong> Accidental death or dismemberment
                coverage while traveling
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Emergency Medical & Dental:</strong> Coverage for medical emergencies
                while away from home
              </span>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded my-6">
            <p className="text-sm text-slate-700">
              <strong>Important:</strong> The card must have been used to purchase the cruise fare
              for the benefits to apply. If you booked with a debit card or someone else's card,
              you won't have coverage.
            </p>
          </div>
        </section>

        {/* Card Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Which Cards Include What?
          </h2>

          <div className="space-y-6">
            {sapphireReserve && (
              <CreditCardRecommendation card={sapphireReserve} showEditorialTake={true} />
            )}

            {amexPlatinum && (
              <CreditCardRecommendation card={amexPlatinum} showEditorialTake={true} />
            )}

            {ventureX && (
              <CreditCardRecommendation card={ventureX} showEditorialTake={true} />
            )}
          </div>

          <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">Coverage Details</h3>
            <p className="text-sm text-slate-700 mb-4">
              All premium credit cards include the core protections above. The differences are in
              the limits:
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>
                <strong>Chase Sapphire Reserve:</strong> Trip cancellation up to $10K/person,
                trip delay $500/day
              </li>
              <li>
                <strong>Amex Platinum:</strong> Trip cancellation up to $10K/person, trip delay
                $500/day (plus emergency evacuation)
              </li>
              <li>
                <strong>Capital One Venture X:</strong> Trip cancellation up to $10K/person, trip
                delay $500/day
              </li>
            </ul>
          </div>
        </section>

        {/* What's Covered vs Not */}
        <section className="prose prose-slate max-w-none mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            What's Covered vs. What Isn't
          </h2>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Typically Covered (with most cards)
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                Cancellation due to sudden illness or injury (you or immediate family member)
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Cancellation due to death of a family member</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Missing your embarkation due to a flight delay</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Luggage not arriving the first day of your cruise</span>
            </li>
          </ul>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            Usually NOT Covered
          </h3>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Pre-existing conditions:</strong> If you had a known condition before
                booking, cancellation due to that condition may not be covered
              </span>
            </li>
            <li className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Cancel-for-any-reason:</strong> Credit card insurance requires a specific
                covered reason, not just "I changed my mind"
              </span>
            </li>
            <li className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Optional activities:</strong> If you cancel optional shore excursions, that
                might not be covered
              </span>
            </li>
            <li className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Travel during epidemics:</strong> Many policies exclude cancellations due
                to pandemics or epidemics
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            How to File a Claim
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Most credit card insurances require:
          </p>

          <ol className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span>
                Contact your credit card company's insurance administrator as soon as you need to
                cancel
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span>
                Provide proof of the covered reason (medical documentation, death certificate, etc.)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span>
                Submit original receipts and booking confirmations for the cruise and flights
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span>
                Wait for approval—typically 15-30 days for a decision, then reimbursement within
                60 days
              </span>
            </li>
          </ol>

          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Pro tip:</strong> Look up your card's insurance provider's phone number and
            save it in your phone before you cruise. This way you can call immediately if you need
            to file a claim.
          </p>

          <h3 className="text-2xl font-fraunces font-bold text-slate-900 mt-8 mb-4">
            When Should You Buy Separate Trip Insurance?
          </h3>

          <p className="text-slate-600 leading-relaxed mb-4">
            Even with credit card coverage, some scenarios warrant purchasing additional trip
            insurance:
          </p>

          <ul className="text-slate-600 space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">✓</span>
              <span>
                <strong>Pre-existing conditions:</strong> If you or a traveling family member has a
                known medical condition that might require cancellation, buy cancel-for-any-reason
                coverage
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">✓</span>
              <span>
                <strong>No credit card coverage:</strong> If you booked the cruise with a debit
                card or didn't use a credit card, buy trip insurance
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">✓</span>
              <span>
                <strong>High-cost cruise:</strong> If you're spending $10,000+ and your card's
                limit ($5,000-10,000) won't fully cover it, add coverage
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">✓</span>
              <span>
                <strong>Extended travel:</strong> If you're adding multi-week land tours before or
                after the cruise, card coverage might not extend there
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">✓</span>
              <span>
                <strong>Pregnancy (3rd trimester):</strong> Cruise lines and many insurance policies
                restrict pregnant travelers—buy pregnancy-specific coverage if applicable
              </span>
            </li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded my-6">
            <h4 className="font-semibold text-slate-900 mb-2">Real-World Example</h4>
            <p className="text-sm text-slate-700 mb-2">
              Sarah is a regular cruise-goer with Chase Sapphire Reserve. Her $8,000 7-night
              Disney cruise is covered by the card's $10,000 trip cancellation benefit. She gets
              free coverage—no separate insurance needed.
            </p>
            <p className="text-sm text-slate-700">
              But if Sarah's cruise cost $12,000 for a concierge suite, she might buy a $150
              supplemental policy to cover the $2,000 gap above the card's limit.
            </p>
          </div>
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
              href="/travel-hacks/stack-points-free-cruise"
              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <span className="font-semibold text-slate-900">
                How to Stack Points for a Free Cruise
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
