# Resume Builder SaaS - Enterprise Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 15)                    │
├─────────────────────────────────────────────────────────────┤
│  User App          │     Admin Panel      │    Public Pages  │
│  - Dashboard       │  - User Management   │  - Landing Page  │
│  - Resume Builder  │  - Template Manager  │  - Pricing       │
│  - Downloads       │  - Analytics         │  - Blog          │
│  - Settings        │  - Theme Builder     │  - Docs          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  API Layer (Node.js/Express)                 │
├─────────────────────────────────────────────────────────────┤
│  Auth Routes       │  Resume Routes       │  Admin Routes    │
│  - Login/Register  │  - CRUD Operations   │  - User Mgmt     │
│  - OAuth           │  - Preview/Export    │  - Template Mgmt │
│  - JWT             │  - AI Integration    │  - Settings      │
│                    │  - Collaboration     │                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer                             │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL (Prisma)  │  Redis Cache  │  AWS S3/Cloudinary  │
│  - Users              │  - Sessions   │  - Assets            │
│  - Resumes            │  - Tokens     │  - Exports           │
│  - Templates          │  - Settings   │  - Media Library     │
│  - Subscriptions      │               │                      │
│  - Payments           │               │                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
├─────────────────────────────────────────────────────────────┤
│  Stripe  │  OAuth Providers  │  AI APIs  │  Email Services  │
│  Payments    Google/GitHub    OpenAI    Resend/SMTP         │
└─────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
resume-builder-saas/
├── apps/
│   ├── web/                          # Next.js Frontend (SSR)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/                  # App Router
│   │   │   │   ├── (public)/         # Public routes
│   │   │   │   │   ├── page.tsx      # Landing page
│   │   │   │   │   ├── pricing/
│   │   │   │   │   ├── blog/
│   │   │   │   │   └── docs/
│   │   │   │   ├── (auth)/           # Auth routes
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   └── oauth-callback/
│   │   │   │   ├── (dashboard)/      # Protected routes
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── resumes/
│   │   │   │   │   ├── templates/
│   │   │   │   │   ├── settings/
│   │   │   │   │   ├── billing/
│   │   │   │   │   └── downloads/
│   │   │   │   ├── editor/           # Resume Editor
│   │   │   │   │   └── [resumeId]/
│   │   │   │   ├── admin/            # Admin Panel (protected)
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── users/
│   │   │   │   │   ├── templates/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   ├── settings/
│   │   │   │   │   └── builder/      # Template Builder
│   │   │   │   └── api/
│   │   │   │       ├── auth/
│   │   │   │       ├── resumes/
│   │   │   │       ├── templates/
│   │   │   │       ├── admin/
│   │   │   │       ├── ai/
│   │   │   │       ├── payments/
│   │   │   │       └── upload/
│   │   │   ├── components/
│   │   │   │   ├── ui/              # Base components
│   │   │   │   ├── layout/          # Layout components
│   │   │   │   ├── dashboard/       # Dashboard components
│   │   │   │   ├── editor/          # Editor components
│   │   │   │   ├── admin/           # Admin components
│   │   │   │   └── common/          # Shared components
│   │   │   ├── lib/
│   │   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   ├── utils/
│   │   │   │   ├── hooks/
│   │   │   │   ├── validation/
│   │   │   │   └── constants/
│   │   │   ├── store/               # Zustand stores
│   │   │   ├── types/
│   │   │   └── styles/
│   │   ├── package.json
│   │   └── next.config.ts
│   │
│   └── api/                         # Node.js/Express Backend
│       ├── src/
│       │   ├── routes/
│       │   │   ├── auth.ts
│       │   │   ├── resumes.ts
│       │   │   ├── templates.ts
│       │   │   ├── admin/
│       │   │   ├── payments/
│       │   │   ├── ai/
│       │   │   └── upload.ts
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── middleware/
│       │   ├── db/
│       │   │   ├── prisma.ts
│       │   │   └── seeders/
│       │   ├── utils/
│       │   ├── types/
│       │   ├── config/
│       │   └── index.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seeds.ts
│       ├── package.json
│       └── .env.example
│
├── packages/                        # Shared packages
│   ├── types/                       # Shared TypeScript types
│   ├── validation/                  # Zod schemas
│   └── constants/
│
└── docs/
    ├── API.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    └── DEVELOPMENT.md
```

## Database Schema (Prisma)

```prisma
// Core Models
- User
  - id, email, name, avatar, role, status
  - subscription, credits, storage
  - social logins, preferences

- Resume
  - id, userId, title, slug
  - content (JSON), templateId
  - published, archived, shared
  - versions, created, updated

- ResumeTemplate
  - id, name, description, category
  - layout (JSON), theme
  - thumbnail, featured, premium
  - creator (admin), views, downloads

- Subscription
  - id, userId, planId
  - status, current period, renews at
  - stripe subscription id

- SubscriptionPlan
  - id, name, price, tier
  - features, limits (resumes, storage, AI)

- Payment
  - id, userId, subscriptionId
  - amount, currency, status
  - stripe reference

- AIUsage
  - id, userId, date, tokens, model
  - type (rewrite, improve, generate)

- MediaLibrary
  - id, userId/admin, type
  - url, name, size, uploaded at

- AdminTemplate (for template builder)
  - id, name, blocks (JSON), theme
  - css, js, active

- User Activity Log
  - id, userId, action, resource
  - timestamp, ip, user agent
```

## Authentication Flow

```
Login/Register
    ↓
Email + Password → JWT Token
or
OAuth (Google/GitHub) → Callback → JWT Token
    ↓
Store in HTTPOnly Cookie + localStorage (token)
    ↓
Add to Redux/Zustand Store
    ↓
API middleware validates JWT
    ↓
Refresh token on expiry
```

## Subscription System

```
Free Plan
├── 1 Resume
├── Basic Templates
├── 100MB Storage
└── Limited Exports

Pro Plan ($10/month)
├── 5 Resumes
├── All Templates
├── 1GB Storage
├── AI Assistant (Basic)
└── Priority Support

Business Plan ($20/month)
├── Unlimited Resumes
├── Premium Templates
├── 5GB Storage
├── AI Assistant (Full)
└── Team Collaboration
```

## Key Features Architecture

### 1. Resume Builder (MVP)
- Drag & drop sections
- Real-time preview
- Auto-save (every 5 seconds)
- Version history (last 10)
- Multi-page support
- Export (PDF, DOCX, PNG)

### 2. Admin Panel
- User management CRUD
- Template management CRUD
- Theme/Font builder
- Analytics dashboard
- Email templates
- System settings

### 3. AI Integration
- Context: Selected AI model (OpenAI/Claude/Gemini)
- Types:
  - Rewrite bullet points
  - Improve summary
  - Generate skills
  - Suggest formatting

### 4. Payments
- Stripe integration
- Subscription management
- Invoice generation
- Coupon system
- Refund handling

### 5. File Storage
- AWS S3 for exports
- Cloudinary for images
- Signed URLs for downloads

## API Endpoints (Express)

```
Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/oauth/google
GET    /api/auth/oauth/github

Resumes
GET    /api/resumes
POST   /api/resumes
GET    /api/resumes/:id
PUT    /api/resumes/:id
DELETE /api/resumes/:id
POST   /api/resumes/:id/export
POST   /api/resumes/:id/share
GET    /api/resumes/:id/versions

Templates
GET    /api/templates
GET    /api/templates/:id
POST   /api/templates/preview

Admin
GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
GET    /api/admin/analytics
GET    /api/admin/templates

Payments
POST   /api/payments/subscribe
POST   /api/payments/webhook
GET    /api/payments/invoice/:id

Upload
POST   /api/upload
GET    /api/media-library
```

## Technology Stack Details

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Forms**: React Hook Form + Zod
- **State**: Zustand + TanStack Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Export**: @react-pdf/renderer
- **Editor**: Lexical or Draft.js

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: JWT + Passport.js (OAuth)
- **Validation**: Zod
- **API Client**: Axios
- **File Upload**: Multer + AWS SDK

### External Services
- **Payments**: Stripe API
- **Email**: Resend or SendGrid
- **AI**: OpenAI API, Claude API, Gemini API
- **Storage**: AWS S3
- **Images**: Cloudinary
- **Auth**: Google OAuth, GitHub OAuth
- **Analytics**: PostHog or Mixpanel
- **Error Tracking**: Sentry

## Security Architecture

```
├── Authentication
│   ├── JWT tokens (15min expiry)
│   ├── Refresh tokens (7 days)
│   ├── HTTPOnly cookies
│   └── CSRF protection
│
├── Authorization
│   ├── Role-based access control (RBAC)
│   ├── Resource-level permissions
│   └── Admin-only routes
│
├── Data Protection
│   ├── Encryption at rest (PG)
│   ├── HTTPS/TLS in transit
│   ├── Input validation (Zod)
│   └── SQL injection prevention (Prisma)
│
└── API Security
    ├── Rate limiting
    ├── CORS configuration
    ├── Helmet.js middleware
    └── API key rotation
```

## Deployment Architecture

```
Vercel (Frontend)
├── Next.js 15 deployed
├── Auto-scaling
├── Edge functions
└── CDN (images, assets)

Railway/Render (Backend)
├── Express API deployed
├── PostgreSQL database
├── Redis cache
└── Environment variables

AWS S3 (Storage)
├── Resume exports
├── Media library
└── Backups

Cloudinary (Images)
└── User avatars, templates

CI/CD
├── GitHub Actions
├── Tests on push
├── Deploy on merge to main
└── Automated rollback
```

## Development Workflow

### Phase 1: Foundation (Week 1-2)
- [x] Project setup
- [x] Database schema
- [ ] Authentication system
- [ ] API boilerplate

### Phase 2: Core Features (Week 3-4)
- [ ] Resume CRUD
- [ ] Template system
- [ ] Editor integration
- [ ] Export functionality

### Phase 3: Admin & Payments (Week 5-6)
- [ ] Admin dashboard
- [ ] Template builder
- [ ] Stripe integration
- [ ] Subscription system

### Phase 4: AI & Advanced (Week 7-8)
- [ ] AI integration
- [ ] Analytics
- [ ] Email system
- [ ] CMS/Blog

## Performance Targets

- **Page Load**: < 2 seconds
- **API Response**: < 200ms
- **Resume Save**: Auto-save every 5s
- **Export Time**: < 5 seconds
- **Image Optimization**: Automatic via Cloudinary
- **Database**: 3-replica setup for HA

## Monitoring & Analytics

```
Frontend Metrics
├── Core Web Vitals (LCP, FID, CLS)
├── Page load time
├── User interactions
└── Error tracking

Backend Metrics
├── API response time
├── Database query time
├── Server resource usage
└── Error rates

Business Metrics
├── User growth
├── Subscription conversion
├── AI token usage
└── Storage utilization
```

## Next Steps

1. Set up project structure
2. Configure database schema
3. Build authentication system
4. Create API boilerplate
5. Design admin dashboard UI
6. Implement resume editor
7. Integrate payments
8. Deploy to production

---

**Ready to start Phase 1: Foundation?**
