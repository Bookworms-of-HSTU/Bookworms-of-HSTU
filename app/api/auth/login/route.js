import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
// By importing this, we ensure the Firebase Admin app is initialized correctly.
import '../../../../lib/firebase/server';

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    // The user is verified, now create a session cookie.
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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
