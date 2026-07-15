# Resume Builder SaaS - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│                       (Next.js 15 + React 19)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Auth Pages  │  │  Dashboard   │  │   Builder    │           │
│  │              │  │              │  │              │           │
│  │ • Login      │  │ • Resumes    │  │ • Editor     │           │
│  │ • Signup     │  │ • Templates  │  │ • Preview    │           │
│  │ • OAuth      │  │ • Profile    │  │ • Export     │           │
│  │ • Password   │  │ • Billing    │  │ • Settings   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              COMPONENTS LAYER                              │  │
│  │                                                              │  │
│  │  • UI Components (Buttons, Forms, Cards, etc)             │  │
│  │  • Auth Components (LoginForm, SignupForm)                │  │
│  │  • Dashboard Components (Sidebar, Cards)                  │  │
│  │  • Builder Components (Canvas, Toolbar, Panels)           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              STATE MANAGEMENT (Zustand)                    │  │
│  │                                                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │  │
│  │  │ authStore    │  │ builderStore │  │ uiStore      │      │  │
│  │  │              │  │              │  │              │      │  │
│  │  │ • user       │  │ • resume     │  │ • theme      │      │  │
│  │  │ • token      │  │ • template   │  │ • sidebar    │      │  │
│  │  │ • auth       │  │ • history    │  │ • modal      │      │  │
│  │  │ • methods    │  │ • autosave   │  │ • methods    │      │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │  │
│  │                                                              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              HOOKS LAYER                                   │  │
│  │                                                              │  │
│  │  • useAuth() - Authentication state & methods             │  │
│  │  • useResumes() - Resume CRUD operations                  │  │
│  │  • useBuilder() - Editor state & methods                  │  │
│  │  • useTheme() - Theme management                          │  │
│  │  • useAutosave() - Automatic saving                       │  │
│  │                                                              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER                                 │
│                   (API Client + Routes)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              API CLIENT (Centralized)                     │   │
│  │                                                             │   │
│  │  • fetch() with automatic auth headers                   │   │
│  │  • Error handling & retry logic                          │   │
│  │  • Request/response interceptors                         │   │
│  │  • File upload support                                   │   │
│  │                                                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            NEXT.JS API ROUTES                             │   │
│  │                                                             │   │
│  │  POST   /api/auth/login                                  │   │
│  │  POST   /api/auth/signup                                 │   │
│  │  POST   /api/auth/logout                                 │   │
│  │  POST   /api/auth/google                                 │   │
│  │  POST   /api/auth/github                                 │   │
│  │  GET    /api/auth/me                                     │   │
│  │                                                             │   │
│  │  GET    /api/resumes                                     │   │
│  │  POST   /api/resumes                                     │   │
│  │  GET    /api/resumes/[id]                                │   │
│  │  PUT    /api/resumes/[id]                                │   │
│  │  DELETE /api/resumes/[id]                                │   │
│  │  POST   /api/resumes/[id]/pdf                            │   │
│  │                                                             │   │
│  │  GET    /api/templates                                   │   │
│  │  GET    /api/templates/[id]                              │   │
│  │                                                             │   │
│  │  POST   /api/stripe/checkout                             │   │
│  │  POST   /api/stripe/webhook                              │   │
│  │                                                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                           │
│                       (Services)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ authService  │  │ resumeService│  │ stripeService│           │
│  │              │  │              │  │              │           │
│  │ • login()    │  │ • create()   │  │ • charge()   │           │
│  │ • signup()   │  │ • update()   │  │ • refund()   │           │
│  │ • verify()   │  │ • delete()   │  │ • webhook()  │           │
│  │ • hash()     │  │ • export()   │  │ • invoice()  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │templateService│ │emailService  │  │ aiService    │           │
│  │              │  │              │  │              │           │
│  │ • list()     │  │ • send()     │  │ • improve()  │           │
│  │ • get()      │  │ • welcome()  │  │ • rewrite()  │           │
│  │ • create()   │  │ • notify()   │  │ • generate() │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                             │
│                  (Prisma ORM + Models)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Prisma Client provides type-safe database access:             │
│                                                                   │
│  • prisma.user.findUnique()                                     │
│  • prisma.resume.create()                                       │
│  • prisma.resume.update()                                       │
│  • prisma.resume.delete()                                       │
│  • prisma.template.findMany()                                   │
│  • prisma.subscription.update()                                 │
│  • prisma.payment.create()                                      │
│                                                                   │
│  Auto-generated from schema.prisma                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PERSISTENCE LAYER                             │
│                   (PostgreSQL Database)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Users        │  │ Resumes      │  │ Templates    │           │
│  │              │  │              │  │              │           │
│  │ • id         │  │ • id         │  │ • id         │           │
│  │ • email      │  │ • userId     │  │ • name       │           │
│  │ • password   │  │ • templateId │  │ • layout     │           │
│  │ • tier       │  │ • content    │  │ • theme      │           │
│  │ • role       │  │ • status     │  │ • isPremium  │           │
│  │ • avatar     │  │ • downloads  │  │ • rating     │           │
│  │ • createdAt  │  │ • updatedAt  │  │ • createdAt  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Subscriptions│  │ Payments     │  │ Activity Log │           │
│  │              │  │              │  │              │           │
│  │ • id         │  │ • id         │  │ • id         │           │
│  │ • userId     │  │ • userId     │  │ • userId     │           │
│  │ • plan       │  │ • amount     │  │ • action     │           │
│  │ • status     │  │ • status     │  │ • resource   │           │
│  │ • stripeId   │  │ • stripeId   │  │ • timestamp  │           │
│  │ • expiresAt  │  │ • invoiceUrl │  │ • details    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL INTEGRATIONS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Stripe       │  │ AWS S3       │  │ Google/GitHub│           │
│  │              │  │              │  │              │           │
│  │ • Checkout   │  │ • Upload     │  │ • OAuth      │           │
│  │ • Billing    │  │ • Retrieve   │  │ • Profile    │           │
│  │ • Webhook    │  │ • Delete     │  │ • Token      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Resend       │  │ OpenAI       │  │ Cloudinary   │           │
│  │              │  │              │  │              │           │
│  │ • Emails     │  │ • Improve    │  │ • Images     │           │
│  │ • Templates  │  │ • Generate   │  │ • Optimize   │           │
│  │ • Analytics  │  │ • Rewrite    │  │ • Transform  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - User Authentication

```
User Input
   ↓
[LoginForm Component]
   ↓
Form Validation (Zod)
   ↓
POST /api/auth/login { email, password }
   ↓
[Auth API Route]
   ├─ Validate input
   ├─ Find user in DB
   ├─ Verify password
   ├─ Generate JWT token
   └─ Return { user, token }
   ↓
useAuthStore.login()
   ├─ Save user to state
   ├─ Save token to localStorage
   ├─ Save to cookie
   └─ Set isAuthenticated = true
   ↓
Store persisted (Zustand middleware)
   ↓
Redirect to /dashboard
   ↓
Protected routes check token
   ↓
Access granted ✅
```

---

## Data Flow - Resume Creation

```
User clicks "Create Resume"
   ↓
[Dashboard Component]
   ↓
useResumes.createResume({ title, templateId })
   ↓
POST /api/resumes { payload }
   ↓
[Resume API Route]
   ├─ Validate token
   ├─ Check subscription limits
   ├─ Create in database
   └─ Return new resume
   ↓
useBuilderStore.setResume(resume, template)
   ├─ Load resume content
   ├─ Initialize history
   ├─ Setup undo/redo
   └─ Set editor state
   ↓
Redirect to /editor/[id]
   ↓
[Editor Component Renders]
   ├─ Canvas shows template
   ├─ Sidebar shows content
   └─ Toolbar ready for editing
   ↓
User starts editing
   ↓
onChange → useBuilderStore.updateContent()
   ↓
Autosave (debounced 1000ms)
   ↓
PUT /api/resumes/[id] { content }
   ↓
Database updated ✅
   ↓
Success indicator shown
```

---

## Data Flow - Resume Export (PDF)

```
User clicks "Download PDF"
   ↓
[Editor Component]
   ↓
handleDownload() triggered
   ↓
GET /api/resumes/[id]/pdf
   ↓
[PDF Export Route]
   ├─ Get resume from DB
   ├─ Get template
   ├─ Render React component
   ├─ Convert to Canvas
   ├─ Export as PDF
   └─ Return PDF blob
   ↓
Browser receives blob
   ↓
Create download link
   ↓
Trigger download
   ↓
File saved to user's computer ✅
```

---

## State Management Architecture

```
Store
├── authStore (Auth state)
│   ├── State
│   │   ├── user: User | null
│   │   ├── token: string | null
│   │   ├── isAuthenticated: boolean
│   │   ├── isLoading: boolean
│   │   └── error: string | null
│   │
│   ├── Actions
│   │   ├── login(email, password)
│   │   ├── signup(email, password, name)
│   │   ├── loginWithGoogle(token)
│   │   ├── loginWithGithub(token)
│   │   ├── logout()
│   │   └── refreshToken()
│   │
│   └── Selectors
│       ├── isAdmin()
│       ├── isPremium()
│       └── canManageTemplate()
│
├── builderStore (Editor state)
│   ├── State
│   │   ├── resume: Resume | null
│   │   ├── template: Template | null
│   │   ├── selectedBlockId: string | null
│   │   ├── isDragging: boolean
│   │   ├── zoom: number
│   │   ├── history: ResumeSections[]
│   │   ├── historyIndex: number
│   │   └── isDirty: boolean
│   │
│   ├── Actions
│   │   ├── setResume(resume, template)
│   │   ├── updateContent(content)
│   │   ├── undo()
│   │   ├── redo()
│   │   └── markSaved()
│   │
│   └── Selectors
│       ├── canUndo()
│       ├── canRedo()
│       └── isDirty()
│
└── uiStore (UI state)
    ├── State
    │   ├── theme: 'light' | 'dark'
    │   ├── sidebarOpen: boolean
    │   ├── modalOpen: boolean
    │   └── notifications: Notification[]
    │
    ├── Actions
    │   ├── toggleTheme()
    │   ├── toggleSidebar()
    │   └── addNotification()
    │
    └── Selectors
        └── isDarkMode()
```

---

## API Endpoint Structure

```
Authentication
├── POST /api/auth/signup        - Create account
├── POST /api/auth/login         - Login
├── POST /api/auth/logout        - Logout
├── POST /api/auth/refresh       - Refresh token
├── POST /api/auth/google        - Google OAuth
├── POST /api/auth/github        - GitHub OAuth
└── GET  /api/auth/me            - Current user

Resumes
├── GET  /api/resumes            - List resumes
├── POST /api/resumes            - Create resume
├── GET  /api/resumes/[id]       - Get resume
├── PUT  /api/resumes/[id]       - Update resume
├── DELETE /api/resumes/[id]     - Delete resume
├── POST /api/resumes/[id]/pdf   - Export PDF
├── POST /api/resumes/[id]/share - Share resume
└── POST /api/resumes/[id]/duplicate - Clone resume

Templates
├── GET  /api/templates          - List templates
├── GET  /api/templates/[id]     - Get template
├── POST /api/templates          - Create template (admin)
├── PUT  /api/templates/[id]     - Update template (admin)
└── DELETE /api/templates/[id]   - Delete template (admin)

Stripe
├── POST /api/stripe/checkout    - Create payment session
├── GET  /api/stripe/customer    - Get customer info
├── POST /api/stripe/webhook     - Webhook handler
└── POST /api/stripe/cancel      - Cancel subscription

Admin
├── GET  /api/admin/users        - List users
├── GET  /api/admin/analytics    - Get analytics
├── POST /api/admin/templates    - Manage templates
└── POST /api/admin/settings     - System settings
```

---

## Technology Stack

```
Frontend
├── Next.js 15 (Framework)
├── React 19 (UI)
├── TypeScript (Type safety)
├── Zustand (State management)
├── Zod (Validation)
├── React Hook Form (Forms)
├── Tailwind CSS (Styling)
└── Framer Motion (Animations)

Backend
├── Next.js API Routes
├── Node.js (Runtime)
├── Express/NestJS (Optional full backend)
└── TypeScript

Database
├── PostgreSQL (Primary database)
├── Prisma (ORM)
└── Redis (Optional caching)

External Services
├── Stripe (Payments)
├── Google/GitHub (OAuth)
├── AWS S3 (File storage)
├── OpenAI/Claude (AI)
├── Resend (Email)
└── Sentry (Error tracking)

Deployment
├── Vercel (Frontend)
├── Railway/Supabase (Database)
├── GitHub Actions (CI/CD)
└── Docker (Containerization)
```

---

## Security Architecture

```
Request Flow with Security
├── HTTPS/TLS Layer
│   └── Encrypt data in transit
│
├── CORS Headers
│   └── Restrict origins
│
├── Authentication Middleware
│   ├── Verify JWT token
│   ├── Check if valid
│   └── Extract user info
│
├── Authorization Middleware
│   ├── Check user role
│   ├── Verify permissions
│   └── Check resource ownership
│
├── Input Validation
│   ├── Zod schema validation
│   ├── Type checking
│   └── Sanitization
│
├── Rate Limiting
│   ├── IP-based limiting
│   ├── User-based limiting
│   └── Endpoint-specific limits
│
└── Database Layer
    ├── Parameterized queries (Prisma)
    ├── SQL injection prevention
    ├── Row-level security
    └── Encryption at rest

Sensitive Data Protection
├── Passwords: bcrypt hashing
├── Tokens: JWT signed
├── API Keys: Environment variables
├── Database: Credentials in .env
└── Files: S3 with ACLs
```

---

This architecture is designed to be:
- ✅ **Scalable** - Handle millions of users
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Secure** - Defense in depth
- ✅ **Performant** - Optimized at each layer
- ✅ **Extensible** - Easy to add new features

Everything is type-safe and production-ready! 🚀
