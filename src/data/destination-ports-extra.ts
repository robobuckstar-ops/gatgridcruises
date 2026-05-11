/**
 * Extended destination port guides — every additional cruise stop that appears
 * in Disney Cruise Line itineraries beyond the 6 in-depth flagship guides in
 * destination-ports.ts. Each port still uses the full DestinationPort schema so
 * the dynamic /ports/[slug] page renders consistently across the catalog.
 *
 * Editorial. GatGrid is an info/discovery site; do not add booking/price-match
 * language. Content is factual and travel-oriented.
 */

import type { DestinationPort } from './destination-ports'

import { caribbeanPorts } from './destination-ports/caribbean'
import { mexicoPorts } from './destination-ports/mexico-pacific'
import { alaskaPorts } from './destination-ports/alaska'
import { norwayDenmarkPorts } from './destination-ports/norway-denmark'
import { britishIslesPorts } from './destination-ports/british-isles'
import { iberianPorts } from './destination-ports/iberian'
import { mediterraneanPorts } from './destination-ports/mediterranean'
import { homePorts } from './destination-ports/home-ports'

export const extraDestinationPorts: DestinationPort[] = [
  ...caribbeanPorts,
  ...mexicoPorts,
  ...alaskaPorts,
  ...norwayDenmarkPorts,
  ...britishIslesPorts,
  ...iberianPorts,
  ...mediterraneanPorts,
  ...homePorts,
]
