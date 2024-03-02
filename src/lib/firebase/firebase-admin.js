import { initializeApp, cert, getApps } from "firebase-admin/app";
import { firebaseConfig } from "@/config/config";

const config = {
  credential: cert({
    projectId: firebaseConfig.PROJECT_ID,
    clientEmail: firebaseConfig.ADMIN_CLIENT_EMAIL,
    privateKey: firebaseConfig.ADMIN_PRIVATE_KEY,
  }),
};

export const runAdminApp = () => getApps() <= 0 && initializeApp(config);
