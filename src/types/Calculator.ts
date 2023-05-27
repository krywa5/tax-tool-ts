export interface Calculator {
  income: number | null; // przychód brutto
  paidTax: number | null; // zapłacony podatek zagranicą
  additionalIncome: number | null; // przychód dodatkowy
  startDate: Date | null; // data rozpoczęcia pracy
  endDate: Date | null; // data zakończenia pracy
  paymentDate: Date | null; // data wypłaty
  currencyValue: number; // średni kurs waluty z NBP
  currencyValueDate: Date | null; // data średniego kursu waluty z NBP
  currencyTable: string | null; // tabela waluty
  dailyDiet: number; // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
  workDays: number; // ilość dni za granicą
  workMonths: number; // ilość miesięcy zagranicą
  daysInPoland: number; // ilość spędzonych w Polsce podczas pracy zagranicą
  taxPLN: number; // podatek PLN
  incomePLN: number; // przychód PLN
  isCurrencyDataFetching: boolean; // flaga gdy pobieranie danych o walucie
}
