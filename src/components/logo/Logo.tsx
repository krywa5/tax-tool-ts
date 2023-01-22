import React, { FunctionComponent } from "react";
import { styled } from "@mui/material";
import logoPrimary from "assets/images/logo-primary.png";
import logoSecondary from "assets/images/logo-secondary.png";
import { Printable, Stylable } from "helpers/types/ComponentTypes";

export interface LogoProps extends Stylable, Printable {
  variant?: "primary" | "secondary";
}

export const Logo: FunctionComponent<LogoProps> = ({
  variant = "primary",
  print,
  className,
}) => {
  const src = {
    primary: logoPrimary,
    secondary: logoSecondary,
  }[variant];

  return (
    <StyledLogo
      id="logo"
      src={src}
      alt="logo"
      className={className}
      data-print={print}
    />
  );
};

const StyledLogo = styled("img")({
  maxWidth: "150px",
  height: "auto",
  userSelect: "none",
});
