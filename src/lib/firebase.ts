// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "pawan-sai-kodali-e6xtr",
  appId: "1:502543705020:web:e77937f6a3516c9d1d81b9",
  storageBucket: "pawan-sai-kodali-e6xtr.firebasestorage.app",
  apiKey: "AIzaSyA2-LG17hgiBMtcDYtwJ9sfFCc753JTZ0o",
  authDomain: "pawan-sai-kodali-e6xtr.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "502543705020"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
