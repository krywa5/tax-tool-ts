import React, { FunctionComponent, useContext } from "react";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Loader } from "components/loader/Loader";
import { AppContext } from "contexts/AppContext";

export const SelectYear: FunctionComponent = () => {
  const { selectedYear, setSelectedYear, availableYears } =
    useContext(AppContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeHandler = (e: SelectChangeEvent) => {
    setSelectedYear(e.target.value);
  };

  if (availableYears.length <= 1) return <Loader />;

  const MenuItemsJSX = availableYears.map((year) => (
    <MenuItem value={year} key={year}>
      {year}
    </MenuItem>
  ));

  return (
    <Select value={selectedYear} onChange={changeHandler} variant="outlined">
      {MenuItemsJSX}
    </Select>
  );
};
