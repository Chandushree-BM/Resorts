import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOMP3OtQ-ATZZkbyVL9L_sPopWsduY7XE",
  authDomain: "resort-45125.firebaseapp.com",
  projectId: "resort-45125",
  storageBucket: "resort-45125.firebasestorage.app",
  messagingSenderId: "1029269004793",
  appId: "1:1029269004793:web:8f03f6b5973c80498bdd28",
  measurementId: "G-429H2NGMLG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
export default app;
