import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Clock, Hotel, Lightbulb, Waves } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Nassau, Bahamas Cruise Guide — Disney Cruise Port Tips',
  description: 'Everything you need to know about Nassau on a Disney cruise — top excursions, Atlantis Paradise Island, Blue Lagoon, Cable Beach, and insider tips for your port day.',
  keywords: ['nassau bahamas disney cruise', 'nassau cruise port guide', 'atlantis paradise island day pass', 'nassau excursions', 'disney cruise nassau tips'],
  openGraph: {
    title: 'Nassau, Bahamas Cruise Guide — Disney Cruise Port Tips',
    description: 'Everything you need to know about Nassau on a Disney cruise — Atlantis, Blue Lagoon, Cable Beach, and insider tips.',
    url: 'https://gatgridcruises.com/guides/ports/nassau',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nassau, Bahamas Cruise Guide',
    description: 'Atlantis, Blue Lagoon, Cable Beach, and insider tips for your Nassau port day on a Disney cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function NassauPage() {
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
            <span className="text-blue-300 text-sm">Nassau</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🇧🇸</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Nassau, Bahamas
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">New Providence Island — Disney's most frequent Bahamian stop</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Nassau divides Disney cruisers more than any other port. Some love it for Atlantis,
            Blue Lagoon Island, and turquoise water. Others find the downtown area underwhelming.
            The key is knowing what to book — and what to skip.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Typical Port Time', value: '~8 hours', icon: '⏱️' },
              { label: 'Ship to Paradise Island', value: '10–15 min taxi', icon: '🚕' },
              { label: 'Currency', value: 'USD accepted', icon: '💵' },
              { label: 'Language', value: 'English', icon: '🗣️' },
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
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect in Nassau</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Nassau sits on New Providence Island and serves as the Bahamas' capital and commercial
              center. Disney ships dock at Prince George Wharf in the heart of downtown, putting you
              within walking distance of Bay Street markets, the Queen's Staircase, and Fort Charlotte.
            </p>
            <p>
              The immediate port area is very tourism-focused — you'll be approached by taxi drivers,
              vendors, and horse-drawn carriage operators right off the gangway. This is normal and
              mostly harmless, but it can feel overwhelming for first-timers. Walk confidently and
              engage on your terms.
            </p>
            <p>
              Nassau rewards planning. Guests who book excursions in advance — whether Disney-official
              or third-party — consistently rate their Nassau day higher than those who wing it. The
              beaches and water activities are genuinely excellent; the downtown shopping area is
              not where most Disney families want to spend their afternoon.
            </p>
          </div>
        </div>
      </section>

      {/* Top Excursions */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Waves className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-white">Top Nassau Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">Ranked by popularity with Disney cruise families.</p>

          <div className="space-y-4">
            {[
              {
                rank: '01',
                name: 'Atlantis Aquaventure Water Park Day Pass',
                type: 'Water Park',
                time: 'Full day (6–8 hrs)',
                price: '~$130–$160/person',
                description: 'The famous Atlantis resort on Paradise Island is a 15-minute taxi from the port. The Aquaventure water park includes 20+ slides, a lazy river through shark-filled aquariums, and multiple pools. Book directly through Atlantis rather than through DCL — it\'s cheaper.',
                tip: 'Book directly at atlantisbahamas.com to save ~$30/person vs Disney-booked.',
              },
              {
                rank: '02',
                name: 'Blue Lagoon Island Beach Day',
                type: 'Private Beach',
                time: 'Half or full day',
                price: '~$60–$90/person',
                description: 'A small private island 20 minutes from Nassau by ferry with white sand, clear water, and a dolphin encounter option. Less crowded than Atlantis and more relaxed. The dolphin encounter ($150–$200 extra) is genuinely outstanding — book this one through DCL for logistics.',
                tip: 'The basic beach pass is a great value — skip the sea lion encounter unless you have older kids.',
              },
              {
                rank: '03',
                name: 'Swimming with Pigs (Exuma)',
                type: 'Adventure',
                time: 'Full day flying excursion',
                price: '~$350–$500/person',
                description: 'The famous swimming pigs are in the Exumas — a 20-minute charter flight from Nassau. Some Disney cruise excursions include this as a flying day trip. Expensive but genuinely bucket-list for animal lovers.',
                tip: 'Only do this if you have a 9+ hour port stop. It\'s tight on shorter Nassau calls.',
              },
              {
                rank: '04',
                name: "Stuart Cove's Snorkel Tour",
                type: 'Snorkeling',
                time: '3–4 hours',
                price: '~$45–$65/person',
                description: 'One of Nassau\'s most respected snorkel operators — knowledgeable guides, good reef visibility, and a dedicated shark dive add-on for brave teens. Located 20 minutes from the port by shuttle.',
                tip: 'Book directly through Stuart Cove. Disney-booked version is identical but costs more.',
              },
              {
                rank: '05',
                name: 'Historic Nassau Walking Tour',
                type: 'Cultural',
                time: '2–3 hours',
                price: '~$20–$35/person',
                description: 'Queen\'s Staircase, Fort Charlotte, the Government House, and the Straw Market — Nassau\'s colonial British history is genuinely interesting. Several local guides run excellent small-group tours. Great for history-interested families.',
                tip: 'Do this in the morning before heat peaks. Combine with a taxi to Cable Beach for a swim after.',
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

      {/* Nearby Hotels */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Hotel className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Hotels Near Nassau Port</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Most Disney cruise guests don't pre-stay in Nassau — the cruise departs from Florida.
            But if you're extending your trip post-cruise for a Bahamas vacation, these are the
            top options near the port area.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'Atlantis Paradise Island',
                tier: 'Luxury Resort',
                location: 'Paradise Island (15 min from port)',
                why: 'The definitive Nassau resort — iconic towers, water park, casino, 8 pools, and 11 beaches. Pricey ($350–$600+/night) but includes Aquaventure access. Book Coral Tower for best value per square foot.',
              },
              {
                name: 'Warwick Paradise Island Bahamas',
                tier: 'Premium',
                location: 'Paradise Island (12 min from port)',
                why: 'All-inclusive alternative to Atlantis without the casino crowds. Adults-only, beautiful rooms, good beach access. Excellent choice for couples extending post-cruise.',
              },
              {
                name: 'British Colonial Nassau',
                tier: 'Historic Boutique',
                location: 'Downtown (1 min from port)',
                why: 'Right at the cruise dock, beautifully restored historic hotel in the British Colonial Hilton building. Convenient for a single night pre-cruise if you\'re repositioning from somewhere other than Florida.',
              },
              {
                name: 'Grand Hyatt Baha Mar',
                tier: 'Luxury Resort',
                location: 'Cable Beach (10 min from port)',
                why: 'Newer, massive resort complex with its own casino, beach, and multiple pool zones. Better deal than Atlantis on a per-night basis and excellent for families who want a full resort experience.',
              },
            ].map(({ name, tier, location, why }) => (
              <div key={name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#1E3A5F]/20 text-blue-800 px-2.5 py-1 rounded-full font-medium">{tier}</span>
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
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Insider Nassau Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Taxi fares are negotiable — agree before you get in', detail: 'Taxis in Nassau don\'t use meters. Negotiate the fare upfront: $15 to Paradise Island, $10–$12 to Cable Beach, $8 within downtown.' },
              { tip: 'Dollar stores on Bay Street sell the same souvenirs at 1/3 the price', detail: 'The straw market price starts high. Walk half a block down Bay Street for the same items at non-tourist prices.' },
              { tip: 'Watch the ship\'s all-aboard time carefully', detail: 'Nassau is a port where ships leave on time. Set a phone alarm for 45 minutes before all-aboard and build in taxi time.' },
              { tip: 'Get your gratuities in cash before going ashore', detail: 'Underwater guides, beach staff, and boat crew work mostly for tips. Have small USD bills ready.' },
              { tip: 'Cable Beach is free if you walk right onto it', detail: 'Cable Beach is a public beach. Walk past the hotel entry and you can set up on the same sand free of charge.' },
              { tip: 'Nassau "third port" itineraries are better than Bahamian 3-nighters', detail: 'On a 7-night cruise, Nassau is just one of 3–4 port stops. On a 3-night Bahamian cruise, Nassau is your ONLY non-private island stop — manage expectations accordingly.' },
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

      {/* Related Ports */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">More Port Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Port Canaveral', slug: 'port-canaveral', emoji: '🚀', desc: 'Disney\'s Florida embarkation port' },
              { name: 'Castaway Cay', slug: 'castaway-cay', emoji: '🏝️', desc: "Disney's magical private island" },
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
