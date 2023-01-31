import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { getExchangeRates } from "infrastructure/services/nbp/api/getExchangeRates";
import { GuidString } from "types/AppTypes";
import { Calculator } from "types/Calculator";
import { Country } from "types/Country";
import { Income } from "types/Income";
import { sortByKey } from "utils/arrayUtils";
import { dateDiff, daysToMonths, getLastWorkingDay } from "utils/dateUtils";

export const CountryContext = createContext<CountryContextType>({
  addNewIncome: () => {},
  calculator: {
    income: 0,
    paidTax: 0,
    holidayIncome: 0,
    startDate: "",
    endDate: "",
    paymentDate: "",
    incomes: [],
    currencyValue: 0,
    currencyValueDate: "",
    currencyTable: "",
    dailyDiet: 0,
    workDays: 0,
    workMonths: 0,
    daysInPoland: 0,
    taxValue: 0,
    allIncomeValue: 0,
    isDataFetching: false,
  },
  countryData: {},
  removeIncome: () => {},
  setCalculatorValue: () => {},
  setCountryValue: () => {},
});

interface CountryContextType {
  countryData: Country | null;
  setCountryValue: <Q>(key: keyof Country, value: Q) => void;
  calculator: Calculator;
  setCalculatorValue: <Q>(key: keyof Calculator, value: Q) => void;
  addNewIncome: (income: Income) => void;
  removeIncome: (incomeId: GuidString) => void;
}

interface CountryProviderProps {
  data: Country | null;
}

// TODO: Wywalić propsy z providera
export const CountryProvider: FunctionComponent<
  PropsWithChildren<CountryProviderProps>
> = ({ data, children }) => {
  const [countryData, setCountryData] = useState<Country | null>(data);
  const [calculator, setCalculator] = useState<Calculator>({
    income: 0, // przychód brutto
    paidTax: 0, // zapłacony podatek zagranicą
    holidayIncome: 0, // przychód wakacyjny (tylko w Niemczech)
    startDate: "", // data rozpoczęcia pracy
    endDate: "", // data zakończenia pracy
    paymentDate: "", // data wypłaty
    incomes: [
      // tablica do trzymania listy wyników kalkulatora
      // {
      //     id: 123123123,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 4012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
      // {
      //     id: 123123112318,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 4012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
      // {
      //     id: 12312311232118,
      //     startDate: '2019-01-01',
      //     endDate: '2019-02-01',
      //     currencyTable: 'asdasdsad',
      //     currencyValue: 4.1252,
      //     currencyValueDate: '2019-02-01',
      //     daysInPoland: 2,
      //     holidayIncome: 120,
      //     incomeAbroad: 1600,
      //     incomePLN: 30012.12,
      //     paidTax: 100.12,
      //     paymentDate: '2019-01-31',
      //     taxPLN: 400.55,
      // },
    ],
    currencyValue: 0, // średni kurs waluty z NBP
    currencyValueDate: "", // data średniego kursu waluty z NBP
    currencyTable: "", // tabela waluty
    dailyDiet: Number((countryData.diet * countryData.dietFactor).toFixed(2)), // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
    workDays: 0, // ilość dni zagranicą
    workMonths: 0, // ilość miesięcy zagranicą
    daysInPoland: 0, // ilość spędzonych w Polsce podczas pracy zagranicą
    taxValue: 0, // podatek PLN
    allIncomeValue: 0, // przychód PLN
    isDataFetching: false, // flaga gdy pobieranie danych o walucie
  });

  const setCalculatorValue = useCallback<
    <Q>(key: keyof Calculator, value: Q) => void
  >((key, value) => {
    setCalculator((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  const setCountryValue = useCallback<
    <Q>(key: keyof Country, value: Q) => void
  >((key, value) => {
    setCountryData((prevValue: any) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  const clearAPIValues = useCallback(() => {
    setCalculatorValue("currencyValue", 0);
    setCalculatorValue("currencyValueDate", "");
    setCalculatorValue("currencyTable", "");
  }, [setCalculatorValue]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const showDataLoader = () => {
    setCalculatorValue("isDataFetching", true);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const hideDataLoader = () => {
    setCalculatorValue("isDataFetching", false);
  };

  const addNewIncome = (income = {}): void => {
    setCalculatorValue(
      "incomes",
      // TODO: Wywalić ts-espect-error
      // @ts-expect-error
      sortByKey([...calculator.incomes, income], "startDate"),
    );
  };

  const removeIncome = (incomeId: GuidString): void => {
    const state = [...calculator.incomes];
    const newIncomes = state.filter((income) => income.id !== incomeId);

    return setCalculatorValue("incomes", newIncomes);
  };

  // Calculate/recalculate calculator values dependent on start and end dates
  useEffect(
    () => {
      const { startDate, endDate, paymentDate, daysInPoland, workDays } =
        calculator;

      if (startDate && (endDate || paymentDate)) {
        setCalculatorValue(
          "workDays",
          dateDiff(startDate, endDate, daysInPoland),
        );
        setCalculatorValue("workMonths", daysToMonths(workDays));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      setCalculatorValue,
      calculator.startDate,
      calculator.endDate,
      calculator.paymentDate,
      calculator.daysInPoland,
      calculator.workDays,
    ],
  );

  // Get currency API values if end date or payment date has changed
  useEffect(() => {
    const { endDate, paymentDate } = calculator;
    const { currency } = countryData;

    if (endDate || paymentDate) {
      const properDate = paymentDate || endDate; // if paymentDate is inserted it has priority over endDate

      clearAPIValues();
      showDataLoader();

      getExchangeRates(getLastWorkingDay(new Date(properDate)), currency)
        .then((data) => {
          const {
            effectiveDate: currencyValueDate,
            mid: currencyValueApi,
            no: currencyTable,
            // TODO: Naprawić typy
            // @ts-expect-error
          } = data.rates[0];

          setCalculatorValue(
            "currencyValue",
            Number(currencyValueApi.toFixed(4)),
          );
          setCalculatorValue("currencyValueDate", currencyValueDate);
          setCalculatorValue("currencyTable", currencyTable);
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
        .finally(hideDataLoader);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    calculator.endDate,
    calculator.paymentDate,
    clearAPIValues,
    countryData.currency,
    setCalculatorValue,
  ]);

  // Calculate tax value [PLN]
  useEffect(() => {
    const { paidTax, currencyValue } = calculator;

    const taxValue = paidTax * currencyValue;
    const output = Math.max(Number(taxValue.toFixed(2)));

    return setCalculatorValue("taxValue", output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculator.currencyValue, calculator.paidTax, setCalculatorValue]);

  // Calculate Income value [PLN]
  useEffect(() => {
    const {
      currencyValue,
      income,
      holidayIncome,
      workDays,
      dailyDiet,
      workMonths,
    } = calculator;
    const { monthlyIncomeCost } = countryData;

    const allIncome =
      (income + holidayIncome - workDays * dailyDiet) * currencyValue -
      workMonths * monthlyIncomeCost;

    const output = Math.max(Number(allIncome.toFixed(2)), 0);

    return setCalculatorValue("allIncomeValue", output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    calculator.currencyValue,
    calculator.income,
    calculator.holidayIncome,
    calculator.workDays,
    calculator.dailyDiet,
    calculator.workMonths,
    countryData.monthlyIncomeCost,
    setCalculatorValue,
  ]);

  // change country data if selected year changed
  useEffect(() => {
    setCountryData(data);
  }, [data]);

  return (
    <CountryContext.Provider
      value={{
        countryData,
        setCountryValue,
        calculator,
        setCalculatorValue,
        addNewIncome,
        removeIncome,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
