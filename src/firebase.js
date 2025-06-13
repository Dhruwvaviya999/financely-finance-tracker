// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcA7Kf2Ey8dgpXSrv4DNCemYWrC7G9uDQ",
  authDomain: "financely-app-a23af.firebaseapp.com",
  projectId: "financely-app-a23af",
  storageBucket: "financely-app-a23af.firebasestorage.app",
  messagingSenderId: "59434541434",
  appId: "1:59434541434:web:1748c82539050bfb5676c3",
  measurementId: "G-ZX4L3KEKE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};