import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Contact Us — GetEasyCV",
  description: "Get in touch with the GetEasyCV team.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-6 shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Have a question, found a bug, or want to share feedback? We&apos;d love to
            hear from you.
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-left space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Email</p>
              <a
                href="mailto:support@geteasycv.com"
                className="text-indigo-600 hover:underline text-sm"
              >
                support@geteasycv.com
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Response time</p>
              <p className="text-sm text-slate-500">We typically reply within 24 hours on business days.</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                For billing or account issues, include your registered email address so we can look
                up your account faster.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Looking for answers?{" "}
            <Link href="/#features" className="text-indigo-600 hover:underline">
              Browse our features
            </Link>{" "}
            or check our{" "}
            <Link href="/pricing" className="text-indigo-600 hover:underline">
              pricing page
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
