import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Gift, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Fish Extender Gifts Under $10 (2026 List)',
  description:
    '18 creative Fish Extender gift ideas under $10 with Amazon links. Perfect for Disney Cruise Line FE groups — small, lightweight gifts that delight kids and adults alike.',
  openGraph: {
    title: 'Best Fish Extender Gifts Under $10 (2026 List)',
    description:
      '18 creative Fish Extender gift ideas under $10 — fun for all ages, lightweight for your luggage.',
    url: 'https://gatgridcruises.com/blog/best-fish-extender-gifts',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Fish Extender Gifts Under $10 (2026 List)',
    description: '18 creative Fish Extender gift ideas under $10 — fun for all ages, lightweight for your luggage.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

function amzLink(_searchTerm: string) {
  return '/concierge'
}

const gifts = [
  {
    name: 'Disney Character Sticker Sheets',
    description: 'A perennial FE favorite. Kids (and adults) love character stickers. Buy multi-packs and split them up for huge value.',
    searchTerm: 'Disney character sticker sheets kids',
    price: '$6–$8',
    tip: 'Look for holographic or glitter varieties — they feel extra special.',
  },
  {
    name: 'Mini Hand Sanitizer (Mickey Mouse)',
    description: 'Practical and themed. These sell in multi-packs and are perfect for cruise ship life.',
    searchTerm: 'Disney Mickey hand sanitizer mini',
    price: '$5–$8',
    tip: 'Bath & Body Works versions are popular but Amazon carries plenty of alternates.',
  },
  {
    name: 'Glow-in-the-Dark Bouncy Balls',
    description: 'Tiny, lightweight, and endlessly entertaining for kids. Perfect for Pirate Night.',
    searchTerm: 'glow in dark bouncy balls bulk',
    price: '$6–$9',
    tip: 'Multi-packs of 50+ give you plenty for a large FE group.',
  },
  {
    name: 'Disney Themed Temporary Tattoos',
    description: 'Kids go crazy for these. Choose Mickey, Minnie, Stitch, or princess themes.',
    searchTerm: 'Disney temporary tattoos kids',
    price: '$5–$7',
    tip: 'Great for Pirate Night or Character Night.',
  },
  {
    name: 'Personalized Luggage Tags (Name Labels)',
    description: 'A practical and thoughtful gift. Print custom name tags or buy pre-made Disney ones.',
    searchTerm: 'Disney luggage tag personalized',
    price: '$4–$9',
    tip: 'Ask your FE group for names in advance if going the personalized route.',
  },
  {
    name: 'Mini Flashlight / LED Keychain',
    description: 'Useful onboard (navigating dark hallways) and at Pirate Night fireworks.',
    searchTerm: 'mini LED keychain flashlight bulk',
    price: '$7–$10',
    tip: 'Multi-packs bring the cost well under $1 each.',
  },
  {
    name: 'Chapstick / Lip Balm (Tropical Flavors)',
    description: 'Adults and kids love flavored lip balm. Tropical flavors fit the cruise vibe.',
    searchTerm: 'tropical lip balm bulk mini',
    price: '$6–$9',
    tip: 'Pack in small organza bags with a ribbon for a polished presentation.',
  },
  {
    name: 'Castaway Cay Beach Buttons / Pins',
    description: 'Buttons celebrating specific Disney milestones or quotes are popular collector items.',
    searchTerm: 'Disney cruise button pin Castaway Cay',
    price: '$3–$8',
    tip: 'First-timer, anniversary, and birthday pins are especially appreciated.',
  },
  {
    name: 'Mini Puzzle Erasers',
    description: 'These are surprisingly delightful — erasers that come apart and snap back together. Kids spend 20 minutes just playing with them.',
    searchTerm: 'mini puzzle erasers bulk kids',
    price: '$5–$8',
    tip: 'Find Disney character shapes if available, otherwise animal shapes work great.',
  },
  {
    name: 'Mickey Ears Foam Stickers / Craft Kit',
    description: 'Foam sticker kits with Disney shapes let kids make their own crafts during sea days.',
    searchTerm: 'Mickey Mouse foam craft sticker kit kids',
    price: '$6–$9',
    tip: 'Roll them up in a small bag with a note — "for sea days!"',
  },
  {
    name: 'Pirate Eye Patch (for Pirate Night)',
    description: 'Pirate Night is a highlight of every Disney cruise. Gift the eye patch in advance for maximum fun.',
    searchTerm: 'pirate eye patch kids party',
    price: '$4–$7',
    tip: 'Pair with a pirate-themed note for extra charm.',
  },
  {
    name: 'Mini Playing Cards',
    description: 'Cruise days at sea call for card games. Mini decks are lightweight and easy to pack.',
    searchTerm: 'mini playing cards travel size',
    price: '$3–$6',
    tip: 'Disney-themed decks are available but sell out fast — order early.',
  },
  {
    name: 'Waterproof Stickers (for Water Bottles)',
    description: 'Vinyl waterproof sticker packs are a massive hit. Kids plaster them on their water bottles, reusable cups, and port lanyards.',
    searchTerm: 'Disney waterproof vinyl stickers water bottle',
    price: '$5–$9',
    tip: 'Stitch-themed stickers are perennially popular on DCL.',
  },
  {
    name: 'Character Bookmarks',
    description: 'Perfect for families who love to read during sea days or at the pool.',
    searchTerm: 'Disney character bookmark set kids',
    price: '$4–$7',
    tip: 'Laminated or metal bookmarks feel more premium.',
  },
  {
    name: 'Mini Slime Kits',
    description: 'Sea days need activities. Mini slime kits keep kids busy for hours.',
    searchTerm: 'mini slime kit kids travel size',
    price: '$5–$9',
    tip: 'Choose low-mess varieties and include a small note about where to play (pool deck works).',
  },
  {
    name: 'Sunscreen Stick (SPF 50)',
    description: 'A practical gift that every cruiser actually needs. Stick sunscreen is mess-free and great for Castaway Cay day.',
    searchTerm: 'sunscreen stick SPF 50 travel size',
    price: '$5–$8',
    tip: 'Include a card that says "for Castaway Cay — don\'t get burned!"',
  },
  {
    name: 'Dollar Store / Travel-Size Snacks',
    description: 'Trail mix packs, individually wrapped chocolates, or gummy candy in themed bags are always a hit.',
    searchTerm: 'individually wrapped candy bulk snack bags',
    price: '$5–$10',
    tip: 'Check allergy policies in your FE group — nut-free options are safest.',
  },
  {
    name: 'Mini Coloring Books with Crayons',
    description: 'Perfect for long sea days. Disney character coloring books paired with a small crayon set.',
    searchTerm: 'Disney mini coloring book crayons kids travel',
    price: '$6–$10',
    tip: 'Tear out a few pages and roll them into a tube with the crayons for a compact gift.',
  },
]

export default function BestFishExtenderGifts() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1628] to-[#1E3A5F] text-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
              Planning Tips
            </span>
          </div>
          <h1 className="font-fraunces text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Best Fish Extender Gifts Under $10 (2026)
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            18 crowd-pleasing FE gift ideas — all under $10, all available on Amazon, and
            all light enough to fit in your carry-on.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-blue-300">
            <span>By GatGridCruises</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* What is FE? */}
          <div className="bg-[#1E3A5F]/10 border border-blue-200 rounded-xl p-6 mb-10">
            <div className="flex items-start gap-3">
              <Gift className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-slate-900 mb-1">What is a Fish Extender?</h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Fish Extenders (FEs) are a beloved Disney Cruise tradition. Disney places a small metal
                  fish hook outside each stateroom door for hanging wave phones and Fish Extender bags.
                  FE groups are organized online (Facebook, DCL cruiser groups) before a sailing — members
                  leave small gifts in each other&apos;s bags throughout the cruise. It&apos;s a surprise-and-delight
                  ritual that turns strangers into cruise friends.
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 text-lg mb-8 leading-relaxed">
            The golden rules of FE gifting: keep it small, keep it lightweight (you have to pack these),
            and stay under $5–$10 per cabin. Here are 18 ideas that consistently land well.
          </p>

          <p className="text-xs text-slate-400 mb-8">
            Disclosure: Links below are Amazon affiliate links (tag: thm1230b0300-20). GatGridCruises earns a small
            commission if you purchase through them, at no extra cost to you.
          </p>

          {/* Gift list */}
          <div className="space-y-6">
            {gifts.map((gift, index) => (
              <div key={gift.name} className="border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-fraunces text-lg font-bold text-slate-900">{gift.name}</h3>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                        {gift.price}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2 leading-relaxed">{gift.description}</p>
                    {gift.tip && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                        <strong>Tip:</strong> {gift.tip}
                      </p>
                    )}
                    <a
                      href={amzLink(gift.searchTerm)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Search on Amazon <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packing Tips */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-4">FE Packing Tips</h2>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                Pack FE gifts in a dedicated bag or zip-lock so you can find them easily on embarkation day.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                Label each gift set by cabin number (your FE organizer will share this list) before you leave home.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                Small organza bags or cellophane treat bags make any gift look polished and cost almost nothing.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                First delivery is usually Day 1 at embarkation or Day 2 morning. Check with your group for the schedule.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">→</span>
                Include a handwritten card or printed card with your cabin number so recipients can thank you.
              </li>
            </ul>
          </div>

          {/* Related links */}
          <div className="mt-10">
            <h3 className="font-fraunces text-lg font-bold text-slate-900 mb-4">Related Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/disney-cruise-packing-list" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  The Ultimate Disney Cruise Packing List →
                </Link>
              </li>
              <li>
                <Link href="/guides/first-time-disney-cruise-tips" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  25 Things to Know Before Your First Disney Cruise →
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Find Current Disney Cruise Deals →
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </article>
    </main>
  )
}
