import { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const metadata: Metadata = {
  title: 'First-Timer\'s Guide to Disney Cruises 2026 | GatGridCruises',
  description:
    'Everything first-time Disney cruisers need to know — what\'s included, what costs extra, embarkation day tips, Pirate Night, Castaway Cay, stateroom types, tipping, and more.',
  openGraph: {
    title: 'First-Timer\'s Complete Guide to Disney Cruises (2026)',
    description:
      'What\'s included in the fare, what costs extra, embarkation tips, Pirate Night, Castaway Cay, stateroom comparisons, and gratuity guide.',
    type: 'article',
    url: 'https://gatgridcruises.com/guides/first-time-disney-cruise',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "First-Timer's Complete Guide to Disney Cruises (2026)",
    description: "What's included in the fare, what costs extra, embarkation tips, Pirate Night, Castaway Cay, stateroom comparisons, and gratuity guide.",
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function FirstTimeDisneyCruisePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-blue-300 mb-3 font-medium">Guides · First-Time Cruisers</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            First-Timer&apos;s Complete Guide to Disney Cruises
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
            Disney cruises are genuinely magical — but there&apos;s a lot to know before you go.
            This guide covers everything from what&apos;s included to what will surprise you on embarkation day.
          </p>
          <div className="flex flex-wrap gap-3 mt-6 text-sm text-blue-200">
            <span className="px-3 py-1 bg-white/10 rounded-full">What&apos;s Included</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">What Costs Extra</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Embarkation Tips</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Pirate Night</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Castaway Cay</span>
            <span className="px-3 py-1 bg-white/10 rounded-full">Tipping</span>
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

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Table of Contents */}
        <nav className="bg-[#1E3A5F]/10 border border-blue-200 rounded-xl p-5 mb-10">
          <h2 className="font-display text-base font-bold text-blue-900 mb-3">In This Guide</h2>
          <ol className="space-y-1.5">
            {[
              ['#whats-included', "What's Included in Your Fare"],
              ['#what-costs-extra', 'What Costs Extra'],
              ['#embarkation', 'Embarkation Day Tips'],
              ['#pirate-night', 'Pirate Night Explained'],
              ['#castaway-cay', 'Castaway Cay Overview'],
              ['#staterooms', 'Stateroom Types (Inside vs Verandah)'],
              ['#tipping', 'Tipping & Gratuity Guide'],
              ['#tools', 'Helpful Tools on This Site'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-sm text-blue-700 hover:text-blue-900 hover:underline">
                  → {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* What's Included */}
        <section id="whats-included" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">What&apos;s Included in Your Fare</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Disney cruises are an all-inclusive experience — to a point. The fare covers more than most people realize, which is why the price feels high compared to a hotel stay but often delivers more value.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                category: 'Dining',
                items: [
                  'Rotational dining (3 restaurants, new menu each night)',
                  'Buffet breakfast, lunch, and dinner (Cabanas)',
                  'Quick-service poolside food (burgers, pizza, hot dogs)',
                  'Room service (most items free, some premium charges)',
                  '24-hour soft-serve ice cream',
                ],
              },
              {
                category: 'Entertainment',
                items: [
                  'Broadway-style shows in the main theater (nightly)',
                  'First-run movies in the Walt Disney Theatre',
                  'Deck parties (Pirate Night, character deck parties)',
                  'Character meet-and-greets throughout the ship',
                  'Live music and comedy shows',
                ],
              },
              {
                category: 'Kids Clubs',
                items: [
                  'Oceaneer Club (ages 3–12) — supervised, themed activities',
                  'Edge (ages 11–14) — teen-focused lounge',
                  'Vibe (ages 14–17) — adults-only teen space',
                  "It's a Small World Nursery (infants & toddlers, fee applies)",
                ],
              },
              {
                category: 'Pools & Recreation',
                items: [
                  'Multiple pools (including AquaDuck water coaster on some ships)',
                  'AquaLab water play area for kids',
                  'Fitness center access',
                  'Mini golf on some ships',
                  'Ping pong, basketball courts, jogging track',
                ],
              },
            ].map((section) => (
              <div key={section.category} className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h3 className="font-semibold text-emerald-900 mb-3">{section.category}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-emerald-800">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* What Costs Extra */}
        <section id="what-costs-extra" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">What Costs Extra</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            This is where the budget creep happens. Know these in advance so you can plan (or avoid them).
          </p>
          <div className="space-y-4">
            {[
              {
                item: 'Port Excursions',
                cost: '$30–$400+ per person',
                note: 'Disney-booked excursions are convenient but pricey. Independent operators at port are often 30–50% cheaper.',
              },
              {
                item: 'Palo (adults-only Italian restaurant)',
                cost: '$45 per person',
                note: 'Available on most ships. Book at 75-day mark for Platinum/Gold members, later for standard. Extremely popular — reserve ASAP.',
              },
              {
                item: 'Remy / Enchanté (fine dining)',
                cost: '$125+ per person',
                note: 'Not on all ships. The most upscale dining experience on Disney ships. Worth it for a special occasion.',
              },
              {
                item: 'Alcoholic Beverages',
                cost: '$10–$20 per drink or $69/person/day package',
                note: 'Beer, wine, and spirits are not included. You can bring 2 bottles of wine or 6 cans of beer per adult aboard at embarkation.',
              },
              {
                item: 'Bibbidi Bobbidi Boutique (princess makeover)',
                cost: '$85–$450',
                note: 'Highly popular with young girls. Book early — slots fill within hours of opening.',
              },
              {
                item: 'Senses Spa',
                cost: '$100–$300+ per treatment',
                note: 'Massages, facials, and hair services. Price is premium. Watch for "port day specials" when prices drop.',
              },
              {
                item: 'Photo Package',
                cost: '$199 basic, $399 premium',
                note: 'Disney photographers roam the ship constantly. Packages unlock all your photos. Without a package, individual prints are $20–30 each.',
              },
              {
                item: 'Internet / Wi-Fi',
                cost: '$12–$28 per day',
                note: 'Ship Wi-Fi is satellite-based and slow. Consider a social-only package for Instagram, or just disconnect and enjoy the cruise.',
              },
              {
                item: 'Laundry',
                cost: '$3–$4 per cycle',
                note: 'Coin-operated laundry is available on most ships. Useful for longer sailings.',
              },
              {
                item: 'Gratuities',
                cost: '$14.50 per person per night',
                note: 'Automatically charged to your stateroom account. Covers your dining staff and stateroom host. See the tipping section below.',
              },
            ].map((item) => (
              <div key={item.item} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-red-400 text-lg flex-shrink-0 mt-0.5">$</div>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">{item.item}</span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.cost}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Embarkation Day */}
        <section id="embarkation" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Embarkation Day Tips</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Embarkation day is chaotic but exciting. These tips make it smooth.
          </p>
          <div className="space-y-4">
            {[
              {
                number: '1',
                title: 'Arrive at your assigned Port Arrival Time (PAT)',
                body: "Disney assigns you a specific port arrival window. Showing up early won't speed things up — you'll wait in a holding area. Showing up at your window means walking straight to check-in.",
              },
              {
                number: '2',
                title: 'Complete Online Check-In at the 75-day mark',
                body: "Online check-in opens 75 days before sailing for most guests. Complete it immediately to get the earliest PAT options. You'll also upload your passport photo and select dining times.",
              },
              {
                number: '3',
                title: 'Eat breakfast before you board',
                body: "Staterooms aren't ready until 1:30pm. Embarkation lunch at Cabanas gets extremely crowded. Eat before you arrive at the port and skip the chaos.",
              },
              {
                number: '4',
                title: 'Carry on your essentials',
                body: 'Checked luggage arrives at your stateroom hours after you board. Pack swimsuits, medications, valuables, and anything you need for the afternoon in your carry-on.',
              },
              {
                number: '5',
                title: 'Download the Disney Cruise Line Navigator app before boarding',
                body: "You won't have cell service at sea. Download the app and connect to ship Wi-Fi (free for the Navigator app). It controls everything: reservations, daily schedule, messaging, and ship maps.",
              },
              {
                number: '6',
                title: 'Go straight to make reservations when you board',
                body: 'Palo and spa reservations fill up in the first hour of boarding. Head straight to the reservation desk on the ship before anything else.',
              },
              {
                number: '7',
                title: 'Attend the muster drill (mandatory)',
                body: "Safety muster is required before sailing. It's now done via the Navigator app at your own pace — much better than the old assembly-line version. Complete it early to avoid reminders.",
              },
            ].map((tip) => (
              <div key={tip.number} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {tip.number}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{tip.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pirate Night */}
        <section id="pirate-night" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Pirate Night Explained</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            <div className="text-4xl mb-4">☠️</div>
            <p className="text-slate-300 mb-5 leading-relaxed">
              Pirate Night is one of Disney Cruise Line&apos;s most beloved traditions. It typically happens on
              one evening of your sailing (usually the second-to-last night on 7-night cruises, or a designated night on shorter sailings).
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Dress like a pirate',
                  body: "The entire ship goes into costume — passengers and crew alike. Adult pirates, kid pirates, Disney character pirates. Go all out. People who don't dress up feel like the odd ones out. Amazon has great costumes for under $30.",
                },
                {
                  title: 'Deck party with Jack Sparrow',
                  body: "There's a giant deck party with live music, dancing, and Captain Jack Sparrow making an appearance. The party culminates in fireworks over the open ocean.",
                },
                {
                  title: 'Fireworks at sea',
                  body: 'Disney is the only cruise line allowed to launch fireworks at sea. The Pirate Night fireworks show over the open ocean is genuinely spectacular. Find a good deck spot early.',
                },
                {
                  title: 'Special pirate dinner',
                  body: 'Rotational dining on Pirate Night often features a special pirate-themed menu. The Cabanas buffet also gets a pirate makeover.',
                },
                {
                  title: 'Limited-edition Pirate Night merchandise',
                  body: 'Special Pirate Night shirts, bandanas, and accessories are sold onboard. Kids especially love wearing their pirate gear for photos.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-amber-500 pl-4">
                  <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Castaway Cay */}
        <section id="castaway-cay" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Castaway Cay: Disney&apos;s Private Island</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Castaway Cay is Disney&apos;s private island in the Bahamas, and it&apos;s a reason to choose Disney over other cruise lines.
            Most Caribbean and Bahamas itineraries stop here for a full day.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "What's Included",
                color: 'emerald',
                items: [
                  'Unlimited use of the beach (Serenity Bay for adults, Family Beach)',
                  'Lounge chairs and umbrellas',
                  'Beach towels from the ship',
                  'Free water slides',
                  'Character meet-and-greets on the island',
                  'Disney-themed activities and games',
                ],
              },
              {
                title: 'What Costs Extra',
                color: 'red',
                items: [
                  'Snorkel gear rental (~$25+)',
                  'Bike rentals',
                  'Cabana rentals ($500–700+)',
                  'Clam shell rentals',
                  'Water sports equipment',
                  'Parasailing',
                ],
              },
            ].map((section) => (
              <div key={section.title} className={`p-5 rounded-xl border ${section.color === 'emerald' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <h3 className={`font-semibold mb-3 ${section.color === 'emerald' ? 'text-emerald-900' : 'text-red-900'}`}>{section.title}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${section.color === 'emerald' ? 'text-emerald-800' : 'text-red-800'}`}>
                      <span className={`mt-0.5 flex-shrink-0 ${section.color === 'emerald' ? 'text-emerald-500' : 'text-red-400'}`}>
                        {section.color === 'emerald' ? '✓' : '·'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="font-semibold text-amber-900 mb-2 text-sm">Pro Tips for Castaway Cay</h3>
            <ul className="space-y-1.5">
              {[
                'Be one of the first off the ship — the best beach chairs and food lines fill up fast.',
                'Bring your own snorkel gear to save $25+ per person.',
                'The Serenity Bay adult beach is worth the 5-minute tram ride — calmer and less crowded.',
                "The swim trail at the family beach has fish and small coral — it's free snorkeling without a mask.",
                "Don't take sand or shells home — it's a protected area.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-xs text-amber-800">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Staterooms */}
        <section id="staterooms" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Stateroom Types: Which Should You Choose?</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            There are four main stateroom categories. Here&apos;s the honest breakdown:
          </p>
          <div className="space-y-4">
            {[
              {
                type: 'Inside Cabin',
                price: 'Lowest',
                sqft: '169–214 sq ft',
                best: 'Budget-conscious families; those who rarely spend time in the stateroom',
                pros: ['Significantly cheaper', 'Blackout-dark for great sleep', 'Same ship, shows, dining access'],
                cons: ['No window — can feel claustrophobic', 'No natural light cues for time'],
              },
              {
                type: 'Oceanview',
                price: 'Low–Mid',
                sqft: '214–268 sq ft',
                best: 'Those who want natural light without the price of a balcony',
                pros: ['Porthole or larger window', 'Natural light and ocean view', 'More space than inside'],
                cons: ["Can't open the window", 'No outdoor space'],
              },
              {
                type: 'Verandah',
                price: 'Mid–High',
                sqft: '268–304 sq ft',
                best: 'Most families — the most popular and most-recommended stateroom',
                pros: ['Private balcony for sea days', 'Extra space to relax', 'Worth every penny on at-sea days'],
                cons: ['Significantly more expensive', 'Not all balconies have the same views'],
              },
              {
                type: 'Concierge',
                price: 'Premium',
                sqft: '304–1,781 sq ft',
                best: 'Luxury travelers; those who want white-glove service and maximum space',
                pros: ['Dedicated concierge host', 'Priority boarding and reservations', 'Access to exclusive lounges', 'Best stateroom locations on the ship'],
                cons: ["Very expensive — 2–4x the cost of verandah", "Most of the benefits overlap with what's already included"],
              },
            ].map((room) => (
              <div key={room.type} className="p-5 bg-white border border-slate-200 rounded-xl">
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <h3 className="font-bold text-slate-900">{room.type}</h3>
                  <span className="text-xs font-semibold text-blue-600 bg-[#1E3A5F]/10 px-2 py-0.5 rounded">{room.sqft}</span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Price: {room.price}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">Best for: {room.best}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-semibold text-emerald-700 mb-1">Pros</div>
                    <ul className="space-y-1">
                      {room.pros.map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <span className="text-emerald-500 flex-shrink-0">+</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-600 mb-1">Cons</div>
                    <ul className="space-y-1">
                      {room.cons.map((c) => (
                        <li key={c} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <span className="text-red-400 flex-shrink-0">−</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/guides/stateroom-comparison" className="text-sm text-blue-600 hover:underline font-medium">
              See our full stateroom comparison with price ranges →
            </Link>
          </div>
        </section>

        {/* Tipping */}
        <section id="tipping" className="mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Tipping & Gratuity Guide</h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <p className="text-slate-600 mb-5 leading-relaxed">
              Disney auto-charges gratuities at <strong>$14.50 per person per night</strong>, split among your dining team and stateroom host.
              This is standard and expected — do not skip it unless service was genuinely poor.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="p-3 font-semibold text-slate-700 rounded-tl-lg">Team Member</th>
                    <th className="p-3 font-semibold text-slate-700">Standard Gratuity</th>
                    <th className="p-3 font-semibold text-slate-700 rounded-tr-lg">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { role: 'Head Server', tip: '$5.50/person/night', note: 'Leads your dining team — very visible' },
                    { role: 'Dining Server', tip: '$4.50/person/night', note: 'Your main server at rotational dining' },
                    { role: 'Server Assistant', tip: '$3.00/person/night', note: 'Busser, water refills, table resets' },
                    { role: 'Stateroom Host', tip: '$4.50/person/night', note: 'Cleans your room twice daily + towel animals' },
                    { role: 'Spa, bar staff, Palo', tip: '18% added automatically', note: 'Separate from auto-gratuity; already added to receipts' },
                  ].map((row) => (
                    <tr key={row.role}>
                      <td className="p-3 font-medium text-slate-900">{row.role}</td>
                      <td className="p-3 text-slate-700">{row.tip}</td>
                      <td className="p-3 text-slate-500 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 p-4 bg-[#1E3A5F]/10 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 text-sm mb-1">Should you tip extra?</h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                Yes, if service was great. Cash envelopes are distributed on the last night — bring $10–$20 per exceptional crew member.
                The crew is overwhelmingly excellent and a small extra tip genuinely makes their month.
              </p>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section id="tools" className="mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Free Tools to Plan Your Cruise</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Cruise Cost Calculator',
                description: 'Estimate your fare based on ship, stateroom, length, and party size.',
                href: '/tools/cruise-cost-calculator',
              },
              {
                title: 'Full Trip Cost Calculator',
                description: 'Include flights, hotels, excursions, and onboard extras.',
                href: '/tools/cost-calculator',
              },
              {
                title: 'Packing List',
                description: 'Complete packing list with Amazon links and what Disney provides.',
                href: '/blog/disney-cruise-packing-list',
              },
              {
                title: 'Stateroom Comparison',
                description: 'Side-by-side comparison of all Disney cruise stateroom categories.',
                href: '/guides/stateroom-comparison',
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-5 bg-white border border-slate-200 hover:border-blue-400 rounded-xl transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 mb-1 text-sm">{tool.title} →</h3>
                <p className="text-xs text-slate-500">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <NewsletterSignup className="mb-12" />
      </div>
    </div>
  )
}
