/**
 * Boardwalk Travel Agency Compliance Email Draft
 *
 * This email is to be sent from Grayson Starbuck to Boardwalk Travel Agency
 * confirming that GatGridCruises.com operates as an independent media/content
 * website and is NOT a travel agency or booking platform.
 *
 * Usage: Import and send via Resend, or copy the HTML into your email client.
 */

export function boardwalkComplianceEmailHTML(): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Georgia', serif; color: #1a1a1a; line-height: 1.7; max-width: 680px; margin: 0 auto; padding: 40px 20px; }
    .header { border-bottom: 2px solid #1E3A5F; padding-bottom: 16px; margin-bottom: 32px; }
    .logo { font-size: 20px; font-weight: bold; color: #1E3A5F; }
    .logo span { color: #D4AF37; }
    .date { color: #64748B; font-size: 14px; margin-top: 4px; }
    h1 { font-size: 18px; color: #1E3A5F; margin-top: 32px; }
    p { margin: 12px 0; font-size: 15px; }
    ul { margin: 12px 0; padding-left: 24px; }
    li { margin: 8px 0; font-size: 15px; }
    .highlight { background: #FBF6E7; border-left: 4px solid #D4AF37; padding: 16px 20px; margin: 24px 0; }
    .signature { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .signature .name { font-weight: bold; color: #1E3A5F; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">⚓ <span>GatGridCruises</span></div>
    <div class="date">${today}</div>
  </div>

  <p>Dear Boardwalk Travel Agency Compliance Team,</p>

  <p>I'm writing to formally notify you about <strong>GatGridCruises.com</strong>, an independent website I operate that provides Disney Cruise Line content, tools, and deal tracking for consumers. I want to ensure full transparency and confirm compliance with all relevant guidelines.</p>

  <h1>Website Purpose &amp; Classification</h1>

  <p>GatGridCruises.com is an <strong>ad-supported media and content property</strong>. It is explicitly <strong>not</strong> a travel agency, booking platform, or authorized Disney Cruise Line seller. The website:</p>

  <ul>
    <li><strong>Does not sell cruises</strong> — we do not accept bookings, process payments, or issue travel documents of any kind.</li>
    <li><strong>Does not represent itself as a travel agency</strong> — all pages include a disclosure stating we are an independent informational resource, not affiliated with Disney Cruise Line or any travel agency.</li>
    <li><strong>Does not use Boardwalk Travel Agency branding</strong> — there is no mention of, or implied association with, Boardwalk Travel Agency on the site.</li>
    <li><strong>Links to Disney directly</strong> — when users are ready to book, they are directed to DisneyCruise.disney.go.com or advised to contact a licensed travel agent.</li>
  </ul>

  <h1>What the Website Does</h1>

  <p>GatGridCruises.com provides free consumer-facing content including:</p>

  <ul>
    <li><strong>Price tracking</strong> — monitoring publicly available Disney Cruise Line pricing and highlighting price drops.</li>
    <li><strong>Planning tools</strong> — a total trip cost calculator, stateroom finder with noise ratings, flight search for departure ports, and pre-cruise hotel guides.</li>
    <li><strong>Editorial content</strong> — long-form guides on topics like packing lists, first-timer tips, dining guides, port comparisons, and family planning advice.</li>
    <li><strong>Email newsletter</strong> — a weekly opt-in digest of price drops and travel tips.</li>
  </ul>

  <div class="highlight">
    <strong>Revenue model:</strong> The site is monetized through display advertising (Google AdSense) and affiliate links to non-cruise travel services (hotels via Booking.com, flights via Skyscanner). We do not earn commissions on Disney Cruise Line bookings.
  </div>

  <h1>Compliance Commitments</h1>

  <p>To ensure there is no conflict of interest or compliance concern:</p>

  <ul>
    <li>The site includes a <strong>Disclosures page</strong> (/disclosures) clearly stating our independent status, affiliate relationships, and the fact that we are not a booking agent.</li>
    <li>We do not use any proprietary Boardwalk Travel Agency data, client lists, marketing materials, or internal pricing information.</li>
    <li>All pricing data displayed on the site is sourced from publicly available Disney Cruise Line web pages.</li>
    <li>The site does not solicit or redirect potential Boardwalk clients.</li>
    <li>I will promptly address any compliance concerns you raise about the site's content or positioning.</li>
  </ul>

  <h1>Request for Confirmation</h1>

  <p>I"d appreciate written confirmation that operating GatGridCruises.com as described above is approved and does not conflict with my relationship with Boardwalk Travel Agency. If there are any additional disclosures, disclaimers, or modifications you'd like to see on the site, I'm happy to implement them promptly.</p>
"
  <p>The site is live at <strong>https://gatgridcruises.com</strong> and I encourage you to review it at your convenience. I'm available to discuss any questions or concerns.</p>

  <p>Thank you for your time and consideration.</p>

  <div class="signature">
    <p class="name">Grayson Starbuck</p>
    <p>Operator, GatGridCruises.com<br>
    Email: robobuckstar@gmail.com</p>
  </div>

  <div class="footer">
    This email is for compliance purposes. GatGridCruises.com is an independent informational website and is not affiliated with, endorsed by, or sponsored by The Walt Disney Company or Disney Cruise Line.
  </div>
</body>
</html>`
}

export function boardwalkComplianceEmailPlainText(): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
GatGridCruises
${today}

Dear Boardwalk Travel Agency Compliance Team,

I'm writing to formally notify you about GatGridCruises.com, an independent website I operate that provides Disney Cruise Line content, tools, and deal tracking for consumers. I want to ensure full transparency and confirm compliance with all relevant guidelines.

WEBSITE PURPOSE & CLASSIFICATION

GatGridCruises.com is an ad-supported media and content property. It is explicitly NOT a travel agency, booking platform, or authorized Disney Cruise Line seller. The website:

- Does not sell cruises — we do not accept bookings, process payments, or issue travel documents of any kind.
- Does not represent itself as a travel agency — all pages include a disclosure stating we are an independent informational resource, not affiliated with Disney Cruise Line or any travel agency.
- Does not use Boardwalk Travel Agency branding — there is no mention of, or implied association with, Boardwalk Travel Agency on the site.
- Links to Disney directly — when users are ready to book, they are directed to DisneyCruise.disney.go.com or advised to contact a licensed travel agent.

WHAT THE WEBSITE DOES

GatGridCruises.com provides free consumer-facing content including:

- Price tracking — monitoring publicly available Disney Cruise Line pricing and highlighting price drops.
- Planning tools — a total trip cost calculator, stateroom finder with noise ratings, flight search for departure ports, and pre-cruise hotel guides.
- Editorial content — long-form guides on topics like packing lists, first-timer tips, dining guides, port comparisons, and family planning advice.
- Email newsletter — a weekly opt-in digest of price drops and travel tips.

Revenue model: The site is monetized through display advertising (Google AdSense) and affiliate links to non-cruise travel services (hotels via Booking.com, flights via Skyscanner). We do not earn commissions on Disney Cruise Line bookings.

COMPLIANCE COMMITMENTS

- The site includes a Disclosures page (/disclosures) clearly stating our independent status, affiliate relationships, and the fact that we are not a booking agent.
- We do not use any proprietary Boardwalk Travel Agency data, client lists, marketing materials, or internal pricing information.
- All pricing data displayed on the site is sourced from publicly available Disney Cruise Line web pages.
- The site does not solicit or redirect potential Boardwalk clients.
- I will promptly address any compliance concerns you raise about the site's content or positioning.

REQUEST FOR CONFIRMATION

I"d appreciate written confirmation that operating GatGridCruises.com as described above is approved and does not conflict with my relationship with Boardwalk Travel Agency. If there are any additional disclosures, disclaimers, or modifications you'd like to see on the site, I'm happy to implement them promptly.
"
The site is live at https://gatgridcruises.com and I encourage you to review it at your convenience. I'm available to discuss any questions or concerns.

Thank you for your time and consideration.

Grayson Starbuck
Operator, GatGridCruises.com
Email: robobuckstar@gmail.com

---
This email is for compliance purposes. GatGridCruises.com is an independent informational website and is not affiliated with, endorsed by, or sponsored by The Walt Disney Company or Disney Cruise Line.
`.trim()
}
