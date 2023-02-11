import React, { FunctionComponent } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider as RRDRouterProvider,
} from "react-router-dom";

import { Country } from "components/country/Country";
import { Login } from "pages/login/Login";
import { TaxTool } from "pages/tax-tool/TaxTool";
import { PATHS } from "routing/paths";

// TODO: Spróbować zrobić coś z basename
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={PATHS.home} />,
  },
  {
    path: PATHS.home,
    element: <TaxTool />,
    children: [
      {
        path: `tax-tool/:countryId`,
        element: <Country />,
      },
    ],
  },
  {
    path: PATHS.loginPage,
    element: <Login />,
  },
]);

export const RouterProvider: FunctionComponent = () => {
  return <RRDRouterProvider router={router} />;
};
