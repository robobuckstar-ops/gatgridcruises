import { Metadata } from 'next'
import Link from 'next/link'
<<<<<<< HEAD
import { ArrowLeft, CheckCircle, XCircle, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Ultimate Disney Cruise Packing List (2025)',
  description:
    'Complete Disney cruise packing list with every essential item. Categories include clothing, toiletries, electronics, kids items, and cruise-specific gear like fish extenders and lanyards.',
  keywords: [
    'disney cruise packing list',
    'what to pack for disney cruise',
    'disney cruise essentials',
    'fish extender gifts',
    'disney cruise tips',
  ],
}

function AmazonLink({ search, children }: { search: string; children: React.ReactNode }) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(search)}&tag=thm1230b0300-20`
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
    >
      {children}
    </a>
  )
=======
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'

export const metadata: Metadata = {
  title: 'The Ultimate Disney Cruise Packing List 2025 | GatGridCruises',
  description:
    'Complete Disney cruise packing list organized by category — essentials, clothing, toiletries, electronics, kids items, and cruise-specific gear like fish extenders and door magnets. With Amazon links.',
  openGraph: {
    title: 'The Ultimate Disney Cruise Packing List 2025',
    description:
      'Everything you need for a Disney cruise, organized by category with Amazon links. Plus what NOT to bring and what Disney already provides.',
    type: 'article',
  },
}

const AMAZON_TAG = 'thm1230b0300-20'
function amazonLink(searchTerm: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=${AMAZON_TAG}`
>>>>>>> claude/zealous-gould-fd7cd0
}

interface PackingItem {
  name: string
<<<<<<< HEAD
  search: string
  note?: string
}

function PackingCategory({ title, items }: { title: string; items: PackingItem[] }) {
  return (
    <div className="mb-10">
      <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700">
              <AmazonLink search={item.search}>{item.name}</AmazonLink>
              {item.note && (
                <span className="text-slate-500 text-sm ml-2">— {item.note}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DisneyPackingListPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Packing Guide
            </span>
          </div>

          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            The Ultimate Disney Cruise Packing List
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Everything you need to pack for a Disney cruise — from cruise-specific gear like fish
            extenders to what Disney actually provides so you don't overpack.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span>10 min read</span>
            <span>·</span>
            <span>Updated April 2025</span>
=======
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
      { name: 'Portable charger / power bank', link: amazonLink('portable charger power bank 20000mah'), note: 'Essential for port days when you\'re away from the stateroom all day' },
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
    title: 'Kids\' Items',
    icon: '🧸',
    items: [
      { name: 'Swimsuits (3+)', link: amazonLink('kids swimsuit'), note: 'More than for adults — kids live in the pool' },
      { name: 'Kids\' life jacket / swim vest', link: amazonLink('kids swim vest life jacket') },
      { name: 'Water wings / floaties', link: amazonLink('water wings kids floaties') },
      { name: 'Kids\' sunscreen SPF 50+', link: amazonLink('kids sunscreen SPF 50 reef safe') },
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
  { item: 'Too many formal outfits', reason: 'There\'s usually only 1–2 formal nights on longer sailings; none on short sailings' },
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
>>>>>>> claude/zealous-gould-fd7cd0
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Main content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* TOC */}
        <div className="bg-slate-50 rounded-lg p-6 mb-12 border border-slate-200">
          <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-4">Jump to section</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              ['#essentials', 'Travel Essentials'],
              ['#clothing', 'Clothing & Swimwear'],
              ['#toiletries', 'Toiletries'],
              ['#electronics', 'Electronics'],
              ['#kids', 'Kids & Baby'],
              ['#cruise-specific', 'Cruise-Specific Items'],
              ['#what-not-to-bring', 'What NOT to Bring'],
              ['#disney-provides', 'What Disney Provides'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-blue-600 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Essentials */}
        <section id="essentials">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Travel Essentials</h2>
          <PackingCategory
            title="Documents & Wallet"
            items={[
              { name: 'Passport or passport card', search: 'passport holder wallet travel', note: 'Required for international ports' },
              { name: 'Passport wallet / document organizer', search: 'passport holder travel organizer family' },
              { name: 'Printed cruise documents', search: 'document travel folder waterproof', note: 'Email confirmations too' },
              { name: 'Travel insurance documents', search: 'travel document organizer', note: 'Keep paper + digital copies' },
              { name: 'Credit cards & cash', search: 'slim travel wallet RFID blocking' },
            ]}
          />
          <PackingCategory
            title="Bags & Luggage"
            items={[
              { name: 'Checked luggage (hard shell)', search: 'hardshell spinner luggage suitcase 4-piece set', note: 'Tag it — looks identical to others' },
              { name: 'Carry-on backpack or tote', search: 'travel carry on backpack lightweight', note: 'For boarding day before luggage arrives' },
              { name: 'Day pack / beach bag', search: 'beach bag waterproof tote cruise', note: 'For port days and Castaway Cay' },
              { name: 'Packing cubes', search: 'packing cubes set travel organizer luggage' },
              { name: 'Laundry bag', search: 'travel laundry bag mesh drawstring', note: 'Self-service laundry available onboard' },
            ]}
          />
        </section>

        {/* Clothing */}
        <section id="clothing" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Clothing & Swimwear</h2>

          <p className="text-slate-600 mb-6">
            Plan on 1–2 outfits per day. Disney cruises have formal nights (formal wear required in
            main dining rooms), casual nights, and the legendary Pirate Night where guests dress up.
          </p>

          <PackingCategory
            title="Everyday Wear"
            items={[
              { name: 'Casual shorts & shirts', search: 'mens casual shorts quick dry cruise', note: '2–3 pairs per person' },
              { name: 'Cover-up or sundress', search: 'womens beach coverup sundress lightweight' },
              { name: 'Light cardigan or hoodie', search: 'lightweight zip hoodie travel cardigan', note: 'Ships and restaurants can be cold' },
              { name: 'Comfortable walking shoes', search: 'comfortable walking sneakers travel women', note: 'For port days with lots of walking' },
              { name: 'Sandals or flip flops', search: 'waterproof sandals flip flops beach pool' },
              { name: 'Water shoes', search: 'water shoes aqua socks snorkeling beach', note: 'Reef protection and hot sand at Castaway Cay' },
            ]}
          />
          <PackingCategory
            title="Formal Night & Pirate Night"
            items={[
              { name: 'Dress or skirt for formal night', search: 'formal dress evening gown cruise night women' },
              { name: 'Dress shirt and slacks / blazer', search: 'mens dress shirt slacks formal night cruise' },
              { name: 'Pirate costume for Pirate Night', search: 'adult pirate costume cruise night', note: 'The whole ship dresses up — don\'t skip it' },
              { name: 'Kids\' pirate costume', search: 'kids pirate costume disney cruise night' },
              { name: 'Dress shoes or heels', search: 'comfortable dress shoes women formal night' },
            ]}
          />
          <PackingCategory
            title="Swimwear"
            items={[
              { name: 'Swimsuit (2–3 per person)', search: 'one piece swimsuit women UV protection', note: 'Pool every day + beach days' },
              { name: 'Rash guard for sun protection', search: 'rash guard UPF 50 kids adults long sleeve' },
              { name: 'Swim trunks (men/boys)', search: 'swim trunks quick dry men board shorts' },
              { name: 'Swim diaper (infants)', search: 'reusable swim diaper baby infant' },
            ]}
          />
        </section>

        {/* Toiletries */}
        <section id="toiletries" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Toiletries</h2>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> Disney provides shampoo, conditioner, and body wash in cabins.
              You may still want to bring your preferred brands.
            </p>
          </div>

          <PackingCategory
            title="Sun & Skin Protection"
            items={[
              { name: 'Reef-safe sunscreen (SPF 50+)', search: 'reef safe sunscreen SPF 50 mineral', note: 'Required at Castaway Cay — protects coral' },
              { name: 'After-sun lotion / aloe vera', search: 'aloe vera after sun lotion gel soothing' },
              { name: 'Lip balm with SPF', search: 'lip balm SPF sun protection 30 pack' },
              { name: 'Sunglasses', search: 'polarized sunglasses UV400 travel beach' },
            ]}
          />
          <PackingCategory
            title="Health & First Aid"
            items={[
              { name: 'Sea-Bands or Dramamine (motion sickness)', search: 'sea bands motion sickness wristband cruise', note: 'Even if you\'re not usually seasick' },
              { name: 'Hand sanitizer', search: 'travel hand sanitizer pocket size pack' },
              { name: 'Travel first aid kit', search: 'travel first aid kit compact portable' },
              { name: 'Prescription medications (extra supply)', search: 'pill organizer travel medication case', note: 'Bring more than needed in case of delays' },
              { name: 'Antacids / digestive aids', search: 'antacids TUMS travel size digestion' },
            ]}
          />
          <PackingCategory
            title="Personal Care"
            items={[
              { name: 'Shampoo & conditioner (preferred brand)', search: 'travel size shampoo conditioner set', note: 'Disney provides generic alternatives' },
              { name: 'Toothbrush & toothpaste', search: 'travel toothbrush toothpaste set compact' },
              { name: 'Deodorant', search: 'deodorant travel size antiperspirant pack' },
              { name: 'Feminine hygiene products', search: 'feminine hygiene products travel pack', note: 'Ship supplies are limited and expensive' },
              { name: 'Hairdryer (optional)', search: 'travel hair dryer dual voltage compact', note: 'Disney provides one; it\'s basic' },
            ]}
          />
        </section>

        {/* Electronics */}
        <section id="electronics" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Electronics</h2>

          <PackingCategory
            title="Devices & Charging"
            items={[
              { name: 'Portable battery pack / power bank', search: 'power bank portable charger 20000mAh fast charge', note: 'Outlets are limited in cabins' },
              { name: 'Multi-port USB charging hub', search: 'USB multi port travel charging hub power strip', note: 'Cabins have 2–3 outlets' },
              { name: 'Adapter with surge protector', search: 'travel power strip surge protector USB cruise ship safe', note: 'No extension cords allowed — surge-protected strips are OK' },
              { name: 'Waterproof phone case', search: 'waterproof phone case beach swimming float', note: 'For Castaway Cay and pool days' },
              { name: 'Waterproof camera or GoPro', search: 'GoPro waterproof action camera underwater', note: 'Underwater snorkel photos are priceless' },
            ]}
          />
          <PackingCategory
            title="Entertainment"
            items={[
              { name: 'Kindle or e-reader', search: 'Kindle e-reader waterproof lightweight travel' },
              { name: 'Noise-canceling earbuds', search: 'wireless noise canceling earbuds ANC' },
              { name: 'Portable Bluetooth speaker', search: 'portable waterproof bluetooth speaker beach', note: 'Beach days and balcony evenings' },
            ]}
          />
        </section>

        {/* Kids */}
        <section id="kids" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">Kids & Baby Items</h2>

          <PackingCategory
            title="For Young Children"
            items={[
              { name: 'Autograph book', search: 'Disney autograph book character signatures', note: 'Characters sign books onboard every day' },
              { name: 'Autograph pens (thick Sharpie)', search: 'thick sharpie metallic markers autograph', note: 'Tip: use metallic markers — characters love them' },
              { name: 'Disney princess or character dress-up outfit', search: 'Disney princess dress up costume toddler girls' },
              { name: 'Kids\' backpack (for day trips)', search: 'kids backpack lightweight small toddler port day' },
              { name: 'Floaties / swim vest', search: 'swim vest toddler learn to swim arm floaties' },
              { name: 'Kids\' reef-safe sunscreen', search: 'kids sunscreen reef safe SPF 70 mineral', note: 'Apply every 90 minutes' },
              { name: 'Stroller (if applicable)', search: 'lightweight umbrella stroller travel compact folding', note: 'Compact/umbrella strollers work best' },
            ]}
          />
          <PackingCategory
            title="For Babies & Infants"
            items={[
              { name: 'Baby carrier / wrap', search: 'baby carrier wrap ergonomic newborn toddler' },
              { name: 'Portable sound machine', search: 'portable white noise sound machine baby travel sleep' },
              { name: 'Baby food pouches', search: 'baby food pouches organic variety', note: 'Bring enough — limited selection onboard' },
              { name: 'Portable travel crib / pack n play (for suites only)', search: 'travel crib portable lightweight foldable', note: 'Cribs available through Disney for cabins' },
            ]}
          />
        </section>

        {/* Cruise-Specific */}
        <section id="cruise-specific" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            Cruise-Specific Items
          </h2>

          <p className="text-slate-600 mb-6">
            These items are unique to cruise travel — especially Disney cruises — and often forgotten
            by first-timers.
          </p>

          <PackingCategory
            title="Fish Extenders"
            items={[
              { name: 'Fish extender (FE) organizer', search: 'fish extender disney cruise hanging organizer pocket', note: 'Hangs on your door fish hook; used for gift exchanges' },
              { name: 'Fish extender gifts (small trinkets)', search: 'disney cruise fish extender gifts small toys', note: 'If joining a FE group, pack 20–30 small gifts' },
            ]}
          />

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p className="text-sm text-slate-700">
              <strong>Fish Extender Tip:</strong> Join a Fish Extender (FE) group through a Disney
              Cruise Facebook group before your sailing. You exchange small gifts with other families
              by hanging them in each other's fish extenders. Popular gifts include personalized
              items, Disney-themed trinkets, and locally sourced snacks.
            </p>
          </div>

          <PackingCategory
            title="Door Decorations"
            items={[
              { name: 'Magnetic door decorations', search: 'disney cruise door magnets decorations set', note: 'Cabin doors are magnetic — decorate to find your room' },
              { name: 'Magnetic hooks', search: 'magnetic hooks strong neodymium cruise cabin door' },
              { name: 'Command strips (removable hooks)', search: 'command strips removable hooks damage free', note: 'For inside the cabin' },
            ]}
          />

          <PackingCategory
            title="Lanyards & Card Holders"
            items={[
              { name: 'Disney lanyard with card holder', search: 'disney cruise lanyard card holder waterproof', note: 'Holds your Key to the World card — essential' },
              { name: 'Waterproof lanyard pouch', search: 'waterproof lanyard pouch ID holder cruise ship card', note: 'Keeps your card dry at the pool and beach' },
              { name: 'KTTW card holder (retractable reel)', search: 'retractable badge reel ID card holder lanyard clip' },
            ]}
          />

          <PackingCategory
            title="Other Cruise Essentials"
            items={[
              { name: 'Insulated tumbler / water bottle', search: 'insulated tumbler stainless steel 30oz leak proof', note: 'Refill stations throughout the ship' },
              { name: 'Collapsible/reusable tote bag', search: 'collapsible tote bag reusable shopping foldable', note: 'For port shopping and beach days' },
              { name: 'Small bills (USD) for tips', search: 'travel money belt waist pack RFID', note: 'For excursion guides, spa staff, and extra tips' },
              { name: 'Hanging toiletry organizer', search: 'hanging toiletry bag organizer travel compact', note: 'Bathrooms are tiny — maximize vertical space' },
              { name: 'Over-the-door shoe organizer', search: 'over door organizer pockets hanging cabin cruise', note: 'Game-changer for small cabins' },
              { name: 'Small night light', search: 'night light plug in dimmable USB battery powered', note: 'Cabins are pitch black — helpful with kids' },
              { name: 'Binoculars', search: 'compact binoculars lightweight travel wildlife cruise', note: 'For whale watching and wildlife spotting' },
            ]}
          />
        </section>

        {/* What NOT to bring */}
        <section id="what-not-to-bring" className="mt-10">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            What NOT to Bring
          </h2>

          <p className="text-slate-600 mb-6">
            Disney Cruise Line has a prohibited items list, and bringing these items can result in
            confiscation at embarkation:
          </p>

          <ul className="space-y-4">
            {[
              { item: 'Extension cords', reason: 'Fire hazard — multi-port surge-protected strips are permitted' },
              { item: 'Alcohol (beyond 2 bottles of wine per stateroom)', reason: 'Beer and spirits are not allowed; only up to 2 bottles of wine per cabin at embarkation' },
              { item: 'Non-reef-safe sunscreen', reason: 'Prohibited on Castaway Cay; they sell reef-safe alternatives onboard' },
              { item: 'Irons and steamers', reason: 'Fire hazard; use the self-service ironing room instead' },
              { item: 'Surge suppressors without on/off switch', reason: 'Only surge-protected power strips (no open heating coils) allowed' },
              { item: 'Excessive food (especially fresh produce, meats, alcohol)', reason: 'Customs rules — declare everything or risk delays at ports' },
              { item: 'Marijuana / cannabis products', reason: 'Illegal at sea and in most international ports; not permitted even with medical card' },
              { item: 'Weapons or sharp objects (in carry-on)', reason: 'Follow TSA rules; check anything questionable' },
            ].map(({ item, reason }) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>{item}</strong> — <span className="text-slate-500">{reason}</span>
                </span>
=======
      <div className="max-w-4xl mx-auto px-4 py-10">
        <AffiliateDisclosure />

        {/* Quick links */}
        <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <h2 className="font-display text-lg font-semibold text-blue-900 mb-3">Jump to Section</h2>
          <div className="flex flex-wrap gap-2">
            {[...categories, { title: "What Disney Provides", icon: "✅" }, { title: "What NOT to Bring", icon: "🚫" }].map((cat) => (
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
>>>>>>> claude/zealous-gould-fd7cd0
              </li>
            ))}
          </ul>
        </section>

<<<<<<< HEAD
        {/* What Disney Provides */}
        <section id="disney-provides" className="mt-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-6">
            What Disney Provides (Don't Pack These)
          </h2>

          <p className="text-slate-600 mb-6">
            Disney Cruise Line includes more than you might expect. Save space by not packing:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { item: 'Bath towels (full size)', detail: 'Provided in your cabin daily; also at pool deck' },
              { item: 'Pool towels', detail: 'Available at pool deck stations — just grab and return' },
              { item: 'Beach towels at Castaway Cay', detail: 'Available dockside at no charge' },
              { item: 'Shampoo, conditioner, body wash', detail: 'H2O Plus products in every cabin' },
              { item: 'Hairdryer', detail: 'Basic one provided; bring your own if you need a better one' },
              { item: 'Soap', detail: 'Bar soap and hand soap at every sink' },
              { item: 'Drinking water', detail: 'Complimentary water, juice, coffee, tea, soft drinks at meal locations' },
              { item: 'Sun loungers at Castaway Cay', detail: 'Ample chairs on both Family Beach and Serenity Bay' },
              { item: 'Dinner dining (main restaurants)', detail: 'All main dining included — no charge for rotational dining' },
              { item: 'Kids\' club entry (ages 3–17)', detail: 'Disney\'s Oceaneer Club/Lab is free and supervised' },
              { item: 'Cribs & pack-n-plays', detail: 'Request at booking — available at no charge for infants' },
              { item: 'Life jackets for pools', detail: 'Provided at every pool deck' },
            ].map(({ item, detail }) => (
              <div key={item} className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="font-semibold text-slate-900 text-sm">{item}</p>
                <p className="text-slate-600 text-xs mt-1">{detail}</p>
=======
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
>>>>>>> claude/zealous-gould-fd7cd0
              </div>
            ))}
          </div>
        </section>

<<<<<<< HEAD
        {/* CTA */}
        <section className="mt-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <h2 className="font-fraunces text-2xl font-bold mb-3">Ready to Start Planning?</h2>
          <p className="text-blue-100 mb-6">
            Now that you know what to pack, use our tools to estimate costs and find the best deals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/cruise-cost-calculator"
              className="inline-block px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition text-sm"
            >
              Estimate Your Trip Cost
            </Link>
            <Link
              href="/guides/first-time-disney-cruise"
              className="inline-block px-5 py-2.5 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition text-sm"
            >
              First Timer's Guide
=======
        {/* Pro tips */}
        <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-amber-900 mb-4">Pro Packing Tips</h2>
          <ul className="space-y-3">
            {[
              'Pack in layers — you\'ll be in and out of air-conditioned spaces and hot outdoor areas constantly.',
              'Label everything with your name and stateroom number before you board.',
              'Bring an extra bag or collapsible tote for souvenirs — you will buy things.',
              'Ship your larger items ahead via a service like Luggage Forward — no baggage drag at the airport.',
              'Use a garment bag for formal clothes — they arrive wrinkle-free.',
              'Put a bright ribbon or luggage tag on your bag — hundreds of black suitcases look identical at baggage claim.',
              'Prescription meds always go in your carry-on, never checked luggage.',
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
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
>>>>>>> claude/zealous-gould-fd7cd0
            </Link>
          </div>
        </section>

<<<<<<< HEAD
        {/* Disclosure */}
        <section className="mt-10 pt-8 border-t border-slate-200">
          <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
            <h3 className="font-semibold text-slate-900 mb-1 text-sm">Affiliate Disclosure</h3>
            <p className="text-xs text-slate-600">
              Product links in this guide go to Amazon with our affiliate tag. We may earn a small
              commission if you purchase through these links at no extra cost to you. We only link
              to products we'd genuinely recommend.
            </p>
          </div>
        </section>
      </article>
=======
        <div className="mt-12 pt-8 border-t border-slate-200">
          <AffiliateDisclosure />
        </div>
      </div>
>>>>>>> claude/zealous-gould-fd7cd0
    </div>
  )
}
