import React from "react";
import Navigation from "@/components/Navigation";
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
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Badge & Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Cookie className="w-4 h-4 text-purple-600" />
              <span>PRIVACY & TRANSPARENCY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Cookie Policy
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Last updated: July 28, 2026. This policy explains how GetEasyCV uses cookies and similar technologies when you visit our website.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-md border border-slate-200/80 shadow-xs p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners useful analytics information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                2. How We Use Cookies
              </h2>
              <p>
                GetEasyCV uses cookies to ensure that our application functions properly, to keep your user session authenticated, to save your preferences in the resume editor, and to analyze website traffic.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Essential Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Required for basic site functionality, user login authentication, and secure session management.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    Preference Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Remember your active template settings, theme colors, font selections, and language preferences.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Analytics Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Help us measure website traffic, understand popular templates, and continuously improve user experience.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    Security Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Used to detect unauthorized access attempts, rate limiting, and protect user data integrity.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
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
                <a href="mailto:privacy@geteasycv.com" className="text-purple-600 font-semibold hover:underline">
                  privacy@geteasycv.com
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800"
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
