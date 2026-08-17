'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Info } from 'lucide-react';
import { useAuthStore, useAuthHydrated } from '@/lib/store/authStore';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('redirectTo') || '/dashboard';
  const isHydrated = useAuthHydrated();
  const { signup, isLoading, error, clearError, isAuthenticated, user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      router.push(user?.role === 'admin' ? '/admin' : callbackUrl);
    }
  }, [isAuthenticated, user, isHydrated, router, callbackUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError('');
    clearError();
  };

  const getPasswordStrength = () => {
    const pass = formData.password;
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    return Math.max(1, score);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return false;
    }

    if (formData.name.trim().length < 2) {
      setFormError('Name must be at least 2 characters');
      return false;
    }

    if (!formData.email.trim()) {
      setFormError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setFormError('Password is required');
      return false;
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return false;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setFormError('Password must contain an uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(formData.password)) {
      setFormError('Password must contain a lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(formData.password)) {
      setFormError('Password must contain a number');
      return false;
    }

    if (!/[@$!%*?&]/.test(formData.password)) {
      setFormError('Password must contain a special character (@$!%*?&)');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }

    if (!agreeTerms) {
      setFormError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      const authState = useAuthStore.getState();
      const targetPath = authState.user?.role === 'admin' ? '/admin' : callbackUrl;
      router.push(targetPath);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      setFormError(msg);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setFormError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();

      if (result.success && result.user) {
        useAuthStore.setState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
        });
        const targetPath = result.user?.role === 'admin' ? '/admin' : callbackUrl;
        router.push(targetPath);
      } else {
        setFormError(result.error || 'Google sign up failed');
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setFormError('Failed to sign up with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 my-auto">
        <div className="w-16 h-16 rounded-full bg-[#EEECFF] text-[#4F39F6] flex items-center justify-center mx-auto mb-4 shadow-2xs">
          <UserPlus className="w-7 h-7 text-[#4F39F6]" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Create Your <span className="text-[#4F39F6]">Account</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
            Sign up for free and start creating professional resumes in minutes.
          </p>
        </div>

        {(formError || error) && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
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

            <div className="mt-2.5">
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-full transition-colors ${
                      step <= strength ? 'bg-[#4F39F6]' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] font-medium text-slate-500">
                <span>Password must be at least 8 characters</span>
                <div
                  title="Password rules: Minimum 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)"
                  className="cursor-pointer inline-flex items-center"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#4F39F6] focus:ring-[#4F39F6] cursor-pointer shrink-0"
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="text-[#4F39F6] font-bold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#4F39F6] font-bold hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] text-white font-bold text-sm shadow-md shadow-[#4F39F6]/25 focus:outline-none focus:ring-2 focus:ring-[#4F39F6]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative px-3 bg-white text-xs font-medium text-slate-400">
            or sign up with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>{isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}</span>
        </button>

        <div className="mt-6 text-center text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-[#4F39F6] font-bold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading signup...
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
