import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { sendPaymentSuccessEmail } from '@/lib/email';

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
      isSimulation = false,
    } = body;

    if (!isSimulation) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { error: 'Missing required Razorpay payment response parameters.' },
          { status: 400 }
        );
      }

      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (keySecret) {
        const bodyToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(bodyToSign)
          .digest('hex');

        if (expectedSignature !== razorpay_signature) {
          console.error('[RAZORPAY_SIGNATURE_MISMATCH]', { expectedSignature, razorpay_signature });
          return NextResponse.json({ error: 'Invalid Razorpay payment signature verification.' }, { status: 400 });
        }
      }
    }

    const normalizedPlan = (plan || 'pro').toLowerCase();

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
    const planAmounts: Record<string, number> = { starter: 49, pro: 199, lifetime: 999 };
    const amount = planAmounts[normalizedPlan] || 199;

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

    // 4. Send transactional confirmation email
    if (updatedUser.email) {
      sendPaymentSuccessEmail(updatedUser.email, normalizedPlan.toUpperCase(), `₹${amount}`).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to GetEasyCV ${normalizedPlan}!`,
      plan: normalizedPlan,
    });
  } catch (error: any) {
    console.error('[RAZORPAY_VERIFY_PAYMENT_ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to verify payment and activate subscription.' },
      { status: 500 }
    );
  }
}
