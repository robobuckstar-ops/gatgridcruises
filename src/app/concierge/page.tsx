import { Metadata } from 'next'
import {
  Gift,
  Bell,
  Plane,
  CheckCircle,
  MessageSquare,
  Calendar,
  Utensils,
  Anchor,
  Camera,
  Shirt,
  CloudSun,
  Users,
  ArrowRight,
  Clock,
  Sparkles,
  Mail,
  RefreshCw,
  Star,
  ShieldCheck,
  TrendingDown,
  MapPin,
} from 'lucide-react'
import { BookingInquiryButton } from '@/components/ui/booking-inquiry-button'

export const metadata: Metadata = {
  title: 'Your Personal Disney Cruise Concierge | GatGridCruises',
  description:
    'Book your Disney cruise through GatGridCruises and get a personal concierge who guides you every step — from booking to boarding and beyond. Free onboard credit included.',
}

const valueProps = [
  {
    icon: Gift,
    title: 'Free Onboard Credit',
    description:
      'You get bonus onboard credit just for booking through us — money you can spend on drinks, spa treatments, and shore excursions. Disney charges you the exact same price either way.',
  },
  {
    icon: Users,
    title: 'Personal Concierge',
    description:
      'You get a real person in your corner. We learn your travel style, your family, and your goals — then guide you through every decision so nothing falls through the cracks.',
  },
  {
    icon: Bell,
    title: 'Milestone Reminders',
    description:
      'Disney cruises have time-sensitive booking windows for excursions, dining, and activities. We track every deadline and remind you before it closes — so you never miss your shot.',
  },
  {
    icon: Plane,
    title: 'Flight Monitoring',
    description:
      'We watch your flights for price drops and schedule changes. If something happens, you hear from us first — with options — before it becomes a problem.',
  },
  {
    icon: Star,
    title: 'Expert Disney Knowledge',
    description:
      'We've sailed multiple times across multiple ships. We know what's worth booking, what to skip, which restaurants to prioritize, and how to get the most out of every port.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Extra Cost',
    description:
      'The concierge experience is completely free. Disney pays travel agents a commission — so you get our full service, your OBC bonus, and the same price you'd pay booking directly.',
  },
]

const timelineSteps = [
  {
    icon: Mail,
    label: 'Day 1',
    title: 'Welcome & Trip Setup',
    description:
      'You'll receive a personalized welcome message. We collect your travel details, confirm your OBC, and set up your concierge profile so we know exactly how to help you.',
  },
  {
    icon: Plane,
    label: 'Weeks 1–4',
    title: 'Flight Booking Guidance',
    description:
      'We help you think through flight timing, airports, and whether trip insurance makes sense for your trip. Then we monitor your flights for price changes and disruptions.',
  },
  {
    icon: MapPin,
    label: 'At Your Booking Window',
    title: 'Excursion Booking Reminder',
    description:
      'Disney opens port adventures and excursion booking based on your Castaway Club status. We'll text you the day your window opens so you can grab the best tours before they sell out.',
  },
  {
    icon: Utensils,
    label: 'At Your Dining Window',
    title: 'Dining Reservation Reminder',
    description:
      'Specialty dining opens at a set window before sailing. We remind you with a breakdown of each restaurant on your ship — what's worth booking and what's walk-in friendly.',
  },
  {
    icon: CheckCircle,
    label: '30 Days Out',
    title: 'Online Check-In Walkthrough',
    description:
      'Online check-in opens 30 days before sailing. We walk you through every screen — port arrival time selection, travel documents, credit card setup — so boarding day is effortless.',
  },
  {
    icon: Anchor,
    label: '1–2 Weeks Out',
    title: 'Packing List & Prep Tips',
    description:
      'We send your ship-specific packing list, what to wear for formal night and pirate night, weather forecasts for your ports, and tips to make the most of your first day onboard.',
  },
  {
    icon: Sparkles,
    label: 'Embarkation Day',
    title: 'Boarding Day Guide',
    description:
      'A same-morning text with your personalized boarding day game plan — when to arrive, where to go first, what to grab for lunch, and how to get the most out of your first few hours.',
  },
  {
    icon: RefreshCw,
    label: 'Post-Cruise',
    title: 'Follow-Up & Re-Booking Deals',
    description:
      'After you're home we check in on your trip and flag any Placeholder Club discounts or re-booking offers you're eligible for. Many of our clients book their next cruise from the ship.',
  },
]

const features = [
  {
    icon: Bell,
    title: 'Multi-Touch Reminders',
    description:
      'Week before, day before, day of, and follow-up texts — so every deadline gets covered without you having to remember a thing.',
  },
  {
    icon: TrendingDown,
    title: 'Flight Price Drop Alerts',
    description:
      'We monitor your flights after booking and alert you when prices drop or schedules change — with guidance on what to do.',
  },
  {
    icon: CloudSun,
    title: 'Port Weather Forecasts',
    description:
      'What to expect at each port of call so you can pack the right gear and plan your day confidently.',
  },
  {
    icon: Shirt,
    title: 'What to Wear Guides',
    description:
      'Formal night, pirate night, theme nights — we'll tell you exactly what fits in, what to pack, and how to dress your family for every occasion.',
  },
  {
    icon: Utensils,
    title: 'Ship-Specific Dining Tips',
    description:
      'Every Disney ship has different restaurants and hidden gems. We give you a curated guide based on your specific sailing.',
  },
  {
    icon: Users,
    title: 'Fish Extender Group Help',
    description:
      'Want to join or organize a Fish Extender exchange? We'll help you find the right group and get set up before you sail.',
  },
  {
    icon: Clock,
    title: 'Countdown Texts with Tips',
    description:
      'As your sail date approaches you'll get a fun countdown with a fresh tip each week — things to book, things to look forward to, things to know.',
  },
  {
    icon: Camera,
    title: 'Photopass Download Reminders',
    description:
      'Disney photos expire. We remind you to download your Photopass memories before they disappear — so you never lose those shots.',
  },
  {
    icon: Gift,
    title: 'Post-Cruise Re-Booking Deals',
    description:
      'Placeholder Club discounts and onboard booking offers have expiration dates. We track them and flag the best deals before they lapse.',
  },
]

const faqs = [
  {
    question: 'Does using your concierge cost anything extra?',
    answer:
      'Absolutely not. You pay Disney's exact same price — not a penny more. Disney pays travel agents a commission directly, which is how we cover our costs. On top of that, we negotiate onboard credit for you that you wouldn't get booking directly. So you actually come out ahead.',
  },
  {
    question: 'How do I communicate with my concierge?',
    answer:
      'However works best for you. Most of our clients prefer text messages for quick reminders and updates. We also do email for anything that needs more detail, and you can always reach us through the site. We're not a call center — you get a real person who knows your trip.',
  },
  {
    question: 'What if I already booked directly with Disney?',
    answer:
      'Good news — you can often transfer an existing Disney booking to a travel agent within 30 days of booking, and we can request the OBC on your behalf. Reach out and share your reservation details. We'll let you know if it's eligible and handle the transfer.',
  },
  {
    question: 'What is onboard credit (OBC) and how much do I get?',
    answer:
      'Onboard credit is money loaded onto your ship account that you can spend on anything — drinks, spa treatments, shore excursions, specialty dining, gift shop items. The amount depends on your sailing and stateroom category. We'll confirm your exact OBC amount once we receive your booking details.',
  },
  {
    question: 'Do you only work with Disney Cruise Line?',
    answer:
      'Our concierge service is specialized for Disney Cruise Line because that's where our expertise is deepest. Castaway Club status, the booking windows, the ships, the ports — we know the Disney experience inside and out. If you're considering other cruise lines, we're happy to share honest thoughts, but our concierge service is Disney-focused.',
  },
]

export default function ConciergePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#1E3A5F] overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <Anchor className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
              Concierge Service
            </span>
          </div>
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Personal Disney<br className="hidden sm:block" /> Cruise Concierge
          </h1>
          <p className="font-inter text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            From the moment you book to the moment you step off the ship — and beyond — we're in your
            corner every step of the way. Free onboard credit. Zero extra cost. Expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:bookings@gatgridcruises.com?subject=Disney%20Cruise%20Concierge%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#1E3A5F] font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-lg text-base"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 max-w-sm mx-auto">
            <div className="px-4 text-center">
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">Free</p>
              <p className="text-blue-300 text-xs mt-0.5">OBC Included</p>
            </div>
            <div className="px-4 text-center">
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">$0</p>
              <p className="text-blue-300 text-xs mt-0.5">Extra Cost</p>
            </div>
            <div className="px-4 text-center">
              <p className="font-fraunces text-2xl font-bold text-[#D4AF37]">1:1</p>
              <p className="text-blue-300 text-xs mt-0.5">Personalized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why GatGrid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              The Smart Way to Book
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Why Book Through GatGrid Instead of Directly?
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              Disney's price is Disney's price — you can't beat it. But you can get more out of it.
              Here's what booking through us adds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map((prop) => {
              const Icon = prop.icon
              return (
                <div
                  key={prop.title}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#1E3A5F] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h3 className="font-fraunces text-lg font-bold text-[#1E3A5F] mb-2">{prop.title}</h3>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed">{prop.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Your Journey
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              What Happens After You Book
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-xl mx-auto">
              We walk alongside you from your first day through your last. Here's exactly what to
              expect at every stage.
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[#1E3A5F]/10" />
            <div className="space-y-8">
              {timelineSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="relative flex gap-6 md:gap-8">
                    <div className="relative flex-shrink-0 w-12 md:w-16 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center shadow-md z-10">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 rounded-full px-2.5 py-0.5">
                          {step.label}
                        </span>
                        <h3 className="font-fraunces text-base font-bold text-[#1E3A5F]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="font-inter text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
              Concierge Touchpoints
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Everything Included in Your Concierge
            </h2>
            <p className="font-inter text-lg text-slate-600 max-w-2xl mx-auto">
              These aren't upsells — they're all part of the service, at no charge.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-sm font-bold text-[#1E3A5F] mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-xs text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20 bg-[#1E3A5F]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
            From Our Clients
          </p>
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-white mb-10">
            Happy Cruisers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center"
              >
                <MessageSquare className="w-8 h-8 text-[#D4AF37]/40 mb-3" />
                <p className="font-inter text-blue-200 text-sm italic text-center leading-relaxed">
                  Coming soon — hear from our happy cruisers!
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-[#D4AF37]/30 fill-[#D4AF37]/30" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 border-y border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Ready to Cruise with a Concierge?
          </h2>
          <p className="font-inter text-lg text-slate-600 mb-10 max-w-xl mx-auto">
            Reach out and we'll get your trip set up. It takes 5 minutes and costs nothing —
            and you'll have us by your side for every step of the journey.
          </p>
          <BookingInquiryButton variant="banner" />
          <p className="font-inter text-xs text-slate-400 mt-6">
            Via Boardwalk Travel Agency · Same Disney price · Free onboard credit included
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl p-6 bg-white"
              >
                <h3 className="font-fraunces text-base md:text-lg font-bold text-[#1E3A5F] mb-3 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {faq.question}
                </h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-2xl p-6 text-center">
            <p className="font-inter text-sm text-slate-600 mb-3">Still have questions?</p>
            <a
              href="mailto:grayson@gatgridcruises.com"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold text-sm hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4" />
              grayson@gatgridcruises.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
