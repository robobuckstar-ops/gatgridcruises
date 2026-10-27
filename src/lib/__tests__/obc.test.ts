import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  getOBC,
  isValidFare,
  formatUSD,
  OBC_RATE,
  OBC_MINIMUM,
  OBC_ROUNDING,
  OBC_EXAMPLE_FARES,
} from '../obc'

test('headline fares quote the expected credit', () => {
  const cases: [number, number][] = [
    [3000, 150],
    [5000, 250],
    [10000, 500],
  ]
  for (const [fare, expected] of cases) {
    assert.equal(getOBC(fare), expected, `fare ${fare}`)
  }
})

test('credit rounds up to the nearest $10, never down', () => {
  // 4100 * 0.05 = 205 -> 210
  assert.equal(getOBC(4100), 210)
  // 2999.99 * 0.05 = 149.9995 -> 150
  assert.equal(getOBC(2999.99), 150)
  for (let fare = 250; fare < 20000; fare += 137.5) {
    const obc = getOBC(fare)
    assert.equal(obc % OBC_ROUNDING, 0, `fare ${fare} not a $${OBC_ROUNDING} increment`)
    assert.ok(obc >= fare * OBC_RATE, `fare ${fare} rounded down`)
  }
})

test('small fares fall back to the minimum rather than $0', () => {
  assert.equal(getOBC(1), OBC_MINIMUM)
  assert.equal(getOBC(100), OBC_MINIMUM)
  // 333.34 * 0.05 = 16.667 -> 20 (rounded up), above the floor
  assert.equal(getOBC(333.34), 20)
})

test('placeholder bookings earn the reduced (half) rate', () => {
  // 2.5% vs the standard 5%, then rounded UP to the nearest $10.
  assert.equal(getOBC(10000, { placeholder: true }), 250) // 250 -> 250
  assert.equal(getOBC(5000, { placeholder: true }), 130) //  125 -> 130
  assert.equal(getOBC(3000, { placeholder: true }), 80) //    75 -> 80
  // Placeholder is always <= standard for the same fare.
  for (const fare of [3000, 5000, 10000, 13950, 25000]) {
    assert.ok(
      getOBC(fare, { placeholder: true }) <= getOBC(fare),
      `placeholder OBC should not exceed standard for fare ${fare}`,
    )
  }
})

test('no fare above zero returns $0 credit', () => {
  for (let fare = 0.01; fare < 15000; fare += 7.13) {
    assert.ok(getOBC(fare) > 0, `fare ${fare} returned $0`)
  }
})

test('invalid fares are rejected rather than quoted', () => {
  for (const fare of [-100, -0.01, 0, NaN, Infinity, -Infinity]) {
    assert.equal(isValidFare(fare), false, `isValidFare(${fare})`)
    assert.equal(getOBC(fare), 0, `getOBC(${fare})`)
  }
})

test('credit scales monotonically with fare — no cap', () => {
  assert.ok(getOBC(50000) > getOBC(10000))
  assert.ok(getOBC(10000) > getOBC(5000))
  assert.equal(getOBC(100000), 5000)
})

test('example fares all produce displayable dollar amounts', () => {
  for (const fare of OBC_EXAMPLE_FARES) {
    const obc = getOBC(fare)
    assert.ok(Number.isFinite(obc) && obc > 0, `example fare ${fare}`)
    assert.match(formatUSD(obc), /^\$[\d,]+$/)
  }
})

test('formatUSD adds thousands separators', () => {
  assert.equal(formatUSD(90), '$90')
  assert.equal(formatUSD(1500), '$1,500')
  assert.equal(formatUSD(10000), '$10,000')
})
