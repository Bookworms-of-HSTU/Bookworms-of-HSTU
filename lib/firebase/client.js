import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOmeP0fn-J6NjF3hnTjQGIBUxkmP-44kI",
  authDomain: "a-simple-chatapp.firebaseapp.com",
  projectId: "a-simple-chatapp",
  storageBucket: "a-simple-chatapp.appspot.com",
  messagingSenderId: "606349361258",
  appId: "1:606349361258:web:55f37233444875646f8a13",
  measurementId: "G-25FX4VMJYK"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { auth };
