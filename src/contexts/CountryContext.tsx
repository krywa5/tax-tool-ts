import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { sortByKey } from "utils/arrayUtils";
import { GuidString } from "helpers/types/AppTypes";
import { dateDiff, daysToMonths, getLastWorkingDay } from "utils/dateUtils";
import { getExchangeRates } from "infrastructure/services/nbp/api/getExchangeRates";

export const CountryContext = createContext({});

interface CountryProviderProps {
  data: any;
}

// TODO: Wywalić propsy z providera
export const CountryProvider: FunctionComponent<
  PropsWithChildren<CountryProviderProps>
> = ({ data, children }) => {
  const [countryData, setCountryData] = useState(data);
  const [calculator, setCalculator] = useState({
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

  // TODO: dopisać prawdziwe typy
  const setCalculatorValue = useCallback((key: string, value: any) => {
    setCalculator((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }, []);

  // TODO: dopisać prawdziwe typy
  const setCountryValue = useCallback((key: string, value: any) => {
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

  const showDataLoader = (): void => {
    setCalculatorValue("isDataFetching", true);
  };

  const hideDataLoader = (): void => {
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
    // TODO: WYwalić expect-error
    // @ts-expect-error
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
          // TODO: Dodać toastify
          // toast.error(
          //   "Wystąpił błąd przy pobieraniu danych waluty. Sprawdź czy masz połączenie z internetem lub czy podane daty są prawidłowe.",
          //   {
          //     position: "top-center",
          //     toastId: "currency-data-error-toast",
          //   },
          // );
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
