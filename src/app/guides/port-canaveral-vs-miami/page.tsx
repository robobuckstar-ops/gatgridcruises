
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'Port Canaveral vs. Miami: Which Disney Cruise Port Is Better?',
  description: 'Compare Disney cruise ports: Port Canaveral vs Miami. Which is better for your family? Distance, parking, itineraries, and terminal facilities compared.',
  openGraph: {
    title: 'Port Canaveral vs. Miami: Which Disney Cruise Port Is Better?',
    description: 'Port Canaveral vs Miami for Disney cruises — distance, parking, itineraries, and terminal facilities compared.',
    url: 'https://gatgridcruises.com/guides/port-canaveral-vs-miami',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Port Canaveral vs. Miami: Which Disney Cruise Port?',
    description: 'Compare Port Canaveral and Miami for Disney cruises — parking, itineraries, and facilities.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
};

export default function PortCanaveralVsMiamiGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-300 hover:text-[#D4AF37] text-sm">
              Home
            </Link>
            <span className="text-white mx-2">/</span>
            <Link href="/guides" className="text-blue-300 hover:text-[#D4AF37] text-sm">
              Guides
            </Link>
            <span className="text-slate-400 mx-2">/</span>
            <span className="text-slate-500 text-sm">Port Canaveral vs. Miami</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-4 text-white">
            Port Canaveral vs. Miami: Which Disney Cruise Port Is Better?
          </h1>
          <p className="text-lg text-blue-100">
            Comparing driving distance, parking, facilities, nearby attractions, and which port is the perfect starting point for your Disney cruise.
          </p>
        </div>
      </section>

      {/* Ad Slot 1 */}
      <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Overview: The Two Main Disney Cruise Ports
          </h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Disney Cruise Line operates from two major Florida ports: Port Canaveral and Miami (technically PortMiami). Each serves as the departure point for multiple Disney ships and itineraries. Choosing between them involves more than just picking a port—it's about distance, convenience, cost, and your overall vacation experience.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            The verdict depends on your starting location and travel style. Let's break down every factor to help you decide.
          </p>
        </section>

        {/* Ad Slot 2 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Location & Driving Distance
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock size={24} className="text-blue-600" />
              Port Canaveral
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Location:</strong> Brevard County, Florida (Space Coast area)
            </p>
            <p className="font-inter text-slate-600 mb-3">
              <strong>From Key Locations:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Orlando Disney World: 45 minutes (65 miles)</li>
              <li>• Jacksonville: 2 hours</li>
              <li>• Tampa: 2.5 hours</li>
              <li>• Fort Lauderdale Airport (FLL): 1 hour 20 minutes</li>
              <li>• Miami: 1 hour 45 minutes</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Advantage:</strong> Much closer to Orlando and central Florida. If you're combining your cruise with a Disney World vacation, Port Canaveral is significantly more convenient.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock size={24} className="text-blue-600" />
              Miami (PortMiami)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Location:</strong> Miami-Dade County, downtown Miami waterfront
            </p>
            <p className="font-inter text-slate-600 mb-3">
              <strong>From Key Locations:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Orlando Disney World: 3.5-4 hours (235 miles)</li>
              <li>• Jacksonville: 3.5 hours</li>
              <li>• Tampa: 4 hours</li>
              <li>• Fort Lauderdale Airport (FLL): 30 minutes</li>
              <li>• Miami International Airport (MIA): 20 minutes</li>
              <li>• South Beach/Miami attractions: 15-20 minutes</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Advantage:</strong> Much closer to Miami International and Fort Lauderdale airports. Better for fly-in travelers. Direct gateway to Miami attractions and longer Caribbean itineraries.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Parking & Transportation Costs
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3 flex items-center gap-2">
              <DollarSign size={24} className="text-blue-600" />
              Port Canaveral Parking
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Valet Parking:</strong> $25-30 per day (approximately $175-210 for 7-night cruise)
            </p>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Self-Parking:</strong> Option available but on-site parking availability varies by capacity
            </p>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Additional Transportation Options:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Mears Connect (authorized shuttle): $13 one-way ($26 round-trip) from Orlando/area hotels</li>
              <li>• Rental car: $40-60/day for week-long rental</li>
              <li>• Ride-share (Uber/Lyft): $45-70+ from Orlando depending on surge pricing</li>
            </ul>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3 flex items-center gap-2">
              <DollarSign size={24} className="text-blue-600" />
              Miami Parking
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Valet & Parking:</strong> $33-35 per day (approximately $231-245 for 7-night cruise)
            </p>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Note:</strong> Miami has more expensive parking overall; limited on-site parking due to urban location
            </p>
            <p className="font-inter text-slate-600 mb-4">
              <strong>Additional Transportation Options:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Hotel parking (if staying pre-cruise): $25-50+ per night</li>
              <li>• Rental car: $45-70/day for week-long rental</li>
              <li>• Ride-share (Uber/Lyft): $20-35 from FLL airport; $15-25 from MIA</li>
              <li>• Public transportation: Tri-Rail to downtown Miami, then local taxi/Uber to port (~$25-35 total)</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
            <p className="font-inter text-slate-600">
              <strong>Cost Comparison for Orlando-Based Families:</strong> Driving to Port Canaveral ($175 parking) is significantly cheaper than driving to Miami ($231+ parking plus gas) or flying and renting a car at Miami ($70-80/day rental + $25-35 ride-share).
            </p>
          </div>
        </section>

        {/* Ad Slot 3 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Terminal Facilities & Embarkation Experience
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Port Canaveral Terminals
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Disney operates from Cruise Terminals at Port Canaveral:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Modern facilities:</strong> Recently renovated with contemporary design and amenities</li>
              <li>• <strong>Less crowded:</strong> Generally less congested than Miami, especially on weekend embarkation days</li>
              <li>• <strong>Parking proximity:</strong> Convenient proximity from parking garage to terminal check-in</li>
              <li>• <strong>Dining/retail:</strong> Basic facilities; fewer dining/shopping options at terminal compared to Miami</li>
              <li>• <strong>Family-friendly:</strong> Designed with cruise passengers in mind; straightforward layout</li>
            </ul>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Miami (PortMiami) Terminals
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Disney operates from downtown Miami waterfront terminals:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Urban location:</strong> In downtown Miami, walkable to restaurants, shops, attractions</li>
              <li>• <strong>More crowded:</strong> Busier overall due to multiple cruise lines operating from PortMiami</li>
              <li>• <strong>Dining/retail:</strong> More dining and shopping options at terminal and nearby</li>
              <li>• <strong>Parking challenges:</strong> Urban location means less convenient parking; valet-only in some cases</li>
              <li>• <strong>Pre-cruise dining:</strong> Easy access to Miami restaurants before/after embarkation</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Pre-Cruise Hotel Options & Pricing
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Port Canaveral Area
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Hotel Options:</strong> Fewer dedicated cruise hotels compared to Miami. Closest options:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Beach hotels:</strong> Cocoa Beach area (15 minutes away): $120-200/night</li>
              <li>• <strong>Port-adjacent:</strong> Limited hotels directly at port; most 10-15 minutes away</li>
              <li>• <strong>Mid-range chains:</strong> Hotels in Port Canaveral/Cocoa Beach: $100-180/night</li>
              <li>• <strong>Luxury options:</strong> Nearby beachfront resorts: $200-350+/night</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Advantage:</strong> Less essential pre-cruise hotel stay due to proximity to most Florida locations. Many guests skip hotel and drive/arrive morning of cruise.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Miami Area
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Hotel Options:</strong> Abundant cruise-oriented hotels throughout Miami area:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Budget cruise hotels:</strong> Downtown Miami area: $100-150/night</li>
              <li>• <strong>Mid-range chains:</strong> Wynwood, Design District: $120-180/night</li>
              <li>• <strong>South Beach hotels:</strong> Premium area: $180-300+/night</li>
              <li>• <strong>Airport hotels:</strong> Near MIA/FLL: $90-150/night</li>
              <li>• <strong>Luxury options:</strong> Miami Beach resorts: $250-500+/night</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Advantage:</strong> Many pre-cruise hotel options allow you to explore Miami for a night or two before sailing. Great for extending your vacation.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
            <p className="font-inter text-slate-600 mb-3">
              <strong>Cost Consideration:</strong> If you're driving from Orlando, skip the pre-cruise hotel in Canaveral and arrive morning-of (saves $100-150). If flying into Miami, budget $100-150/night for one pre-cruise hotel night.
            </p>
          </div>
        </section>

        {/* Ad Slot 4 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Nearby Attractions & Pre-Cruise Activities
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Port Canaveral Nearby Attractions
            </h3>
            <ul className="font-inter text-slate-600 space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Kennedy Space Center Visitor Complex (45 minutes away):</strong> NASA's space exploration museum. Great for families interested in space; can spend 4-6 hours here. Perfect pre-cruise activity (especially for kids). $63+ adult admission.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Disney World (45 minutes):</strong> The ultimate combo—visit Magic Kingdom, EPCOT, or Hollywood Studios before your cruise. Many families plan "Disney World + Disney Cruise" back-to-back vacations from Canaveral.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Cocoa Beach:</strong> Beach-adjacent to port; good for morning walks or afternoon beach time.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Ron Jon's Surf Shop:</strong> Iconic beach retail, 24-hour store open for last-minute shopping.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Miami Nearby Attractions
            </h3>
            <ul className="font-inter text-slate-600 space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>South Beach & Miami Beach:</strong> World-famous beach area just 20 minutes from port. Excellent for dining, shopping, nightlife, and relaxation before sailing.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Wynwood Walls:</strong> Street art district with colorful murals, galleries, boutiques, and restaurants (15 minutes).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Vizcaya Museum & Gardens:</strong> Historic mansion and Italian Renaissance-inspired gardens (20 minutes).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Everglades Tours:</strong> Airboat tours into famous wetlands (1.5 hours drive, full-day activity).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Little Havana:</strong> Historic Cuban neighborhood with restaurants, cafes, culture (15 minutes).
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Ships & Itineraries by Port
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Port Canaveral Ships & Itineraries
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Ships homeported here:</strong> Disney Dream, Disney Fantasy
            </p>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Typical itineraries:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Eastern Caribbean (3-7 nights): St. Thomas, St. Croix, St. Maarten, Tortola</li>
              <li>• Western Caribbean (7 nights): Jamaica, Cayman Islands, Cozumel</li>
              <li>• Bahamas (3-4 nights): Nassau, Castaway Cay</li>
            </ul>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Miami Ships & Itineraries
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Ships homeported here:</strong> Disney Wonder, Disney Wish (newer)
            </p>
            <p className="font-inter text-slate-600 mb-3">
              <strong>Typical itineraries:</strong>
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• Southern Caribbean (7 nights): Aruba, Curacao, Bonaire (farther, longer sailings)</li>
              <li>• Eastern Caribbean (7 nights): St. Thomas, St. John, Tortola</li>
              <li>• Bahamas (3-4 nights): Nassau, Castaway Cay</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Airport Proximity & Fly-In Logistics
          </h2>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Port Canaveral Airports
            </h3>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Orlando International (MCO):</strong> 1 hour drive (65 miles), major hub</li>
              <li>• <strong>Fort Lauderdale (FLL):</strong> 1 hour 20 minutes, good option, lower fares often available</li>
              <li>• <strong>Melbourne Airport (MLB):</strong> 45 minutes, smaller regional airport, fewer flight options</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Fly-in recommendation:</strong> Fort Lauderdale is usually the best balance of proximity and flight options. Ride-share or rental car to port costs $45-70 one-way.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Miami Airports
            </h3>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li>• <strong>Miami International (MIA):</strong> 20 minutes drive, major international hub with extensive flight options</li>
              <li>• <strong>Fort Lauderdale (FLL):</strong> 30 minutes drive, often has cheaper fares than MIA</li>
            </ul>
            <p className="font-inter text-slate-600 mt-4">
              <strong>Fly-in recommendation:</strong> Miami has two excellent airport options very close. Ride-share or rental car to port costs $15-35 one-way.
            </p>
          </div>
        </section>

        {/* Ad Slot 5 */}
        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Plan Your Disney Cruise</p>
                  <p className="text-blue-200 text-sm mt-0.5">Connect with our concierge team for expert cruise planning</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get Started →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Comparison Table: At a Glance
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-fraunces">Factor</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-fraunces">Port Canaveral</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-fraunces">Miami</th>
                </tr>
              </thead>
              <tbody className="font-inter text-slate-600">
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Distance from Orlando</td>
                  <td className="border border-gray-300 px-4 py-3">45 minutes</td>
                  <td className="border border-gray-300 px-4 py-3">3.5-4 hours</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Parking Cost (7 nights)</td>
                  <td className="border border-gray-300 px-4 py-3">$175-210</td>
                  <td className="border border-gray-300 px-4 py-3">$231-245</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Terminal Crowding</td>
                  <td className="border border-gray-300 px-4 py-3">Less crowded</td>
                  <td className="border border-gray-300 px-4 py-3">More crowded</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Pre-cruise Hotel Options</td>
                  <td className="border border-gray-300 px-4 py-3">Limited options</td>
                  <td className="border border-gray-300 px-4 py-3">Many options</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Nearby Attractions</td>
                  <td className="border border-gray-300 px-4 py-3">Disney World, Kennedy Space Center</td>
                  <td className="border border-gray-300 px-4 py-3">South Beach, Wynwood, Everglades</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Best Airport</td>
                  <td className="border border-gray-300 px-4 py-3">Fort Lauderdale (FLL)</td>
                  <td className="border border-gray-300 px-4 py-3">Miami (MIA) or Fort Lauderdale (FLL)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Best For</td>
                  <td className="border border-gray-300 px-4 py-3">Driving families, Disney World combo</td>
                  <td className="border border-gray-300 px-4 py-3">Fly-in travelers, adult getaways</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            The Verdict: Which Port Is Better for You?
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Choose Port Canaveral If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li>• You're driving from anywhere in central/north Florida or driving from Orlando to combine with Disney World</li>
                <li>• Budget is a priority (cheaper parking, closer to most Florida locations)</li>
                <li>• You want a less crowded embarkation experience</li>
                <li>• You're interested in Kennedy Space Center or a Disney World side trip</li>
                <li>• Traveling with young families who dislike long road trips</li>
              </ul>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Choose Miami If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li>• You're flying in (closest to major airports with cheapest flights)</li>
                <li>• You want to extend your vacation with Miami activities (South Beach, Wynwood)</li>
                <li>• You prefer longer, more exotic Caribbean itineraries (Southern Caribbean from Miami)</li>
                <li>• You want abundant pre-cruise hotel/dining options</li>
                <li>• Traveling as adults for romance or relaxation (not combining with theme parks)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] p-8 rounded-lg mb-12 text-white">
          <h2 className="text-2xl font-fraunces font-bold mb-4 text-white">Ready to Find Your Perfect Cruise?</h2>
          <p className="font-inter mb-6">
            Now that you've chosen your port, browse current deals and compare pricing for your Disney cruise.
          </p>
          <Link href="/deals" className="inline-flex items-center gap-2 bg-[#D4AF37] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition">
            Browse Deals <ArrowRight size={20} />
          </Link>
        </section>

        {/* Related Guides */}
        <section className="border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/disney-cruise-cost-guide" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  The True Cost of a Disney Cruise
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Complete breakdown of all expenses to budget accurately for your cruise.
                </p>
              </div>
            </Link>
            <Link href="/guides/first-time-disney-cruise-tips" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  25 First-Time Cruise Tips
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Essential advice to make your first Disney cruise smooth and enjoyable.
                </p>
              </div>
            </Link>
            <Link href="/guides/best-disney-cruise-staterooms" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  Best Disney Cruise Staterooms
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Category-by-category guide to choosing your perfect cabin.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </article>

      {/* Ad Slot 6 */}

      <GetQuoteCTA />

      <GetQuoteCTA />
    </div>
  );
}
