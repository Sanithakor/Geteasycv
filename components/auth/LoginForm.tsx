/**
 * Login Form Component
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Sparkles, User } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';
import { triggerGoogleSignIn, preloadGoogleAuth } from '../../lib/auth/googleAuth';

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = '/dashboard' }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetRedirect = searchParams.get('callbackUrl') || searchParams.get('redirectTo') || redirectTo;
  const { login, isLoading, clearError } = useAuthStore();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim()) { setError('Email address is required.'); return; }
    if (!formData.password) { setError('Password is required.'); return; }

    try {
      await login(formData.email.trim(), formData.password);
      const authState = useAuthStore.getState();
      const targetPath = authState.user?.role === 'admin' ? '/admin' : targetRedirect;
      router.push(targetPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  useEffect(() => {
    preloadGoogleAuth();
  }, []);

  const handleGithubLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoMode: true }),
      });
      const result = await res.json();
      if (res.ok && result.success && result.user) {
        useAuthStore.setState({
          user: result.user,
          token: result.token ?? null,
          isAuthenticated: true,
          _hydrated: true,
        });
        const targetPath = result.user?.role === 'admin' ? '/admin' : targetRedirect;
        router.push(targetPath);
      } else {
        setError(result.error || 'GitHub authentication failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('GitHub Auth Error:', err);
      setError('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const result = await triggerGoogleSignIn();

      if (result.success && result.user) {
        useAuthStore.setState({
          user: result.user,
          token: result.token ?? null,
          isAuthenticated: true,
          _hydrated: true,
        });
        const targetPath = result.user?.role === 'admin' ? '/admin' : targetRedirect;
        router.push(targetPath);
      } else {
        setError(result.error || 'Google authentication failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Google Auth Error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({ email: 'demo@example.com', password: 'DemoPassword123!' });
    setError('');
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF570F] to-[#FF8C5A] flex items-center justify-center shadow-md shadow-[#FF570F]/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Get<span className="text-[#FF570F]">EasyCV</span>
          </span>
        </Link>
      </div>

      {/* Title & Illustration Row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-1.5 max-w-[280px]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome <span className="text-[#FF570F]">Back!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Login to your account and continue building your professional resume.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative w-28 h-24 shrink-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/70 to-indigo-100/40 rounded-3xl transform rotate-6 scale-95" />
          <div className="absolute right-1 top-0 w-20 h-20 bg-white rounded-xl shadow-md border border-slate-100 p-2 transform -rotate-3 transition-transform hover:rotate-0">
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-[#FFF0EB] flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-[#FF570F]" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="h-1 bg-slate-300 rounded-full w-full" />
                <div className="h-0.5 bg-slate-200 rounded-full w-2/3" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-0.5 bg-slate-200 rounded-full w-full" />
              <div className="h-0.5 bg-slate-200 rounded-full w-3/4" />
              <div className="h-0.5 bg-slate-200 rounded-full w-full" />
            </div>
          </div>
          <div className="absolute left-0 bottom-1 w-9 h-10 bg-[#FF570F] rounded-xl shadow-lg flex flex-col items-center justify-center z-10 transform -rotate-6">
            <div className="w-3.5 h-2.5 border-2 border-white border-b-0 rounded-t-md -mb-0.5" />
            <div className="w-6 h-5 bg-[#FF570F] rounded-md flex items-center justify-center">
              <div className="w-1.5 h-2 bg-white rounded-full" />
            </div>
          </div>
          <div className="absolute right-0 bottom-0 z-10 flex flex-col items-center">
            <div className="w-5 h-5 text-[#FF570F] -mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-2 3-5 5-8 5 0 5 4 9 8 13 4-4 8-8 8-13-3 0-6-2-8-5z" />
              </svg>
            </div>
            <div className="w-4 h-3.5 bg-slate-100 border border-slate-200 rounded-b-md shadow-2xs" />
          </div>
        </div>
      </div>

      {/* Demo Credentials Callout */}
      <div className="mb-5 p-3 rounded-xl bg-[#FFF8F5]/70 border border-[#FF570F] flex items-center justify-between text-xs text-indigo-900">
        <div>
          <span className="font-bold">Demo:</span> demo@example.com / DemoPassword123!
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="text-[11px] font-bold text-[#FF570F] hover:underline bg-white px-2.5 py-1 rounded-lg border border-[#FF570F] shadow-2xs cursor-pointer shrink-0 ml-2"
        >
          Auto Fill
        </button>
      </div>

      {/* Error Alert — single, consistent style */}
      {error && (
        <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200" role="alert">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
          <p className="text-xs font-semibold text-rose-600">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-xs font-bold text-[#FF570F] hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-[#FF570F] hover:bg-[#E04800] text-white font-bold text-sm shadow-md shadow-[#FF570F]/25 focus:outline-none focus:ring-2 focus:ring-[#FF570F]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-1"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative px-3 bg-white text-xs font-medium text-slate-500">or continue with</span>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
        </button>

        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={isGoogleLoading || isLoading}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 shrink-0 fill-current text-slate-900" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-xs text-slate-500 font-medium">
        Don't have an account?{' '}
        <Link href="/signup" className="text-[#FF570F] font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
