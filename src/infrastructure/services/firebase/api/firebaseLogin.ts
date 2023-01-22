import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "@firebase/auth";

const auth = getAuth();

export const firebaseLogin = async (
  email: string,
  password: string,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<User | void> => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userEmail = user.email ?? "Nieznany user";
      console.log(`Zalogowano jako: ${userEmail}`);
      return user;

      // ...
    })
    .catch((error) => {
      return console.error(error);
    });
};
