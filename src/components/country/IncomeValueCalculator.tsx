import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { CountryContext } from "contexts/CountryContext";
import { useCountryData } from "hooks/useCountryData";
import { CountryId } from "types/Country";
import { calculateIncomePLN } from "utils/calculatorUtils";

interface IncomeValueCalculatorProps {
  selectedCountry: CountryId;
}

export const IncomeValueCalculator: FunctionComponent<
  PropsWithChildren<IncomeValueCalculatorProps>
> = ({ selectedCountry, children }) => {
  const {
    income,
    additionalIncome,
    currencyValue,
    dailyDiet,
    workDays,
    workMonths,
    setIncomePLN,
  } = useContext(CountryContext);
  const { countryData } = useCountryData(selectedCountry);
  const { monthlyIncomeCost } = countryData;

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
      additionalIncome,
      monthlyIncomeCost,
    });

    setIncomePLN(incomePLN);
  }, [
    currencyValue,
    dailyDiet,
    additionalIncome,
    income,
    monthlyIncomeCost,
    setIncomePLN,
    workDays,
    workMonths,
  ]);

  return <>{children}</>;
};
