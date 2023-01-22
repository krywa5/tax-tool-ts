import React, { FunctionComponent } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider as RRDRouterProvider,
} from "react-router-dom";
import { PATHS } from "routing/paths";
import { TaxTool } from "pages/tax-tool/TaxTool";
import { Login } from "pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={PATHS.home} />,
  },
  {
    path: PATHS.home,
    element: <TaxTool />,
  },
  {
    path: PATHS.loginPage,
    element: <Login />,
  },
]);

export const RouterProvider: FunctionComponent = () => {
  return <RRDRouterProvider router={router} />;
};
