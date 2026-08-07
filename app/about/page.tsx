import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Sparkles, Target, Users, Award, Zap, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us — GetEasyCV',
  description: 'Learn about GetEasyCV and our mission to help every job seeker build a standout, ATS-ready resume.',
};

const STATS = [
  { value: '200+', label: 'Templates' },
  { value: '50K+', label: 'Resumes Built' },
  { value: '95%', label: 'ATS Pass Rate' },
  { value: '24h', label: 'Support Response' },
];

const VALUES = [
  { icon: Target, title: 'Mission-Driven', desc: 'We exist to make professional resume creation accessible to everyone, not just those who can afford a recruiter.' },
  { icon: Zap, title: 'AI-Powered', desc: 'Our AI field assistant helps you write compelling, impactful content tailored to the role you are applying for.' },
  { icon: Users, title: 'User-First', desc: 'Every design decision starts with the job seeker. No dark patterns, no lock-in, no confusing interfaces.' },
  { icon: Award, title: 'Quality Templates', desc: 'Each template is crafted by designers and tested against real ATS scanners before being added to the library.' },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5" /> Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight text-balance">
              We're on a mission to make every resume count
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              GetEasyCV started because resume builders were either too clunky, too expensive, or too generic.
              We built something different — a fast, intelligent builder that produces polished, ATS-ready resumes in minutes.
            </p>
            <Link href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all">
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-slate-50 border-b border-slate-100 py-12 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-violet-600">{value}</p>
                <p className="text-sm text-slate-500 font-semibold mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-3xl mx-auto px-4 py-16 space-y-6">
          <h2 className="text-2xl font-black text-slate-900">The problem we're solving</h2>
          <p className="text-slate-600 leading-relaxed">
            Most resume builders force you into rigid layouts, charge you before you can see the result, or produce documents that look great on screen but fail ATS scanners. Job seekers — especially those early in their careers — deserve better tools.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We built GetEasyCV with a simple goal: give every job seeker access to professional-grade resume tooling, AI writing assistance, and beautiful templates — without technical complexity or a steep learning curve.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Today, our platform supports 200+ template combinations, field-level AI optimization, real-time live preview, and one-click PDF export. And we're just getting started.
          </p>
        </section>

        {/* Values */}
        <section className="bg-slate-50 border-t border-slate-100 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-10">What we believe in</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-black text-slate-900">Ready to build your best resume?</h2>
            <p className="text-slate-500 text-sm">Join thousands of job seekers who've already landed interviews using GetEasyCV.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/templates"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all shadow-sm">
                Browse Templates
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
