
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize the Firebase Admin SDK.
// When running in a Google Cloud environment like App Hosting,
// initializeApp() can be called without arguments to use Application Default Credentials.
if (!getApps().length) {
  initializeApp();
}

const adminDb = getFirestore();

export { adminDb };
