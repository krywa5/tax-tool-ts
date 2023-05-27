import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";

import { CountryContext } from "contexts/CountryContext";
import { useCountryData } from "hooks/useCountryData";
import { getExchangeRates } from "infrastructure/services/nbp/api/getExchangeRates";
import { CountryId } from "types/Country";
import { getLastWorkingDay } from "utils/dateUtils";

interface CurrencyDataFetcherProps {
  selectedCountry: CountryId;
}

export const CurrencyDataFetcher: FunctionComponent<
  PropsWithChildren<CurrencyDataFetcherProps>
> = ({ selectedCountry, children }) => {
  const {
    endDate,
    paymentDate,
    setCurrencyValue,
    setCurrencyValueDate,
    setCurrencyTable,
    setIsCurrencyDataFetching,
    resetCurrencyData,
  } = useContext(CountryContext);
  const { countryData } = useCountryData(selectedCountry);
  const { currency: countryCurrency } = countryData;

  useEffect(() => {
    const calculationsEndDate = paymentDate ?? endDate;
    if (calculationsEndDate) {
      resetCurrencyData();
      setIsCurrencyDataFetching(true);

      getExchangeRates(getLastWorkingDay(calculationsEndDate), countryCurrency)
        .then((data) => {
          if (!data) return;

          const {
            effectiveDate: currencyValueDate,
            mid: currencyValueApi,
            no: currencyTable,
          } = data.rates[0];

          setCurrencyValue(Number(currencyValueApi.toFixed(4)));
          setCurrencyValueDate(new Date(currencyValueDate));
          setCurrencyTable(currencyTable);
        })
        .catch((error) => {
          toast.error(
            "Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.",
            {
              position: "top-center",
              toastId: "currency-data-error-toast",
            },
          );
          console.error(error);
        })
        .finally(() => setIsCurrencyDataFetching(false));
    }
  }, [
    countryCurrency,
    endDate,
    paymentDate,
    resetCurrencyData,
    setCurrencyTable,
    setCurrencyValue,
    setCurrencyValueDate,
    setIsCurrencyDataFetching,
  ]);

  return <>{children}</>;
};
