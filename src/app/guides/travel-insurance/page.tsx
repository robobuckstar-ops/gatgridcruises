import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ChevronRight, CheckCircle, XCircle, AlertTriangle, CreditCard } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Do You Need Travel Insurance for a Disney Cruise?',
  description: 'Disney cruise travel insurance explained — medical at sea, trip cancellation, missed ports, Disney\'s own plan vs. third-party options, and how Amex Business Platinum helps.',
  keywords: ['disney cruise travel insurance', 'cruise travel insurance', 'disney cruise cancellation', 'medical at sea insurance', 'trip cancellation cruise'],
}

export default function TravelInsurancePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/guides" className="text-blue-300 hover:text-[#D4AF37] text-sm transition-colors">
              Guides
            </Link>
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">Travel Insurance</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <Shield className="w-12 h-12 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Do You Need Travel Insurance for a Disney Cruise?
              </h1>
              <p className="font-fraunces text-xl text-[#D4AF37] mt-2">The honest answer: almost certainly yes.</p>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Disney cruises are expensive, non-refundable close to sailing, and take place far from
            US hospitals. Here's what you actually need to know — without the sales pitch.
          </p>
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-[#D4AF37] rounded-r-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-slate-900 text-lg mb-2">The Short Answer</h2>
                <p className="text-slate-700 leading-relaxed">
                  For a Disney cruise costing $4,000–$15,000+, the cost of not having insurance is
                  roughly equivalent to leaving that much cash on the table. Medical emergencies at
                  sea can easily run $50,000–$100,000 without coverage. Skip insurance if you have
                  a strong reason not to — but know the real risks first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-8">Why Cruise Insurance Is Different</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Travel insurance on a cruise is categorically different from trip insurance on a hotel
            vacation. Three reasons make cruise coverage especially important:
          </p>

          <div className="space-y-6">
            {[
              {
                title: 'Medical Care at Sea Is Expensive — and Uninsured',
                icon: '🏥',
                body: 'US health insurance (including Medicare) does not cover you in international waters or in most Caribbean ports. Disney\'s onboard medical center charges full private rates: $500+ for an ER visit, $2,000+ per night for observation, $50,000+ for a medevac helicopter. A single broken ankle can cost more than the cruise itself.',
              },
              {
                title: 'Disney\'s Cancellation Policy Is Strict',
                icon: '📋',
                body: 'Disney Cruise Line becomes fully non-refundable 89–90 days before sailing for most itineraries. Outside that window, you lose 50–75% of your cruise fare if you cancel. That means a $10,000 family cruise could result in a $7,500 loss if a parent breaks a leg three months before sailing.',
              },
              {
                title: 'Missed Ports and Itinerary Changes Are Common',
                icon: '⚓',
                body: 'Caribbean weather changes fast. DCL regularly skips Nassau or port-swaps due to tropical systems — sometimes with 12 hours\' notice. If you\'ve booked non-refundable shore excursions or flights home from a specific port, you\'re exposed. Insurance can cover the cost of those lost bookings.',
              },
            ].map(({ title, icon, body }) => (
              <div key={title} className="flex gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-3xl flex-shrink-0" aria-hidden="true">{icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disney vs Third-Party Comparison */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-3">Disney Insurance vs. Third-Party Plans</h2>
          <p className="text-blue-200 mb-10 max-w-2xl">
            Disney offers their own cruise protection plan. It\'s convenient but rarely the best value.
            Here\'s an honest side-by-side.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disney's Plan */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl" aria-hidden="true">🏰</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">Disney Cruise Protection</h3>
                  <p className="text-slate-500 text-sm">Offered during booking at DCL.com</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  { text: 'Easy to add during booking', good: true },
                  { text: 'Trip cancellation up to 100% cruise fare', good: true },
                  { text: 'Medical coverage: $10,000', good: false, note: 'Often insufficient for serious emergencies' },
                  { text: 'Medical evacuation: $30,000', good: false, note: 'Below the typical $100K+ medevac cost' },
                  { text: '"Cancel for Any Reason" credit (not cash)', good: false, note: 'Returns 75% as future cruise credit, not money' },
                  { text: 'Pre-existing conditions: limited coverage', good: false },
                  { text: 'Price: typically 7–10% of trip cost', good: null },
                ].map(({ text, good, note }) => (
                  <li key={text} className="flex items-start gap-3">
                    {good === true ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : good === false ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">
                      {text}
                      {note && <span className="block text-slate-400 text-xs mt-0.5">{note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 rounded-xl p-3 text-sm text-amber-800 border border-amber-200">
                <strong>Bottom line:</strong> Convenient but low medical limits. Best for people who primarily want trip cancellation and don't anticipate health issues.
              </div>
            </div>

            {/* Third-Party Plans */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl" aria-hidden="true">🌐</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">Third-Party Travel Insurance</h3>
                  <p className="text-slate-500 text-sm">Allianz, Travel Guard, Seven Corners, etc.</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  { text: 'Medical coverage: $50K–$500K available', good: true },
                  { text: 'Medical evacuation: up to $1M on premium plans', good: true },
                  { text: 'Cancel for Any Reason — cash refund (not credit)', good: true },
                  { text: 'Pre-existing condition waivers available (buy early)', good: true },
                  { text: 'Covers all trip costs including flights and hotels', good: true },
                  { text: 'More complex to compare and purchase', good: false },
                  { text: 'Must buy within 10–21 days of first deposit for best terms', good: null, note: 'Timing matters for pre-existing waivers' },
                ].map(({ text, good, note }) => (
                  <li key={text} className="flex items-start gap-3">
                    {good === true ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : good === false ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">
                      {text}
                      {note && <span className="block text-slate-400 text-xs mt-0.5">{note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="bg-green-50 rounded-xl p-3 text-sm text-green-800 border border-green-200">
                <strong>Bottom line:</strong> Better coverage at competitive or lower prices. The right choice for most families, especially with pre-existing conditions or expensive multi-leg trips.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types Explained */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-8">Types of Coverage Explained</h2>

          <div className="space-y-4">
            {[
              {
                type: 'Trip Cancellation',
                when: 'Before your trip starts',
                covers: 'Reimbursement if you cancel for a covered reason (illness, death of immediate family, job loss, natural disaster). Look for a minimum of 100% trip cost coverage.',
                priority: 'Essential',
              },
              {
                type: 'Trip Interruption',
                when: 'After your trip starts',
                covers: 'Covers the unused portion of your trip and extra costs to return home if you must leave early. Distinct from cancellation — you need both.',
                priority: 'Essential',
              },
              {
                type: 'Emergency Medical',
                when: 'Anytime during the trip',
                covers: 'Medical bills at the ship\'s medical center, at foreign hospitals, and in cruise ports. Aim for $100,000+ minimum. This is where Disney\'s plan falls dangerously short.',
                priority: 'Critical',
              },
              {
                type: 'Medical Evacuation',
                when: 'When you need to get to a hospital fast',
                covers: 'Helicopter or air ambulance to the nearest adequate facility. Costs $50,000–$250,000+ without coverage. Don\'t accept less than $500K on a premium plan.',
                priority: 'Critical',
              },
              {
                type: 'Cancel for Any Reason (CFAR)',
                when: '48–72 hours before departure',
                covers: 'Cancel for ANY reason — not just covered ones. Typically refunds 75% of trip cost as cash. Costs ~40% more than standard plans but removes all conditions.',
                priority: 'Nice to Have',
              },
              {
                type: 'Baggage & Personal Effects',
                when: 'During travel',
                covers: 'Lost, stolen, or damaged luggage. Useful but rarely the most important coverage on a cruise. Most cruise-goers\'s belongings are safe in a locked cabin.',
                priority: 'Optional',
              },
            ].map(({ type, when, covers, priority }) => (
              <div key={type} className="p-6 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{type}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    priority === 'Essential' ? 'bg-blue-100 text-blue-700' :
                    priority === 'Nice to Have' ? 'bg-green-100 text-green-700' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {priority}
                  </span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-2">{when}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{covers}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Provider Comparison */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-3">Top Travel Insurance Options</h2>
          <p className="text-blue-200 mb-10 max-w-2xl">
            We compared the most popular plans for Disney cruise travelers. None of these are the same —
            pick based on your priorities.
          </p>

          {/* Affiliate disclosure */}
          <div className="bg-white/10 rounded-xl p-3 mb-8 text-xs text-blue-300">
            <strong className="text-blue-200">Affiliate disclosure:</strong> Some links below may earn us a commission at no extra cost to you.
            See our <a href="/disclosures" className="underline hover:text-white">full disclosures</a>.
            {/* TODO: Replace placeholder links below with actual affiliate partner links */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Allianz */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">🛡️</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">Allianz Travel Insurance</h3>
                  <p className="text-slate-500 text-sm">Best for families, established brand</p>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {[
                  { text: 'Medical coverage up to $50,000 (AllTrips Premier)', good: true },
                  { text: 'Emergency transport up to $250,000', good: true },
                  { text: 'Annual multi-trip plans available', good: true },
                  { text: 'Strong trip cancellation coverage', good: true },
                  { text: 'Cancel for Any Reason available on select plans', good: null },
                  { text: 'Medical limits lower than some competitors', good: false },
                ].map(({ text, good }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {good === true ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : good === false ? (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mb-4">
                <strong>Best for:</strong> Families wanting a trusted name with solid trip cancellation and reliable claims process.
              </p>
              {/* TODO: Replace with actual Allianz affiliate link */}
              <a
                href="https://www.allianztravelinsurance.com"
                
                
                className="block w-full text-center bg-[#1E3A5F] text-white font-semibold rounded-xl py-2.5 text-sm hover:bg-blue-900 transition-colors"
              >
                Get Allianz Quote →
              </a>
            </div>

            {/* World Nomads */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">🌐</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">World Nomads</h3>
                  <p className="text-slate-500 text-sm">Best for adventurers &amp; port excursions</p>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {[
                  { text: 'High medical coverage: up to $100,000', good: true },
                  { text: 'Covers adventure activities at ports', good: true },
                  { text: 'Buy or extend coverage while traveling', good: true },
                  { text: 'Strong 24/7 emergency assistance', good: true },
                  { text: 'No annual plan option', good: false },
                  { text: 'Fewer trip cancellation options vs. competitors', good: null },
                ].map(({ text, good }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {good === true ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : good === false ? (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mb-4">
                <strong>Best for:</strong> Active families who plan excursions (snorkeling, zip-lining) and want high medical limits.
              </p>
              {/* TODO: Replace with actual World Nomads affiliate link */}
              <a
                href="https://www.worldnomads.com"
                
                
                className="block w-full text-center bg-[#1E3A5F] text-white font-semibold rounded-xl py-2.5 text-sm hover:bg-blue-900 transition-colors"
              >
                Get World Nomads Quote →
              </a>
            </div>

            {/* Travel Guard */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">⚓</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">Travel Guard (AIG)</h3>
                  <p className="text-slate-500 text-sm">Best overall for comprehensive cruise coverage</p>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {[
                  { text: 'Medical coverage up to $100,000+', good: true },
                  { text: 'Medical evacuation up to $1,000,000 (Platinum)', good: true },
                  { text: 'Trip cancellation: 100% of trip cost', good: true },
                  { text: 'Cancel for Any Reason: 75% cash refund', good: true },
                  { text: 'Pre-existing condition waiver available', good: true },
                  { text: 'Premium plan required for best limits', good: null },
                ].map(({ text, good }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {good === true ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : good === false ? (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mb-4">
                <strong>Best for:</strong> Cruisers wanting the highest medical/evacuation limits and full CFAR protection. Our top pick for most families.
              </p>
              {/* TODO: Replace with actual Travel Guard affiliate link */}
              <a
                href="https://www.travelguard.com"
                
                
                className="block w-full text-center bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl py-2.5 text-sm hover:bg-yellow-300 transition-colors"
              >
                Get Travel Guard Quote → <span className="text-xs font-normal">(Our Pick)</span>
              </a>
            </div>

            {/* Disney's Plan */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">🏰</span>
                <div>
                  <h3 className="font-bold text-[#1E3A5F] text-xl">Disney Cruise Protection</h3>
                  <p className="text-slate-500 text-sm">Convenient but typically not the best value</p>
                </div>
              </div>
              <ul className="space-y-2.5 mb-5">
                {[
                  { text: 'Easy to add during DCL.com booking', good: true },
                  { text: 'Trip cancellation: 100% cruise fare', good: true },
                  { text: 'Medical coverage: only $10,000', good: false },
                  { text: 'Medical evacuation: only $30,000', good: false },
                  { text: 'CFAR returns 75% as cruise credit, not cash', good: false },
                  { text: 'Limited pre-existing condition coverage', good: false },
                ].map(({ text, good }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {good === true ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 rounded-xl p-3 text-sm text-amber-800 border border-amber-200">
                <strong>Our take:</strong> Adequate if you primarily want trip cancellation and don&apos;t have any health concerns. Not recommended if medical coverage matters — $10,000 won&apos;t cover a serious emergency at sea.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Look For Checklist */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-3">What to Look For</h2>
          <p className="text-slate-600 mb-8">
            Use this checklist when comparing cruise travel insurance plans. A plan that doesn&apos;t meet the critical requirements below isn&apos;t worth buying.
          </p>

          <div className="space-y-3">
            {[
              {
                priority: 'Critical',
                item: 'Emergency medical: minimum $100,000',
                detail: 'The ship\'s medical center and foreign hospitals charge full private rates. Disney\'s plan covers only $10,000 — dangerously insufficient for a serious event.',
              },
              {
                priority: 'Critical',
                item: 'Medical evacuation: minimum $500,000',
                detail: 'Air ambulance or helicopter to an adequate hospital runs $50,000–$250,000 without insurance. Premium plans offer $1,000,000+.',
              },
              {
                priority: 'Essential',
                item: 'Trip cancellation: 100% of prepaid, non-refundable trip costs',
                detail: 'Must cover the full trip value (cruise + flights + hotels), not just the cruise fare.',
              },
              {
                priority: 'Essential',
                item: 'Trip interruption coverage',
                detail: 'Distinct from cancellation — covers your costs if you must leave the cruise early after it has started.',
              },
              {
                priority: 'Essential',
                item: 'Pre-existing condition waiver (buy within 14–21 days of deposit)',
                detail: 'Critical if any traveler has a known health condition. The window varies by plan — buy early.',
              },
              {
                priority: 'Recommended',
                item: '24/7 emergency assistance hotline',
                detail: 'Invaluable for coordinating care at foreign ports. Make sure the plan includes a real human-staffed line, not just a website.',
              },
              {
                priority: 'Recommended',
                item: 'Cancel for Any Reason (CFAR) available as add-on',
                detail: 'Refunds 75% as cash for any cancellation reason. Purchase within 14–21 days of first deposit.',
              },
              {
                priority: 'Optional',
                item: 'Baggage protection',
                detail: 'Cruise cabin security means baggage loss is rare. Useful for flights, but not the priority.',
              },
            ].map(({ priority, item, detail }) => (
              <div key={item} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  priority === 'Critical' ? 'text-red-500' :
                  priority === 'Essential' ? 'text-blue-500' :
                  priority === 'Recommended' ? 'text-emerald-500' :
                  'text-slate-400'
                }`} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900 text-sm">{item}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      priority === 'Essential' ? 'bg-blue-100 text-blue-700' :
                      priority === 'Recommended' ? 'bg-green-100 text-green-700' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {priority}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amex Business Platinum Section */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">The Amex Business Platinum Angle</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            The American Express Business Platinum Card includes premium travel protections that cover
            a meaningful portion of the risk Disney cruisers face. If you have this card (or are
            considering it for the 150,000+ point welcome offer alone), these benefits are relevant:
          </p>

          <div className="bg-white rounded-2xl border border-[#D4AF37] p-6 mb-6">
            <h3 className="font-bold text-[#1E3A5F] text-lg mb-4">Protections Included with Amex Business Platinum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { benefit: 'Trip Cancellation & Interruption', detail: 'Up to $10,000 per trip, $20,000/year when you charge the trip to the card' },
                { benefit: 'Trip Delay Insurance', detail: '$500/trip when delays exceed 6 hours — covers meals, accommodation, and necessities' },
                { benefit: 'Baggage Insurance', detail: 'Up to $3,000 for checked bags, $10,000 for carry-on items, when charged to the card' },
                { benefit: 'Car Rental Loss & Damage', detail: 'Secondary coverage when renting pre/post cruise at Port Canaveral' },
                { benefit: 'Global Assist Hotline', detail: '24/7 emergency assistance coordination — useful for medical referrals at foreign ports' },
                { benefit: 'No Foreign Transaction Fees', detail: 'Saves 3% on every purchase in Nassau, Cozumel, or other ports' },
              ].map(({ benefit, detail }) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{benefit}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-8 text-sm">
            <strong className="text-amber-900">Important note:</strong>
            <span className="text-amber-800"> Amex Business Platinum trip protections are secondary — they fill gaps in other coverage. Medical coverage is limited and does NOT replace standalone cruise travel insurance. Always verify current benefit terms at americanexpress.com/en-us/credit-cards/benefits.</span>
          </div>

          <Link
            href="/concierge"
            className="block rounded-2xl overflow-hidden border border-[#D4AF37] shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#D4AF37] font-bold text-lg leading-tight">Plan Your Disney Cruise with Expert Guidance</p>
                <p className="text-blue-200 text-sm mt-1">Our advisors help you maximize travel protections and find the right sailing for your family.</p>
              </div>
              <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap">
                Start Planning →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Who Should Skip Insurance */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">When You Might Skip Insurance</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Insurance isn't always the right call. Here are legitimate reasons to self-insure or skip:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { scenario: 'You have excellent international health coverage', detail: 'Some expat health plans, certain employer plans, or military benefits cover international medical emergencies adequately.' },
              { scenario: 'The trip is relatively inexpensive', detail: 'A 3-night Bahamian cruise at $800/person has a much lower break-even than a $5,000/person Mediterranean sailing.' },
              { scenario: 'Flexible tickets and bookings throughout', detail: 'If every component is refundable or changeable, trip cancellation coverage adds less value.' },
              { scenario: 'You can financially absorb the loss', detail: 'If a complete cancellation wouldn\'t meaningfully hurt you financially, self-insuring is rational.' },
            ].map(({ scenario, detail }) => (
              <div key={scenario} className="flex gap-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[#D4AF37] font-bold text-xl flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{scenario}</p>
                  <p className="text-slate-500 text-sm mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How soon after booking should I buy insurance?',
                a: 'Within 10–21 days of your initial deposit to qualify for pre-existing condition waivers. After that window, you can still buy, but pre-existing condition coverage typically disappears.',
              },
              {
                q: 'Does my credit card insurance replace standalone travel insurance?',
                a: 'Almost never. Credit card trip benefits (including premium cards like Amex Platinum) typically cap at $10,000 for cancellation and $10,000 for medical. Standalone cruise policies can cover $100,000+ in medical and $500,000+ in evacuation.',
              },
              {
                q: 'What does "Cancel for Any Reason" actually mean?',
                a: 'Exactly what it says — you can cancel for any reason, including "I changed my mind," and receive 75% of your trip cost as a cash refund (not cruise credit). You must cancel 48–72 hours before departure and purchase CFAR within 14–21 days of booking.',
              },
              {
                q: 'If Disney cancels or changes my itinerary, do I need insurance?',
                a: 'Disney will refund your cruise fare in that scenario, but won\'t cover your flights, pre-cruise hotel, or planned excursions. Insurance covers those consequential losses.',
              },
              {
                q: 'My child has asthma — do I need special coverage?',
                a: 'Yes. Pre-existing condition waivers are essential if any traveler has a known health condition. Buy within 14–21 days of your first payment and look for policies with "lookback period" waivers.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-3">{q}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides/packing-gear" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Gear</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">The Ultimate Disney Cruise Packing List</p>
            </Link>
            <Link href="/guides/ports" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Ports</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">Disney Cruise Port Guides</p>
            </Link>
            <Link href="/guides/disney-cruise-cost-guide" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Planning</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">The True Cost of a Disney Cruise</p>
            </Link>
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
