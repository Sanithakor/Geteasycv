/**
 * GetEasyCV — Transactional & Event Email System
 * Handles automated notifications, account alerts, receipts, password resets, and marketing preferences.
 */

import { prisma, safeDbQuery } from '@/lib/db';

export type EmailCategory = 'security' | 'account' | 'billing' | 'marketing' | 'product_activity';

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  category?: EmailCategory;
  userId?: string | null;
}

// Simple in-memory sliding cache for deduplication (30s window)
const recentSends = new Map<string, number>();

function isDuplicateSend(to: string, subject: string): boolean {
  const key = `${to.toLowerCase()}:${subject.trim()}`;
  const now = Date.now();
  const lastTime = recentSends.get(key);

  if (lastTime && now - lastTime < 30000) {
    return true;
  }
  recentSends.set(key, now);
  
  // Clean up old keys if map gets large
  if (recentSends.size > 500) {
    for (const [k, time] of recentSends.entries()) {
      if (now - time > 60000) {
        recentSends.delete(k);
      }
    }
  }
  return false;
}

export async function sendEmail({ to, subject, html, category = 'account', userId }: SendEmailPayload) {
  if (!to || !to.includes('@')) {
    console.warn('[EMAIL_SKIP] Invalid destination email address:', to);
    return { success: false, error: 'Invalid destination email' };
  }

  // 1. Idempotency Check
  if (isDuplicateSend(to, subject)) {
    console.warn(`[EMAIL_DEDUPLICATED] Skipping duplicate email send to ${to} for subject "${subject}"`);
    return { success: true, deduplicated: true };
  }

  // 2. Check Marketing Email Preferences for non-mandatory categories
  if ((category === 'marketing' || category === 'product_activity') && userId) {
    const userPref = await safeDbQuery(async () => {
      const profile = await prisma.userProfile.findUnique({
        where: { userId },
        select: { emailUpdates: true },
      });
      return profile?.emailUpdates;
    }, true);

    if (userPref === false) {
      console.log(`[EMAIL_SKIPPED_PREFERENCE] User ${userId} opted out of ${category} emails.`);
      return { success: true, optedOut: true };
    }
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'GetEasyCV <noreply@geteasycv.com>';

  // Dev mode simulation fallback
  if (!apiKey) {
    console.log(`[EMAIL_DEV_SIMULATION] [Category: ${category}] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject,
          html,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send email via Resend');
      }

      const data = await res.json();
      return { success: true, data };
    }

    return { success: true, simulated: true };
  } catch (error) {
    console.error('[EMAIL_SEND_ERROR]', error);
    // Return gracefully to prevent caller crashes
    return { success: false, error: (error as Error).message };
  }
}

// Common HTML Template Wrapper
function renderEmailWrapper(content: string, title: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; color: #334155;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0f172a; text-align: left;">
              <a href="${appUrl}" style="text-decoration: none; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                GetEasy<span style="color: #f5d17b;">CV</span>
              </a>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
              <p style="margin: 0 0 8px 0;">© ${new Date().getFullYear()} GetEasyCV. All rights reserved.</p>
              <p style="margin: 0;">You received this transactional email for your GetEasyCV account. To manage email preferences, visit your <a href="${appUrl}/settings" style="color: #0f172a; text-decoration: underline;">Account Settings</a>.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// ----------------------------------------------------------------------------
// SPECIFIC EMAIL TEMPLATES
// ----------------------------------------------------------------------------

/** 1. Welcome Email (New Registration) */
export async function sendWelcomeEmail(toEmail: string, userName: string, provider: string = 'email') {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = 'Welcome to GetEasyCV! 🚀 Build Your Dream Resume';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Welcome aboard, ${userName}! 👋</h2>
    <p style="font-size: 15px; line-height: 1.6;">Thank you for signing up with GetEasyCV using <strong>${provider === 'google' ? 'Google Account' : 'Email Registration'}</strong>. You now have access to our ATS-friendly resume templates, live editor, and AI resume assistant.</p>
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 12px 0; font-weight: bold; color: #0f172a;">Quick Start Tips:</p>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #475569;">
        <li>Choose from 100+ recruiter-approved ATS templates</li>
        <li>Customize fonts, layout, and colors effortlessly</li>
        <li>Download high-resolution PDFs ready for application</li>
      </ul>
    </div>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/dashboard" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Go to Dashboard</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'account' });
}

/** 2. Email Verification Token Email */
export async function sendVerificationEmail(toEmail: string, userName: string, verificationToken: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const verifyUrl = `${appUrl}/api/auth/otp/verify?token=${verificationToken}`;
  const subject = 'Verify Your Email Address — GetEasyCV';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Verify Your Email ✉️</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName}, please confirm your email address to complete your GetEasyCV registration and ensure secure account access.</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${verifyUrl}" style="background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Verify Email Address</a>
    </div>
    <p style="font-size: 12px; color: #94a3b8;">If you did not request this email, please ignore it.</p>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'security' });
}

/** 3. Google Account Login Alert */
export async function sendGoogleAuthEmail(toEmail: string, userName: string, isNewUser: boolean = false) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = isNewUser ? 'Welcome to GetEasyCV via Google' : 'Security Alert: Google Account Sign-In Detected';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">${isNewUser ? 'Account Created via Google 🎉' : 'Google Account Sign-In Detected 🔒'}</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName},</p>
    <p style="font-size: 15px; line-height: 1.6;">${isNewUser 
      ? 'Your GetEasyCV account was successfully created using Google Single Sign-On.' 
      : 'We noticed a successful login to your GetEasyCV account via Google Authentication.'}</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/dashboard" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Open Dashboard</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'security' });
}

/** 4. Successful Login / Security Notification */
export async function sendLoginAlertEmail(toEmail: string, userName: string, deviceDetails?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = 'Security Alert: New Sign-In to GetEasyCV';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">New Account Sign-In Detected 🔐</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName},</p>
    <p style="font-size: 15px; line-height: 1.6;">Your GetEasyCV account was accessed on <strong>${new Date().toLocaleString()}</strong>.</p>
    ${deviceDetails ? `<p style="font-size: 13px; color: #64748b; background: #f1f5f9; padding: 10px 14px; border-radius: 8px;">Device/Browser: ${deviceDetails}</p>` : ''}
    <p style="font-size: 14px; color: #475569;">If this was you, no action is needed. If you do not recognize this activity, please reset your password immediately.</p>
    <div style="margin: 28px 0 16px 0;">
      <a href="${appUrl}/forgot-password" style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Reset Password</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'security' });
}

/** 5. Forgot Password Reset Link Email */
export async function sendPasswordResetEmail(toEmail: string, resetToken: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;
  const subject = 'Reset Your GetEasyCV Password';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Password Reset Request 🔑</h2>
    <p style="font-size: 15px; line-height: 1.6;">We received a request to reset the password for your GetEasyCV account. Click the link below to set a new password:</p>
    <div style="margin: 32px 0 24px 0;">
      <a href="${resetUrl}" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Reset Password</a>
    </div>
    <p style="font-size: 13px; color: #64748b;">This reset link expires in 1 hour. If you did not request this, your password remains secure.</p>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'security' });
}

/** 6. Password Reset Confirmation Email */
export async function sendPasswordChangedEmail(toEmail: string, userName: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = 'Your Password Has Been Updated';
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Password Changed Successfully ✅</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName},</p>
    <p style="font-size: 15px; line-height: 1.6;">Your GetEasyCV account password was successfully updated on <strong>${new Date().toLocaleString()}</strong>.</p>
    <p style="font-size: 14px; color: #475569;">If you did not perform this change, please contact support immediately.</p>
    <div style="margin: 28px 0 16px 0;">
      <a href="${appUrl}/contact" style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; display: inline-block;">Contact Support</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'security' });
}

/** 7. Payment Initiated Email */
export async function sendPaymentInitiatedEmail(toEmail: string, planName: string, amountPaid: string) {
  const subject = `Checkout Initiated for ${planName} Plan`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Checkout Session Created 💳</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your payment checkout for the <strong>GetEasyCV ${planName} Plan</strong> (${amountPaid}) has been initiated. Complete the payment modal to unlock all premium templates and AI features.</p>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 8. Payment Success Receipt Email */
export async function sendPaymentSuccessEmail(
  toEmail: string,
  planName: string,
  amountPaid: string,
  currency: string = 'INR',
  invoiceId?: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Payment Confirmed — GetEasyCV ${planName} Activated! 🎉`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Payment Received &amp; Activated! 🎉</h2>
    <p style="font-size: 15px; line-height: 1.6;">Thank you! Your payment of <strong>${amountPaid} ${currency}</strong> for <strong>GetEasyCV ${planName}</strong> was successfully verified.</p>
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <table width="100%" style="font-size: 14px;">
        <tr><td style="color: #64748b; padding: 4px 0;">Plan:</td><td style="font-weight: bold; color: #0f172a;">${planName}</td></tr>
        <tr><td style="color: #64748b; padding: 4px 0;">Amount:</td><td style="font-weight: bold; color: #0f172a;">${amountPaid} ${currency}</td></tr>
        ${invoiceId ? `<tr><td style="color: #64748b; padding: 4px 0;">Receipt ID:</td><td style="font-family: monospace; color: #0f172a;">${invoiceId}</td></tr>` : ''}
        <tr><td style="color: #64748b; padding: 4px 0;">Status:</td><td style="color: #059669; font-weight: bold;">Active</td></tr>
      </table>
    </div>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/editor" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Build Resume Now</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 9. Payment Failed Alert Email */
export async function sendPaymentFailedEmail(toEmail: string, planName: string, reason?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Payment Failed for ${planName} Plan`;
  const content = `
    <h2 style="color: #dc2626; margin-top: 0;">Payment Transaction Failed ⚠️</h2>
    <p style="font-size: 15px; line-height: 1.6;">We could not complete your payment for the <strong>GetEasyCV ${planName} Plan</strong>.</p>
    ${reason ? `<p style="font-size: 13px; color: #991b1b; background: #fee2e2; padding: 12px; border-radius: 8px;">Reason: ${reason}</p>` : ''}
    <p style="font-size: 14px; color: #475569;">No charge was made to your account. You can retry checkout anytime using another payment method.</p>
    <div style="margin: 28px 0 16px 0;">
      <a href="${appUrl}/pricing" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Retry Payment</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 10. Payment Cancelled Email */
export async function sendPaymentCancelledEmail(toEmail: string, planName: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Payment Cancelled for ${planName} Plan`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Payment Cancelled ℹ️</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your checkout for <strong>GetEasyCV ${planName} Plan</strong> was cancelled. Your card was not charged.</p>
    <div style="margin: 28px 0 16px 0;">
      <a href="${appUrl}/pricing" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">View Pricing Plans</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 11. Subscription Started Email */
export async function sendSubscriptionStartedEmail(toEmail: string, planName: string, billingPeriod: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Subscription Active — Welcome to GetEasyCV ${planName}!`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Subscription Activated 🌟</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your <strong>GetEasyCV ${planName}</strong> (${billingPeriod}) subscription is now active. Enjoy unlimited access to all ATS templates, high-res exports, and AI tools!</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/subscription" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Manage Subscription</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 12. Subscription Renewed Email */
export async function sendSubscriptionRenewedEmail(toEmail: string, planName: string, nextBillingDate: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Subscription Renewed — GetEasyCV ${planName}`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Subscription Renewed Successfully 🔄</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your subscription for <strong>GetEasyCV ${planName}</strong> has been renewed. Next billing date: <strong>${nextBillingDate}</strong>.</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/subscription" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">View Billing Details</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 13. Subscription Cancelled Email */
export async function sendSubscriptionCancelledEmail(toEmail: string, planName: string, accessUntilDate?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `GetEasyCV ${planName} Subscription Cancelled`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Subscription Cancellation Confirmed ℹ️</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your <strong>GetEasyCV ${planName}</strong> subscription has been cancelled as requested.</p>
    ${accessUntilDate ? `<p style="font-size: 14px; color: #475569;">You will maintain full access to your plan features until <strong>${accessUntilDate}</strong>.</p>` : ''}
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/pricing" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Reactivate Subscription</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 14. Plan Upgrade/Downgrade Email */
export async function sendPlanChangeEmail(toEmail: string, oldPlan: string, newPlan: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `GetEasyCV Plan Updated: ${oldPlan} ➔ ${newPlan}`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Account Plan Updated 🚀</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your GetEasyCV plan was successfully updated from <strong>${oldPlan}</strong> to <strong>${newPlan}</strong>.</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/dashboard" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Open Dashboard</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 15. Refund Initiated Email */
export async function sendRefundInitiatedEmail(toEmail: string, amount: string, reason?: string) {
  const subject = `Refund Initiated — ${amount}`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Refund Process Initiated 💸</h2>
    <p style="font-size: 15px; line-height: 1.6;">A refund of <strong>${amount}</strong> has been initiated for your account.</p>
    ${reason ? `<p style="font-size: 13px; color: #64748b; background: #f1f5f9; padding: 10px 14px; border-radius: 8px;">Reason: ${reason}</p>` : ''}
    <p style="font-size: 14px; color: #475569;">Refunds typically process within 5 to 7 business days depending on your bank.</p>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 16. Refund Completed Email */
export async function sendRefundCompletedEmail(toEmail: string, amount: string, transactionId?: string) {
  const subject = `Refund Processed — ${amount}`;
  const content = `
    <h2 style="color: #059669; margin-top: 0;">Refund Completed ✅</h2>
    <p style="font-size: 15px; line-height: 1.6;">Your refund of <strong>${amount}</strong> has been fully processed.</p>
    ${transactionId ? `<p style="font-size: 13px; color: #64748b;">Transaction ID: ${transactionId}</p>` : ''}
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'billing' });
}

/** 17. Resume Created Email */
export async function sendResumeCreatedEmail(toEmail: string, userName: string, resumeTitle: string, userId?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `New Resume Created: "${resumeTitle}" 📄`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Great Work, ${userName}! 📄</h2>
    <p style="font-size: 15px; line-height: 1.6;">You created a new CV: <strong>"${resumeTitle}"</strong>.</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/editor" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Continue Editing</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'product_activity', userId });
}

/** 18. Resume Downloaded Email */
export async function sendResumeDownloadedEmail(toEmail: string, userName: string, resumeTitle: string, userId?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `PDF Downloaded: "${resumeTitle}" 📥`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Resume Exported Successfully 📥</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName}, your resume <strong>"${resumeTitle}"</strong> was exported to high-resolution PDF.</p>
    <p style="font-size: 14px; color: #475569;">Good luck with your job applications! You can edit or re-download anytime.</p>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'product_activity', userId });
}

/** 19. Premium Feature Activated Email */
export async function sendPremiumActivatedEmail(toEmail: string, userName: string, featureName: string, userId?: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const subject = `Feature Activated: ${featureName} ✨`;
  const content = `
    <h2 style="color: #0f172a; margin-top: 0;">Premium Feature Ready ✨</h2>
    <p style="font-size: 15px; line-height: 1.6;">Hi ${userName}, <strong>${featureName}</strong> is now unlocked and active on your account.</p>
    <div style="margin: 32px 0 16px 0;">
      <a href="${appUrl}/editor" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; display: inline-block;">Try Feature Now</a>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html: renderEmailWrapper(content, subject), category: 'product_activity', userId });
}
