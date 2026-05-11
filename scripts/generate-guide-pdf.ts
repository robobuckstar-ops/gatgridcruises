/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generates the Disney Cruise Insider's Guide PDF (lead-magnet).
 *
 * Output: public/downloads/disney-cruise-insiders-guide.pdf
 *
 * Run with: npx tsx scripts/generate-guide-pdf.ts
 *
 * Pulls editorial data from src/data/ so the guide stays in sync with the
 * stateroom-category profiles and ship lineup that power the site. Keep
 * sections concise — the goal is a tight, useful PDF readers actually finish.
 */
import PDFDocument from 'pdfkit'
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { stateroomCategories } from '../src/data/stateroom-categories'
import { ships } from '../src/data/ships'

const OUT = join(process.cwd(), 'public', 'downloads', 'disney-cruise-insiders-guide.pdf')

const NAVY = '#1E3A5F'
const NAVY_DARK = '#0F2742'
const GOLD = '#D4AF37'
const GOLD_DARK = '#8C6F20'
const INK = '#1E293B'
const MUTED = '#64748B'
const PAGE_BG = '#FFFFFF'
const SECTION_TINT = '#F0F4F8'
const RULE = '#E2E8F0'

interface Doc extends PDFKit.PDFDocument {
  // helpers attached at runtime
}

function drawHeader(doc: Doc, page: number) {
  doc.save()
  doc.rect(0, 0, doc.page.width, 28).fill(NAVY)
  doc.fillColor(GOLD).fontSize(8).font('Helvetica-Bold')
  doc.text('GATGRID CRUISES', 40, 10, { lineBreak: false })
  doc.fillColor('#FFFFFF').font('Helvetica')
  doc.text('Disney Cruise Insider’s Guide', 0, 10, {
    width: doc.page.width - 40,
    align: 'right',
    lineBreak: false,
  })
  doc.restore()
  doc.save()
  doc.fontSize(8).fillColor(MUTED).font('Helvetica')
  doc.text(`Page ${page}`, 40, doc.page.height - 26, {
    width: doc.page.width - 80,
    align: 'center',
    lineBreak: false,
  })
  doc.restore()
}

function newSectionPage(doc: Doc, pageRef: { n: number }) {
  doc.addPage()
  pageRef.n += 1
  drawHeader(doc, pageRef.n)
  doc.moveDown()
  doc.x = 40
  doc.y = 50
}

function ensureRoom(doc: Doc, height: number, pageRef: { n: number }) {
  if (doc.y + height > doc.page.height - 50) {
    newSectionPage(doc, pageRef)
  }
}

function h1(doc: Doc, text: string) {
  doc.font('Helvetica-Bold').fontSize(22).fillColor(NAVY)
  doc.text(text, { width: doc.page.width - 80 })
  doc.moveDown(0.3)
  doc.save()
  doc.rect(40, doc.y, 60, 3).fill(GOLD)
  doc.restore()
  doc.moveDown(0.8)
}

function h2(doc: Doc, text: string, pageRef: { n: number }) {
  ensureRoom(doc, 70, pageRef)
  doc.moveDown(0.5)
  doc.font('Helvetica-Bold').fontSize(15).fillColor(NAVY_DARK)
  doc.text(text, { width: doc.page.width - 80 })
  doc.moveDown(0.4)
}

function p(doc: Doc, text: string) {
  doc.font('Helvetica').fontSize(10.5).fillColor(INK).text(text, {
    width: doc.page.width - 80,
    lineGap: 2,
    paragraphGap: 6,
    align: 'left',
  })
}

function muted(doc: Doc, text: string) {
  doc.font('Helvetica-Oblique').fontSize(9).fillColor(MUTED).text(text, {
    width: doc.page.width - 80,
    lineGap: 1,
    paragraphGap: 4,
  })
}

function bullet(doc: Doc, items: string[]) {
  doc.font('Helvetica').fontSize(10.5).fillColor(INK)
  items.forEach((item) => {
    doc.text(`•  ${item}`, {
      width: doc.page.width - 80,
      indent: 6,
      lineGap: 2,
      paragraphGap: 3,
    })
  })
  doc.moveDown(0.4)
}

function tip(doc: Doc, label: string, body: string, pageRef: { n: number }) {
  const padding = 12
  const width = doc.page.width - 80
  doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY)
  const labelHeight = doc.heightOfString(label, { width: width - padding * 2 })
  doc.font('Helvetica').fontSize(10).fillColor(INK)
  const bodyHeight = doc.heightOfString(body, { width: width - padding * 2, lineGap: 2 })
  const boxHeight = labelHeight + bodyHeight + padding * 2 + 4
  ensureRoom(doc, boxHeight + 10, pageRef)

  const top = doc.y
  doc.save()
  doc.roundedRect(40, top, width, boxHeight, 6).fillAndStroke(SECTION_TINT, RULE)
  doc.fillColor(GOLD_DARK)
  doc.rect(40, top, 4, boxHeight).fill(GOLD)
  doc.restore()

  doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY)
  doc.text(label, 40 + padding, top + padding, { width: width - padding * 2 })
  doc.font('Helvetica').fontSize(10).fillColor(INK)
  doc.text(body, 40 + padding, top + padding + labelHeight + 4, {
    width: width - padding * 2,
    lineGap: 2,
  })

  doc.y = top + boxHeight + 8
  doc.x = 40
}

function pillRow(doc: Doc, pairs: Array<[string, string]>, pageRef: { n: number }) {
  const labelWidth = 130
  pairs.forEach(([label, value]) => {
    ensureRoom(doc, 16, pageRef)
    const top = doc.y
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(NAVY)
    doc.text(label.toUpperCase(), 40, top, { width: labelWidth, lineBreak: false })
    doc.font('Helvetica').fontSize(10).fillColor(INK)
    doc.text(value, 40 + labelWidth, top, {
      width: doc.page.width - 80 - labelWidth,
      lineGap: 2,
    })
    doc.moveDown(0.2)
  })
  doc.moveDown(0.5)
}

function coverPage(doc: Doc) {
  doc.save()
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY)
  // Gold band
  doc.rect(0, 110, doc.page.width, 4).fill(GOLD)
  doc.rect(0, doc.page.height - 114, doc.page.width, 4).fill(GOLD)
  doc.restore()

  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11)
  doc.text('GATGRID CRUISES — INSIDER’S DESK', 40, 60, {
    width: doc.page.width - 80,
    align: 'center',
    characterSpacing: 2,
  })

  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(34)
  doc.text('The Disney Cruise', 40, 200, { width: doc.page.width - 80, align: 'center' })
  doc.text('Insider’s Guide', { width: doc.page.width - 80, align: 'center' })

  doc.moveDown(0.6)
  doc.fillColor('#D9E2EC').font('Helvetica').fontSize(13)
  doc.text(
    'Everything seasoned cruisers know — and most first-timers learn the hard way.',
    { width: doc.page.width - 80, align: 'center' }
  )

  doc.moveDown(2.5)
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11)
  doc.text('INSIDE THIS GUIDE', { width: doc.page.width - 80, align: 'center', characterSpacing: 2 })
  doc.moveDown(0.4)

  const toc = [
    'Choosing the right Disney ship',
    'Stateroom categories, decoded',
    'What’s included vs. what costs extra',
    'Castaway Cay & Lookout Cay tips',
    'Onboard credit, explained',
    'The first-time cruiser cheat sheet',
    'Pre-cruise packing checklist',
  ]
  doc.fillColor('#FFFFFF').font('Helvetica').fontSize(11)
  toc.forEach((line, i) => {
    doc.text(`${String(i + 1).padStart(2, '0')}   ${line}`, {
      width: doc.page.width - 200,
      align: 'left',
      indent: 100,
    })
    doc.moveDown(0.15)
  })

  doc.fillColor('#9FB3C8').font('Helvetica-Oblique').fontSize(9)
  doc.text(
    'A free resource from GatGrid Cruises. Not affiliated with The Walt Disney Company.',
    40,
    doc.page.height - 80,
    { width: doc.page.width - 80, align: 'center' }
  )
  doc.text('gatgridcruises.com', { width: doc.page.width - 80, align: 'center' })
}

async function main() {
  await mkdir(dirname(OUT), { recursive: true })

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 50, bottom: 50, left: 40, right: 40 },
    info: {
      Title: 'The Disney Cruise Insider’s Guide',
      Author: 'GatGrid Cruises',
      Subject: 'Disney cruise planning resource',
      Keywords: 'Disney cruise, planning, staterooms, Castaway Cay',
    },
  }) as Doc

  const stream = createWriteStream(OUT)
  doc.pipe(stream)

  // ── Cover ──────────────────────────────────────────────────────────────────
  coverPage(doc)
  const pageRef = { n: 1 }

  // ── Intro ──────────────────────────────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, 'Welcome aboard.')
  p(
    doc,
    'This guide is the one we wish someone had handed us before our first Disney cruise. It pulls together the things that genuinely change your trip — not the surface-level brochure stuff, but the practical, money-and-time decisions: which ship fits your family, which stateroom category is worth it, where Disney quietly charges extra, and what to do on Castaway Cay so you actually enjoy it.'
  )
  p(
    doc,
    'We’re GatGrid Cruises — an independent Disney cruise concierge and info site. We don’t sell cabins; we help you pick the right one. Everything in here is editorial advice, not marketing copy.'
  )
  tip(
    doc,
    'How to use this guide',
    'Skim the section that matches the decision in front of you. Most sections are 1–2 pages. The packing checklist at the end is the print-and-pack version.',
    pageRef
  )

  // ── Section 1: Choosing the right ship ─────────────────────────────────────
  h2(doc, '1. Choosing the right Disney ship', pageRef)
  p(
    doc,
    'Disney Cruise Line operates a growing fleet that ranges from classic, intimate ships to the largest, most feature-packed vessels in the family-cruise category. The right choice usually comes down to ship size, kid-club age range, and itinerary length — not which mascot is painted on the smokestack.'
  )

  ships.forEach((ship) => {
    ensureRoom(doc, 90, pageRef)
    const top = doc.y
    doc.save()
    doc.roundedRect(40, top, doc.page.width - 80, 78, 6).fillAndStroke('#F8FAFC', RULE)
    doc.restore()
    doc.font('Helvetica-Bold').fontSize(12).fillColor(NAVY)
    doc.text(ship.name, 52, top + 10, { width: doc.page.width - 100 })
    doc.font('Helvetica').fontSize(9).fillColor(MUTED)
    doc.text(
      `Launched ${ship.year_launched}  •  Capacity ${ship.capacity.toLocaleString()}  •  ${ship.tonnage.toLocaleString()} GT`,
      52,
      top + 28,
      { width: doc.page.width - 100 }
    )
    doc.font('Helvetica').fontSize(10).fillColor(INK)
    const blurb = ship.highlights[0] ?? ''
    doc.text(blurb, 52, top + 44, { width: doc.page.width - 100, height: 32, ellipsis: true })
    doc.y = top + 86
  })

  tip(
    doc,
    'Our rule of thumb',
    'First-time families with kids under 8 → Dream, Fantasy, or Wish. Couples or older kids who want classic Disney charm → Magic or Wonder. Anyone chasing the newest experiences → Treasure, Destiny, or Adventure.',
    pageRef
  )

  // ── Section 2: Stateroom categories ────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '2. Stateroom categories, decoded')
  p(
    doc,
    'There are four broad categories — Inside, Oceanview, Verandah, and Concierge. The price gap between them is wide, and the right choice depends as much on the length of your sailing as on your budget.'
  )

  stateroomCategories.forEach((cat) => {
    h2(doc, cat.name, pageRef)
    muted(doc, cat.tagline)
    pillRow(
      doc,
      [
        ['Typical price', cat.priceRange],
        ['Estimated total', cat.typicalTotal],
        ['Size', cat.sqft],
        ['Sleeps', cat.sleeps],
        ['View', cat.window],
      ],
      pageRef
    )

    ensureRoom(doc, 40, pageRef)
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('Why people pick it')
    doc.moveDown(0.2)
    bullet(doc, cat.pros.slice(0, 3))

    ensureRoom(doc, 40, pageRef)
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('Watch-outs')
    doc.moveDown(0.2)
    bullet(doc, cat.cons.slice(0, 3))

    ensureRoom(doc, 40, pageRef)
    doc.font('Helvetica-Bold').fontSize(10).fillColor(NAVY).text('Best for')
    doc.moveDown(0.2)
    bullet(doc, cat.bestFor.slice(0, 3))
  })

  tip(
    doc,
    'The verandah question',
    'For 5+ night sailings with sea days, a verandah is the highest-leverage upgrade we recommend. For 3-night quick trips, inside or oceanview is usually the smarter spend.',
    pageRef
  )

  // ── Section 3: Included vs extra ───────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '3. What’s included vs. what costs extra')
  p(
    doc,
    'Disney’s cruise fare is more inclusive than most other lines, but there are clearly-defined upgrades and add-ons. Knowing what’s in the fare keeps onboard surprises off the bill.'
  )

  h2(doc, 'Included in your fare', pageRef)
  bullet(doc, [
    'Rotational dining at three main restaurants (full menus, multiple courses)',
    'Buffet, quick-service, and casual dining all day',
    'Soft drinks, coffee, tea, and water at meals and at beverage stations',
    'Broadway-style shows, deck parties, and live entertainment',
    'Youth clubs by age (nursery 6mo–3yr, Oceaneer Club/Lab 3–12, Edge 11–14, Vibe 14–17)',
    'Pools, splash zones, AquaDuck or AquaMouse on most newer ships',
    'In-room movies, basic stateroom service, and daily turndown',
    'Character meet-and-greets, deck parties, and themed events',
  ])

  h2(doc, 'Costs extra (typical range)', pageRef)
  bullet(doc, [
    'Specialty dining at Palo or Remy — about $45–$135 per person',
    'Alcoholic drinks, premium coffees, and beverage packages',
    'Spa treatments, salon services, and Senses Spa thermal access',
    'Shore excursions — $50–$500 per person depending on activity',
    'Photo packages from Shutters',
    'WiFi/internet packages (per-MB or unlimited)',
    'Gratuities — $14.50/person/night standard, billed automatically',
    'Port-day transfers, taxis, and independent excursions',
  ])

  tip(
    doc,
    'The hidden “gotcha”',
    'Gratuities are billed automatically on the last night unless you pre-pay. Budget about $14.50 per guest per night, plus a higher Concierge rate if you book that category.',
    pageRef
  )

  // ── Section 4: Castaway Cay ────────────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '4. Castaway Cay & Lookout Cay tips')
  p(
    doc,
    'Disney’s two private islands are a highlight of most Bahamas and Caribbean itineraries. They’re also where casual planning costs you the best loungers, the best bikes, and the shortest BBQ lines.'
  )

  h2(doc, 'Castaway Cay (Bahamas)', pageRef)
  bullet(doc, [
    'Hit the family beach early — the best shaded loungers go in the first 20 minutes off the gangway.',
    'Book Castaway Cay Family Beach cabanas through Onboard Reservations the moment they open (they sell out fast).',
    'Serenity Bay is the adults-only stretch — quieter, with its own BBQ.',
    'Snorkeling rentals are reasonable, but the underwater “dig site” gets crowded by 11 AM.',
    'Bike rentals are a hit for the lighthouse loop; rent within the first hour.',
    'Bring reef-safe sunscreen. The on-island shops are convenience-priced.',
  ])

  h2(doc, 'Lookout Cay at Lighthouse Point', pageRef)
  bullet(doc, [
    'Newer destination on Eleuthera with a more remote, natural feel.',
    'Family beach, kids splash area, and a longer adults-only stretch.',
    'Disney-run excursions are limited but high-quality; book early.',
    'BBQ lunch (included) is similar quality to Castaway Cay.',
  ])

  tip(
    doc,
    'Cabana strategy',
    'If a private cabana matters, target a Concierge stateroom — Concierge guests get first booking access. Otherwise, set a calendar alert for the day your booking window opens.',
    pageRef
  )

  // ── Section 5: Onboard credit ──────────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '5. Onboard credit, explained')
  p(
    doc,
    'Onboard credit (OBC) is dollar-for-dollar credit on your shipboard account. It spends like cash on excursions, drinks, spa, specialty dining, photo packages, gratuities (in most cases), and gift shop purchases. It does not convert to cash and is forfeited if not spent.'
  )

  h2(doc, 'Where OBC comes from', pageRef)
  bullet(doc, [
    'Travel agency promotions (the GatGrid OBC promotion is tiered by total fare, up to $400)',
    'Past-guest loyalty perks (Castaway Club)',
    'Stockholder benefits (small DIS share-based credit, when offered)',
    'Promotional sailings (military, Florida resident, restricted) on select fares',
  ])

  h2(doc, 'Best ways to spend it', pageRef)
  bullet(doc, [
    'Specialty dining at Palo or Remy — the highest-impact splurge for most couples.',
    'Onboard excursions on port days you wouldn’t otherwise pay cash for.',
    'Pre-paid gratuities, so the last-night bill is small.',
    'Spa treatments — cheaper on port days when the ship is empty.',
  ])

  tip(
    doc,
    'OBC is not the same as a discount',
    'Disney never discounts cabins directly, so OBC is the closest thing to a price cut. Treat $200 of OBC as roughly equivalent to a $200 lower cabin price — just don’t let it go unspent.',
    pageRef
  )

  // ── Section 6: First-time cheat sheet ──────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '6. The first-time cruiser cheat sheet')
  p(
    doc,
    'A short list of things experienced Disney cruisers do automatically that first-timers rarely think about.'
  )
  bullet(doc, [
    'Book rotational dining preferences before the cruise opens online check-in.',
    'Pre-register kids for Oceaneer Club / Lab so wristbands are ready at embarkation.',
    'Show up at port early on day one — your stateroom may not be ready, but the ship is.',
    'Bring a power strip without surge protection (surge-protected strips are confiscated).',
    'Bring a lanyard for your Key to the World card — it doubles as your room key and onboard charge card.',
    'Book Palo or Remy on the embarkation-day rush, not after dinner that night.',
    'Sign up for a Bibbidi Bobbidi Boutique slot early on Bahamas or Caribbean itineraries with princesses on board.',
    'Don’t skip the safety drill — it’s mandatory before the ship leaves port.',
    'Set a price-watch on your sailing after you book — Disney fares move, and we’ll rebook at a lower rate if it drops before final payment.',
    'Tell guest services it’s your first cruise on embarkation day — there’s a pin.',
  ])

  // ── Section 7: Packing checklist ───────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, '7. The pre-cruise packing checklist')
  p(
    doc,
    'A trimmed, real-world list. Print this page, tape it to the suitcase, check things off as they go in.'
  )

  const checklist: Array<[string, string[]]> = [
    [
      'Documents',
      [
        'Passport (or birth certificate + state ID for closed-loop sailings)',
        'Printed boarding pass / port arrival time',
        'Credit card on file for onboard account',
        'Travel insurance policy info',
        'Photo of all docs saved to phone',
      ],
    ],
    [
      'Clothing essentials',
      [
        'Swimsuits (at least 2 per person — one always drying)',
        'Cover-ups / pool sandals',
        'One “dress night” outfit per adult (most nights are smart casual)',
        'Light layers for chilly dining rooms and theaters',
        'Comfortable walking shoes for port days',
        'Pajamas (kids’ clubs are cold)',
        'Sun hats and sunglasses',
      ],
    ],
    [
      'Stateroom helpers',
      [
        'Power strip without surge protection',
        'Magnetic hooks (cabin walls are metal)',
        'Over-the-door shoe organizer for the bathroom',
        'Lanyard for Key to the World card',
        'Refillable water bottle',
      ],
    ],
    [
      'Pharmacy bag',
      [
        'Motion-sickness remedies (Bonine, Sea-Bands)',
        'Pain reliever, antacids, band-aids',
        'Sunscreen (reef-safe for Castaway Cay)',
        'Aloe gel for the inevitable first sunburn',
        'Hand sanitizer / wipes',
      ],
    ],
    [
      'Tech & extras',
      [
        'Phone charger + portable battery',
        'Underwater phone pouch for the pool / beach',
        'Camera or GoPro for AquaDuck / island shots',
        'Headphones for sea-day movies',
      ],
    ],
  ]

  checklist.forEach(([group, items]) => {
    h2(doc, group, pageRef)
    items.forEach((item) => {
      ensureRoom(doc, 14, pageRef)
      const top = doc.y
      doc.save()
      doc.rect(46, top + 3, 9, 9).stroke(NAVY)
      doc.restore()
      doc.font('Helvetica').fontSize(10).fillColor(INK)
      doc.text(item, 62, top, { width: doc.page.width - 100 })
    })
    doc.moveDown(0.6)
  })

  // ── Outro ──────────────────────────────────────────────────────────────────
  newSectionPage(doc, pageRef)
  h1(doc, 'When you’re ready, we’re here.')
  p(
    doc,
    'GatGrid Cruises is an independent concierge for Disney sailings. We don’t up-sell or push specific cabins — we help you pick the one that fits, watch the price after you book, and answer the dumb questions you don’t want to ask the cruise line.'
  )
  p(
    doc,
    'There’s no cost to use our concierge service. Disney pays the agency, so your fare is the same whether you book direct or through us — except with us you also get a real person who’s sailed these ships, an OBC promotion on qualifying fares, and ongoing price monitoring after deposit.'
  )
  tip(
    doc,
    'Ready for your own plan?',
    'Reply to the email this guide came with, or send us a quick note at bookings@gatgridcruises.com — we’ll send a no-pressure first round of options for the dates you’re considering.',
    pageRef
  )
  doc.moveDown(1)
  muted(
    doc,
    'GatGrid Cruises is not affiliated with The Walt Disney Company, Disney Cruise Line, or any of their subsidiaries. All ship names and trademarks are property of their respective owners. Pricing, itineraries, and onboard offerings change — verify details with your concierge before booking.'
  )

  doc.end()

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve())
    stream.on('error', reject)
  })

  // eslint-disable-next-line no-console
  console.log(`✓ Wrote ${OUT}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
