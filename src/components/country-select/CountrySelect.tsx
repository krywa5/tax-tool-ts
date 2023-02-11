import React, { FunctionComponent } from "react";

import { styled, Typography } from "@mui/material";
import { CountryFlags } from "components/country-flags/CountryFlags";
import { SelectYear } from "components/select-year/SelectYear";

export const CountrySelect: FunctionComponent = () => {
  return (
    <StyledGrid data-print={false}>
      <Label variant="h6" data-print={false}>
        Wybierz kraj:
      </Label>
      <CountryFlags />
      <SelectYear />
    </StyledGrid>
  );
};

const StyledGrid = styled("nav")({
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  padding: "20px",
  width: "100%",
  justifyContent: "space-around",
});

const Label = styled(Typography)({
  whiteSpace: "nowrap",
});
