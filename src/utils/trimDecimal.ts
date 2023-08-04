export const trimEth = (amountEth: string): string =>
  Number(amountEth).toFixed(4); // Limit to 4 decimal places

export const trimCurrency = (amountCurrency: string): string =>
  Number(amountCurrency).toFixed(2); // Limit to 4 decimal places
