import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { POST as inbound } from '../../app/api/voice/inbound/route'
import { POST as gather } from '../../app/api/voice/gather/route'
import { partySizeNumber, saveLead } from '../airtable-leads'
import { recordPossibleBot } from '../possible-bot'

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
