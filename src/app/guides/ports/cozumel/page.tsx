import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Waves, Hotel } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Cozumel Cruise Guide — Disney Cruise Port Tips & Excursions',
  description: 'Everything you need to know about Cozumel on a Disney cruise — top excursions, Palancar Reef snorkeling, Chichen Itza day trips, best restaurants, and insider tips.',
  keywords: ['cozumel disney cruise', 'cozumel cruise guide', 'palancar reef snorkeling', 'cozumel excursions', 'chichen itza day trip cozumel', 'disney cruise western caribbean'],
}

export default function CozumelPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Link href="/guides" className="text-blue-300 hover:text-[#D4AF37] text-sm transition-colors">Guides</Link>
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <Link href="/guides/ports" className="text-blue-300 hover:text-[#D4AF37] text-sm transition-colors">Port Guides</Link>
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">Cozumel</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🇲🇽</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Cozumel, Mexico
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Quintana Roo, Mexico — Western Caribbean's jewel</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Cozumel is where the Western Caribbean itinerary earns its reputation. Home to the
            second-largest coral reef system on earth, world-class diving and snorkeling, Mayan
            history, and some of the freshest seafood in Mexico — this is the port Disney families
            consistently rate highest on 7-night sailings.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Typical Port Time', value: '7–9 hours', icon: '⏱️' },
              { label: 'Reef Type', value: 'Mesoamerican Barrier', icon: '🐠' },
              { label: 'Currency', value: 'Mexican Peso / USD', icon: '💵' },
              { label: 'From Pier to Town', value: '5 min walk or taxi', icon: '🚕' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="text-center">
                <span className="text-2xl" aria-hidden="true">{icon}</span>
                <p className="font-bold text-[#1E3A5F] text-xl mt-1">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect in Cozumel</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Cozumel is an island off the Yucatán Peninsula — separated from the mainland by the
              Cozumel Channel, which is itself part of the Mesoamerican Barrier Reef. The island's
              western coast (where cruise ships dock) offers protected, calm, brilliantly clear water.
              The eastern coast is wild Atlantic ocean, mostly inaccessible and untouched.
            </p>
            <p>
              Disney ships dock at the International Pier, one of three major cruise piers on
              the island's western edge. Downtown San Miguel is a short walk or taxi from the pier —
              a colorful, walkable town with excellent restaurants, independent dive shops, silver
              jewelry, and authentic Mexican food that costs a fraction of resort prices.
            </p>
            <p>
              Cozumel is the most activity-oriented port on DCL's Western Caribbean routes. Guests
              who book nothing tend to miss what makes it extraordinary: the underwater world is
              genuinely unlike anywhere else in the Caribbean. Even non-divers can see world-class
              coral on shallow snorkel tours.
            </p>
          </div>
        </div>
      </section>

      {/* Top Excursions */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Waves className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-white">Top Cozumel Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">Ranked by value and popularity for Disney cruise families.</p>

          <div className="space-y-4">
            {[
              {
                rank: '01',
                name: 'Palancar Reef Snorkel Tour',
                type: 'Snorkeling',
                time: '3–4 hours',
                price: '~$45–$65/adult',
                description: 'Palancar is one of the most famous reef systems in the world — dramatic coral formations, turtles, eagle rays, moray eels, and hundreds of fish species in 10–30 feet of crystal clear water. Any reputable local operator can run you here. Absolutely do not miss this if you snorkel.',
                tip: 'Book with local operators (Aqua Safari, Fury Catamaran, Cozumel Snorkel) at half the price of DCL-booked tours. Meet point is a 5-minute taxi from the pier.',
              },
              {
                rank: '02',
                name: 'Scuba Diving (certified divers)',
                type: 'Diving',
                time: '2–3 hours per dive',
                price: '~$65–$90 for 2-tank dive',
                description: 'Cozumel has some of the top 10 dive sites in the world. Santa Rosa Wall, Columbia Reef, and Palancar Gardens are drift dives with extraordinary visibility (100+ feet) and life. Every dive shop on the island runs excellent operations.',
                tip: 'Cozumel diving favors drift divers — current-assisted, you cover more reef. Alert your dive master to your experience level before entering.',
              },
              {
                rank: '03',
                name: 'Chichen Itza Day Trip',
                type: 'Cultural / Adventure',
                time: 'Full day (12–14 hrs)',
                price: '~$120–$180/person',
                description: 'One of the Seven Wonders of the World — the Mayan city of Chichen Itza is 3.5 hours from the Playa del Carmen ferry terminal. A full-day commitment: ferry from Cozumel to mainland Playa del Carmen, then bus/van to the site. Extraordinary experience, but only for guests with a very long port day (9+ hours).',
                tip: 'Only attempt this if your ship docks by 8 AM and sails after 6 PM. Miss the ship, and you\'re flying home from Cancún.',
              },
              {
                rank: '04',
                name: 'Dolphin Discovery Cozumel',
                type: 'Animal Encounter',
                time: '1–2 hours',
                price: '~$75–$175/person',
                description: 'Structured dolphin encounter in a natural sea pen — swim with, kiss, and ride dolphins under certified trainer guidance. High-quality operation with strong safety standards. Popular with families who have kids aged 5–14.',
                tip: 'Book directly through Dolphin Discovery — DCL-booked tours are identical but cost more. Water shoes required.',
              },
              {
                rank: '05',
                name: 'El Cedral Mayan Ruins (local)',
                type: 'Cultural',
                time: '1–2 hours',
                price: 'Free with taxi (~$10 round trip)',
                description: 'Cozumel\'s own Mayan ruins, right on the island. Much smaller than Chichen Itza, but genuinely old (600 CE) and easily accessed with a short taxi ride. Excellent as a quick cultural stop paired with a beach day, for far less money than a full mainland day trip.',
                tip: 'Combine with Playa Palancar beach club — 15 minutes further by taxi, same road, and you get ruins + beach in one half-day.',
              },
              {
                rank: '06',
                name: 'ATV and Jungle Zip-Line Adventure',
                type: 'Adventure',
                time: '3–4 hours',
                price: '~$65–$100/person',
                description: 'Off-road ATVs through the Cozumel jungle, zip-line platforms over cenotes, and often a snorkel stop included. Great for adventure-seeking families with kids 10+. Multiple operators run similar packages — prices are negotiable at the pier.',
                tip: 'Closed-toe shoes required for ATVs. Wear clothes you don\'t mind getting muddy.',
              },
            ].map(({ rank, name, type, time, price, description, tip }) => (
              <div key={name} className="bg-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-fraunces text-2xl font-bold text-[#D4AF37] flex-shrink-0">{rank}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg leading-tight">{name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="text-xs bg-white/20 text-blue-100 px-2.5 py-0.5 rounded-full">{type}</span>
                      <span className="text-xs text-blue-200">{time}</span>
                      <span className="text-xs font-semibold text-[#D4AF37]">{price}</span>
                    </div>
                  </div>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-3">{description}</p>
                <div className="flex items-start gap-2 bg-white/10 rounded-lg p-3">
                  <span className="text-[#D4AF37] font-bold text-sm flex-shrink-0">Pro tip:</span>
                  <p className="text-blue-200 text-sm">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">Where to Eat in Cozumel</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Cozumel has some of the best cruise port dining in the Caribbean. Skip the pier-area chain
            restaurants and walk 10 minutes to San Miguel for the real thing.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'La Choza',
                type: 'Traditional Mexican',
                why: 'Beloved by locals and experienced cruisers alike. Enormous portions of authentic Yucatecan food — cochinita pibil, fish tacos, chiles rellenos — at prices that seem impossibly low. 15-minute walk from the pier.',
              },
              {
                name: 'Taqueria La Choza (street cart version)',
                type: 'Tacos',
                why: 'For $1–$2 USD per taco, you\'ll eat the freshest fish tacos of your life. Located near the town square. The line moves fast and the quality is incredible.',
              },
              {
                name: 'Guido\'s Restaurant',
                type: 'Pizza & Italian',
                why: 'Cozumel\'s most beloved restaurant — surprising for a Mexican port, but the wood-fired pizza and handmade pasta are extraordinary. Great for families with picky eaters. Reservations on weekends.',
              },
              {
                name: 'Rock\'n Java',
                type: 'Café & Breakfast',
                why: 'Waterfront café right in San Miguel. Best coffee in Cozumel, excellent açaí bowls and smoothies, great wifi. Perfect pre-excursion stop.',
              },
            ].map(({ name, type, why }) => (
              <div key={name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full font-medium">{type}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Hotels */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Hotel className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Hotels Near Cozumel Port</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Extending your trip in Cozumel or pre/post cruise? The island has excellent dive-focused
            resorts and boutique hotels near the action.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'Iberostar Cozumel',
                tier: 'All-Inclusive Resort',
                location: 'Southern coast, 20 min from pier',
                why: 'All-inclusive beachfront resort with excellent house reef right off the dock — snorkel or dive without a boat. Best rooms are the "Wave" category facing the water.',
              },
              {
                name: 'Hotel Cozumel and Resort',
                tier: 'Mid-Range',
                location: 'San Miguel, 5 min from pier',
                why: 'Central location, affordable, well-reviewed staff. The rooftop infinity pool overlooks the harbor where cruise ships dock. Ideal for a short extension stay.',
              },
              {
                name: 'Casa del Mar Cozumel',
                tier: 'Dive Resort',
                location: 'Downtown waterfront',
                why: 'One of the oldest dive resorts on the island, run by certified dive professionals. Multiple dive packages available. Close to the ferry to Playa del Carmen. Best for divers.',
              },
              {
                name: 'Presidente InterContinental Cozumel',
                tier: 'Luxury',
                location: '10 min south of pier',
                why: 'The best rooms on the island. Private beach, two excellent restaurants, direct reef access for snorkeling, and impeccable service. Significantly more expensive but worth it for a special occasion.',
              },
            ].map(({ name, tier, location, why }) => (
              <div key={name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium">{tier}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{location}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Cozumel Insider Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Negotiate at the pier — everything is negotiable', detail: 'Taxi fares, excursion prices, and souvenir prices are all starting points. Politely countering with 20–30% less is expected and accepted.' },
              { tip: 'Buy silver in Cozumel, not at the pier shops', detail: 'Real Mexican silver (92.5%) is available at shop interiors in San Miguel for half the pier price. Look for 925 hallmarks on all pieces.' },
              { tip: 'Pesos get you better prices on food', detail: 'Most restaurants and street food accept USD, but you\'ll pay a worse exchange rate. ATMs in San Miguel dispense pesos at fair rates.' },
              { tip: 'The east coast is for experienced visitors only', detail: 'Cozumel\'s wild Atlantic eastern coast has no facilities, rough surf, and limited taxi service. Beautiful to look at, but not suitable for a cruise port day without a guide.' },
              { tip: 'Book third-party tours for snorkeling/diving', detail: 'Third-party operators run identical tours to DCL-booked excursions at 40–60% lower prices. Just ensure you\'re back at the pier 45 min before all-aboard.' },
              { tip: 'Cenote snorkeling is possible on a half-day', detail: 'Several cenotes (freshwater sinkholes) are accessible on the island or with a short ferry to the mainland. Crystal-clear fresh water with 100-foot visibility.' },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[#D4AF37] font-bold text-xl flex-shrink-0">💡</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{tip}</p>
                  <p className="text-slate-600 text-sm mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There (Sailings) */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-6">Which Disney Cruises Visit Cozumel?</h2>
          <p className="text-blue-200 leading-relaxed mb-6">
            Cozumel appears on Disney's 7-night Western Caribbean itineraries, typically departing
            from Port Canaveral. These sailings also stop at Grand Cayman or Costa Maya,
            plus Castaway Cay for private island time.
          </p>
          <div className="bg-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-white text-lg mb-4">Typical 7-Night Western Caribbean Itinerary</h3>
            <div className="space-y-2">
              {[
                { day: 'Day 1', stop: 'Port Canaveral — Embarkation', type: 'departure' },
                { day: 'Day 2', stop: 'Day at Sea', type: 'sea' },
                { day: 'Day 3', stop: 'George Town, Grand Cayman', type: 'port' },
                { day: 'Day 4', stop: 'Cozumel, Mexico', type: 'port' },
                { day: 'Day 5', stop: 'Day at Sea', type: 'sea' },
                { day: 'Day 6', stop: 'Castaway Cay, Bahamas', type: 'private' },
                { day: 'Day 7', stop: 'Day at Sea', type: 'sea' },
                { day: 'Day 8', stop: 'Port Canaveral — Disembarkation', type: 'departure' },
              ].map(({ day, stop, type }) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="text-[#D4AF37] font-bold text-sm w-12 flex-shrink-0">{day}</span>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    type === 'port' ? 'bg-[#D4AF37]' :
                    type === 'private' ? 'bg-emerald-400' :
                    type === 'sea' ? 'bg-blue-400' : 'bg-slate-400'
                  }`} />
                  <span className="text-blue-100 text-sm">{stop}</span>
                </div>
              ))}
            </div>
            <p className="text-blue-300 text-xs mt-4">Itineraries vary by sailing date and ship. Confirm your specific schedule on DCL.com.</p>
          </div>
        </div>
      </section>

      {/* Related Ports */}
      <section className="py-10 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">More Port Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Port Canaveral', slug: 'port-canaveral', emoji: '🚀', desc: 'Disney\'s Florida embarkation port' },
              { name: 'Nassau', slug: 'nassau', emoji: '🇧🇸', desc: 'Atlantis, Blue Lagoon, and colonial Nassau' },
              { name: 'Castaway Cay', slug: 'castaway-cay', emoji: '🏝️', desc: "Disney's magical private island" },
            ].map(({ name, slug, emoji, desc }) => (
              <Link key={slug} href={`/guides/ports/${slug}`} className="group flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
                <span className="text-3xl" aria-hidden="true">{emoji}</span>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">{name}</p>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
