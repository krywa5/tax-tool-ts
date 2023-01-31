import React, { FunctionComponent } from "react";

import MuiGlobalStyles from "@mui/material/GlobalStyles";
import "theme/css-reset.css";

const keyFrames = {
  "@keyframes rotate": {
    to: {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes fadeSlideIn": {
    from: {
      opacity: "0",
      transform: "translateY(15px)",
    },
    to: {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
};

const printStyles = {
  "[data-print='false']": {
    "@media print": {
      display: "none !important",
    },
  },
  // TODO: Sprawdzić czy to jest w ogóle potrzebne
  ".only-print": {
    display: "none !important",
    "@media print": {
      display: "inline-block !important",
    },
  },
};

export const GlobalStyles: FunctionComponent = () => {
  const globalStyles = {
    ...keyFrames,
    ...printStyles,
    // TODO: Przenieść te style do tooltipa
    ".MuiTooltip-tooltip": {
      fontSize: "1rem",
    },
  };
  return <MuiGlobalStyles styles={globalStyles} />;
};
