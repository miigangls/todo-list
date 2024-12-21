import { initializeApp, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  throw new Error(
    `Missing Firebase env vars: ${missing.join(", ")}. Copy .env.example to .env and fill the values.`,
  );
}

export const fire: FirebaseApp = initializeApp(firebaseConfig);

// App Check protege la API key del cliente bloqueando llamadas que no
// vengan de una página propia (verificadas con reCAPTCHA v3). Se activa
// solo si VITE_APPCHECK_RECAPTCHA_SITE_KEY está definida; útil para no
// requerirlo en local. En desarrollo se puede usar el debug token de
// Firebase exportando self.FIREBASE_APPCHECK_DEBUG_TOKEN.
const appCheckSiteKey = import.meta.env.VITE_APPCHECK_RECAPTCHA_SITE_KEY;
if (appCheckSiteKey) {
  if (import.meta.env.DEV) {
    // @ts-expect-error — propiedad inyectada en window por Firebase para debug.
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(fire, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth: Auth = getAuth(fire);
export const db: Firestore = getFirestore(fire);
export const storage: FirebaseStorage = getStorage(fire);
