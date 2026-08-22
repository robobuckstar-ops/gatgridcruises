import Link from 'next/link'
import { ShoppingBag, ExternalLink, Star } from 'lucide-react'
import { amazonSearchLink } from '@/lib/affiliate-config'

/**
 * The curated Amazon gear picks that used to live at /guides/packing-gear.
 *
 * That route now 301s to /guides/disney-cruise-packing-list (the two pages
 * were competing for the same query), but the redirect landed on a page with
 * no product links at all — so all 31 tagged Amazon buttons became
 * unreachable and stopped earning. The picks live here now and render on the
 * destination page, which keeps the SEO consolidation and the affiliate
 * revenue at the same time.
 */

interface Product {
  name: string
  /** Amazon search term — we link to a tagged search, not an unverified ASIN. */
  search: string
  why: string
  badge?: string
}

interface Category {
  id: string
  title: string
  icon: string
  description: string
  products: Product[]
}

const categories: Category[] = [
  {
    id: 'luggage',
    title: 'Luggage & Bags',
    icon: '🧳',
    description: 'Smart luggage choices that fit in stateroom closets and survive embarkation day.',
    products: [
      {
        name: 'Samsonite Softside 4-Wheel Spinner (25")',
        search: 'Samsonite softside spinner luggage 25 inch',
        why: 'DCL stateroom closets are narrow — a 25" softside fits perfectly and compresses for extra packing space. Hardshell suitcases often can\'t squeeze into the tight overhead rack.',
        badge: 'Best Overall',
      },
      {
        name: 'Eagle Creek Pack-It Cubes (4-piece set)',
        search: 'Eagle Creek Pack-It packing cubes set',
        why: 'Cruise drawers are small and shared. Packing cubes let each family member own their own cube instead of rifling through one giant suitcase. Lifesaver on a 7-night sailing.',
        badge: 'Top Pick',
      },
      {
        name: 'ZOMAKE Packable Daypack (30L)',
        search: 'packable daypack 30L lightweight travel backpack',
        why: 'Crushes to a pocket-sized pouch when not in use — perfect for port days. Stash it in your carry-on and pull it out at Castaway Cay for towels, sunscreen, and snorkeling gear.',
      },
      {
        name: 'Samsonite Underseat Personal Item Bag',
        search: 'underseat carry on personal item bag',
        why: 'Disney\'s boarding buses have tight overhead space. This fits under airplane seats AND the seat-back rack, so you keep personal items accessible through embarkation day.',
      },
    ],
  },
  {
    id: 'essentials',
    title: 'Cruise Essentials',
    icon: '⚓',
    description: 'The items veteran cruisers swear by — magnetic accessories, lanyards, and the non-surge power strip you\'ll thank yourself for.',
    products: [
      {
        name: 'KONA Cruise Lanyard with Detachable Clasp',
        search: 'cruise lanyard detachable clasp card holder',
        why: 'Your Disney Cruise Key to the World card is your stateroom key, onboard payment, and dining ID. A detachable-clasp lanyard lets you hand it to crew at dining without wrestling with the entire lanyard.',
        badge: 'Must-Have',
      },
      {
        name: 'Magnetic Hooks (8-pack, 40lb rated)',
        search: 'magnetic hooks cruise cabin heavy duty 8 pack',
        why: 'Disney stateroom walls and ceilings are metal — these hooks snap on instantly. Hang lanyards, towels, bags, and wet swimsuits without touching a surface. Get at least 6 per cabin.',
        badge: 'Must-Have',
      },
      {
        name: 'Magnetic Dry-Erase Door Decoration Set',
        search: 'cruise door magnets decoration set dry erase',
        why: 'The Disney cruise door decoration tradition is real. Magnet sets stick to your metal cabin door without tape (which is prohibited). A fun way to personalize and help kids find "their" door.',
      },
      {
        name: 'Belkin Non-Surge Travel Power Strip',
        search: 'non surge protector travel power strip cruise approved',
        why: 'Disney cabins have exactly 2 US outlets. Surge-protector strips are confiscated at boarding — this non-surge model is cruise-compliant. Add USB-A ports and you\'re charging 8 devices at once.',
        badge: 'Critical',
      },
      {
        name: 'Luggage Tag Holders (6-pack, waterproof)',
        search: 'cruise luggage tag holders waterproof',
        why: 'DCL mails paper luggage tags that tear in rain or at luggage drop-off. These waterproof plastic holders slip over the paper tags and loop around the handle — your bags will actually make it to your cabin.',
      },
      {
        name: 'Carabiner Clip Set (12-pack)',
        search: 'small carabiner clips 12 pack',
        why: 'Clip beach bags to stroller handles, wet shoes to your daypack, or pool bags to a lounger. Endless use on Castaway Cay — they\'re cheap enough to leave on the beach chair.',
      },
    ],
  },
  {
    id: 'sun-beach',
    title: 'Sun & Beach',
    icon: '🏖️',
    description: 'Gear for Castaway Cay and port beach days — reef-safe sunscreen, dry bags, and the water shoes everyone wishes they\'d packed.',
    products: [
      {
        name: 'Raw Elements Reef-Safe Sunscreen SPF 30 (tin)',
        search: 'reef safe mineral sunscreen SPF 30',
        why: 'Castaway Cay\'s lagoon is a protected marine area — Disney strongly encourages reef-safe sunscreen. This mineral formula is non-nano, biodegradable, and won\'t melt in the Caribbean heat.',
        badge: 'Reef-Safe',
      },
      {
        name: 'Osprey Dry Bag (20L)',
        search: 'waterproof dry bag 20L roll top',
        why: 'Snorkeling off Castaway Cay means taking your phone to capture the moment — this fully waterproof roll-top bag floats and protects everything. Far better than a cheap Ziplock.',
      },
      {
        name: 'Speedo Swim Goggles (anti-fog)',
        search: 'Speedo anti fog swim goggles',
        why: 'DCL\'s pool chlorination is strong, and Castaway Cay snorkeling is shallow — you\'ll be looking down the whole time. Bring your own goggles; the rental equipment lines get long.',
      },
      {
        name: 'Chums Floating Eyewear Retainer',
        search: 'floating sunglasses strap eyewear retainer',
        why: 'Sunglasses don\'t survive wave pools or Castaway Cay surf. Floating retainers keep $200 shades from sinking. Works on prescription glasses too.',
      },
      {
        name: 'ORICRA Mesh Beach Bag (extra-large)',
        search: 'extra large mesh beach bag tote',
        why: 'Disney asks you to bring your own towels back from Castaway Cay — a mesh bag drains immediately and can hold 4 wet towels plus beach toys without mildewing. Folds flat for your suitcase.',
      },
      {
        name: 'ALEADER Water Shoes (adult)',
        search: 'water shoes adults quick dry',
        why: 'The Castaway Cay tender dock has uneven surfaces, and Nassau has rough sidewalk/beach transitions. Water shoes protect feet and dry in 20 minutes — sandals can\'t match that.',
      },
    ],
  },
  {
    id: 'kids',
    title: 'Kids Gear',
    icon: '🧒',
    description: 'Disney cruises are family-first — here\'s the gear that makes the difference between a good trip and a great one.',
    products: [
      {
        name: 'Stearns Kids\' Puddle Jumper Life Jacket (30-50 lbs)',
        search: 'Puddle Jumper life jacket kids 30-50 lbs',
        why: 'DCL pools require USCG-approved flotation for non-swimmers. The ship\'s pool deck does have loaner vests but they\'re often all in use during peak afternoon hours. Bring your own — it fits in carry-on.',
        badge: 'Safety Essential',
      },
      {
        name: 'Banana Boat Kids Sunscreen SPF 70 (8 oz)',
        search: 'Banana Boat kids sunscreen SPF 70',
        why: 'Kids burn faster than adults and reapplication is constant. SPF 70 gives you more buffer time on Castaway Cay. The 8 oz size lasts a full 7-night cruise and passes TSA liquid rules checked.',
      },
      {
        name: 'Disney Autograph Book + Pen Set',
        search: 'Disney autograph book and pen set',
        why: 'Character meet-and-greets on Disney Cruise Line are the best you\'ll ever find — no park lines. The ship\'s gift shop charges 3× more for autograph books. Buy this before you sail.',
        badge: 'Top Pick',
      },
      {
        name: 'Kids Waterproof Underwater Camera',
        search: 'kids waterproof underwater camera',
        why: 'Disney photo packages are expensive. Give kids their own underwater camera for pool and snorkel shots — they\'ll capture angles you\'d never think of, and you won\'t worry about your phone.',
      },
      {
        name: 'Mesh Fish Extender Gift Bags (8-pocket)',
        search: 'fish extender Disney cruise 8 pocket hanging organizer',
        why: 'Fish Extenders are a beloved DCL tradition — passengers hang them on their cabin door hooks and swap small gifts. If you join an FE group, you\'ll need this hanging organizer to receive gifts.',
      },
    ],
  },
  {
    id: 'formal',
    title: 'Formal Night',
    icon: '🥂',
    description: 'Every Disney cruise has at least one dress-up night — these packing tricks save space and keep clothes wrinkle-free.',
    products: [
      {
        name: 'ZEGUR Suit Garment Bag (55" travel)',
        search: 'suit garment bag travel 55 inch',
        why: 'DCL formal nights call for real formalwear — but checking a rigid suit bag costs extra. This soft garment bag folds and fits inside most checked luggage, keeping a suit or gown wrinkle-free across flight + cruise.',
        badge: 'Packing Hack',
      },
      {
        name: 'Conair Portable Fabric Steamer',
        search: 'portable handheld fabric steamer travel',
        why: 'Cruise ship irons are communal and hard to find. A pocket steamer heats in 45 seconds, works on formal shirts and dresses in the cabin, and doubles as a wrinkle remover for port-day clothes.',
        badge: 'Game-Changer',
      },
      {
        name: 'Downy Wrinkle Releaser Spray (3-pack travel)',
        search: 'Downy wrinkle releaser spray travel size',
        why: 'Spray, tug, hang — done in 2 minutes. The spray version is lighter than a steamer and perfect if you\'re traveling carry-on only. Great for kids\' formal outfits that won\'t steam well.',
      },
    ],
  },
  {
    id: 'health',
    title: 'Health & Comfort',
    icon: '💊',
    description: 'Motion sickness, cabin security, and comfort items that make a 7-night cruise dramatically more enjoyable.',
    products: [
      {
        name: 'Sea-Band Acupressure Wristbands (pair)',
        search: 'Sea-Band acupressure wristbands motion sickness',
        why: 'Open-water Disney itineraries cross real Atlantic and Caribbean chop. Sea-Bands use acupressure — no drowsiness, no prescriptions, work for both adults and kids. Pack these even if you\'ve "never been seasick."',
        badge: 'Veteran Pick',
      },
      {
        name: 'Dramamine Non-Drowsy Naturals (40 count)',
        search: 'Dramamine non drowsy naturals ginger',
        why: 'The ginger-based formula won\'t knock you out for port day. Take one the night before sailing through a rough stretch (Disney\'s Bahamian routes can get bumpy in December–February).',
      },
      {
        name: 'GermGuardian Personal Air Purifier (mini)',
        search: 'mini personal air purifier travel',
        why: 'Cruise cabins recirculate air. A mini purifier running overnight helps combat that "shared space" smell and can reduce cabin odors, especially in a category 4A interior stateroom.',
      },
      {
        name: 'Door Stop Alarm (2-pack)',
        search: 'door stop alarm travel security 2 pack',
        why: 'Disney ships are extremely safe, but these wedge under your cabin door when sleeping and shriek at 120dB if pushed open. Popular among solo travelers and families with kids who might wander.',
      },
      {
        name: 'Portable Handheld Fan (rechargeable USB)',
        search: 'rechargeable handheld portable fan USB',
        why: 'A/C in Disney staterooms is decent but not always enough on Caribbean stops. A small fan pointed at the bed makes a huge difference in sleep quality — recharges from your new power strip.',
      },
      {
        name: 'GoodSense Travel First Aid Kit (140 piece)',
        search: 'travel first aid kit 140 piece',
        why: 'The ship\'s medical center charges resort prices for a bandage. Pack a lightweight kit with antacids, blister bandages, pain reliever, and antihistamine. Disney cruises are active trips — kids especially need this.',
      },
    ],
  },
]

/** Total number of curated picks, so the copy never drifts from the data. */
export const PACKING_GEAR_PICK_COUNT = categories.reduce(
  (n, cat) => n + cat.products.length,
  0
)

export function PackingGearPicks() {
  return (
    <section id="gear-picks" className="my-12">
      <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-3">
        Our Top {PACKING_GEAR_PICK_COUNT} Gear Picks
      </h2>
      <p className="font-inter text-slate-600 mb-4 max-w-3xl leading-relaxed">
        The checklist above covers <em>what</em> to bring. These are the specific items that
        regularly separate a stressful embarkation from a smooth one — with an honest reason
        each one earns its bag space.
      </p>

      <p className="inline-flex items-start gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-10">
        <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          Product links below are Amazon Associates affiliate links — we earn a small
          commission at no cost to you. See our{' '}
          <Link href="/disclosures" className="underline hover:text-[#1E3A5F]">
            disclosure
          </Link>
          .
        </span>
      </p>

      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <div className="mb-6 pb-4 border-b-2 border-[#D4AF37]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
                <h3 className="font-fraunces text-2xl font-bold text-[#1E3A5F]">{cat.title}</h3>
              </div>
              <p className="text-slate-600 text-base max-w-2xl">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cat.products.map((product) => (
                <div
                  key={product.name}
                  className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-[#1E3A5F] text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <ShoppingBag className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <h4 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-[#1E3A5F] transition-colors">
                        {product.name}
                      </h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{product.why}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <a
                      href={amazonSearchLink(product.search)}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-yellow-400 text-[#1E3A5F] font-bold text-sm py-3 px-4 rounded-xl transition-colors duration-200"
                    >
                      <span>Shop on Amazon</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
