import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = [
    '/auth',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/',
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicRoute) {
    const url = new URL('/auth?mode=login', request.url);
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access auth pages
  if (token && pathname.startsWith('/auth')) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  // Role-based route protection
  if (token) {
    const userRole = token.role as string;

    // Admin routes - only accessible by admins
    if (pathname.startsWith('/dashboard/admin') && userRole !== 'admin') {
      const url = new URL('/dashboard', request.url);
      return NextResponse.redirect(url);
    }

    // Teacher routes - only accessible by teachers and admins
    if (
      pathname.startsWith('/dashboard/teacher') &&
      !['teacher', 'admin'].includes(userRole)
    ) {
      const url = new URL('/dashboard', request.url);
      return NextResponse.redirect(url);
    }

    // Student routes - accessible by all authenticated users
    // (everyone can see student dashboard)
  }

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
