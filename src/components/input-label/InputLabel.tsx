import React, { FunctionComponent } from "react";

import { styled, Typography } from "@mui/material";
import { createUUID } from "utils/stringUtils";

export interface InputLabelProps {
  label: string;
  labelFor: string;
  subLabels?: string[] | string; // TODO: zmienić to na obiekt z id i wykorzsytać to id jako key, żeby nie korzystać z
  // uuida
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
      {subLabels?.map((subLabel) => {
        return (
          <SubLabel key={createUUID()} variant="body2">
            {subLabel}
          </SubLabel>
        );
      })}
    </LabelWrapper>
  );
};

const LabelWrapper = styled("label")({
  display: "flex",
  flexDirection: "column",
  paddingRight: "15px",
});

const SubLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: ".3em",

  "&:nth-of-type(1)": {
    marginTop: "10px",
  },
}));
