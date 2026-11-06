import { NextRequest, NextResponse } from 'next/server'
import { escapeFormulaValue, findFirstRecord, getAirtableKey, updateRecord } from '@/lib/airtable-client'
import { LEAD_FIELDS, LEADS_TABLE } from '@/lib/airtable-leads'
import { verifyLeadUnsubscribe } from '@/lib/lead-unsubscribe'
import { unsubscribeSubscriber } from '@/lib/subscriber-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// One-click opt-out from nurture emails, and from the newsletter list as well,
// since the reader asked us to stop emailing them.
async function optOut(email: string): Promise<void> {
  const apiKey = getAirtableKey()
  if (!apiKey) throw new Error('AIRTABLE_API_KEY not set')
  const lead = await findFirstRecord(
    LEADS_TABLE,
    `LOWER({Email})="${escapeFormulaValue(email)}"`,
    apiKey,
  )
  if (lead) {
    await updateRecord(LEADS_TABLE, lead.id, { [LEAD_FIELDS.dripSequence]: 'Opted Out' }, apiKey, 'leads.unsubscribe')
  }
  await unsubscribeSubscriber({ email }).catch((err) => {
    console.error('[unsubscribe/lead] subscriber opt-out failed:', err)
  })
}

async function handle(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const email = (searchParams.get('email') ?? '').trim().toLowerCase()
  const sig = searchParams.get('sig') ?? ''
  if (!verifyLeadUnsubscribe(email, sig)) {
    return NextResponse.redirect(new URL('/?unsubscribed=missing', request.url))
  }
  try {
    await optOut(email)
  } catch (err) {
    console.error(`[unsubscribe/lead] OPT-OUT NOT SAVED for ${email}:`, err)
  }
  return NextResponse.redirect(new URL('/?unsubscribed=true', request.url))
}

export const GET = handle
export const POST = handle
