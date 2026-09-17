import type { DestinationPort } from '../destination-ports'

const CARIBBEAN_SHIPS = [
  { name: 'Disney Magic', slug: 'disney-magic' },
  { name: 'Disney Wonder', slug: 'disney-wonder' },
  { name: 'Disney Dream', slug: 'disney-dream' },
  { name: 'Disney Fantasy', slug: 'disney-fantasy' },
  { name: 'Disney Wish', slug: 'disney-wish' },
  { name: 'Disney Treasure', slug: 'disney-treasure' },
  { name: 'Disney Destiny', slug: 'disney-destiny' },
]

export const caribbeanPorts: DestinationPort[] = [
  {
    slug: 'tortola',
    name: 'Tortola, British Virgin Islands',
    shortName: 'Tortola',
    country: 'British Virgin Islands',
    region: 'Caribbean',
    flag: '🇻🇬',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'USD',
    language: 'English',
    heroTagline: 'Quiet, scenic, and the gateway to the BVI sailing playground — Tortola is the calmest of Disney\'s Caribbean stops.',
    metaTitle: 'Tortola, BVI Disney Cruise Port Guide — Things to Do, Excursions & Tips',
    metaDescription:
      'Complete Tortola cruise port guide for Disney cruisers. Top excursions including Virgin Gorda Baths, snorkeling, beaches, family tips, and money-saving tricks for your Road Town port day.',
    seoKeywords: [
      'disney cruise tortola guide',
      'tortola excursions',
      'virgin gorda baths disney cruise',
      'road town tortola tips',
      'tortola beaches disney',
    ],
    overview: [
      'Tortola is the largest of the British Virgin Islands and Disney ships dock at Road Town\'s cruise pier on the south side of the island. The BVI is one of the world\'s best small-boat sailing destinations, which is why the marquee shore experiences are catamaran day trips to neighboring islands rather than anything inside Road Town itself.',
      'The town immediately outside the pier is genuinely sleepy by Caribbean standards — there\'s a small straw market, a few duty-free shops, and a handful of bars, but most cruisers will want to leave Road Town behind. The two best port-day moves are a catamaran to Virgin Gorda\'s Baths or a beach taxi over the mountain ridge to Cane Garden Bay.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Road Town)', icon: '⚓' },
      { label: 'To Cane Garden Bay', value: '15 min taxi', icon: '🚕' },
      { label: 'Currency', value: 'USD', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
      { label: 'Best For', value: 'Sailing & beaches', icon: '⛵' },
    ],
    thingsToDo: [
      {
        name: 'The Baths at Virgin Gorda',
        category: 'Adventure',
        duration: '6–7 hours',
        cost: '$130–$160 per person',
        description: 'A catamaran ride to Virgin Gorda followed by a guided scramble through massive granite boulders that form sea-pool grottos. Easily the BVI\'s most famous attraction and the experience most repeat cruisers say is non-negotiable in Tortola.',
        bestFor: 'Active families with kids 7+',
      },
      {
        name: 'Cane Garden Bay Beach',
        category: 'Beach',
        duration: '4–6 hours',
        cost: '$15–$20 taxi each way',
        description: 'A long, palm-fringed crescent of white sand on the north side of the island, 15 minutes by taxi over the ridge. Calm water, beach bars, chair rentals, and far more affordable than booking a beach excursion through Disney.',
        bestFor: 'Families wanting a real Caribbean beach day on a budget',
      },
      {
        name: 'Norman Island Snorkel & Caves',
        category: 'Snorkeling',
        duration: '4 hours',
        cost: '$95–$120 per person',
        description: 'Boat trip to the island that allegedly inspired Treasure Island. Snorkel into shallow sea caves where Spanish galleons supposedly hid gold. Easy snorkeling, great visibility, and a memorable story for kids.',
        bestFor: 'Snorkelers, history-curious families',
      },
      {
        name: 'Sage Mountain National Park',
        category: 'Hiking',
        duration: '3–4 hours',
        cost: 'Free (park) / $40 taxi round trip',
        description: 'The highest point in the BVI at 1,716 feet. A short rainforest trail loop with panoramic views over the British and US Virgin Islands. Cooler than the beach and easy with kids who hike.',
        bestFor: 'Hiking families with older kids',
      },
    ],
    excursionGuidance:
      'Virgin Gorda Baths trips run on a tight timeline — boats have to catch their return slot to make the all-aboard. Booking through Disney is the safe play here. For straightforward beach taxis and town wandering, you save real money skipping the excursion desk entirely.',
    excursions: [
      {
        name: 'Disney Virgin Gorda Baths Tour',
        source: 'disney',
        cost: '$155 adult / $115 child',
        description: 'Catamaran transport, snorkel gear, and the guided Baths scramble. Disney holds the ship for you if the boat runs late.',
        tip: 'Wear water shoes — the boulder scramble is slippery and includes shallow wading.',
      },
      {
        name: 'Independent Cane Garden Bay Taxi Beach Day',
        source: 'independent',
        cost: '$30–$40 per family round trip + chair rentals',
        description: 'Walk past the taxi dispatch booth outside the pier, agree on a round-trip fare, and have the driver pick you up at a set time. Most cruisers do this with no problem.',
        tip: 'Have your driver give you their cell number — easier than waiting at a designated stand.',
      },
    ],
    dining: [
      {
        name: 'Pusser\'s Pub',
        category: 'Bar & Grill',
        location: 'Road Town waterfront',
        description: 'The British-rum pub on the Road Town waterfront. Famous for the "Painkiller" cocktail (invented at Pusser\'s sister bar on Jost Van Dyke) and respectable burgers and fish-and-chips.',
      },
      {
        name: 'Myett\'s Garden & Grill',
        category: 'Caribbean',
        location: 'Cane Garden Bay',
        description: 'Beachfront restaurant at Cane Garden Bay with grilled fish, jerk chicken, and a tropical garden setting steps from the sand. The reason families extend their beach day past lunch.',
      },
    ],
    familyTips: [
      'The walk from the pier to Pusser\'s and the straw market is about 8 minutes along the waterfront — flat and stroller-friendly.',
      'Taxis in the BVI are shared minivans, not metered cars. Confirm the per-person fare before getting in.',
      'There\'s no large grocery store near the pier — bring snacks and water from the ship if you\'re heading to a beach.',
    ],
    insiderTips: [
      {
        title: 'The free public beach across from the pier',
        detail: 'Brandywine Beach is a small, lightly-used public beach about 10 minutes by taxi east of Road Town — a quiet alternative if you don\'t want to commit to a half-day at Cane Garden Bay.',
      },
      {
        title: 'Painkillers travel',
        detail: 'Pusser\'s sells boxed cocktail kits at the gift shop — the actual rum is duty-free on the island, so you save several dollars per bottle versus US prices.',
      },
    ],
    bestTimeSummary:
      'Tortola is best between December and April, when the trade winds are steady and rain showers are short. May through November overlaps with Atlantic hurricane season; Disney rarely scrubs the Tortola stop, but afternoon squalls are common.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: '80s, low humidity, dry', crowds: 'Higher (peak season)', note: 'Best weather window' },
      { months: 'May – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate', note: 'Quick afternoon showers' },
      { months: 'Sep – Nov', weather: '80s, wet', crowds: 'Lowest', note: 'Hurricane-season risk' },
    ],
    weatherSummary:
      'Tortola sits in the trade-wind belt and rarely gets the prolonged downpours that hit Florida — even rainy-season port days usually offer a long sunny stretch for the beach.',
    gettingAround: [
      { method: 'Open-air "safari" taxis', cost: '$5–$8 per person to town beaches', description: 'Shared minivans that depart when full. The standard way to move around the island; cheapest if you can fill seats.' },
      { method: 'Private taxi', cost: '$40+ round trip', description: 'Negotiate a flat round-trip rate to a specific beach with pickup at a set time. Easier with small kids.' },
      { method: 'Walking', cost: 'Free', description: 'The waterfront, straw market, and Pusser\'s Pub are all within a 10-minute flat walk of the pier.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 4),
    faqs: [
      {
        question: 'Do I need a passport for Tortola?',
        answer: 'Yes — Tortola is a British Overseas Territory, and US passport books are required even on closed-loop sailings (Disney enforces this stricter than the legal minimum). Make sure your passport is valid for at least 6 months past your return date.',
      },
      {
        question: 'Is there a beach walking distance from the pier?',
        answer: 'Not really. The waterfront near the pier has a small park and Pusser\'s Pub, but the nearest swimmable beach (Brandywine) is a 10-minute taxi east. Cane Garden Bay over the ridge is the real beach play.',
      },
      {
        question: 'Can I do the Baths on my own without a Disney excursion?',
        answer: 'It\'s possible — the public ferry runs from Road Town to Virgin Gorda — but the timing is tight and a missed ferry means a missed ship. Most independent travelers book a private catamaran charter rather than relying on the ferry.',
      },
    ],
  },

  {
    slug: 'falmouth-jamaica',
    name: 'Falmouth, Jamaica',
    shortName: 'Falmouth',
    country: 'Jamaica',
    region: 'Caribbean',
    flag: '🇯🇲',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'Jamaican Dollar (JMD) — USD widely accepted',
    language: 'English / Patois',
    heroTagline: 'A purpose-built cruise pier with Jamaica\'s most famous beaches and waterfalls a short ride away.',
    metaTitle: 'Falmouth, Jamaica Disney Cruise Port Guide — Things to Do & Tips',
    metaDescription:
      'Falmouth cruise port guide for Disney cruisers. Dunn\'s River Falls, Doctor\'s Cave Beach, Bob Marley sites, family tips, and money-saving advice for your Jamaica port day.',
    seoKeywords: [
      'disney cruise falmouth jamaica',
      'dunns river falls disney cruise',
      'falmouth excursions',
      'jamaica cruise port tips',
    ],
    overview: [
      'Falmouth is a purpose-built cruise pier on Jamaica\'s north coast, halfway between Ocho Rios and Montego Bay. The terminal complex inside the gates is heavily managed — shops, bars, and a Jimmy Buffett\'s Margaritaville — and feels like an outdoor mall pretending to be a town. The actual historic town of Falmouth sits just outside the gates and is worth a quick wander for the Georgian architecture.',
      'The reason to come to Falmouth is the day-trip access to Jamaica\'s headline attractions: Dunn\'s River Falls (an hour east), Doctor\'s Cave Beach in Montego Bay (45 minutes west), or a Blue Hole excursion in the interior. Few people fly back to Jamaica to see Falmouth itself — most cruisers leave the pier complex within 30 minutes of disembarking.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier', icon: '⚓' },
      { label: 'To Dunn\'s River Falls', value: '~1 hour drive', icon: '🚗' },
      { label: 'To Montego Bay', value: '~45 min drive', icon: '🚗' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Dunn\'s River Falls',
        category: 'Adventure',
        duration: '6–7 hours total',
        cost: '$120–$155 per person',
        description: 'The 600-foot terraced waterfall you\'ve seen on every Jamaica brochure. Guides lead human chains up the cascading limestone steps. Crowded, touristy, and genuinely fun — kids old enough to hold a chain love it.',
        bestFor: 'Active families with kids 6+',
      },
      {
        name: 'Doctor\'s Cave Beach',
        category: 'Beach',
        duration: '5–6 hours',
        cost: '$40–$70 transport + $8 entry',
        description: 'Montego Bay\'s prettiest public beach, with calm turquoise water, chair rentals, and beach bars. Less of a manufactured cruise-port experience than the Falmouth complex.',
        bestFor: 'Families who want a real Caribbean beach',
      },
      {
        name: 'Bob Marley Nine Mile',
        category: 'Cultural',
        duration: '6 hours',
        cost: '$95–$120 per person',
        description: 'Drive into the mountains to the small village where Bob Marley was born and is buried. A guided tour of his childhood home, recording studio, and gravesite, usually with reggae playing throughout.',
        bestFor: 'Music fans, teens, cultural travelers',
      },
      {
        name: 'Blue Hole & Secret Falls',
        category: 'Adventure',
        duration: '6–7 hours',
        cost: '$110–$140 per person',
        description: 'A series of mountain swimming holes and small waterfalls less crowded than Dunn\'s River. Rope swings, cliff jumps (optional), and a more authentic feel. Increasingly recommended as the locals\' choice.',
        bestFor: 'Adventurous teens and adults',
      },
    ],
    excursionGuidance:
      'Jamaica is one of the few Caribbean ports where booking through Disney has clear safety advantages. Independent operators run cheaper, but the drive to Dunn\'s River or Montego Bay is long, and a missed return doesn\'t leave easy options. For first-time Jamaica visitors and families with small kids, the Disney premium is worth it. Experienced travelers can save 30–40% with a vetted independent operator like Glamour Tours.',
    excursions: [
      {
        name: 'Disney Dunn\'s River Falls Climb',
        source: 'disney',
        cost: '$130 adult / $99 child',
        description: 'Bus transport, falls climb with guide, water shoes, and beach time afterward. Disney guarantees the ship will wait if traffic delays the return.',
        tip: 'Wear quick-drying clothes. Water shoes are included with the excursion but you can also bring your own.',
      },
      {
        name: 'Independent Montego Bay Beach',
        source: 'independent',
        cost: '$60–$80 per family round trip taxi',
        description: 'Outside the gate, agree on a flat round-trip fare to Doctor\'s Cave Beach with a set pickup time. Same drivers do this run daily and know cruise schedules.',
        tip: 'Only use the official red-shirted taxi drivers inside the pier complex — they\'re vetted by the port authority.',
      },
    ],
    dining: [
      {
        name: 'Jimmy Buffett\'s Margaritaville',
        category: 'American Bar',
        location: 'Inside Falmouth pier complex',
        description: 'A reliable family-friendly stop inside the terminal with predictable American food, a kid pool, and a waterslide. Not a Jamaican experience but easy with small kids.',
      },
      {
        name: 'Pier 1 Marina Restaurant',
        category: 'Jamaican',
        location: 'Falmouth town, 5 min walk',
        description: 'Just outside the pier gates — jerk chicken, escovitch fish, festival bread. Cheaper and more authentic than anything in the terminal complex.',
      },
    ],
    familyTips: [
      'Most beach excursions and falls climbs are wet — pack a dry bag and a change of clothes.',
      'The Falmouth pier complex itself is fine for kids who don\'t want to leave the gates — Margaritaville\'s pool and slide are free with food purchase.',
      'Avoid offers from unofficial guides outside the gates. Stick with the marked red-shirted taxi dispatch.',
    ],
    insiderTips: [
      {
        title: 'Smaller alternative falls',
        detail: 'If Dunn\'s River sounds too crowded, Blue Hole and Mayfield Falls are smaller, less-touristy alternatives that get similar reviews from repeat Jamaica visitors.',
      },
      {
        title: 'Skip the local shopping',
        detail: 'The "duty-free" Jimmy Buffett\'s gift shop and pier vendors mark up everything significantly. Real Blue Mountain coffee is half the price at the small shops on Falmouth\'s Water Square.',
      },
    ],
    bestTimeSummary:
      'Jamaica\'s north coast is reliably warm year-round with the best weather November through April. Summer brings heavier rain and more humidity but still plenty of beach time. September–October overlaps with hurricane season.',
    weatherWindows: [
      { months: 'Nov – Apr', weather: '80s, low humidity, dry', crowds: 'High (peak season)' },
      { months: 'May – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate', note: 'Afternoon showers common' },
      { months: 'Sep – Oct', weather: 'Mid-80s, wet', crowds: 'Lowest', note: 'Hurricane risk peak' },
    ],
    weatherSummary: 'Falmouth itself is reliably warm — even in winter, daytime highs sit in the low 80s. Pack reef-safe sunscreen; Jamaica\'s sun is strong.',
    gettingAround: [
      { method: 'Pier taxi (red shirts)', cost: '$40+ round trip negotiated', description: 'Official port-authority taxis dispatched inside the pier complex. Always agree on a flat fare and pickup time before getting in.' },
      { method: 'Disney bus excursions', cost: 'Included in tour price', description: 'Bus transport included with any Disney shore excursion — easiest with small kids and the safest return guarantee.' },
      { method: 'Walking', cost: 'Free', description: 'Falmouth historic town is just outside the pier gates — flat, walkable, and has the most authentic Jamaican flavor inside an hour from the ship.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 4),
    faqs: [
      {
        question: 'Is it safe to leave the pier on my own?',
        answer: 'Within the immediate Falmouth town area and with the official red-shirted taxis, yes. Most cruisers do this without issue. The longer drives to Dunn\'s River or Montego Bay involve crossing parts of Jamaica that are more comfortable with a guided tour.',
      },
      {
        question: 'Is Dunn\'s River Falls too hard for kids?',
        answer: 'Kids 6 and up generally do fine — the climb is a guided human-chain up shallow water terraces, not a real rock-climbing route. Kids under 6 can ride on a parent\'s shoulders for the steeper sections, though most parents skip the climb at that age.',
      },
      {
        question: 'Can I use Jamaican dollars?',
        answer: 'No need — every business that deals with cruisers prices in USD. You\'ll often get JMD back as change. Keep small US bills for tips.',
      },
    ],
  },

  {
    slug: 'puerto-plata',
    name: 'Puerto Plata, Dominican Republic',
    shortName: 'Puerto Plata',
    country: 'Dominican Republic',
    region: 'Caribbean',
    flag: '🇩🇴',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'Dominican Peso — USD accepted at major attractions',
    language: 'Spanish',
    heroTagline: 'Disney\'s newest Caribbean stop — Amber Cove\'s manicured cruise complex sits next to genuine Dominican mountain and beach country.',
    metaTitle: 'Puerto Plata Disney Cruise Port Guide — Amber Cove, Excursions & Tips',
    metaDescription:
      'Puerto Plata (Amber Cove) Disney cruise port guide. Mountain cable cars, beach clubs, Cabarete kitesurf coast, family tips, and excursion advice for your Dominican Republic port day.',
    seoKeywords: [
      'disney cruise puerto plata',
      'amber cove cruise port',
      'puerto plata excursions',
      'dominican republic disney cruise',
    ],
    overview: [
      'Most Disney sailings to the Dominican Republic dock at Amber Cove, a Carnival-owned cruise complex about 8 miles west of Puerto Plata. The pier complex includes pools, zip lines, a beach club, restaurants, and a controlled-experience feel — many families never leave the gates and have a perfectly good day.',
      'The Puerto Plata region itself offers more variety than a single port day can cover — a cable car up Mount Isabel de Torres, a colonial-era fort, the kitesurf town of Cabarete, and several proper beach resorts. Anyone who likes the look of Dominican mountains over a pool complex should leave the gates.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Amber Cove)', icon: '⚓' },
      { label: 'To Puerto Plata', value: '20 min', icon: '🚗' },
      { label: 'To Cabarete', value: '45 min', icon: '🚗' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'Spanish', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Amber Cove Beach & Pool Complex',
        category: 'Beach Club',
        duration: '4–9 hours',
        cost: 'Free (entry included with cruise)',
        description: 'The pier complex itself is a polished beach-and-pool day with zip lines, water slides, swim-up bars, and a small beach. The default move for families with small kids who don\'t want a long drive.',
        bestFor: 'Families with young kids',
      },
      {
        name: 'Mount Isabel de Torres Cable Car',
        category: 'Sightseeing',
        duration: '4–5 hours',
        cost: '$50–$70 per person',
        description: 'A teleférico ride up 2,600 feet to a 19th-century replica of Rio\'s Christ statue, with views over the Puerto Plata coast. The Dominican Republic\'s only cable car and a quick hit if you want a non-beach activity.',
        bestFor: 'Sightseers, families with mobility limits',
      },
      {
        name: '27 Charcos de Damajagua',
        category: 'Adventure',
        duration: '6–7 hours',
        cost: '$95–$130 per person',
        description: 'A guided climb up 27 (or 7, or 12 — you choose) river waterfalls, with jumps and natural slides at each level. Best adventure excursion in the DR and a regular highlight for repeat Caribbean cruisers.',
        bestFor: 'Active families with kids 10+',
      },
      {
        name: 'Cabarete Beach Day',
        category: 'Beach',
        duration: '5–6 hours',
        cost: '$60–$80 per family round-trip taxi',
        description: 'A 45-minute drive east to the kitesurf capital of the Caribbean. Long sandy beach with windsurfing schools, beach restaurants, and a far more local Dominican vibe than Amber Cove.',
        bestFor: 'Older kids, teens, watersports families',
      },
    ],
    excursionGuidance:
      'For Amber Cove pool days, no excursion is needed — you can walk off and stay all day. For longer trips (Damajagua, Cabarete), Disney charges 30–50% over independent rates but guarantees return. The drives in the DR are slower than Disney\'s schedules suggest, so the cushion is meaningful.',
    excursions: [
      {
        name: 'Disney 27 Waterfalls of Damajagua',
        source: 'disney',
        cost: '$129 adult / $99 child',
        description: 'Bus transport, mandatory guide, helmets and life vests, and post-climb lunch. Disney holds the ship if the bus runs late.',
        tip: 'You can choose to climb 7, 12, or 27 levels depending on family endurance. 7 is plenty for first-timers with kids.',
      },
      {
        name: 'Cabarete Beach Independent Taxi',
        source: 'independent',
        cost: '$60–$80 per family round trip',
        description: 'Walk out the Amber Cove gate to the official taxi rank. Negotiate a flat round-trip with set pickup time.',
        tip: 'There\'s no shade at Cabarete\'s town beach — rent a beachfront chair from one of the restaurants for the day.',
      },
    ],
    dining: [
      {
        name: 'Coco Cana',
        category: 'Caribbean',
        location: 'Inside Amber Cove complex',
        description: 'The main sit-down restaurant inside Amber Cove with Caribbean and American dishes. Solid burgers, OK Dominican rice plates, and a kid menu.',
      },
      {
        name: 'La Casita de Don Pepe',
        category: 'Dominican',
        location: 'Puerto Plata town, 20 min drive',
        description: 'A long-running family-run Dominican restaurant in the city — sancocho, mofongo, fried plantains. The reason to leave the pier complex if you want real local food.',
      },
    ],
    familyTips: [
      'Amber Cove charges for cabana rentals but loungers and pool chairs are free.',
      'The pier complex has free WiFi for cruise passengers — useful for staying in touch without buying ship internet.',
      'There\'s a free shuttle within the complex between the cruise pier and the beach side; with small kids and a stroller it\'s worth using.',
    ],
    insiderTips: [
      {
        title: 'Pool is better than the beach',
        detail: 'Amber Cove\'s small beach has murky water — the pools are the better swim spot inside the complex. The good beaches are 20+ minutes away by taxi.',
      },
      {
        title: 'Buy real Dominican amber',
        detail: 'Amber and larimar are local Dominican specialties — buy from the small co-op shop outside the gates in Puerto Plata, not the duty-free vendors inside Amber Cove.',
      },
    ],
    bestTimeSummary:
      'The Dominican Republic is warm year-round. December through April is driest and least humid. Summer brings short heavy showers; September–October has the highest hurricane risk.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: 'Low 80s, dry', crowds: 'High', note: 'Best window' },
      { months: 'May – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate', note: 'Quick showers' },
      { months: 'Sep – Oct', weather: 'Mid-80s, wet', crowds: 'Lowest', note: 'Hurricane risk peak' },
    ],
    weatherSummary: 'The Atlantic-facing north coast catches more rain than the south, but most cruise days still deliver long sunny stretches.',
    gettingAround: [
      { method: 'Pier shuttle', cost: 'Free', description: 'Small electric carts shuttle inside Amber Cove between the pier and beach area.' },
      { method: 'Authorized taxis', cost: '$20–$80 depending on destination', description: 'Dispatched outside the Amber Cove gates with set rates posted on a board.' },
      { method: 'Walking', cost: 'Free', description: 'Everything inside the Amber Cove complex is walkable in under 15 minutes.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 4),
    faqs: [
      {
        question: 'Do I need a passport for Puerto Plata?',
        answer: 'Yes — Disney requires a US passport book for any Dominican Republic stop. Make sure it\'s valid 6 months past your return date.',
      },
      {
        question: 'Is the food and water in the pier complex safe?',
        answer: 'Yes — Amber Cove uses bottled and filtered water for all food prep and drinks. Outside the complex, stick to bottled water and avoid uncooked street food unless you\'re experienced traveling in Latin America.',
      },
      {
        question: 'Can I use Dominican pesos?',
        answer: 'You\'ll rarely need to. Every cruise-facing business takes USD. Carry small bills ($1, $5) for tips.',
      },
    ],
  },

  {
    slug: 'philipsburg-st-maarten',
    name: 'Philipsburg, St. Maarten',
    shortName: 'St. Maarten',
    country: 'St. Maarten (Dutch) / Saint-Martin (French)',
    region: 'Caribbean',
    flag: '🇸🇽',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'USD widely accepted (Euro on French side)',
    language: 'English (Dutch side) / French',
    heroTagline: 'Two countries on one small island — and a famous airplane-landing beach you\'ve definitely seen on Instagram.',
    metaTitle: 'Philipsburg, St. Maarten Disney Cruise Port Guide — Things to Do & Tips',
    metaDescription:
      'St. Maarten cruise port guide for Disney cruisers. Maho Beach plane spotting, Orient Beach, snorkeling, family tips, and excursion advice for your Philipsburg port day.',
    seoKeywords: [
      'disney cruise st maarten',
      'philipsburg port guide',
      'maho beach planes disney cruise',
      'st maarten excursions',
    ],
    overview: [
      'Philipsburg is the capital of the Dutch half of St. Maarten — the island is split between a Dutch and French side, with no border control between them. Disney ships dock at A.C. Wathey Pier on the Dutch side, with a short water taxi or 20-minute walk into Philipsburg\'s shopping waterfront.',
      'St. Maarten has more variety than any other small Caribbean island Disney visits: you can shop on the Dutch waterfront, sunbathe under jumbo jets at Maho Beach, eat French pastries on the Orient Beach side, or snorkel a marine park — all in a single port day if you start early.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Dutch side)', icon: '⚓' },
      { label: 'To Philipsburg town', value: '20 min walk / 5 min water taxi', icon: '⛴️' },
      { label: 'To Maho Beach', value: '20 min taxi', icon: '✈️' },
      { label: 'Currency', value: 'USD on Dutch side', icon: '💵' },
      { label: 'Language', value: 'English / French', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Maho Beach (Airplane Spotting)',
        category: 'Beach',
        duration: '3–4 hours',
        cost: '$25–$30 round-trip taxi',
        description: 'The famous beach at the end of Princess Juliana Airport\'s runway. Jumbo jets land directly over the sand. Bring earplugs if you want to stand under a 737 — it\'s loud, but it\'s the photo every cruiser takes.',
        bestFor: 'Plane spotters, teens, photographers',
      },
      {
        name: 'Orient Beach',
        category: 'Beach',
        duration: '5–6 hours',
        cost: '$30–$40 round-trip taxi',
        description: 'A two-mile crescent of white sand on the French side. The northern end is famously clothing-optional; the family-friendly sections are in the center. Long, soft sand and calm water — many cruisers\' favorite Caribbean beach.',
        bestFor: 'Family beach day on the French side',
      },
      {
        name: 'Philipsburg Front Street Shopping',
        category: 'Shopping',
        duration: '1–3 hours',
        cost: 'Free entry',
        description: 'A car-free shopping strip along Philipsburg\'s waterfront. Duty-free jewelry, liquor, electronics, and Caribbean souvenirs. Less aggressive than Nassau\'s Bay Street and prettier with the harbor backdrop.',
        bestFor: 'Souvenir shopping, easy half-day option',
      },
      {
        name: 'Marigot French Quarter & Market',
        category: 'Cultural',
        duration: '3–4 hours',
        cost: '$30–$40 taxi round trip',
        description: 'The capital of the French side. Open-air markets on Wednesdays and Saturdays sell French cheese, pastries, and Caribbean crafts. The closest you\'ll get to a Parisian café experience on a Disney cruise.',
        bestFor: 'Food-curious families, calmer alternative to Philipsburg',
      },
    ],
    excursionGuidance:
      'St. Maarten has so much within a 30-minute drive that taxis are usually the better play than Disney excursions. The exceptions are catamaran trips to neighboring islands (Anguilla, St. Barths) and the SeaWorld Explorer semi-sub — those genuinely benefit from the Disney scheduling guarantee.',
    excursions: [
      {
        name: 'Disney Catamaran to Anguilla',
        source: 'disney',
        cost: '$145 adult / $115 child',
        description: 'Catamaran across to British Anguilla\'s pristine Shoal Bay beach — consistently rated among the Caribbean\'s top beaches. Includes lunch and snorkel gear.',
        tip: 'Anguilla is a separate country — bring passports even though it\'s a day trip.',
      },
      {
        name: 'Independent Beach Taxi',
        source: 'independent',
        cost: '$10–$15 per person round-trip to Maho or Orient',
        description: 'St. Maarten has fixed-rate posted taxi fares from the pier. Walk to the dispatch booth, name your beach, and pay the posted fare — no haggling.',
        tip: 'Maho works as a half-day before lunch (planes arrive 11am–1pm), then taxi to Orient for the afternoon.',
      },
    ],
    dining: [
      {
        name: 'The Greenhouse',
        category: 'Caribbean',
        location: 'Philipsburg, Front Street',
        description: 'A casual waterfront bar-restaurant on Front Street known for fresh fish, ribs, and a 2-for-1 drink special that runs all day. Easy after a shopping morning.',
      },
      {
        name: 'Sunset Bar & Grill',
        category: 'Bar & Grill',
        location: 'Maho Beach',
        description: 'The bar at the end of the runway. Burgers, fries, and the loudest cocktail-deck view in the Caribbean — they post the airline arrival schedule on a chalkboard.',
      },
    ],
    familyTips: [
      'Use the official posted taxi fares — they\'re cheaper than negotiating, and printed on a board at the dispatch.',
      'Maho Beach gets loud — toddlers and noise-sensitive kids may hate it. Earplugs help.',
      'The water taxi from the pier into Philipsburg town is $7 per person round-trip and saves a 20-minute walk in the sun.',
    ],
    insiderTips: [
      {
        title: 'Cross to the French side for lunch',
        detail: 'Marigot\'s French market and bakeries offer the most authentic non-Caribbean meal on any Disney itinerary — French wine, pastries, and Camembert at a real prix-fixe café.',
      },
      {
        title: 'Maho Beach plane schedule',
        detail: 'The Boeing 747 from KLM no longer flies, but Air France\'s A340 and Delta\'s 757 still come in. Check FlightAware for arrival times the night before your port day.',
      },
    ],
    bestTimeSummary:
      'St. Maarten is reliably warm with steady trade winds. December–April is the best window. September is the riskiest hurricane month and the only time Disney has been known to skip the stop.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: 'Mid-80s, dry', crowds: 'High', note: 'Best window' },
      { months: 'May – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate' },
      { months: 'Sep – Oct', weather: 'Mid-80s, wet', crowds: 'Low', note: 'Hurricane risk peak' },
    ],
    weatherSummary: 'Trade winds keep St. Maarten cooler than its Caribbean neighbors, especially the Orient Beach side which catches an Atlantic breeze.',
    gettingAround: [
      { method: 'Posted-rate taxi', cost: '$10–$15 per person', description: 'St. Maarten posts taxi rates on a board at the pier. Pay per zone, not per ride.' },
      { method: 'Water taxi', cost: '$7 round trip', description: 'Frequent boats from the cruise pier to Philipsburg town. Saves the 20-minute walk.' },
      { method: 'Public bus', cost: '$2 per person', description: 'Mini-vans run regularly between Philipsburg, Maho, and Marigot. Cheapest option for budget-minded families.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 4),
    faqs: [
      {
        question: 'Do I need a passport for St. Maarten?',
        answer: 'Yes — passports are required even on closed-loop sailings. If you visit Anguilla or St. Barths as a day trip, you\'ll need them again for that border.',
      },
      {
        question: 'Can I do both Dutch and French sides in one day?',
        answer: 'Yes — they\'re a 25-minute drive apart with no border controls. Plan one beach (Maho or Orient) plus one town (Philipsburg or Marigot) to keep the day manageable.',
      },
      {
        question: 'Was the island fully rebuilt after Hurricane Irma?',
        answer: 'Mostly yes. Most major beach restaurants, hotels, and the airport runway reopened years ago. A few small properties on the French side are still rebuilding.',
      },
    ],
  },

  {
    slug: 'oranjestad-aruba',
    name: 'Oranjestad, Aruba',
    shortName: 'Aruba',
    country: 'Aruba',
    region: 'Caribbean',
    flag: '🇦🇼',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 6:00 PM (~10 hours)',
    currency: 'Aruban Florin — USD universally accepted',
    language: 'Dutch / Papiamento / English',
    heroTagline: 'Outside the hurricane belt, consistently dry, with white-sand beaches and the most reliable cruise weather in the Caribbean.',
    metaTitle: 'Oranjestad, Aruba Disney Cruise Port Guide — Beaches, Excursions & Tips',
    metaDescription:
      'Aruba cruise port guide for Disney cruisers. Eagle Beach, Palm Beach, Arikok National Park, family tips, and excursion advice for your Oranjestad port day.',
    seoKeywords: [
      'disney cruise aruba',
      'aruba cruise port',
      'eagle beach aruba disney',
      'oranjestad excursions',
    ],
    overview: [
      'Aruba sits below the hurricane belt off the coast of Venezuela and gets dramatically less rain than other Caribbean islands — the cactus-and-dive-cliff scenery looks more like Baja than Barbados. Disney ships dock right in downtown Oranjestad at a modern terminal a 5-minute walk from the colorful Dutch-colonial main street.',
      'The island\'s headline attraction is Eagle Beach, regularly ranked among the world\'s top three beaches. It\'s a 10-minute taxi from the pier and the most reliable beach day Disney offers Caribbean-side. Beyond Eagle, Arikok National Park covers a third of the island with desert hiking, natural pools, and ancient cave paintings.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~10 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (downtown)', icon: '⚓' },
      { label: 'To Eagle Beach', value: '10 min taxi', icon: '🏖️' },
      { label: 'Hurricane Belt', value: 'Outside', icon: '☀️' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English fluent', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Eagle Beach',
        category: 'Beach',
        duration: '5–7 hours',
        cost: '$10 round-trip taxi',
        description: 'A wide, powdery, two-mile white-sand beach with the famous wind-bent divi-divi trees. Public, free, with chair rentals at the resort end. Voted top-3 beach worldwide by TripAdvisor most years.',
        bestFor: 'Family beach day, calm-water swimmers',
      },
      {
        name: 'Arikok National Park',
        category: 'Adventure',
        duration: '5–6 hours',
        cost: '$80–$130 per person tour',
        description: 'Covers 18% of the island — desert cactus scenery, natural rock pools at Conchi, cave paintings, and ostrich farms. Best done as a guided UTV/Jeep tour because the terrain destroys rental cars.',
        bestFor: 'Adventure families with older kids',
      },
      {
        name: 'Palm Beach Resort Strip',
        category: 'Beach',
        duration: '5–7 hours',
        cost: '$15 round-trip taxi',
        description: 'The high-rise resort strip 15 minutes north of Eagle Beach. Day passes available at most resorts ($50–$100/person), or post up on the free public sand alongside.',
        bestFor: 'Families wanting resort amenities for the day',
      },
      {
        name: 'Oranjestad Walking Tour',
        category: 'Cultural',
        duration: '1–2 hours',
        cost: 'Free',
        description: 'The pastel Dutch-colonial old town is steps from the pier. Free, easy walking, includes Fort Zoutman (the oldest building on the island), the Renaissance Marketplace, and good shopping.',
        bestFor: 'Half-day option, cruise families with short port days',
      },
    ],
    excursionGuidance:
      'Aruba\'s public taxis run on posted fares from a printed island map, so beach trips are very easy to DIY. The case for Disney excursions is strongest for Arikok National Park (rough terrain, needs an experienced driver) and the deep-water snorkel/sail trips.',
    excursions: [
      {
        name: 'Disney Aruba UTV Adventure',
        source: 'disney',
        cost: '$165 adult / $135 child',
        description: 'Two-person UTV convoy through Arikok\'s desert with stops at the natural pool. Disney holds the ship and the guides know the rough trails.',
        tip: 'Wear closed-toe shoes and bring a buff or bandana — the dust is real.',
      },
      {
        name: 'Independent Eagle Beach Day',
        source: 'independent',
        cost: '$10 round-trip taxi',
        description: 'Walk out the pier to the official taxi rank, ask for "Eagle Beach," and use posted-rate fares. Bring chairs and an umbrella from the ship, or rent for $20–$30 at the beach.',
        tip: 'The free public stretch right in front of the Manchebo Resort is the most beautiful and rarely full.',
      },
    ],
    dining: [
      {
        name: 'Eduardo\'s Beach Shack',
        category: 'Healthy / Caribbean',
        location: 'Palm Beach',
        description: 'Acai bowls, fresh smoothies, fish tacos — a beach-shack that punches above its weight and works well for picky kids and adults who want something lighter.',
      },
      {
        name: 'Zeerovers',
        category: 'Seafood',
        location: 'Savaneta (south coast)',
        description: 'The local fishermen\'s spot. Pick your fish off the daily catch board, watch them fry it, eat it on a picnic table over the water. Most authentic Aruban meal on the island.',
      },
    ],
    familyTips: [
      'Eagle Beach has shaded sections under the divi-divi trees — claim one early for the day.',
      'The Renaissance Marketplace mall right by the pier has a free playground and air-conditioned shopping if you need a midday break with kids.',
      'Aruba is windy. A pop-up beach tent or weighted umbrella is more useful than a parasol.',
    ],
    insiderTips: [
      {
        title: 'Renaissance Island flamingos',
        detail: 'The Renaissance Resort owns a private island off Oranjestad with the famous Instagram flamingos. Day passes are $125+ but you can take the public ferry from the resort lobby into the marketplace for free.',
      },
      {
        title: 'Get to Eagle before 10am',
        detail: 'Aruba\'s sun is intense and shade goes fast. Families who arrive before 10am get the prime divi-divi spots; arrivals after 11am are stuck on open sand.',
      },
    ],
    bestTimeSummary:
      'Aruba is the most reliable cruise weather in the Caribbean — outside the hurricane belt, semi-arid, and breezy year-round. Avoid October only for very occasional rare storm pushes.',
    weatherWindows: [
      { months: 'Year-round', weather: 'Low 80s, dry, windy', crowds: 'Steady', note: 'Aruba is consistently dry' },
      { months: 'Dec – Apr', weather: 'Coolest, breeziest', crowds: 'Highest' },
      { months: 'Sep – Oct', weather: 'Warmest, slight rain risk', crowds: 'Lowest' },
    ],
    weatherSummary: 'Aruba sits below the hurricane belt and gets ~20 inches of rain per year — about a quarter of what Nassau gets.',
    gettingAround: [
      { method: 'Posted-rate taxi', cost: '$5–$15 per ride', description: 'Aruba\'s taxis run on a posted-fare-per-zone system. No meters; you pay per car, not per person.' },
      { method: 'Public bus', cost: '$2.60 per person', description: 'Arubus runs the Oranjestad-to-Palm-Beach corridor every 20 minutes. Cheap and easy with strollers.' },
      { method: 'Walking', cost: 'Free', description: 'The pier is connected to downtown Oranjestad by a covered walkway, and downtown to the marina is flat and easy.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 3),
    faqs: [
      {
        question: 'Is Aruba safe for cruise families?',
        answer: 'Aruba has the lowest crime rate of any Caribbean cruise stop. Stick to common-sense beach safety (don\'t leave bags unattended) and you\'ll be fine in any tourist area.',
      },
      {
        question: 'Can I rent a car for the day?',
        answer: 'Yes — several agencies have desks at the pier. With kids, this is the easiest way to do Eagle Beach in the morning, lunch downtown, and an afternoon beach south of town.',
      },
      {
        question: 'Is the water swimmable for toddlers?',
        answer: 'Yes — Eagle Beach is calm and shallow for far out from shore, the most toddler-friendly Caribbean beach Disney visits.',
      },
    ],
  },

  {
    slug: 'willemstad-curacao',
    name: 'Willemstad, Curaçao',
    shortName: 'Curaçao',
    country: 'Curaçao',
    region: 'Caribbean',
    flag: '🇨🇼',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 6:00 PM (~10 hours)',
    currency: 'Antillean Guilder — USD accepted',
    language: 'Dutch / Papiamento / English',
    heroTagline: 'A UNESCO-listed pastel waterfront, calm Caribbean reefs, and an island that feels distinctly Dutch.',
    metaTitle: 'Willemstad, Curaçao Disney Cruise Port Guide — Things to Do & Tips',
    metaDescription:
      'Curaçao cruise port guide for Disney cruisers. Mambo Beach, Curaçao Sea Aquarium, Punda walking tour, family tips, and excursion advice for your Willemstad port day.',
    seoKeywords: [
      'disney cruise curacao',
      'willemstad cruise port',
      'curacao beaches disney',
      'mambo beach willemstad',
    ],
    overview: [
      'Willemstad is the capital of Curaçao and one of the most photogenic port arrivals on any Disney itinerary — the ship sails past a row of pastel Dutch buildings that look airlifted in from Amsterdam. The pier is at the Megapier terminal a 15-minute walk from the famous Handelskade waterfront.',
      'Like Aruba, Curaçao sits outside the hurricane belt and stays dry and breezy year-round. The island has more snorkeling and diving than Aruba (over 65 named reef sites), plus better-preserved Dutch colonial architecture and a stronger local food culture. It\'s a cruise port that rewards a half-day of town wandering and a half-day at a beach.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~10 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Megapier)', icon: '⚓' },
      { label: 'To Punda waterfront', value: '15 min walk', icon: '🚶' },
      { label: 'To Mambo Beach', value: '15 min taxi', icon: '🏖️' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English / Dutch', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Punda Waterfront & Queen Emma Bridge',
        category: 'Cultural',
        duration: '2–3 hours',
        cost: 'Free',
        description: 'Walk the pastel Handelskade and cross the floating Queen Emma pontoon bridge — it swings open for ships several times an hour. Great photos, free, and easily combined with shopping.',
        bestFor: 'Cultural half-day, any age',
      },
      {
        name: 'Mambo Beach',
        category: 'Beach',
        duration: '4–6 hours',
        cost: '$10 round-trip taxi + $5 chair rental',
        description: 'A long man-made beach strip 15 minutes from the pier, with restaurants, chair rentals, paddleboard rentals, and the Curaçao Sea Aquarium right next door.',
        bestFor: 'Beach day with kids',
      },
      {
        name: 'Curaçao Sea Aquarium & Dolphin Experience',
        category: 'Family',
        duration: '3–5 hours',
        cost: '$25–$140 per person depending on package',
        description: 'A working aquarium with shark and ray feedings, sea-lion shows, and (optional, expensive) swim-with-dolphins. Mambo Beach is steps away, making it a natural double-up.',
        bestFor: 'Animal-loving kids, rainy-day option',
      },
      {
        name: 'Klein Curaçao Day Trip',
        category: 'Beach',
        duration: '8–9 hours (full port day)',
        cost: '$140–$170 per person',
        description: 'A catamaran ride to a deserted uninhabited island off Curaçao\'s south coast — pristine beach, snorkeling around a shipwreck, lunch included. The full-day premium beach experience.',
        bestFor: 'Beach-focused families, snorkelers',
      },
    ],
    excursionGuidance:
      'Klein Curaçao is the one excursion almost worth booking through Disney — it\'s a full port day and missing the catamaran return means a long, miserable problem. Everything else (Punda walking, Mambo Beach, Sea Aquarium) is faster and cheaper independently.',
    excursions: [
      {
        name: 'Disney Klein Curaçao Catamaran',
        source: 'disney',
        cost: '$169 adult / $129 child',
        description: 'Full-day catamaran with breakfast, snorkel gear, beach time on Klein Curaçao, and lunch. Disney guarantees return.',
        tip: 'The crossing can be choppy — Dramamine before boarding for anyone prone to seasickness.',
      },
      {
        name: 'Independent Punda Walking & Lunch',
        source: 'independent',
        cost: '$0–$50 (just lunch)',
        description: 'Walk the pier to the floating bridge, explore Handelskade, lunch at a local café, optional Mambo Beach in the afternoon.',
        tip: 'Stop at the floating market (Venezuelan boats selling produce dockside) — quick, free, very photogenic.',
      },
    ],
    dining: [
      {
        name: 'Plasa Bieu (Old Market)',
        category: 'Curaçaoan',
        location: 'Punda, 15 min walk',
        description: 'A covered market with stalls serving Curaçaoan home cooking — keshi yena, stoba beef stew, fungi cornmeal. Authentic, cheap ($10–$15 a plate), and a great cultural stop.',
      },
      {
        name: 'Gouverneur de Rouville',
        category: 'European / Caribbean',
        location: 'Otrobanda waterfront',
        description: 'A restored colonial mansion turned restaurant on the Otrobanda side, with a balcony overlooking the floating bridge. Good for a relaxed lunch with views.',
      },
    ],
    familyTips: [
      'The Queen Emma Bridge swings open with little warning — if you\'re crossing and hear the bell, stay on whichever side you\'re on (no rushing).',
      'Mambo Beach is artificial sand but the water is calm and clear. A good pick if you\'re prioritizing easy with small kids.',
      'There\'s a free water taxi (ferry) when the Queen Emma Bridge is open — they\'ll shuttle you across.',
    ],
    insiderTips: [
      {
        title: 'Real Curaçao liqueur',
        detail: 'The blue Curaçao liqueur is made at the Senior & Co. distillery — there\'s a free tour and tasting 15 minutes from the pier. The actual stuff is clear; the blue dye is added for cocktails.',
      },
      {
        title: 'Tug Boat Beach for free snorkeling',
        detail: 'Just east of the Sea Aquarium, a wrecked tugboat sits in 15 feet of water. Free public access from the parking lot, great snorkeling without an excursion fee.',
      },
    ],
    bestTimeSummary:
      'Curaçao\'s weather is reliably dry and breezy year-round, like Aruba. October has the highest (still rare) chance of rain. Disney rarely scrubs Curaçao stops.',
    weatherWindows: [
      { months: 'Year-round', weather: 'Mid-80s, dry, windy', crowds: 'Steady' },
      { months: 'Dec – Apr', weather: 'Slightly cooler', crowds: 'Highest' },
      { months: 'Oct – Nov', weather: 'Mid-80s, slight rain risk', crowds: 'Moderate' },
    ],
    weatherSummary: 'Curaçao is below the hurricane belt — even in October, weather-canceled port days are very rare.',
    gettingAround: [
      { method: 'Walking', cost: 'Free', description: 'The Megapier to Punda waterfront is a flat 15-minute walk along the harbor.' },
      { method: 'Pier taxi', cost: '$10–$20 per ride', description: 'Posted fares from the pier dispatch to all major destinations.' },
      { method: 'Public bus', cost: '$1.50 per person', description: 'The Konvoi bus runs Otrobanda to Mambo Beach every 30 minutes.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 3),
    faqs: [
      {
        question: 'Is Curaçao part of the Netherlands?',
        answer: 'Yes — it\'s a constituent country of the Kingdom of the Netherlands. Locals carry Dutch passports, the legal system is Dutch, and most signs are in Dutch and English.',
      },
      {
        question: 'How is snorkeling here compared to Cozumel?',
        answer: 'Cozumel has bigger reef visibility (100+ feet). Curaçao has more variety (over 65 named sites) and better shore-entry beach snorkeling. Both are excellent.',
      },
      {
        question: 'Do I need a passport?',
        answer: 'Yes — passport books are required.',
      },
    ],
  },

  {
    slug: 'st-johns-antigua',
    name: "St. John's, Antigua",
    shortName: "St. John's",
    country: 'Antigua and Barbuda',
    region: 'Caribbean',
    flag: '🇦🇬',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'East Caribbean Dollar — USD accepted',
    language: 'English',
    heroTagline: '365 beaches — one for every day of the year, locals say — and Disney drops you a short taxi from a dozen of them.',
    metaTitle: "St. John's, Antigua Disney Cruise Port Guide — Things to Do & Tips",
    metaDescription:
      "St. John's, Antigua cruise port guide for Disney cruisers. Dickenson Bay, Nelson's Dockyard, Stingray City, family tips, and excursion advice for your Antigua port day.",
    seoKeywords: [
      'disney cruise antigua',
      'st johns antigua port',
      'antigua beaches disney',
      "nelsons dockyard antigua",
    ],
    overview: [
      "St. John's is the capital of Antigua and the cruise pier (Heritage Quay / Redcliffe Quay) sits right in the small downtown. Antigua\'s claim to fame is its beaches — supposedly 365, one for every day of the year. A handful of them are within 15 minutes of the pier.",
      "The cultural counterweight to the beach scene is Nelson\'s Dockyard, the 18th-century British naval base on Antigua\'s south coast — the only Georgian-era working naval shipyard in the world and a UNESCO site worth a half-day for history-curious families.",
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Heritage Quay)', icon: '⚓' },
      { label: 'To Dickenson Bay', value: '15 min taxi', icon: '🚕' },
      { label: "To Nelson's Dockyard", value: '40 min taxi', icon: '🚗' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Dickenson Bay',
        category: 'Beach',
        duration: '5–6 hours',
        cost: '$20–$30 round-trip taxi',
        description: "The closest top-rated beach to the pier — long white sand, calm Caribbean-side water, beach restaurants and chair rentals along the strip. Easily the default Antigua beach day.",
        bestFor: 'Family beach day',
      },
      {
        name: "Nelson's Dockyard (English Harbour)",
        category: 'Historic',
        duration: '4–5 hours',
        cost: '$10–$15 entry + $50 round-trip taxi',
        description: 'A UNESCO-listed Georgian naval base from 1725, the only one still operating in the world. Restored ship\'s storehouse, sail loft, and a small museum. Combine with Shirley Heights for sunset views.',
        bestFor: 'History families, older kids',
      },
      {
        name: 'Stingray City Antigua',
        category: 'Adventure',
        duration: '4–5 hours',
        cost: '$70–$95 per person',
        description: 'A shallow-water encounter with friendly southern stingrays in a sheltered cove. Less crowded than Grand Cayman\'s version and includes a snorkel stop afterward.',
        bestFor: 'Animal-loving families with kids 6+',
      },
      {
        name: 'Shirley Heights Sunday Lookout',
        category: 'Sightseeing',
        duration: '2–3 hours',
        cost: '$40 round-trip taxi',
        description: 'A clifftop viewpoint over English Harbour and Falmouth Harbour. The view is the headline; on Sundays there\'s a famous BBQ-and-steel-drum sunset event.',
        bestFor: 'Sightseers, photographers',
      },
    ],
    excursionGuidance:
      'Antigua\'s taxis run on posted government rates, so independent beach trips are simple. Disney excursions are mainly worth it for the longer Nelson\'s Dockyard tours (where missing the return bus on a hilly winding road would be disaster) and the Stingray City scheduled boats.',
    excursions: [
      {
        name: "Disney Nelson's Dockyard & Shirley Heights",
        source: 'disney',
        cost: '$89 adult / $59 child',
        description: 'Bus transport, entry to Nelson\'s Dockyard, guided museum tour, stop at Shirley Heights viewpoint.',
        tip: 'Wear comfortable walking shoes — the dockyard tour is mostly on cobblestone.',
      },
      {
        name: 'Independent Dickenson Bay Taxi',
        source: 'independent',
        cost: '$20–$30 round-trip per family',
        description: 'Walk out the Heritage Quay gate to the official taxi rank. Posted rates are firm and printed at the dispatch booth.',
        tip: 'Most beaches have a small chair rental ($10–$15/day) — bring cash.',
      },
    ],
    dining: [
      {
        name: 'Hemingway\'s Caribbean Café',
        category: 'Caribbean',
        location: "Redcliffe Quay (steps from pier)",
        description: "On a covered second-floor balcony overlooking the harbor. Conch fritters, jerk chicken, rum punches — easy stop right at the pier without taking a taxi.",
      },
      {
        name: 'Pillars Restaurant at Admiral\'s Inn',
        category: 'Historic / Caribbean',
        location: "Nelson's Dockyard",
        description: 'An 18th-century pillared dining room inside the dockyard. Decent lunch and the most atmospheric dining on the island.',
      },
    ],
    familyTips: [
      "Heritage Quay (the cruise terminal complex) is air-conditioned and has duty-free shopping if you want to wait out the heat between activities.",
      "Antigua's beaches are mostly public — chair rentals at any beach are first-come, but you can also bring your own from the ship.",
      "The water is shallow and calm at Dickenson Bay, with very small surf — works well for toddlers.",
    ],
    insiderTips: [
      {
        title: 'Long Bay over Dickenson',
        detail: "If you want a less-developed beach, Long Bay on the east coast is 30 minutes from the pier and a fraction as busy — most cruisers don't go that far.",
      },
      {
        title: 'Sunday is Shirley Heights night',
        detail: "If your cruise hits Antigua on a Sunday, plan to stay through 4–6 PM for the famous Shirley Heights BBQ — steel drums, sunset, and a hilltop crowd. Easily the best evening on the island.",
      },
    ],
    bestTimeSummary:
      'Antigua is reliably warm and breezy December through May, hot and humid June–November. Peak hurricane risk is September. Disney visits mostly during the dry season for this reason.',
    weatherWindows: [
      { months: 'Dec – May', weather: '80s, dry, breezy', crowds: 'High', note: 'Best window' },
      { months: 'Jun – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate' },
      { months: 'Sep – Nov', weather: 'Mid-80s, wet', crowds: 'Lowest', note: 'Hurricane risk' },
    ],
    weatherSummary: 'Antigua\'s east coast catches a strong Atlantic trade wind — it stays cooler and breezier than the developed Caribbean-side beaches.',
    gettingAround: [
      { method: 'Posted-rate taxi', cost: '$10–$50 per ride', description: 'Antigua\'s government posts taxi rates from the pier — printed at Heritage Quay\'s dispatch.' },
      { method: 'Walking', cost: 'Free', description: 'Heritage Quay, Redcliffe Quay, and downtown St. John\'s are all flat and walkable within a 15-minute radius of the pier.' },
      { method: 'Bus', cost: '$1–$3', description: 'Public minivans run from the West Bus Station to most beaches. Cheap but unreliable schedule.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 3),
    faqs: [
      {
        question: 'Do I need a passport for Antigua?',
        answer: 'Yes — Antigua is an independent Commonwealth nation. Disney requires a US passport book for the stop.',
      },
      {
        question: 'How is shopping at Heritage Quay?',
        answer: 'Heritage Quay is a duty-free shopping complex right at the pier — jewelry, liquor, and fragrance prices are similar to other Caribbean stops. Redcliffe Quay (next door) has more local crafts.',
      },
      {
        question: 'Can I do Nelson\'s Dockyard on my own?',
        answer: 'Yes — a taxi to and from English Harbour with a 2-hour visit is doable in 4 hours. The road is winding, so motion-sick passengers should bring Dramamine.',
      },
    ],
  },

  {
    slug: 'castries',
    name: 'Castries, St. Lucia',
    shortName: 'Castries',
    country: 'St. Lucia',
    region: 'Caribbean',
    flag: '🇱🇨',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'East Caribbean Dollar — USD accepted',
    language: 'English / Kwéyòl',
    heroTagline: 'The Pitons — two volcanic peaks rising straight from the sea — are the most dramatic landscape on any Caribbean cruise.',
    metaTitle: 'Castries, St. Lucia Disney Cruise Port Guide — Pitons, Excursions & Tips',
    metaDescription:
      'St. Lucia cruise port guide for Disney cruisers. The Pitons, Sulphur Springs mud bath, Marigot Bay, family tips, and excursion advice for your Castries port day.',
    seoKeywords: [
      'disney cruise st lucia',
      'castries cruise port',
      'pitons st lucia disney',
      'sulphur springs mud bath cruise',
    ],
    overview: [
      'Castries is St. Lucia\'s capital and the cruise terminal at Pointe Seraphine puts you in a duty-free shopping complex with the city center 15 minutes by water taxi across the harbor. The island\'s real attractions, though, lie south — the Pitons (twin volcanic peaks), the drive-in volcano at Sulphur Springs, and the rainforest interior.',
      'St. Lucia is one of the few Caribbean ports where the landscape is the headline attraction. The Pitons are so iconic they\'re on the country\'s flag, and the boat trip down the west coast to see them up close is the experience most repeat St. Lucia visitors recommend.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Pointe Seraphine)', icon: '⚓' },
      { label: 'To Pitons (by boat)', value: '~90 min', icon: '⛵' },
      { label: 'To Sulphur Springs', value: '~75 min drive', icon: '🌋' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
    ],
    thingsToDo: [
      {
        name: 'Pitons Boat Tour',
        category: 'Sightseeing',
        duration: '6–8 hours',
        cost: '$120–$160 per person',
        description: 'A catamaran along the west coast with a Piton photo stop, snorkeling at Anse Chastanet reef, and lunch. The most popular St. Lucia excursion and worth every dollar for the views.',
        bestFor: 'First-time St. Lucia visitors',
      },
      {
        name: 'Sulphur Springs & Mud Bath',
        category: 'Adventure',
        duration: '6–8 hours',
        cost: '$110–$140 per person',
        description: 'The world\'s only drive-in volcano. Walk a path through bubbling sulphur springs, then soak in a 100°F mineral mud bath. Smelly, memorable, and not at all what you expected on a Disney cruise.',
        bestFor: 'Adventurous families with older kids',
      },
      {
        name: 'Marigot Bay',
        category: 'Beach',
        duration: '5–6 hours',
        cost: '$50 round-trip taxi',
        description: 'A picturesque protected bay 20 minutes south of Castries. The marina village has restaurants, a small beach across the harbor reachable by free water shuttle, and is a calm alternative to a long Piton trip.',
        bestFor: 'Half-day option, calmer beach day',
      },
      {
        name: 'Reduit Beach / Rodney Bay',
        category: 'Beach',
        duration: '4–5 hours',
        cost: '$25 round-trip taxi',
        description: 'St. Lucia\'s most developed beach strip, 20 minutes north of the pier. Long white sand, calm water, beach bars, and chair rentals at the resort end.',
        bestFor: 'Beach day without committing to a full excursion',
      },
    ],
    excursionGuidance:
      'St. Lucia is a strong case for booking Disney excursions. The Pitons and Sulphur Springs are 60–90 minutes from Castries on winding mountain roads, and a missed bus return is a real problem. For Marigot Bay and Reduit Beach, taxis work fine.',
    excursions: [
      {
        name: 'Disney Pitons & Sulphur Springs Combo',
        source: 'disney',
        cost: '$169 adult / $129 child',
        description: 'Bus to Soufrière, Sulphur Springs walk and mud bath, Piton photo stops, lunch included.',
        tip: 'The mud bath stains light-colored clothes. Wear an old swimsuit and bring a towel.',
      },
      {
        name: 'Independent Marigot Bay Taxi',
        source: 'independent',
        cost: '$50 round trip',
        description: 'A 20-minute taxi to Marigot Bay, free water shuttle to the beach side, lunch at a marina restaurant, return on the same taxi at a pre-arranged time.',
        tip: 'Ask your taxi driver to recommend a Creole restaurant — most have a favorite and St. Lucia\'s food is excellent.',
      },
    ],
    dining: [
      {
        name: 'Doolittle\'s',
        category: 'Caribbean',
        location: 'Marigot Bay',
        description: 'The original beach-side restaurant at Marigot Bay, on the small beach across the bay. Fresh grilled fish, Creole stews, rum punches, and toes in the sand.',
      },
      {
        name: 'The Coal Pot',
        category: 'French Caribbean',
        location: 'Vigie Marina, 10 min from pier',
        description: 'A small upscale waterfront restaurant with French-Creole cooking. The reason food-focused cruisers leave the pier.',
      },
    ],
    familyTips: [
      'The drive south to the Pitons is long, hilly, and motion-sick prone — Dramamine before disembarking if your kids are sensitive.',
      'Pointe Seraphine has free WiFi and air conditioning if you need a break from the heat.',
      'Beach excursions can include a water-shuttle component — make sure your kids are comfortable with small boats before booking.',
    ],
    insiderTips: [
      {
        title: 'Cathedral of the Immaculate Conception',
        detail: 'The brightly-painted interior is one of the most beautiful churches in the Caribbean — free entry, 5 minutes from the pier in central Castries.',
      },
      {
        title: 'Catamaran beats van for the Pitons',
        detail: 'The boat-based Piton tours include a swim stop and food. The land-based Soufrière tours pack more sights but no swimming. For families, the boat usually wins.',
      },
    ],
    bestTimeSummary:
      'St. Lucia is reliably warm year-round. December through April is dry and least humid. Summer brings short heavy showers; September is peak hurricane risk.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: 'Mid-80s, breezy', crowds: 'High', note: 'Best window' },
      { months: 'May – Aug', weather: 'Mid-80s, humid', crowds: 'Moderate' },
      { months: 'Sep – Nov', weather: 'Mid-80s, wet', crowds: 'Lowest', note: 'Hurricane risk' },
    ],
    weatherSummary: 'St. Lucia\'s interior is a rainforest — sudden showers are common even in dry season. The coast usually clears within 30 minutes.',
    gettingAround: [
      { method: 'Posted-rate taxi', cost: '$25–$80 per ride', description: 'Posted fares from the pier dispatch.' },
      { method: 'Water taxi', cost: '$5 per person', description: 'Frequent boats from Pointe Seraphine across the harbor to central Castries.' },
      { method: 'Public minibus', cost: '$1–$3', description: 'Shared minivans on fixed routes. Cheap but slow.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 3),
    faqs: [
      {
        question: 'Is the mud bath safe?',
        answer: 'Yes — it\'s a regulated tourist attraction with a temperature-monitored pool. The mud is sulphurous so it smells; you can rinse off in an adjacent freshwater shower.',
      },
      {
        question: 'Do I need a passport?',
        answer: 'Yes — passport books are required for St. Lucia.',
      },
      {
        question: 'Can I see the Pitons without a long excursion?',
        answer: 'You can\'t see them from the pier — they\'re on the south coast. The shortest "see the Pitons" option is a helicopter tour ($300+ per person) which is about an hour total. Most cruisers do the 6-hour boat tour instead.',
      },
    ],
  },

  {
    slug: 'san-juan',
    name: 'San Juan, Puerto Rico',
    shortName: 'San Juan',
    country: 'Puerto Rico, USA',
    region: 'Caribbean',
    flag: '🇵🇷',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'USD',
    language: 'Spanish / English',
    heroTagline: 'A 500-year-old walled colonial city in a US territory — passport-free for US citizens and packed with history a short walk from the pier.',
    metaTitle: 'San Juan, Puerto Rico Disney Cruise Port Guide — Things to Do & Tips',
    metaDescription:
      'San Juan, Puerto Rico cruise port guide for Disney cruisers. Old San Juan, El Morro, Castillo San Cristóbal, El Yunque rainforest, family tips, and excursion advice.',
    seoKeywords: [
      'disney cruise san juan',
      'old san juan disney cruise',
      'el morro san juan port',
      'puerto rico cruise port',
    ],
    overview: [
      'San Juan is one of the easiest Caribbean port days because Old San Juan — the UNESCO-listed walled colonial city — is literally a 10-minute walk from the cruise pier. No taxi, no excursion, no language barrier (it\'s a US territory). Just walk uphill and you\'re in 16th-century Spanish forts and pastel streets.',
      'The bigger pull beyond Old San Juan is El Yunque — the only tropical rainforest in the US National Forest system — about 45 minutes east of the pier. It\'s the most Disney-worthy nature excursion in the Caribbean: waterfalls, swimming holes, a paved drive, and easy hiking.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Old San Juan)', icon: '⚓' },
      { label: 'Old San Juan', value: '10 min walk', icon: '🏰' },
      { label: 'To El Yunque', value: '45 min drive', icon: '🌳' },
      { label: 'Currency', value: 'USD (US territory)', icon: '💵' },
      { label: 'Passport', value: 'Not required (US citizens)', icon: '🛂' },
    ],
    thingsToDo: [
      {
        name: 'Castillo San Felipe del Morro',
        category: 'Historic',
        duration: '2–3 hours',
        cost: '$10 entry adult / free under 16',
        description: 'A 16th-century Spanish fort on the Atlantic-facing point of Old San Juan. Multiple levels of cannon batteries, dungeons, and the famous open lawn for kite flying. A genuine UNESCO-grade fort.',
        bestFor: 'Any age, easy walking',
      },
      {
        name: 'El Yunque Rainforest',
        category: 'Nature',
        duration: '5–6 hours',
        cost: '$70–$110 per person',
        description: 'The only tropical rainforest in the US National Forest system — La Coca Falls, Yokahu Tower viewpoint, and easy paved hiking trails. Best done as a half-day with a transportation tour.',
        bestFor: 'Nature families, active kids',
      },
      {
        name: 'Old San Juan Walking Tour',
        category: 'Cultural',
        duration: '2–4 hours',
        cost: 'Free',
        description: 'Walk the blue-cobblestone streets, see Casa Blanca (Ponce de León\'s house), the Cathedral of San Juan, and Plaza de Armas. Free, flat-ish, and easily combined with a fort visit.',
        bestFor: 'Cultural half-day with any age',
      },
      {
        name: 'Bacardí Distillery Tour',
        category: 'Adult',
        duration: '3–4 hours',
        cost: '$25–$45 + ferry',
        description: 'A short ferry across the bay to the world\'s largest rum distillery. Guided tour with tastings (adults only); kids welcome on the family tour with mocktails.',
        bestFor: 'Adult-focused cruisers',
      },
    ],
    excursionGuidance:
      'San Juan is the best DIY port in the Caribbean — Old San Juan is at your gangway. The only excursion worth booking through Disney is El Yunque, where the rainforest drive and trail logistics are genuinely easier with a guide.',
    excursions: [
      {
        name: 'Disney El Yunque Rainforest Adventure',
        source: 'disney',
        cost: '$95 adult / $75 child',
        description: 'Bus from the pier, guided stops at La Coca Falls and Yokahu Tower, optional swim in a rainforest pool.',
        tip: 'Bring water shoes if you want to swim at La Mina — the trail is closed periodically; check before you go.',
      },
      {
        name: 'Independent Old San Juan Walking',
        source: 'independent',
        cost: 'Free',
        description: 'Walk off the ship, head uphill, see two forts and the old town in 3–4 hours.',
        tip: 'The free trolley loops through Old San Juan and helps with hills if you have small kids.',
      },
    ],
    dining: [
      {
        name: 'Café Cuatro Sombras',
        category: 'Coffee / Light',
        location: 'Old San Juan, Calle Recinto Sur',
        description: 'A locally-roasted Puerto Rican coffee shop with light food. Refuel between forts.',
      },
      {
        name: 'La Bombonera',
        category: 'Puerto Rican',
        location: 'Old San Juan',
        description: 'A 100-year-old institution famous for mallorca breakfast bread, café con leche, and pernil sandwiches. Best inexpensive lunch in town.',
      },
    ],
    familyTips: [
      'Old San Juan is hilly and the blue cobblestones are uneven — strollers are doable but heavy.',
      'There\'s a free city trolley between the cruise pier, the forts, and Plaza de Armas. Use it.',
      'You don\'t need a passport — Puerto Rico is a US territory. Government photo ID is fine.',
    ],
    insiderTips: [
      {
        title: 'Kite flying at El Morro',
        detail: 'The open grass lawn outside the fort is the city\'s favorite weekend kite-flying spot. Vendors sell kites for $5–$10 if you didn\'t bring one — a fun, photogenic way to spend an hour.',
      },
      {
        title: 'The free city trolley loop',
        detail: 'San Juan\'s city-run "Old San Juan Trolley" is completely free, air-conditioned, and runs every 15 minutes — saves the worst of the hill climbs.',
      },
    ],
    bestTimeSummary:
      'San Juan is warm year-round, peak dry season December through April. Summer brings short tropical downpours but is still cruise-friendly. September is peak hurricane risk.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: 'Mid-80s, dry', crowds: 'High', note: 'Best window' },
      { months: 'May – Aug', weather: 'High 80s, humid', crowds: 'Moderate' },
      { months: 'Sep – Nov', weather: 'High 80s, wet', crowds: 'Lowest', note: 'Hurricane risk peak' },
    ],
    weatherSummary: 'San Juan is hotter and more humid than the lesser Antilles — pack lightweight clothes and plan air-conditioned breaks.',
    gettingAround: [
      { method: 'Walking', cost: 'Free', description: 'Old San Juan and the cruise pier are connected by a flat covered promenade. Inside the old town, it\'s all walkable in a half-day.' },
      { method: 'Free city trolley', cost: 'Free', description: 'A city-run loop through Old San Juan and the cruise pier — air-conditioned and frequent.' },
      { method: 'Taxi', cost: '$20+ per ride', description: 'Posted-fare taxis from the pier; not really needed for Old San Juan but useful for El Yunque or the beach.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 4),
    faqs: [
      {
        question: 'Do US citizens need a passport for San Juan?',
        answer: 'No — it\'s a US territory. A government-issued photo ID (driver\'s license or REAL ID) is sufficient. Bring a passport if your itinerary stops elsewhere outside the US.',
      },
      {
        question: 'How recovered is San Juan from Hurricane Maria?',
        answer: 'Old San Juan, the cruise port, and most tourist infrastructure are fully restored. El Yunque trails reopened gradually — check current trail status before assuming any specific waterfall is accessible.',
      },
      {
        question: 'Can I do El Yunque in a half-day?',
        answer: 'Yes — the main attractions (La Coca Falls, Yokahu Tower, and a short trail) can be visited in 4–5 hours including drive time. Hiking to El Yunque\'s peak is a full day and not realistic on port time.',
      },
    ],
  },

  {
    slug: 'cartagena-colombia',
    name: 'Cartagena, Colombia',
    shortName: 'Cartagena',
    country: 'Colombia',
    region: 'South America',
    flag: '🇨🇴',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'Colombian Peso — USD accepted in tourist areas',
    language: 'Spanish',
    heroTagline: 'A walled UNESCO city older than St. Augustine, with the most colorful colonial old town in the Western Hemisphere.',
    metaTitle: 'Cartagena, Colombia Disney Cruise Port Guide — Things to Do & Tips',
    metaDescription:
      'Cartagena, Colombia cruise port guide for Disney cruisers. Old Town walking tour, San Felipe Castle, Rosario Islands, family tips, and excursion advice for your port day.',
    seoKeywords: [
      'disney cruise cartagena',
      'cartagena colombia port',
      'old town cartagena disney',
      'san felipe castle cruise',
    ],
    overview: [
      'Cartagena is a 16th-century Spanish colonial port on Colombia\'s Caribbean coast — UNESCO-listed walled city, pastel courtyards, bougainvillea-draped balconies, and one of the best-preserved old towns in the Americas. Disney ships dock at Manga Island, about 10 minutes from the old city by taxi.',
      'The shore experience here is unusually compact: most of what you\'ll do (walking the walls, San Felipe Castle, La Popa Convent, the old town) is within a 30-minute radius of the pier. The trade-off is that Cartagena is hotter than the rest of the Caribbean — afternoon temperatures in the 90s are normal — and the walking is on cobblestones.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (Manga Island)', icon: '⚓' },
      { label: 'To Old City', value: '10 min taxi', icon: '🚕' },
      { label: 'Currency', value: 'USD accepted in tourist areas', icon: '💵' },
      { label: 'Language', value: 'Spanish', icon: '🗣️' },
      { label: 'Climate', value: 'Hot & humid year-round', icon: '🌡️' },
    ],
    thingsToDo: [
      {
        name: 'Castillo San Felipe de Barajas',
        category: 'Historic',
        duration: '2–3 hours',
        cost: '$8 entry + $15 taxi round trip',
        description: 'The largest Spanish fortress in the Americas, perched above the city. Underground tunnels, cannon batteries, and a panoramic view over Cartagena. Hot and exposed — go before 10am.',
        bestFor: 'History families with kids 8+',
      },
      {
        name: 'Walled Old Town Walking Tour',
        category: 'Cultural',
        duration: '3–4 hours',
        cost: 'Free / $20 guided',
        description: 'Walk the top of the 5km city wall, then the cobblestone streets through Getsemaní and Centro. Plaza Santo Domingo, Iglesia San Pedro Claver, and the Spanish Inquisition Palace.',
        bestFor: 'Cultural half-day, any age',
      },
      {
        name: 'Rosario Islands Beach Day',
        category: 'Beach',
        duration: '6–8 hours',
        cost: '$80–$130 per person',
        description: 'A speedboat to a small island archipelago an hour offshore. Better water than the city beach, but the boat ride is long and bumpy. Only worth it on a hot dry day.',
        bestFor: 'Beach-focused families',
      },
      {
        name: 'Mud Volcano El Totumo',
        category: 'Adventure',
        duration: '5–6 hours',
        cost: '$50–$80 per person',
        description: 'A 50-foot volcano cone filled with warm gray mud — climb up, soak in the mud, rinse off in the nearby lagoon. Unique but a 1.5-hour drive each way.',
        bestFor: 'Adventurous cruisers',
      },
    ],
    excursionGuidance:
      'Cartagena is a strong case for booking Disney excursions if your Spanish is limited and it\'s your first time in South America. The old town is safe and easy to DIY; the mud volcano and Rosario Islands involve drives or boat rides that go better with a guide.',
    excursions: [
      {
        name: 'Disney Cartagena City & San Felipe',
        source: 'disney',
        cost: '$89 adult / $69 child',
        description: 'Air-conditioned bus, English-speaking guide, San Felipe Castle visit, La Popa Convent stop, walk through the old city.',
        tip: 'Buses are key in Cartagena\'s heat — DIY walking can be brutal between 11am and 3pm.',
      },
      {
        name: 'Independent Old Town Walking',
        source: 'independent',
        cost: '$15 taxi each way',
        description: 'Taxi to Plaza Santo Domingo, wander the cobblestones, climb the city walls for sunset, taxi back. Free or near-free.',
        tip: 'Stick to the touristy zones inside the walls — Getsemaní outside the walls is fine in daylight but seedier after dark.',
      },
    ],
    dining: [
      {
        name: 'La Cevichería',
        category: 'Seafood',
        location: 'Old Town, Calle Stuart',
        description: 'Anthony Bourdain–famous ceviche shack. Long lines but worth it — the mango-shrimp ceviche is the signature.',
      },
      {
        name: 'Crepes & Waffles',
        category: 'Casual / Family',
        location: 'Multiple Old Town locations',
        description: 'A Colombian chain with family-friendly menus — salads, savory crepes, ice cream, AC. Reliable kid stop in the heat.',
      },
    ],
    familyTips: [
      'Cartagena is HOT. Plan air-conditioned breaks every 90 minutes with kids. Hydrate aggressively.',
      'Stick to bottled water and avoid uncooked street food unless you\'re experienced traveling in Latin America.',
      'The Old Town\'s cobblestones are uneven — strollers work but a baby carrier is better.',
    ],
    insiderTips: [
      {
        title: 'Skip the city beach',
        detail: 'The city-side Bocagrande beach has dark water and gets aggressively pushed by vendors. If you want a beach day, do Rosario Islands instead.',
      },
      {
        title: 'Real Colombian coffee',
        detail: 'Cartagena\'s old town has several specialty roasters (Café San Alberto, Juan Valdez Origenes) where you can buy whole-bean coffee from named Colombian estates. Far better than supermarket coffee back home.',
      },
    ],
    bestTimeSummary:
      'Cartagena is hot and humid year-round. December–April is the driest. May–November brings heavy afternoon thunderstorms but rarely all-day rain.',
    weatherWindows: [
      { months: 'Dec – Apr', weather: 'Upper 80s, dry', crowds: 'High', note: 'Best window' },
      { months: 'May – Aug', weather: '90s, humid', crowds: 'Moderate', note: 'Afternoon storms' },
      { months: 'Sep – Nov', weather: 'Upper 80s, wet', crowds: 'Low' },
    ],
    weatherSummary: 'Cartagena sits below the hurricane belt but still gets stuck in tropical lows — afternoon rain is common in any season.',
    gettingAround: [
      { method: 'Taxi', cost: '$10–$15 per ride in town', description: 'Cheap and abundant. Negotiate the fare before getting in; most cab drivers don\'t use meters.' },
      { method: 'Walking', cost: 'Free', description: 'Inside the walled old town, everything is walkable in under 20 minutes.' },
      { method: 'Disney shuttle', cost: 'Free with excursions', description: 'Most Disney tours include AC bus transport — a relief in the heat.' },
    ],
    shipsThatVisit: CARIBBEAN_SHIPS.slice(0, 2),
    faqs: [
      {
        question: 'Is Cartagena safe?',
        answer: 'The walled Old Town, Getsemaní inside, and tourist zones are safe by Latin American standards in daylight. Stick to populated areas and standard travel precautions.',
      },
      {
        question: 'Do I need a passport?',
        answer: 'Yes — passport books are required. Colombia is a sovereign country, not a US territory.',
      },
      {
        question: 'Are excursions in English?',
        answer: 'Disney-booked excursions always have an English guide. Independent operators in the old town nearly always speak English — only the casual taxi drivers may not.',
      },
    ],
  },
]
