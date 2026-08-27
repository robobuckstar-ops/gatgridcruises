'use client'

// One-click "add to calendar" for the dates that matter on a Disney cruise:
// sail day, the day online check-in opens (tier-based), and the return day.
// Pure client-side — builds Google Calendar links and downloadable .ics files,
// so there's no backend to babysit. Works with Apple, Google, and Outlook.

interface CalendarInvitesProps {
  sailingIso: string
  returnIso: string
  /** Day online check-in opens (already tier-adjusted upstream). */
  checkInIso: string
  shipLabel: string
  itinerary: string
}

interface CalEvent {
  title: string
  /** All-day event start, YYYY-MM-DD. */
  date: string
  description: string
}

// YYYY-MM-DD -> YYYYMMDD
function compact(iso: string): string {
  return iso.replace(/-/g, '')
}

// All-day events need an exclusive end date (the next day).
function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

function googleUrl(ev: CalEvent): string {
  const dates = `${compact(ev.date)}/${compact(nextDay(ev.date))}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates,
    details: ev.description,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function icsHref(ev: CalEvent): string {
  const uid = `${compact(ev.date)}-${Math.random().toString(36).slice(2)}@gatgridcruises.com`
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GatGrid Cruises//Portal//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(ev.date)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(ev.date))}`,
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${ev.description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'))
}

export default function CalendarInvites({
  sailingIso,
  returnIso,
  checkInIso,
  shipLabel,
  itinerary,
}: CalendarInvitesProps) {
  const trip = [shipLabel, itinerary].filter(Boolean).join(' — ') || 'your Disney cruise'

  const events: CalEvent[] = [
    checkInIso && {
      title: 'Disney online check-in opens 🛳️',
      date: checkInIso,
      description: `Online check-in for ${trip} opens today at 12:01 AM Eastern. Log in right away for the best boarding group and to grab Castaway Cay and dining reservations before they fill up.`,
    },
    sailingIso && {
      title: `Set sail: ${trip} ⚓`,
      date: sailingIso,
      description: `Embarkation day for ${trip}. Bring your passports and check-in documents. Bon voyage!`,
    },
    returnIso && {
      title: `Return home from ${shipLabel || 'your cruise'} 🏠`,
      date: returnIso,
      description: `Debarkation day for ${trip}.`,
    },
  ].filter(Boolean) as CalEvent[]

  if (!events.length) return null

  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
      <h3 style={{ margin: 0, color: '#1E3A5F', fontFamily: 'Georgia, serif', fontSize: 18 }}>
        📅 Add Your Key Dates to Your Calendar
      </h3>
      <p style={{ margin: '8px 0 16px', color: '#64748B', fontSize: 13, lineHeight: 1.5 }}>
        One tap adds these to your calendar so nothing sneaks up on you. Check-in day especially —
        the best times and excursions go fast the moment your window opens.
      </p>

      {events.map((ev, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 10,
          }}
        >
          <div style={{ minWidth: 200 }}>
            <div style={{ color: '#1E293B', fontSize: 14, fontWeight: 600 }}>{ev.title}</div>
            <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>
              {new Date(`${ev.date}T00:00:00`).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={googleUrl(ev)} target="_blank" rel="noopener noreferrer" style={btn}>
              Google
            </a>
            <a href={icsHref(ev)} download={`${ev.title.replace(/[^\w]+/g, '-')}.ics`} style={btnAlt}>
              Apple / Outlook
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

const btn: React.CSSProperties = {
  background: '#1E3A5F',
  color: '#fff',
  borderRadius: 8,
  padding: '8px 14px',
  fontWeight: 600,
  fontSize: 13,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

const btnAlt: React.CSSProperties = {
  background: '#F1F5F9',
  color: '#1E3A5F',
  border: '1px solid #CBD5E1',
  borderRadius: 8,
  padding: '8px 14px',
  fontWeight: 600,
  fontSize: 13,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
