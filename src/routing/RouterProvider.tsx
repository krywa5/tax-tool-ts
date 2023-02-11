import React, { FunctionComponent } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthorizedComponent } from "components/authorized-component/AuthorizedComponent";
import { Country } from "components/country/Country";
import { Login } from "pages/login/Login";
import { TaxTool } from "pages/tax-tool/TaxTool";
import { PATHS } from "routing/paths";

export const RouterProvider: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATHS.home} />} />
      <Route path={PATHS.loginPage} element={<Login />} />
      <Route path={PATHS.home} element={<AuthorizedTaxTool />}>
        <Route path={`${PATHS.home}/:countryId`} element={<Country />} />
      </Route>
    </Routes>
  );
};

const AuthorizedTaxTool: FunctionComponent = () => (
  <AuthorizedComponent>
    <TaxTool />
  </AuthorizedComponent>
);
