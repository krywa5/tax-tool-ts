import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";

export const firebaseLogin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};
