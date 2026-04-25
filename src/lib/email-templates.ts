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
      <p style="color:#D4AF37;font-size:12px;margin:6px 0 0;">AI-curated by Dr. Grayson Starbuck, DPT</p>
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
      <p>Sent by Dr. Grayson Starbuck, DPT · <a href="mailto:deals@gatgridcruises.com">deals@gatgridcruises.com</a></p>
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
      Dr. Grayson Starbuck, DPT · AI-Curated Disney Cruise Deals
    </p>
  </div>
`

const BRAND_FOOTER_HTML = `
  <div style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;padding:24px 32px;text-align:center;margin-top:32px;">
    <p style="margin:0 0 6px;color:#64748B;font-family:Arial,sans-serif;font-size:12px;">
      Dr. Grayson Starbuck, DPT · GatGrid Cruises · Booking services provided through Boardwalk Travel Agency
    </p>
    <p style="margin:0 0 4px;color:#94A3B8;font-family:Arial,sans-serif;font-size:11px;">
      Reply directly to reach Grayson when you're ready to book.
    </p>
    <p style="margin:0;color:#94A3B8;font-family:Arial,sans-serif;font-size:11px;">
      Questions? <a href="mailto:bookings@gatgridcruises.com" style="color:#1E3A5F;">bookings@gatgridcruises.com</a> · <a href="https://gatgridcruises.com" style="color:#1E3A5F;">gatgridcruises.com</a>
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

      I'm Dr. Grayson Starbuck, DPT — founder of GatGrid Cruises and a Disney cruise fanatic who has taken his family on more sailings than I care to admit. There's truly nothing like it, and I'd love to help your family experience that same magic.
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

    <p style="margin:0;color:#64748B;font-size:13px;">Talk soon,<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises · Boardwalk Travel Agency</p>
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
      <p style="margin:6px 0 0;color:#78350F;font-size:13px;">Earn points toward future upgrades. The <a href="https://gatgridcruises.com/concierge" style="color:#92400E;">Amex Business Platinum</a> and <a href="https://gatgridcruises.com/concierge" style="color:#92400E;">Chase Ink Business Preferred</a> both earn excellent travel rewards.</p>
    </div>

    <p style="margin:0;color:#64748B;font-size:13px;">Ready to move forward? Just reply.<br><br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br><span style="color:#64748B;">Grayson at GatGrid Cruises</span></p>
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
      <p style="margin:6px 0 0;color:#78350F;font-size:13px;">Consider paying your final balance with the <a href="https://gatgridcruises.com/concierge" style="color:#92400E;">Amex Business Platinum</a> (5× on flights, up to $200 airline fee credit) or <a href="https://gatgridcruises.com/concierge" style="color:#92400E;">Chase Ink Business Preferred</a> (3× on travel, no foreign transaction fees).</p>
    </div>

    <p style="margin:0;color:#64748B;font-size:13px;">Safe travels!<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises</p>
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

    <p style="margin:0;color:#64748B;font-size:13px;">Reply with any questions!<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises</p>
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

    <p style="margin:0;color:#64748B;font-size:13px;">Almost there!<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises</p>
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

    <p style="margin:0;color:#64748B;font-size:13px;">So close! Reply if you need anything.<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises</p>
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

    <p style="margin:0;color:#64748B;font-size:13px;">Thank you for choosing GatGrid Cruises!<br><strong style="color:#1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>Grayson at GatGrid Cruises</p>
  `)
}

// ─── Drip sequence templates ─────────────────────────────────────────────────

const DRIP_STYLES = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #F1F5F9; color: #1E293B; }
  .wrap { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
  .hdr { background: #1E3A5F; padding: 28px 32px; text-align: center; }
  .hdr h1 { color: #D4AF37; font-family: Georgia, serif; font-size: 22px; margin: 0 0 6px; }
  .hdr p { color: #93C5FD; font-size: 13px; margin: 0; }
  .body { padding: 32px; }
  .body h2 { color: #1E3A5F; font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px; }
  .body p { color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
  .cta { display: inline-block; background: #D4AF37; color: #1E3A5F; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 8px 0; }
  .cta-navy { display: inline-block; background: #1E3A5F; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 8px 0; }
  .deal-card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
  .deal-name { font-weight: 700; color: #1E3A5F; font-size: 15px; margin: 0 0 6px; }
  .deal-meta { color: #64748B; font-size: 13px; margin: 0 0 8px; }
  .deal-price { font-size: 22px; font-weight: 700; color: #1E3A5F; }
  .drop-badge { display: inline-block; background: #ECFDF5; color: #059669; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 8px; }
  .card-box { background: #F0F7FF; border-left: 4px solid #1E3A5F; border-radius: 6px; padding: 16px; margin: 16px 0; }
  .card-box h3 { color: #1E3A5F; font-size: 15px; margin: 0 0 8px; }
  .card-box p { font-size: 14px; margin: 0 0 8px; }
  .gold-box { background: #FEF9EC; border: 1px solid #D4AF37; border-radius: 8px; padding: 16px; margin: 20px 0; }
  .gold-box p { color: #92400E; font-size: 14px; margin: 0; }
  .checklist { margin: 0 0 20px; padding-left: 20px; }
  .checklist li { color: #334155; font-size: 14px; line-height: 1.7; margin-bottom: 6px; }
  .sig { color: #64748B; font-size: 13px; }
  .footer { background: #1E3A5F; padding: 20px 32px; text-align: center; }
  .footer p { color: #94A3B8; font-size: 12px; margin: 4px 0; }
  .footer a { color: #D4AF37; text-decoration: none; }
`

function dripWrap(subject: string, body: string, unsubToken: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${subject}</title>
  <style>${DRIP_STYLES}</style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>⚓ GatGrid Cruises</h1>
      <p>Dr. Grayson Starbuck, DPT · AI-Curated Disney Cruise Deals</p>
    </div>
    <div class="body">${body}</div>
    <div class="footer">
      <p>Sent by Dr. Grayson Starbuck, DPT · <a href="mailto:bookings@gatgridcruises.com">bookings@gatgridcruises.com</a></p>
      <p>You're receiving this because you subscribed at GatGridCruises.com</p>
      <p><a href="https://gatgridcruises.com/unsubscribe?token=${unsubToken}">Unsubscribe</a> · <a href="https://gatgridcruises.com/privacy">Privacy Policy</a></p>
      <p style="margin-top: 10px;">Independently owned. Not affiliated with The Walt Disney Company.</p>
    </div>
  </div>
</body>
</html>`
}

export interface TopDeal {
  name: string
  ship: string
  sailDate: string
  nights: number
  price: number
  percentBelow: number
}

export function welcomeEmail1(name: string, unsubToken: string, topDeals: TopDeal[]): string {
  const dealCards = topDeals.slice(0, 3).map(d => `
    <div class="deal-card">
      <div class="deal-name">${d.name}</div>
      <div class="deal-meta">${d.ship} · ${d.sailDate} · ${d.nights} nights</div>
      <div>
        <span class="deal-price">$${d.price.toLocaleString()}/person</span>
        ${d.percentBelow > 0 ? `<span class="drop-badge">↓ ${d.percentBelow}% below avg</span>` : ''}
      </div>
    </div>
  `).join('')

  return dripWrap('Welcome to GatGrid Cruises!', `
    <h2>Welcome aboard, ${name || 'friend'}! 🎉</h2>
    <p>I'm Dr. Grayson Starbuck, DPT — and I'm genuinely excited you're here. I built GatGrid Cruises because I got tired of watching Disney cruise prices fluctuate wildly and not knowing when to pull the trigger. So I built an AI system that watches them for me (and now for you).</p>

    <p><strong>Here's how GatGrid works in 3 steps:</strong></p>
    <ol class="checklist">
      <li><strong>We watch the prices</strong> — Our AI scans hundreds of Disney cruise sailings every day</li>
      <li><strong>You get alerted</strong> — When a price drops significantly below the historical average, we let you know</li>
      <li><strong>You book smarter</strong> — Reply to any email and I'll personally help you lock in the deal</li>
    </ol>

    <p>Right now, here are a few sailings worth watching:</p>
    ${dealCards || '<div class="deal-card"><div class="deal-name">Live deals loading — check back soon</div></div>'}

    <div style="text-align: center; margin: 24px 0;">
      <a href="https://gatgridcruises.com/deals" class="cta">See All Current Deals →</a>
    </div>

    <div class="card-box">
      <h3>🧮 Not sure what a Disney cruise really costs?</h3>
      <p>Our free Cost Calculator adds up the cruise fare, excursions, gratuities, drinks, and everything else so you know the real number before you book.</p>
      <a href="https://gatgridcruises.com/tools/cost-calculator" style="color: #1E3A5F; font-weight: 600; font-size: 14px;">Try the Cost Calculator →</a>
    </div>

    <p>Every Sunday I send a weekly deal digest with the biggest price drops of the week. But if a really good deal surfaces mid-week, I'll send a quick note so you don't miss it.</p>

    <p>Questions? Just reply — I personally read every email.</p>

    <p class="sig">Talk soon,<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises</p>
  `, unsubToken)
}

export function welcomeEmail2(name: string, unsubToken: string): string {
  return dripWrap('How We Find the Best Disney Cruise Deals', `
    <h2>How we find deals most people miss 🔍</h2>
    <p>Hi ${name || 'there'} — a quick peek behind the curtain today.</p>

    <p>Disney Cruise Line prices change constantly — sometimes multiple times a day. They vary by stateroom category, sailing date, number of guests, and even what device you're on. Tracking this manually is basically impossible.</p>

    <p>So here's what we built:</p>

    <div class="card-box">
      <h3>The GatGrid AI Scanning System</h3>
      <p><strong>1. Daily price collection</strong> — We pull prices for every tracked sailing every morning</p>
      <p><strong>2. Historical comparison</strong> — Every price is compared against a 90-day rolling average</p>
      <p><strong>3. Deal Scoring</strong> — We assign a 0–100 "Sailing Score" that factors in price drops, itinerary quality, timing, and ship popularity</p>
      <p><strong>4. You get the best ones</strong> — We surface only the sailings that actually score well — not just the cheapest, but the best value</p>
    </div>

    <p>The result: you see deals that are <em>genuinely</em> below market, not just below an inflated "original price."</p>

    <p>We also flag <strong>Last-Minute Steals</strong> — sailings departing within 90 days that DCL has discounted to fill cabins. These are often the biggest percentage drops.</p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="https://gatgridcruises.com/deals?sort=score" class="cta">See Top-Scored Deals →</a>
    </div>

    <p>Tomorrow — well, not tomorrow, but in a few days — I'll share the credit card strategy that can save you hundreds (sometimes over $1,000) on a Disney cruise without changing which sailing you book.</p>

    <p class="sig">Until then,<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises</p>
  `, unsubToken)
}

export function welcomeEmail3(name: string, unsubToken: string): string {
  return dripWrap('The Credit Cards That Save You Hundreds on a Disney Cruise', `
    <h2>Save $500–$1,500 on your cruise — without changing a thing 💳</h2>
    <p>Hi ${name || 'there'} — today I want to talk money. Specifically, how to pay for a Disney cruise in a way that puts hundreds of dollars back in your pocket.</p>

    <p>Disney Cruise Line doesn't offer a loyalty points program. But credit card rewards more than make up for it — if you use the right card.</p>

    <p>Here are the three I personally recommend to guests:</p>

    <div class="card-box">
      <h3>1. Chase Ink Business Preferred — Best for travel rewards</h3>
      <p>Earn 3x points on travel purchases (including cruises). The 100K point sign-up bonus is worth ~$1,250 in travel. No foreign transaction fees — useful for Caribbean ports.</p>
      <a href="/concierge" class="cta-navy" style="font-size: 13px; padding: 10px 20px;">Learn More →</a>
    </div>

    <div class="card-box">
      <h3>2. Capital One Venture X — Best for simplicity</h3>
      <p>Earn 2x miles on everything. The $300 annual travel credit and 10,000 bonus miles each anniversary effectively make the card free. Miles transfer to 15+ airline partners.</p>
      <a href="/concierge" class="cta-navy" style="font-size: 13px; padding: 10px 20px;">Learn More →</a>
    </div>

    <div class="card-box">
      <h3>3. Amex Business Platinum — Best for big spenders</h3>
      <p>150K+ point sign-up bonus (worth $1,500+ in travel). Up to $200 in airline fee credits annually. If you're booking a high-end stateroom, the math is hard to beat.</p>
      <a href="/concierge" class="cta-navy" style="font-size: 13px; padding: 10px 20px;">Learn More →</a>
    </div>

    <div class="gold-box">
      <p><strong>💡 Pro tip:</strong> Get approved for the card before you book, then put your deposit on it. You'll meet the minimum spend requirement naturally, and your sign-up bonus posts before your final payment date.</p>
    </div>

    <p>Ready to book? Just reply to this email with your preferred dates and I'll pull up the best options.</p>

    <p class="sig">To smarter travel,<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises</p>
  `, unsubToken)
}

export interface PriceDropAlert {
  subscriberName: string
  sailingName: string
  ship: string
  sailDate: string
  nights: number
  departurePort: string
  oldPrice: number
  newPrice: number
  savings: number
  percentDrop: number
  dealUrl: string
}

export function dealAlertEmail(alert: PriceDropAlert, unsubToken: string): string {
  return dripWrap(`Price Drop Alert: ${alert.sailingName}`, `
    <h2>Price drop on a sailing you might love 📉</h2>
    <p>Hi ${alert.subscriberName || 'there'} — I just caught a significant price drop and wanted to make sure you saw it.</p>

    <div class="deal-card" style="border-color: #D4AF37; background: #FFFBF0;">
      <div class="deal-name" style="font-size: 17px;">${alert.sailingName}</div>
      <div class="deal-meta">${alert.ship} · Departs ${alert.sailDate} · ${alert.nights} nights · from ${alert.departurePort}</div>
      <div style="margin-top: 12px; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;">
        <div>
          <div style="font-size: 12px; color: #94A3B8; text-decoration: line-through;">Was $${alert.oldPrice.toLocaleString()}/person</div>
          <div class="deal-price" style="font-size: 28px;">$${alert.newPrice.toLocaleString()}<span style="font-size: 14px; font-weight: 400; color: #64748B;">/person</span></div>
        </div>
        <div>
          <span class="drop-badge" style="font-size: 14px; padding: 4px 12px;">↓ ${alert.percentDrop}% drop · Save $${alert.savings.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${alert.dealUrl}" class="cta" style="font-size: 16px; padding: 16px 32px;">View This Deal →</a>
    </div>

    <p>Disney cruise prices can bounce back quickly — especially when a sailing fills up. If this itinerary looks right for your family, it's worth taking a closer look now.</p>

    <p><strong>Want to book?</strong> Just reply to this email. I'll walk you through the options, make sure the stateroom category works for your group, and handle the booking through Boardwalk Travel Agency at no extra cost to you.</p>

    <div class="gold-box">
      <p><strong>💳 Tip:</strong> Pay your deposit with a travel rewards card and you could earn enough points to offset a future trip. I recommend the <a href="https://gatgridcruises.com/concierge" style="color: #92400E;">Chase Ink Business Preferred</a> or <a href="https://gatgridcruises.com/concierge" style="color: #92400E;">Amex Business Platinum</a>.</p>
    </div>

    <p class="sig">Talk soon,<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises · bookings@gatgridcruises.com</p>
  `, unsubToken)
}

export function preCruise60Days(name: string, shipName: string, sailDate: string, unsubToken: string): string {
  return dripWrap('60 Days to Your Disney Cruise — Packing Time!', `
    <h2>60 days out — time to start packing smart 🧳</h2>
    <p>Hi ${name} — <strong>${shipName}</strong> on ${sailDate} is 60 days away. That's officially "start thinking about packing" territory.</p>

    <p>Here are the items my guests consistently wish they'd packed (with Amazon links so you can grab them now):</p>

    <div class="card-box">
      <h3>Must-Have Cruise Gear</h3>
      <ul class="checklist">
        <li><a href="/concierge" style="color: #1E3A5F;">Magnetic hooks</a> — Disney ships have magnetic cabin walls. Hang lanyards, towels, and accessories without damaging anything.</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Over-door shoe organizer</a> — Transforms tiny cabin storage. Perfect for sunscreen, snacks, and toiletries.</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Surge protector/power strip</a> — Cabins have 2–3 outlets for 4 people. Bring a strip (no extension cords).</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Insulated water bottle</a> — Free water is always available. Save money, stay hydrated in port.</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Reef-safe sunscreen</a> — Required at Castaway Cay. Bring enough from home to save significant money vs. onboard prices.</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Waterproof phone pouch</a> — For Castaway Cay beach days and excursion water activities.</li>
        <li><a href="/concierge" style="color: #1E3A5F;">Packing cubes</a> — Keep the cabin tidy and find outfits quickly without digging through luggage.</li>
      </ul>
    </div>

    <p><strong>For Castaway Cay days:</strong></p>
    <ul class="checklist">
      <li><a href="/concierge" style="color: #1E3A5F;">UPF 50 rash guards for kids</a> — Much better than reapplying sunscreen all day</li>
      <li><a href="/concierge" style="color: #1E3A5F;">Water shoes</a> — The Castaway Cay beach has some rocky spots near the water's edge</li>
      <li><a href="/concierge" style="color: #1E3A5F;">Snorkel set</a> — Rentals are available but bringing your own saves $20+ per person</li>
    </ul>

    <div style="text-align: center; margin: 24px 0;">
      <a href="https://gatgridcruises.com/guides/packing" class="cta">Full Packing List →</a>
    </div>

    <p>Also: if you haven't booked Palo or Remy reservations yet, do it now. At 75 days out they go fast.</p>

    <p class="sig">60 days and counting!<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises</p>
  `, unsubToken)
}

export function preCruise30Days(name: string, shipName: string, sailDate: string, departurePort: string, unsubToken: string): string {
  return dripWrap('30 Days to Your Disney Cruise — Port Excursion Tips', `
    <h2>One month out — let's talk port days 🗺️</h2>
    <p>Hi ${name} — just 30 days until <strong>${shipName}</strong> leaves ${departurePort}! Today I want to share my port excursion strategy.</p>

    <p>Port days are where you can save (or overspend) the most money. Here's how to do them right:</p>

    <div class="card-box">
      <h3>DCL Excursions vs. Independent Operators</h3>
      <p>Disney's shore excursions are convenient and guaranteed (if you're late, the ship waits). But they cost 30–50% more than equivalent independent tours.</p>
      <p><strong>My recommendation:</strong> Book DCL for anything adventurous (zip-lining, snorkeling, water parks) where the safety guarantee matters. For walking tours, food experiences, and beach days — go independent and pocket the savings.</p>
    </div>

    <p><strong>By common port:</strong></p>
    <ul class="checklist">
      <li><strong>Nassau</strong> — Atlantis Beach Club is worth the independent booking. Skip the overpriced DCL version.</li>
      <li><strong>Cozumel</strong> — Rent a golf cart and explore independently. Mr. Sanchos beach club is a local favorite.</li>
      <li><strong>St. Thomas</strong> — Magens Bay beach is stunning and $5 entry. Much better value than a DCL beach excursion.</li>
      <li><strong>Castaway Cay</strong> — This is DCL's private island. Rent bikes, hit the adult beach, snorkel — all included or cheap rentals onboard.</li>
    </ul>

    <div class="card-box">
      <h3>Booking Tips</h3>
      <ul class="checklist">
        <li>Book popular excursions through DCL's website before boarding — they sell out</li>
        <li>For independent tours, check Viator and GetYourGuide for reviews and pricing</li>
        <li>Always research exact ship dock locations — some ports tender (smaller boat to shore) and that affects timing</li>
        <li>Have a backup plan — ships can skip ports due to weather</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="https://gatgridcruises.com/tools/ports" class="cta">Port Excursion Guides →</a>
    </div>

    <p>Reply if you have specific ports on your itinerary and I can give you personalized tips!</p>

    <p class="sig">Almost there!<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises</p>
  `, unsubToken)
}

export function preCruise7Days(name: string, shipName: string, sailDate: string, departurePort: string, unsubToken: string): string {
  return dripWrap('7 Days Until Your Disney Cruise — Embarkation Day Checklist', `
    <h2>One week away — embarkation day is coming! 🚢</h2>
    <p>Hi ${name} — seven days! <strong>${shipName}</strong> departs ${departurePort} on ${sailDate}. Here's everything to do this week so embarkation day is magical, not stressful.</p>

    <div class="card-box">
      <h3>This Week (Before You Leave Home)</h3>
      <ul class="checklist">
        <li>✓ Complete DCL online check-in if you haven't (gatgridcruises.com reminder: do this!)</li>
        <li>✓ Print or save your Port Arrival Time — this determines your boarding group</li>
        <li>✓ Download the Disney Cruise Line Navigator app</li>
        <li>✓ Set up your onboard account credit card (you can do this at check-in, but it's faster online)</li>
        <li>✓ Pack all documents: passports, booking confirmation, credit cards, any prescriptions</li>
        <li>✓ Buy Disney Gift Cards at Target (5% off with Red Card) for onboard spending</li>
        <li>✓ Pack a carry-on with embarkation day essentials — luggage goes to your room by 3pm</li>
      </ul>
    </div>

    <div class="card-box">
      <h3>Embarkation Day Carry-On Essentials</h3>
      <ul class="checklist">
        <li>Swimsuits and towels (pool opens immediately — dive in!)</li>
        <li>Sunscreen</li>
        <li>Phone chargers and any electronics</li>
        <li>Snacks for kids</li>
        <li>Any medications you'll need Day 1</li>
        <li>This is the day you can book specialty dining if anything remains open</li>
      </ul>
    </div>

    <div class="gold-box">
      <p><strong>🎉 Embarkation Day tip:</strong> Head straight to the pool or Cabanas buffet when you board — most guests go to their rooms first. You'll beat the crowds and start your vacation immediately.</p>
    </div>

    <p>I hope your sailing is absolutely magical. If you have any last-minute questions before you go — just reply. I'm here.</p>

    <p class="sig">Bon voyage!<br><strong style="color: #1E3A5F;">Dr. Grayson Starbuck, DPT</strong><br>GatGrid Cruises · bookings@gatgridcruises.com</p>
  `, unsubToken)
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
      <p>I'm Dr. Grayson Starbuck, DPT — I use AI tools to monitor hundreds of Disney cruise prices and surface the deals actually worth booking. Every Sunday you'll get the biggest price drops, honest deal scores, and planning tips. No spam, no sales pressure.</p>
      <p>When you're serious about booking, just reply to any email and I'll personally help you through it.</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="https://gatgridcruises.com/confirm?email=${encodeURIComponent(email)}" class="cta">Confirm My Subscription</a>
      </p>
      <p style="color: #64748B; font-size: 14px;">If you didn't sign up, just ignore this email.</p>
    </div>
    <div class="footer">Dr. Grayson Starbuck, DPT · GatGridCruises · Not affiliated with Disney</div>
  </div>
</body>
</html>`
}
