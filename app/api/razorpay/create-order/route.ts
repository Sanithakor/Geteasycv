import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { getPlanById } from '@/lib/config/pricing';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const auth = await getAuthFromRequest(req, body);

    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const requestedPlanId = (body.plan || 'pro').toLowerCase();
    const country = (body.country || req.headers.get('cf-ipcountry') || 'IN').toUpperCase();
    const planConfig = getPlanById(requestedPlanId, country);

    if (!planConfig || planConfig.id === 'free' || planConfig.amountSubunits <= 0) {
      return NextResponse.json(
        { error: `Invalid paid plan '${requestedPlanId}'. Choose starter, pro, or premium.` },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const amount = planConfig.amountSubunits;
    const currency = planConfig.currency || 'INR';

    // Fallback simulation mode if environment keys are not configured yet
    if (!keyId || !keySecret) {
      console.warn('[RAZORPAY_SIMULATION] Key ID or Key Secret missing. Returning mock order details:');
      return NextResponse.json({
        success: true,
        orderId: `order_mock_${Date.now()}`,
        amount,
        currency,
        keyId: keyId || 'rzp_test_mock_key_id',
        plan: planConfig.id,
        country,
        isSimulation: true,
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount,
      currency,
      receipt: `receipt_${auth.userId.slice(0, 10)}_${Date.now()}`,
      notes: {
        userId: auth.userId,
        plan: planConfig.id,
        country,
        currency,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      plan: planConfig.id,
      country,
    });
  } catch (error: any) {
    console.error('[RAZORPAY_CREATE_ORDER_ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay payment order.' },
      { status: 500 }
    );
  }
}
