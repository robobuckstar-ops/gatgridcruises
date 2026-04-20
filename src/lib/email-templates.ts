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
