import React, { FunctionComponent } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Country } from "components/country/Country";
import { AppProvider } from "contexts/AppContext";
import { ToastProvider } from "infrastructure/services/ToastProvider";
import { Login } from "pages/login/Login";
import { TaxTool } from "pages/tax-tool/TaxTool";
import { PATHS } from "routing/paths";
import { ThemeProvider } from "theme/ThemeProvider";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider />
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to={PATHS.home} />} />
            <Route path={PATHS.loginPage} element={<Login />} />
            <Route path={PATHS.home} element={<TaxTool />}>
              <Route path={`${PATHS.home}/:countryId`} element={<Country />} />
            </Route>
          </Routes>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
