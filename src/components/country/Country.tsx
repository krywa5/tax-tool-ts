import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import { CountryForm } from "components/country/CountryForm";
import { CountryProvider } from "contexts/CountryContext";
import { IncomesTableProvider } from "contexts/IncomesTableContext";

export const Country: FunctionComponent = () => {
  const { countryId: selectedCountry } = useParams();

  if (!selectedCountry) {
    throw new Error("No selected country!");
  }

  return (
    <CountryProvider>
      <IncomesTableProvider>
        <CountryForm selectedCountry={selectedCountry} />
      </IncomesTableProvider>
    </CountryProvider>
  );
};
