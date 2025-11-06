import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";       // ✅ Add this
import { getFirestore } from "firebase/firestore"; // (Optional) if you use Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOMP3OtQ-ATZZkbyVL9L_sPopWsduY7XE",
  authDomain: "resort-45125.firebaseapp.com",
  projectId: "resort-45125",
  storageBucket: "resort-45125.firebasestorage.app",
  messagingSenderId: "1029269004793",
  appId: "1:1029269004793:web:8f03f6b5973c80498bdd28",
  measurementId: "G-429H2NGMLG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export what you need
export { auth, db, analytics };
