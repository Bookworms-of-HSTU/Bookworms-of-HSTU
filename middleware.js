import { NextResponse } from 'next/server';

export function middleware(request) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // If the user is trying to access the admin area without a session, redirect to login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the user is logged in and tries to access the login page, redirect to the admin dashboard
  if (pathname.startsWith('/admin/login') && sessionCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // Clone the request headers and set a new header `x-next-pathname`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', pathname);

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.png
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
};