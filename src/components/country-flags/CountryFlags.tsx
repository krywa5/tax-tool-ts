import React, { FunctionComponent, useContext } from "react";

import { Grid, styled } from "@mui/material";
import { CountryFlag } from "components/country-flag/CountryFlag";
import { Loader } from "components/loader/Loader";
import { AppContext } from "contexts/AppContext";

export const CountryFlags: FunctionComponent = () => {
  const { countriesData } = useContext(AppContext);
  const isDataLoading = !countriesData.length;

  return (
    <StyledGrid container direction="row" as="ul">
      {isDataLoading ? (
        <Loader />
      ) : (
        countriesData.map((country) => (
          <CountryFlag
            key={country.id}
            country={country.id}
            countryLabel={country.label}
          />
        ))
      )}
    </StyledGrid>
  );
};

const StyledGrid = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat( auto-fit, 80px )",
  maxWidth: "59%",
  padding: "0 30px",
  gap: "25px",
  listStyle: "none",
  justifyContent: "center",
});
