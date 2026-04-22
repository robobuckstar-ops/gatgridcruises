import { NextRequest, NextResponse } from 'next/server'

// For MVP without Supabase, store in memory (lost on restart)
// When Supabase is connected, this will write to the subscribers table
const subscribers: { email: string; preferences: any; confirmed: boolean; created_at: string }[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, preferences } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Check duplicate
    if (subscribers.some(s => s.email === email)) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }

    subscribers.push({
      email,
      preferences: preferences || {},
      confirmed: false,
      created_at: new Date().toISOString(),
    })

    // TODO: When Resend is configured, send confirmation email
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Grayson at GatGrid Cruises <bookings@gatgridcruises.com>',
    //   to: email,
    //   subject: 'Confirm your subscription to GatGridCruises',
    //   html: `<h1>Welcome to GatGridCruises!</h1><p>Click below to confirm...</p>`
    // })

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Admin endpoint — in production, protect with auth
  return NextResponse.json({ count: subscribers.length, subscribers })
}
