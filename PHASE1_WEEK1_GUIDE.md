# 🚀 Phase 1 Week 1 - Database & Authentication Setup
## Complete Implementation Guide

**Duration**: 1 week (5 working days)  
**Difficulty**: Medium  
**Priority**: 🔴 CRITICAL - Everything depends on this

---

## 📋 Overview

This week you'll:
1. Setup PostgreSQL database
2. Migrate Prisma schema
3. Replace mock authentication with real database
4. Implement password hashing
5. Setup JWT token management

**End of Week Result**: Real authentication that works with actual database users

---

## Day 1: Database Setup & Migration

### Task 1.1: Setup PostgreSQL

#### Option A: Docker (Recommended for Development)
```bash
# Pull and run PostgreSQL
docker run --name resume-db \
  -e POSTGRES_USER=developer \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=resume_builder \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:16

# Verify it's running
docker ps | grep resume-db

# Connect to container if needed
docker exec -it resume-db psql -U developer -d resume_builder
```

**Backup/Restore**:
```bash
# Backup database
docker exec resume-db pg_dump -U developer resume_builder > backup.sql

# Restore database
docker exec -i resume-db psql -U developer resume_builder < backup.sql
```

#### Option B: Supabase (Cloud - Recommended for Production)
```
1. Go to https://supabase.com
2. Create new project
3. Copy connection string
4. Use as DATABASE_URL
```

#### Option C: Local PostgreSQL
```bash
# Windows (using WSL)
wsl
sudo apt-get update
sudo apt-get install postgresql
sudo service postgresql start

# Then create database
sudo -u postgres psql
CREATE DATABASE resume_builder;
CREATE USER developer WITH PASSWORD 'password123';
ALTER ROLE developer SET client_encoding TO 'utf8';
ALTER ROLE developer SET default_transaction_isolation TO 'read committed';
ALTER ROLE developer SET default_transaction_deferrable TO 'off';
ALTER ROLE developer SET default_transaction_read_only TO 'off';
ALTER ROLE developer SET statement_timeout TO '0';
ALTER ROLE developer SET lock_timeout TO '0';
ALTER ROLE developer SET idle_in_transaction_session_timeout TO '0';
ALTER ROLE developer SET search_path TO 'public';
ALTER ROLE developer SET statement_timeout TO '0';
GRANT ALL PRIVILEGES ON DATABASE resume_builder TO developer;
```

### Task 1.2: Configure Environment Variables

**Create `.env.local`** (never commit this!):
```
# Database
DATABASE_URL="postgresql://developer:password123@localhost:5432/resume_builder"

# JWT
JWT_SECRET="your-super-secret-key-with-at-least-32-characters-change-me"

# Bcrypt
BCRYPT_ROUNDS=10

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"

# (Optional for later phases)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

**Verify**: Run `echo $DATABASE_URL` - should show your connection string

---

### Task 1.3: Migrate Prisma Schema

```bash
# 1. Install Prisma (already done, but verify)
npm install @prisma/client

# 2. Run migration (creates all tables)
npx prisma migrate dev --name init

# This will:
# - Create all tables from schema.prisma
# - Generate Prisma client
# - Create migration file

# 3. Verify migration succeeded
# Output should show:
# ✔ Generated Prisma Client
# ✔ Created migration `./prisma/migrations/...`
```

**If migration fails**:
```bash
# Check database connection
npx prisma db push --skip-generate

# View schema
npx prisma schema

# Reset database (CAREFUL - deletes data!)
npx prisma migrate reset
```

### Task 1.4: Verify Database Connection

```bash
# Open Prisma Studio
npx prisma studio

# Opens http://localhost:5555
# You should see all tables (User, Resume, Template, etc.)
# Empty, but structure is there ✓
```

**Checklist**:
- [ ] PostgreSQL running (Docker or local)
- [ ] `.env.local` has DATABASE_URL
- [ ] `npx prisma migrate dev` succeeded
- [ ] Prisma Studio opens and shows tables

---

## Day 2: Create Database Client & Seed Data

### Task 2.1: Create Database Client Instance

**File**: `lib/db.ts` (check if exists, should exist from template)

```typescript
import { PrismaClient } from '@prisma/client';

// Prevent multiple Prisma Client instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'], // Log all queries
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Task 2.2: Create Seed Script with Demo User

**File**: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash demo password
  const hashedPassword = await bcrypt.hash('DemoPassword123', 10);

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {}, // Don't update if exists
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
      subscriptionTier: 'free',
      role: 'user',
      profile: {
        create: {
          timezone: 'UTC',
          language: 'en',
        },
      },
      subscription: {
        create: {
          plan: 'free',
          status: 'active',
          resumes: 3,
          storage: 100,
          aiCredits: 10,
        },
      },
    },
    include: { profile: true, subscription: true },
  });

  console.log('✅ Demo user created:', demoUser.email);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      subscriptionTier: 'premium',
      role: 'admin',
      profile: {
        create: {
          timezone: 'UTC',
          language: 'en',
        },
      },
      subscription: {
        create: {
          plan: 'premium',
          status: 'active',
          resumes: 100,
          storage: 1000,
          aiCredits: 1000,
        },
      },
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create theme config
  const lightTheme = await prisma.themeConfig.upsert({
    where: { slug: 'light-theme' },
    update: {},
    create: {
      name: 'Light Theme',
      slug: 'light-theme',
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#FFFFFF',
      text: '#1F2937',
      textMuted: '#6B7280',
      border: '#E5E7EB',
      fontFamily: 'Inter',
      fontSizeBase: 16,
      lineHeight: 1.5,
      borderRadius: '12px',
    },
  });

  console.log('✅ Theme created:', lightTheme.name);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Update `package.json`**:
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

**Run seed**:
```bash
# First time setup
npm install ts-node

# Run seed
npx prisma db seed

# Check Prisma Studio
npx prisma studio
# Should now show demo@example.com and admin@example.com
```

**Checklist**:
- [ ] `lib/db.ts` exists and exports prisma
- [ ] `prisma/seed.ts` created
- [ ] `package.json` has seed script
- [ ] `npx prisma db seed` runs without errors
- [ ] Prisma Studio shows 2 users

---

## Day 3: Authentication Utilities

### Task 3.1: Create Auth Utilities

**File**: `lib/utils/auth.ts`

```typescript
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

// Get JWT secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS || 10));
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 */
export async function generateToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);

  return token;
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as { userId: string };
  } catch (err) {
    return null;
  }
}

/**
 * Validate password strength
 * - Minimum 8 characters
 * - At least 1 uppercase
 * - At least 1 lowercase
 * - At least 1 number
 * - At least 1 special character
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
```

**Install required packages**:
```bash
npm install jose bcryptjs

# Verify
npm ls jose bcryptjs
```

### Task 3.2: Create Auth Middleware

**File**: `lib/middleware/auth.ts`

```typescript
import { verifyToken } from '@/lib/utils/auth';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export interface AuthPayload {
  userId: string;
}

/**
 * Get auth payload from request headers
 */
export async function getAuthFromRequest(req: Request): Promise<AuthPayload | null> {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) return null;

    const payload = await verifyToken(token);
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Get auth payload from cookies (for server components/API)
 */
export async function getAuthFromCookies(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) return null;

    const payload = await verifyToken(token);
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(auth: AuthPayload | null) {
  if (!auth) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
}

/**
 * Protect API route
 * Usage: const auth = await protectRoute(req);
 */
export async function protectRoute(req: Request) {
  const auth = await getAuthFromRequest(req);

  if (!auth) {
    return null;
  }

  return auth;
}
```

**Checklist**:
- [ ] `lib/utils/auth.ts` created with all functions
- [ ] `lib/middleware/auth.ts` created
- [ ] Both files compile without TypeScript errors
- [ ] Can run `npm run build` successfully

---

## Day 4: Update Auth Endpoints

### Task 4.1: Update Login Endpoint

**File**: `app/api/auth/login/route.ts`

```typescript
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/utils/auth';

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { email, password } = body;

    // 2. Validate input
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 3. Find user in database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        password: true, // Needed for verification
        role: true,
      },
    });

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 4. Verify password
    if (!user.password) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 5. Generate token
    const token = await generateToken(user.id);

    // 6. Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 7. Return success (don't return password hash!)
    const response = Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });

    // 8. Set auth cookie (secure, httpOnly)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Test Login**:
```bash
# Using curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPassword123"
  }'

# Should return:
# {
#   "success": true,
#   "user": { "id": "...", "email": "demo@example.com", ... },
#   "token": "eyJ..."
# }
```

### Task 4.2: Update Signup Endpoint

**File**: `app/api/auth/signup/route.ts`

```typescript
import { prisma } from '@/lib/db';
import { hashPassword, generateToken, validatePassword } from '@/lib/utils/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // 1. Validate input
    if (!email || !password || !name) {
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // 2. Validate password strength
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return Response.json(
        { error: 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    // 3. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await hashPassword(password);

    // 5. Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        subscriptionTier: 'free',
        role: 'user',
        profile: {
          create: {
            timezone: 'UTC',
            language: 'en',
          },
        },
        subscription: {
          create: {
            plan: 'free',
            status: 'active',
            resumes: 3,
            storage: 100,
            aiCredits: 10,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
      },
    });

    // 6. Generate token
    const token = await generateToken(user.id);

    // 7. Return success
    const response = Response.json(
      {
        success: true,
        user,
        token,
      },
      { status: 201 }
    );

    // 8. Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('[SIGNUP ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Task 4.3: Update Me Endpoint

**File**: `app/api/auth/me/route.ts`

```typescript
import { getAuthFromRequest, getCurrentUser } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getCurrentUser(auth);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error('[ME ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Task 4.4: Update Logout Endpoint

**File**: `app/api/auth/logout/route.ts`

```typescript
export async function POST(req: Request) {
  try {
    const response = Response.json({ success: true, message: 'Logged out' });

    // Clear auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expires immediately
    });

    return response;
  } catch (error) {
    console.error('[LOGOUT ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Checklist**:
- [ ] All 4 auth endpoints updated
- [ ] Can login with `demo@example.com` / `DemoPassword123`
- [ ] Can create new user with signup
- [ ] Token returned and stored
- [ ] Can logout
- [ ] Passwords hashed in database

---

## Day 5: Testing & Verification

### Task 5.1: Test Auth Flow End-to-End

**Manual Testing Checklist**:

1. **Test Login** ✅
   ```bash
   npm run dev
   # Go to http://localhost:3000/login
   # Enter: demo@example.com / DemoPassword123
   # Should redirect to /dashboard
   # Check browser DevTools → Application → Cookies
   # Should see `auth-token` cookie
   ```

2. **Test Signup** ✅
   ```bash
   # Go to http://localhost:3000/signup
   # Enter new email, strong password
   # Should create user and redirect to dashboard
   # Check database with Prisma Studio
   # Should see new user
   ```

3. **Test Invalid Password** ✅
   ```bash
   # Try login with wrong password
   # Should show error
   # Should NOT redirect
   ```

4. **Test Weak Password on Signup** ✅
   ```bash
   # Try signup with weak password (< 8 chars)
   # Should show validation errors
   ```

5. **Test Logout** ✅
   ```bash
   # On dashboard, click logout
   # Should redirect to login
   # Cookie should be cleared
   ```

### Task 5.2: Database Verification

```bash
# Open Prisma Studio
npx prisma studio

# Verify:
# ✅ User table has demo@example.com
# ✅ Password is hashed (not plaintext)
# ✅ New users appear after signup
# ✅ lastLoginAt updates after login
```

### Task 5.3: Check for Errors

**Terminal Output**:
```bash
npm run dev

# Should show:
# - No TypeScript errors
# - Dev server running on localhost:3000
# - "ready - started server on 0.0.0.0:3000"
```

**Browser Console**:
- F12 → Console tab
- Should be clean (no red errors)
- Might have warnings (OK)

**Network Tab**:
- F12 → Network tab
- Try login
- Should see:
  - POST /api/auth/login (200 OK)
  - Response has token

### Task 5.4: Build Verification

```bash
# Ensure no build errors
npm run build

# Should complete successfully:
# ✔ Compiled successfully
# ✔ Linted successfully
# ✔ No TypeScript errors
```

---

## 🎯 End of Week Checklist

### Database Setup ✅
- [ ] PostgreSQL running (Docker or local)
- [ ] Prisma migrated successfully
- [ ] `prisma studio` shows all tables
- [ ] Seed data created (2 demo users)

### Authentication ✅
- [ ] Login works with demo user
- [ ] Signup creates new users
- [ ] Passwords hashed in database
- [ ] Tokens generated and verified
- [ ] Logout clears auth

### Code Quality ✅
- [ ] No TypeScript errors
- [ ] `npm run build` succeeds
- [ ] No console errors
- [ ] 4 auth endpoints working
- [ ] Database client functional

### Documentation ✅
- [ ] All code has comments
- [ ] Error messages are clear
- [ ] Functions typed correctly

---

## 🚨 Troubleshooting

### Error: "DATABASE_URL is missing"
```bash
# Solution: Create .env.local
echo 'DATABASE_URL="postgresql://developer:password123@localhost:5432/resume_builder"' > .env.local
```

### Error: "Cannot find module '@prisma/client'"
```bash
# Solution: Generate Prisma client
npx prisma generate
npm install @prisma/client
```

### Error: "connect ECONNREFUSED"
```bash
# PostgreSQL not running
# Docker: docker ps | grep resume-db
# If not running: docker start resume-db
```

### Error: "invalid username or password"
```bash
# Check DATABASE_URL format
# Should be: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Check username/password are correct
# Check database exists
```

### Login Returns "Invalid email or password"
```bash
# Check:
# 1. User exists: npx prisma studio → User table
# 2. Password is hashed (starts with $2a$ or $2b$)
# 3. Try with demo@example.com / DemoPassword123
# 4. Check auth endpoint logs
```

### Build Fails
```bash
# Check all files have no TypeScript errors
npm run build -- --debug

# Fix any type errors shown
```

---

## 📊 What's Ready NOW

✅ **Real Database**
- All 20+ tables created
- Demo users seeded
- Production schema ready

✅ **Authentication**
- Login with real user
- Signup creates user
- Passwords actually hashed
- JWT tokens verified
- Logout works

✅ **Security**
- Password hashing (bcrypt)
- Token expiration (30 days)
- httpOnly cookies
- Input validation

✅ **Ready for Next Phase**
- Database ready for Resume API
- Auth middleware ready for protected routes
- Type system ready for new features

---

## 🚀 Next Steps (Phase 1 Week 2)

Now you can build on this foundation:

1. **Create Resume CRUD API**
   - POST /api/resumes (create)
   - GET /api/resumes (list)
   - PUT /api/resumes/[id] (update)
   - DELETE /api/resumes/[id] (delete)

2. **Create Template API**
   - GET /api/templates (list)
   - GET /api/templates/[id] (details)

3. **Protect Routes**
   - Use `getAuthFromRequest` to check auth
   - Return 401 if not authenticated

---

## 💾 Git Commit

After completing this week:

```bash
git add .
git commit -m "feat: database migration and real authentication

- Setup PostgreSQL database with Prisma
- Implement password hashing with bcrypt
- Create JWT token management
- Replace mock auth with real database users
- Add password validation
- Implement login, signup, logout endpoints
- Add auth middleware for protecting routes
- Seed demo users in database

Closes: Phase 1 Week 1"

git push origin develop
```

---

## ✨ Summary

**This Week You Built**:
- ✅ Production database setup
- ✅ Real authentication system
- ✅ Password hashing & security
- ✅ JWT token management
- ✅ Complete auth endpoints

**You Now Have**:
- ✅ Real users in database
- ✅ Working login/signup
- ✅ Secure password storage
- ✅ Protected API foundation
- ✅ Foundation for all other features

**Next Week**: Build Resume CRUD API and start UI components

---

**Great work! You're 25% done with MVP!** 🎉

