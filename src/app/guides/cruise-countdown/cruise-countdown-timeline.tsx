'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  Award,
  CalendarClock,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  DollarSign,
  Globe,
  Heart,
  MapPin,
  Package,
  Plane,
  Building2,
  ShieldCheck,
  Ship,
  ShoppingBag,
  Smartphone,
  Star,
  Sun,
  Users,
  Utensils,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Milestone {
  id: string
  icon: React.ElementType
  title: string
  description: string
  proTip?: string
  midnightET?: boolean
}

interface Phase {
  id: string
  label: string
  timeframe: string
  emoji: string
  headerBg: string
  cardBg: string
  cardBorder: string
  dotBg: string
  milestones: Milestone[]
}

// ---------------------------------------------------------------------------
// Timeline data
// ---------------------------------------------------------------------------

const phases: Phase[] = [
  {
    id: 'booking',
    label: 'At Booking',
    timeframe: 'Day of Booking',
    emoji: '⚓',
    headerBg: 'bg-blue-950',
    cardBg: 'bg-[#1E3A5F]/10',
    cardBorder: 'border-blue-100',
    dotBg: 'bg-blue-950',
    milestones: [
      {
        id: 'confirm-booking',
        icon: CheckCircle2,
        title: 'Confirm Booking Details & Stateroom',
        description:
          "Double-check your sailing date, ship, stateroom category and exact location (midship vs. forward/aft, verandah vs. oceanview), and all passenger names. Names must match passports exactly — corrections cost money and time.",
        proTip:
          "Screenshot your booking confirmation and save it in multiple places: email, cloud, and a printed copy. Verify your Castaway Club number is linked to the reservation from day one.",
      },
      {
        id: 'castaway-register',
        icon: Award,
        title: 'Register for Castaway Club (If First Cruise)',
        description:
          "If this is your first Disney Cruise, enroll in the Castaway Club loyalty program immediately. It's free and automatically tracks your cruises to unlock earlier booking windows as you move up tiers.",
        proTip:
          "Your Castaway Club number is separate from your general Disney account. Register at disneycruise.disney.go.com — keep this number accessible since you'll need it for every future booking.",
      },
      {
        id: 'travel-insurance',
        icon: ShieldCheck,
        title: 'Consider Travel Insurance (Deadline Varies)',
        description:
          "Travel insurance enrollment windows vary — some 'cancel for any reason' policies require purchasing within 14–21 days of your initial deposit. Don't wait on this decision.",
        proTip:
          "Disney's own insurance is convenient but often not the best value. Compare third-party providers like Allianz, Travel Guard, or Seven Corners. If anyone in your party has pre-existing medical conditions, purchasing within 14 days of deposit is critical.",
      },
      {
        id: 'navigator-app',
        icon: Smartphone,
        title: 'Set Up the Disney Cruise Line Navigator App',
        description:
          "Download the Navigator app now so you're ready when booking windows open. This app is your hub for excursions, dining reservations, activity schedules, character times, and shipboard communication.",
        proTip:
          'Make sure your Disney account login works in the app, then link your reservation under "My Reservations." The app works on regular data ashore and on ship Wi-Fi at sea.',
      },
    ],
  },
  {
    id: 'days-120',
    label: '120+ Days Before',
    timeframe: '120+ Days Out',
    emoji: '🔭',
    headerBg: 'bg-sky-600',
    cardBg: 'bg-sky-50',
    cardBorder: 'border-sky-100',
    dotBg: 'bg-sky-600',
    milestones: [
      {
        id: 'pearl-excursions',
        icon: Star,
        title: 'Pearl Castaway Club: Port Excursion Booking Opens (123 Days)',
        description:
          'Pearl Castaway Club members (25+ cruises) can book port excursions starting 123 days before sailing — the earliest window for any guest tier.',
        proTip:
          "Have your complete excursion wishlist ready the evening before your window opens. Popular Castaway Cay excursions (stingray adventure, parasailing) sell out within hours of the Pearl window opening.",
        midnightET: true,
      },
      {
        id: 'platinum-excursions',
        icon: Star,
        title: 'Platinum Castaway Club: Port Excursion Booking Opens (120 Days)',
        description:
          'Platinum Castaway Club members (10–24 cruises) can book port excursions starting 120 days before sailing.',
        proTip:
          "Log into DCL's website (not just the app) when your window opens — the full site handles high booking traffic more reliably than the mobile app during peak windows.",
        midnightET: true,
      },
      {
        id: 'research-excursions',
        icon: MapPin,
        title: 'Start Researching Excursions for Each Port',
        description:
          "Begin comparing Disney-offered excursions vs. third-party operators for each port. Disney excursions carry a ship guarantee (if they run late, the ship waits), but typically cost 20–40% more than independent operators.",
        proTip:
          "Use DCL's website to build a saved excursion wishlist. Know exactly what you want BEFORE your booking window opens — time spent deciding on opening night costs you inventory on the most popular options.",
      },
    ],
  },
  {
    id: 'days-105-90',
    label: '105–90 Days Before',
    timeframe: '105–90 Days Out',
    emoji: '🍽️',
    headerBg: 'bg-teal-600',
    cardBg: 'bg-teal-50',
    cardBorder: 'border-teal-100',
    dotBg: 'bg-teal-600',
    milestones: [
      {
        id: 'gold-booking',
        icon: Star,
        title: 'Gold Castaway Club: Excursions & Specialty Dining Opens (105 Days)',
        description:
          'Gold Castaway Club members (5–9 cruises) can book port excursions AND specialty dining — Palo, Remy, Enchanté — starting 105 days before sailing.',
        proTip:
          "Book specialty dining and excursions in the same session — you'll already be logged in. Palo brunch is legendary and routinely books out within 5 minutes of the window opening.",
        midnightET: true,
      },
      {
        id: 'silver-booking',
        icon: Star,
        title: 'Silver Castaway Club: Excursions & Specialty Dining Opens (90 Days)',
        description:
          'Silver Castaway Club members (1–4 cruises) can book port excursions and specialty dining starting 90 days before sailing.',
        proTip:
          "If Silver is your tier, set multiple alarms for midnight ET on your booking night. Palo and Remy fill within 2–3 minutes on popular sailings — every second counts.",
        midnightET: true,
      },
      {
        id: 'specialty-dining',
        icon: Utensils,
        title: 'Book Specialty Dining: Palo, Remy, Enchanté',
        description:
          "These adult-only restaurants open on the same Castaway Club tier windows as excursions. Palo ($40/person) is on all ships; Remy ($125+/person) is on Fantasy & Dream; Enchanté is on the Wish.",
        proTip:
          "If you miss Palo dinner, add yourself to the onboard waitlist on embarkation day — cancellations happen. Palo brunch is slightly less competitive than dinner. Remy and Enchanté are harder to snag last-minute.",
        midnightET: true,
      },
      {
        id: 'spa',
        icon: Heart,
        title: 'Book Senses Spa Appointments',
        description:
          'Senses Spa opens appointments on the same Castaway Club tier windows. Popular treatments like couples massages and hot stone services fill quickly for popular sailings.',
        proTip:
          "Port days are the best time for spa appointments — prices drop 20–30% vs. sea days because most guests are ashore. Specifically request a port day when booking.",
        midnightET: true,
      },
    ],
  },
  {
    id: 'days-75',
    label: '75 Days Before',
    timeframe: '75 Days Out',
    emoji: '🌟',
    headerBg: 'bg-emerald-600',
    cardBg: 'bg-emerald-50',
    cardBorder: 'border-emerald-100',
    dotBg: 'bg-emerald-600',
    milestones: [
      {
        id: 'first-timer-booking',
        icon: Star,
        title: 'First-Time Cruisers: All Booking Windows Open',
        description:
          "First-time Disney cruisers (no Castaway Club tier) can book port excursions and specialty dining starting 75 days before sailing. This is the final tier window — act fast, top options are already picked over.",
        proTip:
          "Even if Palo appears sold out, check back daily — cancellations happen regularly. Ask your GatGrid concierge to monitor waitlists and alert you of any openings.",
        midnightET: true,
      },
      {
        id: 'nursery',
        icon: Users,
        title: 'Book Nursery & Kids Club Sessions if Needed',
        description:
          "The It's a Small World Nursery (ages 6 months–3 years) has limited spots and requires advance reservations. Book immediately when your window opens if you have an infant or toddler.",
        proTip:
          "Kids Club (Oceaneer Club/Lab) for ages 3–12 is walk-in only — no advance reservations needed. The nursery is different: it's a paid service (~$9–12/hour) requiring pre-booking for specific time slots.",
      },
      {
        id: 'final-payment',
        icon: CreditCard,
        title: 'Final Payment Deadline Approaching',
        description:
          "Final payment is typically due 90–120 days before sailing depending on your booking type. Verify YOUR specific deadline — missing it can trigger automatic cancellation.",
        proTip:
          "Set a calendar reminder 14 days before your payment deadline. Maximize rewards points on this large purchase by paying with a travel credit card.",
      },
    ],
  },
  {
    id: 'days-45-30',
    label: '45–30 Days Before',
    timeframe: '45–30 Days Out',
    emoji: '📋',
    headerBg: 'bg-indigo-600',
    cardBg: 'bg-[#1E3A5F]/10',
    cardBorder: 'border-indigo-100',
    dotBg: 'bg-indigo-600',
    milestones: [
      {
        id: 'online-checkin',
        icon: CheckCircle2,
        title: 'Online Check-In Opens (~40 Days Out)',
        description:
          "Online check-in opens approximately 40 days before sailing for most guests. Complete it IMMEDIATELY — earlier completion earns you the earliest port arrival window, which means 2–3 hours more ship time than late-arrivers.",
        proTip:
          "Scan all required documents (passports, credit card) and upload them to your Disney account BEFORE check-in opens. This lets you complete the whole process in under 5 minutes the moment midnight hits.",
        midnightET: true,
      },
      {
        id: 'port-arrival',
        icon: Ship,
        title: 'Select Your Port Arrival Time',
        description:
          "During online check-in, select your port arrival window. The earliest window (typically 10:30–11:00am) means you board when the gangway first opens and have the ship nearly to yourself.",
        proTip:
          "Early arrival guests get first access to pools, Cabanas buffet, and the Bibbidi Bobbidi Boutique with zero wait. Even arriving 30 minutes earlier than average guests makes a noticeable difference in crowd levels.",
      },
      {
        id: 'health-questionnaire',
        icon: CheckCircle2,
        title: 'Complete Health Questionnaire for All Guests',
        description:
          "All guests — including children — must complete health screening questions as part of online check-in. Have medical information accessible for the whole party.",
        proTip:
          "Complete this for every person in your party during the same check-in session. Incomplete health forms will slow down terminal processing at the port.",
      },
      {
        id: 'magicband',
        icon: Star,
        title: 'Link MagicBand+ to Your Account',
        description:
          "If you own a MagicBand+, link it to your Disney account and cruise reservation. It can unlock your stateroom door and serve as your onboard payment method.",
        proTip:
          "MagicBands are an enhancement, not a requirement. Disney provides a 'Key to the World' card that does everything the band does. Bands offer a more seamless experience if you're also doing theme parks.",
      },
      {
        id: 'hotel',
        icon: Building2,
        title: 'Book Pre/Post-Cruise Hotel if Needed',
        description:
          "We strongly recommend arriving the night before embarkation day. Flight delays are common — DCL will NOT hold the ship for late passengers, no matter the reason.",
        proTip:
          "Near Port Canaveral: Residence Inn Cape Canaveral, Holiday Inn Express Space Coast. Near Miami: Brickell or Biscayne Bay hotels. Port-adjacent hotels fill fast on popular sail dates — book early.",
      },
      {
        id: 'transportation',
        icon: Plane,
        title: 'Book Airport-to-Port Transportation',
        description:
          "Disney offers port transfers from the airport. Third-party services (Mears, Go Port, private car) are often 30–40% cheaper — especially for families of 4+.",
        proTip:
          "Book ground transportation round-trip in advance. For Port Canaveral, private car services typically run $80–120 total vs. $160+ for Disney transfers for a family of four.",
      },
      {
        id: 'fish-extender',
        icon: ShoppingBag,
        title: 'Order Fish Extender Gifts (If Participating)',
        description:
          "Fish Extenders are a beloved community tradition where guests exchange small gifts through stateroom fish hooks. Join a Fish Extender group on Facebook for your specific sailing.",
        proTip:
          "Order gifts NOW from Amazon or Etsy — not the week before sailing. Popular FE gifts: personalized keychains, snacks, small Disney figurines. Budget $3–8 per stateroom in your exchange group.",
      },
      {
        id: 'wifi',
        icon: Globe,
        title: 'Purchase Wi-Fi Package (Cheaper Pre-Cruise)',
        description:
          "Wi-Fi packages purchased pre-cruise through the Navigator app are 10–15% cheaper than buying onboard. Ship Wi-Fi is satellite-based (slower than home) but functional for most tasks.",
        proTip:
          "For a 7-night cruise, the Premium package (~$24/day/device) is worth it for remote workers or teens. For casual browsing, one Basic device package usually suffices. Download shows before you leave home.",
      },
      {
        id: 'beverage-package',
        icon: DollarSign,
        title: 'Pre-Purchase Beverage Package',
        description:
          "Alcoholic and non-alcoholic beverage packages are slightly discounted when purchased pre-cruise through the Navigator.",
        proTip:
          "Run the math honestly: the alcohol package (~$60–75/day/person) only pays off if you drink 4+ cocktails daily at $12–15 each. For most guests, buying drinks individually is comparable. Non-alcoholic packages rarely pencil out.",
      },
      {
        id: 'onboard-account',
        icon: CreditCard,
        title: 'Set Up Onboard Account & Link Credit Card',
        description:
          "During online check-in, link a credit card to your onboard account. All purchases are cashless — they accumulate on your account and settle at end of cruise.",
        proTip:
          "Use a travel rewards card with no foreign transaction fees: Chase Sapphire Preferred, Capital One Venture, and Amex Gold all work well. Set per-stateroom spending limits for teens to avoid surprise bills.",
      },
    ],
  },
  {
    id: 'days-14',
    label: '2 Weeks Before',
    timeframe: '14 Days Out',
    emoji: '🧳',
    headerBg: 'bg-amber-600',
    cardBg: 'bg-amber-50',
    cardBorder: 'border-amber-100',
    dotBg: 'bg-amber-600',
    milestones: [
      {
        id: 'packing-start',
        icon: Package,
        title: 'Start Packing — Formal Night & Pirate Night Outfits',
        description:
          "Lay out all cruise clothing including formal night attire (at least one per 7-night sailing), pirate night gear, port casual outfits, and swimwear. Doing this two weeks out leaves time to buy anything missing.",
        proTip:
          "Order kids' pirate costumes in advance — onboard shops charge 2–3x more. Adults: a bandana and eye patch is all you need for Pirate Night. Rolling clothes saves 20% more space than folding and reduces wrinkles for formal night.",
      },
      {
        id: 'luggage-tags',
        icon: MapPin,
        title: 'Print & Save Luggage Tags from Online Check-In',
        description:
          "Luggage tags are in your online check-in documents. Print them, fold per instructions, and attach to all checked bags before heading to port.",
        proTip:
          "Use rigid plastic luggage tag holders from Amazon (~$2 each) instead of the paper fold-over sleeves. Paper tags tear off during rough port handling — a missing tag creates major delays at check-in.",
      },
      {
        id: 'confirm-flights',
        icon: Plane,
        title: 'Confirm Flight Details',
        description:
          "Reconfirm flights, seat assignments, and verify itineraries haven't shifted. Airlines change schedules regularly — a 30-minute departure change could affect port shuttle timing.",
        proTip:
          "Set up flight alerts in Google Flights or your airline's app. Re-check flights the night before departure and screenshot boarding passes for offline access.",
      },
      {
        id: 'weather-check',
        icon: Sun,
        title: 'Check Weather for Port & Ports of Call',
        description:
          "Monitor forecasts for your departure port and each destination. Caribbean weather in summer brings tropical systems; hurricane season officially runs June–November.",
        proTip:
          "Check the National Hurricane Center for Atlantic systems if sailing during hurricane season. Disney will reroute if necessary, but knowing early helps you pack for alternate destinations.",
      },
      {
        id: 'charge-magicband',
        icon: Star,
        title: 'Charge MagicBand+',
        description:
          "Charge your MagicBands before leaving home. Ship charging opportunities are limited and you want full power on embarkation day.",
        proTip:
          "MagicBand+ charges via USB-C. Bring a small portable power bank — the band's battery lasts 6–8 hours of active use, which can be tight on busy sea days.",
      },
      {
        id: 'navigator-update',
        icon: Smartphone,
        title: 'Download Navigator App Updates',
        description:
          "Update the Navigator app to the latest version before sailing. Large app updates on slow ship satellite Wi-Fi are frustrating and waste time on your first day.",
        proTip:
          "Download any movies, shows, or books to your devices now while on home Wi-Fi. Streaming on ship Wi-Fi is unreliable and counts against your data package.",
      },
    ],
  },
  {
    id: 'days-7',
    label: '1 Week Before',
    timeframe: '7 Days Out',
    emoji: '📦',
    headerBg: 'bg-orange-600',
    cardBg: 'bg-orange-50',
    cardBorder: 'border-orange-100',
    dotBg: 'bg-orange-600',
    milestones: [
      {
        id: 'final-packing',
        icon: Package,
        title: 'Final Packing Check',
        description:
          "Run your complete packing list one last time. Commonly forgotten: reef-safe sunscreen (required at some ports), seasickness medication, power strips (no surge protectors — prohibited onboard), and a small nightlight for kids.",
        proTip:
          "Bring a collapsible tote bag for beach days — DCL provides towels at Castaway Cay but you'll want a bag for snorkeling gear and snacks. Leave heavy luggage locks at home; port security needs bag access.",
      },
      {
        id: 'home-arrangements',
        icon: CheckCircle2,
        title: 'Arrange Pet Care, Mail Hold, etc.',
        description:
          "Confirm pet sitters or boarding, request USPS mail hold, set light timers, and notify your bank of travel dates to prevent automatic fraud holds on your cards.",
        proTip:
          "Call your credit card companies with your travel dates and the specific countries/ports you'll visit. Unfamiliar international charges trigger automatic fraud blocks at the worst possible moment.",
      },
      {
        id: 'confirm-transport',
        icon: MapPin,
        title: 'Confirm Ground Transportation',
        description:
          "Reconfirm airport-to-port and port-to-airport transportation. Verify pickup times, locations, and save the service contact number in your phone.",
        proTip:
          "Add 45–60 minutes of buffer to ALL embarkation day transportation estimates. You absolutely cannot miss the ship — it will not wait for late passengers.",
      },
      {
        id: 'flight-checkin',
        icon: Plane,
        title: 'Check In for Flights',
        description:
          "Most airlines open check-in 24 hours before departure. Check in online, confirm seat assignments, and download boarding passes to your phone.",
        proTip:
          "Save boarding passes to Apple Wallet or Google Wallet BEFORE heading to the airport. Airport Wi-Fi is notoriously unreliable — don't hunt for a screenshot at the gate.",
      },
      {
        id: 'day-one-review',
        icon: CalendarClock,
        title: 'Review First Day Onboard Activities',
        description:
          "The Navigator app shows the daily schedule once unlocked for your sailing. Review embarkation day activities so you can hit the ground running — especially character times and restaurant hours.",
        proTip:
          "The Bibbidi Bobbidi Boutique, Senses Spa, and specialty restaurants open immediately on embarkation day. If your kids want princess makeovers, head there within 30 minutes of boarding — lines grow fast.",
      },
    ],
  },
  {
    id: 'embarkation',
    label: 'Embarkation Day',
    timeframe: 'Day of Sailing',
    emoji: '🚢',
    headerBg: 'bg-green-700',
    cardBg: 'bg-green-50',
    cardBorder: 'border-green-100',
    dotBg: 'bg-green-700',
    milestones: [
      {
        id: 'arrive-port',
        icon: Ship,
        title: 'Arrive at Port During Your Assigned Window',
        description:
          "Arrive during — not before — your assigned port arrival time. DCL strictly enforces boarding windows and early arrivals are turned away to wait in their car.",
        proTip:
          "If staying nearby, plan a leisurely breakfast aligned with your window time. Disney's terminal check-in is fast and well-organized once your window opens — the wait is minimal when you arrive on time.",
      },
      {
        id: 'documents',
        icon: CheckCircle2,
        title: 'Have Passports, Boarding Docs & Health Forms Ready',
        description:
          "Every passenger needs: valid passport (or birth certificate + government ID for closed-loop cruises), boarding documents from online check-in, and completed health forms.",
        proTip:
          "Passports are STRONGLY recommended even for closed-loop US cruises. If a medical emergency requires you to fly home from a foreign port, a passport makes everything dramatically simpler.",
      },
      {
        id: 'luggage-port',
        icon: Package,
        title: 'Luggage Tagged & Dropped with Port Porters',
        description:
          "Port porters collect your checked luggage at curbside — it'll be delivered to your stateroom door within a few hours. Keep a carry-on with essentials: swimsuit, medications, travel documents, and valuables.",
        proTip:
          "ALL medications, charging cables, and valuables go in your carry-on, not checked bags. Staterooms aren't ready until ~1:30pm and luggage could arrive even later in the afternoon.",
      },
      {
        id: 'explore-ship',
        icon: MapPin,
        title: 'Explore the Ship While Stateroom Is Being Prepared',
        description:
          "Staterooms aren't ready until 1:30–2:00pm. Grab lunch at the Cabanas buffet, explore deck layouts, visit guest services, and enjoy the ship at its least crowded moment.",
        proTip:
          "Character meet & greet lines are shortest in the first hour after boarding. Head to the atrium within 30 minutes of boarding if character photos are important to your family.",
      },
      {
        id: 'stateroom-ready',
        icon: CheckCircle2,
        title: 'Stateroom Ready Around 1:30–2:00 PM',
        description:
          "Once announced, drop your carry-on and meet your stateroom host. Note the emergency number posted in the room and locate your nearest muster station.",
        proTip:
          "Introduce yourself to your stateroom host immediately and communicate any preferences: extra pillows, towel animals every night, or dietary needs for any toiletries. They'll take excellent care of you for the whole voyage.",
      },
      {
        id: 'muster-drill',
        icon: AlertTriangle,
        title: 'Complete the Mandatory Muster Drill',
        description:
          "All guests must complete the safety drill before sailing. Modern format: watch a short safety video in the Navigator app, then physically check in at your assigned muster station.",
        proTip:
          "Complete the video portion immediately after boarding — before the ship gets crowded. Then check in at your station when called. Total time is about 10–15 minutes if you do it early.",
      },
    ],
  },
  {
    id: 'during',
    label: 'During Your Cruise',
    timeframe: 'Onboard',
    emoji: '🌊',
    headerBg: 'bg-cyan-600',
    cardBg: 'bg-cyan-50',
    cardBorder: 'border-cyan-100',
    dotBg: 'bg-cyan-600',
    milestones: [
      {
        id: 'port-tips',
        icon: MapPin,
        title: 'Tips for Each Port of Call',
        description:
          "At every port you have options: stay onboard (pools are gloriously empty), do a DCL excursion (ship guarantee if they run late), book a third-party tour, or explore independently. Have a plan before you dock.",
        proTip:
          "Staying onboard on a port day is massively underrated. The ship's pools, slides, and restaurants are nearly empty while most guests are ashore. Perfect for families with young kids or guests who'd rather have a pool day.",
      },
      {
        id: 'room-service',
        icon: Utensils,
        title: 'Room Service Is Included (Most Items)',
        description:
          "Room service from the stateroom menu is available 24 hours and most items are included in your cruise fare. A handful of premium items carry a small surcharge.",
        proTip:
          "Late-night room service pizza is legendary among Disney cruisers — order around 10pm and enjoy on your verandah. The Mickey bar ice creams from the poolside cart are an iconic onboard must.",
      },
      {
        id: 'characters',
        icon: Star,
        title: 'Character Meet & Greet Strategy',
        description:
          "Popular characters (Mickey, Minnie, Disney Princesses) have designated meet & greet times in the atrium. Lines can reach 45–60 minutes for the most popular characters during peak windows.",
        proTip:
          "Check the Navigator app first thing each morning for character schedules. Arrive 10–15 minutes early. Less common characters (Goofy, Donald, Pluto, Stitch) consistently have shorter lines — and those photos are just as magical.",
      },
      {
        id: 'castaway-cay',
        icon: Sun,
        title: 'Castaway Cay Pro Tips',
        description:
          "Disney's private Bahamian island is the highlight of most Caribbean sailings. Snorkel gear, bikes, and loungers are available to rent. A full BBQ lunch is included in your cruise fare.",
        proTip:
          "Walk 15 minutes to the far end of the beach — dramatically less crowded than the main area near the ship. The underwater sculpture snorkel playground is spectacular. Head back to the ship by 2:00pm to beat the gangway rush.",
      },
    ],
  },
  {
    id: 'post-cruise',
    label: 'After Your Cruise',
    timeframe: 'Post-Cruise',
    emoji: '📸',
    headerBg: 'bg-purple-700',
    cardBg: 'bg-purple-50',
    cardBorder: 'border-[#1E3A5F]',
    dotBg: 'bg-purple-700',
    milestones: [
      {
        id: 'photopass',
        icon: Camera,
        title: 'Download PhotoPass Photos Within 45 Days',
        description:
          "Disney's PhotoPass photos — taken by ship photographers and at Castaway Cay — expire exactly 45 days after disembarkation. This deadline is strictly enforced with no exceptions.",
        proTip:
          "Log into your Disney account the day you get home and download ALL photos immediately. Don't trust yourself to remember in three weeks. These are irreplaceable memories, especially character dining and formal night shots.",
      },
      {
        id: 'reviews',
        icon: Star,
        title: 'Leave Reviews & Share Your Experience',
        description:
          "Share your experience on Google, TripAdvisor, and the Disney Cruise Line website. Your honest reviews directly help future cruisers make better decisions.",
        proTip:
          "If crew members went above and beyond — stateroom host, dining team, any staff by name — mention them in your review. DCL tracks guest mentions, and your recognition directly impacts their rewards and advancement.",
      },
      {
        id: 'onboard-booking',
        icon: Ship,
        title: 'Book Next Cruise Onboard for Maximum Perks',
        description:
          "Disney's Onboard Booking offer typically includes $200–$500 in onboard credit when you book your next sailing before disembarking. This is the single best deal Disney offers on future cruises.",
        proTip:
          "You don't need exact dates to secure the credit. Book a flexible 'placeholder' sailing with a small deposit, then change dates later. The onboard credit applies to any future qualifying sailing.",
      },
      {
        id: 'future-credits',
        icon: DollarSign,
        title: 'Watch for Future Cruise Credit Offers',
        description:
          "After your cruise, Disney sometimes sends loyalty offers, promotions, and upgrade incentives to past guests. Keep an eye on your email and Disney account.",
        proTip:
          "Working with GatGrid means your travel advisor actively monitors these offers and alerts you when credits or promotions appear for future sailings — deals you'd easily miss on your own.",
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Castaway Club tier data
// ---------------------------------------------------------------------------

const castawayTiers = [
  {
    name: 'First-Time Cruiser',
    minCruises: 0,
    maxCruises: 0,
    bookingDays: 75,
    icon: '⭐',
    colorClass: 'text-gray-700',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    description:
      "Welcome to the magic! You'll have the 75-day booking window for excursions and specialty dining. Get on that midnight ET alarm ASAP.",
  },
  {
    name: 'Silver',
    minCruises: 1,
    maxCruises: 4,
    bookingDays: 90,
    icon: '🥈',
    colorClass: 'text-slate-700',
    bg: 'bg-slate-100',
    border: 'border-slate-200',
    description:
      "Your booking window opens 90 days out — 15 days before first-timers. You'll find more availability than you'd expect at this tier.",
  },
  {
    name: 'Gold',
    minCruises: 5,
    maxCruises: 9,
    bookingDays: 105,
    icon: '🥇',
    colorClass: 'text-yellow-700',
    bg: 'bg-yellow-100',
    border: 'border-yellow-200',
    description:
      "Booking opens 105 days out. Gold members access the calendar while many popular excursions and dining options are still wide open.",
  },
  {
    name: 'Platinum',
    minCruises: 10,
    maxCruises: 24,
    bookingDays: 120,
    icon: '💎',
    colorClass: 'text-blue-700',
    bg: 'bg-[#1E3A5F]/20',
    border: 'border-blue-200',
    description:
      "120 days out — you'll almost always get your first choice for excursions and specialty dining. Welcome to the easy booking life.",
  },
  {
    name: 'Pearl',
    minCruises: 25,
    maxCruises: Infinity,
    bookingDays: 123,
    icon: '🦪',
    colorClass: 'text-purple-700',
    bg: 'bg-purple-100',
    border: 'border-purple-200',
    description:
      "The pinnacle: 123 days out, 3 days ahead of Platinum. Pearl members get first pick of everything. You've earned it.",
  },
]

function getCastawayTier(count: number) {
  return (
    castawayTiers.find((t) => count >= t.minCruises && count <= t.maxCruises) ||
    castawayTiers[0]
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CruiseCountdownTimeline() {
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set())
  const [cruiseCount, setCruiseCount] = useState(0)
  const [showTierTable, setShowTierTable] = useState(false)

  const toggleTip = (id: string) => {
    setExpandedTips((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const currentTier = getCastawayTier(cruiseCount)

  return (
    <main className="min-h-screen bg-white">
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-200 font-medium mb-6">
              <span>⚓</span>
              <span>Disney Cruise Ultimate Guide</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Disney Cruise
              <br />
              <span className="text-amber-400">Countdown Timeline</span>
            </h1>
            <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Every booking window, deadline, and pro tip — organized by days before sailing.
              Never miss Palo, a Castaway Cay excursion, or your check-in window again.
            </p>
            {/* Phase jump pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {phases.map((phase) => (
                <a
                  key={phase.id}
                  href={`#${phase.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 text-xs text-white font-medium"
                >
                  <span>{phase.emoji}</span>
                  <span>{phase.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Timezone alert — prominent callout */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-amber-50 border-y-2 border-amber-300">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-2xl shadow">
              ⏰
            </div>
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-bold text-amber-900 mb-2">
                Important: All DCL Booking Windows Open at Midnight Eastern Time
              </h2>
              <p className="text-amber-800 text-sm md:text-base leading-relaxed">
                Disney Cruise Line opens ALL booking windows — excursions, specialty dining,
                spa appointments, and online check-in — at exactly{' '}
                <strong>midnight Eastern Time (ET)</strong>. If you&apos;re in another time
                zone, that&apos;s:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { zone: 'Central', time: '11:00 PM' },
                  { zone: 'Mountain', time: '10:00 PM' },
                  { zone: 'Pacific', time: '9:00 PM' },
                  { zone: 'Alaska', time: '8:00 PM' },
                  { zone: 'Hawaii', time: '7:00 PM' },
                ].map(({ zone, time }) => (
                  <span
                    key={zone}
                    className="inline-flex items-center gap-1 bg-amber-200 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {zone}: {time} (night before)
                  </span>
                ))}
              </div>
              <p className="mt-3 text-amber-800 text-sm">
                Popular options like Palo dinner and Castaway Cay excursions sell out in{' '}
                <strong>minutes — sometimes seconds</strong>. Set your alarm or you will miss
                your window.
              </p>
              <div className="mt-3 inline-flex items-start gap-2 bg-amber-100 border border-amber-300 rounded-lg px-4 py-2.5">
                <span className="text-sm">🎯</span>
                <p className="text-sm text-amber-800 font-medium">
                  <strong>GatGrid concierge tip:</strong> When you plan with our concierge, your
                  personal specialist converts every booking window to{' '}
                  <em>your local time zone</em> and sends reminders before each deadline —
                  so you never have to do time zone math.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Castaway Club tier helper */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 border-b border-blue-100 py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">🏆</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-blue-950 mb-2">
              What&apos;s Your Castaway Club Tier?
            </h2>
            <p className="text-blue-700 max-w-xl mx-auto text-sm md:text-base">
              Your tier determines how early you can book excursions, specialty dining, and spa
              appointments. Use the selector below to find your booking window.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <label className="block text-sm font-semibold text-blue-900 mb-3">
                How many Disney cruises have you completed?{' '}
                <span className="text-blue-400 font-normal">(not counting your upcoming trip)</span>
              </label>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setCruiseCount(Math.max(0, cruiseCount - 1))}
                  aria-label="Decrease cruise count"
                  className="w-10 h-10 rounded-full bg-[#1E3A5F]/20 hover:bg-blue-200 text-blue-900 font-bold text-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  −
                </button>
                <span className="text-4xl font-bold text-blue-900 w-12 text-center tabular-nums">
                  {cruiseCount}
                </span>
                <button
                  onClick={() => setCruiseCount(cruiseCount + 1)}
                  aria-label="Increase cruise count"
                  className="w-10 h-10 rounded-full bg-[#1E3A5F]/20 hover:bg-blue-200 text-blue-900 font-bold text-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  +
                </button>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={cruiseCount}
                  onChange={(e) => setCruiseCount(parseInt(e.target.value))}
                  className="flex-1 accent-blue-600"
                  aria-label="Cruise count slider"
                />
              </div>

              {/* Tier result card */}
              <div
                className={`rounded-xl border p-5 ${currentTier.bg} ${currentTier.border}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{currentTier.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xl font-bold ${currentTier.colorClass} mb-1`}>
                      {currentTier.name === 'First-Time Cruiser'
                        ? 'First-Time Cruiser'
                        : `${currentTier.name} Castaway Club`}
                    </p>
                    <p className={`text-sm ${currentTier.colorClass} mb-4 leading-relaxed`}>
                      {currentTier.description}
                    </p>
                    <div className="bg-white/70 rounded-lg px-4 py-3 space-y-1.5">
                      <p className={`text-xs font-bold ${currentTier.colorClass} uppercase tracking-wide`}>
                        Your booking windows open at:
                      </p>
                      <p className={`text-sm ${currentTier.colorClass}`}>
                        ⏰{' '}
                        <strong>{currentTier.bookingDays} days</strong> before sailing —
                        excursions, specialty dining & spa{' '}
                        <span className="font-semibold">(midnight ET)</span>
                      </p>
                      <p className={`text-sm ${currentTier.colorClass}`}>
                        ⏰ <strong>~40 days</strong> before sailing — online check-in{' '}
                        <span className="font-semibold">(midnight ET)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expand full tier table */}
              <button
                onClick={() => setShowTierTable(!showTierTable)}
                className="mt-4 w-full flex items-center justify-between text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <span>Compare all Castaway Club tiers</span>
                {showTierTable ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showTierTable && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-blue-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1E3A5F]/10">
                        <th className="text-left px-4 py-2.5 text-blue-900 font-semibold">
                          Tier
                        </th>
                        <th className="text-left px-4 py-2.5 text-blue-900 font-semibold">
                          Cruises
                        </th>
                        <th className="text-left px-4 py-2.5 text-blue-900 font-semibold">
                          Booking Opens
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {castawayTiers.map((tier, i) => (
                        <tr
                          key={tier.name}
                          className={`
                            ${i % 2 === 0 ? 'bg-white' : 'bg-[#1E3A5F]/10/40'}
                            ${currentTier.name === tier.name ? 'outline outline-2 outline-blue-400 outline-offset-[-2px]' : ''}
                          `}
                        >
                          <td className="px-4 py-2.5 font-medium">
                            <span className="mr-1.5">{tier.icon}</span>
                            {tier.name}
                            {currentTier.name === tier.name && (
                              <span className="ml-2 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
                                You
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-gray-600">
                            {tier.maxCruises === Infinity
                              ? `${tier.minCruises}+`
                              : tier.minCruises === 0
                              ? '0 (first-timer)'
                              : `${tier.minCruises}–${tier.maxCruises}`}
                          </td>
                          <td className="px-4 py-2.5 font-semibold text-gray-800">
                            {tier.bookingDays} days out
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Timeline */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-900 via-teal-400 via-amber-400 to-purple-700 opacity-30"
              style={{ left: '1.5rem' }}
            />

            {phases.map((phase) => (
              <div
                key={phase.id}
                id={phase.id}
                className="relative mb-14 scroll-mt-20"
              >
                {/* Timeline dot — desktop only */}
                <div
                  className={`hidden md:flex absolute top-4 w-12 h-12 -translate-x-1/2 rounded-full ${phase.dotBg} items-center justify-center text-xl z-10 border-4 border-white shadow-md`}
                  style={{ left: '1.5rem' }}
                >
                  {phase.emoji}
                </div>

                {/* Phase content — pushed right on desktop to clear the dot */}
                <div className="md:pl-24">
                  {/* Phase header */}
                  <div className={`${phase.headerBg} rounded-xl px-5 py-4 mb-4 flex items-center gap-3`}>
                    <span className="text-2xl md:hidden">{phase.emoji}</span>
                    <div>
                      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                        {phase.timeframe}
                      </p>
                      <h2 className="text-white font-bold text-xl md:text-2xl font-display leading-tight">
                        {phase.label}
                      </h2>
                    </div>
                  </div>

                  {/* Milestone cards */}
                  <div className="space-y-3">
                    {phase.milestones.map((milestone) => {
                      const Icon = milestone.icon
                      const isExpanded = expandedTips.has(milestone.id)

                      return (
                        <div
                          key={milestone.id}
                          className={`${phase.cardBg} border ${phase.cardBorder} rounded-xl overflow-hidden`}
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex gap-3 md:gap-4 items-start">
                              {/* Icon */}
                              <div
                                className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg ${phase.headerBg} flex items-center justify-center`}
                              >
                                <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Title + midnight ET badge */}
                                <div className="flex flex-wrap items-start gap-2 mb-1.5">
                                  <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug">
                                    {milestone.title}
                                  </h3>
                                  {milestone.midnightET && (
                                    <span className="inline-flex items-center gap-1 flex-shrink-0 bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                      ⏰ Midnight ET
                                    </span>
                                  )}
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {milestone.description}
                                </p>

                                {/* Pro tip toggle */}
                                {milestone.proTip && (
                                  <button
                                    onClick={() => toggleTip(milestone.id)}
                                    className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                                  >
                                    <span>💡</span>
                                    <span>Grayson&apos;s Pro Tip</span>
                                    {isExpanded ? (
                                      <ChevronUp className="w-3 h-3" />
                                    ) : (
                                      <ChevronDown className="w-3 h-3" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Expanded pro tip */}
                          {milestone.proTip && isExpanded && (
                            <div className="border-t border-dashed border-blue-200 bg-white/60 px-4 md:px-5 py-4">
                              <div className="flex gap-3 items-start md:ml-[52px]">
                                <span className="text-xl flex-shrink-0">💡</span>
                                <div>
                                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">
                                    Grayson&apos;s Pro Tip
                                  </p>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    {milestone.proTip}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-blue-950 to-indigo-900 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🎩</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Want Someone to Handle All of This for You?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Plan with our concierge and get a personal cruise specialist who turns this entire
            timeline into a hands-off experience.
          </p>

          <ul className="text-left max-w-md mx-auto space-y-3 mb-10">
            {[
              'Converts every booking window to your local time zone',
              'Sends personalized reminders before each deadline',
              'Monitors waitlists for sold-out Palo, Remy & top excursions',
              'Handles online check-in on your behalf',
              'Tracks your PhotoPass expiration date (45 days!)',
              'Alerts you to future cruise credits and promotions',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-blue-100 text-sm md:text-base">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/concierge"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-amber-400/20"
          >
            Get Free Concierge Help
            <span aria-hidden>→</span>
          </Link>

          <p className="mt-4 text-blue-400 text-sm">
            Free service via our partner travel agency. Same pricing as booking direct — plus
            a personal cruise expert in your corner.
          </p>
        </div>
      </section>
    </main>
  )
}
