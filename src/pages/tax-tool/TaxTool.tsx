import React, { FunctionComponent } from "react";
import { Outlet, useParams } from "react-router-dom";

import { Container, Paper, styled } from "@mui/material";
import { CountrySelect } from "components/country-select/CountrySelect";
import { Logo } from "components/logo/Logo";
import { LogoutButton } from "components/logout-button/LogoutButton";
import { AppTemplate } from "templates/app-template/AppTemplate";
import { CountryId } from "types/Country";

export const TaxTool: FunctionComponent = () => {
  const { countryId } = useParams();

  return (
    <AppTemplate>
      <TaxToolContainer disableGutters maxWidth="lg">
        <LogoutButton />
        <MainWrapper selectedCountry={countryId} elevation={15} as="main">
          <Logo />
          <CountrySelect />
          <Outlet />
        </MainWrapper>
      </TaxToolContainer>
    </AppTemplate>
  );
};

const TaxToolContainer = styled(Container)({
  "@media print": {
    maxWidth: "unset",
  },
});

const MainWrapper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selectedCountry",
})<{ selectedCountry?: CountryId }>(({ theme, selectedCountry }) => ({
  margin: `${theme.spacing(10)} auto ${theme.spacing(10)}`,
  maxWidth: selectedCountry ? "1200px" : "800px",
  padding: theme.spacing(3, 0),
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  animation: `fadeSlideIn ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut} both`,
  transition: `max-width ${theme.transitions.duration.long}ms ${theme.transitions.easing.easeInOut}`,

  "@media print": {
    boxShadow: "unset",
    margin: theme.spacing(0),
  },
}));
