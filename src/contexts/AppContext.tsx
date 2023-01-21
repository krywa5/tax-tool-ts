import React, { FunctionComponent, PropsWithChildren } from "react";
import { ThemeProvider } from "theme/ThemeProvider";

export const AppContext: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
