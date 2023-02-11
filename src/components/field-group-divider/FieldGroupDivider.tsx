import React, { FunctionComponent } from "react";

import { styled, Typography } from "@mui/material";

export interface FieldGroupDividerProps {
  text: string;
}

export const FieldGroupDivider: FunctionComponent<FieldGroupDividerProps> = ({
  text,
}) => {
  return (
    <Wrapper data-print={false}>
      <Typography variant="body1">{text}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderTop: `1px solid ${theme.palette.common.black}`,
  borderBottom: `1px solid ${theme.palette.common.black}`,
  background: theme.palette.primary.dark,
  color: theme.palette.common.white,
}));
