import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { flushQueuedTexts, isWithinSmsWindow } from '@/lib/lead-autotext'

export const runtime = 'nodejs'
export const maxDuration = 60

// Sends welcome texts held overnight. Scheduled at both 13:05 and 14:05 UTC so
// one run lands just after 8am Central in both standard and daylight time. The
// run outside the window does nothing.
export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isWithinSmsWindow()) return NextResponse.json({ skipped: 'outside the 8am to 9pm Central window' })
  return NextResponse.json(await flushQueuedTexts())
}
