'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Mail, CheckCircle2, ShieldCheck, ArrowRight, Lock, Wand2, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsJoined(true);
        toast.success(data.message || 'Successfully joined the waitlist!');
      } else {
        toast.error(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#F3645C]/10 blur-[140px] pointer-events-none rounded-full" />
        
        {/* Navigation Header */}
        <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="GetEasyCV Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-lg font-extrabold tracking-tight text-white">GetEasyCV</span>
          </div>

          <Link
            href="/login"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Lock className="w-3.5 h-3.5 text-[#BAC7FE]" />
            <span>Admin Sign In</span>
          </Link>
        </header>

        {/* Hero Body Section */}
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center space-y-8 my-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-[#F3645C]/30 text-[#BAC7FE] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
            <span>LAUNCHING SOON</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            We're Getting Ready for <br />
            <span className="bg-gradient-to-r from-[#BAC7FE] via-[#F3645C] to-white bg-clip-text text-transparent">
              GetEasyCV Launch
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            GetEasyCV is preparing a better way to create professional, ATS-friendly resumes. We're putting the final touches on the experience and will be launching soon.
          </p>

          {/* Interactive Waitlist Form */}
          <div className="max-w-md mx-auto pt-4">
            {isJoined ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You're on the list! We will notify you when we go live.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80 shadow-xl backdrop-blur-xs">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access..."
                    className="w-full pl-9 pr-3 py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#F3645C] hover:bg-[#E0524A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Joining...' : 'Notify Me'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58C09D]" />
              <span>No spam. Unsubscribe at any time.</span>
            </p>
          </div>

          {/* Upcoming Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 text-left">
            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#BAC7FE] flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">ATS-Optimized Layouts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expertly crafted single & multi-page A4 templates designed to pass company applicant scanners.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#F5D17B] flex items-center justify-center mb-3">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">AI Writing Assistant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transform basic job duties into metric-driven achievement statements with 1 click.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#58C09D] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">High-Speed PDF Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant server-side vector PDF download with pixel-perfect font rendering.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 py-6 text-center text-xs text-slate-500 border-t border-slate-800/60">
          <p>© {new Date().getFullYear()} GetEasyCV (https://geteasycv.com). All rights reserved.</p>
        </footer>
      </div>

      <Toaster position="bottom-right" />
    </>
  );
}
