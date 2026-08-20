import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Lightbulb, Waves, Footprints, CalendarClock, AlertTriangle } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/ports/juneau' },
  title: 'Juneau, Alaska Cruise Guide — Disney Cruise Port Tips',
  description: 'Everything you need to know about Juneau on a Disney Alaska cruise — Mendenhall Glacier, whale watching, the Mount Roberts Tramway, and the 2026 shuttle and passenger-cap rules that changed how you plan the day.',
  keywords: ['juneau disney cruise', 'juneau cruise port guide', 'mendenhall glacier shuttle', 'juneau whale watching', 'disney alaska cruise juneau'],
  openGraph: {
    title: 'Juneau, Alaska Cruise Guide — Disney Cruise Port Tips',
    description: 'Mendenhall Glacier, humpback whale watching, the Mount Roberts Tramway, and the 2026 shuttle rules for your Disney Alaska port day.',
    url: 'https://gatgridcruises.com/guides/ports/juneau',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juneau, Alaska Cruise Guide',
    description: 'Mendenhall Glacier, whale watching, and the 2026 shuttle rules on a Disney Alaska cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function JuneauPage() {
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
            <span className="text-blue-300 text-sm">Juneau</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl flex-shrink-0" aria-hidden="true">🐋</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                Juneau, Alaska
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] font-medium">The state capital you cannot drive to — glaciers and humpbacks</p>
              </div>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Juneau packs the two things families come to Alaska for — a glacier you can walk up to
            and humpback whales you are all but guaranteed to see — into a single port day. It is
            also the port whose rules changed most for 2026, and planning it the way people planned
            it three years ago no longer works.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Typical Port Time', value: '8–10 hours', icon: '⏱️' },
              { label: 'Downtown to Mendenhall', value: '12 miles', icon: '🚌' },
              { label: 'Tramway From the Pier', value: 'Steps from the gangway', icon: '🚡' },
              { label: 'Whale Sightings', value: 'Near-guaranteed', icon: '🐋' },
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
          <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F] mb-6">What to Expect in Juneau</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Juneau is the only state capital in the United States that no road reaches. It sits on
              a narrow shelf between Mount Roberts, Mount Juneau, and the Gastineau Channel, backed
              by the Juneau Icefield — 1,500 square miles of ice that feeds roughly forty glaciers,
              including the one nearly every visitor comes to see. Everyone and everything arrives
              by boat or plane, which is a strange thing to absorb about a capital city of some
              thirty thousand people.
            </p>
            <p>
              Ships berth downtown along South Franklin Street, and from most berths you walk off
              into town. The Mount Roberts Tramway boards essentially in front of the ships. The
              state capitol, the Alaska State Museum, the Red Dog Saloon, and a long row of shops
              are within a few blocks. Ships assigned to the AJ Dock further south are a longer walk
              or a short shuttle, and on the busiest days a vessel may anchor and tender — check the
              Navigator app the night before rather than assuming.
            </p>
            <p>
              The two headline attractions pull in opposite directions geographically. Mendenhall
              Glacier is twelve miles out of town toward the airport. Whale watching departs from
              Auke Bay, which is also out that way. Downtown, the tram, and the museums are right
              where the ship is. A well-planned Juneau day picks one direction for the morning and
              the other for the afternoon; a badly planned one burns two hours in transit doing both
              badly.
            </p>
            <p>
              Juneau is also a rainforest port, wetter than Skagway though not quite Ketchikan.
              Assume some rain, bring the layers, and know that a grey day genuinely does not hurt
              whale watching — the humpbacks do not care, and flat overcast water often makes spouts
              easier to spot.
            </p>
          </div>
        </div>
      </section>

      {/* 2026 rules changed */}
      <section className="py-12 bg-amber-50 border-t border-b border-amber-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-3">What Changed in 2026</h2>
              <div className="text-slate-700 leading-relaxed space-y-3 text-sm md:text-base">
                <p>
                  2026 was the first season Juneau operated under a negotiated daily passenger cap.
                  Under the agreement between the city and the cruise lines, arrivals are limited to
                  roughly <strong>16,000 lower berths per day Sunday through Friday, and about
                  12,000 on Saturdays</strong>. The intent is to smooth out the crush rather than
                  reduce the season, and for a visitor the practical effect is mostly positive:
                  fewer of the days where five megaships empty into a six-block downtown at once.
                </p>
                <p>
                  The change that actually affects your planning is downstream of it. The Mendenhall
                  Glacier shuttles moved to <strong>reserved return times</strong> — the old
                  walk-up, hop-on, come-back-whenever service is gone, a consequence of managing
                  congestion on the Mendenhall Loop road. You now book a seat both ways and commit
                  to a window.
                </p>
                <p className="font-semibold text-[#1E3A5F]">
                  Plan Mendenhall as a scheduled block with a fixed return, not as a flexible
                  afternoon whim. If you want to linger at Nugget Falls, book the later return
                  slot deliberately rather than assuming you can catch the next bus.
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
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">When Disney Sails to Juneau</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4 mb-6">
            <p>
              Disney Cruise Line ran two ships in Alaska for the 2026 season — the{' '}
              <Link href="/ships/disney-magic" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Magic</Link> and the{' '}
              <Link href="/ships/disney-wonder" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Disney Wonder</Link> —
              on seven-night round trips from Vancouver, British Columbia between May and September,
              with both ships scheduled back for summer 2027.
            </p>
            <p>
              Juneau appears on nearly every one of those weeks, paired with{' '}
              <Link href="/guides/ports/skagway" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Skagway</Link>,{' '}
              <Link href="/guides/ports/ketchikan" className="text-[#1E3A5F] font-semibold hover:text-[#D4AF37] transition-colors">Ketchikan</Link>,
              and a scenic glacier-viewing day — commonly Dawes Glacier in Endicott Arm, sometimes a
              Stikine Icecap cruise-by. Magic itineraries have also featured Icy Strait Point near
              Hoonah.
            </p>
            <p>
              At roughly 2,700 guests, the Magic and Wonder are small by modern standards. In a port
              now managing its arrivals by the head, that is a real advantage — the ships fit
              comfortably inside the caps and tend to disembark quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Season', value: 'May – September', note: 'Peak humpback activity builds through June, July, and August.' },
              { label: 'Home Port', value: 'Vancouver, BC', note: 'Round-trip. Juneau itself is a domestic stop — no passport needed ashore.' },
              { label: 'Ships', value: 'Magic & Wonder', note: 'Classic-class, around 2,700 guests — small enough to clear the gangway fast.' },
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
            <h2 className="font-fraunces text-3xl font-bold text-white">Top Juneau Excursions</h2>
          </div>
          <p className="text-blue-200 mb-8">Ranked by how well they work for Disney cruise families. Prices are per person and move year to year — treat them as planning ranges, not quotes.</p>

          <div className="space-y-4">
            {[
              {
                rank: '01',
                name: 'Whale Watching & Mendenhall Glacier Combo',
                type: 'Wildlife + Glacier',
                time: '4.5–6 hours',
                price: '~$190–$260/person',
                description: 'The single most efficient use of a Juneau day. A coach takes you out toward Auke Bay for a humpback cruise, then to the Mendenhall Glacier Visitor Center with enough time to walk the Nugget Falls trail. Juneau is the humpback capital of the world in summer, and by 2026 nearly every independent operator offers a full cash refund if you do not see a whale. You will see a whale.',
                tip: 'Ask the vessel size before booking. Boats carrying 14 to 24 passengers sit lower and closer to the water than the 150-passenger catamarans, and every child gets a rail spot.',
              },
              {
                rank: '02',
                name: 'Mendenhall Glacier & Nugget Falls on Your Own',
                type: 'Self-Guided',
                time: '3–4 hours',
                price: '~$2 by city bus, ~$45–$60 by shuttle',
                description: 'The glacier sits twelve miles from downtown at the end of a road, with a Forest Service visitor center, viewing decks, and a flat two-mile round-trip trail to Nugget Falls that ends with the glacier across the lake in front of you. It is the most accessible glacier in Alaska and entirely doable with children and grandparents. Capital Transit\'s public bus gets close for a couple of dollars, leaving a walk of roughly a mile and a half each way.',
                tip: 'From 2026 the glacier shuttles require a reserved return time — walk-up hop-on service ended. Book both directions and pick your return slot with the Nugget Falls walk in mind.',
              },
              {
                rank: '03',
                name: 'Helicopter Glacier Trek & Dog Sledding',
                type: 'Flightseeing',
                time: '3–4 hours',
                price: '~$550–$750/person',
                description: 'A helicopter up onto the Juneau Icefield, landing on Norris or Mendenhall for a guided walk on the ice in provided boots, or at a summer sled dog camp for a run behind a real team. This is the bucket-list item of an Alaska week and the most expensive thing on the ship\'s excursion list. Minimum ages vary by operator and the glacier trek versions generally set them higher than the dog sled ones.',
                tip: 'Weather-dependent and cancelled often. Book the earliest departure your port time allows so the operator has room to rebook you later the same day.',
              },
              {
                rank: '04',
                name: 'Mount Roberts Tramway',
                type: 'Scenic / Family',
                time: '1.5–3 hours',
                price: '~$30 all-day pass',
                description: 'The tram boards on South Franklin Street, essentially in front of the ships, and lifts you 1,800 feet up Mount Roberts in about six minutes. At the top there is a nature center, a short film on Tlingit culture, a raptor on display, a restaurant, and alpine trails that run as far as you want to walk them. The all-day pass means you can go up, come down for lunch, and go back up.',
                tip: 'The best-value fallback in Alaska. If a helicopter or boat tour cancels for weather, the tram is right there, cheap, and takes no advance booking.',
              },
              {
                rank: '05',
                name: 'Small-Boat Whale Watching from Auke Bay',
                type: 'Wildlife',
                time: '3–4 hours',
                price: '~$150–$220/person',
                description: 'Whale watching without the glacier bolt-on, on a smaller vessel with a naturalist and a hydrophone. Humpbacks bubble-net feed in these waters through the summer, and orcas, Steller sea lions, and bald eagles are routine sightings. Operators run sighting guarantees. The shorter format leaves the rest of your port day free for downtown or the tram.',
                tip: 'Bring a warm layer and a hat regardless of the forecast. A boat moving at speed on a 55°F day is considerably colder than the dock felt.',
              },
              {
                rank: '06',
                name: 'Downtown Juneau on Foot',
                type: 'Free / Self-Guided',
                time: '1.5–2.5 hours',
                price: 'Free to a few dollars',
                description: 'The Alaska State Capitol offers free tours in summer, the Alaska State Museum is a genuinely good building with a strong Native art and history collection for a modest admission, and St. Nicholas Russian Orthodox Church is the oldest of its kind in southeast Alaska. The Red Dog Saloon is a tourist trap with sawdust on the floor and is worth twenty minutes anyway.',
                tip: 'Do downtown in the last two hours before all-aboard. The out-of-town tours have returned by then, but so has everyone else — go early afternoon instead if you can flip the order.',
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

      {/* How to structure the day */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Footprints className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">How to Structure the Day</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Juneau punishes improvisation more than the other Alaska ports because the good things
            are twelve miles apart and the shuttles now run to reservations. Pick one of these
            shapes before you book anything.
          </p>
          <div className="space-y-4">
            {[
              {
                name: 'The Combo Day',
                tier: 'Best for most families',
                location: '5–6 hours booked',
                why: 'One whale-watching-plus-Mendenhall excursion handles all the transport, gets you both headliners, and returns you downtown with time for the tram or a walk. Costs more per person than assembling it yourself, and removes every logistics decision. If you only read one line on this page, this is it.',
              },
              {
                name: 'The Split Day',
                tier: 'Best for value',
                location: '~$2 bus + a boat tour',
                why: 'Public bus out to Mendenhall in the morning, walk Nugget Falls, bus back, then an afternoon small-boat whale tour from Auke Bay. Saves real money for a family of four. Requires that you actually enjoy logistics and that nothing runs late.',
              },
              {
                name: 'The Ice Day',
                tier: 'Best for a splurge',
                location: '3–4 hours booked',
                why: 'Helicopter onto the icefield in the morning for a glacier trek or dog sledding, then downtown and the Mount Roberts Tramway in the afternoon. Skips whale watching entirely — acceptable, because Endicott Arm and the scenic cruising day usually deliver wildlife anyway.',
              },
              {
                name: 'The Easy Day',
                tier: 'Best for little ones',
                location: 'No booking required',
                why: 'Mount Roberts Tramway, the nature center at the top, lunch downtown, the state museum, and back aboard early. No coaches, no boats, no schedule. For families with a toddler or anyone fighting a nap window, this is a perfectly good Alaska port day and nobody regrets it.',
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
            sailing, Platinum at 120, Gold at 105, Silver at 90, and first-time cruisers at 75. With
            Juneau now managing arrivals and shuttle seats by reservation, the early windows matter
            more than they used to.
          </p>
          <div className="space-y-3">
            {[
              { when: 'The moment your window opens', what: 'Helicopter glacier treks and glacier dog sledding. A limited fleet serves every ship in port, and these clear first on any busy day.' },
              { when: 'Within the first week', what: 'Small-boat whale watching. The 14-to-24-passenger operators are the ones worth having and they hold a fraction of the seats the big catamarans do.' },
              { when: 'Within the first month', what: 'Whale-plus-Mendenhall combination tours, and any Mendenhall shuttle seat. Reserved return times mean the convenient slots go before the inconvenient ones.' },
              { when: 'Comfortably later', what: 'Large-catamaran whale tours and coach city tours. Real capacity, rarely a problem even at 75 days.' },
              { when: 'No booking at all', what: 'Mount Roberts Tramway, downtown, the state museum, and the capitol. Walk up and buy on the day — and keep the tram in your back pocket as the weather fallback.' },
            ].map(({ when, what }) => (
              <div key={when} className="bg-white/10 rounded-xl p-5">
                <p className="text-[#D4AF37] font-bold text-sm mb-1">{when}</p>
                <p className="text-blue-100 text-sm leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
          <p className="text-blue-200 text-sm mt-6 leading-relaxed">
            Independent operators in Juneau are generally cheaper than the same experience booked
            through Disney, and the whale-watching guarantees are a genuine consumer protection. The
            trade-off is the same everywhere: only a Disney-booked Port Adventure obliges the ship
            to wait if your tour runs late. Our{' '}
            <Link href="/guides/excursion-savings" className="text-[#D4AF37] font-semibold hover:text-white transition-colors">excursion savings guide</Link>{' '}
            walks through when that is worth paying for.
          </p>
        </div>
      </section>

      {/* Insider Tips */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">Insider Juneau Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Mendenhall shuttles now need a reserved return', detail: 'The walk-up hop-on service ended with the 2026 congestion rules. Book both legs and choose your return time around the Nugget Falls walk, which takes about an hour round trip at an easy pace.' },
              { tip: 'Nugget Falls is flat and stroller-friendly', detail: 'A two-mile round trip on a wide gravel path, no real climb, ending at a waterfall with the glacier across the lake. It is the most rewarding easy walk on the whole itinerary.' },
              { tip: 'Ask the boat size before you book a whale tour', detail: 'A 14-to-24-passenger vessel sits low and gives every child a rail. A 150-passenger catamaran gives you a window seat and a queue for the deck.' },
              { tip: 'Grey weather does not hurt whale watching', detail: 'Flat overcast water makes spouts and backs easier to pick out. Save your one clear-day plan for Skagway and let Juneau be the port you accept rain in.' },
              { tip: 'The tram is the best weather fallback in Alaska', detail: 'No advance booking, roughly $30 for an all-day pass, boards in front of the ship. When the helicopters ground, everyone else is scrambling and you can just walk on.' },
              { tip: 'Juneau is domestic — no passport ashore', detail: 'Unlike Skagway, no Juneau excursion crosses into Canada. Your Key to the World card and a photo ID are all you need for the day.' },
              { tip: 'Confirm your berth in the Navigator app', detail: 'Most downtown berths walk straight into town. The AJ Dock is further south, and on the busiest days a ship may anchor and tender. Check the night before if your tour has a tight meeting time.' },
              { tip: 'The kids clubs run on port days', detail: 'Oceaneer Club and Lab stay open while docked. If one child is too young for the helicopter or gets seasick on small boats, splitting the Juneau day between parents is easy.' },
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
              { name: 'Ketchikan', href: '/guides/ports/ketchikan', emoji: '🌲', desc: 'Misty Fjords, totems, and a walkable port' },
              { name: 'All Port Guides', href: '/ports', emoji: '🧭', desc: 'Every Disney Cruise Line destination' },
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
