import admin from 'firebase-admin';

// This file is for server-side code only.

// Check if the app is already initialized to prevent errors during hot-reloads in development
if (!admin.apps.length) {
  try {
    // When deployed to Vercel, the service account JSON is stored in an environment variable.
    // We decode it from Base64.
    const serviceAccountJson = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      'base64'
    ).toString('ascii');
    
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully for server-side operations.");
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    // This will cause the build to fail if the environment variable is not set, which is a good thing.
    throw new Error("Could not initialize Firebase Admin SDK. Check your FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable.");
  }
}

// Export the initialized services
const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
