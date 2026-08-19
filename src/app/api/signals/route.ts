// TradingView alert capture — DATA ONLY.
//
// This endpoint does not place trades and talks to no broker. It writes each
// inbound alert payload to Airtable so the signals can be reviewed later for
// viability. TradingView treats a non-200 as a failed delivery, so every path
// below that isn't an auth/rate-limit rejection returns 200 — a dropped
// Airtable write is reported as {stored:false} rather than an error status.

import { NextRequest, NextResponse } from 'next/server'
import { createRecord } from '@/lib/airtable-client'
import { getClientIp, checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Table lives in base applSFcQkOus2fFsx (tblqdxVSyam5cmUcR). */
const SIGNALS_TABLE = 'TradingSignals'

/** Generous — a busy strategy can fire several alerts a minute. */
const RATE_LIMIT = 120
const RATE_WINDOW_MS = 5 * 60 * 1000

/** Airtable long-text fields hold far more, but a runaway payload helps nobody. */
const MAX_RAW_CHARS = 5000
const MAX_SUMMARY_CHARS = 80

interface ParsedSignal {
  symbol: string
  action: string
  quantity: number | null
  price: string
}

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
    if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  }
  return ''
}

function firstNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value.trim())
      if (Number.isFinite(parsed)) return parsed
    }
  }
  return null
}

/**
 * Best-effort field extraction. TradingView alert bodies are author-defined, so
 * we probe the common key spellings and accept blanks when none match.
 */
function parseSignal(payload: Record<string, unknown>): ParsedSignal {
  const order = (payload.order ?? {}) as Record<string, unknown>

  return {
    symbol: firstString(payload.symbol, payload.ticker, order.symbol, order.ticker),
    action: firstString(payload.action, payload.side, order.action, order.side),
    quantity: firstNumber(
      payload.quantity,
      payload.qty,
      payload.contracts,
      order.quantity,
      order.qty,
      order.contracts,
    ),
    price: firstString(payload.price, payload.close, order.price, order.close),
  }
}

function buildSummary(parsed: ParsedSignal | null, raw: string): string {
  if (parsed) {
    const parts = [
      parsed.action.toUpperCase(),
      parsed.symbol.toUpperCase(),
      parsed.quantity !== null ? `x${parsed.quantity}` : '',
    ].filter(Boolean)
    if (parts.length) return parts.join(' ').slice(0, MAX_SUMMARY_CHARS)
  }
  const oneLine = raw.replace(/\s+/g, ' ').trim()
  return oneLine.slice(0, MAX_SUMMARY_CHARS) || '(empty body)'
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed, retryAfter } = checkRateLimit(ip, 'signals', RATE_LIMIT, RATE_WINDOW_MS)
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: 'Rate limited' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  // Shared-secret gate. Without it the table fills with whatever the internet
  // POSTs at a publicly-guessable path.
  const expectedKey = process.env.SIGNALS_CAPTURE_KEY?.trim()
  if (!expectedKey || request.nextUrl.searchParams.get('key') !== expectedKey) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  let raw = ''
  try {
    raw = await request.text()
  } catch (err) {
    console.error('[signals] could not read request body:', err)
  }

  // TradingView sends either a JSON alert body or the plain-text message box.
  let parsed: ParsedSignal | null = null
  try {
    const payload: unknown = JSON.parse(raw)
    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      parsed = parseSignal(payload as Record<string, unknown>)
    }
  } catch {
    // Plain text — keep the raw body and leave the parsed columns blank.
  }

  const apiKey = process.env.AIRTABLE_API_KEY?.trim()
  if (!apiKey) {
    console.error('[signals] AIRTABLE_API_KEY is not set — signal not stored')
    return NextResponse.json({ ok: true, stored: false })
  }

  try {
    await createRecord(
      SIGNALS_TABLE,
      {
        Summary: buildSummary(parsed, raw),
        ReceivedAt: new Date().toISOString(),
        RawBody: raw.slice(0, MAX_RAW_CHARS),
        Symbol: parsed?.symbol ?? '',
        Action: parsed?.action ?? '',
        Quantity: parsed?.quantity ?? null,
        Price: parsed?.price ?? '',
        ContentType: request.headers.get('content-type') ?? '',
        ParsedJson: parsed !== null,
        Notes: '',
      },
      apiKey,
      'signals capture',
    )
  } catch (err) {
    console.error('[signals] Airtable write failed:', err)
    return NextResponse.json({ ok: true, stored: false })
  }

  return NextResponse.json({ ok: true, stored: true })
}

/** Unauthenticated liveness probe — returns no key material and no records. */
export async function GET() {
  return NextResponse.json({ ok: true, service: 'signals-capture' })
}

export async function PUT() {
  return methodNotAllowed()
}

export async function PATCH() {
  return methodNotAllowed()
}

export async function DELETE() {
  return methodNotAllowed()
}

export async function HEAD() {
  return methodNotAllowed()
}

export async function OPTIONS() {
  return methodNotAllowed()
}

function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET, POST' } },
  )
}
