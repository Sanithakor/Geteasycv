/**
 * POST /api/checkout - Create Stripe Checkout session for Pro / Premium subscription
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { planId = 'pro', successUrl, cancelUrl } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

    if (!stripeSecretKey) {
      console.warn('[STRIPE_NOT_CONFIGURED] Stripe Secret Key missing. Simulating checkout session:');
      return NextResponse.json({
        success: true,
        simulated: true,
        url: `${appUrl}/subscription?status=success&plan=${planId}`,
      });
    }

    // Call Stripe Checkout Session API via HTTP fetch to avoid extra SDK overhead
    const priceMap: Record<string, string> = {
      pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
      premium: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium_monthly',
    };

    const priceId = priceMap[planId] || priceMap.pro;

    const params = new URLSearchParams();
    params.append('mode', 'subscription');
    params.append('payment_method_types[0]', 'card');
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', successUrl || `${appUrl}/subscription?status=success`);
    params.append('cancel_url', cancelUrl || `${appUrl}/subscription?status=cancel`);
    params.append('client_reference_id', auth.userId);

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Failed to create Stripe checkout session');
    }

    const session = await res.json();

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}
