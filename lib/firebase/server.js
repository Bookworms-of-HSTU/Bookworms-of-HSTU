import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// This object holds the single service account JSON.
// It will throw an error if the JSON is malformed, which is GOOD.
// We want the server to crash loudly if the config is bad.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : null;

// A function to initialize the app if it's not already initialized.
// This is the core of the fix: it ensures initialization happens once
// and is done correctly before any service is accessed.
const getAdminApp = () => {
  // If the app is already initialized, return it.
  if (getApps().length > 0) {
    return getApp();
  }

  // If the service account JSON is missing, throw a critical error.
  // This will give us a clear message in the Vercel logs.
  if (!serviceAccount) {
    throw new Error('CRITICAL_ERROR: Firebase service account JSON is missing. Check Vercel environment variables.');
  }

  // Initialize the app with the service account.
  return initializeApp({
    credential: cert(serviceAccount),
  });
};

// Export lazy-loaded admin services.
// The API routes will import these directly. They are guaranteed to be initialized.
export const adminAuth = getAuth(getAdminApp());
export const adminFirestore = getFirestore(getAdminApp());
