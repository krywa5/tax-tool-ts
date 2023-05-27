import React, { FunctionComponent } from "react";

import { styled, Typography } from "@mui/material";

export interface InputLabelProps {
  label: string;
  labelFor: string;
  subLabels?: string[] | string;
}

export const InputLabel: FunctionComponent<InputLabelProps> = ({
  label,
  labelFor,
  subLabels,
}) => {
  if (typeof subLabels === "string") subLabels = [subLabels];

  return (
    <LabelWrapper htmlFor={labelFor}>
      <Typography variant="h5">{label}</Typography>
      {subLabels?.map((subLabel, index) => {
        return (
          // index is used as a key because there is no dynamic changes to sublabels list
          <SubLabel key={index} variant="body2">
            {subLabel}
          </SubLabel>
        );
      })}
    </LabelWrapper>
  );
};

const LabelWrapper = styled("label")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingRight: theme.spacing(2),
}));

const SubLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: ".3em",

  "&:nth-of-type(1)": {
    marginTop: "10px",
  },
}));
