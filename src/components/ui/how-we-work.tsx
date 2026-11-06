/**
 * The "How we work" expectations block shown next to the lead forms on
 * /free-guide, /transfer and /book. Approved copy: change it only on request.
 */
export function HowWeWork({ className = '' }: { className?: string }) {
  return (
    <section
      aria-labelledby="how-we-work-heading"
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8 ${className}`}
    >
      <h2 id="how-we-work-heading" className="mb-4 font-fraunces text-2xl font-bold text-[#1E3A5F]">
        How we work
      </h2>
      <div className="space-y-4 font-inter text-sm leading-relaxed text-slate-700 sm:text-base">
        <p>
          We give our clients some of the most generous onboard credit around, and we donate 5% of
          our commission to CURE.org to fund surgeries for kids in need. To keep doing both, you talk
          to Grayson, not a call center. Grayson personally reviews requests midday on weekdays, and
          sometimes on weekends (not often — that&apos;s family time), so a reply may take a little
          while. You&apos;ll hear from Grayson within 1
          business day.
        </p>
        <p>
          <strong className="text-[#1E3A5F]">What you get while you wait:</strong> the moment you
          submit, our AI assistant starts researching your sailing and emails you the details —
          ship, dates, stateroom options, and your estimated onboard credit. Grayson then reviews
          everything and follows up personally with the best deal and plan he can find.
        </p>
        <p>
          <strong className="text-[#1E3A5F]">Already have a quote?</strong> Send it to us —
          we&apos;ll match or beat the onboard credit, or tell you honestly to take it.
        </p>
        <p>
          <strong className="text-[#1E3A5F]">Our promise:</strong> the best onboard credit and
          vacation planning we can possibly offer. It&apos;s worth the short wait — before you
          book anywhere else, give us a chance to beat it.
        </p>
      </div>
    </section>
  )
}
