import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy',
  description:
    'The GatGridCruises privacy policy — what we collect, analytics and advertising cookies (Google, Meta), AI-assisted emails, SMS terms, and your rights over your data.',
  openGraph: {
    type: 'website',
    title: 'Privacy Policy — GatGridCruises',
    description:
      'What information GatGridCruises collects, how we use and protect it, which cookies we set, and the rights you have over your data.',
    url: 'https://gatgridcruises.com/privacy',
    siteName: 'GatGridCruises',
    images: [{ url: 'https://gatgridcruises.com/og-image.png', width: 1200, height: 630, alt: 'GatGridCruises' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — GatGridCruises',
    description: 'What we collect, how we use it, and the rights you have over your data.',
    images: ['https://gatgridcruises.com/og-image.png'],
  },
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#1a3a5c] text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: November 6, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4">Overview</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            GatGridCruises.com (&quot;GatGrid Cruises,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is operated by GatGrid Financial LC. This policy explains what information we collect, how we use and share it, and the choices you have. We are an independent website and are not affiliated with, endorsed by, or sponsored by The Walt Disney Company or Disney Cruise Line.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Information We Collect</h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Quote, inquiry, and transfer forms:</strong> When you request a quote, ask about a sailing, or ask to transfer a booking, we collect what you enter. Depending on the form, that can include your name, email address, mobile phone number, travel dates, number of guests, ship, stateroom, destination and budget preferences, reservation number, original booking date, referral code, your notes, and your SMS consent choice. We also record the page or campaign that brought you to the form.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Email subscriptions and guides:</strong> If you subscribe to our newsletter or request a free guide, we collect your email address and, optionally, your first name.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Analytics and advertising data:</strong> When you visit, the tools listed below collect information such as pages viewed, buttons clicked, forms submitted, device and browser type, IP address, approximate location, and identifiers stored in cookies or similar technologies.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            <strong>Affiliate clicks:</strong> When you click an affiliate link (marked with a disclosure), we log the click for aggregate reporting.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Analytics, Advertising, and Cookies</h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We use cookies, pixels, and similar technologies, including ones set by third parties. These tools can recognize your browser across websites and over time, and can be used to show you GatGrid Cruises ads on other sites and apps:
          </p>

          <ul className="list-disc pl-6 text-gray-600 mb-4 leading-relaxed space-y-2">
            <li><strong>Google Analytics 4</strong> (measurement ID G-434T744BN1) measures how visitors use the site.</li>
            <li><strong>Google Ads conversion tracking and remarketing</strong> (AW-18395230133) measures which ads lead to inquiries and can show our ads to people who visited the site.</li>
            <li><strong>Meta Pixel</strong> (Facebook and Instagram) records page views and submitted lead forms so we can measure our ads, build advertising audiences, and show ads to people who visited the site.</li>
            <li><strong>Google AdSense and affiliate partner scripts</strong> may set cookies to display advertising and to attribute referrals to travel partners.</li>
            <li><strong>Our own cookies</strong> remember referral codes and campaign details for 30 days and keep features such as sign-in working.</li>
          </ul>

          <p className="text-gray-600 mb-6 leading-relaxed">
            You can block or delete cookies in your browser settings. You can also opt out of personalized ads through <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">Google Ads Settings</a>, install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">Google Analytics opt-out add-on</a>, or adjust your <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">Facebook ad preferences</a>. Blocking some cookies may affect how parts of the site work.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">How We Use Your Information</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We use your information to respond to your requests, research sailings, prepare quotes and follow-ups, provide trip support, send newsletters and messages you asked for, measure and improve the site, and run and measure our advertising.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">AI-Assisted Emails</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Personalized follow-up emails may be prepared by an AI assistant using the details you submit and our sailing information, and are reviewed by a person. Automatic emails sent right after you submit a form are identified as AI-prepared, and a person reviews your request and follows up afterward. Information you submit may be processed by an AI service provider to prepare these messages. The chat assistant on our site is also powered by an AI service provider.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">SMS Text Messaging</h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Consent:</strong> You can opt in to text messages by entering your mobile number and checking the SMS consent box on one of our forms. By opting in, you agree to receive recurring automated text messages from GatGrid Cruises about your cruise, including price-drop and deal alerts, quote and booking updates, and trip-preparation reminders. Consent is not a condition of purchase.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Message frequency:</strong> Message frequency varies, typically 2 to 6 messages per month.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Costs:</strong> Msg &amp; data rates may apply.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Opt out and help:</strong> Reply STOP to any message to stop receiving texts. Reply HELP for help, or contact us at bookings@gatgridcruises.com or (405) 526-4956. Carriers are not liable for delayed or undelivered messages.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            <strong>Your mobile information:</strong> We do not sell mobile numbers or SMS consent, and we do not share them with third parties or affiliates for their marketing or promotional purposes. Text messaging opt-in data and consent are not shared with any third party, except with service providers such as our messaging platform as needed to deliver messages to you.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">How We Share Information</h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            We do not sell your name, email address, or phone number to data brokers or other companies. We share information only as follows:
          </p>

          <ul className="list-disc pl-6 text-gray-600 mb-6 leading-relaxed space-y-2">
            <li><strong>Advertising and analytics partners:</strong> Google and Meta receive the data described above through the tools on our site. Depending on where you live, this kind of sharing for targeted advertising may be considered a &quot;sale&quot; or &quot;sharing&quot; under state privacy law.</li>
            <li><strong>Service providers:</strong> companies that run parts of our service, including Vercel (hosting), Supabase (database and authentication), Airtable (customer records), Resend and Brevo (email), Twilio (text messages), Pushover (internal staff alerts), and our AI service provider.</li>
            <li><strong>Travel partners:</strong> if you move forward with a booking, Boardwalk Travel Agency and Disney Cruise Line receive what is needed to make and manage it. Affiliate partners including Booking.com, Skyscanner, and Expedia receive referral information when you click through to them.</li>
            <li><strong>Legal and safety reasons:</strong> when required by law, or to protect our rights, our customers, or others.</li>
          </ul>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Your Rights</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            You may unsubscribe from marketing emails at any time using the link in the email, and opt out of text messages by replying STOP. You may ask us to access, correct, or delete your personal information, or to opt you out of targeted advertising, by contacting us. Depending on where you live, including California, other U.S. states, and the EU, you may have additional rights under applicable privacy law.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Children</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Our site is meant for adults planning travel. We do not knowingly collect personal information directly from children under 13. If you share details about children traveling with you, we use them only to plan your trip.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Data Security</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We use security measures including encrypted connections (HTTPS), access-controlled hosted databases, and limited access to personal data. No method of transmission over the Internet is 100% secure, but we strive to protect your information.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Changes to This Policy</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We may update this policy from time to time. The date at the top of this page shows when it last changed.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Contact</h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            For privacy-related inquiries, contact us at bookings@gatgridcruises.com, call or text (405) 526-4956, or visit our <Link href="/about" className="text-[#D4AF37] hover:underline">About page</Link>.
          </p>
        </div>
        </div>
      </section>
    </main>
  )
}
