import { useContext } from "react";

import { AppContext } from "contexts/AppContext";
import { Country, CountryId } from "types/Country";
import { getCountryData } from "utils/countryUtils";

export function useCountryData(countryId: CountryId): { countryData: Country } {
  const { selectedYear, countriesData } = useContext(AppContext);
  const countryData = getCountryData(countriesData, selectedYear, countryId);

  return {
    countryData,
  };
}
