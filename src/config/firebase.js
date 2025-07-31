// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_TU_API_KEY,
  authDomain: import.meta.env.VITE_TU_DOMINIO,
  projectId: import.meta.env.VITE_TU_PROJECT_ID,
  storageBucket: import.meta.env.VITE_TU_BUCKET,
  messagingSenderId: import.meta.env.VITE_TU_SENDER_ID,
  appId: import.meta.env.VITE_TU_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export { auth, app };