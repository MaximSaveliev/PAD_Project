// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDXzA2VYY-KJcWHHNWT4Ak11Fv8_BKVybw",
  authDomain: "newshub-97e29.firebaseapp.com",
  projectId: "newshub-97e29",
  storageBucket: "newshub-97e29.appspot.com",
  messagingSenderId: "108180078686",
  appId: "1:108180078686:web:e4f740cfed688e709bb4cf",
  measurementId: "G-P4B5F99FJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };