import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getSystemSettings } from '@/lib/settings';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const settings = await getSystemSettings();
    const recipientEmail = process.env.ADMIN_EMAIL || settings.contactEmail || 'info@geteasycv.com';

    const subject = `[Contact Form] ${topic || 'General Inquiry'} from ${name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">New Contact Support Inquiry</h2>
        <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 8px 0;"><strong>Topic:</strong> <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${topic}</span></p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #F3645C; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #0f172a;">Message Content:</p>
          <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
        </div>

        <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Sent from GetEasyCV Contact Support Form.</p>
      </div>
    `;

    // Dispatch email to configured support email address
    await sendEmail({
      to: recipientEmail,
      subject,
      html,
    });

    return NextResponse.json({
      success: true,
      message: `Your inquiry has been submitted and sent to ${recipientEmail}`,
    });
  } catch (error: any) {
    console.error('[CONTACT_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
