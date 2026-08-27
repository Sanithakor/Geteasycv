import React from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Cookie, Shield, CheckCircle2, Info, Lock } from "lucide-react";

export const metadata = {
  title: "Cookie Policy - GetEasyCV",
  description: "Learn how GetEasyCV uses cookies and similar tracking technologies to improve your resume building experience.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Privacy & Transparency"
          badgeIcon={Cookie}
          breadcrumbs={[{ label: "Cookie Policy", href: "/cookie-policy" }]}
          title="GetEasyCV"
          highlightText="Cookie Policy"
          description="Learn how GetEasyCV uses cookies and similar technologies to remember your preferences and ensure smooth resume building."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Contact Privacy Team",
            href: "/contact",
          }}
          features={[
            "Essential Session Cookies",
            "Customizable Preferences",
            "Zero Third-Party Ad Trackers",
          ]}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Content Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed text-xs sm:text-sm font-normal">
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#F3645C]" />
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners useful analytics information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F3645C]" />
                2. How We Use Cookies
              </h2>
              <p>
                GetEasyCV uses cookies to ensure that our application functions properly, to keep your user session authenticated, to save your preferences in the resume editor, and to analyze website traffic.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
                    Essential Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Required for basic site functionality, user login authentication, and secure session management.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F3645C]" />
                    Preference Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Remember your active template settings, theme colors, font selections, and language preferences.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F0F0F]" />
                    Analytics Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Help us measure website traffic, understand popular templates, and continuously improve user experience.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F5D17B]" />
                    Security Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Used to detect unauthorized access attempts, rate limiting, and protect user data integrity.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#F3645C]" />
                3. Managing Your Cookie Preferences
              </h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that disabling essential cookies may affect the functionality of the Resume Builder and account features.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Contact Privacy Team</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                If you have any questions regarding our Cookie Policy or data processing, please contact us at{" "}
                <a href="mailto:privacy@geteasycv.com" className="text-[#F3645C] font-semibold hover:underline">
                  privacy@geteasycv.com
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F0F0F] hover:underline"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
