import React, { FunctionComponent, PropsWithChildren } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { theme } from "theme/theme";
import { GlobalStyles } from "theme/GlobalStyles";

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
