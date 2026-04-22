import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Anchor, DollarSign, Star, Clock, MapPin, Users } from 'lucide-react'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const metadata: Metadata = {
  title: "First-Time Disney Cruise Guide: Everything You Need to Know",
  description:
    "Complete guide for first-time Disney cruise guests. What's included, what costs extra, embarkation tips, Pirate Night, Castaway Cay, staterooms, and gratuity guide.",
  keywords: [
    'first time disney cruise',
    'disney cruise guide beginners',
    'disney cruise tips',
    'pirate night disney cruise',
    'castaway cay tips',
    'disney cruise what to expect',
  ],
}

export default function FirstTimeDisneyGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Anchor className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              First Timers
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">
            The First-Time Disney Cruise Guide
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Everything you need to know before you board — from what's included in your fare to
            Pirate Night outfits, Castaway Cay strategy, and exactly how tipping works.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 15 min read</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> All family types</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> All itineraries</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-3 px-4">
        <div className="max-w-4xl mx-auto text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          {' / '}
          <Link href="/guides" className="hover:text-blue-600">Guides</Link>
          {' / First-Time Disney Cruise'}
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* TOC */}
        <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200">
          <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-4">In this guide</h2>
          <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
            {[
              ['#whats-included', "What's Included in Your Fare"],
              ['#costs-extra', 'What Costs Extra'],
              ['#embarkation', 'Embarkation Day Tips'],
              ['#pirate-night', 'Pirate Night'],
              ['#castaway-cay', 'Castaway Cay'],
              ['#staterooms', 'Stateroom Overview'],
              ['#tipping', 'Gratuities & Tipping'],
              ['#faq', 'Common First-Timer Questions'],
            ].map(([href, label], i) => (
              <li key={href} className="flex items-start gap-2">
                <span className="text-blue-400 font-bold text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <a href={href} className="text-blue-600 hover:underline">{label}</a>
              </li>
            ))}
          </ol>
        </div>

        {/* Section: What's included */}
        <section id="whats-included" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-2">
            What's Included in Your Fare
          </h2>
          <p className="text-slate-500 text-sm mb-6">The good news: Disney cruises are much more all-inclusive than they first appear.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: '🍽️', title: 'All Main Dining', desc: 'Rotational dining in 3 main restaurants is included every night, plus breakfast and lunch at buffet and pool-deck options.' },
              { icon: '🎭', title: 'Broadway-Style Shows', desc: 'World-class entertainment including Disney-themed musicals in the Walt Disney Theatre — no tickets or add-ons needed.' },
              { icon: '🏊', title: 'Pools & AquaDuck', desc: 'All pools, waterslides, and AquaDuck (on select ships) included with no reservation or upcharge.' },
              { icon: '🧒', title: 'Kids Clubs (Ages 3–17)', desc: "Disney's Oceaneer Club and Lab offer supervised, immersive play for kids. Free and available until midnight." },
              { icon: '☕', title: 'Non-Alcoholic Beverages', desc: 'Water, juices, milk, coffee, tea, lemonade, and soft drinks available throughout the ship at no charge.' },
              { icon: '🍦', title: 'Room Service (Select Items)', desc: 'Complimentary room service is available 24 hours (certain items; specialty items have a fee).' },
              { icon: '🏖️', title: 'Castaway Cay Beach', desc: "Beach access, lounge chairs, and lunch on Disney's private Bahamian island — no charge for entry or food." },
              { icon: '📺', title: 'Stateroom Entertainment', desc: 'In-cabin TV with Disney movies, ship apps, and onboard information are all included.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="text-2xl mb-2">{icon}</p>
                <p className="font-semibold text-slate-900 text-sm mb-1">{title}</p>
                <p className="text-xs text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: What costs extra */}
        <section id="costs-extra" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-2">
            What Costs Extra
          </h2>
          <p className="text-slate-500 text-sm mb-6">Budget for these — they add up faster than expected.</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Item</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Typical Cost</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Gratuities', '~$15.50/person/night', 'Auto-charged; can be adjusted at Guest Services'],
                  ['Alcoholic beverages', '$10–$18/drink', 'Beer, wine, cocktails charged to cabin account'],
                  ['Specialty dining (Palo/Enchanté)', '$45–$95/person', 'Adults-only; spectacular food — worth it'],
                  ['Shore excursions', '$30–$200/person', 'Through Disney or independent operators'],
                  ['Spa services', '$60–$350', 'Rainforest Room, massages, salon — premium pricing'],
                  ['Onboard photos', '$30–$450 packages', 'Photographers at key moments throughout cruise'],
                  ['Onboard shopping', 'Varies', 'Disney merchandise, sundries, duty-free'],
                  ['Wi-Fi', '$15–$30/day', 'Buy daily passes; cell service is rarely available at sea'],
                  ['Castaway Cay water sports', '$45–$140', 'Parasailing, jet skis, stingray encounters'],
                  ['Specialty beverages', '$5–$12', 'Barista coffees, smoothies, specialty juices'],
                ].map(([item, cost, note], i) => (
                  <tr key={item} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-medium text-slate-900">{item}</td>
                    <td className="px-4 py-3 text-slate-700">{cost}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-slate-700">
              <strong>Budget tip:</strong> A typical family of 4 on a 7-night cruise spends $800–$1,500
              extra beyond the cruise fare on gratuities, dining, excursions, and drinks. Use our{' '}
              <Link href="/tools/cruise-cost-calculator" className="text-blue-600 underline">
                cost calculator
              </Link>{' '}
              to build a full estimate.
            </p>
          </div>
        </section>

        {/* Section: Embarkation */}
        <section id="embarkation" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Embarkation Day Tips
          </h2>

          <p className="text-slate-600 mb-6">
            Embarkation day sets the tone for your entire cruise. First-timers often make avoidable
            mistakes that cost them hours of fun.
          </p>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Complete Online Check-In Early (Up to 30 Days Out)',
                body: 'Disney\'s online check-in opens 30 days before sailing for Platinum/Gold Castaway Club members and rolls out to everyone. Complete it the moment it opens. You\'ll upload passport photos, provide credit card info, and select your Port Arrival Time (PAT). Earlier PATs board first — get the earliest time available.',
              },
              {
                step: '02',
                title: 'Arrive at Your Port Arrival Time (Not Earlier)',
                body: 'Disney enforces your PAT window — showing up 2 hours early won\'t get you on faster. Arrive within your 30-minute window, check your bags with porters outside the terminal (tip $1–2/bag), and bring a small carry-on with bathing suits, sunscreen, and snacks for your kids.',
              },
              {
                step: '03',
                title: 'Listen for Your Family\'s Name When Boarding',
                body: 'When your group walks up the gangway, cast members announce your family name to the entire ship. It\'s a Disney tradition — "Welcome aboard, the Johnson family!" — and it never gets old. Tell your kids to listen for it.',
              },
              {
                step: '04',
                title: "Head to the Pool Deck Immediately",
                body: 'Cabins aren\'t ready until 1:30–2:00 PM. Go straight to the pool deck — it\'s the least crowded it will be for the whole cruise. Get your kids in the water, grab lunch at Cabanas (buffet), and start booking activities and specialty dining via the Disney Cruise Line app.',
              },
              {
                step: '05',
                title: 'Book Specialty Dining and Spa Appointments via the App',
                body: 'Palo and Enchanté fill up fast on embarkation day. Open the DCL app as soon as you board and book specialty dining, Bibbidi Bobbidi Boutique appointments (for little ones), and spa treatments. These often book up within the first hour of boarding.',
              },
              {
                step: '06',
                title: 'Attend the Muster Drill',
                body: 'Mandatory for all guests before the ship departs. Watch the safety video in your cabin, then check in at your muster station (shown on your Key to the World card). This typically takes 20–30 minutes. Failure to check in delays departure for everyone.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white font-bold text-sm rounded-full flex items-center justify-center flex-shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-fraunces font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Pirate Night */}
        <section id="pirate-night" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">
            Pirate Night
          </h2>
          <p className="text-slate-600 mb-6">
            One evening on every Disney cruise is designated Pirate Night — one of the most
            memorable experiences Disney offers at sea. Don't miss it or skip the costume.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 text-white rounded-xl p-6">
              <h3 className="font-fraunces font-bold mb-3 text-yellow-400">What Happens</h3>
              <ul className="text-sm space-y-2 text-slate-300">
                <li>• Dinner in main dining rooms with pirate-themed menu and characters</li>
                <li>• Deck party led by Jack Sparrow with live music</li>
                <li>• Fireworks at sea (most sailings) — usually midnight</li>
                <li>• Characters dressed in pirate attire for photos</li>
                <li>• Free pirate bandana for all guests at dinner</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-fraunces font-bold text-slate-900 mb-3">Costume Tips</h3>
              <ul className="text-sm space-y-2 text-slate-600">
                <li>• <strong>Everyone</strong> dresses up — even adults without costumes feel out of place</li>
                <li>• Simple works: pirate hat + striped shirt + bandana</li>
                <li>• Pack costumes in carry-on (not checked luggage) in case bags are delayed</li>
                <li>• Arrive on deck 30+ minutes early for fireworks — crowds get huge</li>
                <li>• The deck party is free and open to all ages</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Castaway Cay */}
        <section id="castaway-cay" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">
            Castaway Cay
          </h2>
          <p className="text-slate-600 mb-6">
            Disney's private Bahamian island is included with most Caribbean and Bahamas sailings.
            First-timers consistently rate it the highlight of the cruise.
          </p>

          <div className="space-y-4 mb-6">
            {[
              { q: 'When can I get off the ship?', a: 'Disembarkation begins around 8:00 AM. Get off as early as possible — the island is least crowded in the first two hours.' },
              { q: 'Is lunch included?', a: 'Yes. Cookies BBQ (Family Beach) and Cookies Too (Serenity Bay) serve a full BBQ lunch included in your cruise fare from about 11:30 AM–3:30 PM.' },
              { q: 'What activities are free?', a: 'Beach access, lounge chairs, the Flying Dutchman waterslide, the 5K run, snorkeling (gear rents for ~$12), bike rides, and the tram.' },
              { q: 'What activities cost extra?', a: 'Parasailing ($95–130), jet skis ($140+), stingray encounter ($45), paddleboards, and kayaks.' },
              { q: 'What should I bring?', a: 'Reef-safe sunscreen, water shoes, a waterproof phone case, cash for drinks/activities, and your Key to the World card.' },
              { q: 'When must I be back on the ship?', a: 'All Aboard is typically 4:15–4:30 PM. Be back at the gangway by 4:00 PM to be safe.' },
            ].map(({ q, a }) => (
              <details key={q} className="border border-slate-200 rounded-lg p-4 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between text-sm">
                  {q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 text-sm mt-3 pt-3 border-t border-slate-100">{a}</p>
              </details>
            ))}
          </div>

          <Link href="/guides/castaway-cay-guide" className="text-blue-600 hover:underline text-sm font-medium">
            Read the full Castaway Cay guide →
          </Link>
        </section>

        {/* Section: Staterooms */}
        <section id="staterooms" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Stateroom Overview
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {[
              { type: 'Inside Stateroom', size: '~169–204 sq ft', price: '$$$', pros: 'Most affordable, complete blackout for sleeping, great for kids', cons: 'No natural light, feels small for longer sailings' },
              { type: 'Oceanview Stateroom', size: '~170–214 sq ft', price: '$$$$', pros: 'Natural light, porthole or picture window, affordable upgrade', cons: 'Window doesn\'t open, can\'t step outside' },
              { type: 'Verandah (Balcony)', size: '~204–268 sq ft', price: '$$$$$', pros: 'Private balcony, sea views, great for couples and relaxing', cons: 'Balconies are small, more expensive' },
              { type: 'Concierge Class', size: '~246–622 sq ft', price: '$$$$$$', pros: 'Dedicated team, priority boarding, exclusive lounge, best locations', cons: 'Very expensive — often 2–3x standard cabin price' },
            ].map(({ type, size, price, pros, cons }) => (
              <div key={type} className="border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-fraunces font-bold text-slate-900">{type}</h3>
                  <span className="text-yellow-500 text-sm font-bold">{price}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{size}</p>
                <div className="mb-2">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Pros</p>
                  <p className="text-xs text-slate-600">{pros}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-1">Cons</p>
                  <p className="text-xs text-slate-600">{cons}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/guides/stateroom-comparison" className="text-blue-600 hover:underline text-sm font-medium">
            See full stateroom comparison with photos and pricing →
          </Link>
        </section>

        {/* Section: Tipping */}
        <section id="tipping" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">
            Gratuities & Tipping
          </h2>

          <p className="text-slate-600 mb-6">
            Disney auto-charges gratuities to your stateroom account at approximately{' '}
            <strong>$15.50 per person per night</strong>. For a family of 4 on a 7-night cruise,
            that's $434 added to your bill. Here's what it covers and when to tip extra:
          </p>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
            <h3 className="font-fraunces font-bold text-slate-900 mb-4">Auto-Gratuity Breakdown</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                ['Dining Room Server', '$4.50/person/night'],
                ['Assistant Server', '$3.50/person/night'],
                ['Head Server', '$1.00/person/night'],
                ['Stateroom Host/Hostess', '$4.50/person/night'],
                ['Other services', '$2.00/person/night'],
              ].map(([role, amount]) => (
                <div key={role} className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-700">{role}</span>
                  <span className="font-semibold text-slate-900">{amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-slate-700">
              <strong>Can you adjust gratuities?</strong> Yes — visit Guest Services before the
              final day to increase, decrease, or reallocate tips. Cash tips to individual crew
              members are always welcomed on top of auto-gratuities. Spa staff, excursion guides,
              and bartenders are not included in the auto-gratuity — tip them individually.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-14">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Common First-Timer Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Do I need a passport?', a: 'For most international sailings (Bahamas, Caribbean, Europe), yes — bring a valid passport. On closed-loop US sailings (departing and returning to the same US port), US citizens can sail with a birth certificate + government-issued ID, but a passport is strongly recommended.' },
              { q: 'Is Disney Cruise better than other cruise lines?', a: 'Disney Cruise Line consistently earns top marks for service, entertainment, and family experience. It\'s more expensive than most cruise lines but generally exceeds expectations — especially for families with young children who respond to Disney characters and theming.' },
              { q: 'How early should I book?', a: 'Book as early as possible — 12–18 months out for peak summer sailings and holiday cruises. Early booking gets you the best cabin selection and pricing. Prices typically rise as the sail date approaches.' },
              { q: 'Do kids eat free?', a: 'Yes — children eat the same included meals as adults. Kids\' menus are available at all main dining restaurants, and kids eat whatever they want from the buffets at no charge.' },
              { q: 'What\'s the minimum age for kids clubs?', a: 'Oceaneer Club is for ages 3–12 (must be potty-trained). Teens have Edge (ages 11–14) and Vibe (ages 14–17). The Nursery accepts children 6 months to 3 years old for a fee.' },
              { q: 'Can adults have time alone?', a: 'Absolutely. With kids in the free clubs and teens in their own spaces, adults can enjoy Palo, the adult pool area, the spa, and nightly adult entertainment. Disney ships are one of the best cruise lines for balancing family and adult time.' },
            ].map(({ q, a }) => (
              <details key={q} className="border border-slate-200 rounded-xl p-5 group">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{q}</span>
                  <span className="text-blue-600 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-600 text-sm mt-4 pt-4 border-t border-slate-100 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup className="mb-12" />

        {/* Related guides */}
        <section className="bg-slate-50 rounded-xl p-8 border border-slate-200">
          <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-5">Keep Planning</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['/blog/disney-cruise-packing-list', 'Ultimate Packing List'],
              ['/guides/stateroom-comparison', 'Stateroom Comparison'],
              ['/tools/cruise-cost-calculator', 'Cruise Cost Calculator'],
              ['/travel-hacks/best-cruise-credit-cards', 'Best Credit Cards for Cruises'],
              ['/guides/castaway-cay-guide', 'Castaway Cay Guide'],
              ['/blog/disney-cruise-food-guide', 'Food & Dining Guide'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition text-sm"
              >
                <span className="font-medium text-slate-900">{label}</span>
                <span className="text-blue-600">→</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
