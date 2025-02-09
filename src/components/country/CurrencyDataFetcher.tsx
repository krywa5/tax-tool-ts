import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
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

  const updateCurrencyState = useCallback(
    async (calculationsEndDate: Date) => {
      try {
        const response = await getExchangeRates(
          getLastWorkingDay(calculationsEndDate),
          countryCurrency,
        );
        if (!response) return;

        const {
          effectiveDate: currencyValueDate,
          mid: currencyValueApi,
          no: currencyTable,
        } = response.rates[0];

        setCurrencyValue(Number(currencyValueApi.toFixed(4)));
        setCurrencyValueDate(new Date(currencyValueDate));
        setCurrencyTable(currencyTable);
      } catch (error) {
        toast.error(
          "Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.",
          {
            position: "top-center",
            toastId: "currency-data-error-toast",
          },
        );
        console.error(error);
      } finally {
        setIsCurrencyDataFetching(false);
      }
    },
    [
      countryCurrency,
      setCurrencyTable,
      setCurrencyValue,
      setCurrencyValueDate,
      setIsCurrencyDataFetching,
    ],
  );

  useEffect(() => {
    const calculationsEndDate = paymentDate ?? endDate;
    if (calculationsEndDate) {
      resetCurrencyData();
      setIsCurrencyDataFetching(true);

      void updateCurrencyState(calculationsEndDate);
    }
  }, [
    endDate,
    paymentDate,
    resetCurrencyData,
    setIsCurrencyDataFetching,
    updateCurrencyState,
  ]);

  return <>{children}</>;
};
