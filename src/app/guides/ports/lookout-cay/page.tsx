import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Star, Waves } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: "Lookout Cay at Lighthouse Point Guide — Disney's Eleuthera Private Destination",
  description: "The complete guide to Disney Lookout Cay at Lighthouse Point — Disney's second private destination on Eleuthera, Bahamas. Beaches, cabanas, Bahamian-inspired food, cultural experiences, and insider tips.",
  keywords: ['lookout cay guide', 'lighthouse point disney', 'disney lookout cay', 'eleuthera disney', 'disney second private island', 'lookout cay tips'],
  openGraph: {
    title: "Lookout Cay at Lighthouse Point Guide — Disney's Eleuthera Private Destination",
    description: "Complete guide to Disney Lookout Cay at Lighthouse Point on Eleuthera — beaches, cabanas, Bahamian cuisine, and insider tips.",
    url: 'https://gatgridcruises.com/guides/ports/lookout-cay',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lookout Cay at Lighthouse Point Guide",
    description: "Disney's second private destination on Eleuthera — beaches, cabanas, Bahamian cuisine, and insider tips.",
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function LookoutCayPage() {
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
            <span className="text-blue-300 text-sm">Lookout Cay</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🪸</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Lookout Cay at Lighthouse Point
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Disney's Private Destination — Eleuthera, Bahamas</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Lookout Cay is Disney's second private island destination — opened in June 2024 on the
            southern tip of Eleuthera. Designed in collaboration with Bahamian artists and chefs,
            Lookout Cay leans into local culture more than any other private cruise destination,
            with Junkanoo-inspired architecture, Bahamian cuisine, and a quieter beach experience
            than Castaway Cay.
          </p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Time at Destination', value: '7–8 hours', icon: '⏱️' },
              { label: 'Opened', value: 'June 2024', icon: '🆕' },
              { label: 'Other Cruise Lines', value: 'None. Only DCL.', icon: '🚢' },
              { label: 'Adult Beach', value: 'Serenity Cove', icon: '🥂' },
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
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What Makes Lookout Cay Different</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Where Castaway Cay is "Disney does the Bahamas," Lookout Cay is closer to "the Bahamas
              with Disney's hospitality on top." Disney worked with Bahamian artists, designers, and
              chefs to weave local culture into nearly every part of the experience — from the
              Junkanoo-inspired colors and patterns to the food, music, and storytelling on the island.
            </p>
            <p>
              Like Castaway Cay, ships dock directly at a pier — no tenders. The destination has its
              own arrival village, three distinct beach areas, walking trails through native
              vegetation, and a cultural performance space where Bahamian musicians and dancers
              perform throughout the day.
            </p>
            <p>
              Lookout Cay is generally less crowded than Castaway Cay — a function of being newer and
              having more spread-out beach areas. Many cruisers who've done both prefer it for the
              relative quiet and the deeper cultural feel.
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
                name: 'Lookout Cay Family Beach',
                emoji: '👨‍👩‍👧‍👦',
                tier: 'Main beach — all ages',
                description: 'The primary beach area near the arrival village. Wide, soft white sand, calm protected waters, beach chairs, umbrella rentals, and easy access to dining and shops. The bulk of guests spend their day here.',
                mustKnow: 'Get there early — the central section near the food and bars fills up first. Walk a few minutes down the beach for a noticeably quieter spot with the same amenities.',
              },
              {
                name: 'Serenity Cove (Adult Beach)',
                emoji: '🥂',
                tier: 'Adults 18+ only',
                description: 'The adults-only beach, set apart from family areas with its own bar, lounge chairs, and quieter atmosphere. Smaller and more intimate than Castaway Cay\'s Serenity Bay, with views toward the open Atlantic.',
                mustKnow: 'Limited capacity compared to Castaway Cay\'s adult beach — arrive in the first wave off the ship if you want a prime chair.',
              },
              {
                name: "Goombay Cultural Plaza",
                emoji: '🎶',
                tier: 'All ages — cultural hub',
                description: 'Not a beach itself, but the heart of the destination — an open-air plaza with live Bahamian music, Junkanoo dancing, craft demonstrations, and rotating performances by local artists throughout the day. Adjacent to the main dining venues.',
                mustKnow: 'Schedule a 30-minute Goombay Plaza stop into your day — the live performances are the most distinct thing Lookout Cay offers and easy to miss if you stay on the beach.',
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
            <h2 className="font-fraunces text-3xl font-bold text-white">Activities & Experiences</h2>
          </div>
          <p className="text-blue-200 mb-8">From swimming to cultural performances and water sports.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Cabana Rentals',
                price: '$500–$700+',
                free: false,
                detail: 'Private oceanfront cabanas with attendant, lounge chairs, refrigerator, and shade. The Lookout Cay cabanas are newer and somewhat more spacious than Castaway Cay\'s. Books out months in advance — reserve as soon as your booking window opens.',
              },
              {
                name: 'Snorkeling',
                price: 'Free with cruise (gear rental ~$25)',
                free: true,
                detail: 'Designated snorkel area off the family beach with rental gear available. Reef life is good but not as developed as Castaway Cay\'s sunken-artifact trail. Best at low tide and in the morning.',
              },
              {
                name: 'Live Bahamian Music & Junkanoo',
                price: 'Free with cruise',
                free: true,
                detail: 'Goombay Plaza hosts rotating performances by Bahamian musicians and Junkanoo dancers throughout the day. Easily the most culturally distinctive experience on any private cruise destination.',
              },
              {
                name: 'Bahamian Craft Demonstrations',
                price: 'Free with cruise',
                free: true,
                detail: 'Local artisans demonstrate traditional Bahamian crafts — straw weaving, woodcarving, painting — at scheduled times. Many craft pieces are available for purchase at the artisan market.',
              },
              {
                name: 'Stand-Up Paddleboarding & Kayaks',
                price: '~$30/hour',
                free: false,
                detail: 'Rentals available at the family beach. Calmer, protected waters make it beginner-friendly. Lifejackets included.',
              },
              {
                name: 'Walking & Nature Trails',
                price: 'Free with cruise',
                free: true,
                detail: 'A network of trails through native Bahamian flora and along the coastline. Markers identify endemic plants and bird species. Pleasant 30–60 minute loops with shade.',
              },
              {
                name: 'Beach Sports Equipment',
                price: 'Free with cruise',
                free: true,
                detail: 'Volleyballs, beach tennis, and other game equipment available free at the family beach. Crew sometimes organize friendly tournaments at midday.',
              },
              {
                name: 'Wedding & Vow Renewal Venue',
                price: 'Custom packages',
                free: false,
                detail: 'Lookout Cay hosts Disney destination weddings and vow renewals at a dedicated cliffside venue. Booked through Disney Fairy Tale Weddings — must be arranged well in advance.',
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

      {/* Bahamian Food */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl" aria-hidden="true">🍤</span>
            <div>
              <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Bahamian-Inspired Cuisine</h2>
              <p className="text-slate-500 text-sm mt-1">Included with your cruise fare. No extra charge.</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <p className="text-amber-900 leading-relaxed mb-4">
              Lookout Cay's culinary program was designed in collaboration with Bahamian chefs and
              leans heavily into local flavors — conch fritters, jerk chicken, peas and rice, johnnycakes,
              guava duff, and rum-based mocktails alongside the Disney standards.
            </p>
            <p className="text-amber-900 leading-relaxed">
              The main dining venue is a buffet-style setup near the arrival village, with grab-and-go
              options closer to the beaches. The Bahamian items are the highlight — don't fill up on
              hot dogs and burgers when conch fritters are on offer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Try the conch fritters', detail: 'Crispy fried conch is a Bahamian staple. The Lookout Cay version is the closest you\'ll get to authentic without leaving the destination.' },
              { tip: 'Save room for guava duff', detail: 'A traditional Bahamian dessert — sweet pastry rolled with guava and topped with rum sauce. Easy to miss if you head straight for Mickey ice cream.' },
              { tip: 'The jerk chicken is genuinely spicy', detail: 'Disney didn\'t mute the spice levels for American palates. If you\'re heat-sensitive, ask for it on the side.' },
              { tip: 'Drinks are NOT free', detail: 'Food is included. Alcoholic drinks and specialty beverages charge to your cruise account.' },
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
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Lookout Cay Insider Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Book cabanas the day your window opens', detail: 'Lookout Cay has fewer cabanas than Castaway Cay, so they sell out faster. Set a calendar reminder for the day your booking window opens.' },
              { tip: 'Reef-safe sunscreen required', detail: 'Disney enforces reef-safe mineral sunscreen at Lookout Cay more strictly than at Castaway Cay — the surrounding reef is healthier and the program is newer. Bring your own.' },
              { tip: 'Watch the live Junkanoo schedule', detail: 'Performance times are posted at Goombay Plaza in the morning. The afternoon Junkanoo parade is the highlight — set a reminder.' },
              { tip: 'Walk away from the village for quiet beach', detail: 'The beach extends well beyond the central area. A 5-minute walk gets you to nearly empty stretches of sand with the same chairs and umbrellas.' },
              { tip: 'Buy crafts from local artisans', detail: 'The artisan market features genuine Bahamian-made goods — straw work, painted shells, woodcarvings. Prices benefit local makers directly.' },
              { tip: 'Weather cancellations happen', detail: 'Lookout Cay docking requires specific wind and wave conditions. Substitutions to Nassau or another Bahamas port are uncommon but possible — more so November through February.' },
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

      {/* What to Pack */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Pack for Lookout Cay</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Reef-safe sunscreen (required)', 'Rash guard for kids', 'Water shoes', 'Dry bag for phone',
              'Snorkel gear (optional — rentals available)', 'Cash for crafts and drinks', 'Waterproof camera', 'Mesh beach bag',
              'Hat and sunglasses', 'Light layer for evening', 'Walking shoes for nature trails', 'Kid\'s life vest',
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
      <section className="py-10 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">More Port Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Castaway Cay', slug: 'castaway-cay', emoji: '🏝️', desc: "Disney's original private island" },
              { name: 'Nassau', slug: 'nassau', emoji: '🇧🇸', desc: 'Atlantis, Blue Lagoon, and colonial Nassau' },
              { name: 'Port Canaveral', slug: 'port-canaveral', emoji: '🚀', desc: "Disney's Florida embarkation port" },
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
