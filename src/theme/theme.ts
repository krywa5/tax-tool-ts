import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles/createTheme";

declare module "@mui/material/styles/createTransitions" {
  interface Duration {
    medium: number;
    long: number;
  }
}

export const customTheme: ThemeOptions = {
  palette: {
    primary: {
      light: "#64c1ff",
      main: "#0091ea",
      dark: "#0064b7",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffd95a",
      main: "#f9a825",
      dark: "#c17900",
      contrastText: "#000",
    },
    background: {
      default: "#eee",
    },
  },
  transitions: {
    duration: {
      medium: 500,
      long: 750,
    },
  },
};

export const theme = createTheme(customTheme);
