import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
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
import { CountryContext } from "contexts/CountryContext";

export const Country: FunctionComponent = () => {
  const firstInput = useRef<HTMLInputElement | null>(null);

  const { setSelectedCountry, selectedYear, setSelectedYear, availableYears } =
    useContext(AppContext);
  const { calculator, setCalculatorValue, addNewIncome, countryData } =
    useContext(CountryContext);
  const {
    currencyTable,
    currencyValue,
    currencyValueDate,
    daysInPoland,
    endDate,
    holidayIncome,
    income,
    incomes,
    paidTax,
    paymentDate,
    startDate,
    taxValue,
    allIncomeValue,
  } = calculator;

  const isIncomesListShown = !!incomes.length;

  // set selected country
  useEffect(() => {
    const { id } = countryData;
    setSelectedCountry(id); // UserContext
  }, [countryData, setSelectedCountry]);

  useEffect(() => {
    if (!endDate) return;

    const endDateYear = new Date(endDate).getFullYear();

    if (endDateYear !== selectedYear) {
      toast.error(
        ({ closeToast }) => {
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

  const addToIncomeList = (): void => {
    if (!allIncomeValue) {
      return;
    }

    const newIncome = {
      currencyTable,
      currencyValue,
      currencyValueDate,
      daysInPoland,
      endDate,
      holidayIncome,
      id: Date.now().toString(),
      incomeAbroad: income,
      incomePLN: allIncomeValue,
      paidTax,
      paymentDate: paymentDate || endDate,
      startDate,
      taxPLN: taxValue,
    };

    addNewIncome(newIncome);
    clearInputs();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const clearInputs = () => {
    setCalculatorValue("income", "");
    setCalculatorValue("paidTax", "");
    setCalculatorValue("holidayIncome", "");
    setCalculatorValue("daysInPoland", "");

    if (firstInput.current) {
      firstInput.current.focus();
    }
    window.scroll({ top: 300, left: 0, behavior: "smooth" });
  };

  const isFormReadyToRender = !!availableYears.length;

  if (!isFormReadyToRender) return null;

  return (
    <Wrapper disableGutters maxWidth={false}>
      <TipsPanel />
      <StyledManualFields firstInput={firstInput} data-print={false} />
      <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
      <StyledAutoFields data-print={false} />
      <SubmitButton
        onClick={addToIncomeList}
        disabled={!allIncomeValue}
        fullWidth={true}
        color="secondary"
        variant="contained"
        size="large"
        data-print={false}
      >
        Dodaj do listy
      </SubmitButton>
      {isIncomesListShown && (
        <>
          <IncomeListWrapper maxWidth={false}>
            <IncomeListTitle variant="h5" align="center">
              Lista przychodów
              <CountryName fontSize="large" variant="body1">
                &nbsp;- {countryData.label}
              </CountryName>
            </IncomeListTitle>
            <IncomesTable />
          </IncomeListWrapper>
          <PrintButton />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(MuiContainer)({
  width: "100%",
  paddingTop: "15px",

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
