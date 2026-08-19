import { getSailings } from '@/lib/data'
import { formatPrice, formatDateShort } from '@/lib/utils'
import { Accordion, type AccordionItem } from '@/components/ui/accordion'
import Link from 'next/link'
import { Heart, Users, Zap, Wallet, Shield, MapPin, Calendar, Anchor, ArrowRight } from 'lucide-react'

// Sailing lists are filtered against "today" in America/Chicago, so this page
// has to render per request — prerendering would freeze the expiry cutoff at
// build time and keep departed sailings on the page until the next deploy.
export const dynamic = 'force-dynamic'


// Metadata
export const metadata = {
  title: 'Solo Cruising — Your Guide to Sailing Alone on Disney Cruise Line',
  description: 'Discover the freedom of solo cruising. Find solo-friendly sailings, tips for meeting people, safety advice, and the best value cruises for solo travelers.',
  openGraph: {
    title: 'Solo Cruising — Your Guide to Sailing Alone on Disney Cruise Line',
    description: 'Find solo-friendly sailings, tips for meeting people, safety advice, and the best value cruises for solo travelers.',
    url: 'https://gatgridcruises.com/solo-cruising',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Cruising on Disney Cruise Line',
    description: 'Find solo-friendly sailings, tips for meeting people, and the best value cruises for solo travelers.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

const BENEFITS = [
  {
    icon: Zap,
    title: 'Complete Freedom',
    description: 'Chart your own course. Set your own schedule, choose your activities, and travel at your own pace.',
  },
  {
    icon: Users,
    title: 'Meet Amazing People',
    description: 'Disney ships are unusually social — shared dinner tables, adult-exclusive lounges, and deck events make it easy to find company when you want it.',
  },
  {
    icon: Heart,
    title: 'Ultimate Self-Care',
    description: 'Spa days, quiet moments on the deck, or action-packed adventures — all on your terms.',
  },
  {
    icon: Wallet,
    title: 'A Whole Stateroom to Yourself',
    description: 'Disney charges you for the full stateroom rather than offering a solo cabin — so the trade is real privacy and space at a genuine premium. Know the maths before you book.',
  },
]

const SOLO_TIPS: AccordionItem[] = [
  {
    id: 'single-supplement',
    title: 'Understanding the Single Supplement on Disney',
    content: (
      <div className="space-y-3">
        <p>
          Be aware of this before you plan: <strong>Disney Cruise Line does not sell dedicated
          solo or studio staterooms</strong>, and it does not discount a stateroom because only one
          person is sleeping in it. Disney quotes cruise fare on double occupancy, so a solo guest
          pays the full stateroom fare — in practice, close to twice the advertised per-person rate.
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>There is no solo cabin category and no reduced single supplement on DCL</li>
          <li>You pay the whole stateroom, whether one guest sails or two</li>
          <li>Government taxes, fees, and port expenses <em>are</em> charged per guest, so you pay one set of those instead of two</li>
          <li>Gratuities are also per guest, so a solo sailing carries a single guest&rsquo;s gratuities</li>
        </ul>
        <p className="text-sm pt-2">
          <strong>How to actually cut the cost:</strong> shorter 3&ndash;4 night sailings, an inside
          stateroom, off-peak dates (September, early December, late January), and the smaller
          classic ships (Magic and Wonder) all move the number far more than any solo-specific
          discount will, because there isn&rsquo;t one.
        </p>
      </div>
    ),
  },
  {
    id: 'meeting-people',
    title: 'Best Activities for Meeting People',
    content: (
      <div className="space-y-3">
        <p>
          Cruise ships are social environments. Here are the best ways to connect with fellow passengers:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li><strong>Rotational dining:</strong> Disney seats guests at shared tables and rotates you through restaurants with the same servers and tablemates all week — ask for a larger shared table and you have built-in dinner company every night</li>
          <li><strong>Adult-exclusive districts:</strong> every ship has one, and they&rsquo;re the easiest place to strike up a conversation</li>
          <li><strong>Trivia & Games:</strong> Deck competitions, wine tastings, and game shows attract friendly groups</li>
          <li><strong>Fitness & Wellness:</strong> Group yoga, fitness classes, and wellness seminars</li>
          <li><strong>Entertainment:</strong> Shows, dancing, and themed events happen every night</li>
          <li><strong>Shore Excursions:</strong> Group tours are perfect for meeting adventure-minded travelers</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'safety-tips',
    title: 'Safety Tips for Solo Travelers',
    content: (
      <div className="space-y-3">
        <p>
          Solo travel is safe, but smart preparation makes it safer:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>Share your itinerary and cabin number with a trusted friend or family member at home</li>
          <li>Keep valuables in your cabin safe and don&rsquo;t leave them unattended on deck</li>
          <li>Use the buddy system when exploring ports, even for a short time</li>
          <li>Stay aware of your surroundings, especially at night</li>
          <li>Keep your room key and ID with you at all times</li>
          <li>Attend the mandatory muster drill at the start of your cruise</li>
          <li>Trust your instincts — if something feels off, move away or notify crew</li>
          <li>Disney ships have 24/7 security and crew members trained to assist</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'cabin-locations',
    title: 'Best Cabin Locations for Solo Travelers',
    content: (
      <div className="space-y-3">
        <p>
          Where you stay affects your cruise experience:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li><strong>Inside staterooms:</strong> the cheapest way to sail solo on Disney, and the one lever that most reduces the stateroom fare you&rsquo;re carrying alone</li>
          <li><strong>Ocean View/Verandah:</strong> Higher decks offer quieter environments if you prefer solitude, great for sunrise/sunset viewing</li>
          <li><strong>Midship Locations:</strong> Less rocking motion and centrally located to most amenities</li>
          <li><strong>Avoid:</strong> Cabins directly below nightclubs or above engine rooms (noise)</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'best-ships',
    title: 'Which Ships Are Best for Solo Cruisers?',
    content: (
      <div className="space-y-3">
        <p>
          Every Disney ship welcomes solo guests, and none of them has a solo stateroom category —
          so pick on atmosphere and fare, not on solo accommodations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li><strong>Magic, Wonder:</strong> the smallest and usually the cheapest ships in the fleet — the best value when you&rsquo;re paying for a whole stateroom yourself, and intimate enough that you see the same faces all week</li>
          <li><strong>Dream, Fantasy:</strong> larger, with more adult-exclusive space to spread out into</li>
          <li><strong>Wish, Treasure, Destiny:</strong> the newest ships and the highest fares — the most expensive way to sail solo</li>
        </ul>
        <p className="text-sm pt-2">
          <strong>Pro tip:</strong> Because you&rsquo;re carrying the full stateroom cost, the ship
          and the season move your total far more than they would for a couple splitting the fare.
        </p>
      </div>
    ),
  },
]

export default function SoloCruisingPage() {
  const allSailings = getSailings()

  // Filter for solo-friendly sailings: 3-5 nights, convenient ports, good pricing
  const soloFriendlySailings = allSailings
    .filter(s => s.length_nights >= 3 && s.length_nights <= 5)
    .sort((a, b) => {
      // Prioritize by price
      const priceA = a.current_lowest_price / a.length_nights
      const priceB = b.current_lowest_price / b.length_nights
      return priceA - priceB
    })
    .slice(0, 6)

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Solo Cruising: Your Guide to Sailing Alone (and Loving It)
          </h1>
          <p className="text-lg text-blue-200 font-inter mb-6 max-w-2xl mx-auto">
            Discover the freedom, friendship, and adventure waiting for you on a solo cruise. You&rsquo;ll never feel alone when you&rsquo;re surrounded by thousands of possibilities.
          </p>
        </div>
      </section>

      {/* Why Cruise Solo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Cruise Solo?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 p-8 hover:border-[#1E3A5F] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#1E3A5F]/10">
                        <Icon className="w-6 h-6 text-[#1E3A5F]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600 font-inter">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solo-Friendly Sailings Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-3 text-center">
            Perfect Solo-Friendly Sailings
          </h2>
          <p className="text-center text-slate-600 mb-12 font-inter">
            Short, lower-cost voyages that suit a first solo sailing. Fares shown are for the whole
            stateroom — sailing solo, that&rsquo;s the figure you pay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soloFriendlySailings.map((sailing) => {
              const perNightCost = sailing.current_lowest_price / sailing.length_nights
              return (
                <Link
                  key={sailing.id}
                  href={`/sailing/${sailing.id}`}
                  className="group"
                >
                  <div className="h-full bg-white rounded-lg border border-slate-200 hover:border-[#1E3A5F] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
                    {/* Card Header */}
                    <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-[#1E3A5F]/5 to-[#1E3A5F]/10">
                      <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-2">
                        {sailing.itinerary_name}
                      </h3>
                      <p className="text-sm text-slate-600 font-inter">
                        {sailing.ship?.name || 'Disney Ship'}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-grow">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-700 font-inter">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          {formatDateShort(sailing.sail_date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700 font-inter">
                          <Anchor className="w-4 h-4 text-slate-600" />
                          {sailing.length_nights} nights
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700 font-inter">
                          <MapPin className="w-4 h-4 text-slate-600" />
                          {sailing.departure_port?.name || 'Departs'}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mt-5 pt-5 border-t border-slate-200">
                        <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                          From per night
                        </p>
                        <p className="font-fraunces text-2xl font-bold text-[#1E3A5F]">
                          {formatPrice(Math.round(perNightCost))}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 font-inter">
                          {formatPrice(sailing.current_lowest_price)} total
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 bg-slate-50 border-t border-slate-200 group-hover:bg-[#1E3A5F]/5 transition-colors">
                      <button className="w-full inline-flex items-center justify-center gap-2 text-[#1E3A5F] font-inter font-semibold hover:text-[#0a1628] transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-inter font-semibold rounded-lg hover:bg-[#0a1628] transition-colors"
            >
              Browse All Solo-Friendly Sailings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Solo Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-12 text-center">
            Solo Cruiser Tips & FAQs
          </h2>

          <Accordion items={SOLO_TIPS} allowMultiple={true} />
        </div>
      </section>

      {/* Solo Cost Examples Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-3 text-center">
            Solo Cruise Cost Examples
          </h2>
          <p className="text-center text-slate-600 mb-12 font-inter">
            See how solo cruise costs compare to other travel
          </p>

          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="space-y-6">
              {/* Example 1 */}
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-fraunces font-bold text-slate-900 mb-4">
                  7-Night Eastern Caribbean on Dream (sailing solo)
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Stateroom fare you pay alone
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-slate-900">
                      {formatPrice(6384)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Per Night
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-[#1E3A5F]">
                      {formatPrice(Math.round(6384 / 7))}
                    </p>
                  </div>
                </div>

                <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-4">
                  <p className="text-sm text-slate-700 font-inter">
                    <strong>Being straight with you:</strong> that per-night figure is well above a
                    land holiday, because you&rsquo;re absorbing a two-person stateroom on your own.
                    Meals, entertainment, and kids&rsquo; clubs are included, but Disney is a premium
                    solo choice — not a budget one. If cost is the deciding factor, a shorter sailing
                    on Magic or Wonder is where to look.
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-fraunces font-bold text-slate-900 mb-4">
                  4-Night Bahamian on Wish (inside stateroom, sailing solo)
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Stateroom fare — same for one guest as for two
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-slate-900">
                      {formatPrice(4288)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Per Night
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-[#1E3A5F]">
                      {formatPrice(Math.round(4288 / 4))}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-4">
                  <p className="text-sm text-slate-700 font-inter">
                    <strong>Read this before you budget:</strong> sailing solo does not halve the
                    fare on Disney. The stateroom costs what it costs, and one guest pays all of it.
                    What you do save is the second guest&rsquo;s taxes, port fees, and gratuities,
                    which are charged per person.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#1E3A5F] to-[#0a1628] rounded-lg p-12 text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
          <h2 className="font-fraunces text-3xl font-bold mb-4">
            Join the Sail Together Community
          </h2>
          <p className="text-lg text-blue-200 mb-8 font-inter">
            Find cruise buddies, share experiences, and never sail alone. Connect with other solo cruisers who understand the freedom and joy of solo travel.
          </p>
          <Link href="/community/sail-together" className="px-8 py-3 bg-[#D4AF37] text-[#1E3A5F] font-inter font-bold rounded-lg hover:bg-yellow-300 transition-colors">
            Find Your Cruise Squad
          </Link>
        </div>
      </section>
    </main>
  )
}
