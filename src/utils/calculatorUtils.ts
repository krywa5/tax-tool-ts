import { daysBetweenDates } from "utils/dateUtils";

interface calculateIncomePLNProps {
  income: number;
  additionalIncome: number | null;
  workDays: number;
  dailyDiet: number;
  currencyValue: number;
  workMonths: number;
  monthlyIncomeCost: number;
}

export const calculateIncomePLN = ({
  income,
  additionalIncome,
  workMonths,
  workDays,
  dailyDiet,
  currencyValue,
  monthlyIncomeCost,
}: calculateIncomePLNProps): number => {
  const additionalIncomeForCalculations = additionalIncome ?? 0;

  const incomePLN =
    (income + additionalIncomeForCalculations - workDays * dailyDiet) *
      currencyValue -
    workMonths * monthlyIncomeCost;

  return Math.max(Number(incomePLN.toFixed(2)), 0);
};

interface CalculateDailyDietProps {
  diet: number;
  dietFactor: number;
}

export const calculateDailyDiet = ({
  diet,
  dietFactor,
}: CalculateDailyDietProps): number => diet * dietFactor;

interface calculateTaxPLNProps {
  paidTax: number;
  currencyValue: number;
}

export const calculateTaxPLN = ({
  paidTax,
  currencyValue,
}: calculateTaxPLNProps): number =>
  Math.max(Number((paidTax * currencyValue).toFixed(2)));

interface CalculateWorkDaysProps {
  startDate: Date;
  endDate: Date;
  daysInPoland?: number;
}

export const calculateWorkDays = ({
  startDate,
  endDate,
  daysInPoland,
}: CalculateWorkDaysProps): number =>
  daysBetweenDates(startDate, endDate, daysInPoland);
