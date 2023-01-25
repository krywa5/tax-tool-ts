import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { child, get, ref } from "firebase/database";
import { firebaseDB } from "infrastructure/services/firebase/firebase.service";
import { Country } from "interfaces/Country";
import { StateSetter } from "interfaces/AppTypes";

const appContextInitState: AppContextType = {
  selectedCountry: null,
  setSelectedCountry: () => null,
  countriesData: [],
  setCountriesData: () => [],
  isUserLogged: false,
  setIsUserLogged: () => false,
  selectedYear: new Date().getFullYear() - 1,
  setSelectedYear: () => 0,
  availableYears: [new Date().getFullYear() - 1],
  setAvailableYears: () => [0],
};

interface AppContextType {
  selectedCountry: string | null;
  setSelectedCountry: StateSetter<string | null>;
  countriesData: Country[];
  setCountriesData: StateSetter<Country[]>;
  isUserLogged: boolean;
  setIsUserLogged: StateSetter<boolean>;
  selectedYear: number;
  setSelectedYear: StateSetter<number>;
  availableYears: number[];
  setAvailableYears: StateSetter<number[]>;
}

export const AppContext = createContext<AppContextType>(appContextInitState);

// TODO: Rozbić to na mniejsze konteksty
export const AppProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 1,
  );
  const [availableYears, setAvailableYears] = useState([
    new Date().getFullYear() - 1,
  ]);

  // Get data from DB and set available years
  useEffect(() => {
    const countriesDataRef = ref(firebaseDB);
    get(child(countriesDataRef, "countries"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const response = Object.keys(snapshot.val()).map(Number);
          setAvailableYears(response);
        } else {
          console.warn("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        countriesData,
        setCountriesData,
        isUserLogged,
        setIsUserLogged,
        selectedYear,
        setSelectedYear,
        availableYears,
        setAvailableYears,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
