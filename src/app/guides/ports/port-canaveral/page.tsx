import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Clock, Car, Hotel, Lightbulb } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'Port Canaveral Cruise Guide — Disney Cruise Departure Tips',
  description: 'Everything you need to know about departing from Port Canaveral on Disney Cruise Line — parking, pre-cruise hotels, getting there, Kennedy Space Center, and embarkation tips.',
  keywords: ['port canaveral disney cruise', 'port canaveral cruise guide', 'disney cruise embarkation', 'port canaveral parking', 'pre-cruise hotel port canaveral'],
  openGraph: {
    title: 'Port Canaveral Cruise Guide — Disney Cruise Departure Tips',
    description: 'Everything you need to know about Port Canaveral — parking, pre-cruise hotels, Kennedy Space Center, and embarkation tips.',
    url: 'https://gatgridcruises.com/guides/ports/port-canaveral',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Port Canaveral Cruise Guide',
    description: 'Parking, pre-cruise hotels, and embarkation tips for Disney Cruise Line at Port Canaveral.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function PortCanaveralPage() {
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
            <span className="text-blue-300 text-sm">Port Canaveral</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🚀</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Port Canaveral
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Brevard County, Florida</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Disney's primary Florida departure port — well-organized, family-friendly, and
            strategically placed between Orlando's theme parks and the Atlantic coast.
            Here's how to make the most of your embarkation day and beyond.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Drive from Orlando', value: '~45 min', icon: '🚗' },
              { label: 'Drive from Miami', value: '~3.5 hrs', icon: '🛣️' },
              { label: 'MCO Airport', value: '~50 min', icon: '✈️' },
              { label: 'Port Parking', value: '$19–$22/day', icon: '🅿️' },
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
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect at Port Canaveral</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              Port Canaveral is one of the busiest cruise ports in the world and home to Disney Cruise Line's
              main terminal — Disney Cruise Terminal 8. Unlike most cruise ports, DCL has invested heavily
              in making embarkation feel like the start of the vacation, not an industrial logistics exercise.
            </p>
            <p>
              The terminal features full theming, character art, and a check-in process that DCL regularly
              refines. Arrive at your assigned Port Arrival Time (PAT) — printed on your cruise documents —
              and expect to be aboard within 30–60 minutes of arrival. Early arrivals without a PAT may wait
              outside.
            </p>
            <p>
              Parking at the port is available via the adjacent Canaveral Port Authority lots (shuttle
              required) or a limited number of closer "garage" spots near the terminal. Book parking early —
              Disney cruise departures fill port parking fast, especially on weekends.
            </p>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Car className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Getting to the Port</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                method: 'Drive from Orlando',
                detail: 'Take SR-528 (the Beachline Expressway) east — it runs almost directly to the port. Allow 45–60 minutes plus potential toll costs (~$5 each way). Parking: Port Canaveral Authority lots at $19–$22/day, or off-site lots at $12–$15/day with shuttle.',
                icon: '🚗',
              },
              {
                method: 'MCO Airport Transfer',
                detail: 'Orlando International Airport is ~50 minutes away. Disney offers Magical Express-style cruise transfers for a fee, and third-party shuttle services (Mears, Happy Limo) run about $25–$40/person each way. Uber/Lyft run ~$60–$80 for a full family.',
                icon: '✈️',
              },
              {
                method: 'Fly into Melbourne (MLB)',
                detail: 'Melbourne Orlando International Airport is just 30 minutes from the port. Smaller and less expensive than MCO for some routes — worth checking if you\'re flying from the Midwest or Northeast.',
                icon: '🛫',
              },
              {
                method: 'Disney Ground Transfer',
                detail: 'If you\'re coming from Walt Disney World, Disney offers official motor coach transfers that include luggage handling directly to the ship. Convenient but expensive — typically $35–$45/adult each way.',
                icon: '🏰',
              },
            ].map(({ method, detail, icon }) => (
              <div key={method} className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{icon}</span>
                  <h3 className="font-bold text-slate-900">{method}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Cruise Hotels */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Hotel className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Pre-Cruise Hotel Recommendations</h2>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Arriving the night before is strongly recommended — flight delays, traffic, and unexpected
            issues are much easier to handle when you're already in Brevard County. These hotels are
            within 15 minutes of the cruise terminal.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'Residence Inn Cocoa Beach',
                tier: 'Mid-Range',
                distance: '~5 min to port',
                why: 'Extended-stay suites with kitchens — great for families preparing snacks or baby food the night before. Free breakfast, outdoor pool, and easy port access via SR-528.',
              },
              {
                name: 'Ron Jon Resort Cocoa Beach',
                tier: 'Premium',
                distance: '~8 min to port',
                why: 'Surf-themed resort with a full water park on property. Kids barely notice they\'re not on the ship yet. Pricier, but a great one-night splurge that sets the vacation tone.',
              },
              {
                name: 'Holiday Inn Express Port Canaveral',
                tier: 'Budget-Friendly',
                distance: '~3 min to port',
                why: 'Right at the port entrance. Bare-bones but spotless — free breakfast, indoor pool, and some rooms accept Amazon Locker deliveries so you can order cruise gear ahead of time.',
              },
              {
                name: 'Cape Canaveral Beach Resort',
                tier: 'Condo/Suite',
                distance: '~10 min to port',
                why: 'Full condo units on the beach sleep 6–8 people. Ideal for multi-family trips or anyone who wants a night of oceanfront relaxation before a week at sea.',
              },
            ].map(({ name, tier, distance, why }) => (
              <div key={name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#1E3A5F]/20 text-blue-800 px-2.5 py-1 rounded-full font-medium">{tier}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{distance}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Excursions / Attractions */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-3">Top Things to Do Nearby</h2>
          <p className="text-blue-200 mb-8">Add a day before or after your cruise and make the most of the Space Coast.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Kennedy Space Center Visitor Complex',
                time: 'Full day',
                detail: 'One of the greatest tourist attractions in the US — launch pads, IMAX films, Atlantis orbiter exhibit, and often a rocket launch visible from the cruise terminal. Book tickets in advance.',
              },
              {
                name: 'Cocoa Beach',
                time: 'Half day',
                detail: 'The closest Atlantic beach to Orlando. Ron Jon Surf Shop, fish tacos, and clear water make this a great pre-cruise beach day. The beach is free — just park at the municipal lot.',
              },
              {
                name: 'Walt Disney World',
                time: 'Full day (add-on)',
                detail: 'Many families build a 2–3 day park stay before their cruise. Disney resort guests can use the Magical Express-style bus transfer directly to the port without handling luggage.',
              },
              {
                name: 'Canaveral National Seashore',
                time: 'Half day',
                detail: 'Undeveloped barrier island beach with sea turtle nesting sites, hiking trails, and NASA\'s backyard view. Completely free, serene, and dramatically beautiful — 24 miles of protected coastline.',
              },
              {
                name: 'Brevard Zoo',
                time: 'Half day',
                detail: 'One of the best mid-sized zoos in Florida — zip-lining over animal habitats, kayaking with animals nearby, and an excellent value at ~$20/person. Perfect for kids waiting to board.',
              },
              {
                name: 'Downtown Cocoa Village',
                time: '2–3 hours',
                detail: 'Charming historic district with boutique shops, riverfront restaurants, and great Florida seafood. A relaxed alternative to theme park pre-cruise prep for adults.',
              },
            ].map(({ name, time, detail }) => (
              <div key={name} className="bg-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-white">{name}</h3>
                  <span className="flex-shrink-0 text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded-full font-medium">{time}</span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{detail}</p>
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
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Insider Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Book your PAT as early as possible', detail: 'Port Arrival Times open with online check-in. The 11:00–11:30 AM slot gets you onboard first and lets you grab lunch before crowds. It fills in minutes on opening day.' },
              { tip: 'Label checked bags with your cabin number', detail: 'Disney porters route bags by cabin number. Label them clearly — they arrive in your stateroom by 6 PM on most sailings.' },
              { tip: 'Bring cash for the porters', detail: '$1–$2/bag tip for curbside porters is standard. They appreciate it and it speeds up bag handling.' },
              { tip: 'Customs line tip', detail: 'On return, DCL operates an express customs process. US citizens with no goods to declare exit through the fastest lane. Have your documents ready for the passport kiosk.' },
              { tip: 'Pre-purchase parking online', detail: 'Canaveral Port Authority parking fills up fast on Friday and Saturday departures. Book online at portcanaveral.com at least 2 weeks ahead.' },
              { tip: 'Space Center launch schedules', detail: 'Rocket launches from Kennedy Space Center are often visible from the port itself — free and spectacular. Check nasa.gov/launchschedule before your trip.' },
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

      {/* Related Ports */}
      <section className="py-10 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">More Port Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Nassau', slug: 'nassau', emoji: '🇧🇸', desc: 'Beaches, Atlantis, and colonial Nassau' },
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
