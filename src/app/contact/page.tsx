import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Anchor, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — GatGridCruises',
  description:
    'Get in touch with GatGridCruises. Email, call, or submit a concierge inquiry. We respond within 1 business day.',
  openGraph: {
    title: 'Contact Us — GatGridCruises',
    description:
      'Get in touch with GatGridCruises. Email, call, or submit a concierge inquiry.',
    url: 'https://gatgridcruises.com/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-slate-900 text-white py-16 md:py-20 border-b border-white/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="font-inter text-lg text-blue-200">
            Questions about a sailing, a quote, or anything else? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1E3A5F]/10 mb-4">
                <Mail className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-2">
                Email us
              </h2>
              <a
                href="mailto:bookings@gatgridcruises.com"
                className="text-[#1E3A5F] font-medium hover:underline"
              >
                bookings@gatgridcruises.com
              </a>
              <p className="text-sm text-slate-500 mt-2">
                For quotes, booking help, and general questions
              </p>
            </div>

            {/* Direct line */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1E3A5F]/10 mb-4">
                <MessageSquare className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-2">
                Chat with us
              </h2>
              <p className="text-[#1E3A5F] font-medium">
                AI cruise assistant 24/7
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Instant answers in the bottom-right corner
              </p>
            </div>

            {/* Concierge */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4AF37]/10 mb-4">
                <Anchor className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h2 className="font-fraunces text-xl font-bold text-slate-900 mb-2">
                Free concierge
              </h2>
              <Link
                href="/concierge"
                className="inline-flex items-center gap-1.5 text-[#1E3A5F] font-medium hover:underline"
              >
                Start a concierge request
              </Link>
              <p className="text-sm text-slate-500 mt-2">
                Personalized trip planning at no cost
              </p>
            </div>
          </div>

          {/* Response time */}
          <div className="mt-16 bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-fraunces text-lg font-bold text-slate-900">
                Response time
              </h3>
            </div>
            <p className="text-slate-600 max-w-lg mx-auto">
              Grayson personally responds to every inquiry within 1 business day. For
              urgent questions, call or text during business hours.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
