import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getAuthFromRequest } from '@/lib/middleware/auth';

// Plan pricing map in INR paise (₹1 = 100 paise)
const PLAN_AMOUNTS: Record<string, number> = {
  starter: 4900,   // ₹49
  pro: 19900,      // ₹199
  lifetime: 99900, // ₹999
};

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const requestedPlan = (body.plan || 'pro').toLowerCase();

    if (!PLAN_AMOUNTS[requestedPlan]) {
      return NextResponse.json(
        { error: `Invalid plan '${requestedPlan}'. Choose starter, pro, or lifetime.` },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const amount = PLAN_AMOUNTS[requestedPlan];

    // Fallback simulation mode if environment keys are not configured yet
    if (!keyId || !keySecret) {
      console.warn('[RAZORPAY_SIMULATION] Key ID or Key Secret missing. Returning mock order details:');
      return NextResponse.json({
        success: true,
        orderId: `order_mock_${Date.now()}`,
        amount,
        currency: 'INR',
        keyId: keyId || 'rzp_test_mock_key_id',
        plan: requestedPlan,
        isSimulation: true,
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${auth.userId.slice(0, 10)}_${Date.now()}`,
      notes: {
        userId: auth.userId,
        plan: requestedPlan,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      plan: requestedPlan,
    });
  } catch (error: any) {
    console.error('[RAZORPAY_CREATE_ORDER_ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Razorpay payment order.' },
      { status: 500 }
    );
  }
}
