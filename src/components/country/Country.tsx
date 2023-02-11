import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Container as MuiContainer,
  styled,
  Typography,
} from "@mui/material";
import { AutoFields } from "components/auto-fields/AutoFields";
import { DismissForm } from "components/dismiss-form/DismissForm";
import { FieldGroupDivider } from "components/field-group-divider/FieldGroupDivider";
import { IncomesTable } from "components/incomes-table/IncomesTable";
import { ManualFields } from "components/manual-fields/ManualFields";
import { PrintButton } from "components/print-button/PrintButton";
import { TipsPanel } from "components/tips-panel/TipsPanel";
import { AppContext } from "contexts/AppContext";
import { CountryContext, CountryProvider } from "contexts/CountryContext";
import {
  IncomesTableContext,
  IncomesTableProvider,
} from "contexts/IncomesTableContext";
import { useCountryData } from "hooks/useCountryData";
import { getExchangeRates } from "infrastructure/services/nbp/api/getExchangeRates";
import { CountryId } from "types/Country";
import { Income } from "types/Income";
import {
  calculateDailyDiet,
  calculateIncomePLN,
  calculateTaxPLN,
  calculateWorkDays,
} from "utils/calculatorUtils";
import { daysToMonths, getLastWorkingDay } from "utils/dateUtils";

interface CountryBaseProps {
  selectedCountry: CountryId;
}

// eslint-disable-next-line max-statements, max-lines-per-function
export const CountryForm: FunctionComponent<CountryBaseProps> = ({
  selectedCountry,
}) => {
  const firstInput = useRef<HTMLInputElement | null>(null);
  const { selectedYear, setSelectedYear, availableYears } =
    useContext(AppContext);
  const {
    income,
    setIncome,
    paidTax,
    setPaidTax,
    holidayIncome,
    setHolidayIncome,
    setStartDate,
    startDate,
    endDate,
    setEndDate,
    paymentDate,
    setPaymentDate,
    currencyValue,
    setCurrencyValue,
    currencyValueDate,
    setCurrencyValueDate,
    currencyTable,
    setCurrencyTable,
    dailyDiet,
    setDailyDiet,
    workDays,
    setWorkDays,
    workMonths,
    setWorkMonths,
    daysInPoland,
    setDaysInPoland,
    taxPLN,
    setTaxPLN,
    incomePLN,
    setIncomePLN,
    isCurrencyDataFetching,
    setIsCurrencyDataFetching,
    resetManualInputs,
    resetCurrencyData,
  } = useContext(CountryContext);
  const { incomes, addNewIncome, resetIncomes } =
    useContext(IncomesTableContext);
  const { countryData } = useCountryData(selectedCountry);
  const {
    monthlyIncomeCost,
    currency: countryCurrency,
    label: countryLabel,
    diet: countryDiet,
    dietFactor: countryDietFactor,
  } = countryData;
  const isIncomesListVisible = !!incomes.length;
  const isReadyToAddToIncomeList =
    incomePLN &&
    income &&
    paidTax &&
    currencyTable &&
    currencyValueDate &&
    endDate &&
    startDate;

  const addToIncomeList = (): void => {
    if (!isReadyToAddToIncomeList) {
      console.error("Income is not ready to be added to income list!");
      return;
    }

    const newIncome: Income = {
      currencyTable,
      currencyValue,
      currencyValueDate,
      daysInPoland,
      endDate,
      holidayIncome: holidayIncome ?? 0,
      id: Date.now().toString(),
      incomeAbroad: income,
      incomePLN,
      paidTax,
      paymentDate: paymentDate ?? endDate,
      startDate,
      taxPLN,
    };

    addNewIncome(newIncome);
    clearInputs();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const clearInputs = () => {
    resetManualInputs();

    if (firstInput.current) {
      firstInput.current.focus();
    }

    window.scroll({ top: 300, left: 0, behavior: "smooth" });
  };

  // TODO: Powydzielać useEffecty do hooków?

  // Handle difference in selected year and end date TODO: handle payment date here too!
  useEffect(() => {
    if (!endDate) return;

    const endDateYear = endDate.getFullYear().toString();

    if (endDateYear !== selectedYear) {
      toast.error(
        ({ closeToast }) => {
          // TODO: Przenieść na zewnątrz tego komponentu
          return (
            <DismissForm
              text="Rok zakończenia pracy różni się od roku rozliczenia!"
              acceptBtnText="Zmień"
              rejectBtnText="Zostaw"
              rejectHandler={() => {
                closeToast?.();
              }}
              acceptHandler={() => {
                if (availableYears.includes(endDateYear)) {
                  setSelectedYear(endDateYear);
                } else {
                  toast.error(
                    "Brak wybranego roku w bazie danych! Obliczony dochód może być nieprawidłowy!",
                  );
                }
                closeToast?.();
              }}
            />
          );
        },
        {
          autoClose: false,
          toastId: "wrong-year-toast-id",
        },
      );
    }
  }, [selectedYear, endDate, setSelectedYear, availableYears]);

  // Get currency API values if end date or payment date has changed
  useEffect(() => {
    const calculationsEndDate = paymentDate ?? endDate;
    if (calculationsEndDate) {
      resetCurrencyData();
      setIsCurrencyDataFetching(true);

      getExchangeRates(getLastWorkingDay(calculationsEndDate), countryCurrency)
        .then((data) => {
          const {
            effectiveDate: currencyValueDate,
            mid: currencyValueApi,
            no: currencyTable,
            // TODO: Naprawić typy
            // @ts-expect-error
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

  // set dailyDiet
  useEffect(() => {
    setDailyDiet(
      calculateDailyDiet({ dietFactor: countryDietFactor, diet: countryDiet }),
    );
  }, [countryDiet, countryDietFactor, setDailyDiet]);

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

  // Calculate Income value [PLN]
  useEffect(() => {
    if (!income) {
      return;
    }

    const incomePLN = calculateIncomePLN({
      income,
      currencyValue,
      workMonths,
      dailyDiet,
      workDays,
      holidayIncome,
      monthlyIncomeCost,
    });

    setIncomePLN(incomePLN);
  }, [
    currencyValue,
    dailyDiet,
    holidayIncome,
    income,
    monthlyIncomeCost,
    setIncomePLN,
    workDays,
    workMonths,
  ]);

  useEffect(() => {
    resetIncomes();
  }, [resetIncomes, selectedCountry]);

  return (
    <Wrapper maxWidth={false}>
      <TipsPanel selectedCountry={selectedCountry} />
      <StyledManualFields
        selectedCountry={selectedCountry}
        firstInput={firstInput}
        data-print={false}
      />
      <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
      <StyledAutoFields selectedCountry={selectedCountry} data-print={false} />
      <SubmitButton
        onClick={addToIncomeList}
        disabled={!isReadyToAddToIncomeList}
        fullWidth={true}
        color="secondary"
        variant="contained"
        size="large"
        data-print={false}
      >
        Dodaj do listy
      </SubmitButton>
      {isIncomesListVisible && (
        <>
          <IncomeListWrapper maxWidth={false}>
            <IncomeListTitle variant="h5" align="center">
              Lista przychodów
              <CountryName fontSize="large" variant="body1">
                &nbsp;- {countryLabel}
              </CountryName>
            </IncomeListTitle>
            <IncomesTable selectedCountry={selectedCountry} />
          </IncomeListWrapper>
          <PrintButton />
        </>
      )}
    </Wrapper>
  );
};

export const Country: FunctionComponent = () => {
  const { countryId: selectedCountry } = useParams();

  if (!selectedCountry) {
    throw new Error("No selected country!");
  }

  return (
    <CountryProvider>
      <IncomesTableProvider>
        <CountryForm selectedCountry={selectedCountry} />
      </IncomesTableProvider>
    </CountryProvider>
  );
};
// Comment of sadness

const Wrapper = styled(MuiContainer)({
  width: "100%",

  "&&": {
    padding: "15px 0",
  },

  "& .MuiFormControl-root": {
    minWidth: "260px",
  },
});

const StyledManualFields = styled(ManualFields)({
  position: "relative",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const StyledAutoFields = styled(AutoFields)({
  position: "relative",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const SubmitButton = styled(Button)({
  borderRadius: "0",
  padding: "12px 22px",
  letterSpacing: "1px",
  fontSize: "1.5rem",
  boxShadow: "unset",
  borderTop: "1px solid #000",
  borderBottom: "1px solid #000",

  "&:disabled": {
    cursor: "not-allowed",
    pointerEvents: "auto",
  },
});

const IncomeListTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: "20px",
  "@media print": {
    marginBottom: "30px",
  },
});

const IncomeListWrapper = styled(MuiContainer)({
  padding: "50px 20px",
  "@media print": {
    padding: "0",
  },
});

const CountryName = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontFamily: theme.typography.h5.fontFamily,
  fontWeight: 700,
  lineHeight: theme.typography.h5.lineHeight,
  display: "none",

  "@media print": {
    display: "inline-block",
  },
}));
