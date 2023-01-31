import { GuidString } from "types/AppTypes";

export interface Income {
  id: GuidString;
  startDate: string;
  endDate: string;
  currencyTable: string;
  currencyValue: number;
  currencyValueDate: string;
  daysInPoland: number;
  holidayIncome: number;
  incomeAbroad: number;
  incomePLN: number;
  paidTax: number;
  paymentDate: string;
  taxPLN: number;
}
