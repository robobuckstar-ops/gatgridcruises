'use client'

// The "Traveler Readiness" card on the client dashboard. Each traveler records
// their travel-doc expiration + issuing country and confirms the name matches
// the booking. We flag anything expiring within 6 months of the return date or
// still missing, so the concierge knows who can board. No passport numbers or
// images are collected here.

import { useCallback, useEffect, useState } from 'react'

export interface Traveler {
  name: string
  expiration: string
  country: string
  nameMatches: boolean
}

const BLANK: Traveler = { name: '', expiration: '', country: 'United States', nameMatches: false }

/** True when a passport expiring on `exp` is within 6 months of `returnIso`. */
function expiresTooSoon(exp: string, returnIso: string): boolean {
  if (!exp || !returnIso) return false
  const expDate = new Date(exp + 'T00:00:00')
  const ret = new Date(returnIso + 'T00:00:00')
  if (Number.isNaN(expDate.getTime()) || Number.isNaN(ret.getTime())) return false
  const sixMonthsAfterReturn = new Date(ret)
  sixMonthsAfterReturn.setMonth(sixMonthsAfterReturn.getMonth() + 6)
  return expDate < sixMonthsAfterReturn
}

function issuesFor(t: Traveler, returnIso: string): string[] {
  const issues: string[] = []
  if (!t.name.trim()) issues.push('Add the traveler’s name')
  if (!t.expiration) issues.push('Add the travel-doc expiration date')
  else if (expiresTooSoon(t.expiration, returnIso))
    issues.push('Expires within 6 months of your return — renew before you sail')
  if (t.name.trim() && !t.nameMatches) issues.push('Confirm the name matches the booking exactly')
  return issues
}

export default function TravelerReadiness({ returnDate }: { returnDate: string }) {
  const [travelers, setTravelers] = useState<Traveler[]>([])
  const [state, setState] = useState<'loading' | 'ready'>('loading')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch('/api/portal/readiness', { cache: 'no-store' })
        const json = await res.json()
        if (!active) return
        const loaded: Traveler[] = Array.isArray(json.travelers) ? json.travelers : []
        setTravelers(loaded.length ? loaded : [{ ...BLANK }])
      } catch {
        if (active) setTravelers([{ ...BLANK }])
      } finally {
        if (active) setState('ready')
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const update = useCallback((i: number, patch: Partial<Traveler>) => {
    setTravelers(prev => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)))
    setSavedAt('')
  }, [])

  const addRow = () => setTravelers(prev => [...prev, { ...BLANK }])
  const removeRow = (i: number) => setTravelers(prev => prev.filter((_, idx) => idx !== i))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/portal/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ travelers }),
      })
      if (!res.ok) throw new Error('save failed')
      const json = await res.json()
      if (Array.isArray(json.travelers)) setTravelers(json.travelers)
      setSavedAt(new Date().toLocaleTimeString())
    } catch {
      setError('Could not save just now. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const allClear =
    travelers.length > 0 && travelers.every(t => issuesFor(t, returnDate).length === 0)

  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h3 style={{ margin: 0, color: '#1E3A5F', fontFamily: 'Georgia, serif', fontSize: 18 }}>
          🛂 Traveler Readiness
        </h3>
        {allClear && (
          <span style={{ color: '#166534', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 999, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
            All set
          </span>
        )}
      </div>
      <p style={{ margin: '8px 0 16px', color: '#64748B', fontSize: 13, lineHeight: 1.5 }}>
        For each traveler, confirm the travel document you’ll sail with (a valid passport is
        strongly recommended). We only need the expiration date and issuing country — never your
        passport number. We’ll flag anything that needs attention before your sail date.
      </p>

      {state === 'loading' ? (
        <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading…</p>
      ) : (
        <>
          {travelers.map((t, i) => {
            const issues = issuesFor(t, returnDate)
            return (
              <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label style={{ fontSize: 12, color: '#64748B' }}>
                    Full name (as on the travel doc)
                    <input
                      value={t.name}
                      onChange={e => update(i, { name: e.target.value })}
                      placeholder="Jane A. Smith"
                      style={inputStyle}
                    />
                  </label>
                  <label style={{ fontSize: 12, color: '#64748B' }}>
                    Document expiration date
                    <input
                      type="date"
                      value={t.expiration}
                      onChange={e => update(i, { expiration: e.target.value })}
                      style={inputStyle}
                    />
                  </label>
                  <label style={{ fontSize: 12, color: '#64748B' }}>
                    Issuing country
                    <input
                      value={t.country}
                      onChange={e => update(i, { country: e.target.value })}
                      placeholder="United States"
                      style={inputStyle}
                    />
                  </label>
                  <label style={{ fontSize: 13, color: '#334155', display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
                    <input
                      type="checkbox"
                      checked={t.nameMatches}
                      onChange={e => update(i, { nameMatches: e.target.checked })}
                    />
                    Name matches my booking exactly
                  </label>
                </div>

                {issues.length > 0 && (
                  <ul style={{ margin: '10px 0 0', paddingLeft: 18, color: '#B45309', fontSize: 12 }}>
                    {issues.map((msg, k) => (
                      <li key={k} style={{ marginBottom: 2 }}>{msg}</li>
                    ))}
                  </ul>
                )}

                {travelers.length > 1 && (
                  <button onClick={() => removeRow(i)} style={linkBtn}>Remove</button>
                )}
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={addRow} style={secondaryBtn}>+ Add another traveler</button>
            <button onClick={save} disabled={saving} style={primaryBtn}>
              {saving ? 'Saving…' : 'Save readiness'}
            </button>
            {savedAt && <span style={{ color: '#166534', fontSize: 13 }}>Saved at {savedAt}</span>}
            {error && <span style={{ color: '#DC2626', fontSize: 13 }}>{error}</span>}
          </div>

          <p style={{ margin: '14px 0 0', color: '#94A3B8', fontSize: 11, lineHeight: 1.5 }}>
            Your information is stored securely on your booking record for your concierge to review.
            We take reasonable measures to protect it but cannot guarantee absolute security, so
            please don’t include passport numbers or photos here.
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
