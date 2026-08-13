import Navigation from "@/components/Navigation";
import HowItWorks from "@/components/sections/HowItWorks";
import ResumeBuilderFeatures from "@/components/sections/ResumeBuilderFeatures";
import ResumeCategories from "@/components/sections/ResumeCategories";
import BlogSection from "@/components/sections/BlogSection";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import { layouts } from "@/data/layouts";
import { themes } from "@/data/themes";
import templates from "@/data/templates.json";

// Real counts from the data layer
const TEMPLATE_COUNT = templates.length;
const LAYOUT_COUNT = layouts.length;
const THEME_COUNT = themes.length;

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Explore templates and build your first resume.",
    features: ["3 resumes", "5 templates", "PDF export", "Basic sections", "Community support"],
    cta: "Get Started",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: 9,
    period: "month",
    description: "Export polished resumes for active applications.",
    features: [
      "Unlimited resumes",
      "All templates",
      "PDF & DOCX export",
      "All sections",
      "AI suggestions",
      "Custom colors & fonts",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlight: true,
  },
  {
    name: "Premium",
    price: 19,
    period: "month",
    description: "Advanced customization for serious job searches.",
    features: [
      "Everything in Pro",
      "Cover letter builder",
      "Portfolio builder",
      "Custom domain",
      "Team collaboration",
      "API access",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=premium",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Software Engineer",
    company: "Hired at Stripe",
    quote:
      "I landed 3 interviews in my first week using GetEasyCV. The ATS-friendly templates made all the difference.",
    avatar: "SK",
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "James R.",
    role: "Product Manager",
    company: "Hired at Notion",
    quote:
      "The live editor is incredibly smooth. I had a polished resume ready in under 20 minutes.",
    avatar: "JR",
    color: "from-violet-500 to-green-500",
  },
  {
    name: "Priya M.",
    role: "UX Designer",
    company: "Hired at Figma",
    quote:
      "Finally a resume builder that actually looks good. The themes are beautiful and the export is pixel-perfect.",
    avatar: "PM",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full shadow-md mb-5 animate-fadeIn">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-gray-700">
                  {TEMPLATE_COUNT} Professional Templates Available
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4 leading-tight sm:text-4xl lg:text-5xl">
                Build Your Dream Resume in{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>

              <p className="text-base text-gray-600 mb-7 max-w-xl mx-auto leading-relaxed sm:text-lg">
                Create professional, ATS-friendly resumes with our powerful
                builder. Choose from {TEMPLATE_COUNT} templates, customise
                everything, and land your dream job.
              </p>

              <div className="flex flex-col gap-3 justify-center mb-10 sm:flex-row">
                <Link
                  href="/templates"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 transform text-center text-sm"
                >
                  Browse Templates
                </Link>
                <Link
                  href="/editor"
                  className="px-6 py-3 bg-white text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-all shadow-md border border-gray-200 text-center text-sm"
                >
                  Start Building
                </Link>
              </div>

              {/* Stats — real counts from data layer */}
              <div className="flex flex-wrap justify-center gap-5 text-center sm:gap-7">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{TEMPLATE_COUNT}</div>
                  <div className="text-xs text-gray-600">Templates</div>
                </div>
                <div className="hidden w-px h-10 bg-gray-200 sm:block"></div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{LAYOUT_COUNT}</div>
                  <div className="text-xs text-gray-600">Layouts</div>
                </div>
                <div className="hidden w-px h-10 bg-gray-200 sm:block"></div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{THEME_COUNT}</div>
                  <div className="text-xs text-gray-600">Themes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>

        {/* ── Resume Categories Section ─────────────────────────────── */}
        <ResumeCategories />

        {/* ── How It Works Section ───────────────────────────────────── */}
        <HowItWorks />

        {/* ── Reference Resume Builder Features ────────────────────────── */}
        <ResumeBuilderFeatures />

        {/* ── Features ─────────────────────────────────────────────── */}
        <section id="features" className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3 sm:text-3xl">
                Why Choose Our Resume Builder?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Everything you need to create a professional resume
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="p-6 rounded-md bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2">{TEMPLATE_COUNT} Templates</h3>
                <p className="text-gray-600 text-sm">
                  Choose from a collection of professional, ATS-friendly
                  templates designed by experts.
                </p>
              </div>

              <div className="p-6 rounded-md bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2">Live Editing</h3>
                <p className="text-gray-600 text-sm">
                  See your changes in real-time with our powerful live preview
                  editor.
                </p>
              </div>

              <div className="p-6 rounded-md bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-red-600 rounded-md flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2">Full Customisation</h3>
                <p className="text-gray-600 text-sm">
                  Customise colors, fonts, layouts, and every detail to match
                  your style — {LAYOUT_COUNT} layouts and {THEME_COUNT} themes
                  to choose from.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3 sm:text-3xl">Loved by Job Seekers</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Real stories from people who landed interviews
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-md p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                      <p className="text-xs font-medium text-indigo-600">{t.company}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex gap-1 mt-auto">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────── */}
        <section id="pricing" className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <h2 className="text-2xl font-bold mb-3 sm:text-3xl">Simple, Transparent Pricing</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Start for free. Upgrade when you need more power. No hidden fees.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-md border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    plan.highlight
                      ? "border-indigo-500 shadow-md shadow-indigo-500/20"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                      <div className="text-center py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold">
                        Most Popular
                      </div>
                    </>
                  )}

                  <div
                    className={`p-6 ${
                      plan.highlight
                        ? "bg-gradient-to-br from-indigo-50 to-white"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price === 0 ? "Free" : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400 text-sm">/{plan.period}</span>
                      )}
                    </div>
                    <Link
                      href={plan.href}
                      className={`block w-full text-center py-2.5 rounded-md font-semibold text-sm transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
                          : "border-2 border-gray-200 hover:border-indigo-400 text-gray-900 hover:bg-indigo-50"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>

                  <div className="px-6 pb-6 space-y-2.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest Articles & Blog Section ──────────────────────────── */}
        <BlogSection />

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <ReadyToBuild />
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
