import { signOut } from "firebase/auth";
import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";

export const firebaseLogout = async () => {
  return await signOut(firebaseAuth);
};
