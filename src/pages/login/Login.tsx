import React, { FunctionComponent } from "react";

import { LoginForm } from "components/login-form/LoginForm";
import { AppTemplate } from "templates/app-template/AppTemplate";

export const Login: FunctionComponent = () => {
  return (
    <AppTemplate>
      <LoginForm />
    </AppTemplate>
  );
};
