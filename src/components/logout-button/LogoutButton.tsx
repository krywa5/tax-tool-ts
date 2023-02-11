import React, { FunctionComponent, useRef } from "react";
import { Id, toast } from "react-toastify";

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Button, styled } from "@mui/material";
import { LogoutAlert } from "components/logout-alert/LogoutAlert";
import { useAuth } from "hooks/useAuth";

export const LogoutButton: FunctionComponent = () => {
  const { signOut, isSignOutPending } = useAuth();
  const toastId = useRef<Id | null>(null);

  const logoutHandler = async () => {
    await signOut();
  };

  const dismissHandler = () => {
    if (toastId?.current) {
      toast.dismiss(toastId.current);
    }
  };

  const showConfirmation = () =>
    (toastId.current = toast.info(
      <LogoutAlert
        logout={logoutHandler}
        dismiss={dismissHandler}
        isLogoutPending={isSignOutPending}
      />,
      {
        autoClose: 10000,
      },
    ));

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      endIcon={<ExitToAppOutlinedIcon />}
      size="large"
      onClick={showConfirmation}
      data-print={false}
    >
      Wyloguj
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  top: "75px",
  right: "75px",
  transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,

  "&:hover": {
    transform: "translateY(-2px)",
  },
  "@media (max-width: 1730px)": {
    top: "20px",
    right: "50px",
  },
}));
