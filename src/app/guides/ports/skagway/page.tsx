import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Waves, Footprints, CalendarClock, AlertTriangle } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/ports/skagway' },
  title: 'Skagway, Alaska Cruise Guide — Disney Cruise Port Tips',
  description: 'Everything you need to know about Skagway on a Disney Alaska cruise — the White Pass & Yukon Route railroad, dock logistics, passport rules for Yukon tours, and what to book early.',
  keywords: ['skagway disney cruise', 'skagway cruise port guide', 'white pass yukon route railroad', 'skagway shore excursions', 'disney alaska cruise skagway'],
  openGraph: {
    title: 'Skagway, Alaska Cruise Guide — Disney Cruise Port Tips',
    description: 'The White Pass railroad, Klondike gold rush history, dock logistics, and passport rules for Yukon tours on a Disney Alaska cruise.',
    url: 'https://gatgridcruises.com/guides/ports/skagway',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skagway, Alaska Cruise Guide',
    description: 'White Pass railroad, gold rush history, and dock logistics on a Disney Alaska cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function SkagwayPage() {
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
            <span className="text-blue-300 text-sm">Skagway</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🚂</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Skagway, Alaska
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">Head of the Lynn Canal — the Klondike gold rush, preserved</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Skagway is a town of roughly a thousand year-round residents that receives close to a
            million cruise visitors a summer, and somehow remains the most genuinely historic stop
            on a Disney Alaska itinerary. It has one unmissable excursion, one piece of dock
            logistics that catches families out, and one paperwork rule that can end a tour at the
            Canadian border.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Typical Port Time', value: '8–11 hours', icon: '⏱️' },
              { label: 'Dock to Broadway', value: '5–20 min, berth-dependent', icon: '🚶' },
              { label: 'Signature Tour', value: 'White Pass railroad', icon: '🚂' },
              { label: 'Annual Rainfall', value: '~26 inches', icon: '☀️' },
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
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect in Skagway</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Skagway sits at the very head of the Lynn Canal, the deepest fjord in North America,
              hemmed in by mountains on three sides. In 1897 it was the beach where roughly a
              hundred thousand stampeders came ashore to walk to the Klondike goldfields. Most of
              the six-block downtown they built is still standing, and most of it is now managed by
              the National Park Service as the Klondike Gold Rush National Historical Park.
            </p>
            <p>
              The practical effect is that Skagway&apos;s main street is a preserved 1898 townscape
              with wooden boardwalks and false-front buildings, rather than a modern strip of
              jewelry shops pretending to be one. There are jewelry shops — there are a great many
              jewelry shops — but they are housed in real gold rush buildings, and the Park Service
              visitor center, museum, and free ranger walks are woven right through them.
            </p>
            <p>
              Two things distinguish a Skagway day from Ketchikan or Juneau. First, the weather is
              genuinely different: Skagway sits in a rain shadow and averages somewhere near 26
              inches of precipitation a year, roughly a sixth of Ketchikan&apos;s. It is the port
              most likely to give you a clear, warm afternoon — and also the port most likely to be
              windy enough to matter on an open train car. Second, Skagway port calls tend to be
              long, often eight to eleven hours, which leaves room for a substantial excursion and a
              walk through town rather than forcing a choice between them.
            </p>
            <p>
              The town is compact enough that you can see everything worth seeing on foot in about
              ninety minutes. What you cannot do on foot is the part everyone comes for: the climb
              up White Pass.
            </p>
          </div>
        </div>
      </section>

      {/* Dock logistics warning */}
      <section className="py-12 bg-amber-50 border-t border-b border-amber-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-3">Check Your Berth Before You Plan the Day</h2>
              <div className="text-slate-700 leading-relaxed space-y-3 text-sm md:text-base">
                <p>
                  Skagway has more than one cruise berth, and they are not interchangeable. Since
                  rockslides came off the ridge above the Railroad Dock in 2022, that berth has been
                  under pedestrian restrictions — ships assigned there have at times moved guests
                  ashore by shuttle bus or small boat rather than letting them simply walk off.
                  Mitigation work has been ongoing and the situation has shifted season to season.
                </p>
                <p>
                  From the Broadway Dock or the Ore Dock, downtown is a straightforward five- to
                  ten-minute walk. From a restricted berth, families have been advised to allow up
                  to an extra 45 minutes between leaving the stateroom and reaching a tour meeting
                  point.
                </p>
                <p className="font-semibold text-[#1E3A5F]">
                  Your berth assignment appears in the Disney Cruise Line Navigator app and the
                  Personal Navigator the evening before the port day. Read it before you commit to a
                  tight excursion connection, and build in the buffer if you are told to expect a
                  shuttle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When Disney Sails Here */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <CalendarClock className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">When Disney Sails to Skagway</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4 mb-6">
            <p>
              Disney Cruise Line ran two ships in Alaska for the 2026 season — the{' '}
              <Link href="/ships/disney-magic" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Magic</Link> and the{' '}
              <Link href="/ships/disney-wonder" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Wonder</Link> —
              both on seven-night round trips from Vancouver, British Columbia between May and
              September, with both ships scheduled to return for summer 2027.
            </p>
            <p>
              Skagway appears on the great majority of those weeks, typically alongside{' '}
              <Link href="/guides/ports/ketchikan" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Ketchikan</Link>,
              Juneau, and a scenic glacier day — usually Dawes Glacier in Endicott Arm or a Stikine
              Icecap cruise-by. Magic itineraries have also included Icy Strait Point near Hoonah.
              Because the Skagway call is long and the Ketchikan call is often short, it is worth
              loading your one big-ticket excursion into the Skagway day rather than the other way
              round.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Season', value: 'May – September', note: 'The White Pass railroad runs a matching summer schedule.' },
              { label: 'Home Port', value: 'Vancouver, BC', note: 'Round-trip. Passports are required for the sailing itself.' },
              { label: 'Ships', value: 'Magic & Wonder', note: 'Classic-class ships, around 2,700 guests — small enough to move quickly ashore.' },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-slate-50 rounded-xl border border-slate-200 p-5">
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
            <h2 className="font-fraunces text-3xl font-bold text-white">Top Skagway Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">Ranked by how well they work for Disney cruise families. Prices are per person and move year to year — treat them as planning ranges, not quotes.</p>

          <div className="space-y-4">
            {[
              {
                rank: '01',
                name: 'White Pass & Yukon Route — Summit Excursion',
                type: 'Railroad',
                time: '2.5–3 hours',
                price: '~$155 adult / ~$78 child',
                description: 'A narrow-gauge railway cut into the mountainside in 1898 and designated an International Historic Civil Engineering Landmark. The train climbs roughly 3,000 feet in 20 miles through tunnels, over trestles, and past Dead Horse Gulch before turning around at the White Pass summit near the Canadian border. Vintage parlor cars, open platforms between them, and commentary that is actually good. This is the one excursion in Alaska that nearly everyone rates worth the money.',
                tip: 'The Summit Excursion turns around before the border, so it is the one White Pass trip that does not require passports. Book direct at least 24 hours ahead for the lower fare, and note the boarding platform sits right by the docks.',
              },
                            {
                rank: '02',
                name: 'Glacier Helicopter Flight with Dog Sledding',
                type: 'Flightseeing',
                time: '3–4 hours',
                price: '~$550–$750/person',
                description: 'A helicopter lifts off Skagway, crosses the coastal range, and lands on a working icefield where a summer sled dog camp is set up on the snow. You get a real team, a real sled, and usually a turn at the runners plus puppy time in camp. It is the single most expensive thing a family can do on a Disney Alaska week and the one children talk about for years afterward.',
                tip: 'Weather-dependent and cancelled often for wind or ceiling. Book the earliest departure your port time allows so the operator can roll you later in the day if the first slot scrubs.',
              },
              {
                rank: '03',
                name: 'Klondike Highway & Yukon Suspension Bridge',
                type: 'Scenic Drive',
                time: '4–6 hours',
                price: '~$110–$200/person',
                description: 'A motorcoach up the Klondike Highway through the pass into British Columbia and the Yukon, with stops at the Yukon Suspension Bridge — a 200-foot span over the Tutshi River canyon — and viewpoints like Bove Island and Tormented Valley. Many versions combine the drive one way with the train the other, which is the best-value way to do both.',
                tip: 'This crosses an international border. Every member of your party, including infants, needs a valid passport in hand — not in the stateroom safe.',
              },
              {
                rank: '04',
                name: 'Liarsville Gold Rush Camp & Salmon Bake',
                type: 'Family / Cultural',
                time: '2.5–3 hours',
                price: '~$70–$110/person',
                description: 'A recreated stampeders\' tent camp a few minutes outside town with gold panning, a vaudeville show of gold rush tall tales, and a salmon bake lunch. It is unashamedly staged, and it is also the excursion that works best for a wide age spread — a five-year-old panning for flake gold and a grandparent eating grilled salmon are equally content.',
                tip: 'Everyone finds gold. The pans are salted. Let the kids believe it for a while.',
              },
              {
                rank: '05',
                name: 'Sled Dog Kennel & Puppy Camp',
                type: 'Wildlife / Family',
                time: '2–3 hours',
                price: '~$140–$200/person',
                description: 'The ground-level version of the helicopter tour, and a fraction of the price. You visit a working musher\'s kennel, ride a wheeled training cart pulled by a real team, and spend time with the current litter of husky puppies. No helicopter, no glacier, no weather cancellations — and for children under about eight, the puppies are the whole point anyway.',
                tip: 'If your budget will only stretch to one big Skagway excursion, put it on the train and do this kennel tour instead of the helicopter. Most families rate the trade well.',
              },
              {
                rank: '06',
                name: 'Broadway, the Park Service Museum & Gold Rush Cemetery',
                type: 'Free / Self-Guided',
                time: '1.5–3 hours',
                price: 'Free',
                description: 'The Klondike Gold Rush National Historical Park visitor center at Second and Broadway shows a short film, runs free ranger-led walking tours of the historic district, and stamps national park passports. The Arctic Brotherhood Hall\'s driftwood facade is a block away. Two miles out of town, the Gold Rush Cemetery holds Soapy Smith and Frank Reid, who shot each other on the Juneau Wharf in 1898, with Reid Falls a short climb behind it.',
                tip: 'Ask at the visitor center what time the next ranger walk leaves. It is free, roughly 45 minutes, and better than most paid town tours in Alaska.',
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

      {/* Passports */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Footprints className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">The Passport Rule Nobody Reads</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Skagway is the only Disney Alaska port where a shore excursion routinely leaves the
              United States. The Klondike Highway climbs over the pass into British Columbia and on
              into the Yukon, and the longer White Pass rail products — the ones that continue past
              the summit to Fraser, Bennett, or Carcross — cross the same border.
            </p>
            <p>
              Every one of those tours requires a valid passport for every traveler, including
              infants and children. Passport cards are not accepted for all of them, and a
              photograph of the passport on a phone is not accepted for any of them. The White Pass
              <strong> Summit Excursion</strong> is the exception: it turns around before the border,
              so it needs no passport at all. That single distinction is the most common source of
              ruined Skagway mornings.
            </p>
            <p>
              A related detail worth planning around: you already need passports to embark in
              Vancouver, so most families have them anyway. The failure mode is not owning one — it
              is leaving them locked in the stateroom safe on the one port day they matter. Put them
              in a waterproof pouch the night before, and count heads against documents at the
              gangway.
            </p>
            <p>
              If a child&apos;s passport is expired or still in processing, build your Skagway day
              around the Summit Excursion, the sled dog kennel, Liarsville, and the historic
              district. That is a genuinely full and satisfying day that never approaches the
              border.
            </p>
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
            Skagway&apos;s operators are small and its season is short, so the ordering matters more
            here than in the Caribbean.
          </p>
          <div className="space-y-3">
            {[
              { when: 'The moment your window opens', what: 'Helicopter glacier and dog sledding. A handful of aircraft serve every ship in port, and it is the first thing to sell out on a busy July day.' },
              { when: 'Within the first week', what: 'Combination rail-and-coach tours. These pair the train one direction with the Klondike Highway the other and consistently outsell the plain versions of both.' },
              { when: 'Within the first month', what: 'The White Pass Summit Excursion itself. The railroad has real capacity, but the departure times that suit your ship\'s schedule fill well before the train does.' },
              { when: 'Comfortably later', what: 'Liarsville and the sled dog kennel tours. Multiple daily departures and generous capacity — these are rarely a problem even at 75 days.' },
              { when: 'Never — just walk', what: 'The Park Service ranger walks, the museum, Broadway, and the Gold Rush Cemetery. Free, excellent, and on your own schedule.' },
            ].map(({ when, what }) => (
              <div key={when} className="bg-white/10 rounded-xl p-5">
                <p className="text-[#D4AF37] font-bold text-sm mb-1">{when}</p>
                <p className="text-blue-100 text-sm leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-sm mt-6 leading-relaxed">
            Booking the railroad direct is usually cheaper than the same seats through Disney, and
            in Skagway the risk of doing so is unusually low — the boarding platform is right at the
            docks and the trains run to a published timetable. For the helicopter tours, the
            calculus flips: weather cancellations and a hard all-aboard make Disney&apos;s guarantee
            worth paying for. Our{' '}
            <Link href="/guides/excursion-savings" className="text-[#D4AF37] font-semibold hover:text-white transition-colors">excursion savings guide</Link>{' '}
            covers how to think about that trade.
          </p>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Insider Skagway Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Sit on the left going up', detail: 'Heading out of Skagway toward the summit, the left-hand side of the train has the canyon, the waterfalls, and the view down to the inlet. The cars have open platforms at each end, so you can step out and shoot from either side regardless of your seat.' },
              { tip: 'Dress for the summit, not for Broadway', detail: 'Skagway at sea level can be 65°F and sunny while the White Pass summit is near freezing with wind. Take a real jacket and a hat on the train even when the town makes it feel silly.' },
              { tip: 'Passports out of the safe the night before', detail: 'Any tour crossing into British Columbia or the Yukon needs physical passports for every traveler, children included. The Summit Excursion is the one that does not.' },
              { tip: 'Skagway is the dry port — use it', detail: 'A rain shadow gives Skagway roughly a sixth of Ketchikan\'s rainfall. If your week has one guaranteed-outdoor plan, put it here rather than gambling it on a rainforest port.' },
              { tip: 'Read your berth assignment in the Navigator app', detail: 'Skagway berths differ. Some walk straight into town; a restricted berth can mean shuttles and up to 45 extra minutes from stateroom to tour meeting point. Check the night before.' },
              { tip: 'The long port day is your friend', detail: 'Skagway calls often run eight to eleven hours. That is enough for a substantial half-day excursion in the morning and the entire historic district on foot afterward — no need to choose.' },
              { tip: 'Cell service is thin past the pass', detail: 'Coverage drops quickly on the Klondike Highway and in the Yukon. Download your Navigator app details, all-aboard time, and any tour confirmations before you leave the ship.' },
              { tip: 'The kids clubs run on port days', detail: 'Oceaneer Club and Lab stay open while the ship is docked. If one parent wants the helicopter and a younger child does not, splitting the Skagway day is straightforward.' },
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
              { name: 'Ketchikan', href: '/guides/ports/ketchikan', emoji: '🌲', desc: 'Misty Fjords, totems, and a walkable port' },
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
