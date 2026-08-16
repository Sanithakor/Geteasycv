/**
 * Next.js Server-Side Proxy Middleware
 * Verifies JWT tokens on server-side, enforces Coming Soon Mode, and manages role-based access control.
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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
 * Cryptographically verify JWT token from HTTP cookie or Bearer header
 */
async function verifyAuthToken(request: NextRequest) {
  try {
    const token =
      request.cookies.get('auth-token')?.value ||
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const secretKey = process.env.JWT_SECRET || 'fallback-secret-for-dev-environment-12345';
    const secret = new TextEncoder().encode(secretKey);

    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role?: string };
  } catch (error) {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authPayload = await verifyAuthToken(request);
  const isAdmin = authPayload?.role === 'admin' || authPayload?.userId === 'mock-admin-id';

  // Check Coming Soon Mode state (Default: active pre-launch unless disabled via admin cookie/header flag)
  const isComingSoonActive = request.cookies.get('coming_soon_mode')?.value !== 'false';

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

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|public).*)',
  ],
};
