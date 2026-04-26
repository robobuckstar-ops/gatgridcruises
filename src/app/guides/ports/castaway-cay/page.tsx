import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Star, Waves } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: "Castaway Cay Guide — Disney's Private Island Insider Tips",
  description: "The ultimate guide to Castaway Cay — Disney Cruise Line's private Bahamian island. Serenity Bay, Cookies BBQ, snorkeling, excursions, and insider tips to maximize your day.",
  keywords: ['castaway cay guide', 'castaway cay tips', 'disney private island', 'castaway cay serenity bay', 'cookies bbq castaway cay', 'castaway cay snorkeling'],
  openGraph: {
    title: "Castaway Cay Guide — Disney's Private Island Insider Tips",
    description: "The ultimate guide to Castaway Cay — Serenity Bay, Cookies BBQ, snorkeling, excursions, and tips to maximize your day.",
    url: 'https://gatgridcruises.com/guides/ports/castaway-cay',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Castaway Cay Guide — Disney's Private Island",
    description: "Serenity Bay, Cookies BBQ, snorkeling, and insider tips to maximize your Castaway Cay day.",
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function CastawayCayPage() {
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
            <span className="text-blue-300 text-sm">Castaway Cay</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🏝️</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Castaway Cay
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Disney's Private Island — The Abacos, Bahamas</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Castaway Cay is the undisputed highlight of any Disney cruise itinerary.
            Disney's own private island, exclusive to DCL guests, with white sand beaches,
            world-class snorkeling, and Cookies BBQ — consistently the most popular meal
            in the entire Disney cruise portfolio.
          </p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Time at Island', value: '7–8 hours', icon: '⏱️' },
              { label: 'Private Beach Miles', value: '2.5 miles', icon: '🏖️' },
              { label: 'Other Cruise Lines', value: 'None. Only DCL.', icon: '🚢' },
              { label: 'Adult Beach', value: 'Serenity Bay', icon: '🥂' },
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

      {/* Overview */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What Makes Castaway Cay Different</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Disney leases Castaway Cay from the Bahamian government and has invested tens of millions
              in transforming it from an undeveloped island into an extension of the Disney resort
              experience. Unlike private islands operated by other cruise lines, Castaway Cay has no
              crowds from competing ships — ever.
            </p>
            <p>
              The ship docks directly at the island via a pier, so you walk off without tenders.
              That means more beach time and no queues to get ashore. A free tram shuttles guests
              from the dock to the beach areas every few minutes.
            </p>
            <p>
              Castaway Cay has three distinct beach areas, a snorkel trail, bike rentals, multiple
              water sports operations, and Cookies Too — the barbecue lunch that's included in your
              cruise fare and consistently rated one of the top meals on any Disney cruise ship.
            </p>
          </div>
        </div>
      </section>

      {/* Beaches */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-8">The Beaches</h2>
          <div className="space-y-6">
            {[
              {
                name: 'Family Beach',
                emoji: '👨‍👩‍👧‍👦',
                tier: 'Main beach — all ages',
                description: 'The largest beach area, closest to the pier. Wide expanse of white sand, calm protected lagoon waters, cabana rentals, beach games, and the Pelican Plunge floating water park. This is where most families spend their day.',
                mustKnow: 'Claim your spot by 9 AM — cabanas book out for the season months in advance, but free chairs are available on a first-come basis.',
              },
              {
                name: 'Serenity Bay',
                emoji: '🥂',
                tier: 'Adults 18+ only',
                description: 'A dedicated adults-only beach at the far end of the island, accessible by tram. Wider, quieter, and more secluded than Family Beach. Full bar service, hammocks, and a much more relaxed atmosphere. The best kept secret on Castaway Cay for couples.',
                mustKnow: 'Lunch at Serenity Bay is Cookies BBQ too — same menu, dramatically shorter lines. Take the tram out here for lunch even if you swim at Family Beach.',
              },
              {
                name: 'Scuttle\'s Cove (Kids)',
                emoji: '🧒',
                tier: 'Ages 3–12',
                description: 'A supervised water play area with spray fountains, splash pads, and a dedicated kids section. Shallow, safe, and very well staffed by DCL crew. Little kids love it. Right next to Family Beach so parents can watch.',
                mustKnow: 'DCL crew are present but it\'s not a drop-off kids club. Parents stay nearby.',
              },
            ].map(({ name, emoji, tier, description, mustKnow }) => (
              <div key={name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-[#1E3A5F] px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{emoji}</span>
                  <div>
                    <h3 className="font-bold text-white text-xl">{name}</h3>
                    <p className="text-blue-300 text-sm">{tier}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>
                  <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <span className="text-[#D4AF37] font-bold text-sm flex-shrink-0">Must know:</span>
                    <p className="text-amber-800 text-sm">{mustKnow}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Waves className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-white">Activities & Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">From free snorkeling to premium water sport rentals.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Castaway Cay Snorkel Trail',
                price: '~$32/adult',
                free: false,
                detail: 'A marked underwater trail with sunken Disney artifacts, rays, colorful fish, and sea turtles if you\'re lucky. Well maintained and appropriate for kids 5+. Gear rental included. Book through DCL or at the rental shack — no advance booking required.',
              },
              {
                name: 'Pelican Plunge Floating Water Platform',
                price: 'Free with cruise',
                free: true,
                detail: 'Floating inflatable platform in the lagoon with two waterslides — families love it. Requires swimming ability (lifeguards present but no flotation allowed on the slides). Gets crowded by 11 AM.',
              },
              {
                name: 'Bike Rentals',
                price: '~$10/hour',
                free: false,
                detail: 'Explore the island by bike on a dedicated trail that loops through the interior. Beautiful way to see parts of the island most guests miss. Bikes include helmets. Great for older kids and adults.',
              },
              {
                name: 'Stingray Adventure',
                price: '~$42/adult',
                free: false,
                detail: 'Guided shallow-water stingray encounter with real Southern stingrays. Hands-on, educational, and genuinely memorable. Popular with kids 8+. Book through DCL in advance — fills up.',
              },
              {
                name: 'Beach Volleyball & Sports',
                price: 'Free with cruise',
                free: true,
                detail: 'Equipment for beach volleyball, tetherball, and other games is available free on the beach. Crew members organize friendly tournaments around midday.',
              },
              {
                name: 'Parasailing',
                price: '~$99/person',
                free: false,
                detail: 'Scenic parasail ride over the island and surrounding Bahamian waters. Weather-dependent — DCL will cancel and refund if conditions aren\'t safe. Spectacular views of the ship from above.',
              },
              {
                name: '5K Run on the Island',
                price: 'Free with cruise',
                free: true,
                detail: 'A marked 5K running path through the island, usually starting at 8 AM just after the ship docks. Increasingly popular — runners meet at the Island Welcome Center. You get a medal-shaped sticker.',
              },
              {
                name: 'Cabana Rentals',
                price: '$400–$600+',
                free: false,
                detail: 'Private beachside cabanas with dedicated attendant, lounge chairs, refrigerator, and shade. Worth it for families with small kids who need nap space. Books out months in advance for high-demand sailings.',
              },
            ].map(({ name, price, free: isFree, detail }) => (
              <div key={name} className="bg-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-white text-base leading-tight">{name}</h3>
                  <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-bold ${isFree ? 'bg-green-400/20 text-green-300' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                    {price}
                  </span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies BBQ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl" aria-hidden="true">🍖</span>
            <div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Cookies BBQ — The Best Meal at Sea</h2>
              <p className="text-slate-500 text-sm mt-1">Included with your cruise fare. No extra charge.</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <p className="text-amber-900 leading-relaxed mb-4">
              Cookies BBQ (officially "Cookies Too" for the secondary location at Serenity Bay) is the only
              outdoor buffet on Castaway Cay and it consistently receives some of the highest ratings of
              any food venue in the Disney cruise experience — including the onboard specialty restaurants.
            </p>
            <p className="text-amber-900 leading-relaxed">
              The barbecue lunch features pulled pork, grilled chicken, hot dogs, corn on the cob,
              macaroni salad, fresh fruit, and one of the best macaroni and cheese dishes on any
              Disney cruise property. It is included in your cruise fare — no charge whatsoever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Eat at Serenity Bay\'s Cookies', detail: 'The adults-only beach has its own Cookies location with identical food but much shorter lines. Worth the tram ride.' },
              { tip: 'Line forms fast — go at 11:30 AM', detail: 'By noon the Family Beach Cookies line can stretch 30 minutes. Arrive at 11:30 for a 5-minute wait.' },
              { tip: 'The mac and cheese is legendary', detail: 'Sounds basic, but guests order it 3+ times in one sitting. It\'s the best version Disney has ever made.' },
              { tip: 'Beer and cocktails are NOT free', detail: 'The food is included. Drinks (alcoholic and specialty beverages) are charged to your Key to the World card.' },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Star className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{tip}</p>
                  <p className="text-slate-600 text-sm mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Castaway Cay Insider Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Be among the first off the ship', detail: 'Castaway Cay docks directly — no tender boats. The first guests off claim the best free chairs. Set an alarm to be at the gangway when it opens around 8:30–9 AM.' },
              { tip: 'Bring reef-safe sunscreen', detail: 'DCL strongly encourages reef-safe mineral sunscreen on Castaway Cay to protect the marine environment. Chemical sunscreens are allowed but frowned upon.' },
              { tip: 'The post office is real — mail a postcard', detail: 'Castaway Cay has an actual Bahamian post office. Buy a postcard at the island shops and mail it — it arrives back home weeks later as a perfect souvenir.' },
              { tip: 'Grab towels from the ship, not the island', detail: 'Ship towels are higher quality than the island towels. Take one from your stateroom to use on the beach, and remember to return it.' },
              { tip: 'The snorkel trail is best at 9–10 AM', detail: 'Water clarity and marine activity peaks in the morning. After noon, waves and sunscreen runoff reduce visibility significantly.' },
              { tip: 'Weather cancellations happen', detail: 'DCL needs certain wind and wave conditions to dock at Castaway Cay. In rough weather (more common Nov–Feb), they substitute Nassau or another port. It\'s rare but disappointing when it happens.' },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200">
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

      {/* Packing for Castaway Cay */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Pack for Castaway Cay</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Reef-safe sunscreen', 'Rash guard for kids', 'Water shoes', 'Dry bag for phone',
              'Swim goggles', 'Cash for drinks/activities', 'Waterproof camera', 'Mesh beach bag',
              'Hat and sunglasses', 'Snorkel gear (optional — rentals available)', 'Change of clothes for dinner', 'Kid\'s life vest (for Pelican Plunge)',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[#D4AF37] font-bold flex-shrink-0">✓</span>
                <span className="text-slate-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/guides/packing-gear" className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors">
              → See our full packing guide with Amazon picks
            </Link>
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
              { name: 'Cozumel', slug: 'cozumel', emoji: '🇲🇽', desc: 'World-class reefs and Mayan ruins' },
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
