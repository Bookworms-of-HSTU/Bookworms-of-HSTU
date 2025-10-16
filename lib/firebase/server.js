import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function getAdminDb() {
  // If the app is already initialized, return the existing Firestore instance.
  if (getApps().length > 0) {
    return getFirestore();
  }

  // If not initialized, try to use the single environment variable.
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    console.error('Firebase Admin SDK initialization failed: The FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set.');
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);

    initializeApp({
      credential: cert(serviceAccount),
    });

    return getFirestore();

  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_JSON or initializing Firebase Admin SDK:', error);
    return null;
  }
}

// Export the function that provides the db instance.
export { getAdminDb };
