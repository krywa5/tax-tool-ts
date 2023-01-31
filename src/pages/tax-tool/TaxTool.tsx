import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Container, Paper, styled } from "@mui/material";
import { CountrySelect } from "components/country-select/CountrySelect";
import { Country } from "components/country/Country";
import { Loader } from "components/loader/Loader";
import { Logo } from "components/logo/Logo";
import { LogoutButton } from "components/logout-button/LogoutButton";
import { AppContext } from "contexts/AppContext";
import { CountryProvider } from "contexts/CountryContext";
import { child, get, ref } from "firebase/database";
import {
  firebaseAuth,
  firebaseDB,
} from "infrastructure/services/firebase/firebase.service";
import { PATHS } from "routing/paths";
import { Country as TCountry } from "types/Country";
import { isAuthSession } from "utils/authUtils";

export const TaxTool: FunctionComponent = () => {
  const navigate = useNavigate();
  const {
    setIsUserLogged,
    isUserLogged,
    setCountriesData,
    selectedCountry,
    countriesData,
    selectedYear,
  } = useContext(AppContext);

  const getCountriesData = useCallback(() => {
    const countriesDataRef = ref(firebaseDB);
    get(child(countriesDataRef, "countries"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()[selectedYear];
          setCountriesData(data);
        }
      })
      .catch((err) => {
        toast.error("Błąd połączenia z bazą danych");
        console.error(err);
      });
  }, [setCountriesData, selectedYear]);

  useEffect(() => {
    if (firebaseAuth.currentUser ?? isAuthSession()) {
      // user is logged
      setIsUserLogged(true);
      getCountriesData();
    } else {
      // user is not logged
      navigate(PATHS.loginPage);
      setIsUserLogged(false);
    }
  }, [navigate, setIsUserLogged, getCountriesData]);

  useEffect(() => {
    getCountriesData();
  }, [getCountriesData]);

  if (!isUserLogged) {
    return <Loader />;
  }

  console.log({ countriesData });

  return (
    <TaxToolContainer disableGutters>
      <LogoutButton />
      <MainWrapper selectedCountry={selectedCountry} elevation={15} as="main">
        <Logo />
        <CountrySelect />
        {/* <Routes> */}
        {/* <CountryProvider data={countriesData[selectedCountry} key={country.id}> */}
        {/*  <Country /> */}
        {/* </CountryProvider> */}
        {countriesData.map((country) => (
          // TODO: Naprawić
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // <Route path={`${PATHS.home}/${country.id}`} key={country.id}>
          <CountryProvider data={country} key={country.id}>
            <Country />
          </CountryProvider>
          // </Route>
        ))}
        {/* </Routes> */}
      </MainWrapper>
    </TaxToolContainer>
  );
};

const TaxToolContainer = styled(Container)({
  "@media print": {
    maxWidth: "unset",
  },
});

const MainWrapper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selectedCountry",
})<{ selectedCountry?: TCountry }>(({ theme, selectedCountry }) => ({
  margin: `${theme.spacing(10)}px auto ${theme.spacing(10)}px`,
  maxWidth: selectedCountry ? "1300px" : "800px",
  padding: `${theme.spacing(3)}px 0`,
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
