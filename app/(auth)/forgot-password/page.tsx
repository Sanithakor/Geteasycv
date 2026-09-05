'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

function ForgotPasswordContent() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError('Email address is required.');
      return;
    }
    if (!validateEmail(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Unable to connect. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 my-auto">

        {/* Brand Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#0F0F0F] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#F5D17B]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Get<span className="text-[#F3645C]">EasyCV</span>
            </span>
          </Link>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Check your inbox</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              If <span className="font-semibold text-slate-700">{email.trim().toLowerCase()}</span> is registered,
              we've sent a password reset link. It expires in 1 hour.
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Didn't get it? Check your spam folder or{' '}
              <button
                type="button"
                onClick={() => { setSubmitted(false); setError(''); }}
                className="text-[#F3645C] font-bold hover:underline cursor-pointer"
              >
                try again
              </button>.
            </p>
            <Link
              href="/?openAuth=login"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                Forgot <span className="text-[#F3645C]">Password?</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <p className="text-xs font-semibold text-rose-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0F0F0F] focus:ring-2 focus:ring-[#0F0F0F]/15 outline-none transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] text-white font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/?openAuth=login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Legal Footer */}
      <p className="mt-6 text-center text-xs text-slate-400 font-medium">
        By using this service, you agree to our{' '}
        <Link href="/terms" className="text-slate-600 font-semibold hover:underline">Terms of Service</Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-slate-600 font-semibold hover:underline">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading...
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
