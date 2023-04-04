// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { IFBConfig } from "../@types/artwork";

const API_KEY: string = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTH_DOM: string = import.meta.env.VITE_FIREBASE_AUTH_DOM;
const PROJECT_ID: string = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET: string = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID: string = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID: string = import.meta.env.VITE_FIREBASE_APP_ID;
const MEASUREMENT_ID: string = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

const firebaseConfig: IFBConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOM,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore();
