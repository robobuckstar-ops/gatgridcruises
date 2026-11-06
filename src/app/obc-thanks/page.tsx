import { Metadata } from 'next'
import { Download, Phone } from 'lucide-react'
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from '@/lib/constants'

// Destination of the Meta Instant Form's "Visit website" button. The lead was
// already counted on the form, so this page must never call trackLead. The root
// layout supplies the pixel PageView and the site footer disclaimers.
export const metadata: Metadata = {
  title: 'Thanks, We Got Your Request | GatGrid Cruises',
  description: 'What happens next with your onboard credit estimate request.',
  alternates: { canonical: '/obc-thanks' },
  robots: { index: false, follow: false },
}

export default function ObcThanksPage() {
  return (
    <main className="bg-slate-50 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-5 font-fraunces text-3xl font-bold text-[#1E3A5F]">
          Thanks, we got your request.
        </h1>
        <h2 className="mb-2 font-fraunces text-lg font-bold text-[#1E3A5F]">What happens next</h2>
        <p className="mb-6 font-inter text-base leading-relaxed text-slate-700">
          Grayson personally reviews it midday on weekdays and emails your onboard credit estimate,
          usually within one business day.
        </p>
        <a
          href="/downloads/disney-cruise-first-timer-guide.pdf"
          download
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-center font-bold text-[#1E3A5F]"
        >
          <Download className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          Get the free First-Timer Guide
        </a>
        <a
          href={BUSINESS_PHONE_TEL}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1E3A5F] px-5 py-3.5 font-bold text-[#1E3A5F]"
        >
          <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          Call {BUSINESS_PHONE_DISPLAY}
        </a>
      </div>
    </main>
  )
}
