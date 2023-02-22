import React, { FunctionComponent } from "react";

import { Container as MuiContainer, styled, Typography } from "@mui/material";
import { IncomesTable } from "components/incomes-table/IncomesTable";
import { PrintButton } from "components/print-button/PrintButton";
import { useCountryData } from "hooks/useCountryData";
import { CountryId } from "types/Country";

interface IncomeListProps {
  selectedCountry: CountryId;
}

export const IncomeList: FunctionComponent<IncomeListProps> = ({
  selectedCountry,
}) => {
  const { countryData } = useCountryData(selectedCountry);
  const { label: countryLabel } = countryData;

  return (
    <>
      <IncomeListWrapper maxWidth={false}>
        <IncomeListTitle variant="h5" align="center">
          Lista przychodów
          <CountryName fontSize="large" variant="body1">
            &nbsp;- {countryLabel}
          </CountryName>
        </IncomeListTitle>
        <IncomesTable selectedCountry={selectedCountry} />
      </IncomeListWrapper>
      <PrintButton />
    </>
  );
};

const IncomeListTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  "@media print": {
    marginBottom: theme.spacing(4),
  },
}));

const CountryName = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontFamily: theme.typography.h5.fontFamily,
  fontWeight: 700,
  lineHeight: theme.typography.h5.lineHeight,
  display: "none",

  "@media print": {
    display: "inline-block",
  },
}));

const IncomeListWrapper = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(5, 3),
  "@media print": {
    padding: theme.spacing(0),
  },
}));
