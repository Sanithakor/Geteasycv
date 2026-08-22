'use client';

/**
 * AuthModal
 * Design: Clean two-step flow matching the reference design.
 * - Login: "Continue with Google" | "Login with Email" ? expands to form
 * - Signup: "Continue with Google" | "Sign up with Email" ? expands to form
 * - OTP: inline step after email/phone submit
 * - Full validation with clean, consistent error UI
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  X, Mail, Phone, Lock, Eye, EyeOff, User,
  ArrowLeft, CheckCircle2, Loader2, AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';

// --- Shared ------------------------------------------------------------------

const GOOGLE_SVG = (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-red-50 border border-red-200">
      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
      <p className="text-sm text-red-700 font-medium leading-snug">{message}</p>
    </div>
  );
}

function SuccessBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
      <p className="text-sm text-emerald-700 font-medium leading-snug">{message}</p>
    </div>
  );
}

function MethodButton({
  icon, label, onClick, loading, disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border border-[rgba(15,15,15,0.12)] bg-white hover:bg-[#F8F8F6] text-[#0F0F0F] font-semibold text-[15px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="w-5 shrink-0 flex items-center justify-center">
        {loading ? <Loader2 className="w-5 h-5 animate-spin text-[#9ca3af]" /> : icon}
      </span>
      <span className="flex-1 text-center">{loading ? 'Connecting...' : label}</span>
    </button>
  );
}

function InputField({
  id, label, type = 'text', value, onChange, placeholder, autoComplete,
  disabled, icon, rightEl, hint, error,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
  disabled?: boolean; icon?: React.ReactNode; rightEl?: React.ReactNode;
  hint?: string; error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#0F0F0F]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`w-full py-3 rounded-xl border text-sm text-[#0F0F0F] font-medium placeholder:text-[#9ca3af] outline-none transition-all bg-white
            ${icon ? 'pl-10' : 'pl-4'}
            ${rightEl ? 'pr-10' : 'pr-4'}
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-[rgba(15,15,15,0.12)] focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/20'}
            disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        {rightEl && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</span>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-[#333333]">{hint}</p>}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  score = Math.max(1, score);
  const colors = ['', 'bg-red-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-500'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const textColors = ['', 'text-red-500', 'text-amber-600', 'text-sky-600', 'text-emerald-600'];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= score ? colors[score] : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-[#9ca3af]">8+ chars, uppercase, number & symbol</p>
        <p className={`text-xs font-bold ${textColors[score]}`}>{labels[score]}</p>
      </div>
    </div>
  );
}

// --- OTP Step -----------------------------------------------------------------

function OtpStep({
  identifier, identifierType, purpose, name, redirectTo, onBack,
}: {
  identifier: string; identifierType: 'email' | 'phone';
  purpose: 'login' | 'signup'; name?: string;
  redirectTo: string; onBack: () => void;
}) {
  const router = useRouter();
  const { close } = useAuthModalStore();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = [
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
  ];
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    refs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const otp = digits.join('');

  const handleDigit = (index: number, value: string) => {
    const v = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    setError('');
    if (v && index < 5) refs[index + 1].current?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...digits];
    pasted.split('').forEach((c, i) => { if (i < 6) next[i] = c; });
    setDigits(next);
    refs[Math.min(pasted.length, 5)].current?.focus();
  };

  const handleVerify = async () => {
    setError('');
    if (otp.length < 6) { setError('Please enter the complete 6-digit code.'); return; }
    setIsVerifying(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, identifierType, otp, purpose, name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Verification failed. Please try again.'); return; }

      const user = { ...data.user, tier: data.user.subscriptionTier ?? data.user.tier ?? 'free' };
      delete user.subscriptionTier;
      useAuthStore.setState({ user, token: data.token, isAuthenticated: true, _hydrated: true, isLoading: false, error: null });

      close();
      router.push(data.user?.role === 'admin' ? '/admin' : redirectTo);
    } catch {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, identifierType, purpose }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to resend. Please try again.'); return; }
      setSuccess('A new code has been sent.');
      setCountdown(60);
      setDigits(['', '', '', '', '', '']);
      refs[0].current?.focus();
    } catch {
      setError('Unable to resend. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="text-center space-y-1">
        <h2 className="text-[22px] font-black text-[#0F0F0F] tracking-tight">Enter verification code</h2>
        <p className="text-sm text-[#333333]">
          Sent to <span className="font-semibold text-[#0F0F0F]">{identifier}</span>
        </p>
      </div>

      {error && <ErrorBanner message={error} />}
      {success && <SuccessBanner message={success} />}

      {/* 6-box OTP input */}
      <div className="flex gap-2.5 justify-center" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 outline-none transition-all
              ${d ? 'border-[#F3645C] bg-[#F3645C]/5 text-[#F3645C]' : 'border-[rgba(15,15,15,0.12)] bg-white text-[#0F0F0F]'}
              focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/20`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying || otp.length < 6}
        className="w-full py-3.5 rounded-xl bg-[#0F0F0F] hover:bg-[#333333] text-white font-bold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
        {isVerifying ? 'Verifying...' : 'Verify Code'}
      </button>

      <p className="text-center text-sm text-[#333333]">
        Didn't receive the code?{' '}
        {countdown > 0 ? (
          <span className="font-semibold text-[#9ca3af]">Resend in {countdown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-bold text-[#F3645C] hover:underline disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend'}
          </button>
        )}
      </p>
    </div>
  );
}

// --- Login View ---------------------------------------------------------------

type LoginView = 'methods' | 'email-password' | 'email-otp' | 'phone-otp' | 'otp-verify';

function LoginPanel({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const { close, setTab } = useAuthModalStore();
  const { login, isLoading, clearError } = useAuthStore();

  const [view, setView] = useState<LoginView>('methods');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otpTarget, setOtpTarget] = useState('');
  const [otpType, setOtpType] = useState<'email' | 'phone'>('email');

  const resetForm = useCallback(() => {
    setIdentifier('');
    setPassword('');
    setError('');
    setFieldErrors({});
    clearError();
  }, [clearError]);

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();
      if (result.success && result.user) {
        const user = { ...result.user, tier: result.user.subscriptionTier ?? result.user.tier ?? 'free' };
        delete user.subscriptionTier;
        useAuthStore.setState({ user, token: result.token ?? null, isAuthenticated: true, _hydrated: true, isLoading: false, error: null });
        close();
        router.push(result.user?.role === 'admin' ? '/admin' : redirectTo);
      } else {
        setError(result.error || 'Google sign-in failed. Please try again.');
      }
    } catch {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fe: Record<string, string> = {};
    if (!identifier.trim()) fe.identifier = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) fe.identifier = 'Enter a valid email address.';
    if (!password) fe.password = 'Password is required.';
    if (Object.keys(fe).length) { setFieldErrors(fe); return; }
    setFieldErrors({});
    try {
      await login(identifier.trim().toLowerCase(), password);
      const u = useAuthStore.getState().user;
      close();
      router.push(u?.role === 'admin' ? '/admin' : redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const idType = view === 'phone-otp' ? 'phone' : 'email';
    const trimmed = identifier.trim().toLowerCase();
    const fe: Record<string, string> = {};
    if (!trimmed) {
      fe.identifier = idType === 'phone' ? 'Phone number is required.' : 'Email is required.';
    } else if (idType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      fe.identifier = 'Enter a valid email address.';
    } else if (idType === 'phone' && !/^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s\-()+]/g, ''))) {
      fe.identifier = 'Enter a valid phone number with country code (e.g. +1 555 000 0000).';
    }
    if (Object.keys(fe).length) { setFieldErrors(fe); return; }
    setFieldErrors({});
    setIsSending(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, identifierType: idType, purpose: 'login' }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send code. Please try again.'); return; }
      setOtpTarget(trimmed);
      setOtpType(idType);
      setView('otp-verify');
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // OTP verify screen
  if (view === 'otp-verify') {
    return (
      <OtpStep
        identifier={otpTarget}
        identifierType={otpType}
        purpose="login"
        redirectTo={redirectTo}
        onBack={() => { setView(otpType === 'phone' ? 'phone-otp' : 'email-otp'); resetForm(); }}
      />
    );
  }

  // Method selection screen
  if (view === 'methods') {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-[28px] font-black text-[#0F0F0F] tracking-tight">Login</h2>
        </div>

        {error && <ErrorBanner message={error} />}

        <div className="space-y-3">
          <MethodButton
            icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
            label="Continue with Google"
            onClick={handleGoogle}
            loading={isGoogleLoading}
          />
          <MethodButton
            icon={<Mail className="w-5 h-5 text-[#333333]" />}
            label="Login with Email"
            onClick={() => { resetForm(); setView('email-password'); }}
          />
        </div>

        <p className="text-center text-[15px] text-[#333333]">
          Don't have an account?{' '}
          <button type="button" onClick={() => setTab('signup')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
            Sign up
          </button>
        </p>
      </div>
    );
  }

  // Email + password form
  if (view === 'email-password') {
    return (
      <div className="space-y-5">
        <button type="button" onClick={() => { setView('methods'); resetForm(); }} className="flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center">
          <h2 className="text-[24px] font-black text-[#0F0F0F] tracking-tight">Login with Email</h2>
        </div>

        {error && <ErrorBanner message={error} />}

        <form onSubmit={handlePasswordLogin} className="space-y-4" noValidate>
          <InputField
            id="login-email"
            label="Email Address"
            type="email"
            value={identifier}
            onChange={(v) => { setIdentifier(v); setFieldErrors((p) => ({ ...p, identifier: '' })); }}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            icon={<Mail className="w-4 h-4" />}
            error={fieldErrors.identifier}
          />
          <div>
            <InputField
              id="login-password"
              label="Password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(v) => { setPassword(v); setFieldErrors((p) => ({ ...p, password: '' })); }}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
              icon={<Lock className="w-4 h-4" />}
              error={fieldErrors.password}
              rightEl={
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#9ca3af] hover:text-[#333333] cursor-pointer transition-colors" aria-label="Toggle password visibility">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <div className="flex justify-end mt-1.5">
              <Link href="/forgot-password" onClick={close} className="text-xs font-semibold text-[#F3645C] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#0F0F0F] hover:bg-[#333333] text-white font-bold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(15,15,15,0.12)]" /></div>
          <span className="relative px-3 bg-white text-xs text-[#9ca3af] font-medium">or</span>
        </div>

        <div className="space-y-2.5">
          <button type="button" onClick={() => { resetForm(); setView('email-otp'); }} className="w-full py-3 rounded-xl border border-[rgba(15,15,15,0.12)] text-sm font-semibold text-[#333333] hover:bg-[#F8F8F6] transition-all text-center">
            Login with Email OTP instead
          </button>
          <button type="button" onClick={() => { resetForm(); setView('phone-otp'); }} className="w-full py-3 rounded-xl border border-[rgba(15,15,15,0.12)] text-sm font-semibold text-[#333333] hover:bg-[#F8F8F6] transition-all text-center">
            Login with Phone OTP instead
          </button>
        </div>

        <p className="text-center text-[15px] text-[#333333]">
          Don't have an account?{' '}
          <button type="button" onClick={() => setTab('signup')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
            Sign up
          </button>
        </p>
      </div>
    );
  }

  // OTP send form (email or phone)
  const isPhone = view === 'phone-otp';
  return (
    <div className="space-y-5">
      <button type="button" onClick={() => { setView('methods'); resetForm(); }} className="flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="text-center">
        <h2 className="text-[24px] font-black text-[#0F0F0F] tracking-tight">
          {isPhone ? 'Login with Phone' : 'Login with Email OTP'}
        </h2>
        <p className="text-sm text-[#333333] mt-1">We'll send a one-time code to verify you.</p>
      </div>

      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
        <InputField
          id="login-otp-id"
          label={isPhone ? 'Phone Number' : 'Email Address'}
          type={isPhone ? 'tel' : 'email'}
          value={identifier}
          onChange={(v) => { setIdentifier(v); setFieldErrors((p) => ({ ...p, identifier: '' })); }}
          placeholder={isPhone ? '+1 555 000 0000' : 'you@example.com'}
          autoComplete={isPhone ? 'tel' : 'email'}
          disabled={isSending}
          icon={isPhone ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          error={fieldErrors.identifier}
        />
        <button
          type="submit"
          disabled={isSending}
          className="w-full py-3.5 rounded-xl bg-[#0F0F0F] hover:bg-[#333333] text-white font-bold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSending ? 'Sending code...' : 'Send Code'}
        </button>
      </form>

      <p className="text-center text-[15px] text-[#333333]">
        Don't have an account?{' '}
        <button type="button" onClick={() => setTab('signup')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
          Sign up
        </button>
      </p>
    </div>
  );
}

// --- Signup View --------------------------------------------------------------

type SignupView = 'methods' | 'email-password' | 'email-otp' | 'phone-otp' | 'otp-verify';

function SignupPanel({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const { close, setTab } = useAuthModalStore();
  const { signup, isLoading, clearError } = useAuthStore();

  const [view, setView] = useState<SignupView>('methods');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otpTarget, setOtpTarget] = useState('');
  const [otpType, setOtpType] = useState<'email' | 'phone'>('email');
  const [otpName, setOtpName] = useState('');

  const resetForm = useCallback(() => {
    setIdentifier('');
    setPassword('');
    setConfirmPw('');
    setError('');
    setFieldErrors({});
    clearError();
  }, [clearError]);

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();
      if (result.success && result.user) {
        const user = { ...result.user, tier: result.user.subscriptionTier ?? result.user.tier ?? 'free' };
        delete user.subscriptionTier;
        useAuthStore.setState({ user, token: result.token ?? null, isAuthenticated: true, _hydrated: true, isLoading: false, error: null });
        close();
        router.push(result.user?.role === 'admin' ? '/admin' : redirectTo);
      } else {
        setError(result.error || 'Google sign-up failed. Please try again.');
      }
    } catch {
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const validatePasswordForm = () => {
    const fe: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) fe.name = 'Full name must be at least 2 characters.';
    if (!identifier.trim()) fe.identifier = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) fe.identifier = 'Enter a valid email address.';
    if (!password) fe.password = 'Password is required.';
    else if (password.length < 8) fe.password = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(password)) fe.password = 'Must include an uppercase letter.';
    else if (!/[a-z]/.test(password)) fe.password = 'Must include a lowercase letter.';
    else if (!/[0-9]/.test(password)) fe.password = 'Must include a number.';
    else if (!/[@$!%*?&]/.test(password)) fe.password = 'Must include a special character (@$!%*?&).';
    if (password && confirmPw && password !== confirmPw) fe.confirmPw = 'Passwords do not match.';
    if (!agreed) fe.agreed = 'You must agree to the Terms and Privacy Policy.';
    return fe;
  };

  const handlePasswordSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fe = validatePasswordForm();
    if (Object.keys(fe).length) { setFieldErrors(fe); return; }
    setFieldErrors({});
    try {
      await signup(identifier.trim().toLowerCase(), password, name.trim());
      const u = useAuthStore.getState().user;
      close();
      router.push(u?.role === 'admin' ? '/admin' : redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const idType = view === 'phone-otp' ? 'phone' : 'email';
    const trimmed = identifier.trim().toLowerCase();
    const fe: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) fe.name = 'Full name must be at least 2 characters.';
    if (!trimmed) {
      fe.identifier = idType === 'phone' ? 'Phone number is required.' : 'Email is required.';
    } else if (idType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      fe.identifier = 'Enter a valid email address.';
    } else if (idType === 'phone' && !/^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s\-()+]/g, ''))) {
      fe.identifier = 'Enter a valid phone number with country code.';
    }
    if (!agreed) fe.agreed = 'You must agree to the Terms and Privacy Policy.';
    if (Object.keys(fe).length) { setFieldErrors(fe); return; }
    setFieldErrors({});
    setIsSending(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, identifierType: idType, purpose: 'signup' }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send code. Please try again.'); return; }
      setOtpTarget(trimmed);
      setOtpType(idType);
      setOtpName(name.trim());
      setView('otp-verify');
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (view === 'otp-verify') {
    return (
      <OtpStep
        identifier={otpTarget}
        identifierType={otpType}
        purpose="signup"
        name={otpName}
        redirectTo={redirectTo}
        onBack={() => { setView(otpType === 'phone' ? 'phone-otp' : 'email-otp'); setError(''); }}
      />
    );
  }

  // Method selection
  if (view === 'methods') {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-[28px] font-black text-[#0F0F0F] tracking-tight">Create account</h2>
        </div>

        {error && <ErrorBanner message={error} />}

        <div className="space-y-3">
          <MethodButton
            icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>}
            label="Continue with Google"
            onClick={handleGoogle}
            loading={isGoogleLoading}
          />
          <MethodButton
            icon={<Mail className="w-5 h-5 text-[#333333]" />}
            label="Sign up with Email"
            onClick={() => { resetForm(); setView('email-password'); }}
          />
        </div>

        <p className="text-sm text-[#333333] leading-relaxed">
          By creating an account, you agree to our{' '}
          <Link href="/terms" onClick={close} className="underline font-medium text-[#0F0F0F] hover:text-[#F3645C]">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" onClick={close} className="underline font-medium text-[#0F0F0F] hover:text-[#F3645C]">Privacy Policy</Link>.
        </p>

        <p className="text-center text-[15px] text-[#333333]">
          Already have an account?{' '}
          <button type="button" onClick={() => setTab('login')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
            Login
          </button>
        </p>
      </div>
    );
  }

  // Email + password signup form
  if (view === 'email-password') {
    return (
      <div className="space-y-5">
        <button type="button" onClick={() => { setView('methods'); resetForm(); }} className="flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center">
          <h2 className="text-[24px] font-black text-[#0F0F0F] tracking-tight">Sign up with Email</h2>
        </div>

        {error && <ErrorBanner message={error} />}

        <form onSubmit={handlePasswordSignup} className="space-y-4" noValidate>
          <InputField
            id="signup-name"
            label="Full Name"
            value={name}
            onChange={(v) => { setName(v); setFieldErrors((p) => ({ ...p, name: '' })); }}
            placeholder="Your full name"
            autoComplete="name"
            disabled={isLoading}
            icon={<User className="w-4 h-4" />}
            error={fieldErrors.name}
          />
          <InputField
            id="signup-email"
            label="Email Address"
            type="email"
            value={identifier}
            onChange={(v) => { setIdentifier(v); setFieldErrors((p) => ({ ...p, identifier: '' })); }}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isLoading}
            icon={<Mail className="w-4 h-4" />}
            error={fieldErrors.identifier}
          />
          <div>
            <InputField
              id="signup-password"
              label="Password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(v) => { setPassword(v); setFieldErrors((p) => ({ ...p, password: '' })); }}
              placeholder="Create a strong password"
              autoComplete="new-password"
              disabled={isLoading}
              icon={<Lock className="w-4 h-4" />}
              error={fieldErrors.password}
              rightEl={
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#9ca3af] hover:text-[#333333] cursor-pointer" aria-label="Toggle password">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <PasswordStrength password={password} />
          </div>
          <div>
            <InputField
              id="signup-confirm"
              label="Confirm Password"
              type={showConfirmPw ? 'text' : 'password'}
              value={confirmPw}
              onChange={(v) => { setConfirmPw(v); setFieldErrors((p) => ({ ...p, confirmPw: '' })); }}
              placeholder="Repeat your password"
              autoComplete="new-password"
              disabled={isLoading}
              icon={<Lock className="w-4 h-4" />}
              error={fieldErrors.confirmPw}
              rightEl={
                <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="text-[#9ca3af] hover:text-[#333333] cursor-pointer" aria-label="Toggle confirm password">
                  {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            {confirmPw && password && password === confirmPw && !fieldErrors.confirmPw && (
              <p className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setFieldErrors((p) => ({ ...p, agreed: '' })); }}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#F3645C] focus:ring-[#F3645C] cursor-pointer shrink-0"
              />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <Link href="/terms" onClick={close} className="font-semibold text-[#0F0F0F] hover:text-[#F3645C] underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" onClick={close} className="font-semibold text-[#0F0F0F] hover:text-[#F3645C] underline">Privacy Policy</Link>
              </span>
            </label>
            {fieldErrors.agreed && <p className="text-xs font-medium text-red-600 ml-6">{fieldErrors.agreed}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#0F0F0F] hover:bg-[#333333] text-white font-bold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(15,15,15,0.12)]" /></div>
          <span className="relative px-3 bg-white text-xs text-[#9ca3af] font-medium">or</span>
        </div>

        <div className="space-y-2.5">
          <button type="button" onClick={() => { resetForm(); setView('email-otp'); }} className="w-full py-3 rounded-xl border border-[rgba(15,15,15,0.12)] text-sm font-semibold text-[#333333] hover:bg-[#F8F8F6] transition-all text-center">
            Sign up with Email OTP instead
          </button>
          <button type="button" onClick={() => { resetForm(); setView('phone-otp'); }} className="w-full py-3 rounded-xl border border-[rgba(15,15,15,0.12)] text-sm font-semibold text-[#333333] hover:bg-[#F8F8F6] transition-all text-center">
            Sign up with Phone OTP instead
          </button>
        </div>

        <p className="text-center text-[15px] text-[#333333]">
          Already have an account?{' '}
          <button type="button" onClick={() => setTab('login')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
            Login
          </button>
        </p>
      </div>
    );
  }

  // OTP signup form (email-otp or phone-otp)
  const isPhone = view === 'phone-otp';
  return (
    <div className="space-y-5">
      <button type="button" onClick={() => { setView('methods'); resetForm(); }} className="flex items-center gap-1.5 text-sm font-semibold text-[#333333] hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="text-center">
        <h2 className="text-[24px] font-black text-[#0F0F0F] tracking-tight">
          {isPhone ? 'Sign up with Phone' : 'Sign up with Email OTP'}
        </h2>
        <p className="text-sm text-[#333333] mt-1">We'll send a code to verify your {isPhone ? 'number' : 'email'}.</p>
      </div>

      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
        <InputField
          id="signup-otp-name"
          label="Full Name"
          value={name}
          onChange={(v) => { setName(v); setFieldErrors((p) => ({ ...p, name: '' })); }}
          placeholder="Your full name"
          autoComplete="name"
          disabled={isSending}
          icon={<User className="w-4 h-4" />}
          error={fieldErrors.name}
        />
        <InputField
          id="signup-otp-id"
          label={isPhone ? 'Phone Number' : 'Email Address'}
          type={isPhone ? 'tel' : 'email'}
          value={identifier}
          onChange={(v) => { setIdentifier(v); setFieldErrors((p) => ({ ...p, identifier: '' })); }}
          placeholder={isPhone ? '+1 555 000 0000' : 'you@example.com'}
          autoComplete={isPhone ? 'tel' : 'email'}
          disabled={isSending}
          icon={isPhone ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          error={fieldErrors.identifier}
        />

        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); setFieldErrors((p) => ({ ...p, agreed: '' })); }}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#F3645C] focus:ring-[#F3645C] cursor-pointer shrink-0"
            />
            <span className="text-sm text-slate-600">
              I agree to the{' '}
              <Link href="/terms" onClick={close} className="font-semibold text-[#0F0F0F] hover:text-[#F3645C] underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" onClick={close} className="font-semibold text-[#0F0F0F] hover:text-[#F3645C] underline">Privacy Policy</Link>
            </span>
          </label>
          {fieldErrors.agreed && <p className="text-xs font-medium text-red-600 ml-6">{fieldErrors.agreed}</p>}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="w-full py-3.5 rounded-xl bg-[#0F0F0F] hover:bg-[#333333] text-white font-bold text-[15px] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSending ? 'Sending code...' : 'Send Code'}
        </button>
      </form>

      <p className="text-center text-[15px] text-[#333333]">
        Already have an account?{' '}
        <button type="button" onClick={() => setTab('login')} className="font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors">
          Login
        </button>
      </p>
    </div>
  );
}

// --- Root Modal ---------------------------------------------------------------

export default function AuthModal() {
  const { isOpen, tab, redirectTo, close } = useAuthModalStore();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'login' ? 'Sign in' : 'Create account'}
        className="relative w-full max-w-[440px] bg-[#F8F8F6] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#333333] hover:text-slate-800 transition-all shadow-sm cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable content */}
        <div className="px-8 py-8 max-h-[90vh] overflow-y-auto">
          {tab === 'login'
            ? <LoginPanel redirectTo={redirectTo} />
            : <SignupPanel redirectTo={redirectTo} />
          }
        </div>
      </div>
    </div>
  );
}
