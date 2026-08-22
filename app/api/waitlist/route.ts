import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: Request) {
  // Rate Limit: 5 registrations per 15 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'waitlist_signup',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many requests. Please wait a few minutes before trying again.'
    );
  }

  try {
    const body = await req.json();
    const { email } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();

    try {
      await prisma.waitlist.upsert({
        where: { email: sanitizedEmail },
        update: {},
        create: { email: sanitizedEmail },
      });
    } catch (dbErr) {
      console.warn('[WAITLIST_DB_WARN] Storing waitlist entry in log:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for joining the GetEasyCV waitlist! We'll notify you as soon as we launch.",
    });
  } catch (error) {
    console.error('[WAITLIST_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process waitlist signup. Please try again.' },
      { status: 500 }
    );
  }
}
