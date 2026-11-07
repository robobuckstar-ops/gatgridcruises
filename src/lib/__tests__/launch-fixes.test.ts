import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { POST as inbound } from '../../app/api/voice/inbound/route'
import { POST as gather } from '../../app/api/voice/gather/route'
import { POST as voicemail } from '../../app/api/voice/voicemail/route'
import { partySizeNumber, saveLead } from '../airtable-leads'
import { recordPossibleBot } from '../possible-bot'
import { forwardTwiml, pressOneTwiml, rejectTwiml, voicemailOnlyTwiml } from '../voice'

delete process.env.TWILIO_AUTH_TOKEN
delete process.env.RESEND_API_KEY
delete process.env.BREVO_API_KEY
delete process.env.PUSHOVER_TOKEN

function voiceRequest(path: string, fields: Record<string, string>) {
  return new NextRequest(`https://x${path}`, { method: 'POST', body: new URLSearchParams(fields) })
}

function mockAirtable(records: unknown[] = []) {
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    if (init?.body) writes.push(JSON.parse(String(init.body)).fields)
    return new Response(JSON.stringify(init?.method ? { id: 'r', fields: {} } : { records }), { status: 200 })
  }) as typeof fetch
  return writes
}

test('callers hear press 1, and no key falls to voicemail without ringing the cell', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  mockAirtable()
  const twiml = await (await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550100', To: '+14055264956' }))).text()
  assert.ok(twiml.includes('To reach a travel advisor, press 1.'))
  assert.ok(twiml.indexOf('<Gather') < twiml.indexOf('<Record'))
  assert.ok(!twiml.includes('<Dial'))
})

test('pressing 1 forwards, and any other key goes to voicemail', async () => {
  const one = await (await gather(voiceRequest('/api/voice/gather', { Digits: '1', From: '+14055550100' }))).text()
  assert.ok(one.includes('<Dial'))
  assert.ok(one.includes('+15804306511'))
  const other = await (await gather(voiceRequest('/api/voice/gather', { Digits: '2', From: '+14055550100' }))).text()
  assert.ok(!other.includes('<Dial'))
  assert.ok(other.includes('<Record'))
  const self = await (await gather(voiceRequest('/api/voice/gather', { Digits: '1', From: '+15804306511' }))).text()
  assert.ok(!self.includes('<Dial'))
})

test('blocked callers are rejected from the env list and the Spam box', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  process.env.VOICE_BLOCK_LIST = '405-555-0199'
  mockAirtable()
  const env = await (await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550199' }))).text()
  assert.ok(env.includes('<Reject'))
  delete process.env.VOICE_BLOCK_LIST
  mockAirtable([{ id: 'm', fields: {} }])
  const spam = await (await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550100' }))).text()
  assert.ok(spam.includes('<Reject'))
})

test('a bot-flagged submit is saved and flagged, never dropped', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  const writes = mockAirtable()
  const res = await recordPossibleBot({ name: 'Real Person', email: 'a@b.com', utm_source: 'fb' }, 'inquiry', 'too fast')
  assert.deepEqual(await res.json(), { success: true, flagged: true })
  const row = writes[0]
  assert.equal(row['Lead Source'], 'Possible Bot')
  assert.equal(row['UTM Source'], 'fb')
  assert.ok(String(row['Notes']).includes('POSSIBLE BOT (too fast)'))
})

test('details land in the real column names', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  const writes = mockAirtable()
  await saveLead({ name: 'A', email: 'a@b.com', source: 'obc-estimate', sailingInterest: 'Wish', guests: '2A/1C' })
  assert.equal(writes[0]['Interested In'], 'Wish')
  assert.equal(writes[0]['Party Size'], 3)
  assert.equal(writes[0]['Form Source'], 'obc-estimate')
  assert.equal(writes[0]['Lead Source'], 'Website Form')
  assert.equal(partySizeNumber('4'), 4)
  assert.equal(partySizeNumber('not sure'), undefined)
})

test('a repeat lead fills blank tracking columns without overwriting', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  const writes = mockAirtable([{ id: 'r', fields: { Notes: 'x', 'UTM Source': 'old' } }])
  await saveLead({ name: 'A', email: 'a@b.com', source: 's', utmSource: 'new', utmCampaign: 'c', adName: 'ad' })
  assert.equal(writes[0]['UTM Source'], undefined)
  assert.equal(writes[0]['UTM Campaign'], 'c')
  assert.equal(writes[0]['Ad Name'], 'ad')
})

test('every voice response is well-formed TwiML', async () => {
  for (const form of [pressOneTwiml, forwardTwiml, voicemailOnlyTwiml, rejectTwiml]) {
    const tags = (await form().text()).replace(/^<\?xml[^>]*\?>/, '')
    for (const tag of tags.match(/<[^<>]*>/g) ?? []) {
      assert.equal((tag.match(/"/g) ?? []).length % 2, 0, tag)
    }
    const text = tags.replace(/<[^<>]*>/g, '')
    assert.equal(text.includes('<') || text.includes('>'), false, tags)
  }
})

test('press-1 points at the gather route', async () => {
  const body = await pressOneTwiml().text()
  assert.ok(/<Gather numDigits="1" timeout="6" action="\/api\/voice\/gather" method="POST">/.test(body))
})

test('only Digits exactly 1 can dial the cell', async () => {
  const cases: Record<string, string>[] = [
    { From: '+14055550100' },
    { From: '+14055550100', Digits: '' },
    { From: '+14055550100', Digits: '0' },
    { From: '+14055550100', Digits: '2' },
    { From: '+14055550100', Digits: '9' },
    { From: '+14055550100', Digits: '*' },
    { From: '+14055550100', Digits: '#' },
    { From: '+14055550100', Digits: '11' },
    { From: '+14055550100', Digits: '1#' },
  ]
  for (const fields of cases) {
    const twiml = await (await gather(voiceRequest('/api/voice/gather', fields))).text()
    assert.ok(!twiml.includes('<Dial'), JSON.stringify(fields))
    assert.ok(!twiml.includes('5804306511'), JSON.stringify(fields))
    assert.ok(twiml.includes('<Record'), JSON.stringify(fields))
  }
})

test('the prompt falling through on a timeout never dials', async () => {
  const body = await pressOneTwiml().text()
  assert.ok(!body.includes('<Dial'))
  assert.ok(!body.includes('5804306511'))
  assert.ok(body.indexOf('</Gather>') < body.indexOf('<Record'))
})

test('failed caller verification skips the prompt and goes to voicemail', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  mockAirtable()
  for (const StirVerstat of ['TN-Validation-Failed-A', 'TN-Validation-Failed-B', 'TN-Validation-Failed-C', 'No-TN-Validation']) {
    const twiml = await (await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550100', StirVerstat }))).text()
    assert.ok(!twiml.includes('<Gather'), StirVerstat)
    assert.ok(!twiml.includes('<Dial'), StirVerstat)
    assert.ok(twiml.includes('<Record'), StirVerstat)
  }
  for (const StirVerstat of ['TN-Validation-Passed-A', 'TN-Validation-Passed-C', '']) {
    const twiml = await (await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550100', StirVerstat }))).text()
    assert.ok(twiml.includes('<Gather'), StirVerstat)
  }
})

function mockVoicemail(messages: unknown[] = []) {
  const calls = { pushes: 0, rows: [] as Record<string, unknown>[] }
  process.env.PUSHOVER_TOKEN = 't'
  process.env.PUSHOVER_USER = 'u'
  process.env.AIRTABLE_API_KEY = 'test'
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    if (String(url).includes('pushover')) {
      calls.pushes++
      return new Response('{}', { status: 200 })
    }
    if (init?.body) {
      calls.rows.push(JSON.parse(String(init.body)).fields)
      return new Response(JSON.stringify({ id: 'r', fields: {} }), { status: 200 })
    }
    return new Response(JSON.stringify({ records: messages }), { status: 200 })
  }) as typeof fetch
  return calls
}

test('voicemails under 5 seconds or with no recording log without a push', async () => {
  for (const fields of [{}, { RecordingUrl: 'https://r/1', RecordingDuration: '1' }, { RecordingUrl: 'https://r/1', RecordingDuration: '4' }] as Record<string, string>[]) {
    const calls = mockVoicemail()
    await voicemail(voiceRequest('/api/voice/voicemail', { From: '+14055550100', ...fields }))
    assert.equal(calls.pushes, 0, JSON.stringify(fields))
    assert.equal(calls.rows.length, 1, JSON.stringify(fields))
  }
  const calls = mockVoicemail()
  await voicemail(voiceRequest('/api/voice/voicemail', { From: '+14055550100', RecordingUrl: 'https://r/1', RecordingDuration: '5' }))
  assert.equal(calls.pushes, 1)
  assert.equal(calls.rows.length, 1)
})

test('a transcript is pushed only for a voicemail of 5 seconds or more', async () => {
  const short = mockVoicemail([{ id: 'm', fields: { Body: 'Voicemail (3s): https://r/1.mp3' } }])
  await voicemail(voiceRequest('/api/voice/voicemail', { From: '+14055550100', TranscriptionText: 'hi', RecordingUrl: 'https://r/1' }))
  assert.equal(short.pushes, 0)
  const long = mockVoicemail([{ id: 'm', fields: { Body: 'Voicemail (30s): https://r/2.mp3' } }])
  await voicemail(voiceRequest('/api/voice/voicemail', { From: '+14055550100', TranscriptionText: 'hi', RecordingUrl: 'https://r/2' }))
  assert.equal(long.pushes, 1)
})

test('the incoming-call push fires only after pressing 1', async () => {
  const quiet = mockVoicemail()
  await inbound(voiceRequest('/api/voice/inbound', { From: '+14055550100', To: '+14055264956' }))
  assert.equal(quiet.pushes, 0)
  const wrongKey = mockVoicemail()
  await gather(voiceRequest('/api/voice/gather', { From: '+14055550100', Digits: '2' }))
  assert.equal(wrongKey.pushes, 0)
  const pressed = mockVoicemail()
  const twiml = await (await gather(voiceRequest('/api/voice/gather', { From: '+14055550100', Digits: '1' }))).text()
  assert.equal(pressed.pushes, 1)
  assert.ok(twiml.includes('<Dial'))
})
