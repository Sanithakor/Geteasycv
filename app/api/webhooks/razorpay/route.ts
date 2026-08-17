import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendPaymentSuccessEmail, sendSubscriptionCancelEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify HMAC-SHA256 signature if webhook secret is configured
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('[RAZORPAY_WEBHOOK_INVALID_SIGNATURE]', { signature, expectedSignature });
        return NextResponse.json({ error: 'Invalid Razorpay webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity || {};

    console.log(`[RAZORPAY_WEBHOOK] Received event: ${event}`);

    const notes = entity.notes || {};
    const userId = notes.userId;
    const plan = notes.plan || 'pro';
    const razorpayOrderId = entity.order_id || entity.id;
    const razorpayPaymentId = entity.id;

    if (event === 'payment.captured' || event === 'order.paid') {
      if (userId) {
        // Update user subscription tier
        const user = await (prisma.user as any).update({
          where: { id: userId },
          data: {
            subscriptionTier: plan,
            subscriptionStatus: 'active',
            updatedAt: new Date(),
          },
        });

        // Upsert subscription
        await (prisma.subscription as any).upsert({
          where: { userId },
          create: {
            userId,
            plan,
            status: 'active',
            razorpayOrderId,
            razorpayPaymentId,
            currentPeriodStart: new Date(),
            currentPeriodEnd: plan === 'lifetime' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          update: {
            plan,
            status: 'active',
            razorpayOrderId,
            razorpayPaymentId,
            currentPeriodStart: new Date(),
            currentPeriodEnd: plan === 'lifetime' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
          },
        });

        // Record payment if not existing
        const existingPayment = await (prisma.payment as any).findUnique({
          where: { razorpayOrderId: razorpayOrderId },
        });

        if (!existingPayment) {
          const amountInRupees = entity.amount ? Math.round(entity.amount / 100) : 199;
          await (prisma.payment as any).create({
            data: {
              userId,
              amount: amountInRupees,
              currency: 'INR',
              status: 'completed',
              razorpayOrderId,
              razorpayPaymentId,
              userEmail: user.email,
              description: `Razorpay Payment for ${plan.toUpperCase()} Plan`,
            },
          });

          if (user.email) {
            sendPaymentSuccessEmail(user.email, plan.toUpperCase(), `₹${amountInRupees}`).catch(() => {});
          }
        }
      }
    } else if (event === 'subscription.cancelled' || event === 'subscription.halted') {
      if (userId) {
        await (prisma.subscription as any).update({
          where: { userId },
          data: { status: 'canceled', canceledAt: new Date() },
        });

        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (user?.email) {
          sendSubscriptionCancelEmail(user.email).catch(() => {});
        }
      }
    }

    return NextResponse.json({ status: 'success', event });
  } catch (error: any) {
    console.error('[RAZORPAY_WEBHOOK_ERROR]', error);
    return NextResponse.json({ error: 'Razorpay Webhook processing failed' }, { status: 500 });
  }
}
