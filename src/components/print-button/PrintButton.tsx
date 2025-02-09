import React, { FunctionComponent } from "react";

import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Button, Portal, styled } from "@mui/material";

export const PrintButton: FunctionComponent = () => {
  return (
    <Portal container={document.getElementById("root")}>
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={() => {
          window.print();
        }}
        data-print={false}
      >
        <PrintIcon />
      </StyledButton>
    </Portal>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  bottom: "50px",
  right: "50px",
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.secondary.main,
  transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.short}ms`,
  outline: "none",
  animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut}`,

  "&:hover": {
    transform: "translateY(-2px)",
  },
  "@media (max-width: 1730px)": {
    bottom: "75px",
    right: "75px",
  },
}));

const PrintIcon = styled(PrintOutlinedIcon)({
  fontSize: "40px",
});
