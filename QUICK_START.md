# 🚀 Quick Start - Resume Builder SaaS

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install zustand zod axios react-hook-form next-auth bcryptjs jsonwebtoken
npm install -D prisma @prisma/client
```

### 2. Create .env.local
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"

# JWT
JWT_SECRET="your-secret-key-min-32-characters-long"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Initialize Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start Development
```bash
npm run dev
# http://localhost:3000
```

---

## 📁 Key Files

| File | Purpose | Status |
|------|---------|--------|
| `types/index.ts` | Type definitions | ✅ Ready |
| `lib/store/authStore.ts` | Auth state | ✅ Ready |
| `lib/store/builderStore.ts` | Builder state | ✅ Ready |
| `lib/api/client.ts` | API client | ✅ Ready |
| `lib/hooks/useResumes.ts` | Resume operations | ✅ Ready |
| `components/auth/LoginForm.tsx` | Login form | ✅ Ready |
| `app/(auth)/login/page.tsx` | Login page | ✅ Ready |
| `prisma/schema.prisma` | Database schema | ✅ Ready |
| `app/api/auth/login/route.ts` | Auth endpoint | 🔄 Mock |

---

## 🎯 Core Components

### Authentication Store
```typescript
import { useAuthStore } from '@/lib/store/authStore';

// In component
const { user, login, logout, isAuthenticated } = useAuthStore();
```

### Builder Store
```typescript
import { useBuilderStore } from '@/lib/store/builderStore';

// In component
const { resume, updateContent, undo, redo } = useBuilderStore();
```

### API Client
```typescript
import { apiClient } from '@/lib/api/client';

// Make requests
const { data } = await apiClient.get('/resumes');
const { data } = await apiClient.post('/resumes', payload);
```

### Resume Hook
```typescript
import { useResumes } from '@/lib/hooks/useResumes';

// In component
const { resumes, createResume, updateResume, deleteResume } = useResumes();
```

---

## 🗄️ Database

### Create Tables
```bash
npx prisma migrate dev --name init
```

### View Data
```bash
npx prisma studio
```

### Reset Database (dev only)
```bash
npx prisma migrate reset
```

---

## 🔐 Authentication Flow

```
User fills login form
    ↓
POST /api/auth/login { email, password }
    ↓
useAuthStore.login() called
    ↓
Token stored in localStorage + cookie
    ↓
Redirect to /dashboard
```

---

## 📝 Next Steps

### Immediate (This Week)
1. [ ] Set up environment variables
2. [ ] Initialize database
3. [ ] Create signup page
4. [ ] Implement OAuth
5. [ ] Build dashboard layout

### This Sprint (2-4 Weeks)
1. [ ] Complete auth system
2. [ ] Create resume CRUD
3. [ ] Build editor UI
4. [ ] Implement autosave
5. [ ] Setup Stripe

### Phase 2 (Weeks 5-8)
1. [ ] Admin dashboard
2. [ ] AI integration
3. [ ] Email system
4. [ ] Analytics
5. [ ] CMS/Blog

---

## 🧪 Testing

### Test Login
1. Go to http://localhost:3000/login
2. Enter test credentials
3. Should redirect to /dashboard

### Test API
```bash
# Get resumes
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/resumes
```

---

## 📚 File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx          ✅
│   ├── (dashboard)/
│   ├── (builder)/
│   └── api/
│       └── auth/
│           └── login/route.ts      ✅
├── components/
│   └── auth/
│       └── LoginForm.tsx           ✅
├── lib/
│   ├── store/
│   │   ├── authStore.ts            ✅
│   │   └── builderStore.ts         ✅
│   ├── api/
│   │   └── client.ts               ✅
│   ├── hooks/
│   │   └── useResumes.ts           ✅
│   └── types/
│       └── index.ts                ✅
└── types/
    └── index.ts                    ✅
```

---

## 🔧 Environment Variables

```bash
# Required
DATABASE_URL=           # PostgreSQL connection string
JWT_SECRET=             # Secret for JWT signing
NEXT_PUBLIC_API_URL=    # API base URL

# Optional (Phase 2)
STRIPE_SECRET_KEY=      # Stripe API key
GOOGLE_CLIENT_ID=       # Google OAuth
GITHUB_ID=              # GitHub OAuth
AWS_ACCESS_KEY_ID=      # AWS S3
```

---

## 💻 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npx prisma migrate dev  # Create migration
npx prisma studio      # View database GUI
npx prisma generate    # Generate types

# Build
npm run build           # Production build
npm run start           # Run production

# Types
tsc --noEmit           # Check types
```

---

## 📊 Database Schema

### Main Tables
- **User** - User accounts
- **Resume** - Resume documents
- **Template** - Resume templates
- **Subscription** - User subscriptions
- **Payment** - Payment records
- **Session** - Active sessions

### Data Relationships
```
User
├── Subscription
├── Resume
│   ├── Experience
│   ├── Education
│   ├── Skill
│   └── Project
├── Payment
└── ActivityLog
```

---

## 🎨 UI Components Ready

- ✅ LoginForm
- ✅ Login Page
- 🔄 SignupForm
- 🔄 Dashboard Layout
- 🔄 Resume Editor
- 🔄 Template Selector

---

## 🚨 Common Issues

### "DATABASE_URL is not set"
```bash
# Set in .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
```

### "Prisma Client not found"
```bash
npx prisma generate
npm install
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

---

## 📞 Quick Reference

### Login Store
```typescript
const auth = useAuthStore();
auth.login(email, password)     // Login
auth.logout()                   // Logout
auth.isPremium()                // Check tier
auth.isAdmin()                  // Check role
```

### Builder Store
```typescript
const builder = useBuilderStore();
builder.setResume(resume, template)  // Load
builder.updateContent(sections)      // Update
builder.undo()                       // Undo
builder.redo()                       // Redo
```

### API Client
```typescript
const { apiClient } = require('@/lib/api/client');
apiClient.get('/path')         // GET
apiClient.post('/path', data)  // POST
apiClient.put('/path', data)   // PUT
apiClient.delete('/path')      // DELETE
```

---

## 🎓 Best Practices

### Always use types
```typescript
// ✅ Good
const user: User = userData;

// ❌ Bad
const user: any = userData;
```

### Validate input
```typescript
// ✅ Good
const { email } = loginSchema.parse(data);

// ❌ Bad
const { email } = data;
```

### Handle errors
```typescript
// ✅ Good
try {
  await login();
} catch (error) {
  setError(error.message);
}

// ❌ Bad
await login(); // Ignores errors
```

### Use hooks
```typescript
// ✅ Good
const { resumes, loading } = useResumes();

// ❌ Bad
const [resumes, setResumes] = useState([]);
// Manual fetch...
```

---

## 🚀 Deploy to Production

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
```

### Manual
```bash
# Build
npm run build

# Start
npm start
```

---

## 📖 Full Documentation

- See `PROJECT_ARCHITECTURE.md` for detailed architecture
- See `IMPLEMENTATION_GUIDE.md` for step-by-step tasks
- See `PHASE1_SETUP_COMPLETE.md` for file overview

---

## ✅ Checklist for First Run

- [ ] Node.js 18+ installed
- [ ] PostgreSQL database ready
- [ ] .env.local configured
- [ ] `npm install` completed
- [ ] `npx prisma generate` run
- [ ] `npm run dev` working
- [ ] Can access http://localhost:3000
- [ ] Login page loads

---

## 🎉 You're Ready!

Everything is set up and ready to go. Start building! 🚀

Need help? Check the documentation files or ask questions!

---

**Built with ❤️ for modern SaaS development**
