import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

function verifyRazorpaySignature(rawBody: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === signature;
}

describe('Razorpay Webhook Signature Verification', () => {
  const secret = 'webhook_test_secret_12345';
  const payload = JSON.stringify({
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: 'pay_KxJ89XkLAbC1',
          amount: 19900,
          currency: 'INR',
          status: 'captured',
          notes: {
            userId: 'cluser12345',
            plan: 'pro',
          },
        },
      },
    },
  });

  it('accepts a legitimate signature', () => {
    const validSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const isValid = verifyRazorpaySignature(payload, validSignature, secret);
    expect(isValid).toBe(true);
  });

  it('rejects a forged or tampered signature', () => {
    const invalidSignature = 'aabbccddeefffffeeeddccba';
    const isValid = verifyRazorpaySignature(payload, invalidSignature, secret);
    expect(isValid).toBe(false);
  });

  it('rejects when payload body has been tampered', () => {
    const validSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const tamperedPayload = payload + ' ';
    const isValid = verifyRazorpaySignature(tamperedPayload, validSignature, secret);
    expect(isValid).toBe(false);
  });
});
