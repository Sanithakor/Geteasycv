/**
 * SMS Gateway Utility (Twilio / Fast2SMS / Custom HTTP SMS Gateway)
 * Handles automated OTP SMS verification messages for phone authentication.
 */

export interface SendSmsPayload {
  to: string;
  message: string;
  otp: string;
}

export async function sendSms({ to, message, otp }: SendSmsPayload) {
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFromNumber = process.env.TWILIO_PHONE_NUMBER;

  const fast2smsApiKey = process.env.FAST2SMS_API_KEY;
  const smsApiUrl = process.env.SMS_API_URL;
  const smsApiKey = process.env.SMS_API_KEY;

  // 1. Try Twilio API if configured
  if (twilioSid && twilioAuthToken && twilioFromNumber) {
    try {
      const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString('base64');
      const params = new URLSearchParams({
        To: to,
        From: twilioFromNumber,
        Body: message,
      });

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send SMS via Twilio');
      }

      const data = await res.json();
      return { success: true, provider: 'twilio', sid: data.sid };
    } catch (err: any) {
      console.error('[SMS_TWILIO_ERROR]', err);
    }
  }

  // 2. Try Fast2SMS API if configured (India / International)
  if (fast2smsApiKey) {
    try {
      const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          authorization: fast2smsApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: 'otp',
          variables_values: otp,
          numbers: to.replace(/\D/g, ''),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to send SMS via Fast2SMS');
      }

      const data = await res.json();
      return { success: true, provider: 'fast2sms', data };
    } catch (err: any) {
      console.error('[SMS_FAST2SMS_ERROR]', err);
    }
  }

  // 3. Try Custom Gateway HTTP API if configured
  if (smsApiUrl) {
    try {
      const res = await fetch(smsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(smsApiKey ? { Authorization: `Bearer ${smsApiKey}` } : {}),
        },
        body: JSON.stringify({ to, message, otp }),
      });

      if (!res.ok) {
        throw new Error('Failed to send SMS via custom SMS gateway API');
      }

      return { success: true, provider: 'custom' };
    } catch (err: any) {
      console.error('[SMS_CUSTOM_GATEWAY_ERROR]', err);
    }
  }

  // Fallback / Development Simulation mode
  console.log(`[SMS_SIMULATED] To: ${to} | OTP: ${otp} | Message: "${message}"`);
  return { success: true, simulated: true };
}
