'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = '/dashboard' }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    try {
      await login(formData.email, formData.password);
      const state = useAuthStore.getState();
      if (!state.isAuthenticated) throw new Error('Login succeeded but session not established');
      await new Promise((r) => setTimeout(r, 100));
      router.push(state.user?.role === 'admin' ? '/admin' : redirectTo);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setLocalError(msg);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleUser: { email: 'demo.google@example.com', name: 'Demo User' } }),
      });
      if (res.ok) {
        const data = await res.json();
        useAuthStore.setState({ user: data.user, token: data.token, isAuthenticated: true });
        router.push(data.user?.role === 'admin' ? '/admin' : redirectTo);
      }
    } catch (err) {
      console.error('Google auth error:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-7 space-y-5">
      {/* Demo credentials */}
      <div className="p-3 rounded-xl bg-violet-50 border border-violet-200">
        <p className="text-[11px] font-bold text-violet-800 mb-1.5">Demo Credentials</p>
        <p className="text-[11px] text-violet-700">
          Email: <code className="bg-white px-1.5 py-0.5 rounded font-mono">demo@example.com</code>
        </p>
        <p className="text-[11px] text-violet-700 mt-0.5">
          Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono">DemoPassword123!</code>
        </p>
      </div>

      {/* Google sign-in */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer shadow-xs"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
        <div className="relative flex justify-center"><span className="px-3 bg-white text-[11px] font-semibold text-slate-400">OR SIGN IN WITH EMAIL</span></div>
      </div>

      {/* Error */}
      {displayError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium" role="alert">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-[11px] font-bold text-slate-700">Email Address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="sarah@example.com"
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-[11px] font-bold text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-[11px] text-violet-600 font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full h-10 pl-3 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500">
        No account?{' '}
        <Link href="/signup" className="text-violet-600 font-bold hover:underline">Create one free</Link>
      </p>
    </div>
  );
}
