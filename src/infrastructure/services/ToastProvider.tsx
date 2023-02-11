import React, { FunctionComponent, PropsWithChildren } from "react";
import { Slide, ToastContainer } from "react-toastify";

import { styled } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <StyledToastContainer autoClose={3000} newestOnTop transition={Slide} />
      {children}
    </>
  );
};

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    &--success {
      background-color: #f5fff8;
    }

    &--error {
      background-color: #faefef;
    }

    &--warning {
      background-color: #fffff5;
    }

    &--info {
      background-color: #f0f7fa;
    }
  }
`;
