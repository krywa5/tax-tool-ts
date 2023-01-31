import React, { FunctionComponent } from "react";

import { styled, Typography } from "@mui/material";

export const Copyright: FunctionComponent = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©{" "}
      <StyledLink
        href="mailto:k.wasilewski92@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <strong>Krystian Wasilewski</strong>
      </StyledLink>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  transition: `color ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
