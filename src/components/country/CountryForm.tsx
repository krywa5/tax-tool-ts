import React, { FunctionComponent, useContext, useEffect, useRef } from "react";

import { Button, Container as MuiContainer, styled } from "@mui/material";
import { AutoFields } from "components/auto-fields/AutoFields";
import { CurrencyDataFetcher } from "components/country/CurrencyDataFetcher";
import { DailyDietCalculator } from "components/country/DailyDietCalculator";
import { IncomeList } from "components/country/IncomeList";
import { IncomeValueCalculator } from "components/country/IncomeValueCalculator";
import { FieldGroupDivider } from "components/field-group-divider/FieldGroupDivider";
import { ManualFields } from "components/manual-fields/ManualFields";
import { TipsPanel } from "components/tips-panel/TipsPanel";
import { YearConflictAlertListener } from "components/YearConflictAlert";
import { CountryContext } from "contexts/CountryContext";
import { IncomesTableContext } from "contexts/IncomesTableContext";
import { CountryId } from "types/Country";
import { Income } from "types/Income";

interface CountryBaseProps {
  selectedCountry: CountryId;
}

export const CountryForm: FunctionComponent<CountryBaseProps> = ({
  selectedCountry,
}) => {
  const firstInput = useRef<HTMLInputElement | null>(null);
  const {
    income,
    paidTax,
    holidayIncome,
    startDate,
    endDate,
    paymentDate,
    currencyValue,
    currencyValueDate,
    currencyTable,
    daysInPoland,
    taxPLN,
    incomePLN,
    resetManualInputs,
  } = useContext(CountryContext);
  const { incomes, addNewIncome, resetIncomes } =
    useContext(IncomesTableContext);
  const isIncomesListVisible = !!incomes.length;
  const isReadyToAddToIncomeList =
    incomePLN &&
    income &&
    currencyTable &&
    currencyValueDate &&
    endDate &&
    startDate;

  const submitHandler = () => {
    if (!isReadyToAddToIncomeList) {
      return console.error("Income is not ready to be added to income list!");
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
      paidTax: paidTax ?? 0,
      paymentDate: paymentDate ?? endDate,
      startDate,
      taxPLN,
    };

    addNewIncome(newIncome);
    clearInputs();
  };

  const clearInputs = () => {
    resetManualInputs();

    if (firstInput.current) {
      firstInput.current.focus();
    }

    window.scroll({ top: 300, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    resetIncomes();
    resetManualInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  return (
    <CurrencyDataFetcher selectedCountry={selectedCountry}>
      <DailyDietCalculator selectedCountry={selectedCountry}>
        <IncomeValueCalculator selectedCountry={selectedCountry}>
          <YearConflictAlertListener endDate={endDate}>
            <Wrapper maxWidth={false}>
              <TipsPanel selectedCountry={selectedCountry} />
              <StyledManualFields
                selectedCountry={selectedCountry}
                firstInput={firstInput}
                data-print={false}
              />
              <FieldGroupDivider text="Wartości poniżej są obliczane automatycznie" />
              <StyledAutoFields
                selectedCountry={selectedCountry}
                data-print={false}
              />
              <SubmitButton
                onClick={submitHandler}
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
                <IncomeList selectedCountry={selectedCountry} />
              )}
            </Wrapper>
          </YearConflictAlertListener>
        </IncomeValueCalculator>
      </DailyDietCalculator>
    </CurrencyDataFetcher>
  );
};

const Wrapper = styled(MuiContainer)(({ theme }) => ({
  width: "100%",

  "&&": {
    padding: theme.spacing(2, 0),
  },

  "& .MuiFormControl-root": {
    minWidth: "260px",
  },
}));

const StyledManualFields = styled(ManualFields)({
  position: "relative",
});

const StyledAutoFields = styled(AutoFields)({
  position: "relative",
});

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "0",
  padding: theme.spacing(1, 3),
  letterSpacing: "1px",
  fontSize: "1.5rem",
  boxShadow: "unset",
  borderTop: "1px solid #000",
  borderBottom: "1px solid #000",

  "&:disabled": {
    cursor: "not-allowed",
    pointerEvents: "auto",
  },
}));
