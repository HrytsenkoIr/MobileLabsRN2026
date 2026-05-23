import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3hjeRg86-ttJbclvK1sVaUyuQIRjyFqQ",

  authDomain: "lab6-4c909.firebaseapp.com",

  projectId: "lab6-4c909",

  storageBucket: "lab6-4c909.firebasestorage.app",

  messagingSenderId: "944013002293",

  appId: "1:944013002293:web:3e8529396e901aab18537c",

  measurementId: "G-DJQL6GYLLR"

};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);
