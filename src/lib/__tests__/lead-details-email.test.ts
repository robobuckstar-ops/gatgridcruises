import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getSailings } from '../data'
import { getOBC } from '../obc'
import {
  LEAD_DETAILS_DISCLOSURE,
  buildLeadDetailsEmail,
  selectLeadSailings,
  windowFromTimeframe,
} from '../lead-details-email'

const decode = (s: string) => s.replace(/&#39;/g, "'").replace(/&amp;/g, '&')

test('a picked sailing is reported as requested, with its transfer-free OBC', () => {
  const s = getSailings()[0]
  const { requested, cards } = selectLeadSailings({ name: 'A', sailingId: s.id })
  assert.equal(requested, true)
  assert.equal(cards.length, 1)
  assert.equal(cards[0].obcEstimate, getOBC(s.current_lowest_price))
})

test('no sailing named: 2 to 3 upcoming suggestions', () => {
  const { requested, cards } = selectLeadSailings({ name: 'A' })
  assert.equal(requested, false)
  assert.ok(cards.length >= 2 && cards.length <= 3)
})

test('a named ship narrows the suggestions to that ship', () => {
  const { cards } = selectLeadSailings({ name: 'A', ship: 'wish' })
  assert.ok(cards.length > 0)
  assert.ok(cards.every((c) => c.ship === 'Disney Wish'), JSON.stringify(cards.map((c) => c.ship)))
})

test('transfers use the reduced OBC rate', () => {
  const s = getSailings()[0]
  const { cards } = selectLeadSailings({ name: 'A', sailingId: s.id, transfer: true })
  assert.equal(cards[0].obcEstimate, getOBC(s.current_lowest_price, { placeholder: true }))
})

test('email has the required content and no fares', () => {
  const html = decode(buildLeadDetailsEmail({ name: 'TEST – auto email' }))
  assert.ok(html.includes('Hi TEST,'))
  assert.ok(html.includes(LEAD_DETAILS_DISCLOSURE))
  assert.ok(html.includes('Already have a quote? Reply with it'))
  assert.ok(html.includes('(estimate)'))
  const fares = getSailings().map((s) => `$${s.current_lowest_price.toLocaleString('en-US')}`)
  const obcAmounts = [...html.matchAll(/about (\$[\d,]+)/g)].map((m) => m[1])
  for (const money of html.match(/\$[\d,]+/g) ?? []) {
    assert.ok(obcAmounts.includes(money), `unexpected dollar amount ${money}`)
    assert.ok(!fares.includes(money) || obcAmounts.includes(money))
  }
})

test('timeframe options become windows', () => {
  const w = windowFromTimeframe('3–6 months out', '2026-11-06')
  assert.ok(w.windowStart! > '2027-01-01' && w.windowEnd! < '2027-06-01')
  assert.deepEqual(windowFromTimeframe('Flexible — show me the best deals', '2026-11-06'), {})
})
