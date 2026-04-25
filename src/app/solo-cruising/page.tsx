import { getSailings } from '@/lib/data'
import { formatPrice, formatDateShort } from '@/lib/utils'
import { Accordion, type AccordionItem } from '@/components/ui/accordion'
import Link from 'next/link'
import { Heart, Users, Zap, Wallet, Shield, MapPin, Calendar, Anchor, ArrowRight } from 'lucide-react'

// Metadata
export const metadata = {
  title: 'Solo Cruising — Your Guide to Sailing Alone on Disney Cruise Line',
  description: 'Discover the freedom of solo cruising. Find solo-friendly sailings, tips for meeting people, safety advice, and the best value cruises for solo travelers.',
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
    description: 'Cruise ships are incredible for making new friends. Solo cabins bring together like-minded travelers.',
  },
  {
    icon: Heart,
    title: 'Ultimate Self-Care',
    description: 'Spa days, quiet moments on the deck, or action-packed adventures — all on your terms.',
  },
  {
    icon: Wallet,
    title: 'Better Value Than You Think',
    description: 'Single supplement fees have dropped significantly. Compare per-person to group travel and you might be surprised.',
  },
]

const SOLO_TIPS: AccordionItem[] = [
  {
    id: 'single-supplement',
    title: 'Understanding Single Supplement Fees',
    content: (
      <div className="space-y-3">
        <p>
          A single supplement is an additional fee charged when one person occupies a cabin designed for two. However, Disney has made solo cruising more affordable:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>Many solo staterooms (Studio cabins) have no or reduced supplemental fees</li>
          <li>On some sailings, the supplement is as low as 10-20% of the base rate</li>
          <li>Studio passengers enjoy exclusive perks like a private lounge and concierge service</li>
          <li>Book early to lock in the best rates for your preferred sailing dates</li>
        </ul>
        <p className="text-sm pt-2">
          <strong>Pro tip:</strong> Compare the per-person cost of a studio cabin to sharing a stateroom with another guest. Often solo travel is just as affordable!
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
          <li><strong>Studio Lounge:</strong> Exclusive for Studio cabin guests — complimentary drinks and a welcoming crowd</li>
          <li><strong>Dining:</strong> Request a shared table at dinner or join a table for two with another solo traveler</li>
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
          <li><strong>Studio Cabins:</strong> Compact, modern, and located near the exclusive Studio Lounge — perfect for meeting other solo travelers</li>
          <li><strong>Inside Cabins:</strong> Lower deck locations near dining areas and activity zones are convenient</li>
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
          All Disney ships welcome solo travelers, but newer ships have better Solo accommodations:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li><strong>Wish, Treasure, Destiny:</strong> The newest ships with the most modern Studio cabins and dedicated Studio Lounge experiences</li>
          <li><strong>Dream, Fantasy:</strong> Excellent amenities and welcoming atmosphere for solo guests</li>
          <li><strong>Magic, Wonder:</strong> Smaller, more intimate ships — great if you prefer a quieter sailing</li>
        </ul>
        <p className="text-sm pt-2">
          <strong>Pro tip:</strong> Check the sailing date — newer ships tend to attract younger, more social crowds, while older ships attract families and experienced cruisers.
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0a1628] via-[#1E3A5F] to-[#0a1628] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Solo Cruising: Your Guide to Sailing Alone (and Loving It)
          </h1>
          <p className="text-lg text-slate-600 font-inter mb-6 max-w-2xl mx-auto">
            Discover the freedom, friendship, and adventure waiting for you on a solo cruise. You&rsquo;ll never feel alone when you&rsquo;re surrounded by thousands of possibilities.
          </p>
        </div>
      </section>

      {/* Why Cruise Solo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                  className="bg-white rounded-lg border border-slate-200 p-8 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#1E3A5F]/20">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1E3A5F]/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-3 text-center">
            Perfect Solo-Friendly Sailings
          </h2>
          <p className="text-center text-slate-600 mb-12 font-inter">
            Short, affordable voyages perfect for first-time solo cruisers
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
                  <div className="h-full bg-white rounded-lg border border-slate-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
                    {/* Card Header */}
                    <div className="p-5 border-b border-slate-200 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
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
                        <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">
                          {formatPrice(Math.round(perNightCost))}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 font-inter">
                          {formatPrice(sailing.current_lowest_price)} total
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 bg-slate-50 border-t border-slate-200 group-hover:bg-[#1E3A5F]/10 transition-colors">
                      <button className="w-full inline-flex items-center justify-center gap-2 text-[#D4AF37] font-inter font-semibold hover:text-blue-700 transition-colors">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0a1628] font-inter font-semibold rounded-lg hover:bg-[#c9a430] transition-colors"
            >
              Browse All Solo-Friendly Sailings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Solo Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-12 text-center">
            Solo Cruiser Tips & FAQs
          </h2>

          <Accordion items={SOLO_TIPS} allowMultiple={true} />
        </div>
      </section>

      {/* Solo Cost Calculator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1E3A5F]/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-3 text-center">
            Solo Cost Calculator
          </h2>
          <p className="text-center text-slate-600 mb-12 font-inter">
            See how solo cruise costs compare to other travel
          </p>

          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="space-y-6">
              {/* Example 1 */}
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-fraunces font-bold text-slate-900 mb-4">
                  7-Night Eastern Caribbean on Dream
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Base Price
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-slate-900">
                      {formatPrice(6384)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Per Night
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">
                      {formatPrice(Math.round(6384 / 7))}
                    </p>
                  </div>
                </div>

                <div className="bg-[#1E3A5F]/10 border border-blue-200 rounded p-4">
                  <p className="text-sm text-slate-700 font-inter">
                    <strong>Compare:</strong> Resort stay (luxury) = {formatPrice(200)}/night | Hotel + flights = ~{formatPrice(250)}/day | All-inclusive = ~{formatPrice(300)}/day
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-fraunces font-bold text-slate-900 mb-4">
                  4-Night Bahamian on Wish (Studio)
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Studio + 10% Supplement
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-slate-900">
                      {formatPrice(Math.round(4288 * 1.1))}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide mb-1 font-inter">
                      Per Night
                    </p>
                    <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">
                      {formatPrice(Math.round((4288 * 1.1) / 4))}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <p className="text-sm text-slate-700 font-inter">
                    <strong>Pro Tip:</strong> Studio cabins on newer ships often have no supplement at all! Check availability for even better deals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#0a1628] to-[#1E3A5F] rounded-lg p-12 text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="font-fraunces text-3xl font-bold mb-4">
            Join the Sail Together Community
          </h2>
          <p className="text-lg opacity-95 mb-8 font-inter">
            Find cruise buddies, share experiences, and never sail alone. Connect with other solo cruisers who understand the freedom and joy of solo travel.
          </p>
          <button className="px-8 py-3 bg-[#D4AF37] text-[#0a1628] font-inter font-semibold rounded-lg hover:bg-[#c9a430] transition-colors">
            Find Your Cruise Squad
          </button>
        </div>
      </section>
    </main>
  )
}
