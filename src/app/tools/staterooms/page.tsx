import { Metadata } from 'next'
import { getShips, getStateroomsForShip } from '@/lib/data'
import { StateroomFinder } from './stateroom-finder'

export const metadata: Metadata = {
  title: 'Stateroom Finder — Pick the Perfect Disney Cruise Stateroom',
  description: 'Find your ideal Disney cruise stateroom with noise ratings, view ratings, and honest pros/cons for every room.',
}

export default function StateroomsPage() {
  const ships = getShips()
  // For MVP, we only have staterooms for the Wish
  const allStateroomsByShip: Record<string, any[]> = {}
  ships.forEach(ship => {
    const rooms = getStateroomsForShip(ship.id)
    if (rooms.length > 0) {
      allStateroomsByShip[ship.id] = rooms
    }
  })

  return <StateroomFinder ships={ships} stateroomsByShip={allStateroomsByShip} />
}
