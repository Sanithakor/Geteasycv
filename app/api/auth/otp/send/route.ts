/**
 * POST /api/auth/otp/send
 *
 * Sends an OTP to the user's email or phone number.
 * Used for both login and signup OTP flows.
 *
 * Body: { identifier: string, identifierType: "email" | "phone", purpose: "login" | "signup" }
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

const OTP_EXPIRY_MINUTES = 10;
const OTP_LENGTH = 6;
const MAX_ATTEMPTS = 5;

/**
 * Generate a cryptographically secure numeric OTP
 */
function generateOtp(length: number = OTP_LENGTH): string {
  const digits = '0123456789';
  let otp = '';
  // Use crypto.getRandomValues for secure randomness
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    otp += digits[array[i] % digits.length];
  }
  return otp;
}

/**
 * Simple hash for OTP storage (not bcrypt — OTPs are short-lived and low value)
 * We use a HMAC-SHA256 based approach via SubtleCrypto for edge compatibility.
 */
async function hashOtp(otp: string): Promise<string> {
  const secret = process.env.JWT_SECRET || 'otp-secret-fallback';
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(otp));
  return Buffer.from(sig).toString('hex');
}

async function verifyOtp(otp: string, hash: string): Promise<boolean> {
  const expected = await hashOtp(otp);
  // Constant-time comparison
  if (expected.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ hash.charCodeAt(i);
  }
  return diff === 0;
}

export { verifyOtp, hashOtp };

export async function POST(req: Request) {
  // Rate limit: 5 OTP send requests per 15 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'auth_otp_send',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many OTP requests. Please try again later.'
    );
  }

  try {
    const body = await req.json();
    const { identifier, identifierType, purpose } = body;

    if (!identifier || !identifierType || !purpose) {
      return NextResponse.json(
        { error: 'identifier, identifierType, and purpose are required' },
        { status: 400 }
      );
    }

    if (!['email', 'phone'].includes(identifierType)) {
      return NextResponse.json(
        { error: 'identifierType must be "email" or "phone"' },
        { status: 400 }
      );
    }

    if (!['login', 'signup'].includes(purpose)) {
      return NextResponse.json(
        { error: 'purpose must be "login" or "signup"' },
        { status: 400 }
      );
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();

    // For login, verify user exists with this identifier
    if (purpose === 'login') {
      let user;
      if (identifierType === 'email') {
        user = await prisma.user.findUnique({ where: { email: normalizedIdentifier } });
      } else {
        user = await prisma.user.findFirst({ where: { phone: normalizedIdentifier } });
      }

      if (!user) {
        // Return 200 to prevent enumeration — UI already shows this notice
        return NextResponse.json(
          { success: true, message: 'If that account exists, an OTP has been sent.' },
          { status: 200 }
        );
      }

      if (user.isBanned) {
        return NextResponse.json({ error: 'Account has been banned' }, { status: 403 });
      }

      if (!user.isActive) {
        return NextResponse.json({ error: 'Account is inactive' }, { status: 403 });
      }
    }

    // Generate and store OTP
    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await prisma.otpToken.upsert({
      where: {
        identifier_purpose: {
          identifier: normalizedIdentifier,
          purpose,
        },
      },
      update: {
        otp: hashedOtp,
        attempts: 0,
        expiresAt,
      },
      create: {
        identifier: normalizedIdentifier,
        identifierType,
        otp: hashedOtp,
        purpose,
        attempts: 0,
        expiresAt,
      },
    });

    // Send OTP
    if (identifierType === 'email') {
      await sendEmail({
        to: normalizedIdentifier,
        subject: `Your GetEasyCV OTP Code: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #334155;">
            <h2 style="color: #0f172a; margin-bottom: 8px;">Your One-Time Password</h2>
            <p style="margin-bottom: 20px; color: #64748b;">Use the code below to ${purpose === 'login' ? 'sign in to' : 'verify your'} GetEasyCV account. This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
            <div style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; text-align: center; margin: 20px 0;">
              <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #4F39F6; font-family: monospace;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">If you did not request this code, please ignore this email. Do not share this code with anyone.</p>
          </div>
        `,
      });
    } else {
      // Phone OTP — log to console in dev (SMS integration would go here)
      console.log(`[OTP_SMS_DEV] Phone OTP for ${normalizedIdentifier}: ${otp}`);
      // In production, integrate an SMS provider (Twilio, AWS SNS, etc.)
      // For now we return it in dev mode only
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({
          success: true,
          message: 'OTP sent successfully.',
          _dev_otp: otp, // Only in development
        });
      }
    }

    return NextResponse.json(
      { success: true, message: 'OTP sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OTP_SEND_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
