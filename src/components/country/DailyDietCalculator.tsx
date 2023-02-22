import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { CountryContext } from "contexts/CountryContext";
import { useCountryData } from "hooks/useCountryData";
import { CountryId } from "types/Country";
import { calculateDailyDiet } from "utils/calculatorUtils";

interface DailyDietCalculatorProps {
  selectedCountry: CountryId;
}

export const DailyDietCalculator: FunctionComponent<
  PropsWithChildren<DailyDietCalculatorProps>
> = ({ selectedCountry, children }) => {
  const { setDailyDiet } = useContext(CountryContext);
  const { countryData } = useCountryData(selectedCountry);
  const { diet: countryDiet, dietFactor: countryDietFactor } = countryData;

  useEffect(() => {
    setDailyDiet(
      calculateDailyDiet({ dietFactor: countryDietFactor, diet: countryDiet }),
    );
  }, [countryDiet, countryDietFactor, setDailyDiet]);

  return <>{children}</>;
};
