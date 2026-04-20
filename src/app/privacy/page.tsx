import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GatGridCruises privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#1a3a5c] text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-fraunces text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4">Overview</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            GatGridCruises.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information. We are an independent informational website and are not affiliated with The Walt Disney Company or Disney Cruise Line.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Information We Collect</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Email Subscriptions:</strong> If you subscribe to our newsletter, we collect your email address and optionally your first name. This information is stored securely and used solely to send you our weekly deal digest and occasional updates.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Analytics:</strong> We use privacy-friendly analytics to understand how visitors use our site. This may include pages visited, time on site, and general geographic region. We do not track individual users across websites.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <strong>Cookies:</strong> We use essential cookies for site functionality and may use advertising cookies through Google AdSense. You can manage cookie preferences in your browser settings.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            <strong>Affiliate Clicks:</strong> When you click affiliate links (marked with disclosure badges), we log the click for aggregate reporting. We do not associate clicks with personal information.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">How We Use Your Information</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We use collected information to send requested newsletters, improve our content and tools, display relevant advertising, and monitor site performance. We never sell, rent, or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Third-Party Services</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We use the following third-party services: Supabase (database and authentication), Resend (email delivery), Google AdSense (advertising), and affiliate partners including Booking.com, Skyscanner, and Expedia (hotel and flight referrals). Each service has its own privacy policy governing their use of data.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Your Rights</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You may unsubscribe from our newsletter at any time using the link in any email. You may request deletion of your personal data by contacting us. If you are in the EU, you have additional rights under GDPR including the right to access, rectify, and port your data.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Data Security</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We implement industry-standard security measures including encrypted connections (HTTPS), secure database hosting with row-level security, and limited access to personal data. No method of transmission over the Internet is 100% secure, but we strive to protect your information.
          </p>

          <h2 className="font-fraunces text-2xl font-bold text-[#1E3A5F] mb-4 mt-10">Contact</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            For privacy-related inquiries, contact us at privacy@gatgridcruises.com or via our <Link href="/about" className="text-[#D4AF37] hover:underline">About page</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
