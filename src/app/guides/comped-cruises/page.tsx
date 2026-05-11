import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, DollarSign, Star, Anchor, Users, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Get a Free or Comped Cruise | GatGridCruises',
  description: 'A complete guide to getting comped cruises through casino programs, loyalty tiers, repositioning sailings, travel agent FAM trips, and credit card strategies.',
  openGraph: {
    title: 'How to Get a Free or Comped Cruise | GatGridCruises',
    description: 'Complete guide to getting comped cruises through casino programs, loyalty tiers, FAM trips, and credit card strategies.',
    url: 'https://gatgridcruises.com/guides/comped-cruises',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get a Free or Comped Cruise',
    description: 'Casino programs, loyalty tiers, FAM trips, and credit card strategies for getting a free cruise.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function CompedCruisesGuide() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E3A5F]/5 to-white border-b border-slate-200 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
            <Link href="/guides" className="hover:text-[#1E3A5F] transition-colors">Guides</Link>
            <span>/</span>
            <span>Comped Cruises</span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            How to Get a Free (or Nearly Free) Cruise
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            A no-BS guide to the real strategies that get people on cruise ships for little to nothing — casino comps, loyalty tiers, repositioning hacks, travel agent perks, and more.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1E3A5F]/20 text-[#1E3A5F] text-xs font-medium px-3 py-1.5 rounded-full">
              <DollarSign className="h-3.5 w-3.5" /> Casino Comps
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1E3A5F]/20 text-[#1E3A5F] text-xs font-medium px-3 py-1.5 rounded-full">
              <Star className="h-3.5 w-3.5" /> Loyalty Programs
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1E3A5F]/20 text-[#1E3A5F] text-xs font-medium px-3 py-1.5 rounded-full">
              <Anchor className="h-3.5 w-3.5" /> Repositioning Hacks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1E3A5F]/20 text-[#1E3A5F] text-xs font-medium px-3 py-1.5 rounded-full">
              <Users className="h-3.5 w-3.5" /> Travel Agent FAM Trips
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Intro */}
        <section>
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
            <p className="text-amber-900 font-semibold mb-1">Honest caveat upfront</p>
            <p className="text-amber-800 text-sm">
              &quot;Free&quot; cruises almost always have strings. Casino comps require gambling spend. Loyalty perks require booking paid cruises first. Repositioning fares are deeply discounted — not zero. FAM trips require working as a travel agent. Understand the full picture before chasing any of these.
            </p>
          </div>
        </section>

        {/* Section 1: Casino Comps */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 text-[#1E3A5F]" />
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Casino Cruise Comps</h2>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            Casino comps are the real deal — and three major cruise lines have serious programs. Royal Caribbean, Carnival, and Norwegian all use their onboard casino spend to reward gamblers with free or heavily discounted cruises. If you&apos;re a regular casino player, this is the most direct path to free cruising.
          </p>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Royal Caribbean: Club Royale</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Club Royale is Royal Caribbean&apos;s casino loyalty program, and it&apos;s arguably the most generous in the industry. It tracks your theoretical loss (not actual loss) across their casino machines and table games.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Tier 1 (Master): Complimentary cruises start appearing after reaching this level',
              'Tier 2 (Elite): 2-for-1 offers, free interior cabins on select sailings',
              'Tier 3 (Signature): Full free cruises including balcony rooms',
              'Suite Club: Suite comps, exclusive private club access, free drinks',
              'Comp cruises are sent via mail and email — watch for them in September–October for the following year',
              'Casino Host relationships matter — find your host on embarkation day and introduce yourself',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
            <strong>Pro tip:</strong> Video poker has better odds than slots and often counts the same for Club Royale points. Play $10/hand video poker (9/6 Jacks or Better) and you&apos;re losing less per dollar wagered while earning more comps.
          </div>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Carnival: Players Club</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Carnival&apos;s Players Club is less structured than Club Royale but can deliver serious value. The program awards Casino Credits that can be redeemed for free cruises.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Casino Credits are earned per dollar wagered — slots earn faster than table games',
              'Gold, Platinum, and Diamond tiers unlock cruise discounts and comps',
              'Carnival sends targeted offers to active casino players — check your email',
              'Casino Rates are discounted cruise fares for Players Club members (separate from full comps)',
              'Fun Play (bonus casino credits) is often included with casino rates',
              'Link your loyalty number before you play — points don\'t retroactively apply',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Norwegian: Casino at Sea</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Norwegian&apos;s Casino at Sea program is newer but competitive. Their Free Play promotions and casino rates can dramatically cut cruise costs.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Free Play amounts ($50–$500+) are often included with casino cruise rates',
              'High rollers can negotiate directly with casino hosts for comped suites',
              'NCL occasionally offers sailings where the entire cost is comped for top-tier casino players',
              'The program integrates with Latitudes Rewards (their loyalty program)',
              'Best value on Norwegian: casino rates plus Free at Sea deal = extremely cheap sailing',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
            <p className="text-red-800"><strong>Reality check:</strong> Casino comps are not free money. The house edge means you will lose money over time. Treat casino spending as entertainment cost, and comps as a bonus — not a strategy to profit.</p>
          </div>
        </section>

        {/* Section 2: Loyalty Programs */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#1E3A5F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-[#162d4a]" />
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Loyalty Program Strategies</h2>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            Every major cruise line has a loyalty program, and the top tiers unlock meaningful benefits — onboard credit, free laundry, specialty dining, internet discounts, and sometimes free cruises. The trick is reaching elite status efficiently.
          </p>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Disney Cruise Line: Castaway Club</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Disney&apos;s Castaway Club is straightforward — no points, just sailing count. But the perks at each tier are real and valuable.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">Tier</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">Requirement</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">Key Perks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-3 py-2.5 font-medium">Silver</td>
                  <td className="px-3 py-2.5 text-slate-600">1+ cruise</td>
                  <td className="px-3 py-2.5 text-slate-600">Early access to activities, onboard credit on some sailings</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium">Gold</td>
                  <td className="px-3 py-2.5 text-slate-600">5+ cruises</td>
                  <td className="px-3 py-2.5 text-slate-600">Earlier booking window, onboard gifts, priority check-in</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium">Platinum</td>
                  <td className="px-3 py-2.5 text-slate-600">10+ cruises</td>
                  <td className="px-3 py-2.5 text-slate-600">Earliest booking window (18+ months), exclusive cocktail party, upgraded welcome gifts</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-medium">Pearl</td>
                  <td className="px-3 py-2.5 text-slate-600">25+ cruises</td>
                  <td className="px-3 py-2.5 text-slate-600">All of the above + dedicated concierge-level service and the most exclusive perks Disney offers</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[#1E3A5F]/10 rounded-lg p-4 text-sm text-slate-700">
            <strong>Disney strategy:</strong> Book short 3-night or 4-night Bahamian cruises to build cruise count faster. Each sailing counts as 1 toward tier regardless of length. Silver → Platinum in 10 cruises with 3-nighters is more achievable than waiting for 7-night sailings.
          </div>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Royal Caribbean: Crown & Anchor Society</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Crown & Anchor is the gold standard for cruise loyalty programs. Points are earned by cruise nights (2 points per night for solo travelers, 1 point per night for others). Elite tiers unlock real savings.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Diamond Plus (175+ points): $400 onboard credit per 7-night sailing',
              'Pinnacle Club (700+ points): Complimentary specialty dining, unlimited beverages',
              'Pinnacle members receive invitation-only sailings and events',
              'Strategy: Book short sailings during point bonus promotions to tier-up faster',
              'Status matches are sometimes available — ask Royal Caribbean directly',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-900 mt-6 mb-3">Multi-Line Loyalty Stacking</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Some cruise loyalty programs allow status matches or credit transfers. Key relationships to know:
          </p>
          <ul className="space-y-2">
            {[
              'Carnival Corporation brands (Carnival, Princess, Holland America, Cunard, etc.) share some reciprocal benefits',
              'Royal Caribbean Group (Royal Caribbean, Celebrity, Silversea) have aligned loyalty tiers',
              'Norwegian Cruise Line Holdings (Norwegian, Oceania, Regent Seven Seas) offer some cross-brand perks',
              'Ask for a status match when you first join a new line — you often won\'t get it but it costs nothing to ask',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Repositioning Cruises */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Anchor className="h-5 w-5 text-purple-700" />
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Repositioning Cruise Hacks</h2>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            Repositioning cruises (often called &quot;repo cruises&quot;) happen when a ship moves from one seasonal deployment region to another — say, from the Caribbean to Alaska for summer, or from Europe back to the US in fall. These sailings are often the single cheapest per-night cruises available on any line.
          </p>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">Why Repositioning Cruises Are So Cheap</h3>
          <ul className="space-y-2 mb-4">
            {[
              'The ship needs to move regardless — selling half-price tickets is better than sailing empty',
              'Unusual routes mean less demand (many guests don\'t want one-way itineraries)',
              'Significant sea days (sometimes 5–7 consecutive) aren\'t for everyone',
              'One-way travel to reach or leave the port adds cost that deters buyers',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">Best Repositioning Opportunities</h3>
          <div className="space-y-4 mb-4">
            {[
              {
                title: 'Spring: Caribbean → Alaska/Pacific Northwest',
                detail: 'March–May. Ships leaving the Caribbean for Alaska season. Often depart Miami or Fort Lauderdale, arrive Vancouver or San Pedro. Frequently touch Panama Canal.',
              },
              {
                title: 'Fall: Alaska → Caribbean',
                detail: 'September–November. Alaska season ends, ships return south. Depart Vancouver or Seattle, arrive Fort Lauderdale or Tampa. Prices hit annual lows.',
              },
              {
                title: 'Fall: Europe → Caribbean',
                detail: 'October–November. European season ends. Ships trans-Atlantic from Southampton, Barcelona, or Lisbon to US East Coast. Best value in cruising — 14+ nights often under $1,500.',
              },
              {
                title: 'Spring: Caribbean → Mediterranean',
                detail: 'March–April. Ships cross the Atlantic toward Europe. US East Coast departures to Europe. Often include Azores or Canary Islands stops.',
              },
            ].map(item => (
              <div key={item.title} className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                <p className="text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">How to Find Repositioning Cruises</h3>
          <ul className="space-y-2">
            {[
              'Search for cruises with different departure and arrival ports (one-way sailings)',
              'Look for 12+ night sailings with many sea days — those are usually repos',
              'Check cruisecritic.com\'s repositioning section',
              'Set price alerts on cruise line websites for trans-oceanic sailings',
              'Book 6–12 months out for best selection; or within 30 days for flash pricing',
              'Factor in one-way flights — the savings often more than compensate',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Travel Agent Perks */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-amber-700" />
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Travel Agent FAM Trips</h2>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            FAM (familiarization) trips are cruises offered to travel agents at deeply reduced or free rates so they can experience the product firsthand. If you become a travel agent, these are a legitimate path to nearly free cruises — but it&apos;s real work.
          </p>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">How FAM Trips Work</h3>
          <ul className="space-y-2 mb-4">
            {[
              'Cruise lines offer FAM rates to accredited travel agents through their agent portals',
              'Rates are typically 50–80% off published pricing, sometimes free for specific sailings',
              'FAM cabins are often inside staterooms with restrictions (may not include peak sailings)',
              'Some programs require minimum annual sales volume to access FAM rates',
              'Consortium memberships (ASTA, CLIA, IATA) often unlock additional FAM opportunities',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">Becoming a Travel Agent for FAM Perks</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Host agencies like Travel Experts, InteleTravel, or KHM Travel let you affiliate as an independent contractor with relatively low barriers to entry. Key points:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Annual fees typically $100–$500/year plus per-booking fees',
              'You need a real IATA or CLIA number — not just a referral link',
              'Some host agencies require passing a certification course (free or low cost)',
              'You must actually sell some travel to maintain agent status',
              'Disney Earmarked Agencies give agents exclusive training and Disney-specific FAM access',
              'The IRS expects you to operate as a real business — keep records of expenses and income',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <p className="text-amber-900"><strong>Honest assessment:</strong> Becoming an agent purely for FAM trips is a grey area. You need to actually engage in the business. But if you genuinely enjoy helping friends and family book travel, hosting a few groups per year, and learning the industry — it can absolutely pay for itself in cruise benefits.</p>
          </div>
        </section>

        {/* Section 5: Credit Cards & Points */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Gift className="h-5 w-5 text-rose-700" />
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-slate-900">Credit Card Points Toward Cruises</h2>
          </div>

          <p className="text-slate-700 leading-relaxed mb-4">
            While you can&apos;t directly apply most credit card points to cruise bookings, there are smart paths. This isn&apos;t quite &quot;free&quot; but can dramatically reduce cost.
          </p>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">The Best Approaches</h3>
          <ul className="space-y-2 mb-4">
            {[
              'Chase Sapphire: Transfer points to Hyatt for pre-cruise hotel stays, freeing up cash for the cruise',
              'Amex Membership Rewards: Transfer to airlines for flights to the departure port',
              'Capital One Venture: Redeem directly as statement credit against cruise charges',
              'Discover it: 5% cashback on travel purchases (rotating category) applied to cruise deposits',
              'Disney Premier Visa: Earn Disney Dollars redeemable for DCL onboard credit and deposits',
              'Chase Sapphire Reserve: Travel Portal bookings include cruises at 1.5 cents/point value',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-slate-900 mt-5 mb-3">Disney Cruise Line Specifically</h3>
          <ul className="space-y-2">
            {[
              'The Disney Visa (Chase) earns Disney Reward Dollars at 1% on everything, 2% on Disney purchases',
              'Reward Dollars can be redeemed for Disney Cruise onboard credit ($50 minimum per transaction)',
              'The Disney Premier Visa earns 5% on DCL bookings made through disneyworld.com or disneycruise.com',
              'DCL does not participate in most bank travel portals — book direct or with a travel agent',
              'Onboard credit from credit cards can offset gratuities, specialty dining, or excursions',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Summary */}
        <section className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-xl p-6">
          <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-3">The Realistic Summary</h2>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            Truly &quot;free&quot; cruises are rare. But significantly discounted cruises are very achievable through a combination of these strategies. The players who extract the most value typically:
          </p>
          <ol className="space-y-2 text-sm text-slate-700">
            {[
              'Pick one primary cruise line and build loyalty status there',
              'Use a co-branded credit card to accumulate onboard credit',
              'Book 3–4 night sailings to build loyalty points faster',
              'Check casino rates if they\'re a regular casino visitor',
              'Consider agent status if they book travel for friends and family regularly',
              'Always book repositioning sailings when flexible on timing',
            ].map((item, i) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 bg-[#D4AF37]/30 text-[#1E3A5F] rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        {/* Planning CTA */}
        <div className="bg-[#1E3A5F] rounded-xl p-6 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-1">Start planning</p>
            <p className="text-white font-fraunces text-lg font-bold mb-1">Ready to book your next cruise?</p>
            <p className="text-slate-300 text-sm">Our travel advisors can help you find the best sailing and apply all these strategies — at no extra cost to you.</p>
          </div>
          <Link
            href="/book"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#1E3A5F] text-sm font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#2a4f7a] transition-colors text-sm"
          >
            Browse Current Disney Cruise Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/deals/other-lines"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            Other Cruise Line Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            More Guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
