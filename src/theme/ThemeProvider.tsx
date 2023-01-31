import React, { FunctionComponent, PropsWithChildren } from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "theme/GlobalStyles";
import { theme } from "theme/theme";

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </MuiThemeProvider>
  );
};
