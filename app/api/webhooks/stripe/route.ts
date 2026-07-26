/**
 * POST /api/webhooks/stripe - Listen for Stripe payment webhooks
 * Automatically upgrades user tier in DB when subscription is activated
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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

        console.log(`[STRIPE_WEBHOOK] Payment complete for user: ${userId || customerEmail}`);

        if (userId) {
          try {
            await prisma.user.update({
              where: { id: userId },
              data: {
                role: 'user',
              },
            });
          } catch (dbErr) {
            console.warn('[STRIPE_WEBHOOK_DB_WARN] Could not update user tier:', dbErr);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`[STRIPE_WEBHOOK] Subscription cancelled: ${subscription.id}`);
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
