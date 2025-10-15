import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountJson) {
      throw new Error('Firebase Admin SDK initialization error: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    initializeApp({
      credential: cert(serviceAccount)
    });
  }
}

export async function POST(request) {
  initializeFirebaseAdmin();

  const { idToken } = await request.json();

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    // Get the user from the ID token.
    const decodedIdToken = await getAuth().verifyIdToken(idToken);

    // Check if the user is an admin.
    if (decodedIdToken.admin !== true) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Create the session cookie.
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

    // Set the cookie on the response.
    const response = new NextResponse(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    response.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      sameSite: 'lax',
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error creating session cookie:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
