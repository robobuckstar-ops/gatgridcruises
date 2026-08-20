import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Waves, Footprints, CalendarClock } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/ports/ketchikan' },
  title: 'Ketchikan, Alaska Cruise Guide — Disney Cruise Port Tips',
  description: 'Everything you need to know about Ketchikan on a Disney Alaska cruise — Misty Fjords flightseeing, the Lumberjack Show, Creek Street, totem parks, and what to book early.',
  keywords: ['ketchikan disney cruise', 'ketchikan cruise port guide', 'misty fjords flightseeing', 'ketchikan shore excursions', 'disney alaska cruise ketchikan'],
  openGraph: {
    title: 'Ketchikan, Alaska Cruise Guide — Disney Cruise Port Tips',
    description: 'Misty Fjords, the Lumberjack Show, Creek Street, and totem parks — how to plan your Ketchikan day on a Disney Alaska cruise.',
    url: 'https://gatgridcruises.com/guides/ports/ketchikan',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketchikan, Alaska Cruise Guide',
    description: 'Misty Fjords, the Lumberjack Show, Creek Street, and totem parks on a Disney Alaska cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function KetchikanPage() {
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
            <span className="text-blue-300 text-sm">Ketchikan</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🌲</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Ketchikan, Alaska
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Revillagigedo Island — Alaska&apos;s first stop and its rainiest</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Ketchikan is the most walkable port on a Disney Alaska itinerary and the only one where
            the signature excursion — a floatplane into Misty Fjords — leaves from a dock you can
            see from your verandah. It is also the port most families under-plan, because the ship
            frequently arrives in the afternoon.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Typical Port Time', value: '6–9 hours', icon: '⏱️' },
              { label: 'Ship to Downtown', value: 'Walk off and you\'re there', icon: '🚶' },
              { label: 'Arrival', value: 'Docked — no tender', icon: '⚓' },
              { label: 'Annual Rainfall', value: '~150 inches', icon: '🌧️' },
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
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect in Ketchikan</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Ketchikan is a narrow strip of town wedged between the Tongass National Forest and the
              Tongass Narrows, on Revillagigedo Island in Alaska&apos;s southeast panhandle. There is
              no road connecting it to the rest of Alaska — everything and everyone arrives by boat
              or by plane. That isolation is a large part of why it feels different from a Caribbean
              port the moment you step off the ship.
            </p>
            <p>
              Disney docks at the downtown berths, and this is the single most useful fact about the
              port: you walk down the gangway directly into town. There is no tender, no shuttle,
              and no taxi negotiation. Creek Street, the Southeast Alaska Discovery Center, the
              Great Alaskan Lumberjack Show arena, and a dozen restaurants are all within a
              ten-minute walk. Families with strollers, grandparents, or nap schedules have an
              enormous amount of flexibility here that they do not have in Skagway or Juneau.
            </p>
            <p>
              The town leans hard into three identities: salmon, totem poles, and rain. All three
              are genuine rather than manufactured. Ketchikan really does call itself the salmon
              capital of the world, it really does hold the largest collection of standing totem
              poles anywhere, and it really does average somewhere near 150 inches of rain a year.
              Plan for weather and the day is delightful. Plan for sunshine and you will spend
              $60 on ponchos at a gift shop.
            </p>
            <p>
              One caution that shapes everything else on this page: Ketchikan calls on Disney&apos;s
              Alaska itineraries are often <em>afternoon</em> calls rather than the classic
              8am–5pm port day. Published 2026 berthing schedules show Disney Magic arrivals as late
              as 2:00pm with an 8:00pm departure. A great many Ketchikan tours — bear viewing,
              full-day fishing charters, some flightseeing departures — are morning-only operations.
              Check your specific sailing&apos;s arrival time before you fall in love with an
              itinerary you cannot actually do.
            </p>
          </div>
        </div>
      </section>

      {/* When Disney Sails Here */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <CalendarClock className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">When Disney Sails to Ketchikan</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4 mb-6">
            <p>
              For the 2026 season Disney Cruise Line put <strong>two</strong> ships in Alaska for the
              first time — the <Link href="/ships/disney-magic" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Magic</Link> and
              the <Link href="/ships/disney-wonder" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Wonder</Link> —
              both running seven-night round trips from Vancouver, British Columbia between May and
              September. Both ships are scheduled back in Alaska for summer 2027.
            </p>
            <p>
              Ketchikan appears on the large majority of those itineraries, usually paired with
              Juneau and Skagway plus a scenic glacier-viewing day. Magic sailings additionally
              tend to feature Icy Strait Point near Hoonah, while glacier days are typically Dawes
              Glacier in Endicott Arm or a Stikine Icecap cruise-by, depending on the week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Season', value: 'May – September', note: 'Ketchikan\'s wider cruise season runs late April to end of September.' },
              { label: 'Home Port', value: 'Vancouver, BC', note: 'Round-trip. You will need a passport and Canadian entry.' },
              { label: 'Ships', value: 'Magic & Wonder', note: 'The two classic-class ships — smaller, and better suited to these ports.' },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="font-bold text-[#1E3A5F] text-lg">{value}</p>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Excursions */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Waves className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-white">Top Ketchikan Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">Ranked by how well they work for Disney cruise families. Prices are per person and move year to year — treat them as planning ranges, not quotes.</p>

          <div className="space-y-4">
            {[
              {
                rank: '01',
                name: 'Misty Fjords Floatplane Flightseeing',
                type: 'Flightseeing',
                time: '1–2 hours',
                price: '~$340–$450/person',
                description: 'The reason people fly to Ketchikan on purpose. A DeHavilland floatplane lifts off the harbor and flies you into Misty Fjords National Monument — 3,000-foot granite walls, hanging waterfalls, and lakes with no road access. Roughly one-hour flights skip the landing; 90-minute versions set down on a remote lake so you can stand on the float. Both are worth it; the landing version is the memory.',
                tip: 'Kids prone to motion sickness should sit forward and dose before boarding. Flights cancel for weather more often than any other Alaska excursion — book on the earliest slot your port time allows so there is room to rebook.',
              },
              {
                rank: '02',
                name: 'The Great Alaskan Lumberjack Show',
                type: 'Family Show',
                time: '1.5 hours',
                price: '~$40–$50/person',
                description: 'Competitive log rolling, axe throwing, springboard chopping, and a 50-foot speed climb, staged in a covered grandstand a five-minute walk from the ship. It is unapologetically corny and it is the single most reliable crowd-pleaser in Alaska for kids roughly 4 to 12. Covered seating means rain does not cancel it.',
                tip: 'Book the show time closest to your arrival, then walk Creek Street afterward. Both fit comfortably inside a short afternoon call.',
              },
              {
                rank: '03',
                name: 'Bering Sea Crab Fishermen\'s Tour',
                type: 'Boat / Wildlife',
                time: '~3 hours',
                price: '~$235–$290/person',
                description: 'Three hours aboard the Aleutian Ballad, a real crab boat featured in season two of Deadliest Catch. The crew hauls pots on deck, brings up king crab, octopus, and rockfish for the kids to see up close, and the boat draws eagles in for the show. Covered stadium seating on the lower deck. Minimum age 5 and about 40 pounds.',
                tip: 'Sit on the lower covered deck with children. The upper rows have the better sightlines and all of the wind and rain.',
              },
              {
                rank: '04',
                name: 'Totem Bight & Saxman Native Village',
                type: 'Cultural',
                time: '2.5–3.5 hours',
                price: '~$60–$120/person',
                description: 'Ketchikan holds the largest standing collection of totem poles in the world, split between Saxman Native Village south of town, Totem Bight State Historical Park to the north, and the Totem Heritage Center downtown. The guided village tours include a carver demonstration and, at Saxman, dance performances in the clan house. Genuinely educational rather than performative.',
                tip: 'The Totem Heritage Center is a short walk-plus-taxi from the pier and costs only a few dollars — a good budget substitute if a full village tour will not fit your port time.',
              },
              {
                rank: '05',
                name: 'Rainforest Canopy & Zipline Adventure',
                type: 'Adventure',
                time: '3–4 hours',
                price: '~$125–$225/person',
                description: 'A course of eight or nine ziplines, sky bridges, and a rappel descent strung through spruce and hemlock on the edge of the Tongass. Guides are excellent with nervous first-timers. Most operators set a minimum around age 6 and a weight floor near 70 pounds, with an upper limit around 250.',
                tip: 'Confirm the weight minimums for your youngest before booking. This is the excursion most likely to leave one child on the ground watching.',
              },
              {
                rank: '06',
                name: 'Creek Street & Married Man\'s Trail on Foot',
                type: 'Free / Self-Guided',
                time: '1–2 hours',
                price: 'Free',
                description: 'Creek Street is a boardwalk of gold-rush-era houses on pilings over Ketchikan Creek — historically the town\'s red-light district, now shops, a small museum, and the best photograph you will take in Alaska. In late summer the creek fills with spawning salmon and, some days, a black bear working the shallows. Married Man\'s Trail climbs into the trees behind it.',
                tip: 'Go late in the afternoon after the other ships have sailed. The boardwalk empties out and the light is better.',
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

      {/* Walkable from the Ship */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Footprints className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Walkable From the Gangway</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Ketchikan is the one Alaska port where doing nothing organized is a perfectly good plan.
            If your call is short, or the weather has grounded the floatplanes, or you simply do not
            want to spend $1,600 to put a family of four on a boat, this list fills a genuinely
            enjoyable afternoon without a reservation.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'Creek Street Boardwalk',
                tier: 'Free',
                location: '10-minute walk',
                why: 'Historic houses on stilts above a salmon creek. Dolly\'s House Museum charges a small admission and is a surprisingly frank piece of local history for older kids and adults. The funicular up to Cape Fox Lodge is a couple of dollars and skips the hill.',
              },
              {
                name: 'Southeast Alaska Discovery Center',
                tier: 'A few dollars',
                location: '5-minute walk',
                why: 'A federal interpretive center covering the Tongass rainforest, Native cultures, and southeast ecosystems. Air-conditioned, indoors, and staffed by rangers who are excellent with children — the correct answer to a hard rain and a tired four-year-old.',
              },
              {
                name: 'Married Man\'s Trail & Salmon Ladder',
                tier: 'Free',
                location: '12-minute walk',
                why: 'A short forest trail behind Creek Street with a fish ladder viewing point. In July and August the salmon run is dense enough that you will see them stacked in the creek and, with some luck, an eagle or bear taking advantage.',
              },
              {
                name: 'Downtown Seafood & The Salmon Chowder Circuit',
                tier: '$15–$35 per person',
                location: '2–10 minute walk',
                why: 'Alaska Fish House, Bar Harbor, and the Alaska Crab & Grill sit within a short walk of the berths and serve the halibut and salmon that make the trip worth it. Portions are large; two adults and two kids can share three entrées comfortably.',
              },
            ].map(({ name, tier, location, why }) => (
              <div key={name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-[#1E3A5F]/20 text-[#0a1628] px-2.5 py-1 rounded-full font-medium">{tier}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{location}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Book Early */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-3xl font-bold text-white mb-3">What to Book Early</h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            Disney opens Port Adventure booking by Castaway Club tier — Pearl at 123 days before
            sailing, Platinum at 120, Gold at 105, Silver at 90, and first-time cruisers at 75.
            Alaska sells out faster than the Caribbean because the operators are small and the
            season is short. Here is the order of urgency for Ketchikan.
          </p>
          <div className="space-y-3">
            {[
              { when: 'The moment your window opens', what: 'Misty Fjords flights with a lake landing. Each plane holds a handful of people, and Ketchikan hosts up to five ships a day in July and August.' },
              { when: 'Within the first week', what: 'Bering Sea Crab Fishermen\'s Tour. One boat, two departures a day, and a hard age minimum that families discover late.' },
              { when: 'Within the first month', what: 'Ziplines and guided totem village tours. Both have real capacity, but the afternoon departures that suit a late Ketchikan call fill first.' },
              { when: 'Any time, including onboard', what: 'The Lumberjack Show. Multiple daily performances, large covered grandstand, and tickets are usually available same-day at the box office by the pier.' },
              { when: 'Never — just walk', what: 'Creek Street, the Discovery Center, and the salmon ladder. Paying for a guided walking tour of a town this small is the most avoidable expense in Alaska.' },
            ].map(({ when, what }) => (
              <div key={when} className="bg-white/10 rounded-xl p-5">
                <p className="text-[#D4AF37] font-bold text-sm mb-1">{when}</p>
                <p className="text-blue-100 text-sm leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-sm mt-6 leading-relaxed">
            Booking independently is usually cheaper than booking the same tour through Disney, but
            only the Disney-booked version guarantees the ship waits for you. On a port with an
            8:00pm all-aboard and a floatplane that flies in Alaskan weather, that guarantee is
            worth more than it is in Nassau. Our{' '}
            <Link href="/guides/excursion-savings" className="text-[#D4AF37] font-semibold hover:text-white transition-colors">excursion savings guide</Link>{' '}
            walks through when the trade is worth making.
          </p>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Insider Ketchikan Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Check your arrival time before you book anything', detail: 'Ketchikan calls on Disney Alaska itineraries are frequently afternoon arrivals — some as late as 2:00pm with an 8:00pm departure. Morning-only tours are common here. Verify the time on your specific sailing first.' },
              { tip: 'Rain gear beats umbrellas', detail: 'A packable rain jacket with a hood and waterproof shoes will serve you far better than an umbrella in a town where the wind comes off the Narrows. Layer a fleece under it and you are set for the whole Alaska week.' },
              { tip: 'Move your dinner seating before you sail', detail: 'A late all-aboard collides with Disney\'s main dining rotation. If you have early seating and an evening excursion, ask Guest Services to move you the first morning — or plan on the buffet that night and keep your rotation intact.' },
              { tip: 'Book the first flight slot, not the last', detail: 'Floatplanes cancel for ceiling and visibility more than any other Alaska excursion. An early slot leaves the operator room to roll you to a later flight the same day. A last slot leaves you with a refund and no Misty Fjords.' },
              { tip: 'Bring cash in small bills for the artists', detail: 'Native carvers and artists sell directly downtown and at Saxman, and card readers are inconsistent. Buying straight from the carver is the one souvenir in Alaska genuinely worth the money.' },
              { tip: 'The kids clubs stay open in port', detail: 'Oceaneer Club and Lab run on port days. If one parent wants Misty Fjords and one child does not want a small plane, Disney\'s programming makes splitting the day easy — no babysitter arithmetic required.' },
              { tip: 'Five ships a day is real in July', detail: 'Peak-season Ketchikan can host five cruise ships at once. Creek Street at 11am in July is a queue. The same boardwalk at 5pm, after the early ships sail, is nearly empty.' },
              { tip: 'You are in the US — no passport needed to go ashore', detail: 'Ketchikan, Juneau, and Skagway are all domestic stops. The passport matters for Vancouver embarkation, not the port days. Still bring your Key to the World card and a photo ID.' },
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
              { name: 'Skagway', href: '/guides/ports/skagway', emoji: '🚂', desc: 'The White Pass railroad and gold rush history' },
              { name: 'All Port Guides', href: '/ports', emoji: '🧭', desc: 'Every Disney Cruise Line destination' },
              { name: 'Packing List', href: '/guides/disney-cruise-packing-list', emoji: '🧳', desc: 'What to bring — including cold-weather layers' },
            ].map(({ name, href, emoji, desc }) => (
              <Link key={href} href={href} className="group flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
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
