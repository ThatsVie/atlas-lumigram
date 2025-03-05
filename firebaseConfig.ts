import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUvTVeDCFNj53laXPIue2sxjNh-epnFJo",
  authDomain: "lumigram-vp.firebaseapp.com",
  projectId: "lumigram-vp",
  storageBucket: "lumigram-vp.firebasestorage.app",
  messagingSenderId: "642260698244",
  appId: "1:642260698244:web:2b7d0f821bb4a2927b6ed1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Initialize Storage
export const storage = getStorage(app);
// Initialize Firestore
export const db = getFirestore(app);