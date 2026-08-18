'use client';

/**
 * AuthModal — Full-featured login + signup modal with:
 *   - Tab switching (Login / Sign Up)
 *   - Email/password and Google OAuth flows
 *   - Inline OTP flow (email or phone)
 *   - Consistent validation & error design
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  X,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  ArrowLeft,
  Info,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';

// ─── helpers ────────────────────────────────────────────────────────────────

function ErrorAlert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200"
      role="alert"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
      <p className="text-xs font-semibold text-rose-600 leading-relaxed">{message}</p>
    </div>
  );
}

function SuccessAlert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
      <p className="text-xs font-semibold text-emerald-700 leading-relaxed">{message}</p>
    </div>
  );
}

const GOOGLE_LOGO = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function getPasswordStrength(p: string) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[@$!%*?&]/.test(p)) s++;
  return Math.max(1, s);
}
const STRENGTH_COLORS = ['', 'bg-rose-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-500'];
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_TEXT   = ['', 'text-rose-500', 'text-amber-600', 'text-sky-600', 'text-emerald-600'];

// ─── OTP step ────────────────────────────────────────────────────────────────

interface OtpStepProps {
  identifier: string;
  identifierType: 'email' | 'phone';
  purpose: 'login' | 'signup';
  name?: string;
  redirectTo: string;
  onBack: () => void;
  onSuccess: () => void;
}

function OtpStep({ identifier, identifierType, purpose, name, redirectTo, onBack, onSuccess }: OtpStepProps) {
  const router = useRouter();
  const { close } = useAuthModalStore();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleVerify = async () => {
    setError('');
    const clean = otp.replace(/\s/g, '');
    if (!/^\d{6}$/.test(clean)) {
      setError('Enter the 6-digit code we sent you.');
      return;
    }
    setIsVerifying(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, identifierType, otp: clean, purpose, name }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Verification failed.'); return; }

      // Hydrate auth store
      const user = {
        ...data.user,
        tier: data.user.subscriptionTier ?? data.user.tier ?? 'free',
      };
      delete user.subscriptionTier;
      useAuthStore.setState({ user, token: data.token, isAuthenticated: true, _hydrated: true });

      onSuccess();
      close();
      router.push(data.user?.role === 'admin' ? '/admin' : redirectTo);
    } catch {
      setError('Unable to connect. Please try again.');
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
      if (!res.ok) { setError(data.error || 'Failed to resend code.'); return; }
      setSuccess('A new code has been sent.');
      setCountdown(60);
      setOtp('');
    } catch {
      setError('Unable to send code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Enter your code</h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-slate-700">{identifier}</span>.
          It expires in 10 minutes.
        </p>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}

      <div>
        <label htmlFor="otp" className="block text-xs font-bold text-slate-700 mb-1.5">
          Verification Code
        </label>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={otp}
          onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
          placeholder="000000"
          className="w-full text-center tracking-[0.5em] py-3.5 rounded-xl border border-slate-200 bg-slate-50/40 text-base font-bold text-slate-900 placeholder:text-slate-300 placeholder:tracking-[0.3em] focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
          autoFocus
        />
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying || otp.length < 6}
        className="w-full py-3 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isVerifying && <Loader2 className="w-4 h-4 animate-spin" />}
        {isVerifying ? 'Verifying...' : 'Verify Code'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Didn't get it?{' '}
        {countdown > 0 ? (
          <span className="font-semibold text-slate-400">Resend in {countdown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-bold text-[#4F39F6] hover:underline disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        )}
      </p>
    </div>
  );
}

// ─── Login tab ───────────────────────────────────────────────────────────────

type LoginMethod = 'email-password' | 'email-otp' | 'phone-otp';

interface LoginTabProps {
  redirectTo: string;
  onSuccess: () => void;
}

function LoginTab({ redirectTo, onSuccess }: LoginTabProps) {
  const router = useRouter();
  const { close } = useAuthModalStore();
  const { login, isLoading, clearError } = useAuthStore();

  const [method, setMethod] = useState<LoginMethod>('email-password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpIdentifier, setOtpIdentifier] = useState('');
  const [otpIdentifierType, setOtpIdentifierType] = useState<'email' | 'phone'>('email');

  const reset = useCallback(() => {
    setError('');
    setIdentifier('');
    setPassword('');
    setShowOtpStep(false);
    clearError();
  }, [clearError]);

  useEffect(() => { reset(); }, [method, reset]);

  // ── email+password submit
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!identifier.trim()) { setError('Email address is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) { setError('Please enter a valid email address.'); return; }
    if (!password) { setError('Password is required.'); return; }
    try {
      await login(identifier.trim().toLowerCase(), password);
      const u = useAuthStore.getState().user;
      onSuccess();
      close();
      router.push(u?.role === 'admin' ? '/admin' : redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  // ── OTP send
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const idType = method === 'phone-otp' ? 'phone' : 'email';
    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed) { setError(`${idType === 'phone' ? 'Phone number' : 'Email address'} is required.`); return; }
    if (idType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.'); return;
    }
    if (idType === 'phone' && !/^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s\-()]/g, ''))) {
      setError('Please enter a valid phone number (e.g. +15551234567).'); return;
    }
    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, identifierType: idType, purpose: 'login' }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send code. Please try again.'); return; }
      setOtpIdentifier(trimmed);
      setOtpIdentifierType(idType);
      setShowOtpStep(true);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ── Google
  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();
      if (result.success && result.user) {
        const user = { ...result.user, tier: result.user.subscriptionTier ?? result.user.tier ?? 'free' };
        delete user.subscriptionTier;
        useAuthStore.setState({ user, token: result.token ?? null, isAuthenticated: true, _hydrated: true });
        onSuccess();
        close();
        router.push(result.user?.role === 'admin' ? '/admin' : redirectTo);
      } else {
        setError(result.error || 'Google sign-in failed. Please try again.');
      }
    } catch {
      setError('Failed to sign in with Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (showOtpStep) {
    return (
      <OtpStep
        identifier={otpIdentifier}
        identifierType={otpIdentifierType}
        purpose="login"
        redirectTo={redirectTo}
        onBack={() => setShowOtpStep(false)}
        onSuccess={onSuccess}
      />
    );
  }

  const isOtpMethod = method === 'email-otp' || method === 'phone-otp';
  const idLabel = method === 'phone-otp' ? 'Phone Number' : 'Email Address';
  const idPlaceholder = method === 'phone-otp' ? '+1 555 123 4567' : 'you@example.com';
  const IdIcon = method === 'phone-otp' ? Phone : Mail;

  return (
    <div className="space-y-4">
      {/* Method toggle pills */}
      <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
        {(
          [
            { key: 'email-password', label: 'Password' },
            { key: 'email-otp',     label: 'Email OTP' },
            { key: 'phone-otp',     label: 'Phone OTP' },
          ] as { key: LoginMethod; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMethod(key)}
            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
              method === key
                ? 'bg-white text-[#4F39F6] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <ErrorAlert message={error} />}

      <form onSubmit={isOtpMethod ? handleSendOtp : handlePasswordLogin} className="space-y-3" noValidate>
        {/* Identifier field */}
        <div>
          <label htmlFor="login-identifier" className="block text-xs font-bold text-slate-700 mb-1.5">
            {idLabel}
          </label>
          <div className="relative">
            <IdIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="login-identifier"
              type={method === 'phone-otp' ? 'tel' : 'email'}
              autoComplete={method === 'phone-otp' ? 'tel' : 'email'}
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
              placeholder={idPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
              disabled={isLoading || isSendingOtp}
            />
          </div>
        </div>

        {/* Password field — only for email-password method */}
        {method === 'email-password' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-xs font-bold text-slate-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                onClick={() => close()}
                className="text-[11px] font-bold text-[#4F39F6] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isSendingOtp}
          className="w-full py-3 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] text-white font-bold text-sm shadow-md shadow-[#4F39F6]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {(isLoading || isSendingOtp) && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading || isSendingOtp
            ? isOtpMethod ? 'Sending code...' : 'Logging in...'
            : isOtpMethod ? 'Send Code' : 'Login'}
        </button>
      </form>

      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
        <span className="relative px-3 bg-white text-[11px] font-medium text-slate-400">or</span>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={isGoogleLoading || isLoading}
        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {GOOGLE_LOGO}
        {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
      </button>
    </div>
  );
}

// ─── Signup tab ──────────────────────────────────────────────────────────────

type SignupMethod = 'email-password' | 'email-otp' | 'phone-otp';

interface SignupTabProps {
  redirectTo: string;
  onSuccess: () => void;
}

function SignupTab({ redirectTo, onSuccess }: SignupTabProps) {
  const router = useRouter();
  const { close } = useAuthModalStore();
  const { signup, isLoading, clearError } = useAuthStore();

  const [method, setMethod] = useState<SignupMethod>('email-password');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpIdentifier, setOtpIdentifier] = useState('');
  const [otpIdentifierType, setOtpIdentifierType] = useState<'email' | 'phone'>('email');

  const reset = useCallback(() => {
    setError('');
    setIdentifier('');
    setPassword('');
    setConfirmPassword('');
    setShowOtpStep(false);
    clearError();
  }, [clearError]);

  useEffect(() => { reset(); }, [method, reset]);

  const isOtpMethod = method === 'email-otp' || method === 'phone-otp';
  const strength = getPasswordStrength(password);

  const handlePasswordSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || name.trim().length < 2) { setError('Full name must be at least 2 characters.'); return; }
    if (!identifier.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())) { setError('Please enter a valid email address.'); return; }
    if (!password) { setError('Password is required.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!/[A-Z]/.test(password)) { setError('Password must contain an uppercase letter.'); return; }
    if (!/[a-z]/.test(password)) { setError('Password must contain a lowercase letter.'); return; }
    if (!/[0-9]/.test(password)) { setError('Password must contain a number.'); return; }
    if (!/[@$!%*?&]/.test(password)) { setError('Password must contain a special character (@$!%*?&).'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (!agreeTerms) { setError('You must agree to the Terms of Service and Privacy Policy.'); return; }

    try {
      await signup(identifier.trim().toLowerCase(), password, name.trim());
      const u = useAuthStore.getState().user;
      onSuccess();
      close();
      router.push(u?.role === 'admin' ? '/admin' : redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || name.trim().length < 2) { setError('Full name must be at least 2 characters.'); return; }
    const idType = method === 'phone-otp' ? 'phone' : 'email';
    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed) { setError(`${idType === 'phone' ? 'Phone number' : 'Email address'} is required.`); return; }
    if (idType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError('Please enter a valid email address.'); return; }
    if (idType === 'phone' && !/^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s\-()]/g, ''))) { setError('Please enter a valid phone number (e.g. +15551234567).'); return; }
    if (!agreeTerms) { setError('You must agree to the Terms of Service and Privacy Policy.'); return; }
    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, identifierType: idType, purpose: 'signup' }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to send code.'); return; }
      setOtpIdentifier(trimmed);
      setOtpIdentifierType(idType);
      setShowOtpStep(true);
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { triggerGoogleSignIn } = await import('@/lib/auth/googleAuth');
      const result = await triggerGoogleSignIn();
      if (result.success && result.user) {
        const user = { ...result.user, tier: result.user.subscriptionTier ?? result.user.tier ?? 'free' };
        delete user.subscriptionTier;
        useAuthStore.setState({ user, token: result.token ?? null, isAuthenticated: true, _hydrated: true });
        onSuccess();
        close();
        router.push(result.user?.role === 'admin' ? '/admin' : redirectTo);
      } else {
        setError(result.error || 'Google sign-up failed. Please try again.');
      }
    } catch {
      setError('Failed to sign up with Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (showOtpStep) {
    return (
      <OtpStep
        identifier={otpIdentifier}
        identifierType={otpIdentifierType}
        purpose="signup"
        name={name.trim()}
        redirectTo={redirectTo}
        onBack={() => setShowOtpStep(false)}
        onSuccess={onSuccess}
      />
    );
  }

  const idLabel = method === 'phone-otp' ? 'Phone Number' : 'Email Address';
  const idPlaceholder = method === 'phone-otp' ? '+1 555 123 4567' : 'you@example.com';
  const IdIcon = method === 'phone-otp' ? Phone : Mail;

  return (
    <div className="space-y-4">
      {/* Method toggle pills */}
      <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
        {(
          [
            { key: 'email-password', label: 'Password' },
            { key: 'email-otp',     label: 'Email OTP' },
            { key: 'phone-otp',     label: 'Phone OTP' },
          ] as { key: SignupMethod; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMethod(key)}
            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
              method === key
                ? 'bg-white text-[#4F39F6] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <ErrorAlert message={error} />}

      <form
        onSubmit={isOtpMethod ? handleSendOtp : handlePasswordSignup}
        className="space-y-3"
        noValidate
      >
        {/* Name */}
        <div>
          <label htmlFor="signup-name" className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Your full name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
              disabled={isLoading || isSendingOtp}
            />
          </div>
        </div>

        {/* Identifier */}
        <div>
          <label htmlFor="signup-identifier" className="block text-xs font-bold text-slate-700 mb-1.5">
            {idLabel}
          </label>
          <div className="relative">
            <IdIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="signup-identifier"
              type={method === 'phone-otp' ? 'tel' : 'email'}
              autoComplete={method === 'phone-otp' ? 'tel' : 'email'}
              value={identifier}
              onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
              placeholder={idPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
              disabled={isLoading || isSendingOtp}
            />
          </div>
        </div>

        {/* Password fields — email-password only */}
        {method === 'email-password' && (
          <>
            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1,2,3,4].map((s) => (
                      <div key={s} className={`h-1 rounded-full transition-colors ${s <= strength ? STRENGTH_COLORS[strength] : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>8+ chars, uppercase, number &amp; @$!%*?&</span>
                      <Info className="w-3 h-3" />
                    </div>
                    {strength > 0 && <span className={`text-[10px] font-bold ${STRENGTH_TEXT[strength]}`}>{STRENGTH_LABELS[strength]}</span>}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4F39F6] focus:ring-2 focus:ring-[#4F39F6]/20 outline-none transition-all"
                  disabled={isLoading}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer" aria-label="Toggle confirm password">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-[10px] font-semibold text-rose-500">Passwords do not match.</p>
              )}
              {confirmPassword && password === confirmPassword && password.length > 0 && (
                <p className="mt-1 text-[10px] font-semibold text-emerald-600">Passwords match.</p>
              )}
            </div>
          </>
        )}

        {/* Terms */}
        <label className="flex items-start gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => { setAgreeTerms(e.target.checked); setError(''); }}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#4F39F6] focus:ring-[#4F39F6] cursor-pointer shrink-0"
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" onClick={() => close()} className="text-[#4F39F6] font-bold hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" onClick={() => close()} className="text-[#4F39F6] font-bold hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading || isSendingOtp}
          className="w-full py-3 rounded-xl bg-[#4F39F6] hover:bg-[#4330D9] text-white font-bold text-sm shadow-md shadow-[#4F39F6]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {(isLoading || isSendingOtp) && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading || isSendingOtp
            ? isOtpMethod ? 'Sending code...' : 'Creating account...'
            : isOtpMethod ? 'Send Code' : 'Create Account'}
        </button>
      </form>

      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
        <span className="relative px-3 bg-white text-[11px] font-medium text-slate-400">or</span>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={isGoogleLoading || isLoading}
        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {GOOGLE_LOGO}
        {isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}
      </button>
    </div>
  );
}

// ─── Root modal ──────────────────────────────────────────────────────────────

export default function AuthModal() {
  const { isOpen, tab, redirectTo, close, setTab } = useAuthModalStore();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'login' ? 'Sign in' : 'Create account'}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4F39F6] to-[#7C69FF] flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              Get<span className="text-[#4F39F6]">EasyCV</span>
            </span>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${
                tab === 'login'
                  ? 'border-[#4F39F6] text-[#4F39F6]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('signup')}
              className={`flex-1 pb-3 text-sm font-bold transition-all border-b-2 ${
                tab === 'signup'
                  ? 'border-[#4F39F6] text-[#4F39F6]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          {tab === 'login' ? (
            <LoginTab redirectTo={redirectTo} onSuccess={() => {}} />
          ) : (
            <SignupTab redirectTo={redirectTo} onSuccess={() => {}} />
          )}

          {/* Footer switch link */}
          <p className="mt-5 text-center text-xs text-slate-500 font-medium">
            {tab === 'login' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => setTab('signup')} className="text-[#4F39F6] font-bold hover:underline">
                  Sign Up
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} className="text-[#4F39F6] font-bold hover:underline">
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
