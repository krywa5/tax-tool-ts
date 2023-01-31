import React, { FunctionComponent } from "react";

import { styled } from "@mui/material";
import { Loader } from "components/loader/Loader";

export const LoadingBackdrop: FunctionComponent = () => {
  return (
    <Backdrop>
      <Loader />
    </Backdrop>
  );
};

const Backdrop = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "grid",
  placeItems: "center",
  backgroundColor: "rgba(0,0,0,.15)",
  zIndex: "1",
});
