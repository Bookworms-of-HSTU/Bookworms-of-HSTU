import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import './lib/firebase/server'; // Ensure Firebase Admin is initialized

// This line is crucial for making the Firebase Admin SDK work in Next.js Middleware.
export const runtime = 'nodejs';

export async function middleware(request) {
  const sessionCookie = request.cookies.get('session')?.value;

  // If there's no session cookie, handle redirection for protected routes.
  if (!sessionCookie) {
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // If a session cookie exists, verify it and check for admin claims.
  try {
    const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true /** checkRevoked */);

    // If the user is not an admin, redirect them to the login page with an error.
    if (decodedClaims.admin !== true) {
      const response = NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url));
      response.cookies.set('session', '', { maxAge: -1 }); // Clear the invalid cookie
      return response;
    }

    // If the user is an admin and tries to access the login page, redirect to the dashboard.
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // The user is a verified admin, so allow them to proceed.
    return NextResponse.next();

  } catch (error) {
    // The session cookie is invalid. Clear it and redirect to the login page.
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('session', '', { maxAge: -1 });
    return response;
  }
}

// This config specifies that the middleware should run on all admin routes.
export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};
