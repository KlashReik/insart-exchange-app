import {
  calculateDifferentCurrenciesRate,
  calculateUAHRate,
  findExchangingCurrencyItem,
  findExchangingCurrencyPair,
} from "../utils/utils";

const testArray = [
  { ccy: "CHF", base_ccy: "UAH", buy: "40.72170", sale: "40.72170" },
  { ccy: "CZK", base_ccy: "UAH", buy: "1.61170", sale: "1.61170" },
  { ccy: "GBP", base_ccy: "UAH", buy: "45.16910", sale: "45.16910" },
  { ccy: "ILS", base_ccy: "UAH", buy: "9.63850", sale: "9.63850" },
  { ccy: "JPY", base_ccy: "UAH", buy: "0.24098", sale: "0.24098" },
  { ccy: "NOK", base_ccy: "UAH", buy: "3.35600", sale: "3.35600" },
  { ccy: "PLZ", base_ccy: "UAH", buy: "8.99570", sale: "8.99570" },
  { ccy: "SEK", base_ccy: "UAH", buy: "3.43490", sale: "3.43490" },
];

describe("test calculateDifferentCurrenciesRate", () => {
  test("function should count correctly", () => {
    expect(calculateDifferentCurrenciesRate("100", "10", "10")).toBe("1.00");
  });

  test("function should round correctly", () => {
    expect(calculateDifferentCurrenciesRate("100", "15.5", "10.1")).toBe(
      "1.57"
    );
  });
});

describe("test calculateUAHRate", () => {
  test("function should correctly divide", () => {
    expect(calculateUAHRate("10", "100", "DIVIDE")).toBe("0.10");
  });

  test("function should correctly multiply", () => {
    expect(calculateUAHRate("10", "100", "MUL")).toBe("1000.00");
  });
});

describe("test getExchangingCurrencyItem", () => {
  test("function should correctly find item in an array when first value is UAH", () => {
    expect(findExchangingCurrencyItem("UAH", "CHF", testArray)).toBe(
      testArray[0]
    );
  });

  test("function should correctly find item in an array when second value is UAH", () => {
    expect(findExchangingCurrencyItem("ILS", "UAH", testArray)).toBe(
      testArray[3]
    );
  });

  test("function should correctly two find item in an array when there is no UAH value", () => {
    expect(findExchangingCurrencyItem("NOK", "PLZ", testArray)).toStrictEqual([
      testArray[5],
      testArray[6],
    ]);
  });
});

describe("test getExchangingCurrencyPair", () => {
  test("function should correctly find two items in an array", () => {
    expect(findExchangingCurrencyPair("ILS", "CHF", testArray)).toStrictEqual([
      testArray[3],
      testArray[0],
    ]);
  });
});
