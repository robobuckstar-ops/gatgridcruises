import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Star, Shield, Anchor, Plane, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Get Comped Cruises: 6 Proven Strategies',
  description:
    'Casino comps, loyalty programs, travel agent FAM trips, military discounts, repositioning deals — six real ways to cruise for free or deeply discounted on Disney Cruise Line.',
  openGraph: {
    title: 'How to Get Comped Cruises: 6 Proven Strategies',
    description:
      'Six real ways to cruise for free or nearly free — casino comps, loyalty programs, travel agent FAM trips, military discounts, and more.',
    url: 'https://gatgridcruises.com/blog/how-to-get-comped-cruises',
  },
}

const sections = [
  {
    icon: Star,
    title: '1. Casino Comps',
    content: `Disney Cruise Line does not have a casino — but other major lines do, and many families
    use casino comps to offset a vacation that includes a Disney cruise leg. If you're a regular
    at land-based casinos (MGM Rewards, Caesars Rewards, etc.) or cruise casinos (Royal Caribbean,
    Norwegian, Carnival), you may qualify for a heavily discounted or outright comped cruise on
    those lines. Use those savings to fund your Disney itinerary.

    Tips:
    — Play consistently at one casino brand to build tier status faster.
    — Ask your host specifically about cruise offers — they aren't always advertised.
    — Comp cruises often require you to cover taxes, port fees, and gratuities; budget accordingly.
    — Consider pairing a comped non-Disney sailing with a Disney cruise by repositioning to the same departure port.`,
  },
  {
    icon: Anchor,
    title: '2. Castaway Club Loyalty Program',
    content: `Disney Cruise Line's own loyalty program — Castaway Club — rewards repeat sailors with
    meaningful perks rather than free cruises outright, but the savings add up.

    Tiers:
    — Silver (1 previous sailing): early booking access, exclusive merchandise.
    — Gold (5 sailings): additional merchandise, priority embarkation at select ports.
    — Platinum (10 sailings): dedicated phone line, onboard credit, exclusive events.
    — Pearl (25 sailings): the top tier. Guests report receiving exclusive cocktail parties,
      priority tendering, and early port departure access.

    Strategy: book back-to-back ("B2B") sailings to hit tier thresholds faster. Even a 3-night
    + 4-night B2B counts as two separate cruises toward your Castaway Club status.`,
  },
  {
    icon: Plane,
    title: '3. Travel Agent FAM Trips',
    content: `FAM (familiarization) trips are heavily discounted or free sailings offered by cruise lines
    to travel agents so they can sell the product from firsthand experience. If you become a
    certified travel agent — even a "hobby agent" through a host agency — you may qualify.

    How it works:
    — Join a host agency (IATA/CLIA accredited). Costs run $25–$100/year for entry-level plans.
    — Complete Disney Cruise Line's College of Knowledge certification (free, online).
    — Once you have your CLIA or IATA card, you gain access to agent rates, which can be
      50–70% below retail. FAM trips appear on agent-only booking portals.
    — You'll typically need to attend a brief orientation session onboard and complete a
      post-FAM survey.

    Note: Disney Cruise Line FAM opportunities are competitive and typically reserved for agents
    who have demonstrated sales history. But even agent rates (without FAMs) are substantial discounts.`,
  },
  {
    icon: Shield,
    title: '4. Military Discounts',
    content: `Disney Cruise Line offers military rates to active-duty U.S. military personnel, veterans,
    and their immediate family members. These are among the most consistent and reliable discounts
    available — typically 10–20% off base fares, and sometimes more during targeted promotions.

    Who qualifies:
    — Active duty (all branches), National Guard, and reservists
    — U.S. veterans with honorable discharge
    — Spouses and dependents sailing in the same stateroom

    How to access:
    — Book through Disney Cruise Line directly and request the military rate (ID.me verification required).
    — Use a travel agent who specializes in military travel for additional perks.
    — Check for "Sail with a Hero" promotions — Disney has historically offered these around
      Veterans Day and Memorial Day.

    Pro tip: Military rates can sometimes be combined with Castaway Club discounts or
    onboard credit offers. Always ask before booking.`,
  },
  {
    icon: DollarSign,
    title: '5. Repositioning Sailings',
    content: `Repositioning sailings occur when Disney moves ships between deployment regions —
    for example, transitioning from Caribbean season to Mediterranean. These sailings are often
    3–5x longer than typical cruises and priced at a fraction of their per-night equivalent.

    Typical repositioning routes:
    — Port Canaveral → Barcelona (or reverse) in spring/fall: 14–16 nights
    — Miami → Vancouver for Alaska season: 10–12 nights
    — New York ↔ Florida: 2–4 nights, usually at very low prices

    What to expect:
    — More sea days (fewer port stops), which is ideal for relaxing but not for port-heavy travelers.
    — Repositioning deals are rare and sell out fast — set Deal Score alerts on GatGridCruises
      and check early. They often appear 6–10 months before departure.
    — Flights home can be expensive from repositioning destinations — factor in airfare.`,
  },
  {
    icon: Star,
    title: '6. Points & Miles Redemptions',
    content: `You can't redeem airline miles or hotel points directly for a Disney cruise, but you can
    use them to cover airfare and hotels — which dramatically reduces your total trip cost.

    Best cards for Disney cruise planning:
    — Chase Sapphire Preferred / Reserve: Strong travel portal and transfer partners.
      The sign-up bonus alone ($750–$1,000 value) can cover flights for two.
    — American Express Business Platinum: 150,000-point welcome offer after meeting spend.
      Points transfer to Delta, Air France/KLM, and others. Lounge access a bonus during embarkation.
      Apply here → [Amex Biz Plat link below]
    — Capital One Spark Miles: 2x on all purchases, flexible redemption.
      [Apply here](https://i.capitalone.com/JKlfRwN3f)

    Strategy: Use credit card points for flights and hotels. Pay for the cruise with a card
    that earns 2–3x on travel purchases. The Amex Biz Plat earns 5x on flights booked direct.`,
  },
]

export default function HowToGetCompedCruises() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] via-[#0D2145] to-[#1a3a6e] text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
              Travel Hacks
            </span>
          </div>
          <h1 className="font-fraunces text-3xl md:text-5xl font-bold mb-6 leading-tight">
            How to Get Comped Cruises: 6 Proven Strategies
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Free and deeply discounted cruises are real — if you know where to look. Here are
            six legitimate strategies that savvy Disney cruise fans use to sail for less.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-blue-300">
            <span>By GatGridCruises</span>
            <span>·</span>
            <span>12 min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-10">
              Getting a Disney cruise comped — or even significantly discounted — isn&apos;t a
              fantasy. It requires strategy, timing, and knowing which levers to pull. Below are
              six approaches that real travelers use, from casino relationships to military benefits
              to travel agent perks.
            </p>

            <div className="space-y-10">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.title} className="border-l-4 border-blue-600 pl-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h2 className="font-fraunces text-xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {section.content}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Amex CTA */}
            <div className="mt-12 p-6 bg-gradient-to-r from-[#006FCF] to-[#0077CC] rounded-2xl text-white">
              <p className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-2">
                American Express Business Platinum
              </p>
              <h3 className="font-bold text-xl mb-2">
                Earn 150,000 points — enough for two round-trip flights to any cruise port
              </h3>
              <p className="text-blue-200 text-sm mb-4">
                Use points for airfare, reducing your Disney cruise&apos;s total cost by $1,000+.
              </p>
              <a
                href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-white text-[#006FCF] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
              >
                Learn More →
              </a>
              <p className="text-[11px] text-blue-300 mt-3">
                Affiliate disclosure: GatGridCruises may earn a commission if you apply via our link, at no cost to you.
              </p>
            </div>

            {/* Bottom section */}
            <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                The Honest Bottom Line
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Disney Cruise Line rarely runs deep promotions the way other lines do —
                they don&apos;t need to. Demand is consistently high. But the strategies above are
                real, tested by the Disney cruising community, and can make a material difference
                in your out-of-pocket cost. The biggest lever: credit card points for flights and hotels,
                freeing up your cash budget for the cruise itself.
              </p>
            </div>

            {/* Related links */}
            <div className="mt-8">
              <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4">Related Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/travel-hacks" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Travel Hacks Hub — All Strategies →
                  </Link>
                </li>
                <li>
                  <Link href="/guides/best-time-to-book-disney-cruise" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Best Time to Book a Disney Cruise →
                  </Link>
                </li>
                <li>
                  <Link href="/deals/flash-deals" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Current Flash Deals →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </article>
    </main>
  )
}
