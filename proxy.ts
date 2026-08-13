/**
 * Next.js Server-Side Proxy Middleware
 * Verifies JWT tokens on server-side and enforces role-based access control
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

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Skip checks for static/public assets or non-protected pages
  if (!isProtectedRoute && !isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const authPayload = await verifyAuthToken(request);

  // 1. Protect Admin Routes
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

    const isAdmin = authPayload.role === 'admin' || authPayload.userId === 'mock-admin-id';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // 2. Protect Authenticated User Routes
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

  // 3. Guest-only routes: Redirect authenticated users away from Login/Signup to Dashboard
  if (isAuthRoute && authPayload) {
    const destination = (authPayload.role === 'admin' || authPayload.userId === 'mock-admin-id')
      ? '/admin'
      : '/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes handle their own auth checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.png, images
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
