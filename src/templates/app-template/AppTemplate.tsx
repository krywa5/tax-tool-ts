import React, { FunctionComponent, PropsWithChildren } from "react";
import { styled } from "@mui/material";
import { Logo } from "components/logo/Logo";

export const AppTemplate: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StyledAppTemplate>
      <StyledLogo print={false} variant="secondary" />
      <main>{children}</main>
    </StyledAppTemplate>
  );
};

const StyledAppTemplate = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  maxWidth: "unset",
  backgroundImage: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
  padding: "50px",

  "@media print": {
    padding: "0",
  },
}));

const StyledLogo = styled(Logo)({
  position: "fixed",
  top: "48px",
  left: "48px",

  "@media (max-width: 1730px)": {
    top: "-10px",
  },
});
