# 🍋 Lemon Squeezy Integration Setup Guide — GetEasyCV

This guide provides step-by-step instructions to configure Lemon Squeezy for **GetEasyCV** payment processing, test mode validation, and production activation.

---

## 1. Product & Pricing Structure

Create **1 Product** in your Lemon Squeezy Dashboard named **GetEasyCV Premium** with 3 Variants:

| Plan | Price | Type | Description |
| :--- | :--- | :--- | :--- |
| **Starter** | ₹49 | Single Payment | 1 CV creation, PDF export, basic premium features |
| **Pro** | ₹199 / month | Subscription | Unlimited CVs, all premium templates, priority support |
| **Lifetime** | ₹999 | Single Payment | Unlimited CVs, permanent access, all future templates |

---

## 2. Environment Variables

Add the following environment variables to your `.env` (or server hosting environment settings):

```env
# Lemon Squeezy API Keys & Store
LEMONSQUEEZY_API_KEY=your_lemon_squeezy_api_key
LEMONSQUEEZY_STORE_ID=your_store_id
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_signing_secret

# Lemon Squeezy Variant IDs
LEMONSQUEEZY_STARTER_VARIANT_ID=your_starter_variant_id
LEMONSQUEEZY_PRO_VARIANT_ID=your_pro_variant_id
LEMONSQUEEZY_LIFETIME_VARIANT_ID=your_lifetime_variant_id

# Application URL
NEXT_PUBLIC_APP_URL=https://geteasycv.com
```

> ⚠️ **Important Security Rule:** Never prefix secret keys (`LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_WEBHOOK_SECRET`) with `NEXT_PUBLIC_`.

---

## 3. Webhook Setup

1. In Lemon Squeezy Dashboard → **Settings** → **Webhooks** → Click **Add Webhook**.
2. **Target URL**:
   ```text
   https://geteasycv.com/api/webhooks/lemon-squeezy
   ```
3. **Secret**: Enter a secure random string and set it as `LEMONSQUEEZY_WEBHOOK_SECRET` in your `.env`.
4. **Events to Select**:
   - `order_created`
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_resumed`
   - `subscription_expired`

---

## 4. How Plan Access & Entitlements Work

Plan entitlements are managed server-side by `lib/entitlements.ts` and stored in PostgreSQL via Prisma:

```text
Starter  → plan: 'starter'  | status: 'active' | maxResumes: 1  | allTemplates: true
Pro      → plan: 'pro'      | status: 'active' | maxResumes: 99999 | allTemplates: true
Lifetime → plan: 'lifetime' | status: 'active' | maxResumes: 99999 | allTemplates: true
```

- When a subscription is **cancelled**, access remains valid until the end of the billing cycle (`endsAt`).
- When a subscription **expires**, the user is automatically downgraded to `free`. Their resumes remain intact.

---

## 5. Testing in Test Mode

1. Enable **Test Mode** toggle in your Lemon Squeezy Dashboard header.
2. Use Lemon Squeezy test credit card numbers (`4242 4242 4242 4242`) on the checkout page.
3. Test all 3 checkout flows:
   - Click **Buy Starter** (₹49) → Complete Checkout → Verify redirect to `/payment/success?plan=starter`.
   - Click **Start Pro** (₹199/mo) → Complete Checkout → Verify redirect to `/payment/success?plan=pro`.
   - Click **Get Lifetime** (₹999) → Complete Checkout → Verify redirect to `/payment/success?plan=lifetime`.
4. Test Webhook Simulation:
   - In Lemon Squeezy Dashboard → **Webhooks** → Click **Send Test Event**.
   - Send `order_created`, `subscription_cancelled`, and `subscription_expired` events to verify database synchronization.

---

## 6. Switching to Live Production

1. In Lemon Squeezy Dashboard → Switch header toggle from **Test Mode** to **Live Mode**.
2. Copy your **Live Store ID**, **Live Variant IDs**, and **Live API Key**.
3. Update environment variables in your server deployment (Vercel / Railway / VPS).
4. Update the Webhook URL to point to your live domain: `https://geteasycv.com/api/webhooks/lemon-squeezy`.
