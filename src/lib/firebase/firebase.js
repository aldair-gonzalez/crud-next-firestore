import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "@/config/config";

const config = {
  apiKey: firebaseConfig.API_KEY,
  authDomain: firebaseConfig.AUTH_DOMAIN,
  projectId: firebaseConfig.PROJECT_ID,
  storageBucket: firebaseConfig.STORAGE_BUCKET,
  messagingSenderId: firebaseConfig.MESSAGING_SENDER_ID,
  appId: firebaseConfig.APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
