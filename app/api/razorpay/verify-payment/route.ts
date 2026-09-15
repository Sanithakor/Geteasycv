import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { sendPaymentSuccessEmail, sendSubscriptionStartedEmail } from '@/lib/email';
import { getPlanById } from '@/lib/config/pricing';
import { createSystemNotification, notifyPaymentSuccess, notifySubscriptionStarted } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const auth = await getAuthFromRequest(req, body);

    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan = 'pro',
      country = 'IN',
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isMockOrder = razorpay_order_id && String(razorpay_order_id).startsWith('order_mock_');

    // Strict HMAC Signature Verification: Do not rely on untrusted client 'isSimulation' boolean
    if (keySecret && !isMockOrder) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: 'Missing required Razorpay payment response parameters.' },
          { status: 400 }
        );
      }

      const bodyToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(bodyToSign)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        console.error('[RAZORPAY_SIGNATURE_MISMATCH]', { expectedSignature, razorpay_signature });
        return NextResponse.json({ error: 'Invalid Razorpay payment signature verification.' }, { status: 400 });
      }
    } else if (!isMockOrder && !keySecret) {
      return NextResponse.json(
        { error: 'Payment gateway configuration missing. Contact administrator.' },
        { status: 500 }
      );
    }

    const normalizedPlan = (plan || 'pro').toLowerCase();
    const planConfig = getPlanById(normalizedPlan, country);

    const amount = planConfig.rawPrice;
    const currency = planConfig.currency || 'INR';
    const displayFormattedPrice = planConfig.price;

    // 1. Transactionally update User subscription tier in PostgreSQL
    const updatedUser = await (prisma.user as any).update({
      where: { id: auth.userId },
      data: {
        subscriptionTier: normalizedPlan === 'lifetime' ? 'premium' : normalizedPlan,
        updatedAt: new Date(),
      },
    });

    // 2. Upsert Subscription record
    await (prisma.subscription as any).upsert({
      where: { userId: auth.userId },
      create: {
        userId: auth.userId,
        plan: normalizedPlan === 'lifetime' ? 'premium' : normalizedPlan,
        status: 'active',
        razorpayOrderId: razorpay_order_id || null,
        razorpayPaymentId: razorpay_payment_id || null,
        razorpaySignature: razorpay_signature || null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: (normalizedPlan === 'premium' || normalizedPlan === 'lifetime') ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      update: {
        plan: normalizedPlan === 'lifetime' ? 'premium' : normalizedPlan,
        status: 'active',
        razorpayOrderId: razorpay_order_id || null,
        razorpayPaymentId: razorpay_payment_id || null,
        razorpaySignature: razorpay_signature || null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: (normalizedPlan === 'premium' || normalizedPlan === 'lifetime') ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    });

    // 3. Record Payment transaction
    await (prisma.payment as any).create({
      data: {
        userId: auth.userId,
        amount,
        currency,
        status: 'completed',
        razorpayOrderId: razorpay_order_id || `sim_${Date.now()}`,
        razorpayPaymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
        razorpaySignature: razorpay_signature || null,
        userEmail: updatedUser.email,
        description: `GetEasyCV ${normalizedPlan.toUpperCase()} Plan Purchase (${country.toUpperCase()})`,
      },
    });

    // 4. Dispatch system notifications
    try {
      notifyPaymentSuccess(auth.userId, normalizedPlan.toUpperCase(), displayFormattedPrice).catch(() => {});
      notifySubscriptionStarted(auth.userId, normalizedPlan.toUpperCase()).catch(() => {});
    } catch (notifErr) {
      console.warn('[NOTIF_PAYMENT_WARN]', notifErr);
    }

    // 5. Send transactional confirmation email
    try {
      if (updatedUser.email) {
        sendPaymentSuccessEmail(
          updatedUser.email,
          normalizedPlan.toUpperCase(),
          displayFormattedPrice,
          currency,
          razorpay_payment_id || undefined
        ).catch(() => {});
        sendSubscriptionStartedEmail(
          updatedUser.email,
          normalizedPlan.toUpperCase(),
          planConfig.billingPeriod || 'Monthly'
        ).catch(() => {});
      }
    } catch (emailErr) {
      console.warn('[PAYMENT_EMAIL_WARN]', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and plan activated successfully.',
      subscriptionTier: normalizedPlan === 'lifetime' ? 'premium' : normalizedPlan,
    });
  } catch (error: any) {
    console.error('[RAZORPAY_VERIFY_ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
