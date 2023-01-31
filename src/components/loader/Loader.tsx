import React, { CSSProperties, FunctionComponent } from "react";

import { styled } from "@mui/material";

export interface LoaderProps {
  color?: CSSProperties["color"];
  isSmall?: boolean;
  isFullscreen?: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({
  color,
  isSmall = false,
  isFullscreen = false,
}) => {
  return (
    <Wrapper isFullscreen={isFullscreen}>
      <LoaderBase color={color} isSmall={isSmall} isFullscreen={isFullscreen} />
    </Wrapper>
  );
};

const Wrapper = styled("span")<Pick<LoaderProps, "isFullscreen">>(
  ({ isFullscreen }) => ({
    display: isFullscreen ? "grid" : "inline",
    position: isFullscreen ? "fixed" : "static",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "100",
    placeItems: "center",
  }),
);

const LoaderBase = styled("span", {
  shouldForwardProp: (prop) => prop !== "isFullscreen" && prop !== "isSmall",
})<LoaderProps>(({ theme, isSmall, color }) => ({
  display: "inline-block",
  height: isSmall ? "16px" : "30px",
  width: isSmall ? "16px" : "30px",
  borderRadius: "50%",
  border: "3px solid transparent",
  borderTop: color
    ? `3px solid ${color}`
    : `3px solid ${theme.palette.secondary.main}`,
  animation: "rotate 1.5s infinite linear",
  verticalAlign: "sub",
}));
