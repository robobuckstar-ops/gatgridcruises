import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Ultimate Disney Cruise Packing List 2026 | GatGridCruises',
  description:
    'Complete Disney cruise packing list organized by category — essentials, clothing, toiletries, electronics, kids items, and cruise-specific gear like fish extenders and door magnets. With Amazon links.',
  openGraph: {
    title: 'The Ultimate Disney Cruise Packing List 2026',
    description:
      'Everything you need for a Disney cruise, organized by category with Amazon links. Plus what NOT to bring and what Disney already provides.',
    type: 'article',
  },
}

function amazonLink(_searchTerm: string) {
  return '/concierge'
}

interface PackingItem {
  name: string
  note?: string
  link?: string
}

interface PackingCategory {
  title: string
  icon: string
  items: PackingItem[]
}

const categories: PackingCategory[] = [
  {
    title: 'Travel Documents & Essentials',
    icon: '📋',
    items: [
      { name: 'Passport or passport card', note: 'Required for most itineraries' },
      { name: 'Birth certificates', note: 'For US closed-loop cruises (instead of passport)' },
      { name: 'Boarding documents', note: 'Print your cruise reservation confirmation' },
      { name: 'Travel insurance documents', note: 'If purchased separately' },
      { name: 'Credit cards & cash', note: 'For onboard charges and port excursions' },
      { name: 'Luggage tags', link: amazonLink('Disney cruise luggage tags'), note: 'Disney sends official ones; grab extras just in case' },
      {
        name: 'Passport holder / travel wallet',
        link: amazonLink('travel passport wallet organizer'),
        note: 'Keep all documents in one place',
      },
      {
        name: 'Packing cubes',
        link: amazonLink('packing cubes luggage organizer'),
        note: 'Game changer for keeping staterooms tidy',
      },
      { name: 'Luggage scale', link: amazonLink('portable digital luggage scale'), note: 'Avoid overweight bag fees' },
    ],
  },
  {
    title: 'Clothing',
    icon: '👗',
    items: [
      { name: 'Casual daywear', note: '1 outfit per day + 1–2 extras' },
      { name: 'Swimsuits (2–3)', link: amazonLink('swimsuit'), note: 'Multiple is key — they take time to dry' },
      { name: 'Swim cover-up / rash guard', link: amazonLink('swim cover up rash guard') },
      { name: 'Formal / semi-formal outfit', note: 'For Palo or dressy nights — check ship schedule' },
      { name: 'Pirate Night costume', link: amazonLink('pirate costume adults'), note: 'One of the most fun nights — go all out!' },
      { name: 'Light jacket or cardigan', link: amazonLink('lightweight packable jacket'), note: 'Ships and indoor areas are heavily air conditioned' },
      { name: 'Walking shoes / sneakers', link: amazonLink('comfortable walking shoes') },
      { name: 'Flip flops or sandals', link: amazonLink('flip flops sandals'), note: 'For pool decks and Castaway Cay beach' },
      { name: 'Water shoes', link: amazonLink('water shoes adults'), note: 'Great for rocky beaches and water parks' },
      { name: 'Underwear & socks', note: 'Enough for each day + 1–2 extras' },
      { name: 'Pajamas / loungewear', link: amazonLink('disney pajamas adults') },
      { name: 'Rain poncho', link: amazonLink('compact rain poncho'), note: 'Compact ones pack flat; umbrellas are cumbersome on ships' },
      { name: 'Sun hat', link: amazonLink('wide brim sun hat beach') },
      { name: 'Sunglasses', link: amazonLink('polarized sunglasses') },
    ],
  },
  {
    title: 'Toiletries & Health',
    icon: '🧴',
    items: [
      {
        name: 'Sunscreen SPF 50+',
        link: amazonLink('reef safe sunscreen SPF 50'),
        note: 'Disney recommends reef-safe. You will burn faster than you think at sea.',
      },
      { name: 'After-sun lotion / aloe', link: amazonLink('aloe vera after sun gel') },
      { name: 'Motion sickness medication', link: amazonLink('motion sickness medication'), note: 'Dramamine or Sea-Bands — buy before you sail' },
      { name: 'Sea-Bands acupressure wristbands', link: amazonLink('sea bands motion sickness wristbands') },
      { name: 'Prescription medications', note: 'Bring more than you need in case of delays' },
      { name: 'Pain relievers (Tylenol, Advil)', link: amazonLink('travel medicine kit') },
      { name: 'Antacids', link: amazonLink('antacids tums travel') },
      { name: 'Band-aids & first aid kit', link: amazonLink('compact travel first aid kit') },
      { name: 'Hand sanitizer', link: amazonLink('hand sanitizer travel size') },
      { name: 'Lip balm with SPF', link: amazonLink('lip balm SPF') },
      { name: 'Deodorant', link: amazonLink('deodorant travel size') },
      { name: 'Shampoo / conditioner (travel size)', link: amazonLink('shampoo conditioner travel size'), note: 'Disney provides H2O+ products onboard — or bring your own' },
      { name: 'Body wash', link: amazonLink('body wash travel size'), note: 'Provided by Disney, but bring your own if you prefer' },
      { name: 'Razor', link: amazonLink('travel razor') },
      { name: 'Makeup / skincare', note: 'Keep it simple — humidity is real at sea' },
      { name: 'Waterproof mascara', link: amazonLink('waterproof mascara'), note: 'Regular mascara does not survive pools and humidity' },
      { name: 'Feminine products', link: amazonLink('feminine hygiene products travel') },
      { name: 'Toothbrush & toothpaste', link: amazonLink('travel toothbrush toothpaste set') },
      { name: 'Floss', link: amazonLink('dental floss picks') },
    ],
  },
  {
    title: 'Electronics & Tech',
    icon: '📱',
    items: [
      { name: 'Smartphone', note: 'Download the Disney Cruise Line Navigator app before sailing' },
      { name: 'Portable charger / power bank', link: amazonLink('portable charger power bank 20000mah'), note: "Essential for port days when you're away from the stateroom all day" },
      {
        name: 'Multi-port USB charging hub',
        link: amazonLink('multi port USB charging hub travel'),
        note: 'Staterooms have limited outlets — a hub is crucial for families',
      },
      { name: 'Universal travel adapter', link: amazonLink('universal travel adapter') },
      { name: 'Camera', link: amazonLink('waterproof digital camera vacation') },
      { name: 'GoPro / action camera', link: amazonLink('GoPro action camera waterproof') },
      { name: 'Waterproof phone case', link: amazonLink('waterproof phone case beach') },
      { name: 'Waterproof bag / dry bag', link: amazonLink('waterproof dry bag beach') },
      { name: 'Earbuds / headphones', link: amazonLink('wireless earbuds') },
      { name: 'E-reader / tablet', link: amazonLink('kindle e-reader'), note: 'For sea days and relaxing on the verandah' },
      { name: 'Laptop (if needed)', note: 'Pack light — ship Wi-Fi is limited and expensive' },
      { name: 'Extension cord / surge protector', link: amazonLink('surge protector travel power strip'), note: 'Disney allows non-surge-protected extension cords; surge protectors are banned' },
    ],
  },
  {
    title: "Kids' Items",
    icon: '🧸',
    items: [
      { name: 'Swimsuits (3+)', link: amazonLink('kids swimsuit'), note: 'More than for adults — kids live in the pool' },
      { name: "Kids' life jacket / swim vest", link: amazonLink('kids swim vest life jacket') },
      { name: 'Water wings / floaties', link: amazonLink('water wings kids floaties') },
      { name: "Kids' sunscreen SPF 50+", link: amazonLink('kids sunscreen SPF 50 reef safe') },
      { name: 'Kid-friendly first aid kit', link: amazonLink('kids first aid kit') },
      { name: 'Character autograph book', link: amazonLink('Disney character autograph book'), note: 'One of the most treasured cruise mementos' },
      { name: 'Pens for autographs', link: amazonLink('sharpie markers autograph'), note: 'Sharpies work best on merchandise' },
      { name: 'Glow necklaces / bracelets for Pirate Night', link: amazonLink('glow sticks necklaces party') },
      { name: 'Small backpack for kids', link: amazonLink('kids small backpack') },
      { name: 'Stroller (for toddlers)', link: amazonLink('lightweight umbrella stroller compact') },
      { name: 'Snacks from home', note: 'Disney allows sealed, non-perishable snacks — save a fortune on Goldfish and fruit pouches' },
      { name: 'Activity books / coloring books', link: amazonLink('kids activity coloring book travel') },
      { name: 'Small toys / fidgets', link: amazonLink('fidget toys travel kids') },
      { name: 'Baby monitor (for young children)', link: amazonLink('baby monitor travel'), note: 'Useful if you plan to use the adult pool while kids sleep' },
    ],
  },
  {
    title: 'Cruise-Specific Items',
    icon: '⚓',
    items: [
      {
        name: 'Fish extender',
        link: amazonLink('fish extender Disney cruise'),
        note: 'Hook it outside your door to receive and leave gifts. Join a Fish Extender group before sailing!',
      },
      {
        name: 'Fish extender gifts',
        link: amazonLink('fish extender gifts Disney cruise'),
        note: 'Small trinkets, snacks, or custom items to gift your FE group',
      },
      {
        name: 'Door magnets / decorations',
        link: amazonLink('Disney cruise door magnets decorations'),
        note: 'Disney ship doors are magnetic — decorate yours to spot it easily and show personality',
      },
      {
        name: 'Lanyard with ID holder',
        link: amazonLink('Disney cruise lanyard ID holder'),
        note: 'For your Key to the World card (your all-in-one room key, charging card, and ID)',
      },
      {
        name: 'Lanyards for kids',
        link: amazonLink('Disney cruise lanyard kids'),
        note: 'Kids lose their cards — lanyards solve this',
      },
      {
        name: 'Insulated water bottle',
        link: amazonLink('insulated water bottle 32oz'),
        note: 'Refill at ship water stations instead of buying beverages; great for port days',
      },
      {
        name: 'Collapsible tote bag',
        link: amazonLink('collapsible tote bag travel'),
        note: 'For Castaway Cay beach essentials and port shopping',
      },
      {
        name: 'Snorkel gear',
        link: amazonLink('snorkel set mask fins adults'),
        note: 'Castaway Cay has incredible snorkeling — renting onboard is $25+/person',
      },
      {
        name: 'Floating waterproof bag',
        link: amazonLink('floating waterproof pouch beach'),
        note: 'Keep your phone, keys, and cards safe while swimming at Castaway Cay',
      },
      {
        name: 'Beach towel clips',
        link: amazonLink('beach towel clips chair'),
        note: 'Disney provides towels, but clips keep them in place in the ocean breeze',
      },
      {
        name: 'Portable fan',
        link: amazonLink('portable handheld fan rechargeable'),
        note: 'Castaway Cay is hot — a personal fan is clutch while waiting in line or in the shade',
      },
      {
        name: 'Reusable straw',
        link: amazonLink('reusable metal straw set'),
        note: 'Eco-friendly and convenient for frozen drinks by the pool',
      },
      {
        name: 'Ziploc bags (various sizes)',
        link: amazonLink('ziplock bags variety pack'),
        note: 'For wet swimsuits, snacks, and protecting electronics at the beach',
      },
      {
        name: 'Over-door organizer',
        link: amazonLink('over door hanging organizer pockets'),
        note: 'Disney staterooms are compact — an organizer maximizes every inch of space',
      },
      {
        name: 'Nightlight',
        link: amazonLink('plug in nightlight small'),
        note: 'Staterooms have blackout curtains and get pitch dark — great for kids',
      },
    ],
  },
]

const disneyProvides = [
  'H2O+ shampoo, conditioner, and body lotion',
  'Bath soap',
  'Hair dryer',
  'Beach towels (on the ship and at Castaway Cay)',
  'Life jackets for use at sea',
  'Daily room cleaning (twice daily)',
  'Hangars and storage space',
  'Safe in your stateroom',
  'Cribs / pack-n-plays (request in advance)',
  'Refrigerator in your stateroom',
]

const doNotBring = [
  { item: 'Surge protectors / extension cords with surge protection', reason: 'Banned for fire safety — use a regular power strip instead' },
  { item: 'Irons / steamers', reason: 'Banned — use the laundry facilities onboard' },
  { item: 'Candles or incense', reason: 'Open flames are prohibited' },
  { item: 'Alcohol in large quantities', reason: 'Each adult can bring 2 bottles of wine or 6 beers at embarkation only' },
  { item: 'Full-size bottles of everything', reason: 'Pack travel sizes — luggage space is precious' },
  { item: 'Too many formal outfits', reason: "There's usually only 1–2 formal nights on longer sailings; none on short sailings" },
  { item: 'Drones', reason: 'Strictly prohibited on Disney ships' },
  { item: 'Selfie sticks', reason: 'Not allowed in the main theater or many venues' },
  { item: 'Outside food for the dining room', reason: 'Not permitted; save snacks for your stateroom' },
]

export default function PackingListPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-950 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-blue-300 mb-3 font-medium">Blog · Packing Guide</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            The Ultimate Disney Cruise Packing List (2025)
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
            Everything you need for a Disney cruise, organized by category. Includes Amazon links,
            what NOT to bring, and what Disney already provides — so you don&apos;t have to guess.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {['Essentials', 'Clothing', 'Toiletries', 'Electronics', 'Kids Items', 'Cruise Gear'].map((cat) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-white/10 text-blue-100 text-sm">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Quick links */}
        <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="font-display text-lg font-semibold text-blue-900 mb-3">Jump to Section</h2>
          <div className="flex flex-wrap gap-2">
            {[...categories, { title: 'What Disney Provides', icon: '✅' }, { title: 'What NOT to Bring', icon: '🚫' }].map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-700 text-sm hover:bg-blue-100 transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Packing categories */}
        <div className="mt-10 space-y-12">
          {categories.map((category) => (
            <section
              key={category.title}
              id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            >
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.title}
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-blue-600 to-transparent mb-6"></div>
              <div className="grid sm:grid-cols-2 gap-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="mt-0.5 w-4 h-4 rounded border-2 border-slate-300 flex-shrink-0 group-hover:border-blue-400" />
                    <div className="flex-1 min-w-0">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="font-medium text-blue-700 hover:text-blue-900 hover:underline text-sm leading-snug"
                        >
                          {item.name} →
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800 text-sm">{item.name}</span>
                      )}
                      {item.note && (
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* What Disney Provides */}
        <section
          id="what-disney-provides"
          className="mt-14 bg-emerald-50 border border-emerald-200 rounded-xl p-6"
        >
          <h2 className="font-display text-2xl font-bold text-emerald-900 mb-1 flex items-center gap-2">
            <span>✅</span> What Disney Provides
          </h2>
          <p className="text-sm text-emerald-700 mb-4">Don&apos;t waste luggage space on these — Disney has you covered.</p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {disneyProvides.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-emerald-800">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* What NOT to Bring */}
        <section
          id="what-not-to-bring"
          className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <h2 className="font-display text-2xl font-bold text-red-900 mb-1 flex items-center gap-2">
            <span>🚫</span> What NOT to Bring
          </h2>
          <p className="text-sm text-red-700 mb-4">Leave these at home — they&apos;re banned, unnecessary, or will just waste space.</p>
          <div className="space-y-3">
            {doNotBring.map((item) => (
              <div key={item.item} className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                <div>
                  <span className="font-medium text-sm text-red-900">{item.item}</span>
                  <span className="text-xs text-red-700 ml-2">— {item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro tips */}
        <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-amber-900 mb-4">Pro Packing Tips</h2>
          <ul className="space-y-3">
            {[
              "Pack in layers — you'll be in and out of air-conditioned spaces and hot outdoor areas constantly.",
              'Label everything with your name and stateroom number before you board.',
              'Bring an extra bag or collapsible tote for souvenirs — you will buy things.',
              'Ship your larger items ahead via a service like Luggage Forward — no baggage drag at the airport.',
              'Use a garment bag for formal clothes — they arrive wrinkle-free.',
              "Put a bright ribbon or luggage tag on your bag — hundreds of black suitcases look identical at baggage claim.",
              "Prescription meds always go in your carry-on, never checked luggage.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Ready to Start Planning?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Use our free tools to estimate your cruise cost and find the best stateroom for your family.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/tools/cruise-cost-calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E3A5F] hover:bg-[#2a4f7a] text-white font-semibold transition-colors"
            >
              Cost Calculator
            </Link>
            <Link
              href="/guides/stateroom-comparison"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-blue-400 text-slate-700 font-semibold transition-colors"
            >
              Stateroom Comparison
            </Link>
            <Link
              href="/guides/first-time-disney-cruise"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-blue-400 text-slate-700 font-semibold transition-colors"
            >
              First-Timer&apos;s Guide
            </Link>
          </div>
        </section>

        {/* Disclosure */}
        <section className="mt-10 pt-8 border-t border-slate-200">
          <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
            <h3 className="font-semibold text-slate-900 mb-1 text-sm">Affiliate Disclosure</h3>
            <p className="text-xs text-slate-600">
              Product links in this guide go to Amazon with our affiliate tag. We may earn a small
              commission if you purchase through these links at no extra cost to you. We only link
              to products we&apos;d genuinely recommend.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
