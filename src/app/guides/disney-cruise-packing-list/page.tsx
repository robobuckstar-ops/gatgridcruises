import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertCircle, Printer, MapPin } from 'lucide-react';
import { GetQuoteCTA } from '@/components/get-quote-cta';

export const metadata: Metadata = {
  title: 'The Ultimate Disney Cruise Packing List (Printable)',
  description: 'Complete Disney cruise packing list with categories for clothing, documents, toiletries, electronics, and Castaway Cay essentials. Includes pro tips and what NOT to pack.',
  openGraph: {
    title: 'The Ultimate Disney Cruise Packing List (Printable)',
    description: 'Complete Disney cruise packing list for clothing, documents, toiletries, electronics, and Castaway Cay. Includes what NOT to pack.',
    url: 'https://gatgridcruises.com/guides/disney-cruise-packing-list',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Disney Cruise Packing List (Printable)',
    description: 'Complete packing list for your Disney cruise with pro tips and what NOT to bring.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
};

export default function PackingListGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#1E3A5F]">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            The Ultimate Disney Cruise Packing List
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Never forget an essential item again. Our comprehensive, printable packing list covers everything you need for a stress-free Disney cruise vacation.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-blue-100">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Printable checklist</span>
            <span className="flex items-center gap-2"><Printer className="w-4 h-4" /> Save & organize</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> All duration cruises</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 border-b">
        <div className="max-w-4xl mx-auto text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {' > '}
          <Link href="/guides" className="text-blue-600 hover:underline">Guides</Link>
          {' > Packing List'}
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

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Introduction</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            Packing for a Disney cruise can feel overwhelming. Unlike land-based vacations where you can run to the store if you forget something, cruise ships sail away—forgetting items can leave you stuck without essentials. That's why we've created this comprehensive packing list covering everything from documents to dining attire, beach gear to cabin organization, and special items for themed nights.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed">
            This guide is designed for cruises of any length, from short 3-night voyages to extended 7+ day itineraries. We've organized items by category and included pro tips throughout to help you pack efficiently and avoid unnecessary baggage fees.
          </p>
        </section>

        {/* Documents Section */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Critical Documents (Don't Forget!)</h2>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Passport or government-issued ID</strong> — Required for Caribbean/international cruises; driver's license or passport for domestic cruises
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Cruise documents</strong> — Booking confirmation, reservation number, cruise itinerary, and pre-check-in confirmation (available in Disney Cruise Line app or via email)
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Insurance documents</strong> — Travel insurance papers (if purchased), policy numbers, and contact info
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Key to the World Card</strong> — Your onboard key card (often arrives in advance; print or save digitally)
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Vaccination records or health documentation</strong> — If required by your itinerary
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Credit card and backup payment method</strong> — For onboard charging and emergencies
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Copies of important documents</strong> — Keep digital copies (email to yourself or cloud storage) in case originals are lost
              </div>
            </div>
          </div>
        </section>

        {/* Clothing Section */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Clothing & Attire</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Casual Daywear</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> 5-7 t-shirts or casual tops (depending on cruise length)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> 3-4 pairs shorts or casual pants</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> 2-3 sundresses or casual outfits</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Light cardigan or fleece for air-conditioned ship areas</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Casual shoes/sneakers for daytime</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Comfortable walking shoes</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Flip-flops or casual sandals</li>
            </ul>
            <p className="font-inter text-gray-600 text-sm mt-4">
              <em>Pro Tip:</em> Pack neutral colors that mix and match to maximize outfit combinations and reduce overall volume.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Formal & Semi-Formal Dining</h3>
            <p className="font-inter text-slate-600 mb-4">
              Disney cruises include "dress up nights." A typical 3-4 night cruise has 1-2 such nights; longer cruises have more. Disney's dress code is flexible—you can wear business casual, cocktail attire, or full formal wear.
            </p>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> 1-2 dresses, dress shirts, or dressy outfits</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Dress shoes or nicer sandals (comfortable for several hours)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Dress pants or skirt if not bringing a full dress</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Wrap or light jacket (formal dining rooms are chilly)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Tie, cufflinks, or accessories (optional)</li>
            </ul>
            <p className="font-inter text-gray-600 text-sm mt-4">
              <em>Pro Tip:</em> Smart casual (pressed slacks/dress pants + nice top) is acceptable on most dress-up nights. You don't need a gown or tuxedo unless you want to dress up!
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Pirate Night Costume</h3>
            <p className="font-inter text-slate-600 mb-4">
              Every Disney cruise features a Pirate Night celebration. Costumes are optional but highly encouraged and add to the fun. You can bring a full costume or simple pirate-themed items.
            </p>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Pirate costume (full or DIY elements: bandana, eye patch, striped shirt, red sash)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Pirate hat (optional but fun)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Dark pants or skirt to match pirate theme</li>
            </ul>
            <p className="font-inter text-gray-600 text-sm mt-4">
              <em>Pro Tip:</em> Most guests make DIY costumes or wear simple pirate-themed items rather than full costumes. The ship is crowded; simple is often better.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Swimwear & Beach/Pool Clothing</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> 2-3 swimsuits (rotate so one can dry overnight)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Cover-up or light shirt for pool areas</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Rash guard (kids or sun-sensitive guests)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Quick-dry pants or shorts</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Water shoes (especially important for Castaway Cay)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Casual outfit for Castaway Cay exploration</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Disney Bounding (Optional)</h3>
            <p className="font-inter text-slate-600 mb-4">
              "Disney bounding" is wearing regular clothes in the colors and style of Disney characters. Many cruisers enjoy this as a fun, non-costume way to celebrate Disney. Examples: purple/black outfit as Ursula, blue/yellow as Prince Eric, etc.
            </p>
            <p className="font-inter text-gray-600 text-sm">
              <em>Pro Tip:</em> Pack 1-2 outfit combinations in Disney character colors if you enjoy bounding.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Undergarments & Accessories</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> 6-8 pairs underwear (for 5-7 days; plan for laundry access)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> 2-3 bras or equivalent</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Socks (crew socks for comfort, thin socks for shoes)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Sleepwear/pajamas</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Belt(s) to adjust clothing fit</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Hat or visor (sun protection)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Sunglasses</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Watch or no watch (some cruisers prefer watch-free relaxation)</li>
            </ul>
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

        {/* Toiletries & Personal Care */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Toiletries & Personal Care</h2>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Sun & Skincare</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>Reef-safe sunscreen</strong> (SPF 30+, critical for Castaway Cay)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Lip balm with SPF</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Aloe vera gel (sunburn relief)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Facial moisturizer</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Face wash and toner</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Any prescription acne or skincare medications</li>
            </ul>
            <p className="font-inter text-gray-600 text-sm mt-4">
              <em>Important:</em> Reef-safe sunscreen is essential for Castaway Cay. Avoid sunscreens with oxybenzone or octinoxate, which damage coral reefs.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Motion Sickness & Health</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Dramamine or motion sickness medication (if prone to seasickness)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> SeaBands or acupressure wristbands (non-medicinal alternative)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Ginger supplements or ginger candies</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Your regular medications (bring in original containers with prescriptions)</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">First Aid & General Health</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Pain relievers (ibuprofen, acetaminophen)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Antacids (Tums, Gas-X)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Anti-diarrheal medication</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Allergy medication (antihistamines)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Cold/cough medicine</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Hydrocortisone cream (rashes, bug bites)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> First aid supplies (bandages, gauze, antibiotic ointment)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Thermometer</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Hair & Grooming</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Shampoo & conditioner (travel size or full size)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Body wash or soap</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Deodorant (essential on a cruise!)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Hairbrush or comb</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Hair ties or clips</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Hair styling products (if normally used)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Toothbrush & toothpaste (often provided in cabins)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Razor & shaving cream</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Nail clippers</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-4">Women's Specific Items</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Period products (tampons, pads) — hard to find on ship</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Birth control (if applicable)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Feminine wash (optional)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Extra bras or sports bras</li>
            </ul>
          </div>
        </section>

        {/* Electronics */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Electronics & Chargers</h2>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Power & Charging</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>Power strip or surge protector</strong> (crucial—cabin outlets are limited)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Phone/device charger (USB-C, Lightning, micro-USB as needed)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Portable power bank/battery (20,000 mAh+)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Universal power adapter (if traveling internationally)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Laptop charger (if bringing a laptop)</li>
            </ul>
            <p className="font-inter text-gray-600 text-sm mt-4">
              <em>Critical Pro Tip:</em> Cabin bathrooms typically have only one outlet near the sink. A power strip is essential for charging phones, cameras, and other devices in your cabin.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-fraunces text-2xl font-bold text-slate-900 mb-3">Devices & Accessories</h3>
            <ul className="space-y-2 font-inter text-slate-600">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Mobile phone and charger cable</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Camera or action camera (optional)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> E-reader or tablet (for relaxation)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Laptop (optional; many cruisers take a break from work)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Waterproof phone case (essential for beach/pool)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Earbuds or headphones</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Portable Bluetooth speaker (for cabin use)</li>
            </ul>
          </div>
        </section>

        {/* Cabin Essentials */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Cabin & Room Organization</h2>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Magnetic hooks</strong> — Attach to cabin door or walls (no permanent damage, so valuable!)
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Over-door shoe organizer</strong> — Maximize storage in compact cabins
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Small night light or LED clip light</strong> — Helpful if you have a non-window cabin or need nighttime visibility
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Lanyard or ID holder</strong> — Attach your Key to the World card for convenient access
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Small sewing kit</strong> — Handle small wardrobe emergencies
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Plastic bags</strong> — Store wet swimsuits, dirty laundry, trash
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-50 rounded">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Small fan (if you run warm)</strong> — Cabins can feel stuffy; a portable fan helps
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

        {/* Beach & Pool Items */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Beach & Pool Essentials</h2>

          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Water shoes</strong> — Essential for Castaway Cay's rocky areas and hot sand
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Snorkel gear (optional)</strong> — Bring your own to save $12/person at Castaway Cay
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Waterproof phone case</strong> — Protect devices near water
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Beach towel (optional)</strong> — Ships provide towels, but some prefer their own
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Goggles (optional)</strong> — For snorkeling enthusiasts
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-blue-50 rounded">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Underwater camera (optional)</strong> — Capture beach memories
              </div>
            </div>
          </div>
        </section>

        {/* Kids Specific Items */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Items for Kids (If Traveling with Children)</h2>

          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Glow sticks</strong> — Fun for Pirate Night parade and evening events
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Autograph book</strong> — For collecting character signatures
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Disney-themed clothing or costumes</strong> — Many kids love wearing their favorite character outfits
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Motion sickness aids</strong> — Sea-Bands or ginger candies if kids get seasick
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Swim diapers (if needed)</strong> — Required for pools if not toilet trained
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Favorite snacks from home</strong> — Reduces onboard spending; helps picky eaters
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-purple-50 rounded">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="font-inter text-slate-600">
                <strong>Activity books or travel games</strong> — For cabin time or port days
              </div>
            </div>
          </div>
        </section>

        {/* Fish Extender Supplies */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Fish Extender (FE) Supplies (Optional)</h2>
          <p className="font-inter text-slate-600 leading-relaxed mb-4">
            The "Fish Extender" tradition involves leaving small gifts for other cruisers (both strangers and friends) in a decorated sock or container hung on your cabin door. It's a fun community activity that encourages mingling and sharing small tokens of friendship.
          </p>
          <p className="font-inter text-slate-600 leading-relaxed mb-6">
            If participating, pack small items like:
          </p>
          <ul className="space-y-2 font-inter text-slate-600 mb-6">
            <li className="flex gap-2"><span className="text-blue-600">•</span> Individually wrapped candies or chocolates</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Small soaps or hand sanitizers</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Stickers or temporary tattoos (for kids)</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Mini notepads or pens</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Hair clips or bands</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Chapstick or lip balm</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Glow sticks</li>
            <li className="flex gap-2"><span className="text-blue-600">•</span> Small snacks (non-perishable)</li>
          </ul>
          <p className="font-inter text-gray-600 text-sm">
            <em>Pro Tip:</em> Pack 10-15 items per person. The tradition creates a wonderful bonding experience with fellow cruisers.
          </p>
        </section>

        {/* What NOT to Pack */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">What NOT to Pack</h2>

          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">
            <p className="font-inter text-slate-600 font-bold mb-3">Prohibited Items:</p>
            <ul className="space-y-2 font-inter text-slate-600 text-sm">
              <li className="flex gap-2"><span className="text-red-600">✕</span> Candles or open flames</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Electrical items with auto-shutoff (curling irons, etc.)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Irons (wrinkle release spray instead)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Rice cookers, hot plates, or cooking appliances</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Weapons of any kind (including fake ones)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Illegal drugs or controlled substances</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Glass containers (bottles, jars)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Excessive alcohol (limits vary; check cruise line rules)</li>
              <li className="flex gap-2"><span className="text-red-600">✕</span> Large amounts of luggage (cabin space is limited)</li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 border-l-4 border-[#1E3A5F]">
            <p className="font-inter text-slate-600 font-bold mb-3">Not Recommended (But Not Prohibited):</p>
            <ul className="space-y-2 font-inter text-slate-600 text-sm">
              <li className="flex gap-2"><span className="text-amber-600">!</span> Excessive formal wear (one or two dressy outfits is enough)</li>
              <li className="flex gap-2"><span className="text-amber-600">!</span> Heavy winter clothing (tropical destination)</li>
              <li className="flex gap-2"><span className="text-amber-600">!</span> Huge carry-on bags (makes cabin movement difficult)</li>
              <li className="flex gap-2"><span className="text-amber-600">!</span> Expensive jewelry (risk of theft or loss)</li>
              <li className="flex gap-2"><span className="text-amber-600">!</span> Valuable electronics you can't afford to replace</li>
              <li className="flex gap-2"><span className="text-amber-600">!</span> More shoes than you can wear in one trip</li>
            </ul>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="font-fraunces text-3xl font-bold text-slate-900 mb-4">Packing Pro Tips</h2>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Roll, Don't Fold:</strong> Rolling clothes saves space and reduces wrinkles compared to folding. Use the KonMari method or packing cubes to maximize luggage space.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Wear Your Bulkiest Item:</strong> If packing a heavy jacket or boots, wear them onboard to save luggage space.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Check Your Itinerary:</strong> Know which ports you're visiting and what dress codes apply. Research weather patterns for your cruise dates.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Use Packing Cubes:</strong> Organize items by category (casual, formal, beach, etc.) in separate packing cubes for easy access and space efficiency.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Ship Your Luggage:</strong> For longer cruises, consider shipping luggage to your port destination to avoid baggage fees and excess weight.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Prepare a Day-Bag:</strong> Pack a separate small bag with essentials (medications, phone chargers, toiletries) that you'll access immediately upon embarkation before your cabin is ready.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Verify Baggage Allowance:</strong> Check your cruise line's baggage policy. Disney Cruise Line typically allows 2 standard suitcases + carry-on per person; fees apply for excess.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded">
              <p className="font-inter text-slate-600 mb-2">
                <strong>Leave Room for Souvenirs:</strong> Pack slightly lighter than your baggage limit allows to have room for purchases made onboard and at ports.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-12 p-8 bg-gradient-to-r from-blue-50 to-blue-900 text-white rounded-lg">
          <h2 className="font-fraunces text-3xl font-bold mb-4">Ready to Set Sail?</h2>
          <p className="font-inter text-lg mb-6">
            Use this packing list to prepare for your Disney cruise, then explore our other guides to plan the perfect voyage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deals"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-slate-900 font-inter font-bold rounded hover:bg-yellow-300 transition"
            >
              Find Cruise Deals
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
              <p className="font-inter text-gray-600 text-sm">Maximize your island day with activities, dining, and expert tips for Castaway Cay.</p>
            </Link>
            <Link
              href="/guides/disney-cruise-food-guide"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Disney Cruise Food Guide</h3>
              <p className="font-inter text-gray-600 text-sm">Explore every restaurant, ranking all dining options across the Disney fleet.</p>
            </Link>
            <Link
              href="/guides/best-time-to-book-disney-cruise"
              className="p-6 border border-gray-200 rounded-lg hover:border-[#1E3A5F] hover:shadow-md transition"
            >
              <h3 className="font-fraunces font-bold text-slate-900 mb-2">Best Time to Book a Disney Cruise</h3>
              <p className="font-inter text-gray-600 text-sm">Learn pricing patterns and strategies to book your cruise at the lowest possible price.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
