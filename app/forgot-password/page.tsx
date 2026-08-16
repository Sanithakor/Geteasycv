'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'form' | 'sent' | 'error'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 404) {
        setStage('sent');
      } else {
        const data = await res.json();
        setErrorMsg(data?.error || 'Something went wrong. Please try again.');
        setStage('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStage('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center justify-center mb-3 group cursor-pointer" title="Go to Homepage">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Get<span className="text-[#4F39F6]">EasyCV</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Reset your password</h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {stage === 'sent'
              ? "We've sent you a reset link"
              : "Enter your email and we'll send a reset link"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
          {stage === 'sent' ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Check your inbox</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                If <strong>{email}</strong> is registered, you will receive a password reset link shortly.
              </p>
              <p className="text-xs text-slate-400 pt-2">
                Did not receive it?{' '}
                <button
                  type="button"
                  onClick={() => setStage('form')}
                  className="text-[#4F39F6] font-bold hover:underline cursor-pointer"
                >
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {stage === 'error' && errorMsg && (
                <div className="flex items-start gap-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold" role="alert">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-600" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email address"
                    disabled={isLoading}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-[#4F39F6]/25 transition-all cursor-pointer mt-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                <span>{isLoading ? 'Sending Link...' : 'Send Reset Link'}</span>
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-5">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#4F39F6] font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
