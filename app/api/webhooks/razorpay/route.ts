import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import {
  sendPaymentSuccessEmail,
  sendPaymentFailedEmail,
  sendSubscriptionStartedEmail,
  sendSubscriptionRenewedEmail,
  sendSubscriptionCancelledEmail,
  sendRefundCompletedEmail,
} from '@/lib/email';
import {
  notifyPaymentSuccess,
  notifyPaymentFailed,
  notifySubscriptionStarted,
  notifySubscriptionRenewed,
  notifySubscriptionCancelled,
  notifyRefundCompleted,
} from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Webhook secret must be configured — reject requests if it is missing
    if (!secret) {
      console.error('[RAZORPAY_WEBHOOK_CONFIG_ERROR] RAZORPAY_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    // Verify HMAC-SHA256 signature
    if (!signature) {
      console.error('[RAZORPAY_WEBHOOK_MISSING_SIGNATURE]');
      return NextResponse.json({ error: 'Missing Razorpay webhook signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('[RAZORPAY_WEBHOOK_INVALID_SIGNATURE]', { signature, expectedSignature });
      return NextResponse.json({ error: 'Invalid Razorpay webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity || payload.payload?.subscription?.entity || payload.payload?.refund?.entity || {};

    console.log(`[RAZORPAY_WEBHOOK] Processing event: ${event}`);

    const notes = entity.notes || {};
    const userId = notes.userId;
    const plan = notes.plan || 'pro';
    const razorpayOrderId = entity.order_id || entity.id;
    const razorpayPaymentId = entity.id;

    if (event === 'payment.captured' || event === 'order.paid') {
      if (userId) {
        const user = await (prisma.user as any).update({
          where: { id: userId },
          data: {
            subscriptionTier: plan,
            updatedAt: new Date(),
          },
        });

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

        const amountInRupees = entity.amount ? Math.round(entity.amount / 100) : 199;
        const currency = entity.currency || 'INR';

        await (prisma.payment as any).create({
          data: {
            userId,
            amount: amountInRupees,
            currency,
            status: 'completed',
            razorpayOrderId,
            razorpayPaymentId,
            userEmail: user.email,
            description: `Razorpay Payment for ${plan.toUpperCase()} Plan`,
          },
        });

        notifyPaymentSuccess(userId, plan.toUpperCase(), `${currency} ${amountInRupees}`).catch(() => {});
        notifySubscriptionStarted(userId, plan.toUpperCase()).catch(() => {});

        if (user.email) {
          sendPaymentSuccessEmail(user.email, plan.toUpperCase(), `${currency} ${amountInRupees}`, currency, razorpayPaymentId).catch(() => {});
          sendSubscriptionStartedEmail(user.email, plan.toUpperCase(), 'Monthly').catch(() => {});
        }
      }
    } else if (event === 'payment.failed') {
      if (userId) {
        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        const reason = entity.error_description || 'Card processor declined transaction';
        notifyPaymentFailed(userId, plan.toUpperCase(), reason).catch(() => {});
        if (user?.email) {
          sendPaymentFailedEmail(user.email, plan.toUpperCase(), reason).catch(() => {});
        }
      }
    } else if (event === 'subscription.charged' || event === 'subscription.renewed') {
      if (userId) {
        const nextBilling = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
        notifySubscriptionRenewed(userId, plan.toUpperCase()).catch(() => {});
        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (user?.email) {
          sendSubscriptionRenewedEmail(user.email, plan.toUpperCase(), nextBilling).catch(() => {});
        }
      }
    } else if (event === 'subscription.cancelled' || event === 'subscription.halted') {
      if (userId) {
        await (prisma.subscription as any).update({
          where: { userId },
          data: { status: 'canceled', canceledAt: new Date() },
        });

        notifySubscriptionCancelled(userId, plan.toUpperCase()).catch(() => {});

        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (user?.email) {
          sendSubscriptionCancelledEmail(user.email, plan.toUpperCase()).catch(() => {});
        }
      }
    } else if (event === 'refund.processed' || event === 'refund.created') {
      const refundAmount = entity.amount ? `${entity.currency || 'INR'} ${Math.round(entity.amount / 100)}` : 'Refund';
      if (userId) {
        notifyRefundCompleted(userId, refundAmount).catch(() => {});
        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (user?.email) {
          sendRefundCompletedEmail(user.email, refundAmount, entity.id).catch(() => {});
        }
      }
    }

    return NextResponse.json({ status: 'success', event });
  } catch (error: any) {
    console.error('[RAZORPAY_WEBHOOK_ERROR]', error);
    return NextResponse.json({ error: 'Razorpay Webhook processing failed' }, { status: 500 });
  }
}
