import React, { FunctionComponent } from "react";
import { Navigate, useParams } from "react-router-dom";

import { countriesData } from "assets/data/countries/countriesData";
import { CountryForm } from "components/country/CountryForm";
import { CountryProvider } from "contexts/CountryContext";
import { IncomesTableProvider } from "contexts/IncomesTableContext";
import { PATHS } from "routing/paths";

export const Country: FunctionComponent = () => {
  const { countryId: selectedCountry } = useParams();

  if (!selectedCountry) {
    throw new Error("No selected country!");
  }

  // if the selectedCountry does not exist in the countriesData (there is no id with this name), redirect to the home page
  const allCountries = Object.values(countriesData).flat();
  const countryExists = allCountries.some(
    (country) => country.id === selectedCountry,
  );

  if (!countryExists) {
    return <Navigate to={PATHS.home} replace />;
  }

  return (
    <CountryProvider>
      <IncomesTableProvider>
        <CountryForm selectedCountry={selectedCountry} />
      </IncomesTableProvider>
    </CountryProvider>
  );
};
