import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "About Us — GetEasyCV",
  description: "Learn more about GetEasyCV and our mission to help you build the perfect resume.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-6 shadow-lg shadow-indigo-200">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">About GetEasyCV</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our mission is to help job seekers land their dream jobs by providing the easiest, most powerful resume builder on the web.
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-left space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Our Story</h2>
            <p className="text-slate-600 leading-relaxed">
              We started GetEasyCV because we realized how difficult and time-consuming it is to craft a professional, ATS-friendly resume using traditional word processors. The formatting breaks, the designs are outdated, and the process is frustrating.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We built this platform to take the pain out of resume creation. With GetEasyCV, you can focus on your content while our engine handles the complex layout, typography, and export formats.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 mt-8">Why Choose Us?</h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>20+ Professional, ATS-friendly templates</li>
              <li>Real-time, pixel-perfect preview</li>
              <li>Drag and drop section reordering</li>
              <li>Export to high-quality PDF, PNG, or JPG</li>
              <li>100% data privacy and security</li>
            </ul>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Ready to get started?{" "}
            <Link href="/builder" className="text-indigo-600 hover:underline font-semibold">
              Build your resume now
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
