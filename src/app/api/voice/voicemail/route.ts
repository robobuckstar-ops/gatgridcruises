// Handles what happens after an unanswered business call drops into voicemail.
//
// Twilio hits this URL twice for one voicemail:
//   1. <Record action> — fires when the recording finishes, with RecordingUrl
//      and RecordingDuration. We log the voicemail to the caller's CRM thread
//      and fire a high-priority "new voicemail" push with a link to listen.
//   2. transcribeCallback — fires later with TranscriptionText. We push the
//      transcript so Grayson can read the message without playing it.
//
// A caller who hangs up without leaving anything (duration ~0) still gets a
// "missed call" alert, so nothing slips by.

import { NextRequest, NextResponse } from 'next/server'
import { lookupContactName, saveMessageSafely } from '@/lib/airtable-messages'
import { sendPushover, PRIORITY_HIGH } from '@/lib/pushover'
import {
  formatPhoneDisplay,
  normalizePhone,
  validateTwilioSignature,
  webhookUrlFor,
} from '@/lib/twilio'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function xml(body: string): NextResponse {
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  })
}

export async function POST(request: NextRequest) {
  const params: Record<string, string> = {}
  try {
    const form = await request.formData()
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') params[key] = value
    }
  } catch (err) {
    console.error('[voice/voicemail] could not parse the Twilio form body:', err)
    return xml('<Response><Hangup/></Response>')
  }

  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim()
  if (authToken) {
    const signature = request.headers.get('x-twilio-signature') || ''
    const url = webhookUrlFor(request)
    if (!validateTwilioSignature(url, params, signature, authToken)) {
      console.error(`[voice/voicemail] rejected: X-Twilio-Signature did not validate for ${url}.`)
      return new NextResponse('Invalid Twilio signature', { status: 403 })
    }
  }

  const from = normalizePhone(params.From)
  let contactName = ''
  try {
    contactName = await lookupContactName(from)
  } catch (err) {
    console.error('[voice/voicemail] contact lookup failed:', err)
  }
  const who = contactName ? `${contactName} (${formatPhoneDisplay(from)})` : formatPhoneDisplay(from)

  // Transcription callback: just deliver the text.
  if (typeof params.TranscriptionText === 'string') {
    const text = params.TranscriptionText.trim()
    if (text) {
      await sendPushover({
        title: `Voicemail transcript — ${contactName || formatPhoneDisplay(from)}`,
        message: `${who} said: "${text}"`,
        priority: PRIORITY_HIGH,
      })
    }
    return new NextResponse('ok', { status: 200 })
  }

  // Recording callback: a voicemail was (or wasn't) left.
  const recordingUrl = (params.RecordingUrl ?? '').trim()
  const duration = parseInt(params.RecordingDuration ?? '0', 10) || 0

  if (recordingUrl && duration >= 2) {
    await saveMessageSafely({
      from,
      to: normalizePhone(params.To),
      body: `Voicemail (${duration}s): ${recordingUrl}.mp3`,
      direction: 'inbound',
      channel: 'Voice',
      contactName: contactName || undefined,
      status: 'Unread',
    })
    await sendPushover({
      title: `New voicemail — ${contactName || formatPhoneDisplay(from)}`,
      message: `${who} left a ${duration}s voicemail. Tap to listen: ${recordingUrl}.mp3`,
      priority: PRIORITY_HIGH,
    })
  } else {
    await saveMessageSafely({
      from,
      to: normalizePhone(params.To),
      body: 'Missed call (no voicemail left)',
      direction: 'inbound',
      channel: 'Voice',
      contactName: contactName || undefined,
      status: 'Unread',
    })
    await sendPushover({
      title: `Missed call — ${contactName || formatPhoneDisplay(from)}`,
      message: `${who} called the business line, went unanswered, and did not leave a voicemail. Call them back.`,
      priority: PRIORITY_HIGH,
    })
  }

  return xml('<Response><Hangup/></Response>')
}
