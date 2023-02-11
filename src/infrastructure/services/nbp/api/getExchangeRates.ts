export const getExchangeRates = async (
  currencyValueDate = "",
  currency = "EUR",
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<Response | void> => {
  const currencyFormatted = currency.toLowerCase();
  const API_URL = `http://api.nbp.pl/api/exchangerates/rates/a/${currencyFormatted}/${currencyValueDate}/?format=json`;

  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (e) {
    return console.error(e);
  }
};
