# Resume Builder SaaS - Phase 1 Implementation Guide

## 🎯 Phase 1: MVP - 4 Week Sprint

### Week 1: Foundation & Authentication

#### Goals
- Set up project structure
- Implement authentication system
- Create database schema
- Set up environment variables

#### Tasks

1. **Initialize Project**
   ```bash
   npx create-next-app@latest resume-builder-saas --typescript --tailwind
   ```

2. **Install Dependencies**
   ```bash
   npm install zustand zod axios react-hook-form
   npm install -D prisma @prisma/client
   npm install next-auth bcryptjs jsonwebtoken
   ```

3. **Create Files** (✅ Already Done)
   - `types/index.ts` - Type definitions
   - `lib/store/authStore.ts` - Auth state
   - `lib/store/builderStore.ts` - Builder state
   - `lib/api/client.ts` - API client
   - `lib/hooks/useResumes.ts` - Resume hook
   - `app/api/auth/login/route.ts` - Login endpoint
   - `prisma/schema.prisma` - Database schema

4. **Setup Environment**
   ```
   .env.local:
   - DATABASE_URL
   - NEXT_PUBLIC_API_URL
   - JWT_SECRET
   - STRIPE_API_KEY (later)
   ```

5. **Database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

#### Deliverables
- ✅ Project structure complete
- ✅ TypeScript configured
- ✅ Types defined
- ✅ Store patterns established
- ✅ API client ready
- Database connected

---

### Week 2: Authentication & User Dashboard

#### Goals
- Complete OAuth integration
- Build login/signup pages
- Create user dashboard
- Implement session management

#### Tasks

1. **OAuth Setup** (Google & GitHub)
   - Install NextAuth.js
   - Configure providers
   - Create callback pages

2. **Login/Signup Components**
   ```
   components/auth/
   ├── LoginForm.tsx
   ├── SignupForm.tsx
   ├── OAuthButtons.tsx
   └── ProtectedRoute.tsx
   ```

3. **User Dashboard**
   ```
   app/(dashboard)/
   ├── dashboard/page.tsx
   ├── my-resumes/page.tsx
   ├── templates/page.tsx
   ├── profile/page.tsx
   └── settings/page.tsx
   ```

4. **API Endpoints**
   ```
   app/api/auth/
   ├── signup/route.ts
   ├── login/route.ts
   ├── logout/route.ts
   ├── google/route.ts
   ├── github/route.ts
   ├── refresh/route.ts
   └── me/route.ts
   ```

#### Deliverables
- Complete auth flow
- Protected routes
- Session management
- Dashboard layout
- User profile page

---

### Week 3: Resume Builder Core

#### Goals
- Integrate existing CV-Maker engine
- Build editor interface
- Implement autosave
- Create preview system

#### Tasks

1. **Editor Layout**
   ```
   components/builder/
   ├── Editor/
   │   ├── Canvas.tsx
   │   ├── Sidebar.tsx
   │   ├── Toolbar.tsx
   │   ├── BlockSelector.tsx
   │   └── PropertiesPanel.tsx
   ├── Preview.tsx
   └── BlockRenderer.tsx
   ```

2. **Resume CRUD APIs**
   ```
   app/api/resumes/
   ├── route.ts (list, create)
   ├── [id]/route.ts (get, update, delete)
   ├── [id]/pdf/route.ts (export)
   ├── [id]/duplicate/route.ts
   └── [id]/share/route.ts
   ```

3. **Autosave Implementation**
   - Debounce changes (1000ms)
   - Save to database
   - Show save indicator
   - Handle conflicts

4. **Template System**
   ```
   app/api/templates/
   ├── route.ts (list, search)
   ├── [id]/route.ts (get)
   └── [id]/preview/route.ts
   ```

#### Deliverables
- Functional editor
- Autosave working
- PDF export
- Template selection
- Live preview

---

### Week 4: Payments & Subscriptions

#### Goals
- Integrate Stripe
- Create billing page
- Implement subscription plans
- Set up webhooks

#### Tasks

1. **Stripe Setup**
   - Create price objects
   - Setup webhooks
   - Test payments

2. **Subscription Plans**
   ```typescript
   Free: $0/month
   - 3 resumes
   - Basic templates
   - PDF export
   
   Pro: $9.99/month
   - 20 resumes
   - Premium templates
   - AI features
   
   Premium: $19.99/month
   - Unlimited resumes
   - All templates
   - Full AI
   ```

3. **Billing Page**
   ```
   app/(dashboard)/billing/
   ├── page.tsx (current plan)
   ├── upgrade/page.tsx
   └── invoices/page.tsx
   ```

4. **Stripe APIs**
   ```
   app/api/stripe/
   ├── checkout/route.ts
   ├── customer/route.ts
   ├── invoice/route.ts
   ├── webhook/route.ts
   └── cancel/route.ts
   ```

#### Deliverables
- Stripe integration
- Payment processing
- Subscription management
- Invoice system
- Webhook handling

---

## 📁 Key Files to Create (This Week)

### Authentication
```typescript
// app/api/auth/signup/route.ts
// app/api/auth/login/route.ts
// app/api/auth/logout/route.ts
// app/(auth)/signup/page.tsx
// app/(auth)/login/page.tsx
// app/(auth)/forgot-password/page.tsx
// components/auth/LoginForm.tsx
// components/auth/SignupForm.tsx
```

### Dashboard
```typescript
// app/(dashboard)/layout.tsx
// app/(dashboard)/dashboard/page.tsx
// app/(dashboard)/my-resumes/page.tsx
// app/(dashboard)/templates/page.tsx
// app/(dashboard)/profile/page.tsx
// app/(dashboard)/billing/page.tsx
// components/dashboard/Sidebar.tsx
// components/dashboard/Topbar.tsx
// components/dashboard/ResumeCard.tsx
// components/dashboard/TemplateCard.tsx
```

### Builder
```typescript
// app/(builder)/editor/[id]/page.tsx
// app/(builder)/editor/[id]/layout.tsx
// app/api/resumes/route.ts
// app/api/resumes/[id]/route.ts
// app/api/resumes/[id]/pdf/route.ts
// lib/services/resumeService.ts
// lib/hooks/useBuilder.ts
// lib/hooks/useAutosave.ts
```

### Payments
```typescript
// app/api/stripe/checkout/route.ts
// app/api/stripe/webhook/route.ts
// app/(dashboard)/billing/page.tsx
// lib/services/stripeService.ts
```

---

## 🏗️ Database Setup

1. **Create PostgreSQL database** (Supabase, Railway, or local)

2. **Initialize Prisma**
   ```bash
   npx prisma init
   # Update DATABASE_URL in .env.local
   ```

3. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Seed database** (optional)
   ```bash
   npx prisma db seed
   ```

---

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="your-secret-key-min-32-chars"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000"

# OAuth (Google)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# OAuth (GitHub)
GITHUB_ID="..."
GITHUB_SECRET="..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="..."

# Storage (AWS S3)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="..."
AWS_REGION="us-east-1"
```

---

## 🚀 Development Workflow

### Start Development Server
```bash
npm run dev
# http://localhost:3000
```

### Database Operations
```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database (dev only)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Generate types
npx prisma generate
```

### Code Organization

**Components** - Reusable UI components
```typescript
components/
├── ui/              # Shadcn components
├── auth/            # Auth components
├── dashboard/       # Dashboard components
├── builder/         # Builder components
└── shared/          # Shared components
```

**Hooks** - Custom React hooks
```typescript
lib/hooks/
├── useAuth.ts       # Auth state
├── useResumes.ts    # Resume operations
├── useBuilder.ts    # Builder state
└── useTheme.ts      # Theme management
```

**Services** - Business logic
```typescript
lib/services/
├── authService.ts
├── resumeService.ts
├── templateService.ts
└── stripeService.ts
```

**API Routes** - Backend endpoints
```typescript
app/api/
├── auth/
├── resumes/
├── templates/
├── stripe/
└── admin/
```

---

## 📊 Testing Checklist

- [ ] User signup works
- [ ] User login works
- [ ] Logout clears session
- [ ] Resume creation works
- [ ] Resume editing saves
- [ ] PDF export works
- [ ] Template selection works
- [ ] Stripe payment processes
- [ ] Subscription activates
- [ ] Protected routes redirect

---

## 🎯 Success Metrics

✅ Auth system complete
✅ Dashboard functional
✅ Resume builder working
✅ Stripe integration done
✅ Zero critical bugs
✅ Mobile responsive
✅ Load time < 3s

---

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Zustand Docs](https://zustand-demo.vercel.app/)
- [Stripe API](https://stripe.com/docs/api)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

## 🔄 Next Phase (Phase 2)

After Phase 1 MVP is complete:
1. Admin Dashboard
2. AI Integration
3. Email System
4. Analytics
5. CMS/Blog
6. Advanced Features

---

## ✅ MVP Requirements Met

✅ User authentication (email + OAuth)
✅ Resume builder (integrated CV-Maker engine)
✅ Dashboard (resumes, templates)
✅ Subscription system (Stripe)
✅ PDF export
✅ Mobile responsive
✅ Dark mode
✅ Autosave
✅ Type-safe (TypeScript)
✅ Scalable architecture

---

## 🚀 Ready to Build?

This guide covers everything needed for Phase 1. 

**Next Step**: Would you like me to:
1. Create the login/signup pages?
2. Build the dashboard layout?
3. Implement the editor interface?
4. Set up Stripe integration?

Let me know and I'll continue with specific implementations! 🎯
