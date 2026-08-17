import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getOBC, getOBCTierIndex, isValidFare, MAX_OBC, OBC_TIERS } from '../obc'

test('whole-dollar fares land in their advertised tier', () => {
  const cases: [number, number][] = [
    [1, 25],
    [1499, 25],
    [1500, 75],
    [2999, 75],
    [3000, 150],
    [4999, 150],
    [5000, 300],
    [9999, 300],
    [10000, 400],
    [25000, 400],
  ]
  for (const [fare, expected] of cases) {
    assert.equal(getOBC(fare), expected, `fare ${fare}`)
  }
})

test('fares in the fractional gap between tiers still resolve (regression)', () => {
  // These returned $0 before the banding fix.
  assert.equal(getOBC(1499.99), 25)
  assert.equal(getOBC(2999.99), 75)
  assert.equal(getOBC(4999.99), 150)
  assert.equal(getOBC(9999.99), 300)
  assert.equal(getOBC(9999.5), 300)
})

test('no fare above zero returns $0 OBC', () => {
  for (let fare = 0.01; fare < 15000; fare += 7.13) {
    assert.ok(getOBC(fare) > 0, `fare ${fare} returned $0`)
  }
})

test('invalid fares are rejected rather than quoted', () => {
  for (const fare of [-100, -0.01, 0, NaN, Infinity, -Infinity]) {
    assert.equal(isValidFare(fare), false, `isValidFare(${fare})`)
    assert.equal(getOBC(fare), 0, `getOBC(${fare})`)
    assert.equal(getOBCTierIndex(fare), -1, `getOBCTierIndex(${fare})`)
  }
})

test('tier index matches the tier the fare resolves to', () => {
  assert.equal(getOBCTierIndex(2999.99), 1)
  assert.equal(getOBCTierIndex(3000), 2)
  assert.equal(getOBCTierIndex(10000), 4)
})

test('MAX_OBC equals the top tier so marketing copy stays in sync', () => {
  assert.equal(MAX_OBC, 400)
  assert.equal(MAX_OBC, OBC_TIERS[OBC_TIERS.length - 1].obc)
})

test('tiers are contiguous and ascending', () => {
  for (let i = 1; i < OBC_TIERS.length; i++) {
    const prev = OBC_TIERS[i - 1]
    const curr = OBC_TIERS[i]
    assert.ok(curr.minFare > prev.minFare, `tier ${i} minFare not ascending`)
    assert.equal(prev.maxFare, curr.minFare - 1, `gap between tier ${i - 1} and ${i}`)
  }
})
