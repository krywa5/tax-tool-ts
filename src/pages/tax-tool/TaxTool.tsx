import React, { FunctionComponent, useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { Container, Paper, styled } from "@mui/material";
import { CountrySelect } from "components/country-select/CountrySelect";
import { Loader } from "components/loader/Loader";
import { Logo } from "components/logo/Logo";
import { LogoutButton } from "components/logout-button/LogoutButton";
import { AppContext } from "contexts/AppContext";
import { firebaseAuth } from "infrastructure/services/firebase/firebase.service";
import { PATHS } from "routing/paths";
import { AppTemplate } from "templates/app-template/AppTemplate";
import { CountryId } from "types/Country";
import { isAuthSession } from "utils/authUtils";

export const TaxTool: FunctionComponent = () => {
  const navigate = useNavigate();
  const { countryId } = useParams();
  const { setIsUserLogged, isUserLogged } = useContext(AppContext);

  useEffect(() => {
    if (firebaseAuth.currentUser ?? isAuthSession()) {
      // user is logged
      setIsUserLogged(true);
    } else {
      // user is not logged
      navigate(PATHS.loginPage);
      setIsUserLogged(false);
    }
  }, [navigate, setIsUserLogged]);

  if (!isUserLogged) {
    return <Loader />;
    // Comment of sadness
  }
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
    margin: "0",
  },
}));
