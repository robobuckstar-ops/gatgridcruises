// Adds any missing lead-tracking columns to the GatGrid Leads table.
// Needs a personal access token with schema.bases:read and schema.bases:write:
//   AIRTABLE_SCHEMA_TOKEN=... npx tsx scripts/setup-lead-fields.ts
// Only adds fields. Never renames or removes anything.

const BASE = 'applSFcQkOus2fFsx'
const TABLE = 'tblc8JHpcgEOnmCoj'
const token = process.env.AIRTABLE_SCHEMA_TOKEN?.trim()
if (!token) throw new Error('Set AIRTABLE_SCHEMA_TOKEN')

const select = (...names: string[]) => ({ type: 'singleSelect', options: { choices: names.map((name) => ({ name })) } })
const date = { type: 'date', options: { dateFormat: { name: 'iso' } } }
const text = { type: 'singleLineText' }

const FIELDS: Record<string, object> = {
  Status: select('New', 'Replied', 'Quoted', 'Booked', 'Lost'),
  'Status New Date': date,
  'Status Replied Date': date,
  'Status Quoted Date': date,
  'Status Booked Date': date,
  'Status Lost Date': date,
  'Lead Source': text,
  'UTM Source': text,
  'UTM Medium': text,
  'UTM Campaign': text,
  'UTM Content': text,
  fbclid: text,
  'Ad Name': text,
  'Adset Name': text,
  'Campaign Name': text,
  Qualified: select('Y', 'N'),
  'SMS Consent': select('Yes', 'No'),
  'SMS Consent At': text,
  'SMS Consent Source': text,
  'Meta Lead ID': text,
  'Meta Form ID': text,
}

async function main() {
  const url = `https://api.airtable.com/v0/meta/bases/${BASE}/tables`
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Could not read schema: ${res.status} ${await res.text()}`)
  const { tables } = (await res.json()) as { tables: { id: string; fields: { name: string }[] }[] }
  const table = tables.find((t) => t.id === TABLE)
  if (!table) throw new Error(`Table ${TABLE} not found`)
  const existing = new Set(table.fields.map((f) => f.name))
  for (const [name, spec] of Object.entries(FIELDS)) {
    if (existing.has(name)) {
      console.log(`exists  ${name}`)
      continue
    }
    const add = await fetch(`${url}/${TABLE}/fields`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, ...spec }),
    })
    console.log(add.ok ? `added   ${name}` : `FAILED  ${name}: ${await add.text()}`)
    await new Promise((r) => setTimeout(r, 250))
  }
}

main()
