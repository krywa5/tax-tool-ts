const daysOffInPoland = [
  "01-01",
  "01-06", // Trzech Króli
  "05-01",
  "05-03",
  "08-15", // Święto Wojska Polskiego
  "11-01",
  "11-11",
  "12-25",
  "12-26",
];

const irregularDaysOffInPoland = [
  // 2020
  "2020-04-12", // Wielkanoc
  "2020-04-13",
  "2020-05-31", // Zielone Świątki
  "2020-06-11", // Boże Ciało
  // 2021
  "2021-04-04", // Wielkanoc
  "2021-04-05",
  "2021-05-23", // Zielone Świątki
  "2021-06-03", // Boże Ciało
  // 2022
  "2022-04-17", // Wielkanoc
  "2022-04-18",
  "2022-06-05", // Zielone Świątki
  "2022-06-16", // Boże Ciało
];

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

// TODO: Spróbować zmienić typ ze stringa na Date
export const toPolishDateFormat = (date: string): string => {
  // oldData is expected to be in yyyy-mm-dd
  return date.split("-").reverse().join(".");
};

// TODO: zmienić typy date, zmienić nazwę na calculateDateDifferenceInDays, usunąć ts-expect-error
export const dateDiff = (
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

// TODO: zmienić nazwę na convertDaysToMonths
export const daysToMonths = (days: number): number => {
  return Math.max(Math.round(days / 30), 1); // 1 month is the minimum value
};

export const isValidDate = (date: Date): boolean => !isNaN(date.getTime());
