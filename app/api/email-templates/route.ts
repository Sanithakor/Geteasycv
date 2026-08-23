/**
 * GET/POST/PUT/DELETE /api/email-templates - Dynamic Email Templates API
 */

import { NextResponse } from 'next/server';
import { protectRoute, requireAdmin } from '@/lib/middleware/auth';

const INITIAL_EMAIL_TEMPLATES = [
  {
    id: 'tmpl-welcome',
    name: 'Welcome Email',
    slug: 'welcome',
    subject: 'Welcome to GetEasyCV, {{user_name}}! 🚀',
    body: '<h1>Welcome {{user_name}}!</h1><p>Thank you for joining GetEasyCV. Get started building your ATS-compliant resume today.</p>',
    active: true,
  },
  {
    id: 'tmpl-reset-password',
    name: 'Password Reset',
    slug: 'password-reset',
    subject: 'Reset Your GetEasyCV Password',
    body: '<p>Hi {{user_name}},</p><p>Click the link below to reset your password:</p><a href="{{reset_url}}">Reset Password</a>',
    active: true,
  },
  {
    id: 'tmpl-payment-success',
    name: 'Payment Receipt',
    slug: 'payment-success',
    subject: 'Receipt for your GetEasyCV {{plan_name}} subscription',
    body: '<p>Hi {{user_name}},</p><p>Thank you for your payment of {{amount}}. Your invoice number is {{invoice_number}}.</p>',
    active: true,
  },
  {
    id: 'tmpl-sub-expiry',
    name: 'Subscription Expiry Reminder',
    slug: 'subscription-expiry',
    subject: 'Your GetEasyCV {{plan_name}} subscription is expiring soon',
    body: '<p>Hi {{user_name}},</p><p>Your subscription will renew on {{expiry_date}}.</p>',
    active: true,
  },
];

export async function GET(req: Request) {
  try {
    const auth = await protectRoute(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: INITIAL_EMAIL_TEMPLATES,
    });
  } catch (error) {
    console.error('[EMAIL_TEMPLATES_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch email templates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await protectRoute(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { name, subject, body: emailBody, slug } = body;

    const newTemplate = {
      id: `tmpl-${Date.now()}`,
      name: name || 'Custom Template',
      slug: slug || 'custom',
      subject: subject || 'Notice from GetEasyCV',
      body: emailBody || '',
      active: true,
    };

    return NextResponse.json({
      success: true,
      data: newTemplate,
    });
  } catch (error) {
    console.error('[EMAIL_TEMPLATES_POST_ERROR]', error);
    return NextResponse.json({ error: 'Failed to save email template' }, { status: 500 });
  }
}
