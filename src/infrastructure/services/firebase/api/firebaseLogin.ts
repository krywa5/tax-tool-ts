import { User } from "@firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";

export const firebaseLogin = async (
  email: string,
  password: string,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<User | void> => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userEmail = user.email ?? "Nieznany user";
      console.log(`Zalogowano jako: ${userEmail}`);
      return user;
    })
    .catch((error) => {
      return console.error(error);
    });
};
