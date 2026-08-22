import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: 'Privacy Policy — GetEasyCV',
  description: 'Learn how GetEasyCV collects, uses, and protects your personal information.',
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: [
      'Account information you provide when registering: name, email address, and password.',
      'Resume content you create: professional details, work history, education, and skills.',
      'Payment information processed securely by our payment provider (we never store raw card data).',
      'Usage data: pages visited, features used, and device/browser information for analytics.',
      'Communications: messages you send to our support team.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To provide, maintain, and improve the GetEasyCV service.',
      'To generate and format your resume documents.',
      'To process payments and send billing confirmations.',
      'To respond to your support requests.',
      'To send product updates and feature announcements (you can opt out at any time).',
      'We do not sell your personal data or resume content to any third party.',
    ],
  },
  {
    title: '3. Data Storage and Security',
    content: [
      'Your data is stored on secure servers with encryption at rest and in transit (TLS).',
      'Resume data is private by default — only you can access it unless you share a link.',
      'We implement technical and organisational controls to prevent unauthorised access.',
      'We retain your data for as long as your account is active, or as required by law.',
    ],
  },
  {
    title: '4. Cookies and Tracking',
    content: [
      'We use essential cookies to maintain your login session.',
      'We use analytics cookies to understand how the product is used and improve it.',
      'You can disable non-essential cookies in your browser settings.',
      'We do not use advertising or third-party tracking cookies.',
    ],
  },
  {
    title: '5. Third-Party Services',
    content: [
      'Payment processing is handled by our payment provider. Their privacy policies apply to payment data.',
      'AI content suggestions are processed securely via encrypted AI endpoints.',
      'Analytics are processed in an aggregated, anonymised form.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'Access: request a copy of the personal data we hold about you.',
      'Correction: ask us to fix inaccurate data.',
      'Deletion: request deletion of your account and associated data.',
      'Export: download your resume data at any time from your dashboard.',
      'Opt-out: unsubscribe from marketing emails via the link in any email.',
    ],
  },
  {
    title: '7. Changes to This Policy',
    content: [
      'We may update this policy from time to time. Material changes will be communicated by email or an in-app notice.',
      'The date at the top of this page always reflects the most recent revision.',
    ],
  },
  {
    title: '8. Contact Us',
    content: [
      'Questions about this policy or how we handle your data? Reach us at support@geteasycv.com.',
    ],
    links: [{ text: 'Contact our support team', href: '/contact' }],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-slate-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed text-sm bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              GetEasyCV is committed to protecting your privacy. This policy explains what information we collect,
              how we use it, and what choices you have. By using GetEasyCV, you agree to the practices described here.
            </p>

            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF570F] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {section.links?.map((l) => (
                  <Link key={l.href} href={l.href} className="text-xs font-bold text-[#FF570F] hover:underline block mt-2">
                    {l.text} {'→'}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
