export const stringNumberToNumber = (
  string: string,
  fractionDigits = 2,
): number => {
  return Number(Number(string.replace(",", ".")).toFixed(fractionDigits));
};

export const createUUID = (): string => crypto.randomUUID();
