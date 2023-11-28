import {
  Currency,
  CurrencyNames,
  MathOperatorTypes,
  MathOperators,
} from "../types/types";

export const validateInput = (value: string, previousValue: string) => {
  if (value.trim() === "") {
    return false;
  } else if (
    Number(value) >
    Number(previousValue) + Number(previousValue) * 0.1
  ) {
    return false;
  } else if (
    Number(value) <
    Number(previousValue) - Number(previousValue) * 0.1
  ) {
    return false;
  } else if (isNaN(Number(value))) {
    return false;
  }

  return true;
};

export const findExchangingCurrencyItem = (
  fromCurrency: CurrencyNames,
  toCurrency: CurrencyNames,
  currencyArray: Currency[]
) => {
  if (fromCurrency === "UAH" && toCurrency !== "UAH") {
    return currencyArray.find((item: Currency) => item.ccy === toCurrency);
  } else if (fromCurrency !== "UAH" && toCurrency === "UAH") {
    return currencyArray.find((item: Currency) => item.ccy === fromCurrency);
  } else if (fromCurrency !== "UAH" && toCurrency !== "UAH") {
    return findExchangingCurrencyPair(fromCurrency, toCurrency, currencyArray);
  } else {
    return undefined;
  }
};

export const findExchangingCurrencyPair = (
  fromCurrency: CurrencyNames,
  toCurrency: CurrencyNames,
  currencyArray: Currency[]
) => {
  const exchangingCurrencyItem1 = currencyArray.find(
    (item: Currency) => item.ccy === fromCurrency
  );
  const exchangingCurrencyItem2 = currencyArray.find(
    (item: Currency) => item.ccy === toCurrency
  );

  if (exchangingCurrencyItem1 && exchangingCurrencyItem2) {
    return [exchangingCurrencyItem1, exchangingCurrencyItem2];
  }
};

export const calculateDifferentCurrenciesRate = (
  toCurrency: string,
  fromCurrency: string,
  value: string
) => ((Number(value) * Number(fromCurrency)) / Number(toCurrency)).toFixed(2);

export const calculateUAHRate = (
  amount: string,
  exchangeRate: string,
  action: MathOperatorTypes
) => {
  if (action === MathOperators.DIVIDE) {
    return (Number(amount) / Number(exchangeRate)).toFixed(2);
  }
  return (Number(amount) * Number(exchangeRate)).toFixed(2);
};
