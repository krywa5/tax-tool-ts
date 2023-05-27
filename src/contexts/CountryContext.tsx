import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Calculator } from "types/Calculator";
import { calculateTaxPLN, calculateWorkDays } from "utils/calculatorUtils";
import { daysToMonths, isValidDate } from "utils/dateUtils";

export const CountryContext = createContext<CountryContextType>({
  income: null, // przychód brutto
  paidTax: null, // zapłacony podatek zagranicą
  holidayIncome: null, // przychód wakacyjny (tylko w Niemczech)
  startDate: null, // data rozpoczęcia pracy
  endDate: null, // data zakończenia pracy
  paymentDate: null, // data wypłaty
  currencyValue: 0, // średni kurs waluty z NBP
  currencyValueDate: null, // data średniego kursu waluty z NBP
  currencyTable: "", // tabela waluty
  dailyDiet: 0, // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
  workDays: 0, // ilość dni za granicą
  workMonths: 0, // ilość miesięcy zagranicą
  daysInPoland: 0, // ilość spędzonych w Polsce podczas pracy zagranicą
  taxPLN: 0, // podatek PLN
  incomePLN: 0, // przychód PLN
  isCurrencyDataFetching: false, // flaga gdy pobieranie danych o walucie
  setIsCurrencyDataFetching: () => {},
  setIncomePLN: () => {},
  setTaxPLN: () => {},
  setDaysInPoland: () => {},
  setWorkMonths: () => {},
  setWorkDays: () => {},
  setDailyDiet: () => {},
  setCurrencyTable: () => {},
  setCurrencyValueDate: () => {},
  setCurrencyValue: () => {},
  setPaymentDate: () => {},
  setEndDate: () => {},
  setStartDate: () => {},
  setHolidayIncome: () => {},
  setPaidTax: () => {},
  setIncome: () => {},
  resetManualInputs: () => {},
  resetCurrencyData: () => {},
});

interface CalculatorHandlers {
  setIncome: (incomeValue: number) => void;
  setPaidTax: (paidTaxValue: number) => void;
  setHolidayIncome: (paidTaxValue: number) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
  setPaymentDate: (paymentDate: Date) => void;
  setCurrencyValue: (currencyValue: number) => void;
  setCurrencyValueDate: (currencyValueDate: Date) => void;
  setCurrencyTable: (currencyTable: string) => void;
  setDailyDiet: (dailyDiet: number) => void;
  setWorkDays: (workDays: number) => void;
  setWorkMonths: (workMoths: number) => void;
  setDaysInPoland: (daysInPoland: number) => void;
  setTaxPLN: (taxPLN: number) => void;
  setIncomePLN: (incomePLN: number) => void;
}

interface CountryContextType extends Calculator, CalculatorHandlers {
  setIsCurrencyDataFetching: (isFetching: boolean) => void;
  resetManualInputs: () => void;
  resetCurrencyData: () => void;
}
// eslint-disable-next-line max-statements,max-lines-per-function
export const CountryProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [income, setIncome] = useState<number | null>(null);
  const [paidTax, setPaidTax] = useState<number | null>(null);
  const [holidayIncome, setHolidayIncome] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);
  const [currencyValue, setCurrencyValue] = useState(0);
  const [currencyValueDate, setCurrencyValueDate] = useState<Date | null>(null);
  const [currencyTable, setCurrencyTable] = useState<string | null>(null);
  const [dailyDiet, setDailyDiet] = useState(0);
  const [workDays, setWorkDays] = useState(0);
  const [workMonths, setWorkMonths] = useState(0);
  const [daysInPoland, setDaysInPoland] = useState(0);
  const [taxPLN, setTaxPLN] = useState(0);
  const [incomePLN, setIncomePLN] = useState(0);
  const [isCurrencyDataFetching, setIsCurrencyDataFetching] = useState(false);

  const setIncomeHandler = useCallback(
    (income: number) => setIncome(income),
    [],
  );
  const setPaidTaxHandler = useCallback(
    (paidTax: number) => setPaidTax(paidTax),
    [],
  );
  const setHolidayIncomeHandler = useCallback(
    (holidayIncome: number) => setHolidayIncome(holidayIncome),
    [],
  );
  const setStartDateHandler = useCallback((startDate: Date) => {
    if (isValidDate(startDate)) {
      setStartDate(startDate);
    }
  }, []);
  const setEndDateHandler = useCallback((endDate: Date) => {
    if (isValidDate(endDate)) {
      setEndDate(endDate);
    }
  }, []);
  const setPaymentDateHandler = useCallback((paymentDate: Date) => {
    if (isValidDate(paymentDate)) {
      setPaymentDate(paymentDate);
    }
  }, []);
  const setCurrencyValueHandler = useCallback(
    (currencyValue: number) => setCurrencyValue(currencyValue),
    [],
  );
  const setCurrencyValueDateHandler = useCallback((currencyValueDate: Date) => {
    if (isValidDate(currencyValueDate)) {
      setCurrencyValueDate(currencyValueDate);
    }
  }, []);
  const setCurrencyTableHandler = useCallback(
    (currencyTable: string) => setCurrencyTable(currencyTable),
    [],
  );
  const setDailyDietHandler = useCallback(
    (dailyDiet: number) => setDailyDiet(dailyDiet),
    [],
  );
  const setWorkDaysHandler = useCallback(
    (workDays: number) => setWorkDays(workDays),
    [],
  );
  const setWorkMonthsHandler = useCallback(
    (workMonths: number) => setWorkMonths(workMonths),
    [],
  );
  const setDaysInPolandHandler = useCallback(
    (daysInPoland: number) => setDaysInPoland(daysInPoland),
    [],
  );
  const setTaxPLNHandler = useCallback(
    (taxPLN: number) => setTaxPLN(taxPLN),
    [],
  );
  const setIncomePLNHandler = useCallback(
    (incomePLN: number) => setIncomePLN(incomePLN),
    [],
  );
  const setIsCurrencyDataFetchingHandler = useCallback(
    (isDataFetching: boolean) => setIsCurrencyDataFetching(isDataFetching),
    [],
  );
  const resetManualInputs = useCallback(() => {
    setIncome(null);
    setPaidTax(null);
    setHolidayIncome(null);
    setDaysInPoland(0);
  }, []);
  const resetCurrencyData = useCallback(() => {
    setCurrencyValue(0);
    setCurrencyValueDate(null);
    setCurrencyTable(null);
  }, []);

  // Calculate/recalculate calculator values dependent on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      setWorkDays(
        calculateWorkDays({
          startDate,
          endDate,
          daysInPoland,
        }),
      );
      setWorkMonths(daysToMonths(workDays));
    }
  }, [
    startDate,
    endDate,
    paymentDate,
    daysInPoland,
    workDays,
    setWorkDays,
    setWorkMonths,
  ]);

  // Calculate tax value [PLN]
  useEffect(() => {
    if (!paidTax || !currencyValue) return;

    setTaxPLN(calculateTaxPLN({ paidTax, currencyValue }));
  }, [currencyValue, paidTax, setTaxPLN]);

  return (
    <CountryContext.Provider
      value={{
        income,
        setIncome: setIncomeHandler,
        paidTax,
        setPaidTax: setPaidTaxHandler,
        holidayIncome,
        setHolidayIncome: setHolidayIncomeHandler,
        startDate,
        setStartDate: setStartDateHandler,
        endDate,
        setEndDate: setEndDateHandler,
        paymentDate,
        setPaymentDate: setPaymentDateHandler,
        currencyValue,
        setCurrencyValue: setCurrencyValueHandler,
        currencyValueDate,
        setCurrencyValueDate: setCurrencyValueDateHandler,
        currencyTable,
        setCurrencyTable: setCurrencyTableHandler,
        dailyDiet,
        setDailyDiet: setDailyDietHandler,
        workDays,
        setWorkDays: setWorkDaysHandler,
        workMonths,
        setWorkMonths: setWorkMonthsHandler,
        daysInPoland,
        setDaysInPoland: setDaysInPolandHandler,
        taxPLN,
        setTaxPLN: setTaxPLNHandler,
        incomePLN,
        setIncomePLN: setIncomePLNHandler,
        isCurrencyDataFetching,
        setIsCurrencyDataFetching: setIsCurrencyDataFetchingHandler,
        resetManualInputs,
        resetCurrencyData,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
