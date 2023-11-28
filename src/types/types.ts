export interface Currency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export type CurrencyNames =
  | "UAH"
  | "CHF"
  | "CZK"
  | "GBP"
  | "ILS"
  | "JPY"
  | "NOK"
  | "PLZ"
  | "SEK";

export enum MathOperators {
  DIVIDE = "DIVIDE",
  MULTIPLY = "MULTIPLY",
}

export type MathOperatorTypes = keyof typeof MathOperators;
