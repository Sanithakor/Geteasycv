import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — GetEasyCV",
  description: "Privacy Policy for GetEasyCV.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 flex justify-center px-4 py-20">
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-8 text-slate-700 space-y-6">
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when you create an account, build a resume, or contact support. This may include your name, email address, payment information, and the professional details you include in your resumes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services. We do not sell your personal data or resume content to third parties. Your resume data is strictly used to generate your documents.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <Link href="/contact" className="text-indigo-600 hover:underline">support@geteasycv.com</Link>.</p>
            </section>
          </div>
        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
