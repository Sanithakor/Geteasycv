# Resume Builder SaaS - Enterprise Architecture

## 📊 Complete Project Structure

```
resume-builder-saas/
├── frontend/                          # Next.js 15 Frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── oauth/callback/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── my-resumes/page.tsx
│   │   │   ├── templates/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (builder)/
│   │   │   ├── editor/[id]/page.tsx
│   │   │   ├── preview/[id]/page.tsx
│   │   │   └── share/[shareId]/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (dashboard)
│   │   │   ├── users/
│   │   │   ├── templates/
│   │   │   ├── payments/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── auth/[...auth]/route.ts
│   │   │   ├── resumes/route.ts
│   │   │   ├── templates/route.ts
│   │   │   ├── ai/route.ts
│   │   │   ├── upload/route.ts
│   │   │   ├── stripe/webhook/route.ts
│   │   │   └── admin/route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx (landing)
│   ├── components/
│   │   ├── ui/                        # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── OAuthButtons.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── ResumeCard.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── builder/
│   │   │   ├── Editor/
│   │   │   │   ├── Canvas.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Toolbar.tsx
│   │   │   │   ├── BlockSelector.tsx
│   │   │   │   └── PropertiesPanel.tsx
│   │   │   ├── Preview.tsx
│   │   │   ├── DragDropProvider.tsx
│   │   │   └── BlockRenderer.tsx
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminTopbar.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── TemplateManager.tsx
│   │   │   └── AnalyticsDashboard.tsx
│   │   └── shared/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── Navbar.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── Toast.tsx
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts               # API client
│   │   │   ├── endpoints.ts            # API URLs
│   │   │   └── interceptors.ts         # Request/Response
│   │   ├── auth/
│   │   │   ├── useAuth.ts
│   │   │   ├── withAuth.tsx
│   │   │   └── session.ts
│   │   ├── hooks/
│   │   │   ├── useResumes.ts
│   │   │   ├── useBuilder.ts
│   │   │   ├── useUser.ts
│   │   │   └── useTheme.ts
│   │   ├── services/
│   │   │   ├── resumeService.ts
│   │   │   ├── templateService.ts
│   │   │   ├── aiService.ts
│   │   │   ├── uploadService.ts
│   │   │   └── stripeService.ts
│   │   ├── store/
│   │   │   ├── authStore.ts            # Zustand
│   │   │   ├── builderStore.ts
│   │   │   ├── uiStore.ts
│   │   │   └── adminStore.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── pdf-generator.ts
│   │   └── types/
│   │       ├── index.ts
│   │       ├── api.ts
│   │       ├── user.ts
│   │       ├── resume.ts
│   │       ├── template.ts
│   │       └── builder.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   ├── animations.css
│   │   └── themes.css
│   ├── public/
│   │   ├── icons/
│   │   ├── images/
│   │   ├── templates/
│   │   └── logos/
│   ├── .env.local
│   ├── .env.example
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── package.json
│   └── README.md

└── backend/                           # Node.js Backend (Optional - API Routes)
    ├── src/
    │   ├── config/
    │   │   ├── database.ts
    │   │   ├── stripe.ts
    │   │   ├── aws.ts
    │   │   ├── redis.ts
    │   │   └── mail.ts
    │   ├── middleware/
    │   │   ├── auth.ts
    │   │   ├── admin.ts
    │   │   ├── errorHandler.ts
    │   │   └── validation.ts
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── userController.ts
    │   │   ├── resumeController.ts
    │   │   ├── templateController.ts
    │   │   ├── aiController.ts
    │   │   ├── paymentController.ts
    │   │   └── adminController.ts
    │   ├── services/
    │   │   ├── authService.ts
    │   │   ├── userService.ts
    │   │   ├── resumeService.ts
    │   │   ├── templateService.ts
    │   │   ├── aiService.ts
    │   │   ├── emailService.ts
    │   │   ├── paymentService.ts
    │   │   └── storageService.ts
    │   ├── models/
    │   │   ├── User.ts
    │   │   ├── Resume.ts
    │   │   ├── Template.ts
    │   │   ├── Subscription.ts
    │   │   ├── Payment.ts
    │   │   └── Analytics.ts
    │   ├── routes/
    │   │   ├── auth.ts
    │   │   ├── users.ts
    │   │   ├── resumes.ts
    │   │   ├── templates.ts
    │   │   ├── ai.ts
    │   │   ├── payments.ts
    │   │   ├── admin.ts
    │   │   └── webhooks.ts
    │   ├── utils/
    │   │   ├── validators.ts
    │   │   ├── helpers.ts
    │   │   ├── jwt.ts
    │   │   └── errorHandler.ts
    │   ├── types/
    │   │   └── index.ts
    │   └── app.ts
    ├── prisma/
    │   ├── schema.prisma
    │   ├── migrations/
    │   └── seed.ts
    ├── .env
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    └── Dockerfile
```

---

## 🏛️ Architecture Layers

### 1. **Presentation Layer** (Frontend - Next.js)
- Pages (Route groups by feature)
- Components (Reusable, composable UI)
- Hooks (Custom business logic)
- Store (State management with Zustand)

### 2. **API Layer** (Next.js API Routes)
- Authentication endpoints
- CRUD operations
- File uploads
- Webhook handlers

### 3. **Business Logic Layer** (Services)
- User management
- Resume operations
- Template management
- AI integration
- Payment processing
- Email notifications

### 4. **Data Layer** (Database)
- PostgreSQL with Prisma ORM
- Migrations handled automatically
- Type-safe queries

### 5. **External Services**
- Authentication: NextAuth.js
- Storage: AWS S3 / Cloudinary
- Payments: Stripe
- AI: OpenAI / Claude
- Email: Resend

---

## 🔐 Authentication Flow

```
User → Login/Signup → OAuth/Email → JWT Token → Protected Routes
                                    ↓
                            Store in httpOnly Cookie
                                    ↓
                            Middleware validates on each request
```

---

## 📊 Database Schema (Prisma)

```prisma
model User {
  id String @id @default(cuid())
  email String @unique
  password String?
  name String
  avatar String?
  
  // OAuth
  googleId String? @unique
  githubId String? @unique
  
  // Subscription
  subscriptionId String?
  subscription Subscription?
  tier String @default("free") // free, pro, premium
  
  // Profile
  profile UserProfile?
  
  // Resumes
  resumes Resume[]
  
  // Roles
  role String @default("user") // user, admin, editor
  permissions String[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Resume {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])
  
  title String
  slug String @unique
  template String // templateId
  
  // Content
  personal PersonalInfo?
  experience Experience[]
  education Education[]
  skills Skill[]
  
  // Metadata
  isPublic Boolean @default(false)
  shareToken String? @unique
  
  // Usage
  downloads Int @default(0)
  views Int @default(0)
  
  // Versioning
  version Int @default(1)
  history ResumeHistory[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Template {
  id String @id @default(cuid())
  name String
  slug String @unique
  category String
  
  // Configuration
  layout Json // Block structure
  theme ThemeConfig @relation(fields: [themeId], references: [id])
  themeId String
  
  // Metadata
  thumbnail String
  preview String
  
  // Features
  isPremium Boolean @default(false)
  isATS Boolean @default(false)
  isRTL Boolean @default(false)
  
  // Stats
  downloads Int @default(0)
  uses Int @default(0)
  rating Float @default(0)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Subscription {
  id String @id @default(cuid())
  userId String @unique
  user User @relation(fields: [userId], references: [id])
  
  plan String // "free", "pro", "premium"
  status String // "active", "canceled", "expired"
  
  // Stripe
  stripeId String?
  stripeCustomerId String?
  
  currentPeriodStart DateTime?
  currentPeriodEnd DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Payment {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])
  
  amount Float
  currency String
  status String // "pending", "completed", "failed"
  
  stripePaymentId String?
  invoiceUrl String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🔄 State Management (Zustand)

```typescript
// authStore - User authentication state
// builderStore - Resume builder state
// uiStore - UI preferences (theme, sidebar, etc.)
// adminStore - Admin dashboard state
```

---

## 🎯 Phase 1: MVP (Weeks 1-4)

1. **Authentication System**
   - Email/password signup
   - Google OAuth
   - JWT tokens
   - Protected routes

2. **User Dashboard**
   - My Resumes page
   - Template gallery
   - Basic profile

3. **Resume Builder**
   - Use existing CV-Maker engine
   - Autosave functionality
   - PDF export

4. **Basic Payments**
   - Stripe integration
   - Free vs Pro plans
   - Subscription management

---

## 📈 Phase 2: Features (Weeks 5-8)

1. **Admin Dashboard**
   - User management
   - Template management
   - Basic analytics

2. **AI Features**
   - Job description analyzer
   - Content suggestions
   - Auto-fill capabilities

3. **Email System**
   - Welcome emails
   - Subscription notifications
   - Password recovery

---

## 🚀 Deployment Strategy

- **Frontend**: Vercel (optimized for Next.js)
- **Database**: Supabase or Railway (PostgreSQL)
- **Storage**: AWS S3
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry + LogRocket

---

## 🔑 Key Principles

✅ **Modularity** - Each feature is independent
✅ **Scalability** - Handles 100K+ users
✅ **Type Safety** - 100% TypeScript
✅ **Performance** - Optimized bundles, ISR
✅ **Security** - CORS, CSRF, Rate limiting
✅ **Accessibility** - WCAG 2.1 AA
✅ **Testing** - Unit, integration, E2E
✅ **Documentation** - Every module documented

---

## 📝 Next Steps

Ready to start building:
1. Initialize Next.js project with clean structure
2. Set up authentication system
3. Build dashboard layout
4. Connect database
5. Implement Phase 1 features

Should I proceed? 🚀
