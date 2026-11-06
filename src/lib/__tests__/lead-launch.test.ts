import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { deliverLeadAutoText, isWithinSmsWindow } from '../lead-autotext'
import { computeQualified, dateFromText, isTestLead } from '../lead-tracking'
import { NURTURE_STEPS, nextNurtureStep, nurtureEmailHtml } from '../nurture-emails'
import { leadUnsubscribeUrl, verifyLeadUnsubscribe } from '../lead-unsubscribe'
import { POST as metaLead } from '../../app/api/meta-lead/route'

const input = { name: 'A B', source: 'inquiry' as const }
// 19:00 UTC is 1 or 2pm Central; 05:00 UTC is overnight.
const NOON = new Date('2026-11-06T19:00:00Z')
const NIGHT = new Date('2026-11-06T05:00:00Z')

test('SMS window is 8am to 9pm Central', () => {
  assert.equal(isWithinSmsWindow(new Date('2026-11-06T13:59:00Z')), false) // 7:59 CST
  assert.equal(isWithinSmsWindow(new Date('2026-11-06T14:00:00Z')), true) // 8:00 CST
  assert.equal(isWithinSmsWindow(new Date('2026-11-07T02:59:00Z')), true) // 8:59pm CST
  assert.equal(isWithinSmsWindow(new Date('2026-11-07T03:00:00Z')), false) // 9:00pm CST
  assert.equal(isWithinSmsWindow(new Date('2026-07-06T13:00:00Z')), true) // 8:00 CDT
})

test('no consent means no text, even with a phone', async () => {
  let called = false
  globalThis.fetch = (async () => {
    called = true
    return new Response('{}')
  }) as typeof fetch
  assert.equal(await deliverLeadAutoText('4055550100', false, input, NOON), 'no-consent')
  assert.equal(await deliverLeadAutoText('', true, input, NOON), 'no-phone')
  assert.equal(called, false)
})

test('consented text outside the window is queued, not sent', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  process.env.TWILIO_ACCOUNT_SID = 'AC'
  process.env.TWILIO_AUTH_TOKEN = 't'
  const urls: string[] = []
  let status = ''
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    urls.push(String(url))
    if (init?.body && String(url).includes('airtable')) status = JSON.parse(String(init.body)).fields.Status
    return new Response(JSON.stringify({ id: 'r', fields: {} }), { status: 200 })
  }) as typeof fetch
  assert.equal(await deliverLeadAutoText('4055550100', true, input, NIGHT), 'queued')
  assert.equal(status, 'Queued')
  assert.ok(urls.every((u) => !u.includes('twilio.com')))
  delete process.env.TWILIO_ACCOUNT_SID
  delete process.env.TWILIO_AUTH_TOKEN
})

test('qualified rule and TEST exclusion', () => {
  assert.equal(computeQualified({ alreadyBooked: true }), 'Y')
  assert.equal(computeQualified({ sailDate: '2027-06-01' }, '2026-11-06'), 'Y')
  assert.equal(computeQualified({ sailDate: '2028-08-01' }, '2026-11-06'), 'N')
  assert.equal(computeQualified({}), 'N')
  assert.equal(dateFromText('Disney Wish March 2027'), '2027-03-01')
  assert.equal(isTestLead('TEST – auto email'), true)
  assert.equal(isTestLead('Testa Smith'), false)
})

test('nurture runs days 3, 5, 8, 12 once each, and leaves legacy leads alone', () => {
  assert.deepEqual(NURTURE_STEPS.map((s) => s.day), [3, 5, 8, 12])
  assert.equal(nextNurtureStep('Not Started', 2), null)
  assert.equal(nextNurtureStep('Not Started', 3)?.day, 3)
  assert.equal(nextNurtureStep('Nurture Day 3', 4), null)
  assert.equal(nextNurtureStep('Nurture Day 3', 5)?.day, 5)
  assert.equal(nextNurtureStep('Nurture Day 12', 40), null)
  assert.equal(nextNurtureStep('Day 3 - Value Add', 40), null)
})

test('every nurture email has the unsubscribe link, a signature, and no banned words', () => {
  for (const step of NURTURE_STEPS) {
    const html = nurtureEmailHtml(step, { name: 'Jane Doe', interest: 'Disney Wish', windowStart: '2027-03-01' }, 'https://u/x')
    assert.ok(html.includes('https://u/x'), step.label)
    assert.ok(html.includes('Grayson'), step.label)
    assert.ok(!/discount|rebate|cash.?back|price match/i.test(html), step.label)
  }
})

test('unsubscribe signature verifies and rejects tampering', () => {
  process.env.LEAD_UNSUBSCRIBE_SECRET = 'k'
  const url = new URL(leadUnsubscribeUrl('A@x.com')!)
  assert.equal(verifyLeadUnsubscribe('a@x.com', url.searchParams.get('sig')!), true)
  assert.equal(verifyLeadUnsubscribe('b@x.com', url.searchParams.get('sig')!), false)
})

function metaRequest(body: unknown, secret?: string) {
  return new NextRequest('https://x/api/meta-lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(secret ? { 'x-meta-lead-secret': secret } : {}) },
    body: JSON.stringify(body),
  })
}

test('/api/meta-lead fails closed, checks the secret, and runs the pipeline', async () => {
  delete process.env.META_LEAD_WEBHOOK_SECRET
  assert.equal((await metaLead(metaRequest({}))).status, 503)
  process.env.META_LEAD_WEBHOOK_SECRET = 's3'
  assert.equal((await metaLead(metaRequest({}, 'wrong'))).status, 401)
  assert.equal((await metaLead(metaRequest({ full_name: 'x' }, 's3'))).status, 400)

  process.env.AIRTABLE_API_KEY = 'test'
  const writes: Record<string, unknown>[] = []
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    if (init?.method === 'POST' && init.body) writes.push(JSON.parse(String(init.body)).fields)
    const body = init?.method ? { id: 'rec1', fields: {} } : { records: [] }
    return new Response(JSON.stringify(body), { status: 200 })
  }) as typeof fetch

  const res = await metaLead(
    metaRequest(
      {
        full_name: 'Jane Doe',
        email: 'Jane@Example.com',
        phone: '',
        ship_or_dates: 'Disney Wish, March 2027',
        party_size: '4',
        already_booked: 'no',
        sms_consent: 'yes',
        ad_name: 'A1',
        adset_name: 'S1',
        campaign_name: 'C1',
        form_id: 'F1',
        lead_id: 'L1',
        created_time: '2026-11-06',
      },
      's3',
    ),
  )
  assert.equal(res.status, 200)
  const crm = writes[0]
  assert.equal(crm['Lead Source'], 'Meta Lead Form')
  assert.equal(crm['Ad Name'], 'A1')
  assert.equal(crm['Adset Name'], 'S1')
  assert.equal(crm['Campaign Name'], 'C1')
  assert.equal(crm['Qualified'], 'Y')
  assert.equal(crm['SMS Consent'], 'Yes')
  assert.ok(String(crm['Notes']).includes('Meta lead ID: L1'))
})
