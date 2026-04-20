import { NextResponse } from 'next/server'

// This endpoint would be called by a cron job to check for price drops
// and send email/SMS alerts to users who are watching affected sailings.
// For MVP, it's a stub that returns the alert check structure.

export async function GET() {
  // TODO: When Supabase is connected:
  // 1. Get all watchlist entries with current prices
  // 2. Compare to sailing current_lowest_price
  // 3. If price dropped > 2%, send alert via Resend
  // 4. Update the watchlist entry's last_alerted_price

  return NextResponse.json({
    message: 'Price alert check ready (activate when Supabase connected)',
    alerts_sent: 0,
    sailings_checked: 0,
  })
}
