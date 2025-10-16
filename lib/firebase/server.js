import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// This function ensures the Firebase Admin SDK is initialized only once.
function getAdminDb() {
  const apps = getApps();
  
  // If the app is already initialized, return the existing Firestore instance.
  if (apps.length > 0) {
    return getFirestore();
  }

  // If not initialized, check for environment variables and initialize.
  // This check prevents build-time errors on Vercel.
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    // Use optional chaining with a fallback to prevent build-time errors
    private_key: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'), 
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  // Check if the essential credential parts are present before initializing
  if (serviceAccount.project_id && serviceAccount.private_key && serviceAccount.client_email) {
    initializeApp({
      credential: cert(serviceAccount),
    });
    return getFirestore();
  }

  // If initialization is not possible (e.g., missing env vars at runtime), 
  // subsequent calls to Firestore will fail, which is the expected behavior.
  console.error('Firebase Admin SDK initialization failed due to missing environment variables.');
  return null; 
}

// Export the function that provides the db instance, not the instance itself.
export { getAdminDb };
