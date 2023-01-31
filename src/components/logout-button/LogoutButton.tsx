import React, { FunctionComponent } from "react";
import { toast } from "react-toastify";

import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Button, styled } from "@mui/material";
import { LogoutAlert } from "components/logout-alert/LogoutAlert";

export const LogoutButton: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleOnClick = () => {
    // TODO: Stylowanie toasta
    toast.info(<LogoutAlert />);
  };

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      endIcon={<ExitToAppOutlinedIcon />}
      size="large"
      onClick={handleOnClick}
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
