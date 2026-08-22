import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: 'Terms of Service — GetEasyCV',
  description: 'Read the Terms of Service that govern your use of GetEasyCV.',
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using GetEasyCV ("the Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Service.',
  },
  {
    title: '2. Eligibility',
    content: 'You must be at least 16 years old to use GetEasyCV. By using the Service, you represent that you meet this requirement.',
  },
  {
    title: '3. User Accounts',
    content: 'You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorised access. We reserve the right to terminate accounts that violate these Terms.',
  },
  {
    title: '4. Your Content',
    content: 'You retain full ownership of the resume content you create. By using the Service, you grant GetEasyCV a limited, non-exclusive licence to process and format that content solely to deliver the Service to you. We will never use your resume content for advertising or sell it to third parties.',
  },
  {
    title: '5. Acceptable Use',
    content: 'You agree not to misuse the Service. Prohibited activities include: attempting to access other users\' data, reverse-engineering the platform, using automated tools to scrape content, uploading malicious code, or using the Service for any unlawful purpose.',
  },
  {
    title: '6. Subscriptions and Billing',
    content: 'Paid plans are billed in advance on a monthly or annual basis. You can cancel at any time — your access continues until the end of the paid period. Refunds are governed by our Refund Policy.',
  },
  {
    title: '7. AI Features',
    content: 'AI-generated suggestions are provided as-is and should be reviewed before use. GetEasyCV is not responsible for the accuracy or appropriateness of AI-generated content. You are responsible for the final content of your resume.',
  },
  {
    title: '8. Intellectual Property',
    content: 'All template designs, code, branding, and platform features are owned by GetEasyCV. You may not copy, redistribute, or resell any part of the platform without written permission.',
  },
  {
    title: '9. Disclaimer of Warranties',
    content: 'The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or that resumes generated will result in employment.',
  },
  {
    title: '10. Limitation of Liability',
    content: 'To the maximum extent permitted by law, GetEasyCV shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service.',
  },
  {
    title: '11. Changes to Terms',
    content: 'We may update these Terms from time to time. Material changes will be communicated via email or in-app notice at least 14 days before taking effect. Continued use of the Service constitutes acceptance of the updated Terms.',
  },
  {
    title: '12. Governing Law',
    content: 'These Terms are governed by applicable laws. Any disputes will be resolved through binding arbitration or the courts of the applicable jurisdiction.',
  },
  {
    title: '13. Contact',
    content: 'Questions? Contact us at support@geteasycv.com or through our Contact page.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Terms of Service</h1>
            <p className="text-sm text-slate-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-5">
            <p className="text-slate-600 leading-relaxed text-sm bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              Please read these Terms of Service carefully before using GetEasyCV. These terms govern your
              access to and use of our platform, including all features, templates, and AI-assisted tools.
            </p>

            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-2 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="bg-[#FFF8F5]/70 border border-[#FF570F] rounded-2xl p-6 text-center">
              <p className="text-xs sm:text-sm text-indigo-900 font-medium">
                Have questions about these Terms?{' '}
                <Link href="/contact" className="text-[#FF570F] font-bold hover:underline">Contact our support team &rarr;</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
