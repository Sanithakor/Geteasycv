/**
 * POST /api/lemon-squeezy/checkout
 * Production-ready server-side checkout creation for Lemon Squeezy
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';

const ALLOWED_PLANS: Record<string, string | undefined> = {
  starter: process.env.LEMONSQUEEZY_STARTER_VARIANT_ID,
  pro: process.env.LEMONSQUEEZY_PRO_VARIANT_ID,
  lifetime: process.env.LEMONSQUEEZY_LIFETIME_VARIANT_ID,
};

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to choose a plan.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const requestedPlan = (body.plan || 'pro').toLowerCase();

    if (!['starter', 'pro', 'lifetime'].includes(requestedPlan)) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

    // Fallback simulation for test environment when API keys are not filled yet
    if (!apiKey || !storeId) {
      console.warn('[LEMONSQUEEZY_SIMULATION] API keys missing. Simulating checkout for plan:', requestedPlan);
      return NextResponse.json({
        success: true,
        simulated: true,
        url: `${appUrl}/payment/success?plan=${requestedPlan}&simulated=true`,
      });
    }

    const targetVariantId = ALLOWED_PLANS[requestedPlan];
    if (!targetVariantId) {
      return NextResponse.json(
        { error: `Lemon Squeezy Variant ID for plan '${requestedPlan}' is not configured in environment.` },
        { status: 400 }
      );
    }

    // Call Lemon Squeezy API v1 Checkout endpoint
    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: auth.email || body.email,
              custom: {
                user_id: auth.userId,
                plan: requestedPlan,
              },
            },
            product_options: {
              redirect_url: `${appUrl}/payment/success?plan=${requestedPlan}`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: storeId.toString(),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: targetVariantId.toString(),
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to create Lemon Squeezy checkout');
    }

    const data = await response.json();
    const checkoutUrl = data.data?.attributes?.url;

    return NextResponse.json({
      success: true,
      url: checkoutUrl,
    });
  } catch (error) {
    console.error('[LEMONSQUEEZY_CHECKOUT_ERROR]', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Checkout initialization failed' },
      { status: 500 }
    );
  }
}
