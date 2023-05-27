import React, { FunctionComponent } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled, Tooltip, Typography } from "@mui/material";

export interface InputLabelProps {
  label: string;
  labelDescription?: string;
  labelFor: string;
  subLabels?: string[] | string;
}

export const InputLabel: FunctionComponent<InputLabelProps> = ({
  label,
  labelDescription,
  labelFor,
  subLabels,
}) => {
  if (typeof subLabels === "string") subLabels = [subLabels];

  return (
    <LabelWrapper htmlFor={labelFor}>
      <StyledTypography variant="h5">
        {label}
        {labelDescription && (
          <Tooltip title={labelDescription} placement="top">
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        )}
      </StyledTypography>
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

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

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
