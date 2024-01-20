import {
  daysOffInPoland,
  irregularDaysOffInPoland,
} from "assets/data/countries/daysOffInPoland";

// I couldn't make use of toISOString() because when timezone changes it returns wrong date (check getLastWorkingDay("2022-10-31"))
const customToISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

const isDayOffInPoland = (date: Date): boolean => {
  const dayIndex = date.getDay();
  const dateISOString = date.toISOString();
  const saturdayIndex = 6;
  const sundayIndex = 0;

  const isWeekend = dayIndex === saturdayIndex || dayIndex === sundayIndex;
  const isDayOff =
    daysOffInPoland.includes(dateISOString.slice(5, 10)) || // check if regular day off
    irregularDaysOffInPoland.includes(dateISOString.slice(0, 10));

  return isWeekend || isDayOff;
};

const getOneDayBefore = (date: Date): Date => {
  const yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - 1);
  return yesterday;
};

export const getLastWorkingDay = (date: Date): string => {
  const dateMinusDay = getOneDayBefore(date);

  if (isDayOffInPoland(dateMinusDay)) {
    return getLastWorkingDay(dateMinusDay);
  }

  return customToISOString(dateMinusDay);
};

export const daysBetweenDates = (
  startDate: Date,
  endDate: Date,
  daysToSubtract = 0,
): number => {
  return Math.abs(
    // @ts-expect-error
    Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) -
      daysToSubtract +
      1,
  ); // +1 because we include end date
};

export const daysToMonths = (days: number): number => {
  return Math.max(Math.round(days / 30), 1); // 1 month is the minimum value
};

export const isValidDate = (date: Date): boolean => !isNaN(date.getTime());
