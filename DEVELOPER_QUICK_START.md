# Developer Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
# Copy and configure
cp .env.example .env.local

# Add these values:
DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder
JWT_SECRET=your-secret-key-here-change-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Set Up Database
```bash
# Run migrations
npx prisma migrate dev --name initial

# Open visual explorer
npx prisma studio
```

### 4. Start Development
```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Quick File Reference

### Core Files You'll Use

| File | Purpose | When to Edit |
|------|---------|--------------|
| `lib/types/index.ts` | All TypeScript types | Adding new data models |
| `lib/validation/schemas.ts` | Zod validation schemas | Adding form validation |
| `lib/constants/index.ts` | App-wide constants | Changing plan tiers, limits |
| `lib/utils/helpers.ts` | Reusable functions | Common operations |
| `lib/store/authStore.ts` | Auth state | User authentication |
| `lib/store/resumeStore.ts` | Resume editor state | Resume editing |
| `prisma/schema.prisma` | Database schema | New database models |

---

## 🎯 Common Tasks

### Add a New TypeScript Type
**File**: `lib/types/index.ts`
```typescript
export interface MyNewType {
  id: string;
  name: string;
  // Add properties
}
```

### Add Form Validation
**File**: `lib/validation/schemas.ts`
```typescript
export const MyFormSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
});

export type MyFormInput = z.infer<typeof MyFormSchema>;
```

### Add a Helper Function
**File**: `lib/utils/helpers.ts`
```typescript
export const myHelper = (input: string): string => {
  // Pure function, no side effects
  return result;
};
```

### Add a Database Model
**File**: `prisma/schema.prisma`
```prisma
model MyModel {
  id        String  @id @default(cuid())
  name      String
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
}
```
Then run:
```bash
npx prisma migrate dev --name add_my_model
```

### Use Auth Store
**Component**: Any React component
```typescript
import { useAuthStore } from '@/lib/store/authStore';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  if (!isAuthenticated) return <div>Not logged in</div>;
  
  return <div>Welcome, {user?.name}</div>;
}
```

### Use Resume Store
**Component**: Resume editor
```typescript
import { useResumeStore } from '@/lib/store/resumeStore';

export function ResumeEditor() {
  const {
    currentResume,
    isDirty,
    updateContent,
    undo,
    redo,
    setZoomLevel,
  } = useResumeStore();
  
  return (
    <div>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      {isDirty && <span>Unsaved changes</span>}
    </div>
  );
}
```

### Validate Form Input
**Component**: Form component
```typescript
import { CreateResumeSchema } from '@/lib/validation/schemas';

export function CreateResumeForm() {
  const handleSubmit = (formData: unknown) => {
    const result = CreateResumeSchema.safeParse(formData);
    
    if (!result.success) {
      // Handle errors
      console.error(result.error.flatten());
      return;
    }
    
    // Use result.data (fully typed)
    const validData: CreateResumeInput = result.data;
    // Send to API
  };
}
```

### Use Helper Functions
**Component**: Any file
```typescript
import {
  formatCurrency,
  generateSlug,
  isValidEmail,
  formatFileSize,
  truncateText,
} from '@/lib/utils/helpers';

// Format money
const price = formatCurrency(999); // "$9.99"

// Generate URL slug
const slug = generateSlug('My First Resume'); // "my-first-resume"

// Validate email
if (isValidEmail(email)) { }

// Format file size
const size = formatFileSize(1024000); // "1000 KB"

// Truncate text
const short = truncateText(longText, 50); // "Long text..."
```

### Access Constants
**Any file**:
```typescript
import {
  SUBSCRIPTION_PLANS,
  CACHE_DURATIONS,
  API_ERRORS,
  TEMPLATE_CATEGORIES,
  AI_MODELS,
  USER_ROLES,
} from '@/lib/constants';

// Use subscription plans
const proPlan = SUBSCRIPTION_PLANS.PRO;
console.log(proPlan.maxResumes); // 5
console.log(proPlan.monthlyPrice); // 999 (cents)

// Use cache
const cacheTime = CACHE_DURATIONS.MEDIUM; // 1800 seconds

// Handle errors
if (error) {
  throw new Error(API_ERRORS.NOT_FOUND.message);
}
```

---

## 🔐 Authentication Flow

### 1. User Logs In
```
Login Form → Validate → API Call → JWT Token → Store → Redirect to Dashboard
```

### 2. Access Protected Routes
```
Check Auth Store → If authenticated → Render → If not → Redirect to Login
```

### 3. API Requests
```
Include JWT in headers → API validates → Return data → Update store
```

---

## 💾 Database Workflow

### 1. View Current Schema
```bash
npx prisma studio
# Open http://localhost:5555
```

### 2. Make Schema Changes
```typescript
// Edit prisma/schema.prisma
model MyNewModel {
  id String @id @default(cuid())
  name String
  createdAt DateTime @default(now())
}
```

### 3. Create Migration
```bash
npx prisma migrate dev --name descriptive_name
```

### 4. Query Data
```typescript
import { prisma } from '@/lib/db';

// In API routes
const users = await prisma.user.findMany();
const resume = await prisma.resume.findUnique({ where: { id } });
```

---

## 🧪 Testing Your Code

### Test Types
```typescript
import { User, Resume } from '@/lib/types';

const user: User = {
  id: '123',
  email: 'test@example.com',
  // Full type checking
};
```

### Test Validation
```typescript
import { CreateResumeSchema } from '@/lib/validation/schemas';

// Valid data
const valid = CreateResumeSchema.safeParse({
  title: 'My Resume',
  templateId: 'template-1',
});

// Invalid data
const invalid = CreateResumeSchema.safeParse({
  // Missing required fields
});
```

### Test Helpers
```typescript
import { generateSlug, formatCurrency } from '@/lib/utils/helpers';

console.log(generateSlug('Hello World')); // "hello-world"
console.log(formatCurrency(9999)); // "$99.99"
```

### Test Stores
```typescript
import { useAuthStore } from '@/lib/store/authStore';

const store = useAuthStore.getState();
store.login(mockUser, mockTokens);
console.log(store.isAuthenticated); // true
```

---

## 📊 Common Patterns

### Create Resource
```typescript
// Validate
const validated = CreateSchema.parse(input);

// Save to DB
const resource = await prisma.model.create({
  data: validated,
});

// Update store
store.setResource(resource);

// Return response
return { success: true, data: resource };
```

### Update Resource
```typescript
const validated = UpdateSchema.parse(input);

const updated = await prisma.model.update({
  where: { id },
  data: validated,
});

return { success: true, data: updated };
```

### Delete Resource
```typescript
await prisma.model.delete({
  where: { id },
});

return { success: true, message: 'Deleted' };
```

### List with Pagination
```typescript
const validated = PaginationSchema.parse(query);

const [items, total] = await Promise.all([
  prisma.model.findMany({
    skip: (validated.page - 1) * validated.pageSize,
    take: validated.pageSize,
  }),
  prisma.model.count(),
]);

return {
  items,
  total,
  page: validated.page,
  pageSize: validated.pageSize,
};
```

---

## 🔍 Debugging Tips

### Enable Debug Logging
```typescript
// In API routes
import { prisma } from '@/lib/db';

// Enable SQL logging
const result = await prisma.$queryRaw`SELECT * FROM users`;
```

### Check Store State
```typescript
// In browser console
import { useAuthStore } from '@/lib/store/authStore';
console.log(useAuthStore.getState());
```

### Validate Schemas
```typescript
// Check what's valid/invalid
import { CreateResumeSchema } from '@/lib/validation/schemas';

const result = CreateResumeSchema.safeParse(data);
console.log(result.error?.flatten()); // See all errors
```

### Format Date for Debugging
```typescript
import { formatDate } from '@/lib/utils/helpers';

console.log(formatDate(new Date(), 'datetime'));
// "Jan 15, 2024 2:30 PM"
```

---

## 🚨 Common Errors & Solutions

### "Cannot find module 'zustand'"
**Solution**: Run `npm install zustand`

### "Cannot find module '@/lib/types'"
**Solution**: Check `tsconfig.json` has `"baseUrl": "."` and paths configured

### "Type 'User' is not assignable"
**Solution**: Import type correctly: `import { User } from '@/lib/types';`

### "Database connection failed"
**Solution**: 
1. Check DATABASE_URL in .env.local
2. Ensure PostgreSQL is running
3. Run `npx prisma migrate dev`

### "Zod validation failed"
**Solution**: Check error with `result.error?.flatten()`

---

## 📚 Full Documentation

- **System Architecture**: See `SAAS_ARCHITECTURE.md`
- **Implementation Details**: See `SAAS_PHASE1_SETUP.md`
- **API Reference**: See `SAAS_IMPLEMENTATION_SUMMARY.md`
- **Database Schema**: See `prisma/schema.prisma`

---

## 🎓 Learning Resources

### Files to Read (In Order)
1. `SAAS_ARCHITECTURE.md` - Understand the big picture
2. `SAAS_PHASE1_SETUP.md` - Learn what's been built
3. `lib/types/index.ts` - See all available types
4. `lib/validation/schemas.ts` - Validation examples
5. `lib/constants/index.ts` - Constants reference
6. `lib/utils/helpers.ts` - Available helpers
7. `lib/store/authStore.ts` - State management
8. `prisma/schema.prisma` - Database design

### Key Concepts
- **Types**: `lib/types/index.ts`
- **Validation**: `lib/validation/schemas.ts`
- **State**: `lib/store/*.ts`
- **Database**: `prisma/schema.prisma`
- **Constants**: `lib/constants/index.ts`
- **Helpers**: `lib/utils/helpers.ts`

---

## 🔗 Quick Links

### Useful Commands
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter
npx prisma studio       # Open DB explorer
npx prisma migrate dev  # Create migration
npx tsc --noEmit        # Check types
```

### Useful URLs
- Local app: http://localhost:3000
- Database UI: http://localhost:5555 (after `npx prisma studio`)
- API: http://localhost:3001 (when Phase 2 is done)

---

## ✅ Before You Code

1. **Read** `SAAS_ARCHITECTURE.md` - 5 minutes
2. **Review** `SAAS_PHASE1_SETUP.md` - 5 minutes
3. **Check** relevant files mentioned above - 5 minutes
4. **Set up** `.env.local` - 2 minutes
5. **Run** `npx prisma migrate dev` - 1 minute

**Total**: ~15 minutes to be ready to code

---

## 🚀 You're Ready!

Everything is set up for rapid feature development. The foundation is solid, types are complete, and the database is ready.

**Happy coding!** 🎉

---

## Questions?

- Types issue? → Check `lib/types/index.ts`
- Validation issue? → Check `lib/validation/schemas.ts`
- Database issue? → Check `prisma/schema.prisma`
- Store issue? → Check `lib/store/*.ts`
- Need helper? → Check `lib/utils/helpers.ts`
- Need constant? → Check `lib/constants/index.ts`

Each file is well-documented with comments explaining the design.
