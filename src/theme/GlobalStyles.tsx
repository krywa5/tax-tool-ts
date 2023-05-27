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
};

export const GlobalStyles: FunctionComponent = () => {
  const globalStyles = {
    ...keyFrames,
    ...printStyles,
  };
  return <MuiGlobalStyles styles={globalStyles} />;
};
