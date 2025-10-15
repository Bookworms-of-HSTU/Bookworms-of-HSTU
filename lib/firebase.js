
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOmeP0fn-J6NjF3hnTjQGIBUxkmP-44kI",
  authDomain: "a-simple-chatapp.firebaseapp.com",
  projectId: "a-simple-chatapp",
  storageBucket: "a-simple-chatapp.firebasestorage.app",
  messagingSenderId: "606349361258",
  appId: "1:606349361258:web:55f37233444875646f8a13",
  measurementId: "G-25FX4VMJYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
