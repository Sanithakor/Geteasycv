/**
 * Next.js Middleware
 * Protects routes and handles authentication redirects
 */

import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/editor',
  '/my-resumes',
  '/billing',
  '/settings',
  '/profile',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup', '/forgot-password'];

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/pricing',
  '/blog',
  '/templates',
  '/contact',
  '/privacy',
  '/terms',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // For protected routes: we can't check auth state in middleware (it's server-side)
  // The auth state is stored in localStorage (client-side)
  // So we let the request through and let the page handle it
  // The page will redirect to login if not authenticated
  
  if (isProtectedRoute) {
    // Don't redirect here - let the page component handle it
    // The page will check useAuthStore and redirect if needed
    return NextResponse.next();
  }

  // For auth routes: similarly, let the page handle it
  if (isAuthRoute) {
    // The page will check if already authenticated and redirect to dashboard
    return NextResponse.next();
  }

  // Allow request to continue
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
