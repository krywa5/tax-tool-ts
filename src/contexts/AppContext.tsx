import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";

import { countriesData } from "assets/data/countries/countriesData";
import { StateSetter } from "types/AppTypes";
import { AvailableYear } from "types/AvailableYear";
import { Country } from "types/Country";

const appContextInitState: AppContextType = {
  isUserLogged: false,
  setIsUserLogged: () => false,
  selectedYear: (new Date().getFullYear() - 1).toString(),
  setSelectedYear: () => 0,
  availableYears: [],
  countriesData: {},
};

interface AppContextType {
  isUserLogged: boolean;
  setIsUserLogged: StateSetter<boolean>;
  selectedYear: AvailableYear;
  setSelectedYear: StateSetter<AvailableYear>;
  availableYears: AvailableYear[];
  countriesData: Record<AvailableYear, Country[]>;
}

export const AppContext = createContext<AppContextType>(appContextInitState);

const availableYearSorted: AvailableYear[] = Object.keys(countriesData)
  .map((year) => Number(year))
  .sort((a, b) => a - b)
  .map((year) => year.toString());
const latestAvailableYear = availableYearSorted[availableYearSorted.length - 1];

export const AppProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(latestAvailableYear);

  return (
    <AppContext.Provider
      value={{
        isUserLogged,
        setIsUserLogged,
        selectedYear,
        setSelectedYear,
        availableYears: availableYearSorted,
        countriesData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
