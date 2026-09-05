/**
 * POST /api/auth/otp/send
 * Sends an OTP to email or phone.
 * Compatible with Cloudflare Workers (no Buffer, no Node-only APIs).
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { sendSms } from '@/lib/sms';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

const OTP_EXPIRY_MINUTES = 10;
const OTP_LENGTH = 6;

/** Cryptographically secure numeric OTP */
function generateOtp(length = OTP_LENGTH): string {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => (n % 10).toString()).join('');
}

/**
 * HMAC-SHA256 OTP hash.
 * Uses only Web Crypto + Uint8Array — no Buffer, works on Cloudflare Workers.
 */
export async function hashOtp(otp: string): Promise<string> {
  const secret = process.env.JWT_SECRET || 'otp-secret-fallback';
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(otp));
  const bytes = new Uint8Array(sigBuffer);
  // hex encode without Buffer
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time comparison */
export async function verifyOtp(otp: string, hash: string): Promise<boolean> {
  const expected = await hashOtp(otp);
  if (expected.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ hash.charCodeAt(i);
  }
  return diff === 0;
}

/** Upsert via findFirst + update/create — no named unique constraint required */
async function saveOtpToken(
  identifier: string,
  identifierType: string,
  purpose: string,
  hashedOtp: string,
  expiresAt: Date,
) {
  const existing = await prisma.otpToken.findFirst({
    where: { identifier, purpose },
    select: { id: true },
  });

  if (existing) {
    await prisma.otpToken.update({
      where: { id: existing.id },
      data: { otp: hashedOtp, attempts: 0, expiresAt },
    });
  } else {
    await prisma.otpToken.create({
      data: { identifier, identifierType, otp: hashedOtp, purpose, attempts: 0, expiresAt },
    });
  }
}

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'auth_otp_send',
  });
  if (!rateLimit.success) {
    return createRateLimitResponse(rateLimit.retryAfter, 'Too many OTP requests. Please try again later.');
  }

  try {
    const body = await req.json();
    const { identifier, identifierType, purpose } = body;

    if (!identifier || !identifierType || !purpose) {
      return NextResponse.json({ error: 'identifier, identifierType, and purpose are required.' }, { status: 400 });
    }
    if (!['email'].includes(identifierType)) {
      return NextResponse.json({ error: 'identifierType must be "email". Phone OTP is not supported.' }, { status: 400 });
    }
    if (!['login', 'signup'].includes(purpose)) {
      return NextResponse.json({ error: 'purpose must be "login" or "signup".' }, { status: 400 });
    }

    const normalized = identifier.trim().toLowerCase();

    // For login, check user exists (anti-enumeration: always 200 if not found)
    if (purpose === 'login') {
      let user = null;
      if (identifierType === 'email') {
        user = await prisma.user.findUnique({
          where: { email: normalized },
          select: { id: true, isBanned: true, isActive: true },
        });
      } else {
        // Try lowercase first, then original casing
        user = await prisma.user.findFirst({
          where: { phone: normalized },
          select: { id: true, isBanned: true, isActive: true },
        });
        if (!user) {
          user = await prisma.user.findFirst({
            where: { phone: identifier.trim() },
            select: { id: true, isBanned: true, isActive: true },
          });
        }
      }

      if (!user) {
        return NextResponse.json(
          { success: true, message: 'If that account exists, an OTP has been sent.' },
          { status: 200 },
        );
      }
      if (user.isBanned) return NextResponse.json({ error: 'Account has been banned.' }, { status: 403 });
      if (!user.isActive) return NextResponse.json({ error: 'Account is inactive.' }, { status: 403 });
    }

    // Generate, hash, store
    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await saveOtpToken(normalized, identifierType, purpose, hashedOtp, expiresAt);

    // ── Deliver OTP ───────────────────────────────────────────────────────
    if (identifierType === 'email') {
      await sendEmail({
        to: normalized,
        subject: `Your GetEasyCV verification code: ${otp}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#334155;">
            <h2 style="color:#0f172a;margin-bottom:8px;">Your One-Time Password</h2>
            <p style="margin-bottom:20px;color:#64748b;">
              Use the code below to ${purpose === 'login' ? 'sign in to' : 'verify your'}
              GetEasyCV account. It expires in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>.
            </p>
            <div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:12px;
                        padding:20px 24px;text-align:center;margin:20px 0;">
              <span style="font-size:36px;font-weight:900;letter-spacing:12px;
                           color:#4F39F6;font-family:monospace;">${otp}</span>
            </div>
            <p style="font-size:12px;color:#94a3b8;margin-top:20px;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>`,
      });

      return NextResponse.json({ success: true, message: 'OTP sent to your email.' }, { status: 200 });
    }

    // Deliver SMS OTP
    const smsResult = await sendSms({
      to: normalized,
      otp,
      message: `Your GetEasyCV verification code is: ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    });

    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json(
        {
          success: true,
          message: 'OTP sent to your phone number.',
          _dev_otp: otp,
          _dev_note: 'Development mode active. Use this code to verify.',
          provider: smsResult?.provider || 'simulated',
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, message: 'OTP sent to your phone number.' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[OTP_SEND_ERROR]', err);
    const msg =
      process.env.NODE_ENV !== 'production' && err instanceof Error
        ? err.message
        : 'Failed to send OTP. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
