import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "contexts/AppContext";
import { firebaseLogin } from "infrastructure/services/firebase/actions/firebaseLogin";
import { firebaseLogout } from "infrastructure/services/firebase/actions/firebaseLogout";
import { isFirebaseError } from "infrastructure/services/firebase/firebase.service";
import { PATHS } from "routing/paths";

interface AuthViewModel {
  signIn: (email: string, password: string) => void;
  isSignInPending: boolean;
  signOut: () => void;
  isSignOutPending: boolean;
}

export function useAuth(): AuthViewModel {
  const [isSignInPending, setIsSignInPending] = useState(false);
  const [isSignOutPending, setIsSignOutPending] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        setIsSignInPending(true);
        const response = await firebaseLogin(email, password);

        toast.success("Zalogowano pomyślnie");

        navigate(PATHS.home);
        setUser(response.user);
      } catch (e) {
        if (isFirebaseError(e)) {
          toast.error(e.message);
          console.error(e);
        } else {
          toast.error("Błąd logowania");
          console.error(e);
        }
      } finally {
        setIsSignInPending(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signOut = useCallback(async () => {
    try {
      setIsSignOutPending(true);
      await firebaseLogout();
      setUser(null);
      toast.info("Wylogowano pomyślnie", {
        toastId: "user-signed-out-toast-success",
      });
      navigate(PATHS.loginPage);
    } catch (e) {
      if (isFirebaseError(e)) {
        toast.error(e.message);
        console.error(e);
      } else {
        toast.error("Wystąpił błąd podczas wylogowywania", {
          toastId: "user-signed-out-toast-error",
        });
        console.error(e);
      }
    } finally {
      setIsSignOutPending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    signIn,
    isSignInPending,
    signOut,
    isSignOutPending,
  };
}
