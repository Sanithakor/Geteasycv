/**
 * Transactional Email Utility (Resend / SendGrid / Nodemailer)
 * Handles automated welcome emails, password reset links, and subscription receipts
 */

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'GetEasyCV <noreply@geteasycv.com>';

  if (!apiKey) {
    console.warn('[EMAIL_LOG_DEV] No API key provided for email service. Simulating email send:');
    console.log(`To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    // If using Resend API
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
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Send Welcome Email to New Users
 */
export async function sendWelcomeEmail(toEmail: string, userName: string) {
  const subject = 'Welcome to GetEasyCV! 🚀 Build Your Dream Resume';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
      <h2 style="color: #0f172a;">Welcome to GetEasyCV, ${userName}! 👋</h2>
      <p>Thank you for creating an account with GetEasyCV. You now have access to our ATS-friendly resume templates, real-time builder, and PDF exports.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com'}/dashboard" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Go to Dashboard</a>
      </div>
      <p style="font-size: 12px; color: #94a3b8;">If you didn't create this account, please ignore this email.</p>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html });
}

/**
 * Send Password Reset Link Email
 */
export async function sendPasswordResetEmail(toEmail: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com'}/reset-password?token=${resetToken}`;
  const subject = 'Reset Your GetEasyCV Password';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
      <h2 style="color: #0f172a;">Password Reset Request 🔐</h2>
      <p>We received a request to reset your password for your GetEasyCV account. Click the button below to choose a new password:</p>
      <div style="margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #0d9488; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
      </div>
      <p style="font-size: 12px; color: #94a3b8;">This link is valid for 1 hour. If you did not request a password reset, no action is needed.</p>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html });
}

/**
 * Send Payment Success & Pro Subscription Activated Email
 */
export async function sendPaymentSuccessEmail(toEmail: string, planName: string, amountPaid: string) {
  const subject = `Payment Confirmed — GetEasyCV ${planName} Activated! 🎉`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
      <h2 style="color: #0f172a;">Payment Successful! 🎉</h2>
      <p>Thank you for upgrading to <strong>GetEasyCV ${planName}</strong> (${amountPaid}). Your pro subscription is now active!</p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0; font-weight: bold; color: #0f172a;">Unlocked Features:</p>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Unlimited PDF & Word downloads</li>
          <li>Access to all premium ATS resume templates</li>
          <li>AI Resume Assistant & ATS scoring</li>
        </ul>
      </div>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com'}/editor" style="background-color: #7c3aed; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Open Resume Editor</a>
      </div>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html });
}

/**
 * Send Subscription Notice Email (Cancellation / Expiration)
 */
export async function sendSubscriptionNoticeEmail(toEmail: string, type: 'cancelled' | 'expiring') {
  const subject = type === 'cancelled' 
    ? 'Your GetEasyCV Subscription Has Been Cancelled' 
    : 'Your GetEasyCV Pro Subscription is Expiring Soon';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
      <h2 style="color: #0f172a;">Subscription Update</h2>
      <p>${type === 'cancelled' 
        ? 'Your GetEasyCV Pro subscription has been cancelled. You will continue to have access until the end of your current billing period.' 
        : 'Your GetEasyCV Pro subscription is expiring soon. Renew now to maintain unlimited PDF downloads and AI features.'}</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com'}/pricing" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Plans</a>
      </div>
    </div>
  `;
  return sendEmail({ to: toEmail, subject, html });
}

