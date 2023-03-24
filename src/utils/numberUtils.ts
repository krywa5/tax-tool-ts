export const numberToLocaleString = (number = 0, decimalPlace = 2): string =>
  number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  });
