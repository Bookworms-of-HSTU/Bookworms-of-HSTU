import { NextResponse } from 'next/server';
// Import the new, guaranteed-to-be-initialized adminAuth object
import { adminAuth } from '../../../../lib/firebase/server';

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    // Verify the ID token using the new adminAuth object.
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    if (decodedToken.admin !== true) {
      return NextResponse.json({ error: 'You are not authorized to access this page.' }, { status: 403 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

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
    // The new logic in server.js will throw a specific error if the config is wrong.
    // We can now provide a much better error message to the user.
    if (error.message.startsWith('CRITICAL_ERROR')) {
        return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
    }
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        return NextResponse.json({ error: 'Invalid session. Please log in again.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
