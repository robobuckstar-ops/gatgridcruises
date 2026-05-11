/**
 * Destination port guides for Disney Cruise Line itineraries.
 * Distinct from src/data/ports.ts which holds embarkation/departure ports.
 *
 * Content is editorial — written for cruise families researching what to do
 * ashore on a port day, not for booking. GatGrid is an info/discovery site;
 * we do not sell excursions or tickets. Recommendations are factual and link
 * to operators where useful.
 */

export interface DestinationActivity {
  name: string
  category: string
  duration: string
  cost: string
  description: string
  bestFor?: string
}

export interface DestinationExcursion {
  name: string
  source: 'disney' | 'independent' | 'either'
  cost: string
  description: string
  tip?: string
}

export interface DestinationDining {
  name: string
  category: string
  location: string
  description: string
}

export interface DestinationGettingAround {
  method: string
  cost: string
  description: string
}

export interface DestinationWeatherWindow {
  months: string
  weather: string
  crowds: string
  note?: string
}

export interface DestinationFAQ {
  question: string
  answer: string
}

export type DestinationRegion =
  | 'Bahamas'
  | 'Mexico'
  | 'Caribbean'
  | 'Mexican Riviera'
  | 'Pacific Coast'
  | 'Alaska'
  | 'Mediterranean'
  | 'Iberian Peninsula'
  | 'Northern Europe'
  | 'British Isles'
  | 'Atlantic Islands'
  | 'Panama Canal'
  | 'South America'
  | 'Asia'
  | 'Home Port'

export interface DestinationPort {
  slug: string
  name: string
  shortName: string
  country: string
  region: DestinationRegion
  flag: string
  isPrivateIsland?: boolean
  dockType: 'pier' | 'tender' | 'pier-or-tender'
  typicalDockTime: string
  currency: string
  language: string
  heroTagline: string
  metaTitle: string
  metaDescription: string
  seoKeywords: string[]
  overview: string[]
  keyFacts: { label: string; value: string; icon: string }[]
  thingsToDo: DestinationActivity[]
  excursionGuidance: string
  excursions: DestinationExcursion[]
  dining: DestinationDining[]
  familyTips: string[]
  insiderTips: { title: string; detail: string }[]
  bestTimeSummary: string
  weatherWindows: DestinationWeatherWindow[]
  weatherSummary: string
  gettingAround: DestinationGettingAround[]
  shipsThatVisit: { name: string; slug: string }[]
  faqs: DestinationFAQ[]
}

export const destinationPorts: DestinationPort[] = [
  // ───────────────────────────────────────────────────────────────
  // NASSAU, BAHAMAS
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'nassau',
    name: 'Nassau, Bahamas',
    shortName: 'Nassau',
    country: 'Bahamas',
    region: 'Bahamas',
    flag: '🇧🇸',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:30 PM (~8 hours)',
    currency: 'Bahamian Dollar (BSD) — USD accepted 1:1',
    language: 'English',
    heroTagline: "Disney's most-visited Bahamian port — and one of its most polarizing.",
    metaTitle: 'Nassau, Bahamas Disney Cruise Port Guide — Things to Do, Excursions & Tips',
    metaDescription:
      'Complete Nassau cruise port guide for Disney cruisers. Top excursions including Atlantis Aquaventure and Blue Lagoon Island, snorkeling, the straw market, family tips, and money-saving tricks for your Nassau port day.',
    seoKeywords: [
      'disney cruise nassau guide',
      'things to do in nassau on a disney cruise',
      'nassau cruise port excursions',
      'atlantis day pass disney cruise',
      'blue lagoon island disney',
      'nassau bahamas cruise tips',
    ],
    overview: [
      'Nassau is the capital of the Bahamas and Disney Cruise Line\'s most frequent port stop — every 3-night, 4-night, and 5-night Bahamian itinerary includes it, along with most longer Eastern Caribbean sailings. Disney ships dock right at Prince George Wharf in the heart of downtown, putting Bay Street, the straw market, and the Queen\'s Staircase within walking distance of the gangway.',
      'Nassau divides cruisers more than almost any other Disney port. Families who plan ahead — booking an Atlantis day pass, a beach club, or a snorkel trip — almost always rate the day a highlight. Families who walk off the ship without a plan tend to find downtown overwhelming, with aggressive taxi drivers, persistent vendors, and a tourist-trap feel within the first few blocks.',
      'The fix is simple: have a destination in mind before the gangway opens. Whether it\'s a Paradise Island resort, a beach 20 minutes away, or a snorkel boat, Nassau rewards a small amount of planning with a genuinely beautiful Bahamian beach day.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~8 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (no tender)', icon: '⚓' },
      { label: 'To Paradise Island', value: '10–15 min taxi', icon: '🚕' },
      { label: 'Currency', value: 'USD accepted', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
      { label: 'Best For', value: 'Beaches & water parks', icon: '🏖️' },
    ],
    thingsToDo: [
      {
        name: 'Atlantis Aquaventure Water Park',
        category: 'Water Park',
        duration: '6–8 hours',
        cost: '$130–$170 per person day pass',
        description:
          'The famous resort on Paradise Island includes 20+ slides, a lazy river that runs through shark-filled aquariums, multiple pools, and access to The Dig — the resort\'s walk-through marine habitat. Day passes (Aquaventure) are sold by Atlantis directly and resold by Disney as a shore excursion.',
        bestFor: 'Big kids, teens, thrill-seekers',
      },
      {
        name: 'Blue Lagoon Island Beach Day',
        category: 'Beach',
        duration: '5–7 hours',
        cost: '$60–$95 per person',
        description:
          'A private island 20 minutes from the cruise dock by ferry. White sand, calm water, hammocks, lunch buffet, and an optional dolphin or sea-lion encounter. Far more relaxed than Atlantis and significantly less expensive.',
        bestFor: 'Families wanting a calm beach day',
      },
      {
        name: 'Pirates of Nassau Museum',
        category: 'Museum',
        duration: '60–90 minutes',
        cost: '$13.50 adult / $6.75 child',
        description:
          'A short walk from Prince George Wharf, this small but well-done museum walks you through the golden age of Caribbean piracy with a full-size pirate ship replica indoors. A great rainy-day or in-between-excursions stop and an easy hit with kids 6–12.',
        bestFor: 'Families with elementary-age kids',
      },
      {
        name: 'Queen\'s Staircase & Fort Fincastle',
        category: 'Historic',
        duration: '60 minutes',
        cost: 'Free (staircase) / $3 (fort)',
        description:
          'A 66-step limestone staircase carved by enslaved Bahamians in the 1790s, leading up to Fort Fincastle and panoramic views of Nassau harbor. About 15 minutes on foot from the dock — the walk passes through residential Nassau, which gives a very different feel than Bay Street.',
        bestFor: 'History-curious families and walkers',
      },
      {
        name: 'Junkanoo Beach',
        category: 'Beach',
        duration: 'As long as you like',
        cost: 'Free',
        description:
          'The closest swimmable beach to the cruise port — about a 15-minute walk west along the harbor. Public, no entry fee, and bars and chair rentals on-site. Not the most beautiful beach in the Bahamas, but it\'s free, easy, and you can be back on the ship in 20 minutes.',
        bestFor: 'Budget-conscious families, short port days',
      },
      {
        name: 'Cable Beach',
        category: 'Beach',
        duration: '4–5 hours',
        cost: '$10–$12 taxi each way',
        description:
          'A 10–15 minute taxi ride west of the port. Long, soft white sand, calmer water than Junkanoo, and you can post up on the public sand for free or pay to use a hotel\'s pool/loungers. Better swimming and prettier scenery than the in-town beaches.',
        bestFor: 'Families who want a real beach without paying for an excursion',
      },
      {
        name: 'Straw Market & Bay Street Shopping',
        category: 'Shopping',
        duration: '1–2 hours',
        cost: 'Free entry',
        description:
          'The covered Straw Market sells handmade Bahamian crafts alongside imported souvenirs. Haggle politely — opening prices are roughly 2x what locals expect. Bay Street has duty-free jewelry, perfume, and liquor at prices that beat US retail but rarely beat Costco or online.',
        bestFor: 'Souvenir hunters; skip if you dislike a hard sell',
      },
      {
        name: 'Stuart Cove\'s Snorkel & Reef Tour',
        category: 'Snorkeling',
        duration: '3 hours',
        cost: '$50–$70 per person',
        description:
          'One of the best-respected boat operators in the Bahamas. Reef snorkel trips depart from a marina 20 minutes west of the cruise port. Water clarity is excellent and the guides are knowledgeable. Stuart Cove\'s also runs the famous Bahamas shark dive for certified divers.',
        bestFor: 'Confident swimmers ages 8+',
      },
    ],
    excursionGuidance:
      'Disney sells most major Nassau excursions through its own shore-excursion desk. The trade-off: Disney-booked excursions guarantee you\'ll make it back to the ship (if a tour runs late, the ship waits), but they typically cost 20–40% more than booking the same operator directly. For tightly-scheduled or hard-to-reach excursions (Exuma flying day trip, dolphin encounters), book with Disney for the guarantee. For straightforward beach-club or snorkel days, booking directly saves real money with minimal risk.',
    excursions: [
      {
        name: 'Atlantis Aquaventure Day Pass',
        source: 'either',
        cost: '$130 (direct) vs $170 (Disney)',
        description:
          'The cheapest path is to book directly through atlantisbahamas.com and take a $5/person taxi to Paradise Island. Disney\'s package adds round-trip transportation and the late-return guarantee.',
        tip: 'Book direct unless you\'re anxious about getting back to the ship. Atlantis is 15 minutes away — there\'s no realistic late-return scenario.',
      },
      {
        name: 'Blue Lagoon Island Beach Day',
        source: 'either',
        cost: '$60–$95 per person',
        description:
          'Available through Disney or directly via bluelagoonisland.com. Pricing is similar; convenience is the deciding factor.',
        tip: 'Add the dolphin encounter only if your kids are 8+ and genuinely interested. The basic beach day is the better value.',
      },
      {
        name: 'Swimming Pigs of Exuma (Flying Day Trip)',
        source: 'disney',
        cost: '$400–$550 per person',
        description:
          'A small charter plane flies you 30 minutes south to the Exumas to swim with the famous beach pigs. Tight on Nassau\'s 8-hour port window — book through Disney for the late-return guarantee.',
        tip: 'Only feasible on sailings with a full Nassau day. Skip on 6-hour port stops.',
      },
      {
        name: 'Stuart Cove\'s Reef Snorkel',
        source: 'independent',
        cost: '$50–$70 per person',
        description:
          'Book directly at stuartcove.com. Excellent operator, reliable schedules, and 30–40% cheaper than the Disney-resold version.',
        tip: 'Their morning trip lines up well with Disney\'s typical 8:00 AM Nassau arrival.',
      },
      {
        name: 'Historic Nassau Walking Tour',
        source: 'independent',
        cost: '$25–$40 per person',
        description:
          'Several local guides run small-group walking tours of Nassau\'s colonial history — Government House, Christ Church Cathedral, the Queen\'s Staircase, and Fort Fincastle. Tripshepherd and local Tripadvisor-rated guides are reliable picks.',
        tip: 'Pick a 9:00 AM start before the heat peaks. Wear sun protection — there\'s little shade.',
      },
    ],
    dining: [
      {
        name: 'Twin Brothers',
        category: 'Local Bahamian',
        location: 'Arawak Cay (Fish Fry) — 5 min taxi',
        description:
          'Cracked conch, conch fritters, fried snapper, and Goombay punch on a covered patio with the rest of the Fish Fry. Authentic Bahamian, family-friendly, and the most-recommended sit-down on the island.',
      },
      {
        name: 'Athena Cafe',
        category: 'Greek/American',
        location: 'Bay Street — 5 min walk from port',
        description:
          'Reliable air-conditioned lunch spot one block off the cruise dock. Greek salads, gyros, sandwiches, and good kids\' menu options. A safe choice when you need a break from the heat.',
      },
      {
        name: 'Daiquiri Shack',
        category: 'Casual / Drinks',
        location: 'Bay Street — 8 min walk',
        description:
          'Walk-up window slinging frozen daiquiris in dozens of flavors. Adults-only as a destination, but great for a quick adult moment while older kids browse the souvenir shops.',
      },
      {
        name: 'Pirate Republic Brewing',
        category: 'Brewery / Pub',
        location: 'Woodes Rogers Walk — 3 min from port',
        description:
          'Bahamas-brewed beer right at the harbor with a pub-grub menu. Open-air seating, kid-friendly, and one of the closest sit-down options to the gangway.',
      },
    ],
    familyTips: [
      'Strollers are fine on the dock and Bay Street, but the Queen\'s Staircase and the straw-market alleys are tight — leave the stroller on the ship for those.',
      'Atlantis is the most kid-pleasing option but exhausting; plan a low-key sea day after if you go.',
      'Public bathrooms are limited downtown — use the ship before you leave or duck into a restaurant.',
      'The walk back from Junkanoo Beach is hot and shadeless. Bring water and a hat for kids.',
      'Dolphin encounters are popular but check ages: most operators require kids to be at least 6, and some 8.',
      'The pirate museum is a good 60-minute backup plan if afternoon thunderstorms cancel your beach plans.',
    ],
    insiderTips: [
      {
        title: 'Negotiate every taxi fare before getting in',
        detail:
          'Nassau taxis don\'t use meters. Standard rates: $4 per person to Paradise Island, $5 per person to Cable Beach, $7 per person to Atlantis. Drivers will quote tourists higher — confirm the per-person rate and total before the door closes.',
      },
      {
        title: 'Walk past the straw market for better prices on the same items',
        detail:
          'Many Bay Street side-shops sell identical Bahamian souvenirs at fixed (lower) prices and without the haggling. Walk a block past the market entrance and compare.',
      },
      {
        title: 'Set a phone alarm for 45 minutes before all-aboard',
        detail:
          'Nassau is a strict-departure port — DCL leaves on schedule. Build a 30-minute buffer for the taxi back from Paradise Island, longer if it\'s raining.',
      },
      {
        title: 'Cable Beach is free if you walk past the hotel entrance',
        detail:
          'Cable Beach is public Bahamian sand. Hotels charge for their pool/lounger area, but you can set up on the open beach right next door for nothing.',
      },
      {
        title: 'Atlantis is cheaper booked directly, but cabanas are not',
        detail:
          'Day passes are 20–25% cheaper booked at atlantisbahamas.com vs Disney. But cabana rentals are sold separately by Atlantis only and are non-negotiable — reserve weeks in advance if you want one.',
      },
      {
        title: 'On a 3-night Bahamian, manage expectations for downtown',
        detail:
          'Nassau is your only non-Castaway stop on a 3-night cruise. The downtown experience is fine for an hour of souvenir browsing but isn\'t the highlight of the day — plan a real activity.',
      },
    ],
    bestTimeSummary:
      'Nassau is sail-able year-round but the experience varies meaningfully by month. November–April is dry season, with comfortable temperatures (75–82°F) and minimal rain. May and October are the sweet spots for fewer crowds. June–September is hot, humid, and the heart of hurricane season — beautiful when it\'s clear, miserable when it\'s not.',
    weatherWindows: [
      {
        months: 'December – April',
        weather: '75–82°F, low humidity, rare rain',
        crowds: 'Peak (especially Christmas, MLK weekend, Spring Break)',
        note: 'Best weather of the year. Book Atlantis cabanas months in advance.',
      },
      {
        months: 'May & October',
        weather: '82–86°F, occasional showers',
        crowds: 'Moderate',
        note: 'Sweet spot — good weather, lighter crowds, lower cruise prices.',
      },
      {
        months: 'June – September',
        weather: '86–90°F, high humidity, daily afternoon thunderstorms',
        crowds: 'Light to moderate (summer family rush)',
        note: 'Hurricane season peaks August–September. Disney reroutes when needed.',
      },
      {
        months: 'November',
        weather: '78–84°F, low humidity, very pleasant',
        crowds: 'Light (between Halloween and Thanksgiving)',
        note: 'One of the most underrated months for a Bahamian cruise.',
      },
    ],
    weatherSummary:
      'Subtropical year-round. Plan for sun protection in every season — UV index is high even on overcast days. Afternoon thunderstorms are common June–September; they typically pass within an hour.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'Bay Street, the straw market, the pirate museum, and Junkanoo Beach are all within a 15-minute walk of Prince George Wharf.',
      },
      {
        method: 'Taxi',
        cost: '$4–$10 per person',
        description:
          'Plentiful at the dock. Always confirm the per-person fare before getting in. Most drivers accept USD.',
      },
      {
        method: 'Atlantis Ferry / Water Taxi',
        cost: '$4–$8 per person',
        description:
          'Water taxis run between the cruise port and Paradise Island throughout the day. Slower than a regular taxi but a more scenic ride.',
      },
      {
        method: 'Jitney (Local Bus)',
        cost: '$1.25 per person',
        description:
          'The cheapest way to reach Cable Beach. The #10 bus departs from West Bay Street, a 5-minute walk from the dock. Cash only, exact change preferred.',
      },
      {
        method: 'Horse-Drawn Carriage',
        cost: '$10–$15 per person',
        description:
          'Charming for a 30-minute downtown loop. The carriage stand is right at the gangway. Confirm the route and price before boarding.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Dream', slug: 'disney-dream' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Destiny', slug: 'disney-destiny' },
    ],
    faqs: [
      {
        question: 'Is Nassau safe for Disney cruise families?',
        answer:
          'The cruise port and main tourist areas (Bay Street, Paradise Island, Cable Beach) are safe during the day. Stick to populated areas, keep valuables in the ship safe, and avoid wandering into residential neighborhoods at night. Most Disney guests have zero safety issues.',
      },
      {
        question: 'Do I need a passport for Nassau?',
        answer:
          'A US passport book is required for any cruise that visits Nassau, including closed-loop sailings from US ports. Make sure your passport is valid for at least 6 months past your return date.',
      },
      {
        question: 'How much cash should I bring?',
        answer:
          'Plan for $50–$100 per person for taxis, tips, drinks, and small purchases. Most restaurants and shops accept credit cards, but small vendors and taxi drivers prefer USD cash.',
      },
      {
        question: 'Can I walk to a beach from the ship?',
        answer:
          'Yes — Junkanoo Beach is a 15-minute walk west of Prince George Wharf. It\'s public, free, and has chair rentals and bars on-site. Cable Beach is a better beach but requires a 10-minute taxi.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // CASTAWAY CAY
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'castaway-cay',
    name: 'Castaway Cay',
    shortName: 'Castaway Cay',
    country: "Disney's Private Island, Bahamas",
    region: 'Bahamas',
    flag: '🏝️',
    isPrivateIsland: true,
    dockType: 'pier',
    typicalDockTime: '9:30 AM – 4:30 PM (~7 hours)',
    currency: 'USD (charged to room key / DCL Navigator)',
    language: 'English',
    heroTagline: "Disney's original private island — and still the gold standard for a beach day at sea.",
    metaTitle: 'Castaway Cay Disney Cruise Guide — Things to Do, Beaches, Food & Tips',
    metaDescription:
      'Complete Castaway Cay guide for Disney Cruise Line guests. Pelican Plunge, Serenity Bay, snorkel trail, the 5K, bike rentals, Cookie\'s BBQ, and insider tips for the best Disney private island day.',
    seoKeywords: [
      'castaway cay guide',
      'disney private island',
      'castaway cay things to do',
      'serenity bay disney',
      'pelican plunge castaway cay',
      'castaway cay 5k',
      'castaway cay snorkel trail',
      'castaway cay tips',
    ],
    overview: [
      'Castaway Cay (pronounced "key") is Disney Cruise Line\'s original private island, leased from the Bahamian government since the late 1990s. Tucked into the Abacos chain, it\'s the only Caribbean private island where ships dock pierside instead of tendering — a practical advantage that means you can step off the gangway and be on the sand in 10 minutes, then come back to the ship for lunch or a nap whenever you like.',
      'For most Disney cruise families, Castaway Cay is the highlight of the trip. The beaches are quiet (only Disney passengers — typically one ship per day), the lunch is included in your cruise fare, the snorkel trail is one of the best easy-snorkel experiences in the Caribbean, and the whole day runs on Disney logistics: a tram from the gangway to the family beach, lifeguards everywhere, free fruit stations, and free water you can refill all day.',
      'A few things to know going in: weather can cancel the stop (Disney reroutes 5–10% of Castaway calls per year due to wind), the adults-only Serenity Bay is a 15-minute walk or a tram ride from the family beach, and the most popular extras (cabanas, parasailing, the 5K medal) sell out the moment booking opens at 90 or 75 days before sailing.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~7 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (no tender)', icon: '⚓' },
      { label: 'Lunch', value: 'Included (Cookie\'s BBQ)', icon: '🍔' },
      { label: 'Charge Method', value: 'DCL Navigator only', icon: '💳' },
      { label: 'Adults-Only Beach', value: 'Serenity Bay', icon: '🍹' },
      { label: 'Weather Risk', value: '~5–10% cancel rate', icon: '⛅' },
    ],
    thingsToDo: [
      {
        name: 'Pelican Plunge Floating Water Slide',
        category: 'Water Activity',
        duration: 'As long as the line lets you',
        cost: 'Included',
        description:
          'A floating platform anchored 100 yards offshore with two enclosed waterslides that drop you back into the ocean. Free to use, height requirement is 48", and the swim out to the platform is the calmest water you\'ll find anywhere.',
        bestFor: 'Kids and adults 48"+',
      },
      {
        name: 'Castaway Cay Snorkel Trail',
        category: 'Snorkeling',
        duration: '1–3 hours',
        cost: 'Free (gear $20 day rental, or bring your own)',
        description:
          'A roped-in snorkel area with sunken statues, a Disney "treasure" submarine, and reefs busy with parrotfish, sergeant majors, and the occasional ray. Genuinely one of the best easy-snorkel experiences in the Caribbean — kids 5+ can do it.',
        bestFor: 'Any snorkeler, beginner-friendly',
      },
      {
        name: 'Castaway Cay 5K',
        category: 'Run',
        duration: '30–60 minutes',
        cost: 'Free (sign up at Guest Services, day of arrival)',
        description:
          'A free morning 5K run/walk through the unused interior of the island, with a finisher\'s medal you keep. Sign up at Guest Services on board the night before — slots fill quickly. Walkers welcome, kids who can run a 5K can participate too.',
        bestFor: 'Runners and runner-curious adults',
      },
      {
        name: 'Bike Rentals',
        category: 'Beach Activity',
        duration: '1 hour rental',
        cost: '$10 per bike per hour',
        description:
          'Cruise the paved bike path along the family beach and out toward the abandoned airstrip. Easy, flat ride. Helmets included. Single-speed cruisers — no kids\' tag-alongs but child-size bikes are available.',
        bestFor: 'Families with kids 6+',
      },
      {
        name: 'Serenity Bay (Adults-Only Beach)',
        category: 'Adults-Only',
        duration: '4–6 hours',
        cost: 'Free',
        description:
          'A separate, longer, quieter stretch of beach reserved for guests 18+. Its own bar, its own BBQ (Air Bar, lighter menu than Cookie\'s), hammocks tucked into the trees, and very few crowds. Reach it via tram (5 min) or a shaded walking path (15 min).',
        bestFor: 'Adults wanting a real beach day',
      },
      {
        name: 'Pelican Point Snorkel & Stingray Adventure',
        category: 'Excursion',
        duration: '90 minutes',
        cost: '$45 adult / $30 child',
        description:
          'Disney-run guided experience where you wade into a roped-in lagoon to interact with a small group of Southern stingrays. Educational, well-managed, and one of the few Castaway extras that\'s actually worth the upcharge.',
        bestFor: 'Animal-loving kids 5+',
      },
      {
        name: 'Castaway Family Beach',
        category: 'Beach',
        duration: 'Full day',
        cost: 'Free (chairs and umbrellas included)',
        description:
          'The main family beach — protected lagoon, soft sand, calm water, lifeguards, free chairs and umbrellas. Three free fruit/water stations spread along the beach. The default Castaway day starts and ends here.',
        bestFor: 'Everyone',
      },
      {
        name: 'In Da Shade Game Pavilion',
        category: 'Free Activity',
        duration: 'Drop-in',
        cost: 'Free',
        description:
          'A covered pavilion near the family beach with foosball, ping pong, basketball, and giant-size games. A sanity-saver when kids get bored of the sand or you need shade for an hour.',
        bestFor: 'Tweens, teens, parents needing a break',
      },
    ],
    excursionGuidance:
      'Castaway Cay is unique: most of what makes the day great is included with your cruise fare (beach access, lunch at Cookie\'s, the snorkel trail, bikes, the 5K, the play structures). Paid extras layer on top — and the most popular ones (cabanas, parasailing, glass-bottom boat) sell out the instant booking opens at 90 days for Castaway Club members and 75 days for first-timers. If you want a cabana, book it at the second your booking window opens.',
    excursions: [
      {
        name: 'Beach Cabana Rental',
        source: 'disney',
        cost: '$700–$1,400 (family) / $499–$899 (Serenity Bay)',
        description:
          'Private cabanas on the family beach or Serenity Bay with dedicated host, bottled water, fresh fruit, snorkel gear, floats, and a private beach area. Family cabanas sleep up to 6, Serenity cabanas up to 4 adults.',
        tip: 'Book the moment your reservation window opens — they sell out in seconds.',
      },
      {
        name: 'Parasailing',
        source: 'disney',
        cost: '$95 per person',
        description:
          '~10 minutes of flight time, height requirement 90 lb minimum, single or tandem. The best aerial view of the island. Books up fast — reserve at the start of your booking window.',
        tip: 'First slot of the day has the calmest water and least wait.',
      },
      {
        name: 'Glass-Bottom Boat',
        source: 'disney',
        cost: '$45 adult / $30 child',
        description:
          '45-minute reef tour with a guide pointing out marine life through the boat\'s glass floor. Good for non-swimmers and very young kids who can\'t do the snorkel trail.',
        tip: 'A great low-energy option for a day with babies or grandparents.',
      },
      {
        name: 'Bottom Fishing Excursion',
        source: 'disney',
        cost: '$135 adult / $100 child',
        description:
          '3.5-hour boat trip with rods, bait, and a guide. Kids 6+ welcome. You don\'t bring fish back to the ship, but the catch-and-release is genuinely fun.',
        tip: 'A solid option for cruise dads and tween boys.',
      },
      {
        name: 'Castaway Ray\'s Stingray Adventure',
        source: 'disney',
        cost: '$45 adult / $30 child (kids 5+)',
        description:
          '60–90 minute guided wade with stingrays in a roped lagoon. Educational, calm, and a popular hit with kids 6–12.',
        tip: 'Sign up early — afternoon slots are easiest to grab.',
      },
    ],
    dining: [
      {
        name: "Cookie's BBQ",
        category: 'BBQ Buffet (included)',
        location: 'Family Beach',
        description:
          'The headline lunch on the family beach. Burgers, hot dogs, ribs, jerk chicken, fresh fruit, salads, ice cream, and unlimited soft drinks. Open from late morning through mid-afternoon. Genuinely one of the best meals of the cruise.',
      },
      {
        name: "Cookie's Too BBQ",
        category: 'BBQ Buffet (included)',
        location: 'Family Beach (toward Pelican Plunge)',
        description:
          'Identical menu to Cookie\'s, opened to spread the lunch crowd. Usually has a shorter line. Same hours.',
      },
      {
        name: 'Serenity Bay BBQ (Air Bar)',
        category: 'Adults-Only BBQ',
        location: 'Serenity Bay',
        description:
          'A scaled-down BBQ menu (grilled fish, chicken, salads) plus a full bar. Adults only. Quieter than Cookie\'s and closer to the Serenity Bay loungers.',
      },
      {
        name: 'Conched Out Bar / Heads Up Bar / Castaway Air Bar',
        category: 'Bars (extra)',
        location: 'Family Beach / Serenity Bay',
        description:
          'Multiple bars across both beaches. Cocktails are charged to your room key (drink package counts). The signature Konk Cooler is the unofficial drink of the island.',
      },
    ],
    familyTips: [
      'Get off the ship as soon as it\'s cleared — the first 90 minutes are the calmest at every beach and water area.',
      'Bring water shoes — the swim-up area has rocks and shells, and the snorkel trail is more comfortable with them.',
      'Use the ship\'s free reusable water bottles and refill at the free water stations on the island. Disposable plastic isn\'t sold.',
      'Strollers are allowed; trams accommodate them. Bring sun protection — there\'s shade at Cookie\'s but not much on the open sand.',
      'Kids\' clubs (Oceaneer Club / Lab) are open on the island in their own air-conditioned space — let little kids cool off there mid-day.',
      'Castaway Cay is one of the few stops where it\'s genuinely worth eating a heavy lunch ashore and skipping the dining-room dinner if you want a quiet evening.',
    ],
    insiderTips: [
      {
        title: 'Cabanas open at exactly 90 or 75 days — set a calendar reminder',
        detail:
          'Castaway Club Platinum: 123 days, Gold: 105 days, Silver: 90 days, first-timers: 75 days. Cabanas sell out in literal seconds. Be logged into the Disney Cruise Line site at midnight Eastern the morning your window opens.',
      },
      {
        title: 'Sign up for the 5K the night before',
        detail:
          'Guest Services takes signups starting around 7 PM the night before Castaway Cay. Slots fill by 9 PM. The medal is high-quality and free.',
      },
      {
        title: 'Take the second tram, not the first',
        detail:
          'The first tram from the dock to the family beach is packed. The second one (5 minutes later) is half-full and just as fast.',
      },
      {
        title: 'Serenity Bay\'s walking path is shaded and faster than waiting for the tram',
        detail:
          '15-minute walk with mostly shaded boardwalks and signage. Beats waiting 20 minutes for the tram in peak hours.',
      },
      {
        title: 'Snorkel gear is free if you bring your own from the ship',
        detail:
          'Disney rents snorkel gear for $20/day on the island, but you can also rent gear on the ship and use it everywhere. Bringing your own from home is the cheapest option for families that snorkel often.',
      },
      {
        title: 'When Castaway Cay is canceled, Lookout Cay or Nassau usually replaces it',
        detail:
          'Disney almost never substitutes a sea day for a canceled Castaway. If wind cancels Castaway, you\'ll typically get an extra Nassau or Lookout Cay day announced 12–24 hours before.',
      },
    ],
    bestTimeSummary:
      'Castaway Cay is a year-round port, but wind is the variable that matters. Disney cancels Castaway when sustained winds push 25+ knots — most common December–February cold fronts and August–September tropical systems. April, May, and November are the calmest months for the highest probability of an actual landing.',
    weatherWindows: [
      {
        months: 'April – May',
        weather: '78–85°F, low wind, almost no rain',
        crowds: 'Moderate (Spring Break declines after mid-April)',
        note: 'Highest probability of landing. Best swim conditions of the year.',
      },
      {
        months: 'June – August',
        weather: '85–90°F, hot and humid, brief afternoon storms',
        crowds: 'Heavy (summer family rush)',
        note: 'Plan an early-morning beach session before the heat peaks at 1 PM.',
      },
      {
        months: 'September – October',
        weather: '82–88°F, hurricane-active',
        crowds: 'Light',
        note: 'Highest cancellation rate. Travel insurance recommended.',
      },
      {
        months: 'November',
        weather: '78–84°F, low wind, low humidity',
        crowds: 'Light to moderate',
        note: 'A genuinely underrated month — same calm conditions as April with smaller crowds.',
      },
      {
        months: 'December – February',
        weather: '72–80°F, cold-front winds 5–10 days/month',
        crowds: 'Heavy at Christmas/NYE, lighter mid-January',
        note: 'When a front blows through, water gets cold (low 70s) and Castaway can cancel.',
      },
    ],
    weatherSummary:
      'Subtropical Bahamian climate. Sun is intense year-round — broad-spectrum reef-safe sunscreen is required for the snorkel trail. Wind is the only weather factor that consistently causes cancellations.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'Family beach is a 5-minute walk from the gangway. Serenity Bay is a 15-minute shaded boardwalk walk from the gangway.',
      },
      {
        method: 'Tram',
        cost: 'Free',
        description:
          'Open-air trams run continuously between the dock, family beach, Serenity Bay, and the bike/snorkel area. Stroller- and ECV-accessible.',
      },
      {
        method: 'Bikes',
        cost: '$10/hour',
        description:
          'Single-speed beach cruisers, kids\' bikes available, helmets included. Paved trail along the family beach and out to the airstrip.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Dream', slug: 'disney-dream' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Wonder', slug: 'disney-wonder' },
      { name: 'Disney Destiny', slug: 'disney-destiny' },
    ],
    faqs: [
      {
        question: 'Can I leave Castaway Cay early to go back to the ship?',
        answer:
          'Yes — the gangway is open all day. You can come back to the ship for a nap, the kids\' clubs (which are open with reduced capacity), or to escape the heat, then return to the island as many times as you like.',
      },
      {
        question: 'How often is Castaway Cay canceled?',
        answer:
          'Roughly 5–10% of scheduled stops. Cancellations are weather-driven (sustained winds above ~25 knots make the dock unsafe). Disney typically substitutes Lookout Cay or an extra Nassau day rather than a sea day.',
      },
      {
        question: 'Is there cell service?',
        answer:
          'Limited. There\'s a Disney WiFi network on parts of the island for guests with the Connect@Sea internet package. Some US carriers pick up Bahamian signal but it\'s spotty and roaming charges apply.',
      },
      {
        question: 'Can I use cash on the island?',
        answer:
          'No — Castaway Cay is cashless. Everything is charged to your DCL Navigator (room key). Tips for bartenders and cabana hosts can be added to the receipt or settled in cash brought from the ship.',
      },
      {
        question: 'Are there cabanas at Serenity Bay?',
        answer:
          'Yes — 6 cabanas, smaller than the family beach versions, designed for 4 adults. They sell out the fastest of any cabana.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // LOOKOUT CAY AT LIGHTHOUSE POINT
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'lookout-cay',
    name: 'Lookout Cay at Lighthouse Point',
    shortName: 'Lookout Cay',
    country: 'Eleuthera, Bahamas',
    region: 'Bahamas',
    flag: '🏝️',
    isPrivateIsland: true,
    dockType: 'pier',
    typicalDockTime: '9:30 AM – 5:00 PM (~7.5 hours)',
    currency: 'USD (charged to DCL Navigator)',
    language: 'English',
    heroTagline: "Disney's newest private destination — opened June 2024 on Eleuthera's southern tip.",
    metaTitle: 'Lookout Cay at Lighthouse Point Disney Cruise Guide — Things to Do & Tips',
    metaDescription:
      'Complete guide to Disney\'s newest private destination, Lookout Cay at Lighthouse Point on Eleuthera. Beaches, water slides, Bahamian culture, cabanas, dining, and tips for your port day.',
    seoKeywords: [
      'lookout cay disney cruise',
      'lighthouse point disney',
      'disney eleuthera private island',
      'lookout cay things to do',
      'lookout cay vs castaway cay',
      'lookout cay tips',
    ],
    overview: [
      'Lookout Cay at Lighthouse Point is Disney Cruise Line\'s second private destination, opened in June 2024 on the southern tip of Eleuthera, about 50 nautical miles east of Nassau. Unlike Castaway Cay, which leans entirely on its Disney-island identity, Lookout Cay was designed to celebrate Bahamian culture — the architecture, food, music, and cast of local Bahamian artisans and performers are integrated into the experience by design.',
      'The destination spans about 700 acres but uses only a small fraction of that — Disney committed to leaving the bulk of the land undeveloped as a marine and bird sanctuary. The visitor footprint includes Goombay Cultural Pavilion, Sebastian\'s Cay (the family beach), Serenity Bay equivalent (Pearl Cove for adults), a kids\' splash and play area called Kapok Square, and the centerpiece Rush-Out Gully water-slide tower.',
      'Cruisers comparing Lookout to Castaway find both have their case. Castaway is the more polished operation, the better easy-snorkel destination, and the more familiar experience. Lookout has a more dramatic landscape (cliffs, longer beaches, the namesake lighthouse), genuinely strong Bahamian cultural programming, more shade, and — for now — fewer cabanas and tighter logistics. If your sailing visits both, you get the best of two very different days. If you only get one, Castaway is the safer bet for first-time cruisers and Lookout for anyone who has been to Castaway 3+ times.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~7.5 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (no tender)', icon: '⚓' },
      { label: 'Opened', value: 'June 2024', icon: '🆕' },
      { label: 'Lunch', value: 'Included (Goombay)', icon: '🍔' },
      { label: 'Adults-Only Beach', value: 'Pearl Cove', icon: '🍹' },
      { label: 'Charge Method', value: 'DCL Navigator only', icon: '💳' },
    ],
    thingsToDo: [
      {
        name: 'Rush-Out Gully Water Slides',
        category: 'Water Activity',
        duration: 'As long as the line allows',
        cost: 'Included',
        description:
          'The signature attraction — a tall water-slide tower with two body slides and a tube slide that descend into a freshwater pool. Height requirement 48". The tower also has the best elevated viewpoint of the destination.',
        bestFor: 'Kids and adults 48"+',
      },
      {
        name: 'Sebastian\'s Cay (Family Beach)',
        category: 'Beach',
        duration: 'Full day',
        cost: 'Free (chairs and umbrellas included)',
        description:
          'The main family beach — softer pink-tinted sand than Castaway, calm water on most days, lifeguards on duty, and free chairs and umbrellas. Reefs offshore mean snorkeling is rougher than Castaway\'s — better for capable swimmers than beginners.',
        bestFor: 'Families with strong swimmers',
      },
      {
        name: 'Pearl Cove (Adults-Only)',
        category: 'Adults-Only',
        duration: '4–6 hours',
        cost: 'Free',
        description:
          'The 18+ beach, framed by limestone cliffs and accessible via a short shuttle from the gangway. Quieter than Sebastian\'s Cay, with a dedicated bar, hammocks, and a separate, smaller BBQ. Some of the best ocean views of any Disney private island.',
        bestFor: 'Adults wanting space and a view',
      },
      {
        name: 'Goombay Cultural Pavilion',
        category: 'Cultural',
        duration: 'Drop-in throughout the day',
        cost: 'Free',
        description:
          'A central pavilion with rotating Bahamian craftspeople, Junkanoo dance performances, live music, and family-friendly programming. The cultural center of the destination by design.',
        bestFor: 'Everyone',
      },
      {
        name: 'Kapok Square Splash Pad',
        category: 'Kids',
        duration: 'Drop-in',
        cost: 'Free',
        description:
          'A water-play zone for younger kids (under 48") with shallow water, sprayers, and dump buckets. Shaded seating for parents around the perimeter.',
        bestFor: 'Toddlers and young kids',
      },
      {
        name: 'Lighthouse Point Walking Trail',
        category: 'Walk',
        duration: '30–60 minutes',
        cost: 'Free',
        description:
          'A short interpretive trail that follows the cliff edge to the namesake lighthouse with views back across the destination. Easy walking but limited shade — go early or late, not midday.',
        bestFor: 'Photographers and walkers',
      },
      {
        name: 'In-Water Snorkel Lagoon',
        category: 'Snorkeling',
        duration: '1–2 hours',
        cost: 'Free (gear rental $20)',
        description:
          'A protected swim-and-snorkel lagoon at Sebastian\'s Cay — much smaller than Castaway\'s snorkel trail, with limited reef life but calm enough for first-time snorkelers. Don\'t go to Lookout for the snorkeling; go for everything else.',
        bestFor: 'Casual snorkelers',
      },
      {
        name: 'Bahamian Storytelling & Junkanoo Drum Workshops',
        category: 'Cultural',
        duration: '30 minutes',
        cost: 'Free',
        description:
          'Scheduled programs at Goombay and on the family beach — local performers teach kids basic Junkanoo rhythms and tell traditional Eleutheran stories. Genuinely well-done and worth a 30-minute slot.',
        bestFor: 'Families with kids 5–12',
      },
    ],
    excursionGuidance:
      'Lookout Cay is brand new — the slate of paid excursions is smaller than Castaway\'s, and selection is still expanding. The included experience (beaches, water slides, lunch, cultural programming) is excellent on its own; paid extras are mostly cabanas and cultural deep-dives. If you want a cabana, book it the moment your reservation window opens — Lookout has fewer cabanas than Castaway, and they sell faster.',
    excursions: [
      {
        name: 'Sebastian\'s Cay Cabana',
        source: 'disney',
        cost: '$899–$1,599',
        description:
          'Family beach cabana with dedicated host, water, fruit, snorkel gear, and float rentals. Sleeps up to 6. Fewer cabanas than Castaway means they sell out faster.',
        tip: 'Booking-window timing matters more here than at Castaway. Be online at the second your window opens.',
      },
      {
        name: 'Pearl Cove Cabana',
        source: 'disney',
        cost: '$799–$1,299',
        description:
          'Adults-only cabana on the cliff-framed Pearl Cove beach. Up to 4 adults. The most coveted cabana in the entire DCL fleet of private destinations — single-digit availability per sailing.',
        tip: 'If you want this, plan your sailing date around the day your booking window opens.',
      },
      {
        name: 'Discover Eleuthera Excursion',
        source: 'disney',
        cost: '$80 adult / $55 child',
        description:
          'A bus tour to nearby Bannerman Town and the Glass Window Bridge — a short land excursion off Disney property to see real Eleutheran sights. Limited capacity, relatively new.',
        tip: 'Worth it for second-time Lookout visitors who want something beyond the destination.',
      },
      {
        name: 'Cultural Heritage Walking Tour',
        source: 'disney',
        cost: '$35 adult / $20 child',
        description:
          'Guided walk through the destination with a Bahamian cultural ambassador covering the lighthouse history, marine sanctuary, and sustainable design choices.',
        tip: 'A solid 90-minute add for travelers who want context with their beach day.',
      },
    ],
    dining: [
      {
        name: 'Goombay Cultural Pavilion BBQ',
        category: 'BBQ + Bahamian (included)',
        location: 'Central Pavilion',
        description:
          'The headline lunch — a mix of standard cruise BBQ (burgers, hot dogs, ribs) plus genuine Bahamian dishes like jerk chicken, peas and rice, fried plantains, and conch fritters. Better menu than Cookie\'s for adventurous eaters.',
      },
      {
        name: 'Sebastian\'s Cay BBQ',
        category: 'BBQ Buffet (included)',
        location: 'Family Beach',
        description:
          'Family-beach satellite BBQ with the standard menu (burgers, hot dogs, salads, fruit, desserts). Open the same hours as Goombay.',
      },
      {
        name: 'Pearl Cove BBQ',
        category: 'Adults-Only BBQ',
        location: 'Pearl Cove',
        description:
          'Adults-only menu with grilled fish, lighter mains, and a more curated selection. Quieter than the family options.',
      },
      {
        name: 'Sip Sip / Bahama Mama / Junkanoo Bars',
        category: 'Bars (extra)',
        location: 'Throughout the destination',
        description:
          'Multiple bars across the family beach and Pearl Cove, plus a central bar at Goombay. Cocktails charged to room key. Local Bahamian rums and Sands beer feature on the menu.',
      },
    ],
    familyTips: [
      'Lookout Cay has noticeably more shade than Castaway thanks to the architecture and tree cover — easier on babies and kids who burn fast.',
      'The water at Sebastian\'s Cay is rockier underfoot than Castaway. Water shoes are recommended.',
      'The walk from the gangway to the family beach is longer than at Castaway — figure 10–15 minutes or take the shuttle.',
      'Younger kids will spend more time at Kapok Square (the splash zone) than at Sebastian\'s Cay — set up base camp near the splash zone if you have toddlers.',
      'The cultural programming at Goombay is genuinely good and a nice break from full-on beach time.',
      'Bring a reusable water bottle — refill stations are spread throughout, no plastic bottles sold.',
    ],
    insiderTips: [
      {
        title: 'Lookout sells out cabanas faster than Castaway',
        detail:
          'There are fewer cabanas at Lookout than at Castaway, and they sell instantly when the booking window opens. Set a calendar reminder and be logged in.',
      },
      {
        title: 'The pink-sand beach claim is real but subtle',
        detail:
          'Sebastian\'s Cay sand has a faint pink tint from crushed conch shell and red coralline algae. It\'s not Bermuda-pink, but it\'s noticeable in photos with side-lit sun.',
      },
      {
        title: 'Pearl Cove fills up in the morning',
        detail:
          'The adult beach is smaller than Serenity Bay at Castaway. By 11 AM the loungers fill. Get there by 10:00 if you want the prime spots.',
      },
      {
        title: 'The lighthouse trail is best at dock-departure time',
        detail:
          'Late afternoon, after most guests are back near the ship for boarding, the lighthouse trail empties out and the light is dramatic. A great final 45 minutes of the day.',
      },
      {
        title: 'Snorkeling is not the headline here — set expectations',
        detail:
          'Castaway\'s snorkel trail is a destination unto itself. Lookout\'s snorkel lagoon is a casual swim with mild reef interest. If snorkeling is a priority, save it for Castaway.',
      },
      {
        title: 'When weather cancels Lookout, Castaway is the typical backup',
        detail:
          'On itineraries that visit both, a weather cancellation at one usually means an extra day at the other. Itineraries with only Lookout sometimes get a Nassau substitute.',
      },
    ],
    bestTimeSummary:
      'Lookout Cay is on the windward side of Eleuthera and sees more wind on average than Castaway Cay, which slightly raises its weather-cancellation rate. The same general windows apply: April–May and November are the calmest months; June–September is hot and storm-prone; December–February has cold-front risk.',
    weatherWindows: [
      {
        months: 'April – May',
        weather: '78–85°F, low wind, dry',
        crowds: 'Moderate',
        note: 'Best landing-probability window of the year.',
      },
      {
        months: 'June – August',
        weather: '85–90°F, hot, brief afternoon storms',
        crowds: 'Heavy',
        note: 'Plenty of shade compared to Castaway — bearable in midday.',
      },
      {
        months: 'September – October',
        weather: '82–88°F, hurricane-active',
        crowds: 'Light',
        note: 'Highest cancellation rate. Travel insurance recommended.',
      },
      {
        months: 'November',
        weather: '78–84°F, low humidity',
        crowds: 'Light',
        note: 'Excellent month — comparable to April with smaller crowds.',
      },
      {
        months: 'December – February',
        weather: '72–80°F, cold-front winds',
        crowds: 'Heavy at Christmas/NYE',
        note: 'Lookout cancels slightly more often than Castaway in this window.',
      },
    ],
    weatherSummary:
      'Subtropical Bahamian climate, slightly windier on average than Castaway. Reef-safe sunscreen required for the swim lagoon. Limestone-rock beach approach means water shoes are smart year-round.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'Sebastian\'s Cay is a 10–15 minute walk from the gangway. Pearl Cove is farther — most adults take the shuttle.',
      },
      {
        method: 'Shuttle',
        cost: 'Free',
        description:
          'Continuous shuttle service between the gangway, Sebastian\'s Cay, Goombay, Pearl Cove, and the lighthouse area. Stroller and ECV accessible.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Dream', slug: 'disney-dream' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Destiny', slug: 'disney-destiny' },
    ],
    faqs: [
      {
        question: 'Is Lookout Cay better than Castaway Cay?',
        answer:
          'Different, not strictly better. Castaway is more polished, has the better easy-snorkel experience, and is the safer pick for first-timers. Lookout has more dramatic scenery, better Bahamian cultural programming, and more shade. Many DCL veterans now prefer Lookout; first-timers usually still prefer Castaway.',
      },
      {
        question: 'Does my sailing visit Lookout Cay?',
        answer:
          'Most 3-night, 4-night, and 5-night Bahamian itineraries from Port Canaveral and Miami now include either Castaway, Lookout, or both. Check your specific itinerary on the Disney Cruise Line site or in your DCL Navigator app.',
      },
      {
        question: 'Can babies and toddlers come to Lookout Cay?',
        answer:
          'Yes — Kapok Square is purpose-built for kids under 48", and there\'s shade and shallow swim areas. Strollers and ECVs are fully accommodated by the shuttle.',
      },
      {
        question: 'Is the water clear like Castaway Cay?',
        answer:
          'On calm days, yes — exceptionally so. On windy days the windward side picks up more chop than Castaway\'s sheltered lagoon, so visibility for snorkeling is more variable.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // COZUMEL, MEXICO
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'cozumel',
    name: 'Cozumel, Mexico',
    shortName: 'Cozumel',
    country: 'Mexico',
    region: 'Mexico',
    flag: '🇲🇽',
    dockType: 'pier',
    typicalDockTime: '10:00 AM – 8:00 PM (~10 hours)',
    currency: 'Mexican Peso (MXN) — USD widely accepted',
    language: 'Spanish (English widely spoken in tourist areas)',
    heroTagline: "World-class snorkeling, Mayan history, and one of the best beach-club scenes in the Caribbean.",
    metaTitle: 'Cozumel Disney Cruise Port Guide — Snorkeling, Mayan Ruins, Beach Clubs & Tips',
    metaDescription:
      'Complete Cozumel cruise port guide for Disney cruisers. Top excursions including Palancar Reef snorkeling, Tulum and Chichen Itza day trips, Paradise Beach and Mr. Sancho\'s, dining, family tips, and money-saving tricks.',
    seoKeywords: [
      'disney cruise cozumel guide',
      'things to do in cozumel on a disney cruise',
      'cozumel cruise port excursions',
      'cozumel beach clubs',
      'cozumel snorkeling disney',
      'tulum day trip from cozumel',
    ],
    overview: [
      'Cozumel is a 30-mile-long Mexican island just off the Yucatán coast and one of the busiest cruise ports in the world. Disney ships dock at one of three piers — Punta Langosta (downtown San Miguel), International Pier, or Puerta Maya — and the dock you draw matters: Punta Langosta puts you in the middle of San Miguel\'s shopping district, the other two require a short taxi ride into town.',
      'Cozumel\'s real draw is what\'s under the water. The Mesoamerican Reef sits just offshore — the second-largest barrier reef on Earth, with visibility regularly exceeding 100 feet, healthy coral, and a marine park system that has protected the best sections for decades. Palancar Reef, Colombia Reef, and El Cielo are bucket-list snorkel and dive sites.',
      'Above water, Cozumel offers something for every cruise family: full-service beach clubs (Mr. Sancho\'s, Paradise Beach, Nachi Cocom) with all-inclusive day passes that beat anything in the Bahamas; Mayan ruins on the island (San Gervasio) and a ferry-and-bus route to the spectacular ruins at Tulum; an expanded San Miguel shopping district with genuinely fair-priced silver, vanilla, and tequila; and authentic Yucatecan food at a fraction of cruise-ship prices.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~10 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (3 possible docks)', icon: '⚓' },
      { label: 'Currency', value: 'USD widely accepted', icon: '💵' },
      { label: 'Language', value: 'Spanish + English', icon: '🗣️' },
      { label: 'Best For', value: 'Snorkeling & beach clubs', icon: '🤿' },
      { label: 'Tulum Day Trip', value: 'Possible (4 hrs each way)', icon: '🏛️' },
    ],
    thingsToDo: [
      {
        name: 'Palancar Reef Snorkel',
        category: 'Snorkeling',
        duration: '3–4 hours',
        cost: '$50–$80 per person',
        description:
          'Cozumel\'s most famous snorkel destination — a 30-foot-deep reef with brilliant coral, sea turtles, and visibility that routinely exceeds 100 feet. Catamarans depart from several marinas south of town. Operators like Fury Catamarans, Cozumel Cruise Excursions, and Salsa Charters are well-respected.',
        bestFor: 'Confident swimmers ages 8+',
      },
      {
        name: 'Mr. Sancho\'s Beach Club Day Pass',
        category: 'Beach Club',
        duration: '5–8 hours',
        cost: '$95 adult / $50 child (all-inclusive)',
        description:
          'The most popular all-inclusive beach club for cruisers. Includes loungers, pool, ocean access, all meals, and unlimited drinks. 15-minute taxi from any of the cruise piers. Family-friendly, with a kids\' play area and lifeguards.',
        bestFor: 'Families wanting a full beach day',
      },
      {
        name: 'Paradise Beach',
        category: 'Beach Club',
        duration: '5–7 hours',
        cost: '$3 entry + $15 minimum food/drink',
        description:
          'A pay-as-you-go alternative to the all-inclusive clubs. Free entry, $15 min spend, and water toys (kayaks, paddleboards, climbing iceberg) cost extra. Better choice for light eaters and families who want flexibility.',
        bestFor: 'Light eaters; families that don\'t drink',
      },
      {
        name: 'Tulum Ruins Day Trip',
        category: 'Mayan Ruins',
        duration: '8–9 hours (full day)',
        cost: '$120–$160 per person',
        description:
          'Ferry to Playa del Carmen (45 min), bus to Tulum (1 hr), guided tour of the cliff-top Mayan ruins, beach time, and back. Spectacular setting and probably the most photographed Mayan site in the world. Long day — only on 10+ hour port stops.',
        bestFor: 'History-loving families with older kids',
      },
      {
        name: 'San Gervasio Mayan Ruins (On Island)',
        category: 'Mayan Ruins',
        duration: '2–3 hours',
        cost: '$15 entry + transportation',
        description:
          'Cozumel\'s own Mayan site — small but well-preserved temple complex in the island\'s interior, dedicated to the goddess Ixchel. Far less impressive than Tulum but a fraction of the time and cost, and you can combine it with a beach club afternoon.',
        bestFor: 'Curious travelers with a half-day to spend',
      },
      {
        name: 'Chankanaab Park',
        category: 'Eco Park',
        duration: '4–6 hours',
        cost: '$25–$45 entry',
        description:
          'A combined snorkel beach, dolphin facility (extra), botanical garden, and Mayan reproduction village. Good one-stop option if you want variety without taxi-hopping.',
        bestFor: 'Mixed-interest families',
      },
      {
        name: 'San Miguel Shopping & Plaza del Sol',
        category: 'Shopping',
        duration: '1–3 hours',
        cost: 'Free entry',
        description:
          'Cozumel\'s town center, walkable from Punta Langosta dock or a $5 taxi from the others. Genuine Mexican silver, vanilla, hot sauces, and handmade crafts at fair prices. Skip the ferry-dock shops — head two blocks inland for better selection and prices.',
        bestFor: 'Souvenir shoppers',
      },
      {
        name: 'Submarine Tour (Atlantis Submarine)',
        category: 'Family Activity',
        duration: '2 hours total',
        cost: '$110 adult / $75 child',
        description:
          'A real submarine that descends ~100 feet to the reef. Air-conditioned, family-friendly, and a great option for non-swimmers, very young kids, or grandparents who want the reef without the snorkel.',
        bestFor: 'Non-swimmers; multi-generation groups',
      },
    ],
    excursionGuidance:
      'Cozumel is one of the few ports where booking independently almost always wins. The same operators sell the same trips for 30–50% less than the Disney-branded version, the dock is reliable, and tour operators have decades of experience getting cruisers back on time. Use Disney for Tulum/Chichen Itza (any flying or long-distance excursion gets the late-return guarantee) and for the dolphin programs (operators here take a hard line on no-shows). Use independents for everything else — beach clubs, snorkel trips, and on-island ruins.',
    excursions: [
      {
        name: 'Palancar Reef Snorkel — Independent Operator',
        source: 'independent',
        cost: '$50–$70 per person',
        description:
          'Fury Catamarans, Salsa Charters, and Cozumel Cruise Excursions run reliable Palancar trips. Book 2–4 weeks ahead for the best times.',
        tip: 'Pick a 9 AM departure — calmer water and fewer boats on the reef.',
      },
      {
        name: 'Mr. Sancho\'s Beach Club',
        source: 'independent',
        cost: '$95 (direct) vs $130+ (Disney)',
        description:
          'Book directly at mrsanchos.com. Same all-inclusive package, materially cheaper, no transportation premium.',
        tip: 'Reserve a beachfront palapa in advance — they go quickly on cruise days.',
      },
      {
        name: 'Tulum Ruins',
        source: 'disney',
        cost: '$140–$180 per person',
        description:
          'The most logistically complex Cozumel excursion. Ferry, bus, guided tour, and ferry back must align — Disney\'s late-return guarantee is genuinely valuable here.',
        tip: 'Bring USD cash for the Tulum entry fee, water, and tips. Eat lunch ashore in Playa del Carmen.',
      },
      {
        name: 'Atlantis Submarine',
        source: 'either',
        cost: '$100 (direct) vs $115 (Disney)',
        description:
          'Direct bookings via goatlantis.com are slightly cheaper. Disney version includes round-trip taxi.',
        tip: 'Late morning slots have better light at depth.',
      },
      {
        name: 'Chichen Itza Day Trip (via Cozumel)',
        source: 'disney',
        cost: '$200–$280 per person',
        description:
          'A 12-hour epic: ferry, bus to Chichen Itza (3 hours each way), guided tour, lunch, and back. Only feasible on the longest Cozumel port days, and only via Disney for the late-return guarantee.',
        tip: 'Skip if your port day is under 10 hours. Tulum is the better same-day Mayan trip.',
      },
    ],
    dining: [
      {
        name: 'La Choza',
        category: 'Yucatecan',
        location: 'San Miguel — 5 min walk from Punta Langosta',
        description:
          'Authentic Yucatecan family-run spot. Cochinita pibil, sopa de lima, and hand-made tortillas. Lines on cruise days but worth the wait. Cash preferred.',
      },
      {
        name: 'Kinta Mexican Bistro',
        category: 'Modern Mexican',
        location: 'San Miguel — 10 min walk from Punta Langosta',
        description:
          'Higher-end farm-to-table Mexican in a beautiful courtyard setting. Excellent vegetarian options, full bar with mezcal flights. Reservations recommended on cruise days.',
      },
      {
        name: 'Coconuts Bar & Grill',
        category: 'Beach Bar',
        location: 'East side of island — 30 min taxi',
        description:
          'A cliff-top open-air bar on the wild Caribbean side of the island. Fresh ceviche, fish tacos, and the best margaritas on Cozumel. Worth the drive if you have a long port day.',
      },
      {
        name: 'Las Palmeras',
        category: 'Casual',
        location: 'Right at Punta Langosta dock',
        description:
          'The closest sit-down to the dock. Tourist-priced but reliable, with quick service when you want a quick lunch and a margarita without venturing far.',
      },
      {
        name: 'Mercado Municipal',
        category: 'Local Market',
        location: 'San Miguel center',
        description:
          'The local market with food stalls selling tacos al pastor, fresh fruit, agua frescas, and Yucatecan classics for a few dollars each. The most authentic and budget-friendly lunch on the island.',
      },
    ],
    familyTips: [
      'Tap water is not safe — drink bottled water, and skip ice in non-tourist places. Resorts and beach clubs use filtered water and ice.',
      'Strollers work fine on San Miguel\'s main streets but the side streets are uneven — bring a baby carrier as a backup.',
      'Sun is intense year-round at this latitude. Reef-safe sunscreen is required for any reef snorkel; many operators won\'t let you in the water with non-reef-safe.',
      'Mayan ruins involve walking on uneven stone — wear closed-toe shoes for Tulum and bring a hat and water.',
      'Mexican peso ATMs are easy to find but USD is accepted everywhere a tourist would go. No need to convert.',
      'On long port days (8+ PM departures), stay ashore for dinner — Cozumel\'s authentic dinner scene beats most cruise-ship menus.',
    ],
    insiderTips: [
      {
        title: 'Confirm your dock the night before',
        detail:
          'Disney rotates between Punta Langosta, International Pier, and Puerta Maya. Punta Langosta puts you in town; the others require a $4–$8 taxi. Check the DCL Navigator app the night before to plan your morning.',
      },
      {
        title: 'Book Mr. Sancho\'s direct, not through Disney',
        detail:
          'Same beach club, materially cheaper. The taxi from any pier is $4–$8 per person. The 30-minute walk is not worth it in the heat.',
      },
      {
        title: 'Vanilla is a scam unless you read the label',
        detail:
          'Real Mexican vanilla is amazing. Most "vanilla" sold in the dock shops is sugar syrup with vanillin flavoring. Read the label — real vanilla lists vanilla bean as the first ingredient and isn\'t cheap. The Mercado Municipal has the real stuff.',
      },
      {
        title: 'Silver should have a "925" stamp',
        detail:
          'Cozumel has genuinely fair silver prices, but knockoffs exist. Real sterling silver is stamped 925. Check before paying. Pancho\'s Backyard, Diamonds International, and Los Cinco Soles are reliable.',
      },
      {
        title: 'Ride-share apps work in San Miguel',
        detail:
          'Uber operates in Cozumel (technically gray legally — drivers will meet you off-property) and is significantly cheaper than the official taxi cooperative for in-town trips. For dock pickups, taxis are easier.',
      },
      {
        title: 'Tulum and Chichen Itza are exhausting — pick one',
        detail:
          'Both are long days. Tulum is more accessible from Cozumel and the cliff-top setting is photogenic. Chichen Itza is the larger and more historically important site but the day is brutal. Most families choose Tulum.',
      },
    ],
    bestTimeSummary:
      'Cozumel is sail-able year-round but the experience varies. December–April is dry season, with the best snorkel visibility (often 100+ feet) and comfortable temperatures. May–October is hot and humid, with afternoon rain common in summer. Hurricane season (June–November) sees occasional disruption — Cozumel rerouts about 5–8% of cruises in September and October.',
    weatherWindows: [
      {
        months: 'December – April',
        weather: '78–85°F, dry, low humidity',
        crowds: 'Peak (Spring Break, holidays)',
        note: 'Best snorkel visibility of the year. Book beach clubs and snorkel trips ahead.',
      },
      {
        months: 'May & November',
        weather: '82–88°F, occasional showers',
        crowds: 'Moderate',
        note: 'Sweet spot — good weather, smaller crowds, lower cruise prices.',
      },
      {
        months: 'June – August',
        weather: '88–92°F, very humid, daily afternoon storms',
        crowds: 'Heavy (summer family rush)',
        note: 'Snorkel in the morning, beach club in the afternoon when storms pass.',
      },
      {
        months: 'September – October',
        weather: '85–90°F, hurricane-active',
        crowds: 'Light',
        note: 'Highest cancellation rate. Travel insurance recommended.',
      },
    ],
    weatherSummary:
      'Tropical year-round. Reef-safe sunscreen is required for marine parks (Cozumel enforces this at Chankanaab and most snorkel operators). Bring water shoes for rocky beach entries and Tulum\'s ruin walks.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'Punta Langosta dock puts San Miguel\'s shopping and the ferry to Playa del Carmen within 5 minutes on foot. International and Puerta Maya require a taxi to reach town.',
      },
      {
        method: 'Taxi',
        cost: '$4–$30',
        description:
          'Plentiful at every dock. Posted rates ($4–$8 to town, $10–$15 to most beach clubs, $25–$30 across the island). Cooperative-controlled — drivers are honest and fares are fixed.',
      },
      {
        method: 'Rental Scooter / Jeep',
        cost: '$45–$90 per day',
        description:
          'The best way to circle the island and explore the wild east coast. Rental shops cluster near Punta Langosta. Bring an international driver\'s license and check insurance carefully.',
      },
      {
        method: 'Ferry to Playa del Carmen',
        cost: '$25 round trip',
        description:
          'Two operators (Ultramar and Winjet) run frequent ferries from Punta Langosta to Playa del Carmen, 45 minutes each way. The gateway for Tulum, Xcaret, and the mainland.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Dream', slug: 'disney-dream' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Wonder', slug: 'disney-wonder' },
    ],
    faqs: [
      {
        question: 'Do I need a passport for Cozumel?',
        answer:
          'A US passport book is required for any cruise that visits Cozumel, including closed-loop sailings from US ports. Make sure your passport is valid for at least 6 months past your return date.',
      },
      {
        question: 'Is Cozumel safe?',
        answer:
          'Yes — Cozumel is one of the safest destinations in Mexico. The island is a major cruise economy and well-policed in tourist areas. Standard travel awareness applies, but Disney families have very few issues.',
      },
      {
        question: 'Should I get pesos before the cruise?',
        answer:
          'No — USD is accepted everywhere a cruiser would go, and US bills are often the preferred currency for tips and small purchases. ATMs in town dispense pesos if you need them.',
      },
      {
        question: 'Can I drink the water?',
        answer:
          'Tap water isn\'t safe to drink. Bottled water is universal. Resorts and reputable restaurants use filtered ice and water — at street stalls and small markets, stick to bottled.',
      },
      {
        question: 'Which dock will my ship use?',
        answer:
          'Disney rotates between Punta Langosta, International Pier, and Puerta Maya. The DCL Navigator app updates with your specific dock 24–48 hours before arrival.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // GRAND CAYMAN
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'grand-cayman',
    name: 'Grand Cayman',
    shortName: 'Grand Cayman',
    country: 'Cayman Islands',
    region: 'Caribbean',
    flag: '🇰🇾',
    dockType: 'tender',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours, less tendering)',
    currency: 'Cayman Islands Dollar (KYD) — USD widely accepted ($1 USD = $0.83 KYD)',
    language: 'English',
    heroTagline: 'Stingray City, Seven Mile Beach, and the most expensive port day in the Caribbean.',
    metaTitle: 'Grand Cayman Disney Cruise Port Guide — Stingray City, Seven Mile Beach & Tips',
    metaDescription:
      'Complete Grand Cayman cruise port guide for Disney cruisers. Stingray City excursions, Seven Mile Beach, George Town shopping, the Turtle Centre, family tips, and money-saving tricks for a tender port.',
    seoKeywords: [
      'disney cruise grand cayman guide',
      'things to do in grand cayman on a disney cruise',
      'stingray city disney cruise',
      'seven mile beach grand cayman',
      'grand cayman cruise tender',
      'george town shopping',
    ],
    overview: [
      'Grand Cayman is the largest of the three Cayman Islands and a tender port — Disney ships anchor in the harbor off George Town and ferry guests ashore in tenders that hold 100–150 people each. The tender process is well-organized but adds 30–60 minutes to your effective port time on each end. Plan accordingly.',
      'The Caymans are famous for two things: the calmest, clearest water in the Caribbean (visibility regularly exceeds 100 feet), and being a global financial center, which means everything ashore is expensive. A casual lunch easily runs $40 per person, and beach-club day passes run $80–$120 — significantly more than Cozumel or Nassau.',
      'The single best reason to go ashore on Grand Cayman is Stingray City — a sandbar in the middle of the harbor where Southern stingrays have been hand-fed for decades and are remarkably gentle. It\'s genuinely one of the great wildlife encounters in the Caribbean and unlike anywhere else. Beyond Stingray City, Seven Mile Beach is among the best beaches in the world, the Cayman Turtle Centre is well-done conservation tourism, and George Town offers some of the best duty-free shopping in the region. Skip if you\'re budget-conscious; go all-in if Stingray City is on your bucket list.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours (less tendering)', icon: '⏱️' },
      { label: 'Dock Type', value: 'Tender (no pier)', icon: '⛵' },
      { label: 'Currency', value: 'KYD or USD ($1 = $0.83 KYD)', icon: '💵' },
      { label: 'Language', value: 'English', icon: '🗣️' },
      { label: 'Best For', value: 'Stingray City', icon: '🐠' },
      { label: 'Cost Level', value: 'High', icon: '💰' },
    ],
    thingsToDo: [
      {
        name: 'Stingray City',
        category: 'Wildlife Encounter',
        duration: '3–4 hours',
        cost: '$60–$110 per person',
        description:
          'The signature Grand Cayman experience. A 30-minute boat ride to a sandbar in 3-foot-deep clear water, where dozens of friendly Southern stingrays glide between guests for hand-feeding. Genuinely magical, kid-friendly, and absolutely unique to Grand Cayman. Most operators combine Stingray City with one or two snorkel stops.',
        bestFor: 'Anyone who can stand in waist-deep water',
      },
      {
        name: 'Seven Mile Beach',
        category: 'Beach',
        duration: '3–6 hours',
        cost: 'Free (public access at multiple points)',
        description:
          'Consistently ranked one of the best beaches in the world — 5.5 miles of sugar-white sand and impossibly clear turquoise water. Public access is free at multiple spots; resorts charge for loungers and amenities. A $10–$15 taxi from George Town.',
        bestFor: 'Beach lovers who don\'t need a beach club',
      },
      {
        name: 'Cayman Turtle Centre',
        category: 'Family Attraction',
        duration: '3–4 hours',
        cost: '$45 adult / $25 child (full park)',
        description:
          'A working green sea turtle conservation facility on the West Bay. You can hold turtles, swim with them, watch the breeding programs, and visit the freshwater pools. Educational and rewarding — and one of the only places in the world where you can interact with sea turtles legally.',
        bestFor: 'Families with kids 3–12',
      },
      {
        name: 'George Town Walking Tour',
        category: 'Cultural',
        duration: '2 hours',
        cost: 'Free (self-guided) or $20 (guided)',
        description:
          'The Cayman Islands National Museum, the historic Elmslie Memorial Church, and the colorful waterfront shops are all walkable from the tender dock. A pleasant 90 minutes if you want a low-key port day.',
        bestFor: 'Low-energy port days',
      },
      {
        name: 'Snorkel Eden Rock',
        category: 'Snorkeling',
        duration: '1–3 hours',
        cost: '$15 entry / $25 with gear rental',
        description:
          'A walk-in shore snorkel right at the edge of George Town — caves, swim-throughs, and big schools of sergeant majors. Less than 10 minutes from the tender dock on foot. The best free/cheap snorkel in port.',
        bestFor: 'Confident snorkelers; budget-conscious families',
      },
      {
        name: 'Bioluminescent Bay Tour',
        category: 'Evening Excursion',
        duration: '2 hours (after dark)',
        cost: '$60–$90 per person',
        description:
          'A boat ride to a mangrove bay where the water glows blue when disturbed by movement. Only feasible on Disney itineraries with a late-night Grand Cayman departure (rare but they do exist).',
        bestFor: 'Adults and teens on late-departure sailings',
      },
      {
        name: 'Crystal Caves',
        category: 'Adventure',
        duration: '4 hours',
        cost: '$50 adult / $35 child',
        description:
          'A guided walk through three illuminated crystal caves on the island\'s eastern interior. About 45 minutes from the dock by taxi. Cooler than the beach in summer and a genuinely beautiful underground experience.',
        bestFor: 'Adventure-curious families',
      },
      {
        name: 'Rum Point Beach',
        category: 'Beach',
        duration: '4–6 hours',
        cost: 'Free (with paid food/drinks)',
        description:
          'A quieter alternative to Seven Mile Beach on the island\'s north shore — calmer water, hammocks under the trees, and a beach restaurant. About 45 minutes by taxi or a $35 boat ride from George Town.',
        bestFor: 'Families wanting space',
      },
    ],
    excursionGuidance:
      'Grand Cayman\'s Stingray City is one of the rare excursions where booking with Disney has measurable advantages. The harbor gets congested mid-morning, the tender schedule is a real constraint, and the late-return guarantee actually matters. For Stingray City alone, Disney is reasonable. For everything else (beaches, the Turtle Centre, George Town), independent operators or DIY are 30–50% cheaper and equally reliable.',
    excursions: [
      {
        name: 'Stingray City — Disney',
        source: 'disney',
        cost: '$95 adult / $65 child',
        description:
          'Disney\'s standard 3.5-hour Stingray City + Coral Garden snorkel. Late-return guaranteed, kid-tested operator, and well-managed groups.',
        tip: 'Pick a 9:00 AM slot — the sandbar is calmest and least crowded in the morning.',
      },
      {
        name: 'Stingray City — Independent',
        source: 'independent',
        cost: '$60–$85 per person',
        description:
          'Captain Marvin\'s, Native Son, and Captain Bryan\'s are well-rated local operators with smaller boats and more time at the sandbar. Book directly via their websites.',
        tip: 'Avoid the "3-stop" tours — by stop 3, you\'re tired and the snorkel sites are an afterthought.',
      },
      {
        name: 'Cayman Turtle Centre',
        source: 'independent',
        cost: '$45 (direct) vs $75 (Disney)',
        description:
          'Buy admission directly at turtle.ky, then take a $5–$8 taxi to West Bay. Disney\'s version adds round-trip transportation.',
        tip: 'Combine with Seven Mile Beach in the afternoon for a full day with a single taxi network.',
      },
      {
        name: 'Submarine Tour (Atlantis Submarine)',
        source: 'either',
        cost: '$110 adult / $75 child',
        description:
          'A real submarine that descends ~100 feet down the wall just outside George Town harbor. Excellent for non-swimmers, and the wall is stunning.',
        tip: 'Late-morning slots have the best light underwater.',
      },
      {
        name: 'DIY Beach Day at Seven Mile',
        source: 'independent',
        cost: '$10–$15 taxi each way',
        description:
          'Walk off the tender, take a taxi to Seven Mile Beach, set up on the public sand. No entry fees, no excursion booking, just one of the best beaches on Earth.',
        tip: 'Public Beach (the actual name) at the south end has free chairs, restrooms, and a few food vendors. Best free beach option.',
      },
    ],
    dining: [
      {
        name: "Eats Cafe",
        category: 'American/Caribbean',
        location: 'George Town — 5 min from tender dock',
        description:
          'Reliable air-conditioned lunch with good salads, sandwiches, jerk chicken, and an excellent kids\' menu. Reasonable prices for Cayman.',
      },
      {
        name: 'Tortuga Rum Cake & Coffee',
        category: 'Casual / Coffee',
        location: 'George Town center',
        description:
          'The famous Cayman rum cake bakery, plus a full coffee and breakfast menu. Worth a stop just for the rum cake samples and to grab a take-home box.',
      },
      {
        name: 'The Wharf',
        category: 'Upscale Caribbean',
        location: 'Seven Mile Beach — 10 min taxi',
        description:
          'Open-air seafood on the water with a famous tarpon-feeding show every evening. Pricey ($40–$60 per entree) but a special-occasion lunch with a view.',
      },
      {
        name: 'Calico Jack\'s',
        category: 'Beach Bar',
        location: 'Seven Mile Beach (Public Beach end)',
        description:
          'Casual beach bar at Public Beach — burgers, fish tacos, conch fritters, and a full bar. Family-friendly, with the beach right outside.',
      },
      {
        name: 'Bread & Chocolate',
        category: 'Vegan/Vegetarian',
        location: 'George Town — 5 min walk',
        description:
          'Excellent plant-based cafe — tempeh BLTs, vegan chocolate cake, fresh juices. A welcome break from the pork-and-fish-heavy default Cayman menu.',
      },
    ],
    familyTips: [
      'Tender boarding starts about 30 minutes after arrival — guests with paid Disney excursions board first, then a tender ticket system manages the rest. Plan to grab a tender ticket as soon as the announcement comes.',
      'Stingray City is universally kid-safe — the rays are accustomed to humans, and the sandbar is shallow enough for young kids. Go on a tour with a small boat for the best experience.',
      'Bring water shoes — Eden Rock and most snorkel spots have rocky entries.',
      'Sun is intense; reef-safe sunscreen is required at the Turtle Centre and most snorkel sites.',
      'Don\'t plan a tight excursion schedule — tender returns get bottlenecked late afternoon.',
      'The Turtle Centre is a great rainy-day backup — most experiences are covered.',
    ],
    insiderTips: [
      {
        title: 'Tender returns get jammed at 3:00–4:00 PM',
        detail:
          'Last tender is typically 4:30 PM. The 2:30–4:00 window has the longest waits. Either be back early (1:30 PM) or plan to grab the very last tender for shorter lines.',
      },
      {
        title: 'KYD prices look cheaper than they are',
        detail:
          'A meal listed at $25 KYD is actually $30 USD. Most restaurants list both currencies; double-check before ordering.',
      },
      {
        title: 'Skip beach clubs — the public beach is better',
        detail:
          'Seven Mile Beach has free public access points with restrooms and chair rentals. The $80–$120 beach club passes are not worth it on this island.',
      },
      {
        title: 'Eden Rock is a 5-minute walk and rivals paid snorkel trips',
        detail:
          'You can\'t walk to a snorkel this good in any other Caribbean port. $15 entry, full gear rental for $25, and you\'re in the water 10 minutes after the tender drops you off.',
      },
      {
        title: 'Cayman is the best port for duty-free silver, jewelry, and watches',
        detail:
          'Genuine duty-free with no Cayman sales tax. Kirk Freeport and Diamonds International have legitimate inventory and competitive prices on premium watches.',
      },
      {
        title: 'Stingray City is calmest before 11 AM',
        detail:
          'By midday, multiple cruise ships have sent boats to the sandbar and it gets crowded. Morning slots are the best wildlife experience.',
      },
    ],
    bestTimeSummary:
      'Grand Cayman is sail-able year-round but tender operations are weather-sensitive. December–April has the calmest seas and lowest cancellation risk. Hurricane season (June–November) sees periodic disruption — Cayman cancels about 4–7% of cruise calls per year, mostly in September and October.',
    weatherWindows: [
      {
        months: 'December – April',
        weather: '78–84°F, dry, low humidity',
        crowds: 'Peak (Spring Break, holidays)',
        note: 'Calmest seas of the year. Tender operations rarely disrupted.',
      },
      {
        months: 'May & November',
        weather: '82–87°F, mostly dry',
        crowds: 'Moderate',
        note: 'Sweet spot — good weather, lighter crowds.',
      },
      {
        months: 'June – August',
        weather: '85–90°F, humid, brief storms',
        crowds: 'Heavy (summer)',
        note: 'Hot but generally calm. Tender operations reliable.',
      },
      {
        months: 'September – October',
        weather: '85–88°F, hurricane-active',
        crowds: 'Light',
        note: 'Highest cancellation rate. Travel insurance recommended.',
      },
    ],
    weatherSummary:
      'Tropical Caribbean climate. Reef-safe sunscreen is enforced at most marine parks. Tender operations cancel in sustained 25+ knot winds — the only weather risk that consistently impacts the port.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'George Town center, the National Museum, Eden Rock, Margaritaville, and the major duty-free shops are all within 10 minutes of the tender dock.',
      },
      {
        method: 'Taxi',
        cost: '$5–$30',
        description:
          'Metered and posted-rate taxis at the tender dock. $10–$15 to Seven Mile Beach, $25–$30 to Rum Point. Most accept USD.',
      },
      {
        method: 'Public Bus',
        cost: '$2.50',
        description:
          'Yes — Cayman has a public minibus system that runs Seven Mile Beach for $2.50. Stops are marked along West Bay Road. Cash, exact change.',
      },
      {
        method: 'Rental Car',
        cost: '$50–$80 per day',
        description:
          'Drive on the left, British style. Rental shops near the tender dock. Worth it only if you\'re visiting Crystal Caves, Rum Point, or the East End — too much for a typical port day.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Wonder', slug: 'disney-wonder' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
    ],
    faqs: [
      {
        question: 'Is Grand Cayman a tender port?',
        answer:
          'Yes — Disney ships anchor in the harbor off George Town and ferry guests ashore via tenders. The process is well-organized but adds 30–60 minutes on each end of your port day. Mobility-impaired guests are accommodated but should let Guest Services know in advance.',
      },
      {
        question: 'Is Stingray City worth it?',
        answer:
          'For most visitors, yes — it\'s genuinely one of the great wildlife encounters in the Caribbean. The rays are habituated, the water is shallow, and the experience is unlike anywhere else. Skip it if you\'re uncomfortable in waist-deep water or with marine wildlife.',
      },
      {
        question: 'How much money should I bring?',
        answer:
          'Plan more than other Caribbean ports. A Stingray City excursion + lunch + souvenirs realistically runs $200–$300 per person. Cayman is the most expensive Disney Caribbean port.',
      },
      {
        question: 'Can I use US dollars?',
        answer:
          'Yes, everywhere. Many shops will give change in KYD, which can\'t be exchanged easily back home — try to pay with exact change or expect to spend KYD on small purchases before leaving.',
      },
      {
        question: 'Is Grand Cayman safe?',
        answer:
          'Among the safest destinations in the Caribbean. Standard travel awareness applies, but families have very few safety issues.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // ST. THOMAS, USVI
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'st-thomas',
    name: 'St. Thomas, US Virgin Islands',
    shortName: 'St. Thomas',
    country: 'US Virgin Islands',
    region: 'Caribbean',
    flag: '🇻🇮',
    dockType: 'pier',
    typicalDockTime: '8:00 AM – 5:00 PM (~9 hours)',
    currency: 'US Dollar (USD)',
    language: 'English',
    heroTagline: 'No passport needed, the best duty-free shopping in the Caribbean, and Magens Bay.',
    metaTitle: 'St. Thomas USVI Disney Cruise Port Guide — Magens Bay, Shopping, Snorkeling & Tips',
    metaDescription:
      'Complete St. Thomas cruise port guide for Disney cruisers. Magens Bay beach, Charlotte Amalie shopping, Coral World snorkeling, ziplining, family tips, and money-saving tricks for your USVI port day.',
    seoKeywords: [
      'disney cruise st thomas guide',
      'things to do in st thomas on a disney cruise',
      'magens bay st thomas',
      'st thomas shopping disney cruise',
      'st thomas snorkeling',
      'charlotte amalie cruise port',
    ],
    overview: [
      'St. Thomas is the busiest cruise port in the US Virgin Islands and a relatively easy stop for Disney cruisers — it\'s a US territory, so no passport is required for closed-loop sailings, USD is the currency, and English is the only language. Disney ships dock at one of two piers — Crown Bay or Havensight — and the dock you draw determines a lot about your day.',
      'Charlotte Amalie, the capital, is built into a steep hillside above a stunning natural harbor. The lower town is the duty-free shopping district — over 600 jewelry, watch, and liquor shops along Main Street and the alleyways branching off it. Prices on premium watches, fine jewelry, and rum genuinely beat US retail by 20–40%, especially for shoppers who do their homework.',
      'Beyond shopping, St. Thomas has Magens Bay (consistently ranked among the world\'s best beaches), some excellent snorkeling on offshore cays, the famous Skyride to Paradise Point overlook, a respected coral reef park (Coral World), and one of the longest ziplines in the Caribbean. A short ferry away is St. John, two-thirds of which is US National Park land — empty white-sand beaches and the best snorkeling in the US Virgin Islands.',
    ],
    keyFacts: [
      { label: 'Typical Port Time', value: '~9 hours', icon: '⏱️' },
      { label: 'Dock Type', value: 'Pier (2 possible docks)', icon: '⚓' },
      { label: 'Currency', value: 'USD', icon: '💵' },
      { label: 'Passport', value: 'Not required (US territory)', icon: '🛂' },
      { label: 'Best For', value: 'Shopping & beaches', icon: '🛍️' },
      { label: 'Magens Bay', value: '20-min taxi', icon: '🏖️' },
    ],
    thingsToDo: [
      {
        name: 'Magens Bay Beach',
        category: 'Beach',
        duration: '4–6 hours',
        cost: '$5 entry + $4 parking',
        description:
          'A 1-mile half-moon of soft sand and calm, clear water on the island\'s north side. Consistently ranked one of the world\'s best beaches by National Geographic and others. 20-minute taxi from either dock. Loungers and umbrellas rent for $8 each, full bar and snack restaurant on-site.',
        bestFor: 'Everyone',
      },
      {
        name: 'Skyride to Paradise Point',
        category: 'Sightseeing',
        duration: '90 minutes',
        cost: '$24 adult / $12 child',
        description:
          'A gondola from the Havensight dock area up 700 feet to Paradise Point, where you get the iconic Caribbean view of Charlotte Amalie harbor and the cruise ships in port. Restaurant, bar, and short hiking trails at the top.',
        bestFor: 'Photographers; first-time visitors',
      },
      {
        name: 'Coral World Ocean Park',
        category: 'Family Attraction',
        duration: '3–4 hours',
        cost: '$25 adult / $15 child',
        description:
          'A small marine park on the northeast coast with an undersea observatory, sea turtle pool, and optional sea lion swim or shark encounter. About 25 minutes by taxi from the dock. Educational and a good rainy-day backup.',
        bestFor: 'Families with kids 5–12',
      },
      {
        name: 'Charlotte Amalie Shopping (Main Street)',
        category: 'Shopping',
        duration: '2–4 hours',
        cost: 'Free entry',
        description:
          'The duty-free shopping capital of the Caribbean. Genuinely good prices on diamonds, premium watches (Rolex, Omega), Caribbean rum, and gemstones. Cardow Jewelers, A.H. Riise, and Diamonds International are reliable. Skip the trinket-heavy alley shops; head to Main Street.',
        bestFor: 'Serious shoppers (do research before)',
      },
      {
        name: 'Tree Limin\' Extreme Zipline',
        category: 'Adventure',
        duration: '3 hours',
        cost: '$130 per person',
        description:
          'Six ziplines at the top of St. Peter Mountain with stunning ocean views. Family-friendly, age 9 minimum, weight limits 70–250 lb. Disney sells the Disney version at a premium.',
        bestFor: 'Adventure-seeking families with kids 9+',
      },
      {
        name: 'St. John Day Trip (Ferry)',
        category: 'Adventure',
        duration: '5–7 hours',
        cost: '$15 ferry round-trip + taxi/rental',
        description:
          'A 20-minute ferry from Red Hook (other side of St. Thomas) to St. John. Rent a Jeep or take a taxi to Trunk Bay or Cinnamon Bay — empty national-park beaches with the best snorkeling in the USVI. Aggressive day, but the payoff is the Caribbean at its best.',
        bestFor: 'Travelers wanting an off-the-beaten-path day',
      },
      {
        name: 'Buck Island Snorkel (Turtle Cove)',
        category: 'Snorkeling',
        duration: '3 hours',
        cost: '$60–$85 per person',
        description:
          'Boat trip to a small uninhabited cay south of St. Thomas with a designated snorkel area populated by sea turtles, tropical fish, and a small reef. Calm conditions, good for first-time snorkelers.',
        bestFor: 'Casual snorkelers ages 5+',
      },
      {
        name: 'Drake\'s Seat Lookout',
        category: 'Sightseeing',
        duration: '30 minutes',
        cost: '$25–$30 taxi (combined with Magens Bay)',
        description:
          'A roadside overlook at the top of the island with a postcard view of Magens Bay and the British Virgin Islands beyond. Most Magens Bay taxis stop here on the way for 5–10 minutes of photos.',
        bestFor: 'Anyone heading to Magens Bay',
      },
    ],
    excursionGuidance:
      'St. Thomas is a port where DIY works well — the dock is reliable, taxis are organized into a cooperative with fixed posted rates, and major attractions (Magens Bay, Coral World, the Skyride) are easy to reach independently. Disney excursions are reasonable for the long-distance options (St. John, Buck Island snorkel) but a poor value for things you can taxi to in 20 minutes. Shopping and beach days are universally cheaper booked direct.',
    excursions: [
      {
        name: 'Magens Bay Beach Day — DIY',
        source: 'independent',
        cost: '$8 taxi each way + $5 entry',
        description:
          'Take the official taxi cooperative to Magens Bay (~$10/person each way), pay the $5 entry, set up on the sand. No need to book anything in advance.',
        tip: 'Many drivers do a Drake\'s Seat photo stop on the way for no extra charge.',
      },
      {
        name: 'St. John Day Trip',
        source: 'disney',
        cost: '$130–$170 per person',
        description:
          'The DIY version (taxi to Red Hook, ferry, taxi to Trunk Bay) saves money but is logistically tight on a 9-hour port day. Disney\'s version handles the ferry timing and gets you back to the ship reliably.',
        tip: 'Worth Disney\'s premium for first-time visitors — the logistics matter.',
      },
      {
        name: 'Buck Island Snorkel',
        source: 'either',
        cost: '$60 (direct) vs $90 (Disney)',
        description:
          'Local operators like VI Eco Tours run the same Buck Island snorkel trip for less. Direct booking saves real money.',
        tip: 'The morning trip has the calmest water and best visibility.',
      },
      {
        name: 'Tree Limin\' Extreme Zipline',
        source: 'either',
        cost: '$130 (direct) vs $155 (Disney)',
        description:
          'Book directly at ziplinestthomas.com. The Disney version adds round-trip transportation but the operator runs a free shuttle from the cruise port for direct bookings.',
        tip: 'Morning slots have less wind and shorter waits.',
      },
      {
        name: 'Coral World Ocean Park',
        source: 'independent',
        cost: '$25 (direct) vs $50+ (Disney)',
        description:
          'Buy admission directly at coralworldvi.com. Take a $10 taxi from the dock.',
        tip: 'Combine with Coki Beach (next door) for a beach + park combo day.',
      },
    ],
    dining: [
      {
        name: 'Gladys\' Cafe',
        category: 'Caribbean',
        location: 'Charlotte Amalie — Royal Dane Mall',
        description:
          'Authentic local Caribbean food in a tucked-away alley off Main Street. Conch in butter sauce, salt fish and dumplings, and famous house-made hot sauce. Lines on cruise days but worth the wait.',
      },
      {
        name: 'Cuzzin\'s Caribbean Restaurant',
        category: 'Caribbean',
        location: 'Charlotte Amalie — Back Street',
        description:
          'Family-run spot serving conch fritters, jerk chicken, oxtail, and fungi. Authentic, friendly, and a 5-minute walk from the shopping district.',
      },
      {
        name: 'Greenhouse Restaurant & Bar',
        category: 'American/Caribbean',
        location: 'Charlotte Amalie waterfront',
        description:
          'Open-air harbor-side spot with reliable American and Caribbean food, full bar, and a kids\' menu. A safe choice for picky eaters.',
      },
      {
        name: 'Magens Bay Restaurant',
        category: 'Beach Bar',
        location: 'Magens Bay Beach',
        description:
          'On-beach burgers, grilled fish, salads, and full bar. Pricier than town but convenient — eat without leaving the sand.',
      },
      {
        name: 'Petite Pump Room',
        category: 'Caribbean',
        location: 'Havensight Mall (adjacent to dock)',
        description:
          'Closest authentic local spot to the Havensight dock. Conch chowder, fried fish, and Caribbean breakfasts. Fast service for cruisers on a tight schedule.',
      },
    ],
    familyTips: [
      'Confirm your dock the night before — Crown Bay vs Havensight changes your taxi prices and walking options.',
      'Magens Bay has restrooms, showers, lifeguards, and lifeguards — one of the most family-ready Caribbean beaches.',
      'Strollers work fine at Magens Bay and along the Havensight Mall area; Charlotte Amalie\'s historic alleys are tighter.',
      'Bring USD cash for taxi tips and the Magens Bay entry — credit cards work most places but cash is faster.',
      'Sunburn is a real risk — the sun is strong and you\'ll be in the open water and on the open beach all day.',
      'The Skyride from the Havensight side is a great low-energy backup if rain cancels beach plans.',
    ],
    insiderTips: [
      {
        title: 'Dock matters: Crown Bay vs Havensight',
        detail:
          'Havensight is closer to the Skyride and Charlotte Amalie shopping (15-min walk to town, the gondola is at the dock). Crown Bay is closer to nothing — taxi everything. Check your DCL Navigator the night before.',
      },
      {
        title: 'Magens Bay taxis are per-person, not per-vehicle',
        detail:
          'Posted rates are $10–$12 per person each way. A family of 4 = $40–$48 each direction. Adds up fast — group with another family to share a van for a group rate.',
      },
      {
        title: 'Diamond and watch shops are negotiable',
        detail:
          'Listed prices on premium watches and stones are starting points. Knowledgeable shoppers can negotiate 10–25% off, especially at the major chains. Do your homework on US prices before sailing.',
      },
      {
        title: 'Coki Beach is free and right next to Coral World',
        detail:
          'A small public beach with surprisingly good shore snorkeling. Combine with a Coral World admission for a $30 full day vs the $80–$100 beach club alternatives.',
      },
      {
        title: 'St. John is the better beach day if you\'re willing to commit',
        detail:
          'The trade-off: Magens Bay is 20 minutes away and easy. St. John is 90 minutes away (each direction) but Trunk Bay and Cinnamon Bay are objectively better. Worth it on long port days for repeat USVI visitors.',
      },
      {
        title: 'Rum prices in town beat the duty-free shop at the dock',
        detail:
          'A.H. Riise and the smaller liquor shops on Main Street consistently beat the dock-area duty-free shop on Cruzan Rum, Bacardi, and local Virgin Islands rums.',
      },
    ],
    bestTimeSummary:
      'St. Thomas is sail-able year-round with relatively stable Caribbean weather. December–April is dry season with the best beach conditions. Hurricane season (June–November) sees occasional disruption, but the USVI typically reroutes only a handful of cruise calls per year. The shoulder months (May, November) offer the best balance of weather, crowds, and pricing.',
    weatherWindows: [
      {
        months: 'December – April',
        weather: '78–84°F, dry, low humidity',
        crowds: 'Peak (Spring Break, holidays)',
        note: 'Best beach conditions of the year. Shopping crowds heavy.',
      },
      {
        months: 'May & November',
        weather: '82–87°F, mostly dry',
        crowds: 'Moderate',
        note: 'Sweet spot — good weather, smaller crowds, lower cruise prices.',
      },
      {
        months: 'June – August',
        weather: '85–90°F, humid, brief afternoon storms',
        crowds: 'Heavy (summer)',
        note: 'Hot but mostly sunny. Strong sun — extra sunscreen needed.',
      },
      {
        months: 'September – October',
        weather: '85–88°F, hurricane-active',
        crowds: 'Light',
        note: 'Highest cancellation/diversion risk. Travel insurance recommended.',
      },
    ],
    weatherSummary:
      'Tropical Caribbean climate with consistent trade winds that keep humidity manageable. Reef-safe sunscreen is required at most marine parks and snorkel sites. Sun is intense year-round — broad-spectrum SPF 30+ minimum.',
    gettingAround: [
      {
        method: 'Walking',
        cost: 'Free',
        description:
          'From Havensight dock, Charlotte Amalie shopping is a 15-minute walk along the waterfront. From Crown Bay, you\'re 2 miles from town — take a taxi.',
      },
      {
        method: 'Open-Air Taxi (Safari)',
        cost: '$5–$15 per person',
        description:
          'Posted-rate, per-person fares to most destinations. Drivers are part of the official cooperative — fares are non-negotiable but reliable. Most are open-air vans (safaris) holding 12–20 people.',
      },
      {
        method: 'Skyride Gondola',
        cost: '$24 adult / $12 child',
        description:
          'From Havensight dock area to Paradise Point overlook. 7-minute ride each way, dramatic harbor views.',
      },
      {
        method: 'Ferry to St. John',
        cost: '$8.15 adult / $4.05 child each way',
        description:
          'From Red Hook (45 minutes by taxi from either dock) to Cruz Bay, St. John. Runs every hour. The ride is 20 minutes.',
      },
      {
        method: 'Rental Jeep',
        cost: '$70–$120 per day',
        description:
          'Drive on the left, US-style traffic signs. Worth it for full-day independent exploration. Rental shops cluster near both docks.',
      },
    ],
    shipsThatVisit: [
      { name: 'Disney Wish', slug: 'disney-wish' },
      { name: 'Disney Treasure', slug: 'disney-treasure' },
      { name: 'Disney Dream', slug: 'disney-dream' },
      { name: 'Disney Fantasy', slug: 'disney-fantasy' },
      { name: 'Disney Magic', slug: 'disney-magic' },
      { name: 'Disney Destiny', slug: 'disney-destiny' },
    ],
    faqs: [
      {
        question: 'Do I need a passport for St. Thomas?',
        answer:
          'No — the US Virgin Islands are a US territory. A driver\'s license is sufficient on closed-loop cruises from US ports. A passport is still strongly recommended for any cruise that visits non-US ports on the same itinerary.',
      },
      {
        question: 'Is St. Thomas safe?',
        answer:
          'Tourist areas (Charlotte Amalie shopping, Magens Bay, the dock areas) are safe during the day. Standard travel awareness applies. Avoid wandering into residential neighborhoods, especially after dark, and don\'t leave valuables on the beach.',
      },
      {
        question: 'Which dock is better — Crown Bay or Havensight?',
        answer:
          'Havensight is more convenient — closer to the Skyride, walkable to Charlotte Amalie, and right next to a small shopping mall. Crown Bay requires a taxi for everything. Disney rotates between them; check the night before.',
      },
      {
        question: 'Is the duty-free shopping really cheaper?',
        answer:
          'For premium watches, fine jewelry, and Caribbean rum, yes — typically 20–40% less than US retail. For everything else (electronics, perfume, mass-market jewelry), prices are competitive but not always the best deal. Research your target items before sailing.',
      },
      {
        question: 'Can I get to St. John in a port day?',
        answer:
          'Yes, but it\'s a full-day commitment — taxi to Red Hook (45 min), ferry to Cruz Bay (20 min), taxi to Trunk Bay (15 min), and back. Plan to leave St. John no later than 2 PM to make a 5 PM all-aboard. Disney\'s organized excursions handle the timing for you.',
      },
    ],
  },
]

import { extraDestinationPorts } from './destination-ports-extra'

export const allDestinationPorts: DestinationPort[] = [
  ...destinationPorts,
  ...extraDestinationPorts,
]

export function getDestinationPorts(): DestinationPort[] {
  return allDestinationPorts
}

export function getDestinationPortBySlug(slug: string): DestinationPort | undefined {
  return allDestinationPorts.find(p => p.slug === slug)
}

/**
 * Normalize an itinerary port name (as found in sailings.json) to a destination
 * port slug. Returns null for "At Sea", scenic cruising, and Panama Canal transits.
 *
 * The matcher is intentionally fuzzy — itinerary strings come in several variants
 * (e.g. "Cozumel" vs "Cozumel, Mexico"), so each rule is a contains-check rather
 * than an exact match.
 */
export function getPortSlugFromItineraryName(rawPortName: string): string | null {
  const name = rawPortName.toLowerCase().trim()

  // Skip non-stops
  if (name === 'at sea' || name.includes('glacier viewing') || name === 'panama canal') {
    return null
  }

  // Bahamas / Caribbean
  if (name.includes('castaway')) return 'castaway-cay'
  if (name.includes('lookout') || name.includes('lighthouse point')) return 'lookout-cay'
  if (name.includes('nassau')) return 'nassau'
  if (name.includes('cozumel')) return 'cozumel'
  if (name.includes('grand cayman') || name.includes('george town')) return 'grand-cayman'
  if (name.includes('st. thomas') || name.includes('st thomas')) return 'st-thomas'
  if (name.includes('tortola')) return 'tortola'
  if (name.includes('falmouth') && name.includes('jamaica')) return 'falmouth-jamaica'
  if (name.includes('puerto plata')) return 'puerto-plata'
  if (name.includes('philipsburg') || name.includes('st. maarten') || name.includes('st maarten')) return 'philipsburg-st-maarten'
  if (name.includes('oranjestad') || name.includes('aruba')) return 'oranjestad-aruba'
  if (name.includes('willemstad') || name.includes('curaçao') || name.includes('curacao')) return 'willemstad-curacao'
  if (name.includes("st. john's") || name.includes("st johns") || name.includes('antigua')) return 'st-johns-antigua'
  if (name.includes('castries') || name.includes('st. lucia') || name.includes('st lucia')) return 'castries'
  if (name.includes('san juan')) return 'san-juan'
  if (name.includes('cartagena') && name.includes('colombia')) return 'cartagena-colombia'

  // Mexican Riviera / Mexico
  if (name.includes('cabo san lucas')) return 'cabo-san-lucas'
  if (name.includes('ensenada')) return 'ensenada'
  if (name.includes('mazatlán') || name.includes('mazatlan')) return 'mazatlan'
  if (name.includes('puerto vallarta')) return 'puerto-vallarta'
  if (name.includes('progreso')) return 'progreso'

  // Pacific Coast
  if (name.includes('catalina')) return 'catalina-island'

  // Alaska
  if (name.includes('juneau')) return 'juneau'
  if (name.includes('ketchikan')) return 'ketchikan'
  if (name.includes('skagway')) return 'skagway'
  if (name.includes('sitka')) return 'sitka'
  if (name.includes('icy strait')) return 'icy-strait-point'

  // Norway
  if (name.includes('bergen')) return 'bergen'
  if (name.includes('alesund') || name.includes('ålesund')) return 'alesund'
  if (name.includes('haugesund')) return 'haugesund'
  if (name.includes('stavanger')) return 'stavanger'
  if (name.includes('olden')) return 'olden'
  if (name.includes('hellesylt')) return 'hellesylt'
  if (name.includes('kristiansand')) return 'kristiansand'
  if (name.includes('maloy') || name.includes('måløy')) return 'maloy'

  // Denmark
  if (name.includes('copenhagen')) return 'copenhagen'
  if (name.includes('skagen')) return 'skagen'

  // British Isles
  if (name.includes('southampton')) return 'southampton'
  if (name.includes('liverpool')) return 'liverpool'
  if (name.includes('belfast')) return 'belfast'
  if (name.includes('cobh') || (name.includes('cork') && name.includes('ireland'))) return 'cobh-cork'
  if (name.includes('greenock') || name.includes('glasgow')) return 'greenock-glasgow'
  if (name.includes('portland') && (name.includes('stonehenge') || name.includes('england'))) return 'portland-england'

  // Netherlands
  if (name.includes('rotterdam') || name.includes('amsterdam')) return 'rotterdam-amsterdam'

  // Iberian Peninsula
  if (name.includes('barcelona')) return 'barcelona'
  if (name.includes('lisbon')) return 'lisbon'
  if (name.includes('bilbao')) return 'bilbao'
  if (name.includes('cartagena') && name.includes('spain')) return 'cartagena-spain'
  if (name.includes('la coruña') || name.includes('la coruna')) return 'la-coruna'
  if (name.includes('málaga') || name.includes('malaga')) return 'malaga'
  if (name.includes('palma de mallorca') || name.includes('mallorca')) return 'palma-de-mallorca'
  if (name.includes('vigo')) return 'vigo'
  if (name.includes('funchal') || name.includes('madeira')) return 'funchal-madeira'
  if (name.includes('gibraltar')) return 'gibraltar'

  // Mediterranean — Italy
  if (name.includes('civitavecchia') || name.startsWith('rome')) return 'civitavecchia-rome'
  if (name.includes('genoa') || name.includes('genova')) return 'genoa-milan'
  if (name.includes('livorno') || name.includes('florence') || name.includes('pisa')) return 'livorno-florence'
  if (name.includes('messina') || name.includes('sicily')) return 'messina-sicily'
  if (name.includes('naples') || name.includes('pompeii')) return 'naples-pompeii'
  if (name.includes('cagliari')) return 'cagliari'
  if (name.includes('trieste') || name.includes('venice')) return 'trieste-venice'

  // Mediterranean — France
  if (name.includes('ajaccio') || name.includes('corsica')) return 'ajaccio'

  // Mediterranean — Greece
  if (name.includes('chania')) return 'chania'
  if (name.includes('corfu')) return 'corfu'
  if (name.includes('mykonos')) return 'mykonos'
  if (name.includes('piraeus') || name.includes('athens')) return 'piraeus-athens'
  if (name.includes('rhodes')) return 'rhodes'
  if (name.includes('santorini')) return 'santorini'

  // Mediterranean — Croatia / Malta
  if (name.includes('dubrovnik')) return 'dubrovnik'
  if (name.includes('zadar')) return 'zadar'
  if (name.includes('valletta') || name.includes('malta')) return 'valletta'

  // Home ports
  if (name.includes('port canaveral') || name === 'pcv') return 'port-canaveral'
  if (name.includes('fort lauderdale')) return 'fort-lauderdale'
  if (name.includes('galveston')) return 'galveston'
  if (name.includes('san diego')) return 'san-diego'
  if (name.includes('vancouver')) return 'vancouver'
  if (name.includes('singapore')) return 'singapore'

  return null
}
