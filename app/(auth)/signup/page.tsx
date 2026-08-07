'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, useAuthHydrated } from '@/lib/store/authStore';
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const isHydrated = useAuthHydrated();
  const { signup, isLoading, error, clearError, isAuthenticated, user } = useAuthStore();

  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      router.push(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, user, isHydrated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
    clearError();
  };

  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[@$!%*?&]/.test(pw)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'][strength];
  const strengthColor = ['', 'bg-rose-500', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500', 'bg-emerald-600'][strength];

  const validate = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) { setFormError('Full name must be at least 2 characters'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setFormError('Enter a valid email address'); return false; }
    if (formData.password.length < 8) { setFormError('Password must be at least 8 characters'); return false; }
    if (!/[A-Z]/.test(formData.password)) { setFormError('Password needs an uppercase letter'); return false; }
    if (!/[0-9]/.test(formData.password)) { setFormError('Password needs a number'); return false; }
    if (formData.password !== formData.confirmPassword) { setFormError('Passwords do not match'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    try {
      await signup(formData.email, formData.password, formData.name);
      const state = useAuthStore.getState();
      router.push(state.user?.role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      // error handled by store
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleUser: { email: 'demo.google@example.com', name: 'Demo User' } }),
      });
      if (res.ok) {
        const data = await res.json();
        useAuthStore.setState({ user: data.user, token: data.token, isAuthenticated: true });
        router.push(data.user?.role === 'admin' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      console.error('Google signup error:', err);
    }
  };

  const displayError = formError || error;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center justify-center mb-3 group" title="Go to Homepage">
            <img src="/logo.png" alt="GetEasyCV" className="h-11 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500">Start building professional resumes for free</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7 space-y-5">
          {/* Google signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-white text-[11px] font-semibold text-slate-400">OR SIGN UP WITH EMAIL</span></div>
          </div>

          {/* Error */}
          {displayError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium" role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[11px] font-bold text-slate-700">Full Name</label>
              <input id="name" name="name" type="text" required autoComplete="name"
                value={formData.name} onChange={handleChange} placeholder="Sarah Johnson"
                disabled={isLoading}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[11px] font-bold text-slate-700">Email Address</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                value={formData.email} onChange={handleChange} placeholder="sarah@example.com"
                disabled={isLoading}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[11px] font-bold text-slate-700">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password"
                  value={formData.password} onChange={handleChange} placeholder="Min. 8 characters"
                  disabled={isLoading}
                  className="w-full h-10 pl-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${(strength / 5) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{strengthLabel}</p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-[11px] font-bold text-slate-700">Confirm Password</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} required autoComplete="new-password"
                  value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password"
                  disabled={isLoading}
                  className="w-full h-10 pl-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isLoading ? 'Creating account…' : 'Create Free Account'}
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-400">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-violet-600 hover:underline font-semibold">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-violet-600 hover:underline font-semibold">Privacy Policy</Link>
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-600 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
