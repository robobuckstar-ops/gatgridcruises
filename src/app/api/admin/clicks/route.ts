import { NextResponse } from 'next/server'

// This would come from the database in production
// For MVP, we just return a stub
export async function GET() {
  return NextResponse.json({
    message: 'Affiliate click tracking will be available once Supabase is connected.',
    total_clicks: 0,
    by_provider: {},
  })
}
