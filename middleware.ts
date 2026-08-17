import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  runtime: 'edge',
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|public).*)',
  ],
};

// Protected user routes
const protectedRoutes = [
  '/dashboard',
  '/editor',
  '/my-resumes',
  '/billing',
  '/subscription',
  '/settings',
  '/profile',
];

// Admin-only routes
const adminRoutes = ['/admin'];

// Guest-only auth routes
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

// Allowed public routes during Coming Soon Mode
const comingSoonAllowed = ['/coming-soon', '/login', '/signup', '/forgot-password', '/reset-password'];

/**
 * Cryptographically verify JWT token from HTTP cookie or Bearer header on Edge using Web Crypto
 */
async function verifyAuthToken(request: NextRequest) {
  try {
    const token =
      request.cookies.get('auth-token')?.value ||
      request.cookies.get('token')?.value ||
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const secretKey = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';
    const secret = new TextEncoder().encode(secretKey);

    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role?: string };
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authPayload = await verifyAuthToken(request);
  const isAdmin = authPayload?.role === 'admin' || authPayload?.userId === 'mock-admin-id';

  // Check Coming Soon Mode state
  const isComingSoonActive = request.cookies.get('coming_soon_mode')?.value === 'true';

  // 1. Coming Soon Server-Side Enforcement (for non-admin public visitors)
  if (isComingSoonActive && !isAdmin) {
    const isAllowed = comingSoonAllowed.some((route) => pathname.startsWith(route));
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/coming-soon', request.url));
    }
  }

  // 2. Protect Admin Routes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!authPayload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (request.cookies.get('auth-token')) {
        response.cookies.delete('auth-token');
      }
      return response;
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // 3. Protect Authenticated User Routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute) {
    if (!authPayload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (request.cookies.get('auth-token')) {
        response.cookies.delete('auth-token');
      }
      return response;
    }
    return NextResponse.next();
  }

  // 4. Guest-only routes: Redirect authenticated users to Dashboard or Admin
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && authPayload) {
    const destination = isAdmin ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}
