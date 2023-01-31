// TODO: Zmienić nazwę. Funkcja służy do konwertowania stringa z inputa do osadzenia w stanie aplikacji
export const strToNum = (string: string): number => {
  return Number(Number(string.replace(",", ".")).toFixed(2));
};

export const createUUID = (): string => crypto.randomUUID();
