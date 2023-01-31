import { Income } from "types/Income";

export interface Calculator {
  income: number; // przychód brutto
  paidTax: number; // zapłacony podatek zagranicą
  holidayIncome: number; // przychód wakacyjny (tylko w Niemczech)
  startDate: string; // data rozpoczęcia pracy
  endDate: string; // data zakończenia pracy
  paymentDate: string; // data wypłaty
  incomes: Income[];
  currencyValue: number; // średni kurs waluty z NBP
  currencyValueDate: string; // data średniego kursu waluty z NBP
  currencyTable: string; // tabela waluty
  dailyDiet: number; // dzienna dieta wyznaczona na podstawie tabeli diet zagranicznych
  workDays: number; // ilość dni zagranicą
  workMonths: number; // ilość miesięcy zagranicą
  daysInPoland: number; // ilość spędzonych w Polsce podczas pracy zagranicą
  taxValue: number; // podatek PLN
  allIncomeValue: number; // przychód PLN
  isDataFetching: boolean; // flaga gdy pobieranie danych o walucie
}
