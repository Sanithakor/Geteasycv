# 🧪 Testing Guide - Authentication Endpoints

**Date**: July 15, 2026  
**Status**: Ready to test (build successful)

---

## Prerequisites

Before testing, you must:
- [ ] Create `.env.local` file
- [ ] Configure PostgreSQL
- [ ] Run database migrations: `npx prisma migrate dev --name init`
- [ ] Seed demo users: `npx prisma db seed`
- [ ] Start dev server: `npm run dev`

---

## Quick Setup (5 minutes)

### Step 1: Copy Environment File
```bash
cp .env.example .env.local
```

### Step 2: Edit `.env.local`
Update these values:
```
DATABASE_URL="postgresql://developer:password123@localhost:5432/resume_builder"
JWT_SECRET="$(openssl rand -base64 32)"
```

### Step 3: Run Database Setup
```bash
# Migrate schema
npx prisma migrate dev --name init

# Seed demo users
npx prisma db seed

# View database
npx prisma studio  # Opens http://localhost:5555
```

### Step 4: Start Dev Server
```bash
npm run dev

# Should show:
# - ready - started server on 0.0.0.0:3000
# - http://localhost:3000
```

### Step 5: Test Endpoints
Use curl commands below or Postman collection

---

## Testing Tools

### Option 1: cURL (Command Line)

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPassword123"
  }'
```

### Option 2: Postman (GUI)

1. Open Postman
2. Create new request
3. Set method to POST
4. Enter URL: `http://localhost:3000/api/auth/login`
5. Go to Body → JSON
6. Paste test data
7. Send

### Option 3: VS Code Rest Client

Install extension "REST Client"

Create file `test.http`:
```http
### Login with demo user
POST http://localhost:3000/api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "DemoPassword123"
}
```

Right-click and select "Send Request"

---

## Test Cases

### 1️⃣ Login Tests

#### Test 1.1: Valid Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPassword123"
  }'
```

**Expected Response** (200):
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "demo@example.com",
    "name": "Demo User",
    "avatar": null,
    "role": "user",
    "subscriptionTier": "free"
  },
  "token": "eyJhbGc..."
}
```

**Check**: 
- [ ] Response code is 200
- [ ] `success` is true
- [ ] Token is returned
- [ ] User data is present
- [ ] Password NOT in response
- [ ] Browser cookie set (DevTools → Application → Cookies)

---

#### Test 1.2: Invalid Email
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "DemoPassword123"
  }'
```

**Expected Response** (401):
```json
{
  "error": "Invalid email or password"
}
```

**Check**:
- [ ] Response code is 401
- [ ] Generic error message (no user enumeration)

---

#### Test 1.3: Invalid Password
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "WrongPassword123"
  }'
```

**Expected Response** (401):
```json
{
  "error": "Invalid email or password"
}
```

**Check**:
- [ ] Response code is 401
- [ ] Generic error message

---

#### Test 1.4: Missing Email
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "password": "DemoPassword123"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Email and password are required"
}
```

**Check**:
- [ ] Response code is 400
- [ ] Error message clear

---

#### Test 1.5: Missing Password
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Email and password are required"
}
```

---

#### Test 1.6: Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "password": "DemoPassword123"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Invalid email format"
}
```

---

### 2️⃣ Signup Tests

#### Test 2.1: Valid Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123!",
    "name": "New User"
  }'
```

**Expected Response** (201):
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "...",
    "email": "newuser@example.com",
    "name": "New User",
    "avatar": null,
    "role": "user",
    "subscriptionTier": "free"
  },
  "token": "eyJhbGc..."
}
```

**Check**:
- [ ] Response code is 201
- [ ] User created
- [ ] Token returned
- [ ] Subscription created (check database)

---

#### Test 2.2: Duplicate Email
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "SecurePass123!",
    "name": "Another User"
  }'
```

**Expected Response** (409):
```json
{
  "error": "Email already registered"
}
```

**Check**:
- [ ] Response code is 409
- [ ] Error message clear

---

#### Test 2.3: Weak Password (Too Short)
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "weakpass@example.com",
    "password": "Pass1!",
    "name": "Weak Pass"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Password too weak",
  "errors": [
    "Password must be at least 8 characters long"
  ]
}
```

---

#### Test 2.4: No Uppercase Letter
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nouppercase@example.com",
    "password": "password123!",
    "name": "No Upper"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Password too weak",
  "errors": [
    "Password must contain at least one uppercase letter"
  ]
}
```

---

#### Test 2.5: No Number
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonumber@example.com",
    "password": "Password!abc",
    "name": "No Number"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Password too weak",
  "errors": [
    "Password must contain at least one number"
  ]
}
```

---

#### Test 2.6: No Special Character
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nospecial@example.com",
    "password": "Password123abc",
    "name": "No Special"
  }'
```

**Expected Response** (400):
```json
{
  "error": "Password too weak",
  "errors": [
    "Password must contain at least one special character (@$!%*?&)"
  ]
}
```

---

### 3️⃣ Me Endpoint Tests

#### Test 3.1: Get User with Valid Token

First, login to get a token:
```bash
# Get token from login response
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPassword123"
  }' | jq -r '.token')

echo "Token: $TOKEN"
```

Then use it:
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response** (200):
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "demo@example.com",
    "name": "Demo User",
    "avatar": null,
    "role": "user",
    "subscriptionTier": "free"
  }
}
```

---

#### Test 3.2: No Token
```bash
curl -X GET http://localhost:3000/api/auth/me
```

**Expected Response** (401):
```json
{
  "error": "Unauthorized"
}
```

---

#### Test 3.3: Invalid Token
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer invalid-token-here"
```

**Expected Response** (401):
```json
{
  "error": "Unauthorized"
}
```

---

#### Test 3.4: Malformed Auth Header
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: InvalidFormat"
```

**Expected Response** (401):
```json
{
  "error": "Unauthorized"
}
```

---

### 4️⃣ Logout Tests

#### Test 4.1: Valid Logout

Get token first:
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPassword123"
  }' | jq -r '.token')
```

Then logout:
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Check**:
- [ ] Response code is 200
- [ ] Cookie cleared (DevTools → Application → Cookies → auth-token empty)

---

#### Test 4.2: Logout Without Token
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

**Expected Response** (401):
```json
{
  "error": "Not authenticated"
}
```

---

## Full Authentication Flow

### Complete User Journey

```bash
#!/bin/bash

# 1. Signup new user
echo "1. Signing up new user..."
SIGNUP=$(curl -s -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123!",
    "name": "Test User"
  }')

echo "Signup response: $SIGNUP"
TOKEN=$(echo $SIGNUP | jq -r '.token')
echo "Token: $TOKEN"

# 2. Get current user
echo -e "\n2. Getting current user..."
curl -s -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq

# 3. Logout
echo -e "\n3. Logging out..."
curl -s -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $TOKEN" | jq

# 4. Try to use token after logout
echo -e "\n4. Trying to use token after logout..."
curl -s -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq

# 5. Login again
echo -e "\n5. Logging in again..."
LOGIN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123!"
  }')

echo "Login response: $LOGIN"
TOKEN=$(echo $LOGIN | jq -r '.token')
echo "New token: $TOKEN"

# 6. Verify new token works
echo -e "\n6. Verifying new token..."
curl -s -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq
```

Save as `test-auth-flow.sh` and run:
```bash
bash test-auth-flow.sh
```

---

## Browser Testing

### Using Browser DevTools

1. **Open DevTools**: F12
2. **Console Tab**: Execute test requests
3. **Network Tab**: Monitor requests/responses
4. **Application Tab**: View cookies and localStorage

#### JavaScript Test in Console:

```javascript
// Test login
async function testLogin() {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'demo@example.com',
      password: 'DemoPassword123'
    })
  });
  
  const data = await response.json();
  console.log('Response:', data);
  console.log('Token:', data.token);
  return data.token;
}

// Run it
const token = await testLogin();

// Test me endpoint
async function testMe(token) {
  const response = await fetch('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const data = await response.json();
  console.log('Current user:', data.user);
}

testMe(token);
```

---

## Database Verification

### Check created users in database:

```bash
npx prisma studio

# Or via SQL:
psql -U developer -d resume_builder -c "SELECT id, email, name, role, subscriptionTier FROM \"User\";"
```

Should show:
```
                 id                  |       email       |   name    | role |  subscriptionTier
-------------------------------------+-------------------+-----------+------+------------------
 clxxxxxx... | demo@example.com     | Demo User         | user | free
 clxxxxxx... | admin@example.com    | Admin User        | admin| premium
```

---

## Logging & Debugging

### Enable All Logs

In `.env.local`:
```
NODE_ENV="development"
```

Watch server logs:
```bash
npm run dev
```

Logs show:
```
[LOGIN] Attempting login...
[LOGIN] User found: demo@example.com
[LOGIN] Token generated for user: clxxxxxx...
[LOGIN] Login successful for user: demo@example.com
```

### Check Request/Response

In browser DevTools → Network tab:
1. Click on API request
2. → Headers (request and response headers)
3. → Payload (request body)
4. → Response (response body)

---

## Common Issues & Fixes

### Issue: "DATABASE_URL is missing"
**Fix**: Create `.env.local` with DATABASE_URL

### Issue: "Cannot find module '@prisma/client'"
**Fix**: Run `npx prisma generate`

### Issue: "Error: Invalid email or password"
**Fix**: Verify user exists. Use `npx prisma studio` to check

### Issue: "connect ECONNREFUSED"
**Fix**: PostgreSQL not running. For Docker: `docker start resume-db`

### Issue: "Token verification failed"
**Fix**: Check JWT_SECRET in .env.local matches. Not expired? Check: `jq '.exp' <<< $(echo $TOKEN | cut -d'.' -f2 | base64 -d)`

### Issue: Cookie not set
**Fix**: Use NextResponse instead of Response. Check httpOnly setting.

---

## Performance Metrics

### Expected Response Times

| Endpoint | Time | Status |
|----------|------|--------|
| POST /login | 100-200ms | ✅ Fast |
| POST /signup | 200-300ms | ✅ Good |
| GET /me | 50-100ms | ✅ Fast |
| POST /logout | 50-100ms | ✅ Fast |

---

## Success Checklist

After all tests pass:

- [ ] Login with valid credentials works
- [ ] Invalid credentials rejected
- [ ] Signup creates user
- [ ] Password strength enforced
- [ ] Duplicate email prevented
- [ ] Me endpoint returns user
- [ ] Logout clears auth
- [ ] Tokens valid only once
- [ ] Database has users
- [ ] Cookies are secure (httpOnly, Secure, SameSite)
- [ ] No passwords in logs
- [ ] All error codes correct

---

**Testing Complete!** ✅

All tests should pass. If they don't, check logs and common issues above.

