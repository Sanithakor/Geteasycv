/**
 * GET, POST & PUT /api/plans
 * API Endpoint to fetch and update dynamic subscription plans
 */

import { NextResponse } from 'next/server';
import { fetchAllPlans, saveAllPlans, PlanItem } from '@/lib/plansStore';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';

export async function GET() {
  try {
    const plans = await fetchAllPlans();
    return NextResponse.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error('[PLANS_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin authorization required' }, { status: 403 });
    }

    const body = await req.json();
    const plans: PlanItem[] = body.plans || (Array.isArray(body) ? body : []);

    if (!Array.isArray(plans) || plans.length === 0) {
      return NextResponse.json({ error: 'Invalid plans payload array' }, { status: 400 });
    }

    await saveAllPlans(plans);

    return NextResponse.json({
      success: true,
      message: 'Plans updated successfully',
      data: plans,
    });
  } catch (error) {
    console.error('[PLANS_PUT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to update plans' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return PUT(req);
}
