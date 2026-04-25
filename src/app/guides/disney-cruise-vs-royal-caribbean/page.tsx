import { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Users, Utensils, Zap, Heart, TrendingUp } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'Disney Cruise vs. Royal Caribbean: Honest Comparison',
  description: 'Fair comparison of Disney Cruise Line and Royal Caribbean cruises. Compare pricing, ship size, entertainment, dining, and which line is best for your family.',
};

export default function DisneyCruiseVsRoyalCaribbeanGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Disney Cruise vs. Royal Caribbean: Honest Comparison
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Deciding between Disney Cruise Line and Royal Caribbean? We'll break down the honest pros and cons of each cruise line to help you choose the right fit for your family.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Price comparison</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Family focus</span>
            <span className="flex items-center gap-2"><Utensils className="w-4 h-4" /> Dining options</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-b">
        <div className="max-w-4xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {' > '}
          <Link href="/guides" className="text-blue-600 hover:underline">Guides</Link>
          {' > Cruise Comparison'}
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

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

        {/* Overview */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">The Bottom Line</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Both Disney Cruise Line (DCL) and Royal Caribbean (RCCL) operate world-class cruise ships with excellent service, compelling entertainment, and quality accommodations. However, they cater to different audiences and philosophies. Disney focuses on family immersion and character interaction, while Royal Caribbean emphasizes thrills, onboard activities, and value for money. Your choice depends on your priorities, budget, and which cruise experience resonates with your family.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed">
            In this guide, we'll compare these two cruise lines across key factors so you can make an informed decision.
          </p>
        </section>

        {/* Price Comparison */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Pricing & Value</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Royal Caribbean (by cost)</h3>
            <p className="font-inter text-slate-600">
              <strong>Royal Caribbean is 2-3x cheaper than Disney.</strong> For a 7-night Eastern Caribbean cruise, expect to pay $600-1,200 per person for Royal Caribbean vs. $1,800-4,000+ per person for Disney Cruise Line. This dramatic price difference is the biggest deciding factor for budget-conscious cruisers.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Why Disney Costs More:</h3>
            <ul className="space-y-3 font-inter text-slate-600">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Brand premium:</strong> The Disney name carries significant cachet, and guests pay for the privilege.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Character experiences:</strong> Meet-and-greets, character dining, and interaction programs are included.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Quality of entertainment:</strong> Broadway-caliber shows and original programming cost more to produce.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Smaller ship sizes:</strong> Fewer passengers spread fixed costs across less revenue.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Castaway Cay:</strong> Operating a private island exclusively for Disney guests adds cost.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Value Verdict:</strong> If price is your primary concern, Royal Caribbean wins decisively. If you value Disney theming and character experiences as worth the premium, Disney offers excellent value for what you receive.
            </p>
          </div>
        </section>

        {/* Ship Size & Capacity */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Ship Size & Capacity</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Royal Caribbean (bigger ships)</h3>
            <p className="font-inter text-slate-600">
              Royal Caribbean operates some of the world"s largest cruise ships (Icon, Wonder of the Seas, Symphony of the Seas), with 5,500-6,700+ passengers. Disney's largest ships (Dream, Wish) carry 4,000-4,500 passengers. Royal Caribbean's bigger ships mean more amenities and pools but also more crowded common areas.
"            </p>
          </div>

          <div className="space-y-4 font-inter text-slate-600">
            <div className="p-4 bg-gray-50 rounded">
              <p className="font-bold mb-2">Disney's Advantage: Intimate Experience</p>
              <p>Smaller ships create a more manageable, less overwhelming environment. Guests report feeling like they know the ship and staff by the end of their cruise. Waits are generally shorter, and the atmosphere is cozier. Many families prefer not feeling like one of thousands.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <p className="font-bold mb-2">Royal Caribbean's Advantage: More Amenities</p>
              <p>Larger ships carry more pools, theaters, restaurants, bars, and activities. There"s something happening constantly. If you want endless options and like variety, RCCL's megaships deliver. Bigger doesn't mean worse service—RCCL maintains quality across their fleet.</p>
"            </div>
          </div>
        </section>

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

        {/* Kids Programs */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Kids' Clubs & Activities</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Disney (for theme fans)</h3>
            <p className="font-inter text-slate-600">
              <strong>Disney's kids' clubs are themed and character-centric.</strong> The Oceaneers Club features Marvel, Frozen, and other Disney IP. Activities are wrapped in Disney storytelling, which appeals deeply to Disney-obsessed kids. Royal Caribbean's Adventure Ocean is excellent but generic—more traditional kids' camp activities without the Disney magic.
            </p>
          </div>

          <div className="space-y-4 font-inter text-slate-600">
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-bold mb-2">Disney Kids' Clubs:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Theme-based programming (Marvel, Frozen, Encanto, etc.)</li>
                <li>Character meet-and-greets during club activities</li>
                <li>Tie-in to daily ship entertainment</li>
                <li>More structured, supervised activities</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-bold mb-2">Royal Caribbean Adventure Ocean:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Diversified programming (sports, crafts, competitions, learning)</li>
                <li>No character interaction (not a theme park)</li>
                <li>More flexibility and open-ended activities</li>
                <li>Excellent for kids who want variety without Disney focus</li>
              </ul>
            </div>
          </div>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Disney wins for kids who love Disney characters and theming. Royal Caribbean wins for parents seeking diverse activities and kids who don't care about character interaction.
          </p>
        </section>

        {/* Dining Comparison */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Dining & Food</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Tie (Different philosophies)</h3>
            <p className="font-inter text-slate-600">
              Disney offers rotational dining (you move to a new restaurant each night with your assigned servers) while Royal Caribbean uses My Time Dining (you eat whenever/wherever you want). Both have advantages; your preference determines the winner.
            </p>
          </div>

          <div className="space-y-4 font-inter text-slate-600">
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-bold mb-2">Disney Rotational Dining:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Three different dining rooms; servers accompany you nightly</li>
                <li>Themed restaurants (Arendelle, Worlds of Marvel, etc.)</li>
                <li>Guarantees mealtimes with family (assigned dining slot)</li>
                <li>More expensive specialty restaurants (Palo, Remy, Enchante)</li>
                <li>Excellent accommodations for allergies and dietary needs</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-bold mb-2">Royal Caribbean My Time Dining:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Eat whenever you want, wherever you want (24/7)</li>
                <li>No assigned times or seats</li>
                <li>Buffets, specialty dining, quick-service all included</li>
                <li>Perfect for families with different schedules</li>
                <li>Specialty restaurants available (additional fees)</li>
              </ul>
            </div>
          </div>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Disney for families who want structure and themed experiences; Royal Caribbean for those preferring flexibility and autonomy.
          </p>
        </section>

        {/* Entertainment */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Entertainment & Shows</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Disney (quality) vs. Royal Caribbean (variety)</h3>
            <p className="font-inter text-slate-600">
              <strong>Disney:</strong> Broadway-quality original shows featuring Disney, Pixar, Marvel, and Star Wars content. Production values are exceptionally high. <strong>Royal Caribbean:</strong> Diverse shows including ice skating, acrobatics, magic, comedy, and live bands. More variety, though perhaps not as polished as Disney's offerings.
            </p>
          </div>

          <div className="space-y-4 font-inter text-slate-600">
            <div className="p-4 bg-green-50 rounded">
              <p className="font-bold mb-2">Disney Entertainment:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Original musicals (Aladdin, Cinderella, Marvel-themed shows)</li>
                <li>Character shows and meet-and-greets</li>
                <li>Disney movie nights on deck</li>
                <li>Comedy shows starring comedians</li>
                <li>Live bands and dance parties</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-bold mb-2">Royal Caribbean Entertainment:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ice skating shows (unique to RCCL)</li>
                <li>AquaTheater water-based performances</li>
                <li>Comedy, magic, magic, and specialty acts</li>
                <li>Live bands and karaoke</li>
                <li>Trivia, game shows, and audience-participation events</li>
              </ul>
            </div>
          </div>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Disney for Disney fans seeking polished, IP-focused entertainment; Royal Caribbean for variety seekers and those who enjoy unique acts like ice shows.
          </p>
        </section>

        {/* Private Islands */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Private Islands</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Tie (Both excellent, different vibes)</h3>
            <p className="font-inter text-slate-600">
              <strong>Disney:</strong> Castaway Cay is an exclusive private island with excellent beach areas, free lunch, and premium activities (parasailing, stingray encounter, waterslide, jet skis). <strong>Royal Caribbean:</strong> Perfect Day at CocoCay (exclusive to RCCL) features similar activities plus the Caribbean's only overwater bungalows and the waterpark FlowRider. Both islands are phenomenal.
            </p>
          </div>

          <div className="space-y-4 font-inter text-slate-600">
            <div className="p-4 bg-teal-50 rounded">
              <p className="font-bold mb-2">Castaway Cay (Disney):</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Free lunch included (Cookies BBQ)</li>
                <li>Three beach areas including adults-only Serenity Bay</li>
                <li>Flying Dutchman waterslide</li>
                <li>Adult-exclusive island areas</li>
                <li>Intimate, crowd-controlled experience</li>
              </ul>
            </div>

            <div className="p-4 bg-teal-50 rounded">
              <p className="font-bold mb-2">Perfect Day at CocoCay (Royal Caribbean):</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>FlowRider waterslide</li>
                <li>Overwater bungalows (premium)</li>
                <li>Larger, more developed island with restaurants</li>
                <li>Zip-lining and additional thrill activities</li>
                <li>More commercial feel, more developed infrastructure</li>
              </ul>
            </div>
          </div>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Both offer excellent private island experiences. Castaway Cay feels more exclusive and intimate; CocoCay feels more developed with additional activities.
          </p>
        </section>

        {/* Cabin Quality */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Cabin Quality & Accommodations</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Disney (slightly larger cabins)</h3>
            <p className="font-inter text-slate-600">
              <strong>Disney cabins are 10-15% larger on average than comparable Royal Caribbean cabins.</strong> Disney cabins feature split bathrooms (toilet area separated from sink/shower), which is practical for families. Royal Caribbean cabins are smaller but efficiently designed. Both cruise lines offer quality furnishings and cleanliness.
            </p>
          </div>

          <p className="font-inter text-slate-600 mb-4">
            For families of 4, Disney"s extra space makes a noticeable difference. Royal Caribbean offers studio cabins (unique among major cruise lines) for solo travelers, which Disney doesn't.
"          </p>

          <div className="p-4 bg-gray-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Verdict:</strong> Disney cabins offer more comfort for families due to size and split bathrooms. Royal Caribbean's efficiency and studio options appeal to different travelers.
            </p>
          </div>
        </section>

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

        {/* Water Features & Thrill Factor */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Water Features & Thrill Factor</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Royal Caribbean (hands down)</h3>
            <p className="font-inter text-slate-600">
              Royal Caribbean"s megaships feature water slides, FlowRiders (surfing simulators), splash pads, and aquatic attractions that Disney's ships simply don't match. If water features and thrill activities are important, Royal Caribbean delivers far more.
"            </p>
          </div>

          <p className="font-inter text-slate-600">
            <strong>Disney:</strong> AquaMouse splash areas, small water features, but no major slides or thrill attractions. <strong>Royal Caribbean:</strong> FlowRider, Typhoon Waterslides, ocean-view slide complexes, and elaborate water-play areas. Teens and thrill-seekers gravitate to Royal Caribbean.
          </p>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Royal Caribbean dominates if water attractions and thrills are priorities.
          </p>
        </section>

        {/* Included vs. Extra Costs */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Included vs. Extra Costs</h2>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Cruise Line</h3>
            <p className="font-inter text-slate-600 mb-3 font-bold">Included:</p>
            <ul className="space-y-2 font-inter text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-green-600">✓</span> All meals (dining rooms, buffets, room service)</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Entertainment and shows</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Kids' clubs</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Port adventures (depends)</li>
            </ul>

            <p className="font-inter text-slate-600 mb-3 font-bold">Extra Costs:</p>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-red-600">✕</span> Specialty dining (Palo, Remy, Enchante: $45-125)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Water sports at Castaway Cay (parasailing, jet ski: $45-140)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Adult beverages (not included)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Spa services</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Shore excursions (port-dependent)</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Royal Caribbean</h3>
            <p className="font-inter text-slate-600 mb-3 font-bold">Included:</p>
            <ul className="space-y-2 font-inter text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-green-600">✓</span> All meals (dining halls, buffets, room service)</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Entertainment and shows</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Kids' clubs</li>
              <li className="flex gap-2"><span className="text-green-600">✓</span> Most water features (FlowRider, slides)</li>
            </ul>

            <p className="font-inter text-slate-600 mb-3 font-bold">Extra Costs:</p>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-red-600">✕</span> Specialty dining (similar to Disney: $45-75)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Adult beverages (not included)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Shore excursions</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Spa, casino, fitness classes</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Enhanced beverage packages (mandatory on some ships)</li>
            </ul>
          </div>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Disney"s higher upfront cost typically includes more. Royal Caribbean's lower price means more upsells. Factor total costs, not just cruise fare.
"          </p>
        </section>

        {/* Loyalty Programs */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Loyalty Programs</h2>

          <p className="font-inter text-slate-600 mb-6">
            <strong>Disney Castaway Club:</strong> Earn tier status based on nights sailed (Silver, Gold, Platinum, Platinum Plus). Benefits include priority dining, free cabanas, onboard credits, and exclusive events.
          </p>

          <p className="font-inter text-slate-600 mb-6">
            <strong>Royal Caribbean Crown & Anchor:</strong> More complex tiering system (more tiers, harder to reach high status). Benefits include onboard credits, free specialty dining, priority boarding, and exclusive perks. RCCL's program is steeper but rewards loyal cruisers generously.
          </p>

          <p className="font-inter text-slate-600">
            <strong>Verdict:</strong> Tie. Both reward loyalty. Disney is easier to access initial benefits; RCCL offers greater rewards at higher tiers. Repeat cruisers see better value from both.
          </p>
        </section>

        {/* Itinerary Variety */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Itinerary Variety & Destinations</h2>

          <div className="mb-8 p-6 bg-amber-50 border-l-4 border-blue-600">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Winner: Royal Caribbean (far more variety)</h3>
            <p className="font-inter text-slate-600">
              <strong>Royal Caribbean sails to 240+ destinations worldwide:</strong> Mediterranean, Asia, Australia, Northern Europe, Alaska, Caribbean, and more. <strong>Disney sails primarily to Caribbean, Alaska, and occasionally transatlantic.</strong> RCCL offers far more geographic variety.
            </p>
          </div>

          <p className="font-inter text-slate-600">
            If you want to explore diverse destinations (Greece, Mediterranean, Hawaii), Royal Caribbean offers significantly more options. Disney's limited itineraries are a trade-off for their private island inclusion.
          </p>

          <p className="font-inter text-slate-600 mt-4">
            <strong>Verdict:</strong> Royal Caribbean wins decisively for destination variety. Disney wins for Caribbean and Alaska focus with private island inclusion.
          </p>
        </section>

        {/* Summary Recommendation */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">The Verdict: Which Should You Choose?</h2>

          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Choose Disney if:</h3>
              <ul className="space-y-2 font-inter text-slate-600">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> Your kids are obsessed with Disney, Pixar, or Marvel</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> You want character interaction and theming</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> You have young kids (under 10) who benefit from character experiences</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> You prefer a more intimate ship experience</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> You value Broadway-quality entertainment</li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">→</span> Budget is secondary to experience quality</li>
              </ul>
            </div>

            <div className="p-6 bg-amber-50 rounded-lg border-l-4 border-amber-600">
              <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Choose Royal Caribbean if:</h3>
              <ul className="space-y-2 font-inter text-slate-600">
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> Budget is your primary concern</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> You want maximum water slides and thrill activities</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> Your kids are older (10+) or teens who want thrills, not characters</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> You want variety in dining and entertainment options</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> You're interested in exploring diverse worldwide destinations</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> You prefer flexibility (My Time Dining)</li>
                <li className="flex gap-2"><span className="text-amber-600 font-bold">→</span> You want a bigger ship with more amenities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-12 p-8 bg-gradient-to-r from-blue-50 to-blue-900 text-white rounded-lg">
          <h2 className="font-fraunces text-3xl font-bold mb-4">Ready to Start Planning?</h2>
          <p className="font-inter text-lg mb-6">
            Explore deals and pricing for both cruise lines, use our cost calculator, and compare ships to find your perfect match.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deals"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-[#0a1628] font-inter font-bold rounded hover:bg-yellow-300 transition"
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
              Compare Ships
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="font-fraunces text-2xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/guides/best-time-to-book-disney-cruise"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Best Time to Book a Disney Cruise</h3>
              <p className="font-inter text-gray-600 text-sm">Learn pricing patterns and strategies to find the best deals on Disney cruises.</p>
            </Link>
            <Link
              href="/guides/disney-cruise-food-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Disney Cruise Food Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Explore every restaurant on Disney ships and get dining tips.</p>
            </Link>
            <Link
              href="/guides/castaway-cay-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Castaway Cay: The Ultimate Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Make the most of Disney's private island with activities and insider tips.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
