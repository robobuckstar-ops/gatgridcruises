'use client'

// The "Flights" card on the client dashboard. Guests can enter each flight
// (airline, number, date, direction) so their concierge can keep an eye on
// arrivals and departures, or just forward their airline confirmation to the
// business inbox and we read it by hand. No auto-parser, no new inbox.

import { useCallback, useEffect, useState } from 'react'

export interface Flight {
  direction: string
  airline: string
  flightNumber: string
  date: string
  notes: string
}

const BLANK: Flight = { direction: 'arrival', airline: '', flightNumber: '', date: '', notes: '' }

const FORWARD_TO = 'bookings@gatgridcruises.com'

// Per-airline tips shown in a fold-away panel when a client picks their carrier.
// Verified against 2026 policies; still caveated, since airlines change fees often.
interface AirlineTip {
  name: string
  match: string[]
  tips: string[]
}

const AIRLINE_TIPS: AirlineTip[] = [
  {
    name: 'Delta',
    match: ['delta'],
    tips: [
      'Online check-in and seat selection open 24 hours before departure in the Fly Delta app.',
      'One free carry-on plus a personal item on every fare, even Basic Economy (Main Basic).',
      'First checked bag is about $35, and free with a Delta SkyMiles card or Medallion status.',
    ],
  },
  {
    name: 'American Airlines',
    match: ['american', 'aa '],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Basic Economy is personal-item-only on domestic flights (no full-size carry-on), so book Main Cabin if you need a roller bag.',
      'First checked bag runs about $40.',
    ],
  },
  {
    name: 'United',
    match: ['united'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Basic Economy allows a personal item only on domestic flights, and a roller bag at the gate is a $65 surprise, so avoid Basic if you plan to carry on.',
      'First checked bag is about $40.',
    ],
  },
  {
    name: 'Southwest',
    match: ['southwest', 'swa'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Heads-up: Southwest ended free checked bags in 2025. First bag is now about $35 and the second about $45, unless you are on a top fare or A-List Preferred.',
      'Southwest moved to assigned seating in early 2026, so you pick or are assigned a seat instead of the old open-boarding scramble.',
    ],
  },
  {
    name: 'JetBlue',
    match: ['jetblue', 'jet blue'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Blue Basic, the cheapest fare, is the most restrictive on bags; standard Blue fares include a carry-on.',
      'Checked-bag fees are cheaper pre-paid online than at the airport.',
    ],
  },
  {
    name: 'Alaska Airlines',
    match: ['alaska'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Free carry-on plus a personal item on all fares.',
      'First checked bag is about $35, and Alaska is known for a strong on-time record.',
    ],
  },
  {
    name: 'Spirit',
    match: ['spirit'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Ultra-low-cost: only a free personal item is included. A carry-on and checked bags cost extra and are far cheaper bought online in advance than at the gate.',
      'Gate agents strictly enforce the bag sizer, so measure before you go.',
    ],
  },
  {
    name: 'Frontier',
    match: ['frontier'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Ultra-low-cost: free personal item only, and it must fit 14x18x8 inches and slide under the seat. A carry-on runs roughly $54 to $99, cheapest online and priciest at the gate.',
      'Frontier strictly enforces the gate sizer. If a personal item does not fit, it is reclassified as a paid carry-on, so pack to size.',
    ],
  },
  {
    name: 'Allegiant',
    match: ['allegiant'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'Ultra-low-cost: free personal item only; carry-on and checked bags cost extra and are cheapest added online.',
      'Allegiant flies limited schedules (often a few days a week) from smaller airports, so double-check your travel-day options.',
    ],
  },
  {
    name: 'Hawaiian Airlines',
    match: ['hawaiian'],
    tips: [
      'Online check-in opens 24 hours before departure.',
      'First checked bag has a fee on North America routes; policies differ on inter-island and international flights.',
    ],
  },
]

const AIRLINE_NAMES = AIRLINE_TIPS.map(a => a.name)

function findAirlineTip(airline: string): AirlineTip | null {
  const q = airline.trim().toLowerCase()
  if (!q) return null
  return AIRLINE_TIPS.find(a => a.match.some(m => q.includes(m.trim()))) ?? null
}

/** Fold-away tips panel for the chosen airline. Renders nothing for unknown carriers. */
function AirlineTips({ airline }: { airline: string }) {
  const [open, setOpen] = useState(false)
  const tip = findAirlineTip(airline)
  if (!tip) return null

  return (
    <div style={{ marginTop: 12 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 13,
          fontWeight: 600,
          color: '#1E3A5F',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>✈️ Tips &amp; reminders for {tip.name}</span>
        <span style={{ color: '#94A3B8' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ border: '1px solid #E2E8F0', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '12px 14px', background: '#fff' }}>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#334155', fontSize: 13, lineHeight: 1.5 }}>
            {tip.tips.map((t, k) => (
              <li key={k} style={{ marginBottom: 6 }}>{t}</li>
            ))}
          </ul>
          <p style={{ margin: '8px 0 0', color: '#94A3B8', fontSize: 11 }}>
            Airline policies change often, so always confirm current rules on {tip.name}&apos;s website before you fly.
          </p>
        </div>
      )}
    </div>
  )
}

export default function Flights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [state, setState] = useState<'loading' | 'ready'>('loading')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch('/api/portal/flights', { cache: 'no-store' })
        const json = await res.json()
        if (!active) return
        const loaded: Flight[] = Array.isArray(json.flights) ? json.flights : []
        setFlights(loaded.length ? loaded : [{ ...BLANK }])
      } catch {
        if (active) setFlights([{ ...BLANK }])
      } finally {
        if (active) setState('ready')
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const update = useCallback((i: number, patch: Partial<Flight>) => {
    setFlights(prev => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)))
    setSavedAt('')
  }, [])

  const addRow = () => setFlights(prev => [...prev, { ...BLANK }])
  const removeRow = (i: number) => setFlights(prev => prev.filter((_, idx) => idx !== i))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/portal/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flights }),
      })
      if (!res.ok) throw new Error('save failed')
      const json = await res.json()
      if (Array.isArray(json.flights)) setFlights(json.flights)
      setSavedAt(new Date().toLocaleTimeString())
    } catch {
      setError('Could not save just now. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
      <h3 style={{ margin: 0, color: '#1E3A5F', fontFamily: 'Georgia, serif', fontSize: 18 }}>
        ✈️ Your Flights
      </h3>
      <p style={{ margin: '8px 0 16px', color: '#64748B', fontSize: 13, lineHeight: 1.5 }}>
        Add your flights and we’ll keep an eye on them, so if anything changes we can help you stay
        on plan. Easiest option: forward your airline confirmation to{' '}
        <a href={`mailto:${FORWARD_TO}`} style={{ color: '#1E3A5F', fontWeight: 600 }}>{FORWARD_TO}</a>{' '}
        and we’ll take it from there. Or type the details in below.
      </p>

      {state === 'loading' ? (
        <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading…</p>
      ) : (
        <>
          <datalist id="gg-airlines">
            {AIRLINE_NAMES.map(n => (
              <option key={n} value={n} />
            ))}
          </datalist>
          {flights.map((f, i) => (
            <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ fontSize: 12, color: '#64748B' }}>
                  Direction
                  <select
                    value={f.direction}
                    onChange={e => update(i, { direction: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="arrival">Flying in (arrival)</option>
                    <option value="departure">Flying home (departure)</option>
                  </select>
                </label>
                <label style={{ fontSize: 12, color: '#64748B' }}>
                  Flight date
                  <input
                    type="date"
                    value={f.date}
                    onChange={e => update(i, { date: e.target.value })}
                    style={inputStyle}
                  />
                </label>
                <label style={{ fontSize: 12, color: '#64748B' }}>
                  Airline
                  <input
                    value={f.airline}
                    onChange={e => update(i, { airline: e.target.value })}
                    placeholder="Delta"
                    list="gg-airlines"
                    style={inputStyle}
                  />
                </label>
                <label style={{ fontSize: 12, color: '#64748B' }}>
                  Flight number
                  <input
                    value={f.flightNumber}
                    onChange={e => update(i, { flightNumber: e.target.value })}
                    placeholder="DL 1234"
                    style={inputStyle}
                  />
                </label>
              </div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginTop: 12 }}>
                Notes (optional)
                <input
                  value={f.notes}
                  onChange={e => update(i, { notes: e.target.value })}
                  placeholder="Layover in ATL, confirmation ABC123"
                  style={inputStyle}
                />
              </label>

              <AirlineTips airline={f.airline} />

              {flights.length > 1 && (
                <button onClick={() => removeRow(i)} style={linkBtn}>Remove</button>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={addRow} style={secondaryBtn}>+ Add another flight</button>
            <button onClick={save} disabled={saving} style={primaryBtn}>
              {saving ? 'Saving…' : 'Save flights'}
            </button>
            {savedAt && <span style={{ color: '#166534', fontSize: 13 }}>Saved at {savedAt}</span>}
            {error && <span style={{ color: '#DC2626', fontSize: 13 }}>{error}</span>}
          </div>

          <p style={{ margin: '14px 0 0', color: '#94A3B8', fontSize: 11, lineHeight: 1.5 }}>
            We watch flights as a courtesy and will do our best to flag changes, but always confirm
            status with your airline directly. Your details are stored securely on your booking for
            your concierge to review.
          </p>
        </>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: 4,
  padding: '8px 10px',
  border: '1px solid #CBD5E1',
  borderRadius: 8,
  fontSize: 14,
  color: '#1E293B',
  boxSizing: 'border-box',
}

const primaryBtn: React.CSSProperties = {
  background: '#D4AF37',
  color: '#1E3A5F',
  border: 'none',
  borderRadius: 8,
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
}

const secondaryBtn: React.CSSProperties = {
  background: '#F1F5F9',
  color: '#1E3A5F',
  border: '1px solid #CBD5E1',
  borderRadius: 8,
  padding: '10px 16px',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
}

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#94A3B8',
  fontSize: 12,
  cursor: 'pointer',
  marginTop: 8,
  padding: 0,
  textDecoration: 'underline',
}
