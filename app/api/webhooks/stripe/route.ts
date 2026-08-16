/**
 * POST /api/webhooks/stripe - Listen for Stripe payment webhooks
 * Automatically upgrades user tier in DB when subscription is activated
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendPaymentSuccessEmail, sendSubscriptionNoticeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('[STRIPE_WEBHOOK_WARN] STRIPE_WEBHOOK_SECRET is not set in environment.');
    }

    const event = JSON.parse(rawBody);

    // Process Stripe Events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const customerEmail = session.customer_details?.email;
        const amountTotal = session.amount_total ? session.amount_total / 100 : 9;

        console.log(`[STRIPE_WEBHOOK] Payment complete for user: ${userId || customerEmail}`);

        if (userId) {
          try {
            // 1. Upgrade user tier in database
            const user = await prisma.user.update({
              where: { id: userId },
              data: {
                subscriptionTier: 'pro',
              },
            });

            // 2. Create Payment record
            await prisma.payment.create({
              data: {
                userId,
                amount: session.amount_total || 900,
                currency: session.currency?.toUpperCase() || 'USD',
                status: 'completed',
                stripePaymentId: session.payment_intent || session.id,
                description: 'GetEasyCV Pro Subscription',
              },
            });

            // 3. Upsert Subscription record
            await prisma.subscription.upsert({
              where: { userId },
              update: {
                plan: 'pro',
                status: 'active',
                stripeCustomerId: session.customer || null,
                stripeSubscriptionId: session.subscription || null,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                aiCredits: 100,
              },
              create: {
                userId,
                plan: 'pro',
                status: 'active',
                stripeCustomerId: session.customer || null,
                stripeSubscriptionId: session.subscription || null,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                aiCredits: 100,
              },
            });

            // 4. Send Payment Success Email
            if (user.email) {
              sendPaymentSuccessEmail(user.email, 'Pro Plan', `$${amountTotal}`).catch((err) =>
                console.warn('[WEBHOOK_EMAIL_ERROR]', err)
              );
            }
          } catch (dbErr) {
            console.error('[STRIPE_WEBHOOK_DB_ERROR] Could not record subscription in DB:', dbErr);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`[STRIPE_WEBHOOK] Subscription cancelled: ${subscription.id}`);
        try {
          const subRecord = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: subscription.id },
            include: { user: true },
          });

          if (subRecord) {
            await prisma.subscription.update({
              where: { id: subRecord.id },
              data: { status: 'canceled', canceledAt: new Date() },
            });
            await prisma.user.update({
              where: { id: subRecord.userId },
              data: { subscriptionTier: 'free' },
            });

            if (subRecord.user?.email) {
              sendSubscriptionNoticeEmail(subRecord.user.email, 'cancelled').catch((err) =>
                console.warn('[CANCEL_EMAIL_ERROR]', err)
              );
            }
          }
        } catch (err) {
          console.error('[WEBHOOK_CANCEL_DB_ERROR]', err);
        }
        break;
      }

      default:
        console.log(`[STRIPE_WEBHOOK] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[STRIPE_WEBHOOK_ERROR]', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
