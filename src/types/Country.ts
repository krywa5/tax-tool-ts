export type CountryId = string;

type AutoField =
  | "currencyValue"
  | "allowanceMonths"
  | "dailyDiet"
  | "workDays"
  | "allAllowanceValue"
  | "taxPLN"
  | "incomePLN"
  | "dayAllowanceValue";

type ManualField =
  | "income"
  | "additionalIncome"
  | "paymentDate"
  | "paidTax"
  | "startDate"
  | "endDate"
  | "daysInPoland";

export interface Country {
  currency: string;
  diet: number;
  dietFactor: number;
  id: CountryId;
  inputs: {
    auto: AutoField[];
    manual: ManualField[];
  };
  intl: Partial<Record<ManualField, string>>;
  label: string;
  monthlyIncomeCost: number;
  subLabels: Partial<Record<AutoField, string | string[]>>;
  tips?: string[];
}
