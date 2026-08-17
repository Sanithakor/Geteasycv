/**
 * Login Form Component
 * Pixel-perfect design matching user-provided mockup
 */

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Sparkles, User } from 'lucide-react';
import { useAuthStore } from '../../lib/store/authStore';

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = '/dashboard' }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetRedirect = searchParams.get('callbackUrl') || searchParams.get('redirectTo') || redirectTo;
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      await login(formData.email, formData.password);
      
      const authState = useAuthStore.getState();
      const targetPath = authState.user?.role === 'admin' ? '/admin' : targetRedirect;
      
      router.push(targetPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setLocalError(message);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setLocalError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();

      if (result.success && result.user) {
        useAuthStore.setState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
        });
        const targetPath = result.user?.role === 'admin' ? '/admin' : redirectTo;
        router.push(targetPath);
      } else {
        setLocalError(result.error || 'Google authentication failed');
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setLocalError('Failed to sign in with Google');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'DemoPassword123',
    });
    setLocalError('');
  };

  return (
    <div className="w-full">
      {/* Brand Header */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4F39F6] to-[#7C69FF] flex items-center justify-center shadow-md shadow-[#4F39F6]/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Get<span className="text-[#4F39F6]">EasyCV</span>
          </span>
        </Link>
      </div>

      {/* Title & Vector Illustration Row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="space-y-1.5 max-w-[280px]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome <span className="text-[#4F39F6]">Back!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Login to your account and continue building your professional resume.
          </p>
        </div>

        {/* Pixel-Perfect Illustration matching design mockup */}
        <div className="relative w-28 h-24 shrink-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/70 to-indigo-100/40 rounded-3xl transform rotate-6 scale-95" />
          
          {/* Resume Card Mockup */}
          <div className="absolute right-1 top-0 w-20 h-20 bg-white rounded-xl shadow-md border border-slate-100 p-2 transform -rotate-3 transition-transform hover:rotate-0">
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-[#4F39F6]" />
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

          {/* Purple Lock */}
          <div className="absolute left-0 bottom-1 w-9 h-10 bg-[#4F39F6] rounded-xl shadow-lg flex flex-col items-center justify-center z-10 transform -rotate-6">
            <div className="w-3.5 h-2.5 border-2 border-white border-b-0 rounded-t-md -mb-0.5" />
            <div className="w-6 h-5 bg-[#4F39F6] rounded-md flex items-center justify-center">
              <div className="w-1.5 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Plant in Pot */}
          <div className="absolute right-0 bottom-0 z-10 flex flex-col items-center">
            <div className="w-5 h-5 text-[#4F39F6] -mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-2 3-5 5-8 5 0 5 4 9 8 13 4-4 8-8 8-13-3 0-6-2-8-5z" />
              </svg>
            </div>
            <div className="w-4 h-3.5 bg-slate-100 border border-slate-200 rounded-b-md shadow-2xs" />
          </div>
        </div>
      </div>

      {/* Demo Credentials Callout */}
      <div className="mb-5 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
        <div>
          <span className="font-bold">Demo Login:</span> demo@example.com / DemoPassword123
        </div>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="text-[11px] font-bold text-[#4F39F6] hover:underline bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs cursor-pointer shrink-0 ml-2"
        >
          Auto Fill
        </button>
      </div>

      {/* Error Alert */}
      {(error || localError) && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600">
          {localError || error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
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
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#4F39F6] focus:ring-[#4F39F6] cursor-pointer"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-bold text-[#4F39F6] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] text-white font-bold text-sm shadow-md shadow-[#4F39F6]/25 focus:outline-none focus:ring-2 focus:ring-[#4F39F6]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer mt-1"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative px-3 bg-white text-xs font-medium text-slate-400">
          or continue with
        </span>
      </div>

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-2.5 transition-all cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
      </button>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-xs text-slate-500 font-medium">
        Don't have an account?{' '}
        <Link
          href="/signup"
          className="text-[#4F39F6] font-bold hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
