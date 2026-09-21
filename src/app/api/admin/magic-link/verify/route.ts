// Consume a magic-link token: if valid, mint the Messages session cookie and
// redirect into the inbox. Invalid/expired links bounce back to the login page.

import { NextRequest, NextResponse } from 'next/server'
import { MESSAGES_COOKIE, createMessagesSession, verifyMagicToken } from '@/lib/messages-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin
  const token = request.nextUrl.searchParams.get('token') ?? undefined
  const email = verifyMagicToken(token)

  if (!email) {
    return NextResponse.redirect(`${origin}/admin/messages?error=link`)
  }

  const session = createMessagesSession()
  const response = NextResponse.redirect(`${origin}/admin/messages`)
  response.cookies.set(MESSAGES_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: session.maxAge,
  })
  return response
}
