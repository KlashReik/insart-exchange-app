import { create } from "zustand";
import { Currency, CurrencyNames } from "../types/types";

interface CurrencyStore {
  currencyArray: Array<Currency>;
  valueToExchange: string;
  valueToGet: string;
  currencyToExchange: CurrencyNames;
  currencyToGet: CurrencyNames;
  setValueToExchange: (value: string) => void;
  setValueToGet: (value: string) => void;
  setCurrencyToExchange: (currency: CurrencyNames) => void;
  setCurrencyToGet: (currency: CurrencyNames) => void;
  setCurrencyArray: (currencyArray: Array<Currency>) => void;
}

const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencyArray: [],
  valueToExchange: "100",
  valueToGet: "2.46",
  currencyToExchange: "UAH",
  currencyToGet: "CHF",
  setValueToExchange: (value) => set({ valueToExchange: value }),
  setValueToGet: (value) => set({ valueToGet: value }),
  setCurrencyToExchange: (currency) => set({ currencyToExchange: currency }),
  setCurrencyToGet: (currency) => set({ currencyToGet: currency }),
  setCurrencyArray: (currencyArray) => set({ currencyArray: currencyArray }),
}));

export default useCurrencyStore;
