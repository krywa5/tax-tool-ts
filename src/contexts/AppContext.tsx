import React, { FunctionComponent, PropsWithChildren } from "react";
import { ThemeProvider } from "theme/ThemeProvider";
import { RouterProvider } from "routing/RouterProvider";

export const AppContext: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <RouterProvider />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};
