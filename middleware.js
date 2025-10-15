
import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    // When running in a Google Cloud environment like App Hosting,
    // initializeApp() uses the Application Default Credentials.
    initializeApp();
  }
}

export async function middleware(request) {
  initializeFirebaseAdmin();

  const session = request.cookies.get('session')?.value || '';

  // If no session cookie, redirect to login for protected admin routes
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify the session cookie.
    await getAuth().verifySessionCookie(session, true /** checkRevoked */);

    // If trying to access login page while logged in, redirect to admin dashboard
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();

  } catch (error) {
    // Session cookie is invalid, clear it and redirect to login
    console.error('Session verification error:', error.message);
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('session');
    return response;
  }
}

// Force middleware to run on Node.js runtime
export const runtime = 'nodejs';

export const config = {
    matcher: ['/admin/:path*', '/admin/login']
}
