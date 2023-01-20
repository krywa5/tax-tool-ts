// TODO: Zmienić nazwę funkcji. To służy do konwertowania wartości przychodu ze stanu aplikacji do summary
export const numToStr = (number = 0, decimalPlace = 2): string => {
  // if (number === "" || number === "0") return "0,00"; // hotfix for displaying holiday income in table
  // let finalNumber = number;

  // if (typeof number === "string") {
  //   finalNumber = strToNum(number);
  // }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  });
};
