
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: '25 Things to Know Before Your First Disney Cruise',
  description: 'Complete first-time Disney cruiser guide covering rotational dining, Navigator app, Pirate Night, Castaway Cay, gratuities, kids clubs, and 19 more essential tips.',
  openGraph: {
    title: '25 Things to Know Before Your First Disney Cruise',
    description: 'Complete first-time Disney cruise guide — rotational dining, Pirate Night, Castaway Cay, gratuities, kids clubs, and 19 more tips.',
    url: 'https://gatgridcruises.com/guides/first-time-disney-cruise-tips',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '25 Things to Know Before Your First Disney Cruise',
    description: 'Essential tips for first-time Disney cruisers — dining, Pirate Night, gratuities, and more.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
};

export default function FirstTimeDisneyCruiseTipsGuide() {
  const tips = [
    {
      number: 1,
      title: 'Rotational Dining Explained',
      description:
        'Your family cycles through three different main dining rooms each night, with a new set menu each evening. This isn\'t required—you can eat at the buffet or restaurants instead, but rotational dining is included and many families love the variety.',
    },
    {
      number: 2,
      title: 'Download the Disney Navigator App (In Advance)',
      description:
        'This is your cruise lifeline. Download it before sailing so you have access to the daily schedule, character times, show times, dining reservations, ship map, and messaging. You\'ll connect to ship Wi-Fi on embarkation day.',
    },
    {
      number: 3,
      title: 'Embarkation Day Strategy: Arrive at Port Time 11am',
      description:
        'Disney assigns staggered boarding windows. If you have a booking number starting with a lower number, you might board at 11am. Higher numbers board later (1pm, 3pm). Arriving early doesn\'t speed up the process—just wait for your window.',
    },
    {
      number: 4,
      title: 'What\'s Included (Everything!) vs. Extra Costs',
      description:
        'Included: meals, entertainment, onboard activities, kids clubs, use of fitness center, most beverages (non-alcoholic). Extra: alcoholic drinks, specialty dining, beverage packages, Wi-Fi, excursions, photos, spa services, room service (though basic room service is free).',
    },
    {
      number: 5,
      title: 'Gratuities (Tips) Are Automatic',
      description:
        'Disney charges $14.50/person/day (standard cabins), $16/person/day (concierge) in automatic gratuities. This is added to your account and can be adjusted at the purser\'s desk if desired. Tip about 15-20% for exceptional service.',
    },
    {
      number: 6,
      title: 'Room Service Is Free (Breakfast)',
      description:
        'Complimentary breakfast room service is available daily from 6:30am-1pm. Order from the menu delivered to your cabin—coffee, pastries, eggs, fruit, etc. Great for lazy mornings or guests wanting to sleep in while others hit the buffet.',
    },
    {
      number: 7,
      title: 'Pool Deck Gets Extremely Crowded During Formal Nights',
      description:
        'On formal/semi-formal dinner nights (usually 2-3 per cruise), guests dress up for dinner and pools empty. Hit the pools these evenings for minimal crowds and no lines for slides/activities.',
    },
    {
      number: 8,
      title: 'Oceaneer Club: Free Kids Club for Ages 3-12 (Potty Trained)',
      description:
        'Drop off kids ages 3+ (must be potty trained) at Oceaneer Club for supervised, themed activities. It\'s free and one of the best perks for parents wanting adults-only time. Space fills up quickly—register on day one.',
    },
    {
      number: 9,
      title: 'Edge Club for Pre-Teens (Ages 11-14)',
      description:
        'Similar to Oceaneer Club but for older kids with more advanced activities, games, and a cool social hub. Not as theatrical as Oceaneer but great for keeping pre-teens entertained and occupied.',
    },
    {
      number: 10,
      title: 'Vibe Club for Teens (Ages 14-17)',
      description:
        'The ultimate teen hangout with dance parties, karaoke, video games, and social activities. Many teens prefer this to hanging with family—it\'s a safe, supervised space designed specifically for their interests.',
    },
    {
      number: 11,
      title: 'Adult-Only Areas: Quiet Cove & Palo/Remy Restaurants',
      description:
        'The Quiet Cove pool (adults only) is oasis-like peaceful, perfect for adults wanting escape from kids. Premium restaurants like Palo, Remy, and Enchanted Garden are 18+ after 5:30pm, great for romantic dinner.',
    },
    {
      number: 12,
      title: 'Fish Extender (FE) Gift Exchange Tradition',
      description:
        'Many cruisers attach "fish extenders" (small fabric pouches) to their cabin door and exchange small gifts with neighbors. It\'s an optional, fun tradition. Bring small items ($2-5 value) if interested: snacks, ornaments, Disney trinkets.',
    },
    {
      number: 13,
      title: 'Cabin Door Decorating: Magnetic Decorations Only',
      description:
        'You can decorate your cabin door with magnetic decorations (no tape, adhesive, or pushpins). Many cruisers bring or buy magnetic board sets. It personalizes your space and helps you find your cabin in hallways.',
    },
    {
      number: 14,
      title: 'Main Dining Room (MDR) vs. Buffet: MDR Is Nicer',
      description:
        'The main dining room has sit-down service, multiple courses, attentive servers, and better ambiance. The buffet is faster and more casual. Both are included—choose based on your mood and time constraints each evening.',
    },
    {
      number: 15,
      title: 'Shore Excursion Booking Window: Book Early',
      description:
        'Excursions open for booking about 120 days before your cruise. Popular activities (dolphin encounters, zip-lines, all-day tours) book up fast. Check availability when booking opens and reserve immediately if interested.',
    },
    {
      number: 16,
      title: 'Onboard Credit (OBC) Deals: Watch for Promotions',
      description:
        'Some booking packages include onboard credit ($50-200+ depending on promotion). Check promotional materials and ask about OBC at booking. Use it for specialty dining, excursions, photos, or extras.',
    },
    {
      number: 17,
      title: 'Luggage Tags: Use Provided Disney Tags',
      description:
        'Disney provides official luggage tags for your checked bags during embarkation. Use these—they ensure bags get routed to your cabin. Keep tags for debarkation; they help luggage handlers know you\'re disembarking that day.',
    },
    {
      number: 18,
      title: 'Key to the World Card: Your Everything Card',
      description:
        'Upon check-in, you receive this card—your cabin key, dining reservation, ID, and payment method. Don\'t lose it. Keep it close at all times. Replacement can be rushed but is a hassle.',
    },
    {
      number: 19,
      title: 'Character Meet-and-Greets: Check Times Daily',
      description:
        'Character appearances change daily and get very crowded. Check the Navigator app first thing each morning for times and locations. Arrive early to lines to avoid waiting 30+ minutes.',
    },
    {
      number: 20,
      title: 'Pirate Night: Embrace the Theme',
      description:
        'Usually on day 3-4 of cruises, Disney throws a "Pirate Night" deck party with theming, costumes (bring/wear pirate gear or Disney gives bandanas), food, and entertainment. It\'s campy, fun, and family-friendly. Join in!',
    },
    {
      number: 21,
      title: 'Towel Animals & Chocolate: Daily Cabin Treats',
      description:
        'Your cabin steward leaves adorable towel animals and chocolates in your cabin most nights. It\'s a sweet ritual cruisers love. If you want specific animals (Mickey, characters), mention it to your steward.',
    },
    {
      number: 22,
      title: 'Turn-Down Service: Request Evening Cleaning',
      description:
        'Your steward will turn down your bed in the evening if you request it. Just leave a note on the bed or ask when you meet them. It\'s a nice luxury for a late night return to your cabin.',
    },
    {
      number: 23,
      title: 'Photography Packages: Pre-Order or Decide Onboard',
      description:
        'Professional photographers take photos throughout the cruise. You can buy prints ($25+ per image) or a digital package ($199-299 for access to all photos). Decide based on your photo interests—casual cruisers often skip this.',
    },
    {
      number: 24,
      title: 'Debarkation Strategy: Pack Night Before',
      description:
        'Pack most items the night before debarkation. Put luggage outside cabin by designated time (usually 11pm). Keep overnight items in a small bag. Morning debarkation happens early (6-8am usually)—get the kids fed and ready.',
    },
    {
      number: 25,
      title: 'Castaway Cay Strategy: Beach Time + Activities',
      description:
        'Disney\'s private island is a highlight. Arrive early for best beach spots. Activities include snorkeling, jet skis, paddleboarding, or just beach relaxation. Plan your priorities: beach time or paid excursions like snorkeling.',
    },
  ];

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
            <span className="text-slate-500 text-sm">25 First-Time Cruise Tips</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-fraunces font-bold mb-4 text-white">
            25 Things to Know Before Your First Disney Cruise
          </h1>
          <p className="text-lg text-blue-100">
            Everything a first-time cruiser needs to know, from dining options and kids clubs to Castaway Cay strategy and debarkation tips.
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
            Your Complete First-Time Disney Cruise Guide
          </h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Sailing on Disney Cruise Line for the first time can feel overwhelming with new vocabulary, ship layouts, unfamiliar dining traditions, and countless amenities. This guide covers the 25 most important things first-time cruisers should know to make your vacation smooth, enjoyable, and filled with magical moments.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Whether you're bringing kids, sailing as a couple, or joining as an extended family, these essential tips will help you navigate embarkation, daily operations, dining, entertainment, and debarkation with confidence.
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
            The Essential 25 Tips
          </h2>

          <div className="space-y-6">
            {tips.map((tip) => (
              <div
                key={tip.number}
                className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#D4AF37] text-slate-900 font-fraunces font-bold">
                      {tip.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="font-inter text-slate-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
            Dining Deep Dive: Understanding Your Options
          </h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            One of the most confusing aspects of a first Disney cruise is understanding the dining system. Here's the breakdown:
          </p>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Rotational Dining (Included)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Your assigned dining time rotates you through three different main dining rooms (typically 5:45pm or 8:15pm seating, depending on your assignment). Each night features a different menu and themed dining experience. Your server remembers your names and preferences—they become part of your cruise family. Many families cherish the servers and look forward to seeing them each night.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Buffet (Included)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Open for breakfast, lunch, and dinner. Self-serve with international cuisine options, kids favorites, dietary accommodations, and specialty stations. Great for families wanting flexibility, picky eaters, or multiple dining preferences. Less formal than the main dining room.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Specialty Restaurants (Extra Cost: $30-75/person)
            </h3>
            <p className="font-inter text-slate-600 mb-3">
              Palo (Italian), Remy (French fine dining), and Enchanted Garden (vegetable-forward). These elevated restaurants require reservations and charge per person. Most families enjoy one specialty dinner as a special experience—ideal for anniversaries or celebrating milestones.
            </p>
          </div>

          <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg mb-6">
            <h3 className="text-xl font-fraunces font-bold text-slate-900 mb-4">
              Quick Service Venues (Free)
            </h3>
            <p className="font-inter text-slate-600">
              Buffet alternatives, pizza, hot dogs, sandwiches, and casual eats. Perfect for when you're busy with activities and don't want to sit down for a full meal. No reservations needed.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Kids Clubs: The Parents' Secret Weapon
          </h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney's kids clubs are exceptional. Many parents cite kids club access as the best part of cruising—it gives adults guilt-free time away while kids have a blast. Here's what you need to know:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Oceaneer Club (Ages 3-12, Potty Trained)
              </h3>
              <p className="font-inter text-slate-600 mb-3">
                Free, themed clubhouse with activities, games, story time, character interactions, and crafts throughout the day. Most kids LOVE it and don't want to leave. Register on embarkation day—spaces fill up quickly. Hours typically 9am-midnight with flexible drop-off/pickup.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Nursery (Ages 6 months-3 years, Not Potty Trained)
              </h3>
              <p className="font-inter text-slate-600 mb-3">
                Supervised care in a toddler-friendly environment. Costs $9/hour with a 2-hour minimum. Perfect for naps or evening parent time. Register in advance; it does fill up, especially during evening dinner times.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Edge Club (Ages 11-14)
              </h3>
              <p className="font-inter text-slate-600 mb-3">
                Cool hangout for pre-teens with video games, movies, pizza, and social activities. Less theatrical than Oceaneer Club, more age-appropriate for older kids. Many tweens love hanging here more than with family.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Vibe Club (Ages 14-17)
              </h3>
              <p className="font-inter text-slate-600">
                Ultimate teen social hub with dance parties, karaoke, video games, and a fun vibe designed just for teenagers. Many cruise-loving teens consider this the highlight. Sign them up and let them socialize!
              </p>
            </div>
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
            Castaway Cay Strategy: Maximizing Disney's Private Island
          </h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Castaway Cay is Disney's private island and the emotional highlight of most cruises. Here's how to make the most of it:
          </p>

          <ul className="font-inter text-slate-600 space-y-4">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Arrive early to the island:</strong> Get off the ship first thing to secure good beach spots near the water before crowds arrive. Early bird gets the best loungers.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Plan your day in advance:</strong> Decide if you want beach time, paid activities (snorkeling, jet skis, paddleboarding), or exploring. Know your priorities before going ashore.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Adults-only Serenity Bay:</strong> On the island's other side is Serenity Bay, adults-only beach area. Perfect for parents wanting quiet time or couples seeking romance.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Bring your Key to the World card:</strong> You'll need it for food/beverage charges on the island. Lunch is included, but alcoholic drinks, specialty snacks, and paid activities cost extra.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Pack reef-safe sunscreen:</strong> The island's coral reefs need protection. Bring reef-safe (no oxybenzone or octinoxate) sunscreen to avoid damaging marine life.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <strong>Water shoes for reef/snorkeling:</strong> If snorkeling, water shoes protect your feet. Reef is beautiful but can be rocky.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-fraunces font-bold text-slate-900 mb-6">
            Pro Tips for a Smoother Cruise Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Tech Prep
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Download Navigator app before sailing</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Enable Wi-Fi alerts on your phone</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Bring portable chargers</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Packing Smarts
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Bring magnetic decorations</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Pack small gift exchange items</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Bring sunscreen and medications</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Dining Tips
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Request dietary accommodations early</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Meet your dining server on day one</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Book specialty dining early</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#1E3A5F] p-6 rounded-lg">
              <h3 className="text-lg font-fraunces font-bold text-slate-900 mb-3">
                Onboard Culture
              </h3>
              <ul className="font-inter text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Dress up for formal nights</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Participate in ship activities</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Embrace Pirate Night with enthusiasm</span>
                </li>
              </ul>
            </div>
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
            Common First-Timer Mistakes to Avoid
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <Lightbulb size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong className="text-red-700">Not registering kids clubs on embarkation day:</strong> Spaces fill up quickly, especially evening nursery slots. Register immediately when you board.
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <Lightbulb size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong className="text-red-700">Losing your Key to the World card:</strong> Bring a backup ID. Replacing your card is a hassle. Keep your card close at all times.
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <Lightbulb size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong className="text-red-700">Skipping the Navigator app:</strong> This is your cruise guide. It's essential for shows, character times, activities, and navigation.
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <Lightbulb size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong className="text-red-700">Overpacking luggage:</strong> Cabins are compact. Pack smart and bring a carry-on with day items.
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <Lightbulb size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong className="text-red-700">Missing embarkation day orientation or leaving to explore port immediately:</strong> Take time to understand ship layout and your cabin before venturing off ship.
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] p-8 rounded-lg mb-12 text-white">
          <h2 className="text-2xl font-fraunces font-bold mb-4">Ready to Start Planning?</h2>
          <p className="font-inter mb-6">
            Now that you're armed with essential tips, start planning! Use our guides to choose your port, stateroom category, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/deals" className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition">
              Browse Deals <ArrowRight size={20} />
            </Link>
            <Link href="/tools/cost-calculator" className="inline-flex items-center justify-center gap-2 border-2 border-[#1E3A5F] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#1E3A5F] hover:text-slate-900 transition">
              Calculate Your Cost <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Related Guides */}
        <section className="border-t-2 border-gray-200 pt-12">
          <h2 className="text-2xl font-fraunces font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/disney-cruise-with-toddlers" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  Disney Cruise with Toddlers
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Complete guide for families traveling with young children.
                </p>
              </div>
            </Link>
            <Link href="/guides/best-disney-cruise-staterooms" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  Best Disney Cruise Staterooms
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Category-by-category cabin guide to find your perfect room.
                </p>
              </div>
            </Link>
            <Link href="/guides/port-canaveral-vs-miami" className="group">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition">
                <h3 className="font-fraunces font-bold text-slate-900 mb-2 group-hover:text-blue-600">
                  Port Canaveral vs. Miami
                </h3>
                <p className="font-inter text-gray-600 text-sm">
                  Compare Disney cruise ports to choose the best departure point.
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
