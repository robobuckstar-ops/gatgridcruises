import { Metadata } from 'next'
import { getSailings, getPorts } from '@/lib/data'
import { FlightFinder } from './flight-finder'

export const metadata: Metadata = {
  title: 'Flight Finder — Find Flights to Your Cruise Port',
  description: 'Find the best flights to your Disney cruise departure port. Get arrival time recommendations and booking links.',
}

export default function FlightsPage() {
  const sailings = getSailings()
  const ports = getPorts()

  const sailingOptions = sailings.map(s => ({
    id: s.id,
    label: `${s.itinerary_name} — ${new Date(s.sail_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    sailDate: s.sail_date,
    portId: s.departure_port_id,
    portName: s.departure_port?.name ?? '',
  }))

  const portOptions = ports.map(p => ({
    id: p.id,
    name: p.name,
    code: p.code,
    airports: p.nearest_airports,
  }))

  return <FlightFinder sailings={sailingOptions} ports={portOptions} />
}
