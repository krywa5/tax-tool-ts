import { GuidString } from "types/AppTypes";

export interface Income {
  id: GuidString;
  startDate: Date;
  endDate: Date;
  currencyTable: string;
  currencyValue: number;
  currencyValueDate: Date;
  daysInPoland: number;
  holidayIncome: number;
  incomeAbroad: number;
  incomePLN: number;
  paidTax: number;
  paymentDate: Date;
  taxPLN: number;
}
