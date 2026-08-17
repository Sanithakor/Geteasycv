# 💳 Razorpay Payment System Setup Guide — GetEasyCV

This document provides a complete guide for setting up **Razorpay Payments** in **GetEasyCV**.

---

## ⚡ 1. Razorpay Account Setup

1. Sign up or log into [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Switch to **Test Mode** (for development) or **Live Mode** (for production).
3. Go to **Account & Settings → API Keys** → Click **Generate Key**.
4. Copy your **Key ID** and **Key Secret**.

---

## 🔑 2. Environment Variables Configuration

Add the following environment variables to your `.env` file (local) and Cloudflare Pages Environment Variables (production):

```env
# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_your_key_id
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Production Base URL
NEXT_PUBLIC_APP_URL=https://geteasycv.com
```

---

## 🌐 3. Razorpay Webhook Configuration

1. In Razorpay Dashboard, navigate to **Account & Settings → Webhooks** → Click **Add New Webhook**.
2. **Webhook URL**: `https://geteasycv.com/api/webhooks/razorpay`
3. **Secret**: Enter a secret string and save it to `RAZORPAY_WEBHOOK_SECRET` in `.env`.
4. **Active Events**: Select the following events:
   - `order.paid`
   - `payment.captured`
   - `subscription.charged`
   - `subscription.cancelled`
   - `subscription.halted`

---

## 💰 4. Plan Pricing Details

| Plan | Billing Type | Amount (INR ₹) | Amount (Paise) |
| :--- | :--- | :--- | :--- |
| **Starter** | One-time Payment | ₹49 | 4,900 paise |
| **Pro** | Monthly Subscription | ₹199 / month | 19,900 paise |
| **Lifetime** | One-time Payment | ₹999 | 99,900 paise |

---

## 🧪 5. Testing the Razorpay Integration

1. Visit `/pricing` on your site.
2. Click **Buy Starter**, **Start Pro**, or **Get Lifetime**.
3. The native Razorpay payment modal will pop up.
4. Use Razorpay Test Cards / UPI ID (`success@razorpay` for Netbanking/UPI, or Test Card numbers).
5. Complete payment → Verify instant HMAC verification and redirection to `/payment/success`.
