import {
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
} from "enviroment/variables";
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  closeAuthSession,
  isAuthSession,
  setAuthSession,
} from "utils/authUtils";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    if (!isAuthSession()) {
      setAuthSession();
    }
  } else {
    if (isAuthSession()) {
      closeAuthSession();
    }
  }
});

export const isFirebaseError = (error: unknown): error is FirebaseError => {
  if (typeof error !== "object" || error === null) return false;

  return "code" in error && "message" in error;
};
