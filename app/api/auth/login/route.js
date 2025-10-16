import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
// Import the new function to lazily initialize the Admin SDK
import { getAdminDb } from '../../../../lib/firebase/server';

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    // Ensure the Firebase Admin app is initialized before using getAuth().
    getAdminDb();

    // Verify the ID token and check for the 'admin' custom claim.
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    if (decodedToken.admin !== true) {
      // The user is not an admin, so they are not authorized.
      return NextResponse.json({ error: 'You are not authorized to access this page.' }, { status: 403 });
    }

    // The user is a verified admin, now create a session cookie.
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

    // Set cookie on the response and send it back.
    const response = NextResponse.json({ status: 'success' }, { status: 200 });
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    // Handle cases where the token is invalid or expired
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        return NextResponse.json({ error: 'Invalid session. Please log in again.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
