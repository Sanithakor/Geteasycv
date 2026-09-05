'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, Sparkles, CheckCircle2, Info } from 'lucide-react';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = () => {
    const p = formData.newPassword;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[@$!%*?&]/.test(p)) score++;
    return Math.max(1, score);
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-rose-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-500'];

  const validate = () => {
    if (!token) { setError('Reset link is invalid or missing. Please request a new one.'); return false; }
    if (!formData.newPassword) { setError('New password is required.'); return false; }
    if (formData.newPassword.length < 8) { setError('Password must be at least 8 characters.'); return false; }
    if (!/[A-Z]/.test(formData.newPassword)) { setError('Password must contain at least one uppercase letter.'); return false; }
    if (!/[a-z]/.test(formData.newPassword)) { setError('Password must contain at least one lowercase letter.'); return false; }
    if (!/[0-9]/.test(formData.newPassword)) { setError('Password must contain at least one number.'); return false; }
    if (!/[@$!%*?&]/.test(formData.newPassword)) { setError('Password must contain at least one special character (@$!%*?&).'); return false; }
    if (formData.newPassword !== formData.confirmPassword) { setError('Passwords do not match.'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: formData.newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.errors?.join('. ') || data.error || 'Failed to reset password. Please try again.';
        setError(msg);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/?openAuth=login'), 3000);
    } catch {
      setError('Unable to connect. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const strength = getPasswordStrength();

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-rose-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Invalid Reset Link</h1>
          <p className="text-sm text-slate-500 mb-6">
            This password reset link is missing or invalid. Please request a new one.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block py-3 px-6 rounded-xl bg-[#0F0F0F] text-white font-bold text-sm hover:bg-[#262626] transition-colors cursor-pointer"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

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

        {success ? (
          /* ── Success state ── */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Password Reset!</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Your password has been updated successfully. Redirecting you to login...
            </p>
            <Link
              href="/?openAuth=login"
              className="inline-block py-3 px-6 rounded-xl bg-[#0F0F0F] text-white font-bold text-sm hover:bg-[#262626] transition-colors cursor-pointer"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                Reset <span className="text-[#F3645C]">Password</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Choose a strong new password for your account.
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
              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-xs font-bold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.newPassword}
                    onChange={(e) => { setFormData(p => ({ ...p, newPassword: e.target.value })); setError(''); }}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0F0F0F] focus:ring-2 focus:ring-[#0F0F0F]/15 outline-none transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength meter */}
                {formData.newPassword && (
                  <div className="mt-2.5">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1 rounded-full transition-colors ${step <= strength ? strengthColor[strength] : 'bg-slate-200'}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                        <span>Must be 8+ chars with uppercase, number &amp; special char</span>
                        <div title="Password rules: Minimum 8 characters, one uppercase, one lowercase, one number, one special character (@$!%*?&)" className="cursor-pointer">
                          <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
                        </div>
                      </div>
                      {strength > 0 && (
                        <span className={`text-[11px] font-bold ${strength >= 3 ? 'text-emerald-600' : strength === 2 ? 'text-amber-600' : 'text-rose-500'}`}>
                          {strengthLabel[strength]}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) => { setFormData(p => ({ ...p, confirmPassword: e.target.value })); setError(''); }}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0F0F0F] focus:ring-2 focus:ring-[#0F0F0F]/15 outline-none transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="mt-1.5 text-[11px] font-semibold text-rose-500">Passwords do not match.</p>
                )}
                {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                  <p className="mt-1.5 text-[11px] font-semibold text-emerald-600">Passwords match.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] text-white font-bold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-2"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 font-medium">
              Remember your password?{' '}
              <Link href="/?openAuth=login" className="text-[#F3645C] font-bold hover:underline">
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading...
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
