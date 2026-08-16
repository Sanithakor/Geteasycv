# ☁️ Cloudflare Pages & Cloudflare Workers Deployment Guide — GetEasyCV

This guide provides step-by-step instructions to deploy **GetEasyCV** to **Cloudflare Pages** or **Cloudflare Workers**.

---

## ⚡ 1. Prerequisites & Build Configuration

- **Framework Preset**: Select **Next.js** or **Next.js (App Router)**.
- **Build Command**: `npm run build` or `npx @cloudflare/next-on-pages`.
- **Build Output Directory**: `.next` (or `.vercel/output/static` if using `@cloudflare/next-on-pages`).
- **Node.js Version**: Set `NODE_VERSION` to `20.x` or `22.x` under Cloudflare Pages Environment Variables.

---

## 🔑 2. Cloudflare Environment Variables

Add the following environment variables in your Cloudflare Pages Dashboard under **Settings → Environment variables**:

| Variable | Recommended Value | Description |
| :--- | :--- | :--- |
| `NODE_VERSION` | `20.18.0` | Node.js version for Cloudflare build worker |
| `NEXT_PUBLIC_APP_URL` | `https://geteasycv.com` | Production canonical URL |
| `DATABASE_URL` | `postgresql://...:6543/postgres?pgbouncer=true&connection_limit=1` | Supabase Transaction Pooler (Port 6543) |
| `DIRECT_URL` | `postgresql://...:5432/postgres` | Supabase Direct Connection (Port 5432) |
| `JWT_SECRET` | `your_secure_jwt_secret` | HMAC-SHA256 JWT Secret |
| `LEMONSQUEEZY_API_KEY` | `your_api_key` | Lemon Squeezy Secret API Key |
| `LEMONSQUEEZY_STORE_ID` | `your_store_id` | Lemon Squeezy Store ID |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | `your_webhook_secret` | Lemon Squeezy HMAC Webhook Signing Secret |
| `LEMONSQUEEZY_STARTER_VARIANT_ID` | `your_variant_id` | Starter Variant ID (₹49) |
| `LEMONSQUEEZY_PRO_VARIANT_ID` | `your_variant_id` | Pro Variant ID (₹199/mo) |
| `LEMONSQUEEZY_LIFETIME_VARIANT_ID` | `your_variant_id` | Lifetime Variant ID (₹999) |

---

## 🚀 3. Step-by-Step Cloudflare Deployment

### Method A: Git Integration (Recommended — Auto Deployment)

1. Connect your GitHub / GitLab repository in [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select repository: `Sanithakor/Geteasycv`.
3. Set **Framework Preset**: `Next.js`.
4. Set **Build command**: `npm run build`.
5. Set **Build output directory**: `.next`.
6. Add Environment Variables listed above.
7. Click **Save and Deploy**.

### Method B: Direct CLI Deployment via Wrangler

If deploying directly from your terminal:

```bash
# 1. Build the production output
npm run build

# 2. Deploy to Cloudflare Pages via Wrangler
npx wrangler pages deploy .next --project-name=geteasycv
```

---

## 🛠️ 4. Cloudflare Compatibility Features Configured

1. **`wrangler.toml` Configured**:
   - `compatibility_date = "2026-08-16"`
   - `compatibility_flags = ["nodejs_compat"]` (enables Node.js Web Crypto, `jose`, and `bcryptjs` support on Edge workers).
2. **PostgreSQL Serverless Connection Pooling**:
   - Uses Supabase Transaction Pooler (`:6543?pgbouncer=true&connection_limit=1`) to prevent connection exhaustion on Cloudflare serverless edge nodes.
3. **Suspense & Dynamic Route Compliance**:
   - Client search parameters wrapped in `<Suspense>` boundaries to pass Next.js static prerendering without bailouts.
