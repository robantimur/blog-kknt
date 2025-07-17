
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For more information on how to best configure Firebase, refer to the docs:
// https://firebase.google.com/docs/web/setup#access-firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzf0T5rdSMFVsXIUJBV-g13g3oqjXnmkI",
  authDomain: "blog-kkn.firebaseapp.com",
  projectId: "blog-kkn",
  storageBucket: "blog-kkn.appspot.com",
  messagingSenderId: "128809390208",
  appId: "1:128809390208:web:84616cb2e42f948fe05665",
  measurementId: "G-Q0TMFZV2JW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
