import React, { FunctionComponent, useContext } from "react";

import { Grid, styled } from "@mui/material";
import { CountryFlag } from "components/country-flag/CountryFlag";
import { AppContext } from "contexts/AppContext";
import { getCountriesData } from "utils/countryUtils";

export const CountryFlags: FunctionComponent = () => {
  const { countriesData, selectedYear } = useContext(AppContext);
  const countriesDataPerSelectedYear = getCountriesData(
    countriesData,
    selectedYear,
  );

  return (
    <StyledGrid direction="row" as="ul">
      {countriesDataPerSelectedYear.map((country) => (
        <CountryFlag
          key={country.id}
          country={country.id}
          countryLabel={country.label}
        />
      ))}
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 80px)",
  width: "100%",
  maxWidth: "59%",
  padding: theme.spacing(0, 4),
  gap: theme.spacing(3),
  listStyle: "none",
  justifyContent: "center",
}));
