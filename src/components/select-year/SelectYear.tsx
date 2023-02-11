import React, { FunctionComponent, useContext } from "react";
import { useParams } from "react-router-dom";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { Country, CountryId } from "types/Country";

export const SelectYear: FunctionComponent = () => {
  const { countryId } = useParams();
  const { selectedYear, setSelectedYear, availableYears, countriesData } =
    useContext(AppContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeHandler = (e: SelectChangeEvent) => {
    setSelectedYear(e.target.value);
  };

  const allAvailableYearsMenuItems = createMenuItems(availableYears);

  const availableYearsForSelectedCountryMenuItems = countryId
    ? createMenuItems(findAvailableYears(countriesData, countryId))
    : [];

  return (
    <Select value={selectedYear} onChange={changeHandler} variant="outlined">
      {countryId
        ? availableYearsForSelectedCountryMenuItems
        : allAvailableYearsMenuItems}
    </Select>
  );
};

const findAvailableYears = (
  countriesData: Record<string, Country[]>,
  countryId?: CountryId,
) => {
  if (!countryId) {
    return [];
  }

  return Object.entries(countriesData)
    .filter(([_, countries]) => {
      return !!countries.find((country) => country.id === countryId);
    })
    .map(([year]) => year)
    .sort();
};

const createMenuItems = (years: string[]) =>
  years.map((year) => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));
