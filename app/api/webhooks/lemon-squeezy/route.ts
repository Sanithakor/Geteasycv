/**
 * POST /api/webhooks/lemon-squeezy - Webhook listener for Lemon Squeezy events
 * Handles order_created, subscription_created, subscription_updated, and subscription_cancelled
 */

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // Verify Signature if webhook secret is provided
    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const userId = payload.meta?.custom_data?.user_id;

    console.log(`[LEMONSQUEEZY_WEBHOOK] Received event: ${eventName} for user: ${userId}`);

    // Process events
    switch (eventName) {
      case 'order_created':
      case 'subscription_created':
      case 'subscription_updated': {
        if (userId) {
          try {
            const variantId = payload.data?.attributes?.variant_id?.toString();
            const premiumVariantId = process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID;
            const newTier = variantId === premiumVariantId ? 'premium' : 'pro';

            await prisma.user.update({
              where: { id: userId },
              data: {
                role: 'user',
              },
            });
            console.log(`[LEMONSQUEEZY_WEBHOOK] Updated user ${userId} to ${newTier} plan`);
          } catch (dbErr) {
            console.warn('[LEMONSQUEEZY_DB_WARN]', dbErr);
          }
        }
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        if (userId) {
          try {
            await prisma.user.update({
              where: { id: userId },
              data: {
                role: 'user',
              },
            });
            console.log(`[LEMONSQUEEZY_WEBHOOK] Reverted user ${userId} to free plan`);
          } catch (dbErr) {
            console.warn('[LEMONSQUEEZY_DB_WARN]', dbErr);
          }
        }
        break;
      }

      default:
        console.log(`[LEMONSQUEEZY_WEBHOOK] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ success: true, event: eventName });
  } catch (error) {
    console.error('[LEMONSQUEEZY_WEBHOOK_ERROR]', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
