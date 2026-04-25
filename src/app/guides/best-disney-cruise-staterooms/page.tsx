
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Home, MapPin, Wind } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'Best Disney Cruise Staterooms: Complete Category Guide',
  description: 'Complete guide to Disney cruise cabin categories, locations, and features. Compare inside, oceanview, verandah, and concierge suites.',
};

export default function BestDisneyCruiseStateroomsGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Home
            </Link>
            <span className="text-white mx-2">/</span>
            <Link href="/guides" className="text-blue-600 hover:underline text-sm">
              Guides
            </Link>
            <span className="text-white mx-2">/</span>
            <span className="text-gray-300 text-sm">Best Disney Cruise Staterooms</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-4">
            Best Disney Cruise Staterooms: Category-by-Category Guide
          </h1>
          <p className="text-lg text-slate-600">
            Understand every cabin type, from budget inside cabins to luxury concierge suites. Find the perfect stateroom for your budget and vacation style.
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
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Understanding Disney Cruise Stateroom Categories
          </h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Disney Cruise Line divides accommodations into four main categories, each with distinct price points, amenities, and experiences. Whether you're seeking an affordable family getaway or an indulgent luxury experience, understanding the differences between categories helps you choose the best cabin for your needs.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Pricing varies significantly based on sailing date, ship, itinerary, and demand. Inside cabins start around $250-400 per night, while concierge suites can exceed $800-2,000+ per night. Let's break down each category in detail.
          </p>
        </section>

        {/* Ad Slot 2 */}
        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Inside Cabins (Categories 11A, 11B, 11C)
          </h2>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              What You Get
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Inside cabins offer the most budget-friendly option at $250-400 per person per night for a family. These compact staterooms feature no window—instead, you"ll find enhanced theming, artwork, and modern furnishings to maximize the sense of space. All inside cabins include beds (convertible sofa, queen, or split beds depending on configuration), a bathroom with shower, storage, and complimentary Wi-Fi (though you'll still need to purchase additional data if desired).
"            </p>
            <p className="font-inter text-slate-600">
              Inside cabins sleep 2-4 people depending on size. Larger inside cabins (11C) offer slightly more square footage and are ideal for families. All inside cabins are identical in amenities—the price difference between categories reflects location and size nuances.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Best For
            </h3>
            <p className="font-inter text-slate-600">
              Budget-conscious families who plan to spend most of their time on deck, at activities, or exploring ports. Ideal for first-time cruisers unsure if they'll enjoy the experience. Also perfect for couples or solo travelers wanting to save money for experiences like specialty dining and excursions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Pros & Cons
            </h3>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Most affordable base fares</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Excellent for families wanting to maximize excursion budgets</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>No window means darker room for early sleepers and nap times</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Compact space, challenging with 4 people</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>No verandah or ocean view</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Window less cabin can feel claustrophobic for some</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Oceanview Cabins (Categories 9A, 9B, 9C, 9D)
          </h2>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              What You Get
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Oceanview cabins introduce your first taste of ocean scenery at $350-550 per person per night. These staterooms feature either a porthole (circular window) or a large picture window with an unobstructed sea view. The extra amenities—especially the view—create a more spacious-feeling environment compared to inside cabins.
            </p>
            <p className="font-inter text-slate-600 mb-4">
              Porthole cabins (smaller circular windows) offer lower pricing than picture window cabins. Picture windows are substantially larger, providing better views and more natural light. Both options sleep 2-4 people and include the same standard amenities as inside cabins.
            </p>
            <p className="font-inter text-slate-600">
              The categories break down by window type and location: 9D has portholes, 9C has porthole or picture window options, 9B has larger picture windows, and 9A offers the best picture window views—often at the bow or stern where you get unique perspectives.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Best For
            </h3>
            <p className="font-inter text-slate-600">
              Families seeking a balance between budget and comfort. The ocean view provides psychological benefits—many guests report enjoying their cabin more with natural light and scenery. Ideal for guests who plan cabin time, enjoy watching the sea, or want photos of ocean scenery.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Pros & Cons
            </h3>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Natural light and ocean views improve mood and cabin time</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Moderate price increase from inside cabins (~$100-150 more per night)</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Great for whale watching and sunset views</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Portholes significantly limit view quality and light</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Some locations offer obstructed views (lifeboat partially blocks window)</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>No verandah or outdoor private space</span></li>
            </ul>
          </div>
        </section>

        {/* Ad Slot 3 */}
        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Verandah Cabins (Categories 4A-7A)
          </h2>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              What You Get
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Verandah cabins include a private balcony—the signature feature that elevates your cruise experience. Pricing ranges from $600-1,200+ per person per night depending on exact location and ship. These cabins are substantially larger than inside or oceanview options, typically 200+ square feet, and feature a door leading to an exclusive outdoor verandah where you can enjoy ocean breezes, morning coffee, and sunset views.
            </p>
            <p className="font-inter text-slate-600 mb-4">
              Verandah categories break down as follows:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li><strong>Category 7A (Standard Verandah):</strong> Smaller verandah, often with obstructed or angled views, priced around $600-800/night</li>
              <li><strong>Categories 6A-5A (Deluxe Verandah):</strong> Larger verandah, full ocean view, better locations, priced $800-1,200/night</li>
              <li><strong>Category 4A (Premium Verandah):</strong> The best verandah cabins with largest balconies, often with premium furniture and enhanced views, priced $1,000-1,500+/night</li>
              <li><strong>Navigator Verandah (Newer Ships):</strong> On Disney Wish and Disney Treasure, these feature exclusive location near adult areas with unique verandah access, sometimes premium pricing</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Location Strategy: Understanding Cabin Position
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Beyond category, cabin location dramatically impacts your experience:
            </p>
            <ul className="font-inter text-slate-600 space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Midship cabins:</strong> Best for guests sensitive to motion. Ships rock least in the middle. Slightly longer walk to activities but reduced seasickness.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Aft (back) cabins:</strong> Scenic location with views of ship's wake. Can experience more noticeable ocean motion. Popular for romantic couples.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Bow (front) cabins:</strong> Higher decks offer spectacular forward views. Can experience more motion and ocean spray. First in embarkation but last in debarkation.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Higher decks:</strong> More desirable for views and quieter overall. Some guests report noisier areas near pool decks above. Access to elevators may be longer.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Lower decks:</strong> Closer to dining venues and some activities. May be louder if near engines (lower aft decks). Quieter if near bow.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <div>
                  <strong>Avoid:</strong> Cabins directly above/below public spaces, laundry facilities, or elevators. Request a location away from noisy areas.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Best For
            </h3>
            <p className="font-inter text-slate-600">
              Guests wanting the signature Disney Cruise experience: a private outdoor space. Ideal for romantic getaways, couples, and families who plan afternoon verandah time. Those wanting to enjoy their cabin as a true retreat during sea days or downtime.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Pros & Cons
            </h3>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Private outdoor space transforms cabin experience</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Significantly larger cabin square footage</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Exclusive outdoor relaxation—watch the ocean, catch sunrise/sunset</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Better for families needing separation from kids</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Significant price jump from oceanview ($250-500+ more per night)</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Category 7A verandahs can be disappointingly small or obstructed</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Some locations (higher aft) subject to more ocean motion</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Balconies can get wet/slippery in rough seas</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Concierge Suites (Categories 1, 2, 3)
          </h2>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              What You Get
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Concierge suites represent the pinnacle of Disney Cruise luxury, priced from $800-2,000+ per person per night for the most elite accommodations. These sprawling suites (400-700+ sq ft) feature master bedrooms, separate living areas, large verandahs, whirlpool tubs, luxury bedding, and premium furnishings. Some concierge suites offer unique features like two-story design (Tower Suites on Disney Wish) or private hot tubs.
            </p>
            <p className="font-inter text-slate-600 mb-4">
              Categories break down as:
            </p>
            <ul className="font-inter text-slate-600 space-y-2 ml-4">
              <li><strong>Category 3:</strong> Entry-level suite, ~400 sq ft, verandah, separate living area</li>
              <li><strong>Category 2:</strong> Larger suite, ~500 sq ft, enhanced amenities, premium verandah</li>
              <li><strong>Category 1:</strong> Penthouse-level suite, largest, most luxurious, exclusive location</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Concierge Perks (Beyond the Cabin)
            </h3>
            <p className="font-inter text-slate-600 mb-4">
              Concierge suite guests enjoy exclusive benefits throughout their cruise:
            </p>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Priority boarding/debarkation:</strong> Get on ship first, off ship first—avoiding long lines</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Concierge lounge access:</strong> Private lounge with complimentary beverages, snacks, and seating</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Dedicated concierge service:</strong> Personal assistant for dining reservations, excursion booking, special requests</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Complimentary Wi-Fi:</strong> Unlimited internet throughout the cruise</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Premium bedding & amenities:</strong> Higher thread-count linens, luxury toiletries, robes, slippers</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Enhanced room service:</strong> Premium menu, room service champagne/wine</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Complimentary specialty dining:</strong> One night of specialty dinner included</span></li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Best For
            </h3>
            <p className="font-inter text-slate-600">
              Luxury travelers wanting the ultimate Disney Cruise experience, honeymooners seeking romance, families celebrating major milestones (anniversaries, big birthdays), and guests who value priority service and privacy throughout their vacation.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Pros & Cons
            </h3>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Unparalleled luxury, space, and private amenities</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Priority boarding saves hours at embarkation</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Concierge lounge is exclusive, quiet retreat</span></li>
              <li className="flex gap-2"><span className="text-green-600 font-bold">+</span> <span>Included perks (Wi-Fi, specialty dining, premium amenities) add significant value</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Extremely expensive—often $5,600-$14,000+ per person for 7-night cruise</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>Limited availability, especially on popular sailing dates</span></li>
              <li className="flex gap-2"><span className="text-red-600 font-bold">-</span> <span>May feel excessive if ship is your only destination</span></li>
            </ul>
          </div>
        </section>

        {/* Ad Slot 4 */}
        <a
              href="/concierge"
              
              
              className="block rounded-xl overflow-hidden border border-[#D4AF37] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2a4f7a] px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[#D4AF37] font-bold text-base leading-tight">Earn 150K+ Membership Rewards Points</p>
                  <p className="text-blue-200 text-sm mt-0.5">Enough for your next Disney cruise upgrade — Amex Business Platinum</p>
                </div>
                <span className="flex-shrink-0 bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">Learn More →</span>
              </div>
            </a>
  
        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Ship-Specific Stateroom Features
          </h2>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Disney Wish & Disney Treasure (Newest Ships)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              These newest Disney cruise ships feature:
            </p>
            <ul className="font-inter text-slate-600 space-y-2">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Tower Suites:</strong> Exclusive ultra-luxury 2-story suite with private elevator access, private deck area, and premium butler service</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Navigator Verandahs:</strong> Exclusive verandah cabin category in premium location</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Updated inside cabin design:</strong> Modern art, improved lighting, smart TV, larger storage</span></li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span><strong>Family staterooms:</strong> Larger options specifically designed for families of 5-6</span></li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-3">
              Disney Dream & Disney Fantasy (Older Ships)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              These ships offer solid stateroom options but with slightly more dated design and smaller overall cabin sizes compared to newer ships. Still excellent choice for budget-conscious travelers.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Choosing Your Perfect Stateroom
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Inside Cabin If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-1">
                <li>• You're budget-conscious and prefer deck time over cabin time</li>
                <li>• First-time cruiser testing the experience</li>
                <li>• Traveling solo or as a couple</li>
                <li>• Planning a short cruise (3-4 nights)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Oceanview If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-1">
                <li>• You want ocean views without major budget increase</li>
                <li>• Natural light and scenery enhance your vacation mood</li>
                <li>• Mid-range pricing between inside and verandah works for budget</li>
                <li>• Planning longer cruise (5+ nights) with cabin downtime</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Verandah If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-1">
                <li>• Private outdoor space is worth the investment</li>
                <li>• You plan significant cabin time (naps, morning coffee, stargazing)</li>
                <li>• Celebrating a special occasion (anniversary, honeymoon)</li>
                <li>• Family with kids needing separation/private outdoor space</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100 border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Concierge Suite If:
              </h3>
              <ul className="font-inter text-slate-600 space-y-1">
                <li>• Luxury and premium service are priorities</li>
                <li>• Budget allows for high-end accommodations</li>
                <li>• Priority boarding and exclusive amenities are appealing</li>
                <li>• Celebrating milestone event (wedding anniversary, significant birthday)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Booking & Location Tips
          </h2>
          <ul className="font-inter text-slate-600 space-y-4">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <div>
                <strong>Request specific cabin location:</strong> When booking, request midship for stability, higher deck for views/quietness, or avoid noisy areas (elevators, laundry).
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <div>
                <strong>Consider upgrade potential:</strong> Book an inside cabin and request a free upgrade on embarkation day. Disney occasionally offers free cabin upgrades to fill premium categories.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <div>
                <strong>Check for location-specific perks:</strong> Some cabin locations offer exclusive benefits (access to specific lounge, premier location on ship).
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <div>
                <strong>Price compare across websites:</strong> Use our <Link href="/tools/cost-calculator" className="text-blue-600 font-bold hover:underline">cost calculator</Link> to compare cabin categories and understand price differences.
              </div>
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-fraunces font-bold mb-4">Ready to Find Your Perfect Cruise?</h2>
          <p className="font-inter mb-6">
            Use our stateroom finder to compare cabin categories, view pricing, and discover the best options for your vacation style and budget.
          </p>
          <Link href="/tools/cost-calculator" className="inline-flex items-center gap-2 bg-blue-600 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition">
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
                  Complete breakdown of all cruise expenses including gratuities, dining, and excursions.
                </p>
              </div>
            </Link>
            <Link href="/guides/port-canaveral-vs-miami" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  Port Canaveral vs. Miami
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Compare Disney cruise ports to find the best launch point for your vacation.
                </p>
              </div>
            </Link>
            <Link href="/guides/first-time-disney-cruise-tips" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  25 First-Time Cruise Tips
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Essential advice for first-time Disney cruisers covering everything you need to know.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </article>

      {/* Ad Slot 5 */}

      <GetQuoteCTA />

      <GetQuoteCTA />
    </div>
  );
}