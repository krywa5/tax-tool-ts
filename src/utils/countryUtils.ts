import { AvailableYear } from "types/AvailableYear";
import { Country, CountryId } from "types/Country";

export const getCountriesData = (
  countriesData: Record<AvailableYear, Country[]>,
  selectedYear: AvailableYear,
): Country[] => {
  if (!(selectedYear in countriesData)) {
    throw new Error("There is no data for selected year!");
  }
  return countriesData[selectedYear];
};

export const getCountryData = (
  countriesData: Record<AvailableYear, Country[]>,
  selectedYear: AvailableYear,
  selectedCountry: CountryId,
): Country => {
  const countriesDataForActiveYear = getCountriesData(
    countriesData,
    selectedYear,
  );
  const countryData = countriesDataForActiveYear.find(
    (country) => country.id === selectedCountry,
  );
  if (!countryData) {
    throw new Error("There is no data for selected country and selected year!");
  }
  return countryData;
};
