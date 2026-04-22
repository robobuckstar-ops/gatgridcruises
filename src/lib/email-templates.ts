import type { Sailing } from '@/types/database'
import { formatPrice, formatDate } from './utils'

export function weeklyDigestTemplate(data: {
  topDeals: (Sailing & { percentBelow: number })[]
  featuredSailings: Sailing[]
  totalSailingsTracked: number
  weekDate: string
}): string {
  const { topDeals, featuredSailings, totalSailingsTracked, weekDate } = data

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GatGridCruises Weekly Deals — ${weekDate}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f8fafc; color: #0F172A; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #1E3A5F; padding: 32px 24px; text-align: center; }
    .header h1 { color: #D4AF37; font-size: 28px; margin: 0 0 8px; font-family: Georgia, serif; }
    .header p { color: #94a3b8; font-size: 14px; margin: 0; }
    .section { padding: 24px; }
    .section-title { font-size: 20px; color: #1E3A5F; margin: 0 0 16px; font-family: Georgia, serif; }
    .deal-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .deal-name { font-size: 16px; font-weight: 600; color: #1E3A5F; margin: 0 0 8px; }
    .deal-meta { font-size: 13px; color: #64748B; margin: 0 0 8px; }
    .deal-price { font-size: 24px; font-weight: 700; color: #1E3A5F; }
    .deal-drop { display: inline-block; background: #ecfdf5; color: #059669; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .score-badge { display: inline-block; background: #f0fdf4; color: #16a34a; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; border: 1px solid #bbf7d0; }
    .cta-button { display: inline-block; background: #D4AF37; color: #1E3A5F; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
    .footer { background: #1E3A5F; padding: 24px; text-align: center; }
    .footer p { color: #94a3b8; font-size: 12px; margin: 4px 0; }
    .footer a { color: #D4AF37; text-decoration: none; }
    .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
    .stat { text-align: center; padding: 16px; }
    .stat-number { font-size: 32px; font-weight: 700; color: #D4AF37; }
    .stat-label { font-size: 13px; color: #64748B; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚓ GatGridCruises</h1>
      <p>Weekly Deal Digest — ${weekDate}</p>
    </div>

    <div class="stat">
      <div class="stat-number">${totalSailingsTracked}</div>
      <div class="stat-label">sailings tracked this week</div>
    </div>

    <div class="section">
      <h2 class="section-title">🔥 Biggest Price Drops</h2>
      ${topDeals.map(deal => `
        <div class="deal-card">
          <div class="deal-name">${deal.itinerary_name}</div>
          <div class="deal-meta">
            Disney ${deal.ship?.name?.replace('Disney ', '') || ''} · ${formatDate(deal.sail_date)} · ${deal.length_nights} nights
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            <div>
              <span class="deal-price">${formatPrice(deal.current_lowest_price)}</span>
              <span class="deal-drop">↓ ${deal.percentBelow}% below avg</span>
            </div>
            <span class="score-badge">Score: ${deal.sailing_score}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="text-align: center; padding: 0 24px 24px;">
      <a href="https://gatgridcruises.com/deals" class="cta-button">View All Deals →</a>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h2 class="section-title">⭐ Featured This Week</h2>
      ${featuredSailings.slice(0, 4).map(s => `
        <div class="deal-card">
          <div class="deal-name">${s.itinerary_name}</div>
          <div class="deal-meta">
            Disney ${s.ship?.name?.replace('Disney ', '') || ''} · ${formatDate(s.sail_date)}
          </div>
          <div class="deal-price" style="margin-top: 8px;">${formatPrice(s.current_lowest_price)}</div>
        </div>
      `).join('')}
    </div>

    <div style="text-align: center; padding: 0 24px 24px;">
      <a href="https://gatgridcruises.com/tools/cost-calculator" class="cta-button" style="background: #1E3A5F; color: #ffffff;">Calculate Your Trip Cost →</a>
    </div>

    <div class="footer">
      <p>You're receiving this because you subscribed at GatGridCruises.com</p>
      <p><a href="https://gatgridcruises.com/unsubscribe?token={{unsubscribe_token}}">Unsubscribe</a> · <a href="https://gatgridcruises.com/disclosures">Disclosures</a></p>
      <p style="margin-top: 12px;">Independently owned. Not affiliated with The Walt Disney Company.</p>
      <p>© ${new Date().getFullYear()} GatGridCruises</p>
    </div>
  </div>
</body>
</html>`
}

// ─── Booking inquiry email templates ────────────────────────────────────────

const BRAND_HEADER = `
  <div style="background-color:#1E3A5F;padding:24px 32px;text-align:center;">
    <h1 style="margin:0;color:#D4AF37;font-family:Georgia,serif;font-size:22px;font-weight:bold;letter-spacing:1px;">
      ⚓ GatGrid Cruises
    </h1>
    <p style="margin:6px 0 0;color:#93C5FD;font-family:Arial,sans-serif;font-size:13px;">
      Disney Cruise Specialists — Boardwalk Travel Agency
    </p>
  </div>
`

const BRAND_FOOTER_HTML = `
  <div style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;padding:24px 32px;text-align:center;margin-top:32px;">
    <p style="margin:0 0 6px;color:#64748B;font-family:Arial,sans-serif;font-size:12px;">
      GatGrid Cruises · Booking services provided through Boardwalk Travel Agency
    </p>
    <p style="margin:0;color:#94A3B8;font-family:Arial,sans-serif;font-size:11px;">
      Questions? Reply to this email or visit <a href="https://gatgridcruises.com" style="color:#1E3A5F;">gatgridcruises.com</a>
    </p>
  </div>
`

function wrapBookingEmail(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F1F5F9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <tr><td>${BRAND_HEADER}</td></tr>
        <tr><td style="padding:32px;">${body}</td></tr>
        <tr><td>${BRAND_FOOTER_HTML}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export interface InquiryData {
  fullName: string
  email: string
  phone?: string
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  adults: string
  children: string
  ship: string
  stateroom: string
  cruiseLength: string[]
  destination: string
  budget: string
  notes?: string
  referral?: string
}

export function INQUIRY_RECEIVED(data: InquiryData): string {
  const dateRange = data.startMonth && data.startYear
    ? `${data.startMonth} ${data.startYear}${data.endMonth ? ` – ${data.endMonth} ${data.endYear}` : ''}`
    : 'Flexible'

  const summaryRows: [string, string][] = [
    ['Destination', data.destination === 'any' ? 'Any' : data.destination],
    ['Ship', data.ship === 'any' ? 'Any Ship' : `Disney ${data.ship.charAt(0).toUpperCase() + data.ship.slice(1)}`],
    ['Dates', dateRange],
    ['Party', `${data.adults} adult(s), ${data.children} child(ren)`],
    ['Stateroom', data.stateroom === 'no-preference' ? 'No Preference' : data.stateroom],
    ['Cruise Length', data.cruiseLength.length ? data.cruiseLength.join(', ') + ' nights' : 'Flexible'],
    ['Budget/Person', data.budget === 'flexible' ? 'Flexible' : data.budget],
  ]

  const summaryHTML = summaryRows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#64748B;width:40%;">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#1E293B;font-weight:600;">${value}</td>
    </tr>
  `).join('')

  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">Hi ${data.fullName}!</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      I'm Grayson Starbuck — founder of GatGrid Cruises and a Disney cruise fanatic who has taken his family on more sailings than I care to admit. There's truly nothing like it, and I'd love to help your family experience that same magic.
    </p>
    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">
      I received your request and will personally review your preferences and get back to you within <strong>24 hours</strong> with hand-picked options that fit your family's needs and budget.
    </p>
    <div style="background-color:#F0F7FF;border-left:4px solid #1E3A5F;border-radius:6px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0 12px;color:#1E3A5F;font-size:15px;font-family:Georgia,serif;">Here's what you're looking for:</h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${summaryHTML}</table>
    </div>
    ${data.notes ? `<p style="margin:0 0 20px;color:#334155;font-size:14px;"><strong>Your notes:</strong> ${data.notes}</p>` : ''}
    <p style="margin:0 0 8px;color:#334155;font-size:14px;line-height:1.6;">While you wait, check out our free planning tools:</p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#1E3A5F;font-size:14px;">
      <li style="margin-bottom:6px;"><a href="https://gatgridcruises.com/tools/cost-calculator" style="color:#1E3A5F;">Total Trip Cost Calculator</a></li>
      <li style="margin-bottom:6px;"><a href="https://gatgridcruises.com/guides" style="color:#1E3A5F;">Disney Cruise Guides</a></li>
      <li><a href="https://gatgridcruises.com/deals" style="color:#1E3A5F;">Current Deals</a></li>
    </ul>
    <p style="margin:0;color:#64748B;font-size:13px;">Talk soon,<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises · Boardwalk Travel Agency</p>
  `)
}

export interface QuoteOption {
  shipName: string
  sailDate: string
  nights: number
  itinerary: string
  stateroomCategory: string
  pricePerPerson: number
  totalPrice: number
  highlights: string[]
  bookByDate?: string
}

export function QUOTE_FOLLOW_UP(name: string, options: QuoteOption[]): string {
  const optionsHTML = options.map((opt, i) => `
    <div style="border:1px solid #E2E8F0;border-radius:8px;padding:16px;margin-bottom:16px;">
      <p style="margin:0 0 8px;"><span style="background-color:#1E3A5F;color:#D4AF37;font-size:11px;font-weight:bold;padding:3px 10px;border-radius:20px;text-transform:uppercase;">Option ${i + 1}</span>${opt.bookByDate ? `&nbsp;&nbsp;<span style="color:#EF4444;font-size:12px;font-weight:600;">Book by ${opt.bookByDate}</span>` : ''}</p>
      <h3 style="margin:8px 0 4px;color:#1E3A5F;font-family:Georgia,serif;font-size:16px;">${opt.itinerary}</h3>
      <p style="margin:0 0 12px;color:#64748B;font-size:13px;">${opt.shipName} · ${opt.sailDate} · ${opt.nights} nights · ${opt.stateroomCategory}</p>
      <p style="margin:0 0 12px;color:#1E293B;font-size:20px;font-weight:bold;">$${opt.pricePerPerson.toLocaleString()} <span style="font-size:13px;color:#64748B;font-weight:normal;">per person</span></p>
      ${opt.highlights.length ? `<ul style="margin:0;padding-left:16px;color:#334155;font-size:13px;">${opt.highlights.map(h => `<li style="margin-bottom:4px;">${h}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('')

  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">Hi ${name} — your Disney cruise options are ready!</h2>
    <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">I've put together the best options based on your preferences:</p>
    ${optionsHTML}
    <div style="background-color:#FEF9EC;border:1px solid #D4AF37;border-radius:8px;padding:16px;margin:24px 0;">
      <p style="margin:0;color:#92400E;font-size:13px;font-weight:600;">💳 Pro Tip: Pay with a travel rewards card</p>
      <p style="margin:6px 0 0;color:#78350F;font-size:13px;">Earn points toward future upgrades. The <a href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS" style="color:#92400E;">Amex Business Platinum</a> and <a href="https://www.referyourchasecard.com/226m/6ZT33F9TOQ" style="color:#92400E;">Chase Ink Business Preferred</a> both earn excellent travel rewards.</p>
    </div>
    <p style="margin:0;color:#64748B;font-size:13px;">Ready to move forward? Just reply.<br><br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br><span style="color:#64748B;">Grayson at GatGrid Cruises</span></p>
  `)
}

export interface BookingDetails {
  guestName: string
  shipName: string
  sailDate: string
  returnDate: string
  nights: number
  itinerary: string
  stateroomCategory: string
  stateroomNumber?: string
  bookingRef: string
  totalPaid: number
  finalPaymentDate: string
  ports: string[]
}

export function BOOKING_CONFIRMED(details: BookingDetails): string {
  const summaryRows: [string, string][] = [
    ['Booking Reference', `<strong>${details.bookingRef}</strong>`],
    ['Ship', details.shipName],
    ['Sailing', `${details.sailDate} – ${details.returnDate} (${details.nights} nights)`],
    ['Itinerary', details.itinerary],
    ['Stateroom', details.stateroomCategory + (details.stateroomNumber ? ` · Cabin ${details.stateroomNumber}` : '')],
    ['Total Paid', `<strong>$${details.totalPaid.toLocaleString()}</strong>`],
    ['Final Payment Due', `<span style="color:#DC2626;font-weight:600;">${details.finalPaymentDate}</span>`],
  ]

  return wrapBookingEmail(`
    <h2 style="margin:0 0 4px;color:#1E3A5F;font-family:Georgia,serif;font-size:24px;">Your Disney cruise is booked! 🎉</h2>
    <div style="background-color:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:20px;margin:20px 0;">
      <h3 style="margin:0 0 14px;color:#166534;font-size:15px;">Booking Summary</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${summaryRows.map(([label, value]) => `<tr><td style="padding:6px 0;color:#64748B;font-size:13px;width:45%;">${label}</td><td style="padding:6px 0;color:#1E293B;font-size:13px;">${value}</td></tr>`).join('')}
      </table>
    </div>
    <h3 style="margin:0 0 10px;color:#1E3A5F;font-family:Georgia,serif;font-size:16px;">Ports of Call</h3>
    <ul style="margin:0 0 20px;padding-left:20px;color:#334155;font-size:14px;">${details.ports.map(p => `<li style="margin-bottom:4px;">${p}</li>`).join('')}</ul>
    <h3 style="margin:0 0 10px;color:#1E3A5F;font-family:Georgia,serif;font-size:16px;">What to Do Next</h3>
    <ol style="margin:0 0 20px;padding-left:20px;color:#334155;font-size:14px;line-height:1.8;">
      <li>Set up your Disney Cruise Line online account at dcl.com</li>
      <li>Book Palo/Remy dining (opens 75–120 days before sailing)</li>
      <li>Reserve port adventures / shore excursions</li>
      <li>Complete DCL online check-in (available up to 75 days out)</li>
      <li>Download the Disney Cruise Line Navigator app</li>
    </ol>
    <div style="background-color:#FEF9EC;border:1px solid #D4AF37;border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="margin:0;color:#92400E;font-size:13px;font-weight:600;">💳 Maximize your rewards</p>
      <p style="margin:6px 0 0;color:#78350F;font-size:13px;">Consider paying your final balance with the <a href="https://americanexpress.com/en-us/referral/business-platinum-charge-card?ref=CRYSTSGCNM&XL=MIMNS" style="color:#92400E;">Amex Business Platinum</a> (5× on flights, up to $200 airline fee credit) or <a href="https://www.referyourchasecard.com/226m/6ZT33F9TOQ" style="color:#92400E;">Chase Ink Business Preferred</a> (3× on travel, no foreign transaction fees).</p>
    </div>
    <p style="margin:0;color:#64748B;font-size:13px;">Safe travels!<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

export function REMINDER_90_DAYS(name: string, shipName: string, sailDate: string, bookingRef: string): string {
  const items: [string, string][] = [
    ['Book Shore Excursions', "Reserve through Disney Cruise Line or compare prices with independent operators for big savings."],
    ['Reserve Palo / Remy', "If you haven't already, specialty restaurant reservations open now (75 days for most guests)."],
    ['Start Online Check-In', "DCL online check-in is available up to 75 days before sailing — earlier check-in means better port arrival times."],
    ['Download DCL Navigator App', "Available on iOS and Android — use it for dining, activities, and onboard chat."],
    ['Join a Fish Extender Group', "Search Facebook for your sailing's FE group to connect with fellow guests."],
  ]

  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">90 days until your Disney cruise! ⚓</h2>
    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">Hi ${name}! <strong>${shipName}</strong> (${sailDate}, Booking #${bookingRef}) is 90 days away. Here's your to-do list:</p>
    <div style="border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${items.map(([title, desc], i) => `<div style="padding:14px 16px;${i > 0 ? 'border-top:1px solid #E2E8F0;' : ''}background-color:${i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};"><p style="margin:0 0 4px;color:#1E3A5F;font-weight:600;font-size:14px;">✓ ${title}</p><p style="margin:0;color:#64748B;font-size:13px;">${desc}</p></div>`).join('')}
    </div>
    <p style="margin:0;color:#64748B;font-size:13px;">Reply with any questions!<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

export function REMINDER_60_DAYS(name: string, shipName: string, sailDate: string): string {
  const items: [string, string][] = [
    ['Start Your Packing List', '<a href="https://gatgridcruises.com/guides/disney-cruise-packing-list" style="color:#1E3A5F;">Our printable packing list</a> covers everything — don\'t forget Castaway Cay gear and formal night outfits.'],
    ['Join a Fish Extender Group', "Search Facebook for \"[Ship Name] [Sail Date] Fish Extender\" to connect with your sailing community."],
    ['Download DCL Navigator', "Get familiar with the app before you board — it works on ship Wi-Fi without a paid package."],
    ['Arrange Port Transportation', "Book your airport transfer, parking, or pre-cruise hotel if you haven't yet."],
    ['Check Passport Validity', "Make sure all passports are valid for at least 6 months beyond your return date."],
  ]

  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">60 days to go — it's getting real! 🌊</h2>
    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">Hi ${name}! <strong>${shipName}</strong> on ${sailDate} is just 60 days away. Time for serious prep:</p>
    <div style="border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${items.map(([title, desc], i) => `<div style="padding:14px 16px;${i > 0 ? 'border-top:1px solid #E2E8F0;' : ''}background-color:${i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};"><p style="margin:0 0 4px;color:#1E3A5F;font-weight:600;font-size:14px;">✓ ${title}</p><p style="margin:0;color:#64748B;font-size:13px;">${desc}</p></div>`).join('')}
    </div>
    <p style="margin:0;color:#64748B;font-size:13px;">Almost there!<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

export function REMINDER_30_DAYS(name: string, shipName: string, sailDate: string, departurePort: string): string {
  const items: [string, string][] = [
    ['Complete Online Check-In', "If you haven't done DCL online check-in yet, do it now. Choose your port arrival time — earlier slots fill fast."],
    ['Confirm Port Transportation', "Double-check your airport transfers, parking reservation, or pre-cruise hotel booking."],
    ['Check Port Weather', "Look up typical weather for your ports to finalize your packing."],
    ['Stock Up on Disney Gift Cards', "Buy at Target (5% off with RedCard) to use for onboard charges."],
    ['Pack Your Documents', "Passports, booking confirmation, vaccination records (if required), credit cards, and prescriptions."],
  ]

  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">One month to go! 🎉</h2>
    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">Hi ${name}! <strong>${shipName}</strong> departs from <strong>${departurePort}</strong> on <strong>${sailDate}</strong> — just 30 days away! Final checklist:</p>
    <div style="border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${items.map(([title, desc], i) => `<div style="padding:14px 16px;${i > 0 ? 'border-top:1px solid #E2E8F0;' : ''}background-color:${i % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};"><p style="margin:0 0 4px;color:#1E3A5F;font-weight:600;font-size:14px;">✓ ${title}</p><p style="margin:0;color:#64748B;font-size:13px;">${desc}</p></div>`).join('')}
    </div>
    <p style="margin:0;color:#64748B;font-size:13px;">So close! Reply if you need anything.<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

export function POST_CRUISE(name: string, shipName: string, returnDate: string): string {
  return wrapBookingEmail(`
    <h2 style="margin:0 0 8px;color:#1E3A5F;font-family:Georgia,serif;font-size:22px;">Welcome back, ${name}! 🏖️</h2>
    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">We hope your sailing on <strong>${shipName}</strong> was absolutely magical! You returned on ${returnDate} — hopefully with incredible memories.</p>
    <div style="background-color:#F0F7FF;border-left:4px solid #1E3A5F;border-radius:6px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0 8px;color:#1E3A5F;font-size:15px;">We'd love to hear from you!</h3>
      <p style="margin:0 0 12px;color:#334155;font-size:14px;">Your feedback helps us serve future guests better.</p>
      <a href="mailto:robobuckstar@gmail.com?subject=My%20Disney%20Cruise%20Review" style="display:inline-block;background-color:#1E3A5F;color:#D4AF37;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px;">Share Your Experience</a>
    </div>
    <h3 style="margin:0 0 10px;color:#1E3A5F;font-family:Georgia,serif;font-size:16px;">Already dreaming of your next one?</h3>
    <p style="margin:0 0 16px;color:#334155;font-size:14px;">Repeat guests who book before leaving the ship get the <strong>onboard booking discount</strong> (typically $100–$200 off plus up to 10% on select sailings). We can still find great deals if you're back home.</p>
    <p style="margin:0 0 24px;">
      <a href="https://gatgridcruises.com/book" style="display:inline-block;background-color:#D4AF37;color:#1E3A5F;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Plan My Next Cruise</a>
    </p>
    <p style="margin:0;color:#64748B;font-size:13px;">Thank you for choosing GatGrid Cruises!<br><strong style="color:#1E3A5F;">Grayson Starbuck</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

// ─── Original newsletter templates ──────────────────────────────────────────

export function confirmationEmailTemplate(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: -apple-system, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
  .container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: #1E3A5F; padding: 32px; text-align: center; }
  .header h1 { color: #D4AF37; margin: 0; font-family: Georgia, serif; }
  .body { padding: 32px; }
  .cta { display: inline-block; background: #D4AF37; color: #1E3A5F; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
  .footer { padding: 16px 32px; text-align: center; font-size: 12px; color: #94a3b8; }
</style></head>
<body>
  <div class="container">
    <div class="header"><h1>⚓ GatGridCruises</h1></div>
    <div class="body">
      <h2 style="color: #1E3A5F;">Welcome aboard!</h2>
      <p>You signed up for the GatGridCruises weekly deal digest with <strong>${email}</strong>.</p>
      <p>Every Sunday, you'll get the best Disney cruise deals, biggest price drops, and planning tips — no spam, no sales pitches.</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="https://gatgridcruises.com/confirm?email=${encodeURIComponent(email)}" class="cta">Confirm My Subscription</a>
      </p>
      <p style="color: #64748B; font-size: 14px;">If you didn't sign up, just ignore this email.</p>
    </div>
    <div class="footer">GatGridCruises · Not affiliated with Disney</div>
  </div>
</body>
</html>`
}
