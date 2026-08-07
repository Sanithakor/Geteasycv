'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<'form' | 'success' | 'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password.length < 8) { setErrorMsg('Password must be at least 8 characters'); return; }
    if (formData.password !== formData.confirmPassword) { setErrorMsg('Passwords do not match'); return; }
    if (!token) { setErrorMsg('Invalid or missing reset token. Request a new link.'); return; }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: formData.password }),
      });
      if (res.ok) {
        setStage('success');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data?.error || 'Reset failed. The link may have expired.');
        setStage('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (stage === 'success') {
    return (
      <div className="text-center space-y-5 py-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Password updated!</h3>
          <p className="text-sm text-slate-500 mt-1">Redirecting you to sign in…</p>
        </div>
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:underline">
          Go to Sign In now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {!token && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium" role="alert">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          No reset token found. Please{' '}
          <Link href="/forgot-password" className="underline font-bold">request a new link</Link>.
        </div>
      )}

      {errorMsg && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium" role="alert">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-[11px] font-bold text-slate-700">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password"
            value={formData.password} onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
            placeholder="Min. 8 characters" disabled={isLoading}
            className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-[11px] font-bold text-slate-700">Confirm New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
          <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} required autoComplete="new-password"
            value={formData.confirmPassword} onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
            placeholder="Repeat new password" disabled={isLoading}
            className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}>
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
            <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Passwords match
          </p>
        )}
      </div>

      <button type="submit" disabled={isLoading || !token}
        className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {isLoading ? 'Updating password…' : 'Set New Password'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center justify-center mb-3 group">
            <img src="/logo.png" alt="GetEasyCV" className="h-11 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Set a new password</h1>
          <p className="mt-1 text-sm text-slate-500">Choose a strong password for your account</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7">
          <Suspense fallback={<div className="py-8 text-center text-slate-400 text-sm">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
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
