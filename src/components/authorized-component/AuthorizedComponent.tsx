import React, { FunctionComponent, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";
import { PATHS } from "routing/paths";
import { isAuthSession } from "utils/authUtils";

export const AuthorizedComponent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  if (!firebaseAuth.currentUser && !isAuthSession()) {
    toast.error("Brak dostępu. Zaloguj się aby korzystać z TaxTool", {
      toastId: "no-permission-toast",
    });
    return <Navigate to={PATHS.loginPage} replace />;
  }

  return <>{children}</>;
};
