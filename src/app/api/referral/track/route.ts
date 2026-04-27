import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

// In-memory store for click counts — replace with Supabase for persistence
const clickStore = new Map<string, number>()

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const { allowed } = checkRateLimit(ip, 'referral-track', 60, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string' || !/^[A-Z0-9]{6,10}$/.test(code)) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
    }

    const current = clickStore.get(code) ?? 0
    clickStore.set(code, current + 1)

    return NextResponse.json({ ok: true, clicks: current + 1 })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  return NextResponse.json({ code, clicks: clickStore.get(code) ?? 0 })
}
