import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";

export const firebaseLogin = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};
