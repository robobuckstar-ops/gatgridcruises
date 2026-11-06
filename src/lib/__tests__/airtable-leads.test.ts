import { test } from 'node:test'
import assert from 'node:assert/strict'
import { saveLead } from '../airtable-leads'

type Call = { method: string; body?: { fields?: Record<string, unknown> } }

function mockAirtable(existingFields: Record<string, unknown>) {
  const calls: Call[] = []
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const method = init?.method ?? 'GET'
    const body = init?.body ? JSON.parse(String(init.body)) : undefined
    calls.push({ method, body })
    const json = method === 'GET' ? { records: [{ id: 'rec1', fields: existingFields }] } : { id: 'rec1', fields: {} }
    return new Response(JSON.stringify(json), { status: 200 })
  }) as typeof fetch
  return calls
}

const repeat = {
  name: 'New Name',
  email: 'a@example.com',
  phone: '4055550100',
  notes: 'Now want a verandah',
  source: 'request-this-sailing',
  sailingInterest: 'Disney Wish · Sails 2027-03-01',
  guests: '2A/1C',
}

test('repeat inquiry appends new details and keeps the old notes', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  const calls = mockAirtable({ Notes: 'Original note from Grayson' })
  const result = await saveLead(repeat)
  assert.equal(result?.outcome, 'updated')
  const notes = String(calls.find((c) => c.method === 'PATCH')?.body?.fields?.Notes)
  assert.ok(notes.startsWith('Original note from Grayson\n\n--- Repeat inquiry'))
  for (const part of ['New Name', 'Now want a verandah', 'Disney Wish', '2A/1C', '4055550100']) {
    assert.ok(notes.includes(part), part)
  }
})

test('refreshDetailsOnUpdate no longer overwrites existing notes', async () => {
  process.env.AIRTABLE_API_KEY = 'test'
  const calls = mockAirtable({ Notes: 'Keep me' })
  await saveLead({ ...repeat, refreshDetailsOnUpdate: true })
  const notes = String(calls.find((c) => c.method === 'PATCH')?.body?.fields?.Notes)
  assert.ok(notes.startsWith('Keep me'))
  assert.ok(notes.includes('Now want a verandah'))
})
