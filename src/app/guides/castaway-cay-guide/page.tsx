import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, AlertCircle, Anchor } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: "Castaway Cay: The Ultimate Guide to Disney's Private Island",
  description: "Complete guide to Disney's private island paradise. Learn about beaches, activities, restaurants, snorkeling, parasailing, and how to maximize your 8+ hours on the island.",
};

export default function CastawayCayGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Castaway Cay: The Ultimate Guide to Disney's Private Island
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Discover everything you need to know about Disney's exclusive private island in the Bahamas—from hidden beaches to thrilling water sports and secret dining spots.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8-10 hour visit</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bahamas</span>
            <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Activities $0-$130</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-b">
        <div className="max-w-4xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {' > '}
          <Link href="/guides" className="text-blue-600 hover:underline">Guides</Link>
          {' > Castaway Cay'}
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#0a1628] to-[#1E3A5F] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Ready to Plan Your Disney Cruise?</p>
                  <p className="text-slate-300 text-sm mt-0.5">Our Boardwalk Travel Agency specialists offer free planning and quotes</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#0a1628] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get a Free Quote →</span>
              </div>
            </a>

        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Welcome to Castaway Cay</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Castaway Cay is Disney's exclusive private island and the jewel of every Disney cruise itinerary. Located in the Bahamas, this tropical paradise spans 95 acres and offers white-sand beaches, world-class dining, thrilling water sports, and activities for every age. For most Disney cruise passengers, a day at Castaway Cay is the highlight of their voyage—and with proper planning, you can pack unforgettable experiences into your time on the island.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Unlike typical Caribbean ports where you're competing with cruise ship crowds and local vendors, Castaway Cay is exclusively for Disney Cruise Line guests. This means shorter lines, better organization, and a resort-like atmosphere. Your typical dock time runs from 8:00 AM to 4:30 PM (though the ship remains docked a bit longer), giving you a full 8 hours of island time to explore, relax, and adventure.
          </p>
        </section>

        {/* Beach Areas */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">The Three Beach Areas</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Family Beach</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              The largest and most active beach, Family Beach is where most guests spend their day. The beautiful white sand stretches for hundreds of yards, with calm, clear turquoise waters perfect for swimming. This is where you"ll find the main facilities: Cookies BBQ (free lunch included with your cruise), Conched Out Bar for adult beverages, and the beach's central hub with tram stops, bike rentals, and activity sign-ups. Family Beach also features the largest selection of lounge chairs and cabanas (premium rental available). It's the perfect base for families with young children due to the calm waters and shallow entry points.
"            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Serenity Bay (Adults-Only)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              If you"re seeking peace and quiet, Serenity Bay is your sanctuary. This exclusive adults-only beach is located on the far side of the island and offers a serene alternative to the hustle of Family Beach. You'll find fewer people, premium lounge seating, and a sophisticated atmosphere. Serenity Bay has its own bar and restaurant (Cookies Too, which also serves free lunch) and private cabanas. The water is equally beautiful and calm. Most families with young kids bypass this area, making it ideal for relaxation, couples" time, or seasoned cruisers seeking tranquility. A short tram ride from the main dock whisks you here in minutes.
            </p>
          </div>

          <div>
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Teen Beach</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Teenagers get their own exclusive zone with activities tailored to their interests. Teen Beach features games, beach volleyball, and DJ-hosted events. While not as elaborate as the adult-only Serenity Bay, it gives teens a sense of ownership and independence while remaining in a safe, supervised environment. This area is perfect for families with older kids who want some autonomy but still want to participate in island activities.
            </p>
          </div>
        </section>

        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#0a1628] to-[#1E3A5F] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Ready to Plan Your Disney Cruise?</p>
                  <p className="text-slate-300 text-sm mt-0.5">Our Boardwalk Travel Agency specialists offer free planning and quotes</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#0a1628] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get a Free Quote →</span>
              </div>
            </a>

        {/* Dining & Bars */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Dining & Bars</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Cookies BBQ & Cookies Too</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Your lunch is included with your cruise fare—no need to buy tickets or vouchers. Cookies BBQ on Family Beach and Cookies Too on Serenity Bay serve identical menus of tropical favorites: pulled pork sandwiches, jerk chicken, ribs, tropical salads, and sides. The food is excellent quality, portions are generous, and the tropical setting makes every meal feel special. Arrive early (8:30-9:30 AM) or late (2:00-3:00 PM) to avoid the noon rush. Both locations open at 11:30 AM and close by 3:30 PM, so plan accordingly.
            </p>
          </div>

          <div>
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Conched Out Bar</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Located on Family Beach, Conched Out Bar specializes in tropical cocktails, non-alcoholic drinks, and light fare. Their signature Bahama Mama punch is a must-try, and frozen daiquiris come in several fruity flavors. Adult beverages are not included in your cruise fare (they charge onboard rates), but non-alcoholic drinks and smoothies are reasonably priced. The bar sits right on the beach with a casual, open-air vibe. If you prefer beer or wine, you can grab drinks here or bring your own beverages to the beach (soft drinks and alcohol are allowed if purchased at the bar or brought from your cabin).
            </p>
          </div>
        </section>

        {/* Activities & Water Sports */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Activities & Water Sports</h2>

          <div className="mb-6 p-4 bg-[#1E3A5F]/10 border-l-4 border-[#D4AF37]">
            <p className="font-inter text-sm text-slate-600">
              <strong>Pro Tip:</strong> Most water sports require advance sign-ups at the beach. Head straight to the activity booth upon arrival to secure your preferred time slot, especially for parasailing and the stingray encounter.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Snorkeling (Free to $40)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              The best free activity on the island is snorkeling in designated areas around Castaway Cay. Disney provides snorkel equipment rental for about $12 per person per day (mask, fins, and snorkel). The reef features colorful fish, rays, and marine life—perfect for families and beginners. If you bring your own snorkel gear, you can snorkel free. Experienced snorkelers report seeing angelfish, parrotfish, and occasionally nurse sharks. The water temperature is warm year-round (75-85°F depending on season), and visibility is typically excellent. Multiple snorkel sites exist at varying depths and difficulty levels.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Bike Rentals ($10)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              For $10 per adult bike, explore the island on two wheels. Disney rents single-speed cruiser bikes perfect for casual island exploration. The ride is relatively flat and easy, covering pathways past the golf course, beach areas, and through tropical vegetation. Rentals are first-come, first-served; arrive early to ensure availability, especially on busy sea days. Kids' bikes are also available, though younger children must be able to reach the pedals safely.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Float & Tube Rentals</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Inflatable tubes, floats, and other floating devices are available for rent. While prices vary, expect to pay roughly $15-25 for beach floats. These are great for families with young children who want to float safely in the shallow waters. Some guests bring their own inflatable items from home to save money.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Flying Dutchman Waterslide</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              One of Castaway Cay"s signature attractions, this 300-foot-long waterslide twists and turns through the island, ending with a splash in the shallow lagoon. It's thrilling yet accessible to most ages (height and age restrictions apply—typically 5+ years old). The line moves quickly, and it's completely free. This is an absolute must-do for families with kids, and even adults enjoy the adrenaline rush and novelty.
"            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Pelican Point Tram & Observation Area</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Take the complimentary tram to Pelican Point for scenic views of the island and the Disney ships in port. This short excursion is perfect for photographers seeking island vistas and ship photos. The tram ride is free and operates throughout the day.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Stingray Encounter ($45)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Get up close with southern stingrays in a shallow lagoon environment. A trained guide leads a small group session where you'll wade in knee-deep water, touch the velvety rays, and learn about their behavior and habitat. Sessions last 20-30 minutes and are limited to small groups, so arrive early to book. Age restrictions apply (typically 5+). This is an incredibly memorable experience, and the cost is reasonable for what is essentially a private naturalist program.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Parasailing ($95-130)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Float high above Castaway Cay and the surrounding ocean on a parasail. Disney offers several packages: solo parasailing, parasailing for two, and optional water dips. Sessions are roughly 15 minutes airborne, with about 30 minutes total including boat time. Age and weight restrictions apply. This is pricey but offers unforgettable 360-degree island views and an adrenaline rush. Book early as slots fill quickly on busy sea days.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Jet Ski Rentals ($140+)</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              For thrill-seekers, jet ski rentals offer 30-minute guided tours and freestyle sessions. Pricing is per person and includes safety briefing and instruction. A driver's license is required. These sessions are expensive but deliver pure adrenaline and are popular with adults seeking adventure beyond the typical beach day.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Castaway Cay 5K Run</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              On select sailing days, Disney offers a casual 5K run around the island. The route is flat, scenic, and beginner-friendly. Participation is free and open to all fitness levels. T-shirts are provided. Sign up ahead of time at the dock or at the activities booth. This is a wonderful way to explore the island while getting some exercise and meeting fellow cruisers.
            </p>
          </div>
        </section>

        <a
              href="/concierge"
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#0a1628] to-[#1E3A5F] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Ready to Plan Your Disney Cruise?</p>
                  <p className="text-slate-300 text-sm mt-0.5">Our Boardwalk Travel Agency specialists offer free planning and quotes</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#0a1628] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Get a Free Quote →</span>
              </div>
            </a>

        {/* Practical Tips */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">How to Maximize Your Island Day</h2>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Get Off the Ship Fast</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              The ship begins disembarkation at 8:00 AM, but not all decks exit simultaneously. Deck 1 guests (and crew exits) disembark first, followed by others in order. Check your Key to the World card or the ship"s app to see your optimal time. Arriving at the beach by 8:30 AM gives you nearly a full eight hours. If you have an early departure time, you'll have the island almost to yourself for the first hour—perfect for photos and choosing the best lounge chairs.
"            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Sign Up for Activities Early</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Water sports like parasailing, jet skis, and the stingray encounter book up fast. Head directly to the activity booths (near the main dock area) upon arrival to reserve your preferred times. If you book onboard the evening before Castaway Cay, you'll secure your slot before arriving at the island.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Hydrate & Protect from Sun</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              The Bahamian sun is intense. Bring or buy plenty of water (you can bring refillable water bottles from the ship or purchase bottled water on the island). Reapply reef-safe sunscreen every two hours. Wear a hat, sunglasses, and consider a rashguard for water sports. Dehydration and sunburn can ruin your day and the remainder of your cruise.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Pack Smart: What to Bring</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Essential items: water shoes (reef protection and hot sand), reef-safe sunscreen, cover-up, towel (ships provide them but bring an extra for extended beach time), waterproof phone case, and cash/card for activities and drinks. Optional: snorkel gear (saves $12/person if you own it), waterproof camera, waterproof speaker. Leave valuables in your cabin safe. The island has minimal shade; bring or purchase an umbrella or beach tent.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Know the Schedule</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              All aboard is typically 4:30 PM. Plan to return to the ship by 4:00 PM to avoid any mishaps. The tenders (small boats) run continuously from the island to the ship; factor in 10-15 minute boat rides if you're on a tender ship. (Larger ships dock directly.) Check the daily program or your Key to the World app for exact tender schedules.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Pace Yourself</h3>
            <p className="font-inter text-slate-600 leading-relaxed">
              Don't try to do everything. Prioritize 2-3 activities and leave time for relaxation and lunch. Many guests make the mistake of overcommitting and end up rushing or missing meals. A balance of activities, snorkeling, and beach time is the sweet spot.
            </p>
          </div>
        </section>

        {/* Weather & Contingencies */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Weather & Special Considerations</h2>

          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-[#D4AF37] flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-inter text-slate-600">
                <strong>Hurricane Season:</strong> Castaway Cay can occasionally be affected by severe weather (June-November). If weather prevents island operations, Disney typically offers onboard credits or reschedules the island day on a future sea day.
              </p>
            </div>
          </div>

          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            The Bahamas enjoys warm weather year-round. January-April features cooler temps (70s-80s), while summer months are hot and humid with afternoon thunderstorms possible. Regardless of season, bring protection from the sun and monitor weather forecasts before your cruise.
          </p>
        </section>

        {/* Island Shopping */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Shopping on Castaway Cay</h2>
          <p className="font-inter text-slate-600 leading-relaxed">
            The island features small gift shops and merchandise stands selling Castaway Cay-themed clothing, souvenirs, snacks, and miscellaneous beach items. Prices are higher than on the mainland but on par with cruise ship pricing. You'll find Castaway Cay logo wear (t-shirts, hats), tropical snacks, toiletries, and sundries. Credit cards and cash are accepted; Disney Visa holders often receive special discounts. Most of these shops are located near the main beach facilities.
          </p>
        </section>

        {/* CTA Section */}
        <section className="my-12 p-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] text-white rounded-lg">
          <h2 className="font-fraunces text-3xl font-bold mb-4">Plan Your Castaway Cay Adventure</h2>
          <p className="font-inter text-lg mb-6">
            Ready to explore Disney's private island? Use our cruise planning tools to calculate your costs, find the best deals, and compare cruise options.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deals"
              className="inline-block px-6 py-3 bg-blue-600 text-slate-900 font-inter font-bold rounded hover:bg-yellow-300 transition"
            >
              Browse Deals
            </Link>
            <Link
              href="/tools/cost-calculator"
              className="inline-block px-6 py-3 bg-white text-slate-900 font-inter font-bold rounded hover:bg-gray-100 transition"
            >
              Calculate Total Cost
            </Link>
            <Link
              href="/ships"
              className="inline-block px-6 py-3 border-2 border-white text-white font-inter font-bold rounded hover:bg-white hover:text-slate-900 transition"
            >
              Explore Ships
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/guides/disney-cruise-packing-list"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">The Ultimate Disney Cruise Packing List</h3>
              <p className="font-inter text-gray-600 text-sm">Complete checklist for what to bring on your cruise, including Castaway Cay essentials.</p>
            </Link>
            <Link
              href="/guides/disney-cruise-food-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Disney Cruise Food Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Explore dining options across Disney ships and ports, including Castaway Cay restaurants.</p>
            </Link>
            <Link
              href="/guides/best-time-to-book-disney-cruise"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Best Time to Book a Disney Cruise</h3>
              <p className="font-inter text-gray-600 text-sm">Learn pricing trends and strategies to find the best rates on your dream cruise.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
