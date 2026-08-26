// Call-screening whisper, played to whoever answers the forwarded leg (Grayson,
// or his carrier voicemail). It asks for a keypress to accept. A real person can
// press a key and get bridged to the caller; a voicemail can't, so it times out
// and hangs up — which sends the caller back to the GatGrid voicemail instead of
// being swallowed by Grayson's personal voicemail.
//
// No side effects here (just TwiML), so it does not reject on a bad signature —
// dropping this leg would drop a real call.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TWIML =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<Response>' +
  '<Gather numDigits="1" timeout="8" action="/api/voice/accept" method="POST">' +
  '<Say voice="alice">Call for Gat Grid Cruises. Press any key to accept.</Say>' +
  '</Gather>' +
  '<Hangup/>' +
  '</Response>'

function twiml(): NextResponse {
  return new NextResponse(TWIML, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

export async function POST(): Promise<NextResponse> {
  return twiml()
}

export async function GET(): Promise<NextResponse> {
  return twiml()
}
