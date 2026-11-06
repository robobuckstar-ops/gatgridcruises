import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cron-auth'
import { flushQueuedTexts, isWithinSmsWindow } from '@/lib/lead-autotext'

export const runtime = 'nodejs'
export const maxDuration = 60

// Sends welcome texts held overnight. Scheduled daily at 14:05 UTC, which is
// 8:05am Central in standard time and 9:05am in daylight time.
export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isWithinSmsWindow()) return NextResponse.json({ skipped: 'outside the 8am to 9pm Central window' })
  return NextResponse.json(await flushQueuedTexts())
}
