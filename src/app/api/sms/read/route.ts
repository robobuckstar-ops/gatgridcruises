// Clear the unread badge once a thread has actually been opened.

import { NextRequest, NextResponse } from 'next/server'
import { markThreadRead } from '@/lib/airtable-messages'
import { isAuthorizedMessagesRequest } from '@/lib/messages-auth'
import { normalizePhone } from '@/lib/twilio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isAuthorizedMessagesRequest(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  let payload: { conversationId?: unknown }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body' }, { status: 400 })
  }

  const conversationId = normalizePhone(
    typeof payload.conversationId === 'string' ? payload.conversationId : '',
  )
  if (!conversationId) {
    return NextResponse.json({ error: 'conversationId is required' }, { status: 400 })
  }

  try {
    const updated = await markThreadRead(conversationId)
    return NextResponse.json({ success: true, updated })
  } catch (err) {
    console.error('[sms/read] could not mark thread read:', err)
    // Non-fatal for the operator: the thread is open and readable regardless.
    return NextResponse.json({ success: false, updated: 0 }, { status: 200 })
  }
}
