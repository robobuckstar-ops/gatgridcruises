import { Metadata } from 'next';
import Link from 'next/link';
import { Utensils, Wine, ChefHat, Heart, Star } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'Disney Cruise Food Guide: Every Restaurant Ranked',
  description: 'Complete guide to every Disney cruise restaurant. Ranked reviews of rotational dining, buffets, specialty restaurants, and the best dishes to order.',
};

export default function DisneyCruiseFoodGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Disney Cruise Food Guide: Every Restaurant Ranked
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Explore every dining venue on Disney ships with honest reviews, restaurant rankings, and insider tips on best dishes to order.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-2"><Utensils className="w-4 h-4" /> All Disney ships</span>
            <span className="flex items-center gap-2"><ChefHat className="w-4 h-4" /> Full reviews</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Ranked ratings</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-b">
        <div className="max-w-4xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {' > '}
          <Link href="/guides" className="text-blue-600 hover:underline">Guides</Link>
          {' > Food Guide'}
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
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Overview: Dining on Disney Cruises</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Food is one of the highlights of a Disney cruise. The cruise line's dining program is exceptional—meals are included with your cruise, service is impeccable, and the culinary quality rivals land-based Disney parks. Every dining venue is designed with themed decor and menus that celebrate Disney magic alongside genuine culinary excellence.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            This guide reviews every restaurant across the Disney fleet, ranks them by quality, and provides insider tips on must-try dishes and the best ways to experience Disney dining.
          </p>
        </section>

        {/* Rotational Dining Explained */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Understanding Rotational Dining</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney"s rotational dining system is unique among cruise lines. Here's how it works: you're assigned to three main dining rooms, and each night of your cruise, you rotate to a different restaurant with your assigned servers. Your servers (who become familiar friends) deliver consistent, personalized service while you experience varied menus and themed decor across three different restaurants.
"          </p>

          <div className="p-6 bg-slate-50 border-l-4 border-[#1E3A5F] mb-6">
            <h3 className="font-fraunces text-xl font-bold text-slate-900 mb-3">Example 7-Night Rotation:</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li>Night 1: Enchanted Garden (dinner)</li>
              <li>Night 2: Animator's Palate (dinner)</li>
              <li>Night 3: Royal Palace or themed restaurant (dinner)</li>
              <li>Night 4: Enchanted Garden (repeat rotation)</li>
              <li>Night 5: Animator's Palate (repeat)</li>
              <li>Night 6: Royal Palace (repeat)</li>
              <li>Night 7: Optional specialty dining or last-night celebration</li>
            </ul>
          </div>

          <p className="font-inter text-slate-600">
            <strong>Key Advantage:</strong> You build relationships with your servers who memorize your preferences, dietary needs, and favorite drinks. The personal touch enhances the experience significantly.
          </p>
        </section>

        {/* Rotational Restaurants by Ship */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Rotational Dining Restaurants by Ship</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Wish</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Arendelle</p>
                <p className="font-inter text-slate-600 text-sm">Frozen-themed with Scandinavian cuisine. Elegant, upscale atmosphere. Best for: trying Nordic flavors and enjoying the gorgeous decor. Try: Arctic Char, reindeer ragout.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Worlds of Marvel</p>
                <p className="font-inter text-slate-600 text-sm">Marvel-themed restaurant with dynamic, comic-book-style decor. Interactive elements. Best for: Marvel fans and those seeking contemporary cuisine. Try: Smoked beef ribs, Black Widow cocktail presentation.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">1923</p>
                <p className="font-inter text-slate-600 text-sm">Elegant art-deco themed restaurant celebrating classic Hollywood. Sophisticated menu. Best for: Upscale dining experience and fine cuisine. Try: Duck breast, California lobster.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Treasure</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Plaza de Coco</p>
                <p className="font-inter text-slate-600 text-sm">Coco-themed with vibrant Mexican/Latin design. Colorful, celebratory atmosphere. Best for: Caribbean/Latin cuisine lovers. Try: Chile relleno, tamales, ceviche.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Worlds of Marvel</p>
                <p className="font-inter text-slate-600 text-sm">Same as Wish—Marvel-themed with dynamic decor. Best for: Action-packed atmosphere and global cuisine.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">1923</p>
                <p className="font-inter text-slate-600 text-sm">Same art-deco theme as Wish. Elegant, refined dining. Best for: Upscale experience.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Fantasy & Dream</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Animator's Palate</p>
                <p className="font-inter text-slate-600 text-sm">Animated art-themed with large digital screens that come alive during dinner. Creative, whimsical decor. Best for: Disney magic and enjoying the tech-forward environment. Try: Pan-seared scallops, short ribs.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Enchanted Garden</p>
                <p className="font-inter text-slate-600 text-sm">Lush garden-themed with multiple levels and botanical decor. Bright, uplifting atmosphere. Best for: Beautiful ambiance and diverse, approachable cuisine. Try: Lobster tail, herb-crusted lamb.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Royal Palace or Royal Court</p>
                <p className="font-inter text-slate-600 text-sm">Elegant, formal dining with regal decor inspired by Disney Princesses. Most upscale of the three. Best for: Special occasions and fine dining. Try: Filet mignon, lobster risotto.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Magic & Wonder (Older Ships)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Animator's Palate</p>
                <p className="font-inter text-slate-600 text-sm">Animated art-themed (similar to Fantasy/Dream). Creative and whimsical.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Enchanted Garden</p>
                <p className="font-inter text-slate-600 text-sm">Botanical garden theme with multiple levels.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded border-l-4 border-[#1E3A5F]">
                <p className="font-inter font-bold text-slate-900 mb-1">Goofy"s Galley or Lumiere's</p>
"                <p className="font-inter text-slate-600 text-sm">Character-themed casual dining (varies by ship).</p>
              </div>
            </div>
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

        {/* Specialty Dining */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Adult-Exclusive Specialty Dining (Upcharge)</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney offers premium dining experiences exclusively for adults (18+) with additional per-person charges. These intimate venues serve elevated cuisine and fewer covers, creating an exclusive atmosphere.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-amber-50 border-l-4 border-amber-600 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">Palo: $45 per person (all ships)</p>
              <p className="font-inter text-slate-600 mb-3">
                Italian fine-dining restaurant on all Disney ships. Elegant, intimate setting with Italian cuisine. Menu changes seasonally but always features fresh pasta, risotto, seafood, and beef preparations. Reservations essential and book early.
              </p>
              <p className="font-inter text-slate-600 text-sm"><strong>Must-Try Dishes:</strong> Handmade pappardelle, scallops, osso buco.</p>
            </div>

            <div className="p-6 bg-amber-50 border-l-4 border-amber-600 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">Remy: $125 per person (Dream & Fantasy only)</p>
              <p className="font-inter text-slate-600 mb-3">
                Ultra-premium French fine-dining experience inspired by the movie "Ratatouille." Tasting-menu only, 10-12 courses over 2+ hours. Pairs optional wines, champagnes, and spirits. The most exclusive and expensive dining Disney offers.
              </p>
              <p className="font-inter text-slate-600 text-sm"><strong>Experience:</strong> Exquisite plating, French haute cuisine, sommelier-selected wines. Book months in advance; fills up immediately.</p>
            </div>

            <div className="p-6 bg-amber-50 border-l-4 border-amber-600 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">Enchante: $125 per person (Wish only)</p>
              <p className="font-inter text-slate-600 mb-3">
                French restaurant on Disney Wish featuring contemporary French cuisine with Spanish influences. Tasting menu format. Similar in format to Remy but with a slightly less formal atmosphere.
              </p>
              <p className="font-inter text-slate-600 text-sm"><strong>Must-Try:</strong> Multi-course tasting menu experience, wine pairings.</p>
            </div>

            <div className="p-6 bg-amber-50 border-l-4 border-amber-600 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">The Rose: $125 per person (Treasure only)</p>
              <p className="font-inter text-slate-600 mb-3">
                Premium dining venue on Disney Treasure celebrating gold-age cuisine with Southern influences. Tasting menu or a la carte options available.
              </p>
              <p className="font-inter text-slate-600 text-sm"><strong>Focus:</strong> Classic, elegant cuisine with a modern twist.</p>
            </div>
          </div>
        </section>

        {/* Buffets & Quick Service */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Buffets & Quick-Service Dining</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Main Buffet</h3>
            <p className="font-inter text-slate-600 leading-relaxed mb-4">
              Each Disney ship has a main buffet (called Marceline Market on Wish/Treasure, Cabanas on older ships) offering breakfast, lunch, and dinner spreads. The buffet is included with your cruise and offers casual, self-serve dining with international cuisine selections, salads, carving stations, and desserts.
            </p>
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 text-sm">
                <strong>Pro Tip:</strong> Breakfast buffet is underrated and less crowded than lunch/dinner. Dinner buffet can be extremely crowded; consider quick-service or main dining room to avoid waits.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Quick-Service Venues</h3>
            <ul className="space-y-3 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Cabanas or Marceline (updated buffet concept):</strong> Modern, efficient buffet with shorter wait times</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Pizza & Pasta:</strong> Always available, perfect for quick meals</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Grill/BBQ Station:</strong> Burgers, hot dogs, grilled items</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Sandwich Shop:</strong> Deli sandwiches and wraps</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Smoothie/Coffee Bars:</strong> Beverages, breakfast items</li>
              <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <strong>Poolside Bars & Grills:</strong> Casual daytime dining</li>
            </ul>
          </div>
        </section>

        {/* Room Service */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Room Service (Free 24/7)</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Disney offers complimentary room service 24 hours a day, every day of your cruise. Perfect for sleeping in, avoiding crowds, or enjoying meals in your cabin. Menu includes breakfast options, sandwiches, pizzas, salads, fruit, and desserts.
          </p>

          <div className="p-4 bg-green-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Insider Tip:</strong> Pizza delivery (via room service) is excellent and free. Many guests order pizza for late-night snacks or when they want to skip crowded dining venues. Delivery is typically within 30 minutes.
            </p>
          </div>
        </section>

        {/* Bar Venues */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Bars, Lounges & Specialty Drinks</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            Disney ships feature numerous bars and lounges throughout, each with unique themes and drink specialties. Bar drinks are not included in your cruise fare; they're charged onboard (premium cocktails $15-18, beer $6-8, wine $8-15 per glass).
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-1">Signature Cocktails</p>
              <p className="font-inter text-slate-600 text-sm">Each ship features themed cocktails celebrating Disney characters and films. Examples: "Brew-Ha-Ha" (Encanto), "Iced Heiress" (Frozen-themed), "Enchanted Rose Martini." These are upscale and worth the splurge as Instagram-worthy creations.</p>
            </div>

            <div className="p-4 bg-purple-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-1">Adult Beverages</p>
              <p className="font-inter text-slate-600 text-sm">Standard bar drinks: cocktails, beer, wine, spirits. Cruise-specific favorite: Piña Colada. Onboard charges are higher than typical bars but expected for cruise pricing.</p>
            </div>

            <div className="p-4 bg-purple-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-1">Beverage Packages</p>
              <p className="font-inter text-slate-600 text-sm">Disney offers pre-purchase alcohol packages at a flat daily rate (roughly $70/day for premium, $50 for classic). These are optional; many guests skip them and just order as desired.</p>
            </div>
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

        {/* Allergies & Dietary Accommodations */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Allergies & Dietary Accommodations</h2>

          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            <strong>Disney's allergy accommodations are exemplary.</strong> The cruise line takes dietary restrictions very seriously. Inform Disney during pre-cruise paperwork of allergies (peanuts, shellfish, gluten, dairy, etc.) and the culinary team will be fully prepared when you board.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">What to Do:</p>
              <ul className="space-y-2 font-inter text-slate-600 text-sm">
                <li className="flex gap-2"><span className="text-green-600">✓</span> Declare allergies/dietary restrictions during pre-check-in</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Mention your needs to servers during dining</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Request special menus (gluten-free, vegan, kosher, etc.)</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Speak with the chef if needed (they're available)</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter text-slate-600 text-sm">
                <strong>Quality:</strong> Accommodations aren"t just \"safe\" meals—they're delicious, full-menu alternatives. Vegan, gluten-free, and allergy-friendly meals are prepared with care and taste. Disney takes pride in ensuring all guests eat well.
"              </p>
            </div>
          </div>
        </section>

        {/* Best Dishes to Order */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Must-Try Dishes & Dining Recommendations</h2>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">From Main Dining Rooms:</p>
              <ul className="list-disc list-inside font-inter text-slate-600 text-sm space-y-1">
                <li>Short ribs (offered on multiple menus)</li>
                <li>Pan-seared scallops</li>
                <li>Lobster tail</li>
                <li>Duck breast</li>
                <li>Prime rib (special dinner nights)</li>
                <li>Herb-crusted lamb</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">From Specialty Restaurants (Palo, Remy, etc.):</p>
              <ul className="list-disc list-inside font-inter text-slate-600 text-sm space-y-1">
                <li>Handmade pappardelle with truffle (Palo)</li>
                <li>Scallop risotto</li>
                <li>Osso buco (braised veal)</li>
                <li>French tasting menu (Remy & Enchante)</li>
                <li>Gold-age cuisine (The Rose)</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">From Buffets & Quick Service:</p>
              <ul className="list-disc list-inside font-inter text-slate-600 text-sm space-y-1">
                <li>Carving station (prime rib, turkey)</li>
                <li>International salads</li>
                <li>Made-to-order omelets (breakfast)</li>
                <li>Dessert offerings (cruise ship pastries are legendary)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded">
            <p className="font-inter text-slate-600">
              <strong>Pro Tip:</strong> Don't skip dessert on your first night. Disney ships have exceptional pastry chefs, and signature desserts vary nightly. Chocolate lava cake, Grand Marnier soufflé, and other decadent offerings are highlights of the cruise experience.
            </p>
          </div>
        </section>

        {/* Dining Tips */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Insider Dining Tips</h2>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">1. Build a Relationship with Your Servers</p>
              <p className="font-inter text-slate-600 text-sm">Introduce yourself on night one and mention any special occasions or preferences. Servers remember and deliver exceptional service. Tip well (20% is standard); they work hard and gratuities matter.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">2. Try New Things</p>
              <p className="font-inter text-slate-600 text-sm">The beauty of rotational dining is experiencing new cuisine each night. If you typically eat chicken, try the seafood option. Disney's preparation quality makes even unfamiliar dishes delicious.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">3. Book Specialty Dining Early</p>
              <p className="font-inter text-slate-600 text-sm">Palo, Remy, and specialty venues book up months in advance. Reserve during pre-cruise planning to secure your preferred date and time.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">4. Navigate the Menus</p>
              <p className="font-inter text-slate-600 text-sm">Menus change nightly but typically offer 3-4 entree choices plus appetizers, soups, salads, and desserts. Always read all options before deciding; hidden gems exist.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">5. Don't Skip the Buffet</p>
              <p className="font-inter text-slate-600 text-sm">While rotational dining is special, the buffet is included and excellent. Try breakfast buffet for a relaxed, crowd-free alternative to dining rooms.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">6. Use Room Service Strategically</p>
              <p className="font-inter text-slate-600 text-sm">Free room service is a perk. Order pizza late-night, request breakfast in bed on port days, or enjoy afternoon snacks. Maximize this included service.</p>
            </div>

            <div className="p-4 bg-green-50 rounded">
              <p className="font-inter font-bold text-slate-900 mb-2">7. Plan for Specialty Drinks</p>
              <p className="font-inter text-slate-600 text-sm">Signature cocktails are pricey but worth one or two during your cruise. Order one themed drink, snap a photo, and enjoy the experience guilt-free.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-12 p-8 bg-gradient-to-r from-blue-50 to-blue-900 text-white rounded-lg">
          <h2 className="font-fraunces text-3xl font-bold mb-4">Ready to Experience Disney Dining?</h2>
          <p className="font-inter text-lg mb-6">
            Explore cruise options, compare ships, and calculate your total trip cost including dining experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deals"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-slate-900 font-inter font-bold rounded hover:bg-yellow-300 transition"
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
              href="/guides/castaway-cay-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Castaway Cay: The Ultimate Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Maximize your island day including dining at Cookies BBQ and Conched Out Bar.</p>
            </Link>
            <Link
              href="/guides/disney-cruise-packing-list"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">The Ultimate Disney Cruise Packing List</h3>
              <p className="font-inter text-gray-600 text-sm">Pack everything you need for your dining experiences and special occasions.</p>
            </Link>
            <Link
              href="/guides/best-time-to-book-disney-cruise"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Best Time to Book a Disney Cruise</h3>
              <p className="font-inter text-gray-600 text-sm">Save money so you can splurge on specialty dining experiences.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
