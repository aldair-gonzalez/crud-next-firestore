import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from "@/config/config"

const config = {
  apiKey: firebaseConfig.NEXT_PUBLIC_API_KEY,
  authDomain: firebaseConfig.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: firebaseConfig.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: firebaseConfig.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: firebaseConfig.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: firebaseConfig.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(config);
const db = getFirestore(app);

export { app, db }