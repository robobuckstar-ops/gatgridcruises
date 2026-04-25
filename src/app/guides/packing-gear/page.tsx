import { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingBag, ExternalLink, Star, ChevronRight } from 'lucide-react'
import { GetQuoteCTA } from '@/components/get-quote-cta'

export const metadata: Metadata = {
  title: 'The Ultimate Disney Cruise Packing List (With Our Top Picks)',
  description: 'The best gear for Disney cruises — luggage, cruise essentials, sun & beach, kids gear, formal night, and health must-haves. Amazon picks with affiliate links.',
  keywords: ['disney cruise packing list', 'what to pack disney cruise', 'cruise essentials', 'disney cruise gear', 'cruise packing tips'],
}

function amazonLink(_asin: string) {
  return '/concierge'
}

interface Product {
  name: string
  asin: string
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
        asin: 'B002BMXUQ0',
        why: 'DCL stateroom closets are narrow — a 25" softside fits perfectly and compresses for extra packing space. Hardshell suitcases often can\'t squeeze into the tight overhead rack.',
        badge: 'Best Overall',
      },
      {
        name: 'Eagle Creek Pack-It Cubes (4-piece set)',
        asin: 'B07CMLFZ6X',
        why: 'Cruise drawers are small and shared. Packing cubes let each family member own their own cube instead of rifling through one giant suitcase. Lifesaver on a 7-night sailing.',
        badge: 'Top Pick',
      },
      {
        name: 'ZOMAKE Packable Daypack (30L)',
        asin: 'B01LXOHCB2',
        why: 'Crushes to a pocket-sized pouch when not in use — perfect for port days. Stash it in your carry-on and pull it out at Castaway Cay for towels, sunscreen, and snorkeling gear.',
      },
      {
        name: 'Samsonite Underseat Personal Item Bag',
        asin: 'B073SJP5Q4',
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
        asin: 'B07JG3FMWC',
        why: 'Your Disney Cruise Key to the World card is your stateroom key, onboard payment, and dining ID. A detachable-clasp lanyard lets you hand it to crew at dining without wrestling with the entire lanyard.',
        badge: 'Must-Have',
      },
      {
        name: 'Magnetic Hooks (8-pack, 40lb rated)',
        asin: 'B06XH2SVPJ',
        why: 'Disney stateroom walls and ceilings are metal — these hooks snap on instantly. Hang lanyards, towels, bags, and wet swimsuits without touching a surface. Get at least 6 per cabin.',
        badge: 'Must-Have',
      },
      {
        name: 'Magnetic Dry-Erase Door Decoration Set',
        asin: 'B07CRVJJVD',
        why: 'The Disney cruise door decoration tradition is real. Magnet sets stick to your metal cabin door without tape (which is prohibited). A fun way to personalize and help kids find "their" door.',
      },
      {
        name: 'Belkin Non-Surge Travel Power Strip',
        asin: 'B072DHVD5S',
        why: 'Disney cabins have exactly 2 US outlets. Surge-protector strips are confiscated at boarding — this non-surge model is cruise-compliant. Add USB-A ports and you\'re charging 8 devices at once.',
        badge: 'Critical',
      },
      {
        name: 'Luggage Tag Holders (6-pack, waterproof)',
        asin: 'B09BFZ3T6H',
        why: 'DCL mails paper luggage tags that tear in rain or at luggage drop-off. These waterproof plastic holders slip over the paper tags and loop around the handle — your bags will actually make it to your cabin.',
      },
      {
        name: 'Carabiner Clip Set (12-pack)',
        asin: 'B071XHVH4R',
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
        asin: 'B01LZJDTNF',
        why: 'Castaway Cay\'s lagoon is a protected marine area — Disney strongly encourages reef-safe sunscreen. This mineral formula is non-nano, biodegradable, and won\'t melt in the Caribbean heat.',
        badge: 'Reef-Safe',
      },
      {
        name: 'Osprey Dry Bag (20L)',
        asin: 'B00HEYP4N2',
        why: 'Snorkeling off Castaway Cay means taking your phone to capture the moment — this fully waterproof roll-top bag floats and protects everything. Far better than a cheap Ziplock.',
      },
      {
        name: 'Speedo Swim Goggles (anti-fog)',
        asin: 'B01E9HFQJW',
        why: 'DCL\'s pool chlorination is strong, and Castaway Cay snorkeling is shallow — you\'ll be looking down the whole time. Bring your own goggles; the rental equipment lines get long.',
      },
      {
        name: 'Chums Floating Eyewear Retainer',
        asin: 'B01CQBWFAW',
        why: 'Sunglasses don\'t survive wave pools or Castaway Cay surf. Floating retainers keep $200 shades from sinking. Works on prescription glasses too.',
      },
      {
        name: 'ORICRA Mesh Beach Bag (extra-large)',
        asin: 'B07CQFKN2P',
        why: 'Disney asks you to bring your own towels back from Castaway Cay — a mesh bag drains immediately and can hold 4 wet towels plus beach toys without mildewing. Folds flat for your suitcase.',
      },
      {
        name: 'ALEADER Water Shoes (adult)',
        asin: 'B07BRLSQLQ',
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
        asin: 'B08DGPWTLM',
        why: 'DCL pools require USCG-approved flotation for non-swimmers. The ship\'s pool deck does have loaner vests but they\'re often all in use during peak afternoon hours. Bring your own — it fits in carry-on.',
        badge: 'Safety Essential',
      },
      {
        name: 'Banana Boat Kids Sunscreen SPF 70 (8 oz)',
        asin: 'B00P3N7F5G',
        why: 'Kids burn faster than adults and reapplication is constant. SPF 70 gives you more buffer time on Castaway Cay. The 8 oz size lasts a full 7-night cruise and passes TSA liquid rules checked.',
      },
      {
        name: 'Disney Autograph Book + Pen Set',
        asin: 'B07VCRBLQC',
        why: 'Character meet-and-greets on Disney Cruise Line are the best you\'ll ever find — no park lines. The ship\'s gift shop charges 3× more for autograph books. Buy this before you sail.',
        badge: 'Top Pick',
      },
      {
        name: 'Kids Waterproof Underwater Camera',
        asin: 'B07CQRM8MB',
        why: 'Disney photo packages are expensive. Give kids their own underwater camera for pool and snorkel shots — they\'ll capture angles you\'d never think of, and you won\'t worry about your phone.',
      },
      {
        name: 'Mesh Fish Extender Gift Bags (8-pocket)',
        asin: 'B07T8NWDCN',
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
        asin: 'B07ND4FVDH',
        why: 'DCL formal nights call for real formalwear — but checking a rigid suit bag costs extra. This soft garment bag folds and fits inside most checked luggage, keeping a suit or gown wrinkle-free across flight + cruise.',
        badge: 'Packing Hack',
      },
      {
        name: 'Conair Portable Fabric Steamer',
        asin: 'B073YG1BCJ',
        why: 'Cruise ship irons are communal and hard to find. A pocket steamer heats in 45 seconds, works on formal shirts and dresses in the cabin, and doubles as a wrinkle remover for port-day clothes.',
        badge: 'Game-Changer',
      },
      {
        name: 'Downy Wrinkle Releaser Spray (3-pack travel)',
        asin: 'B07S3JY5JH',
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
        asin: 'B002XKGH8U',
        why: 'Open-water Disney itineraries cross real Atlantic and Caribbean chop. Sea-Bands use acupressure — no drowsiness, no prescriptions, work for both adults and kids. Pack these even if you\'ve "never been seasick."',
        badge: 'Veteran Pick',
      },
      {
        name: 'Dramamine Non-Drowsy Naturals (40 count)',
        asin: 'B00FLN1ARY',
        why: 'The ginger-based formula won\'t knock you out for port day. Take one the night before sailing through a rough stretch (Disney\'s Bahamian routes can get bumpy in December–February).',
      },
      {
        name: 'GermGuardian Personal Air Purifier (mini)',
        asin: 'B07KJFKL8W',
        why: 'Cruise cabins recirculate air. A mini purifier running overnight helps combat that "shared space" smell and can reduce cabin odors, especially in a category 4A interior stateroom.',
      },
      {
        name: 'Door Stop Alarm (2-pack)',
        asin: 'B07KRNMVZJ',
        why: 'Disney ships are extremely safe, but these wedge under your cabin door when sleeping and shriek at 120dB if pushed open. Popular among solo travelers and families with kids who might wander.',
      },
      {
        name: 'Portable Handheld Fan (rechargeable USB)',
        asin: 'B07T3GQ989',
        why: 'A/C in Disney staterooms is decent but not always enough on Caribbean stops. A small fan pointed at the bed makes a huge difference in sleep quality — recharges from your new power strip.',
      },
      {
        name: 'GoodSense Travel First Aid Kit (140 piece)',
        asin: 'B073ZD9F8Z',
        why: 'The ship\'s medical center charges resort prices for a bandage. Pack a lightweight kit with antacids, blister bandages, pain reliever, and antihistamine. Disney cruises are active trips — kids especially need this.',
      },
    ],
  },
]

export default function PackingGearPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#1E3A5F] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/guides" className="text-blue-300 hover:text-[#D4AF37] text-sm transition-colors">
              Guides
            </Link>
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm">Packing Gear</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl" aria-hidden="true">🧳</span>
            <div>
              <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight">
                The Ultimate Disney Cruise Packing List
              </h1>
              <p className="font-fraunces text-xl text-[#D4AF37] mt-1">With Our Top Amazon Picks</p>
            </div>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Veteran Disney cruisers know the difference between packing and packing <em>right</em>.
            We've curated the 30 items that regularly separate a stressful embarkation from a smooth,
            magical one — with honest reasons why each one earns its bag space.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-800/50 text-blue-200 text-sm px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <span>Affiliate links below — we earn a small commission at no cost to you. See our <Link href="/disclosures" className="underline hover:text-white">disclosure</Link>.</span>
          </div>
        </div>
      </section>

      {/* Jump Links */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#1E3A5F] hover:text-white text-slate-700 text-sm font-medium transition-all duration-200"
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id}>
              {/* Category Header */}
              <div className="mb-8 pb-6 border-b-2 border-[#D4AF37]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl" aria-hidden="true">{cat.icon}</span>
                  <h2 className="font-fraunces text-3xl font-bold text-[#1E3A5F]">{cat.title}</h2>
                </div>
                <p className="text-slate-600 text-base max-w-2xl">{cat.description}</p>
              </div>

              {/* Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cat.products.map((product) => (
                  <div
                    key={product.asin}
                    className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-[#1E3A5F] text-[#D4AF37] text-xs font-bold px-2.5 py-1 rounded-full">
                        {product.badge}
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <ShoppingBag className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-[#1E3A5F] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{product.why}</p>
                    </div>
                    <div className="px-6 pb-6">
                      <Link
                        href="/concierge"
                        className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-yellow-400 text-[#1E3A5F] font-bold text-sm py-3 px-4 rounded-xl transition-colors duration-200"
                      >
                        <span>Learn More</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-page Amex CTA */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/concierge"
            className="block rounded-2xl overflow-hidden border border-[#D4AF37] shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[#D4AF37] font-bold text-lg leading-tight">Plan Your Disney Cruise with Expert Guidance</p>
                <p className="text-blue-200 text-sm mt-1">Our advisors help you find the right sailing and make the most of your rewards points.</p>
              </div>
              <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap">
                Start Planning →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Packing Tips Callout */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-6">Pro Packing Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Pack magnetic hooks in your carry-on', detail: 'You\'ll want them as soon as you board — before your checked bags arrive.' },
              { tip: 'Wear your formal shoes on the plane', detail: 'Shoes are the biggest space problem. One pair of dress shoes on your feet saves a shoe bag.' },
              { tip: 'Label everything with your cabin number', detail: 'Not just luggage tags — put a small label inside bags, on camera cases, beach bags.' },
              { tip: 'Bring a dry erase marker for the cabin TV', detail: 'Disney cabin TVs have a port tracker and activity guide — you can write reminders on the screen edge.' },
              { tip: 'Pack a night light', detail: 'Disney cabins are pitch black when the curtain is drawn. A small USB night light helps kids navigate to the bathroom at 2 AM.' },
              { tip: 'Amazon Locker at Cape Canaveral Holiday Inn', detail: 'If you\'re staying pre-cruise, you can ship Amazon packages to the hotel before you arrive.' },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex gap-3 bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-[#D4AF37] font-bold text-xl flex-shrink-0">→</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{tip}</p>
                  <p className="text-slate-500 text-sm mt-1">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/guides/travel-insurance" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Insurance</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">Do You Need Travel Insurance for a Disney Cruise?</p>
            </Link>
            <Link href="/guides/ports" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Ports</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">Disney Cruise Port Guides</p>
            </Link>
            <Link href="/guides/disney-cruise-cost-guide" className="group block p-5 rounded-xl border-2 border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all duration-200">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Planning</p>
              <p className="font-fraunces font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">The True Cost of a Disney Cruise</p>
            </Link>
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
