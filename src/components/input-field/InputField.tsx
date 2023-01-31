import React, { FunctionComponent, PropsWithChildren } from "react";

import { styled } from "@mui/material";

export const InputField: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "25px 0 26px",
  position: "relative",

  "&:not(:last-child)::after": {
    content: "''",
    display: "block",
    position: "absolute",
    bottom: "0",
    left: "-20px",
    right: "-20px",
    height: "1px",
    background:
      "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 25%, rgb(0,0,0) 75%, rgb(0,0,0,0) 100%)",
  },
});
