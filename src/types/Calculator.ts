// TODO: zmienić nazwę na coś w tylu TaxCalculator
export interface Calculator {
  income: number | undefined; // przychód brutto
  paidTax: number | undefined; // zapłacony podatek zagranicą
  holidayIncome: number | undefined; // przychód wakacyjny (tylko w Niemczech)
  startDate: Date | undefined; // data rozpoczęcia pracy
  endDate: Date | undefined; // data zakończenia pracy
  paymentDate: Date | undefined; // data wypłaty
  currencyValue: number; // średni kurs waluty z NBP
  currencyValueDate: Date | undefined; // data średniego kursu waluty z NBP
  currencyTable: string | undefined; // tabela waluty
  dailyDiet: number; // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
  workDays: number; // ilość dni zagranicą
  workMonths: number; // ilość miesięcy zagranicą
  daysInPoland: number; // ilość spędzonych w Polsce podczas pracy zagranicą
  taxPLN: number; // podatek PLN
  incomePLN: number; // przychód PLN
  isCurrencyDataFetching: boolean; // flaga gdy pobieranie danych o walucie
}
