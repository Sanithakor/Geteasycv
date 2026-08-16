/**
 * POST /api/lemon-squeezy/checkout - Create Lemon Squeezy Checkout URL
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
    const { variantId, plan = 'pro', customRedirectUrl } = body;

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

    if (!apiKey || !storeId) {
      console.warn('[LEMONSQUEEZY_NOT_CONFIGURED] Lemon Squeezy keys not configured. Simulating checkout:');
      return NextResponse.json({
        success: true,
        simulated: true,
        url: `${appUrl}/subscription?status=success&plan=${plan}`,
      });
    }

    // Determine variant ID (from body or environment variables)
    const targetVariantId =
      variantId ||
      (plan === 'premium'
        ? process.env.LEMONSQUEEZY_PREMIUM_VARIANT_ID
        : process.env.LEMONSQUEEZY_PRO_VARIANT_ID);

    if (!targetVariantId) {
      return NextResponse.json(
        { error: 'Lemon Squeezy Variant ID not configured' },
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
              },
            },
            product_options: {
              redirect_url: customRedirectUrl || `${appUrl}/subscription?status=success`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: storeId,
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
      { error: (error as Error).message || 'Internal server error' },
      { status: 500 }
    );
  }
}
