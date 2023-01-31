import React, { FunctionComponent } from "react";

import { Grid, styled, Typography } from "@mui/material";
import { CountryFlags } from "components/country-flags/CountryFlags";
import { SelectYear } from "components/select-year/SelectYear";

export const CountrySelect: FunctionComponent = () => {
  return (
    <StyledGrid
      as="nav"
      container
      direction="row"
      // TODO: Sprwadzić czy jest ok
      // justify="space-around"
      alignItems="center"
      wrap="nowrap"
      data-print={false}
    >
      <Label variant="h6" data-print={false}>
        Wybierz kraj:
      </Label>
      <CountryFlags />
      <SelectYear />
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  padding: "20px",
});

const Label = styled(Typography)({
  whiteSpace: "nowrap",
});
