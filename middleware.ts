import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
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

// Guest-only auth routes (still exist as fallback pages)
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

// Allowed public routes during Coming Soon mode
const comingSoonAllowed = ['/coming-soon', '/login', '/signup', '/forgot-password', '/reset-password'];

/**
 * Verify JWT from cookie or Authorization header on the Edge runtime.
 */
async function verifyAuthToken(request: NextRequest) {
  try {
    const token =
      request.cookies.get('auth-token')?.value ||
      request.cookies.get('token')?.value ||
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const secretKey = process.env.JWT_SECRET || 'fallback-jwt-secret-key-geteasycv-32-chars';
    const secret = new TextEncoder().encode(secretKey);

    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; role?: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // 0. Canonical host redirect (www -> non-www)
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.geteasycv.com')) {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.hostname = 'geteasycv.com';
    return NextResponse.redirect(canonicalUrl, 301);
  }

  const pathname    = request.nextUrl.pathname;
  const authPayload = await verifyAuthToken(request);
  const isAdmin     = authPayload?.role === 'admin';

  const referer = request.headers.get('referer');
  if (pathname === '/editor' && referer) {
    try {
      if (new URL(referer).pathname.startsWith('/cover-letter')) {
        return NextResponse.redirect(new URL('/cover-letter/editor', request.url));
      }
    } catch {}
  }

  const isComingSoonActive = process.env.COMING_SOON_MODE === 'true';

  // 1. Coming Soon enforcement
  if (isComingSoonActive && !isAdmin) {
    const isAllowed = comingSoonAllowed.some((r) => pathname.startsWith(r));
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/coming-soon', request.url));
    }
  }

  // 2. Admin routes
  const isAdminRoute = adminRoutes.some((r) => pathname.startsWith(r));
  if (isAdminRoute) {
    if (!authPayload) {
      // Redirect to home with modal trigger + callbackUrl so they land on /admin after login
      const dest = new URL('/', request.url);
      dest.searchParams.set('openAuth', 'login');
      dest.searchParams.set('callbackUrl', pathname);
      const response = NextResponse.redirect(dest);
      if (request.cookies.get('auth-token')) response.cookies.delete('auth-token');
      return response;
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected user routes
  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));
  if (isProtectedRoute) {
    if (!authPayload) {
      // Redirect to home with modal trigger + callbackUrl
      const dest = new URL('/', request.url);
      dest.searchParams.set('openAuth', 'login');
      dest.searchParams.set('callbackUrl', pathname);
      const response = NextResponse.redirect(dest);
      if (request.cookies.get('auth-token')) response.cookies.delete('auth-token');
      return response;
    }
    return NextResponse.next();
  }

  // 4. Guest-only routes: redirect already-authenticated users away
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
  if (isAuthRoute && authPayload) {
    const destination = isAdmin ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}
