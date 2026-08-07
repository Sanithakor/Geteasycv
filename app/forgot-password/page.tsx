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
      // Always show "check your email" to prevent user enumeration
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
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center justify-center mb-3 group">
            <img src="/logo.png" alt="GetEasyCV" className="h-11 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Reset your password</h1>
          <p className="mt-1 text-sm text-slate-500">
            {stage === 'sent'
              ? "We've sent you a reset link"
              : "Enter your email and we'll send a reset link"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
          {stage === 'sent' ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Check your inbox</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                  If <strong>{email}</strong> is registered, you will receive a password reset link shortly.
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Did not receive it?{' '}
                <button onClick={() => setStage('form')} className="text-violet-600 font-bold hover:underline cursor-pointer">
                  Try again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {stage === 'error' && errorMsg && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium" role="alert">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {errorMsg}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[11px] font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="email" type="email" name="email" required autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    disabled={isLoading}
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading || !email}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {isLoading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-5">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
