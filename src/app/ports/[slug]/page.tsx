import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin,
  ChevronRight,
  Anchor,
  Compass,
  Utensils,
  Lightbulb,
  Calendar,
  Bus,
  Ship as ShipIcon,
  HelpCircle,
  Waves,
  Users,
  CloudSun,
} from 'lucide-react'
import {
  destinationPorts,
  getDestinationPortBySlug,
  type DestinationPort,
} from '@/data/destination-ports'
import { getSailings } from '@/lib/data'
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structured-data'
import { GetQuoteCTA } from '@/components/get-quote-cta'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return destinationPorts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const port = getDestinationPortBySlug(slug)
  if (!port) return { title: 'Port Guide Not Found' }
  const url = `https://gatgridcruises.com/ports/${port.slug}`
  return {
    title: port.metaTitle,
    description: port.metaDescription,
    keywords: port.seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: port.metaTitle,
      description: port.metaDescription,
      url,
      type: 'article',
      images: [
        {
          url: 'https://gatgridcruises.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${port.name} Disney Cruise Port Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: port.metaTitle,
      description: port.metaDescription,
      images: ['https://gatgridcruises.com/og-image.png'],
    },
  }
}

// Match itinerary day port strings to a destination port
function itineraryMatchesPort(itineraryPortName: string, port: DestinationPort): boolean {
  const lower = itineraryPortName.toLowerCase()
  switch (port.slug) {
    case 'nassau':
      return lower.includes('nassau')
    case 'castaway-cay':
      return lower.includes('castaway')
    case 'lookout-cay':
      return lower.includes('lookout') || lower.includes('lighthouse point')
    case 'cozumel':
      return lower.includes('cozumel')
    case 'grand-cayman':
      return lower.includes('grand cayman') || lower.includes('george town')
    case 'st-thomas':
      return lower.includes('st. thomas') || lower.includes('st thomas')
    default:
      return false
  }
}

function dockTypeLabel(type: DestinationPort['dockType']): string {
  if (type === 'pier') return 'Pier docking'
  if (type === 'tender') return 'Tender port'
  return 'Pier or tender (varies)'
}

export default async function DestinationPortPage({ params }: PageProps) {
  const { slug } = await params
  const port = getDestinationPortBySlug(slug)
  if (!port) notFound()

  const allSailings = getSailings()
  const sailingsAtPort = allSailings
    .filter(s =>
      s.itinerary_details?.some(day => itineraryMatchesPort(day.port, port))
    )
    .slice(0, 6)

  const otherPorts = destinationPorts.filter(p => p.slug !== port.slug).slice(0, 5)

  // JSON-LD: TouristDestination + Breadcrumbs + FAQ
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: port.name,
    description: port.metaDescription,
    url: `https://gatgridcruises.com/ports/${port.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: port.country,
    },
    touristType: ['Family', 'Cruise passengers'],
    includesAttraction: port.thingsToDo.slice(0, 6).map(a => ({
      '@type': 'TouristAttraction',
      name: a.name,
      description: a.description,
    })),
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://gatgridcruises.com' },
    { name: 'Ports', url: 'https://gatgridcruises.com/ports' },
    { name: port.shortName, url: `https://gatgridcruises.com/ports/${port.slug}` },
  ])

  const faqSchema = generateFAQSchema(
    port.faqs.map(f => ({ question: f.question, answer: f.answer }))
  )

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 py-12 sm:py-16 lg:py-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6 flex-wrap text-sm">
            <Link href="/" className="text-blue-300 hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <Link href="/ports" className="text-blue-300 hover:text-[#D4AF37] transition-colors">
              Ports
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-200">{port.shortName}</span>
          </nav>

          <div className="flex items-start gap-4 mb-5">
            <span className="text-5xl sm:text-6xl flex-shrink-0 leading-none" aria-hidden="true">
              {port.flag}
            </span>
            <div className="min-w-0">
              <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {port.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <p className="text-[#D4AF37] font-medium text-sm sm:text-base">
                  {port.country} · {port.region} · {dockTypeLabel(port.dockType)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {port.heroTagline}
          </p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {port.keyFacts.map(fact => (
              <div
                key={fact.label}
                className="text-center p-3 rounded-lg border border-slate-100 bg-slate-50/50"
              >
                <span className="text-2xl block mb-1" aria-hidden="true">
                  {fact.icon}
                </span>
                <p className="font-bold text-[#1E3A5F] text-sm leading-tight">{fact.value}</p>
                <p className="text-slate-500 text-xs mt-1">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-6">
            About {port.shortName}
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg">
            {port.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Top Things to Do */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Top Things to Do
            </h2>
          </div>
          <p className="text-slate-600 mb-8">
            The activities Disney cruise families consistently rate highest, ranked by popularity
            and quality, not by what an excursion desk wants to sell.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {port.thingsToDo.map((activity, i) => (
              <article
                key={activity.name}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#D4AF37] hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-fraunces text-xl font-bold text-[#D4AF37] flex-shrink-0 leading-none mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">
                      {activity.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="text-xs bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-full font-medium">
                        {activity.category}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {activity.duration}
                      </span>
                      <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                        {activity.cost}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{activity.description}</p>
                {activity.bestFor && (
                  <p className="mt-3 text-xs text-slate-500 italic">
                    <span className="font-semibold not-italic text-slate-700">Best for:</span>{' '}
                    {activity.bestFor}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Excursion Strategy */}
      <section className="py-12 md:py-16 bg-[#1E3A5F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Waves className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-white">
              Disney vs Independent Excursions
            </h2>
          </div>
          <p className="text-blue-100 leading-relaxed mb-8">{port.excursionGuidance}</p>

          <div className="space-y-4">
            {port.excursions.map(ex => {
              const sourceColor =
                ex.source === 'disney'
                  ? 'bg-[#D4AF37] text-[#1E3A5F]'
                  : ex.source === 'independent'
                    ? 'bg-emerald-400 text-emerald-950'
                    : 'bg-blue-300 text-blue-950'
              const sourceLabel =
                ex.source === 'disney'
                  ? 'Best via Disney'
                  : ex.source === 'independent'
                    ? 'Best independent'
                    : 'Either works'
              return (
                <div key={ex.name} className="bg-white/10 rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                      {ex.name}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${sourceColor}`}
                    >
                      {sourceLabel}
                    </span>
                  </div>
                  <p className="text-[#D4AF37] text-sm font-semibold mb-2">{ex.cost}</p>
                  <p className="text-blue-100 text-sm leading-relaxed mb-3">{ex.description}</p>
                  {ex.tip && (
                    <div className="flex items-start gap-2 bg-white/10 rounded-lg p-3 text-sm">
                      <span className="text-[#D4AF37] font-bold flex-shrink-0">Pro tip:</span>
                      <p className="text-blue-100">{ex.tip}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Where to Eat
            </h2>
          </div>
          <p className="text-slate-600 mb-8">
            Local spots and notable bites worth leaving the ship for — or that work well as a quick
            shore-side break.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {port.dining.map(d => (
              <div
                key={d.name}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{d.name}</h3>
                  <span className="text-xs bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    {d.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">📍 {d.location}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Tips + Insider Tips */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Family Tips */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#1E3A5F]">
                  Tips for Families with Kids
                </h2>
              </div>
              <p className="text-slate-600 text-sm mb-5">
                Things that make a real difference with little kids on a port day.
              </p>
              <ul className="space-y-3">
                {port.familyTips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-[#D4AF37] font-bold mt-0.5 flex-shrink-0">→</span>
                    <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insider Tips */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[#1E3A5F]">
                  Insider Tips
                </h2>
              </div>
              <p className="text-slate-600 text-sm mb-5">
                Money-saving and time-saving tricks most cruisers learn the hard way.
              </p>
              <div className="space-y-3">
                {port.insiderTips.map(tip => (
                  <div
                    key={tip.title}
                    className="bg-white rounded-lg border border-slate-200 p-4"
                  >
                    <p className="font-semibold text-slate-900 text-sm leading-snug mb-1">
                      💡 {tip.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time / Weather */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <CloudSun className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Best Time to Visit
            </h2>
          </div>
          <p className="text-slate-700 mb-6 max-w-3xl leading-relaxed">{port.bestTimeSummary}</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-[#1E3A5F] text-white">
                <tr>
                  <th className="text-left p-3 font-semibold">Months</th>
                  <th className="text-left p-3 font-semibold">Weather</th>
                  <th className="text-left p-3 font-semibold">Crowds</th>
                  <th className="text-left p-3 font-semibold hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {port.weatherWindows.map((w, i) => (
                  <tr key={w.months} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 font-semibold text-[#1E3A5F] whitespace-nowrap">
                      {w.months}
                    </td>
                    <td className="p-3 text-slate-700">{w.weather}</td>
                    <td className="p-3 text-slate-700">{w.crowds}</td>
                    <td className="p-3 text-slate-600 text-xs hidden md:table-cell">
                      {w.note ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 text-sm italic">{port.weatherSummary}</p>
        </div>
      </section>

      {/* Getting Around */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Bus className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Getting Around
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {port.gettingAround.map(g => (
              <div
                key={g.method}
                className="bg-white rounded-lg border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{g.method}</h3>
                  <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                    {g.cost}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sailings That Visit */}
      {sailingsAtPort.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-7 h-7 text-[#D4AF37]" />
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
                Disney Sailings Visiting {port.shortName}
              </h2>
            </div>
            <p className="text-slate-600 mb-6">
              Upcoming Disney Cruise Line itineraries that include {port.shortName}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sailingsAtPort.map(s => {
                const dateLabel = new Date(s.sail_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
                return (
                  <Link
                    key={s.id}
                    href={`/sailing/${s.id}`}
                    className="group block rounded-xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all p-5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors text-base leading-tight">
                        {s.itinerary_name}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap text-sm text-slate-600">
                      <span>📅 {dateLabel}</span>
                      <span>·</span>
                      <span>{s.length_nights} nights</span>
                      {s.ship?.name && (
                        <>
                          <span>·</span>
                          <span className="text-[#1E3A5F] font-medium">{s.ship.name}</span>
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            <Link
              href="/deals"
              className="inline-flex items-center gap-1.5 mt-6 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              See all current deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Ships That Visit */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <ShipIcon className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Disney Ships That Visit {port.shortName}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {port.shipsThatVisit.map(ship => (
              <Link
                key={ship.slug}
                href={`/ships/${ship.slug}`}
                className="group flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 hover:border-[#1E3A5F] hover:shadow-md transition-all"
              >
                <Anchor className="w-4 h-4 text-[#1E3A5F] flex-shrink-0" />
                <span className="font-semibold text-slate-900 group-hover:text-[#1E3A5F] transition-colors text-sm">
                  {ship.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-7 h-7 text-[#D4AF37]" />
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {port.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors">
                  <span className="font-semibold text-slate-900 text-base">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other Port Guides */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-6">
            More Port Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPorts.map(p => (
              <Link
                key={p.slug}
                href={`/ports/${p.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-[#1E3A5F] hover:shadow-md transition-all"
              >
                <span className="text-3xl flex-shrink-0" aria-hidden="true">
                  {p.flag}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors leading-tight">
                    {p.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.country}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all ml-auto flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GetQuoteCTA />
    </main>
  )
}
