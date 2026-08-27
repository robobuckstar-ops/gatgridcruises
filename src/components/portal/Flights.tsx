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
