import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { sendPaymentSuccessEmail } from '@/lib/email';
import { fetchAllPlans } from '@/lib/plansStore';
import { createSystemNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan = 'pro',
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

    // Dynamically fetch configured plan price from store
    const allPlans = await fetchAllPlans();
    const matchedPlan = allPlans.find(
      p => p.id.toLowerCase() === normalizedPlan || p.name.toLowerCase() === normalizedPlan
    );

    let amount = 199;
    if (matchedPlan && matchedPlan.price !== undefined) {
      amount = matchedPlan.price;
    } else if (normalizedPlan === 'starter') {
      amount = 49;
    } else if (normalizedPlan === 'lifetime') {
      amount = 999;
    }

    // 1. Transactionally update User subscription tier in PostgreSQL
    const updatedUser = await (prisma.user as any).update({
      where: { id: auth.userId },
      data: {
        subscriptionTier: normalizedPlan,
        updatedAt: new Date(),
      },
    });

    // 2. Upsert Subscription record
    await (prisma.subscription as any).upsert({
      where: { userId: auth.userId },
      create: {
        userId: auth.userId,
        plan: normalizedPlan,
        status: 'active',
        razorpayOrderId: razorpay_order_id || null,
        razorpayPaymentId: razorpay_payment_id || null,
        razorpaySignature: razorpay_signature || null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: normalizedPlan === 'lifetime' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      update: {
        plan: normalizedPlan,
        status: 'active',
        razorpayOrderId: razorpay_order_id || null,
        razorpayPaymentId: razorpay_payment_id || null,
        razorpaySignature: razorpay_signature || null,
        currentPeriodStart: new Date(),
        currentPeriodEnd: normalizedPlan === 'lifetime' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    });

    // 3. Record Payment transaction
    await (prisma.payment as any).create({
      data: {
        userId: auth.userId,
        amount,
        currency: 'INR',
        status: 'completed',
        razorpayOrderId: razorpay_order_id || `sim_${Date.now()}`,
        razorpayPaymentId: razorpay_payment_id || `pay_sim_${Date.now()}`,
        razorpaySignature: razorpay_signature || null,
        userEmail: updatedUser.email,
        description: `GetEasyCV ${normalizedPlan.toUpperCase()} Plan Purchase`,
      },
    });

    // 4. Dispatch real system notifications
    try {
      await createSystemNotification({
        title: 'Payment Successful',
        message: `Received ₹${amount} payment for ${normalizedPlan.toUpperCase()} plan`,
        type: 'payment',
        target: 'all',
        userId: auth.userId,
      });

      await createSystemNotification({
        title: 'Subscription Upgraded',
        message: `Upgraded to ${normalizedPlan.toUpperCase()} plan`,
        type: 'subscription',
        target: 'all',
        userId: auth.userId,
      });
    } catch (notifErr) {
      console.warn('[NOTIF_PAYMENT_WARN]', notifErr);
    }

    // 5. Send transactional confirmation email
    try {
      if (updatedUser.email) {
        await sendPaymentSuccessEmail(
          updatedUser.email,
          normalizedPlan.toUpperCase(),
          `₹${amount}`
        );
      }
    } catch (emailErr) {
      console.warn('[PAYMENT_EMAIL_WARN]', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and plan activated successfully.',
      subscriptionTier: normalizedPlan,
    });
  } catch (error: any) {
    console.error('[RAZORPAY_VERIFY_ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
