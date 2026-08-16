import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendPaymentSuccessEmail, sendSubscriptionCancelEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // 1. Signature Verification (HMAC-SHA256)
    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const userId = payload.meta?.custom_data?.user_id;

    if (!eventName) {
      return NextResponse.json({ error: 'Missing event_name in payload' }, { status: 400 });
    }

    const dataAttributes = payload.data?.attributes || {};
    const orderId = payload.data?.id?.toString() || dataAttributes.order_id?.toString();
    const subscriptionId = dataAttributes.subscription_id?.toString() || (eventName.startsWith('subscription_') ? payload.data?.id?.toString() : undefined);
    const variantId = dataAttributes.variant_id?.toString();
    const customerId = dataAttributes.customer_id?.toString();
    const userEmail = dataAttributes.user_email || payload.meta?.custom_data?.email;
    const totalAmount = dataAttributes.total || 0; // in cents/rupees

    console.log(`[LEMONSQUEEZY_WEBHOOK] Received event '${eventName}' for user '${userId}' (Order: ${orderId})`);

    // 2. Idempotency Check: Prevent duplicate processing for order_created
    if (orderId && eventName === 'order_created') {
      const existingPayment = await (prisma.payment as any).findFirst({
        where: { lemonSqueezyOrderId: orderId },
      });
      if (existingPayment) {
        console.log(`[LEMONSQUEEZY_WEBHOOK] Order ${orderId} already processed. Returning 200.`);
        return NextResponse.json({ success: true, message: 'Already processed' });
      }
    }

    // 3. Determine Plan based on variant ID or custom_data
    const customPlan = payload.meta?.custom_data?.plan;
    let detectedPlan = customPlan || 'pro';

    const starterVariant = process.env.LEMONSQUEEZY_STARTER_VARIANT_ID;
    const proVariant = process.env.LEMONSQUEEZY_PRO_VARIANT_ID;
    const lifetimeVariant = process.env.LEMONSQUEEZY_LIFETIME_VARIANT_ID;

    if (variantId) {
      if (variantId === starterVariant) detectedPlan = 'starter';
      else if (variantId === proVariant) detectedPlan = 'pro';
      else if (variantId === lifetimeVariant) detectedPlan = 'lifetime';
    }

    // Target user: locate by custom_data.user_id or userEmail
    let targetUserId = userId;
    if (!targetUserId && userEmail) {
      const foundUser = await prisma.user.findUnique({ where: { email: userEmail } });
      if (foundUser) targetUserId = foundUser.id;
    }

    if (!targetUserId) {
      console.warn('[LEMONSQUEEZY_WEBHOOK] Warning: No associated user found for event:', eventName);
      return NextResponse.json({ success: true, warning: 'User not found in system' });
    }

    // 4. Handle Lifecycle Events
    switch (eventName) {
      case 'order_created': {
        // Record payment in Payment table
        await (prisma.payment as any).create({
          data: {
            userId: targetUserId,
            amount: totalAmount,
            currency: dataAttributes.currency || 'INR',
            status: 'completed',
            lemonSqueezyOrderId: orderId,
            lemonSqueezySubscriptionId: subscriptionId,
            lemonSqueezyVariantId: variantId,
            userEmail,
            description: `GetEasyCV ${detectedPlan.toUpperCase()} Purchase`,
          },
        });

        // Activate Plan Entitlement in User & Subscription models
        await prisma.user.update({
          where: { id: targetUserId },
          data: { subscriptionTier: detectedPlan },
        });

        await (prisma.subscription as any).upsert({
          where: { userId: targetUserId },
          update: {
            plan: detectedPlan,
            status: 'active',
            lemonSqueezyCustomerId: customerId,
            lemonSqueezySubscriptionId: subscriptionId,
            lemonSqueezyOrderId: orderId,
            lemonSqueezyVariantId: variantId,
            resumes: detectedPlan === 'pro' || detectedPlan === 'lifetime' ? 99999 : 1,
            aiCredits: detectedPlan === 'lifetime' ? 1000 : detectedPlan === 'pro' ? 100 : 20,
          },
          create: {
            userId: targetUserId,
            plan: detectedPlan,
            status: 'active',
            lemonSqueezyCustomerId: customerId,
            lemonSqueezySubscriptionId: subscriptionId,
            lemonSqueezyOrderId: orderId,
            lemonSqueezyVariantId: variantId,
            resumes: detectedPlan === 'pro' || detectedPlan === 'lifetime' ? 99999 : 1,
            aiCredits: detectedPlan === 'lifetime' ? 1000 : detectedPlan === 'pro' ? 100 : 20,
          },
        });

        // Send Email Confirmation
        if (userEmail) {
          sendPaymentSuccessEmail(userEmail, detectedPlan, totalAmount).catch((e) =>
            console.warn('[EMAIL_WARN]', e)
          );
        }
        break;
      }

      case 'subscription_created':
      case 'subscription_updated':
      case 'subscription_resumed': {
        const subStatus = dataAttributes.status || 'active';
        const renewsAt = dataAttributes.renews_at ? new Date(dataAttributes.renews_at) : null;
        const endsAt = dataAttributes.ends_at ? new Date(dataAttributes.ends_at) : null;

        await prisma.user.update({
          where: { id: targetUserId },
          data: { subscriptionTier: 'pro' },
        });

        await (prisma.subscription as any).upsert({
          where: { userId: targetUserId },
          update: {
            plan: 'pro',
            status: subStatus === 'active' || subStatus === 'on_trial' ? 'active' : subStatus,
            lemonSqueezyCustomerId: customerId,
            lemonSqueezySubscriptionId: subscriptionId,
            renewsAt,
            endsAt,
            resumes: 99999,
            aiCredits: 100,
          },
          create: {
            userId: targetUserId,
            plan: 'pro',
            status: 'active',
            lemonSqueezyCustomerId: customerId,
            lemonSqueezySubscriptionId: subscriptionId,
            renewsAt,
            endsAt,
            resumes: 99999,
            aiCredits: 100,
          },
        });
        break;
      }

      case 'subscription_cancelled': {
        const endsAt = dataAttributes.ends_at ? new Date(dataAttributes.ends_at) : new Date();

        await (prisma.subscription as any).updateMany({
          where: { userId: targetUserId },
          data: {
            status: 'canceled',
            canceledAt: new Date(),
            endsAt,
          },
        });

        if (userEmail) {
          sendSubscriptionCancelEmail(userEmail, endsAt.toISOString().split('T')[0]).catch((e) =>
            console.warn('[EMAIL_WARN]', e)
          );
        }
        break;
      }

      case 'subscription_expired': {
        // Downgrade Pro user to Free
        await prisma.user.update({
          where: { id: targetUserId },
          data: { subscriptionTier: 'free' },
        });

        await prisma.subscription.updateMany({
          where: { userId: targetUserId },
          data: {
            plan: 'free',
            status: 'expired',
            resumes: 1,
          },
        });
        break;
      }

      default:
        console.log(`[LEMONSQUEEZY_WEBHOOK] Unhandled event type: ${eventName}`);
    }

    return NextResponse.json({ success: true, event: eventName });
  } catch (error) {
    console.error('[LEMONSQUEEZY_WEBHOOK_ERROR]', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Webhook execution failed' },
      { status: 500 }
    );
  }
}
