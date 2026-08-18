// Every conversation plus its messages, in one read.
//
// The inbox polls this on a timer, so it returns whole threads rather than
// making the client fetch a summary and then each thread separately — at this
// volume one Airtable read is cheaper than N, and it keeps the open thread and
// the sidebar from ever disagreeing about the newest message.

import { NextRequest, NextResponse } from 'next/server'
import {
  buildConversations,
  isMessageStoreConfigured,
  listRecentMessages,
} from '@/lib/airtable-messages'
import { isAuthorizedMessagesRequest } from '@/lib/messages-auth'
import { getBusinessNumber, missingTwilioEnv } from '@/lib/twilio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MESSAGE_READ_LIMIT = 500

export async function GET(request: NextRequest) {
  if (!isAuthorizedMessagesRequest(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  if (!isMessageStoreConfigured()) {
    return NextResponse.json(
      { error: 'AIRTABLE_API_KEY is not set, so there is no message store to read.', code: 'NO_AIRTABLE_KEY' },
      { status: 503 },
    )
  }

  try {
    const messages = await listRecentMessages(MESSAGE_READ_LIMIT)
    return NextResponse.json({
      conversations: buildConversations(messages),
      businessNumber: getBusinessNumber(),
      sendingConfigured: missingTwilioEnv().length === 0,
      fetchedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[sms/threads] read failed:', err)
    const detail = err instanceof Error ? err.message : String(err)
    // A missing table is the likely first-run failure; name it so the fix is
    // obvious instead of showing an empty inbox that looks like "no texts yet".
    const missingTable = /NOT_FOUND|TABLE_NOT_FOUND|could not be found/i.test(detail)
    return NextResponse.json(
      {
        error: missingTable
          ? 'The Messages table does not exist in the Airtable base yet — see docs/SMS_INBOX_SETUP.md.'
          : 'Could not load conversations from Airtable.',
        detail,
      },
      { status: 502 },
    )
  }
}
