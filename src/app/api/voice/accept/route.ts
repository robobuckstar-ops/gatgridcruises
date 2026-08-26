// Reached when Grayson presses a key during the screening whisper. Returning an
// empty <Response/> ends the whisper, which tells Twilio to bridge the caller
// and Grayson together. If no key is pressed the whisper hangs up instead (see
// /api/voice/screen) and the caller rolls to voicemail.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMPTY = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'

function twiml(): NextResponse {
  return new NextResponse(EMPTY, {
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
