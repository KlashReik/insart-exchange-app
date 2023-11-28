import { CurrencyExchange } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";

import { Currency, CurrencyNames, MathOperators } from "../../types/types";
import {
  calculateDifferentCurrenciesRate,
  calculateUAHRate,
  findExchangingCurrencyItem,
} from "../../utils/utils";
import CurrencyExchangeForm from "../ExchangeForm/ExchangeForm";
import useCurrencyStore from "../../store/store";

interface ExchangeContainerProps {}

export const ExchangeContainer: React.FC<ExchangeContainerProps> = () => {
  const isTablet = useMediaQuery("(max-width:780px)");

  const currencyArray = useCurrencyStore((state) => state.currencyArray);

  const currencyToExchange = useCurrencyStore(
    (state) => state.currencyToExchange
  );
  const setCurrencyToExchange = useCurrencyStore(
    (state) => state.setCurrencyToExchange
  );
  const currencyToGet = useCurrencyStore((state) => state.currencyToGet);
  const setCurrencyToGet = useCurrencyStore((state) => state.setCurrencyToGet);

  const valueToExchange = useCurrencyStore((state) => state.valueToExchange);
  const setValueToExchange = useCurrencyStore(
    (state) => state.setValueToExchange
  );
  const valueToGet = useCurrencyStore((state) => state.valueToGet);
  const setValueToGet = useCurrencyStore((state) => state.setValueToGet);

  useEffect(() => {
    handleGetInput(valueToExchange);
  }, [currencyToExchange]);

  useEffect(() => {
    handleExchangeInput(valueToGet);
  }, [currencyToGet]);

  const handleGetInput = (value: string) => {
    setValueToExchange(value);

    let exchangingCurrencyItem: Currency | Currency[] | undefined =
      findExchangingCurrencyItem(
        currencyToExchange,
        currencyToGet,
        currencyArray
      );

    if (exchangingCurrencyItem) {
      handleSetExchangeValue(exchangingCurrencyItem, value);
    }
  };

  const handleSetExchangeValue = (
    exchangingCurrencyItem: Currency | Currency[] | undefined,
    value: string
  ) => {
    if (Array.isArray(exchangingCurrencyItem)) {
      setValueToGet(
        calculateDifferentCurrenciesRate(
          exchangingCurrencyItem[1].buy,
          exchangingCurrencyItem[0].buy,
          value
        )
      );
      return;
    }

    if (!exchangingCurrencyItem) {
      return;
    }

    if (currencyToExchange === "UAH") {
      setValueToGet(
        calculateUAHRate(
          value,
          exchangingCurrencyItem.buy,
          MathOperators.DIVIDE
        )
      );
    } else {
      setValueToGet(
        calculateUAHRate(
          value,
          exchangingCurrencyItem.buy,
          MathOperators.MULTIPLY
        )
      );
    }
  };

  const handleExchangeInput = (value: string) => {
    setValueToGet(value);

    let exchangingCurrencyItem: Currency | Currency[] | undefined =
      findExchangingCurrencyItem(
        currencyToExchange,
        currencyToGet,
        currencyArray
      );

    if (exchangingCurrencyItem) {
      handleSetGetValue(exchangingCurrencyItem, value);
    }
  };

  const handleSetGetValue = (
    exchangingCurrencyItem: Currency | Currency[] | undefined,
    value: string
  ) => {
    if (Array.isArray(exchangingCurrencyItem)) {
      setValueToExchange(
        calculateDifferentCurrenciesRate(
          exchangingCurrencyItem[0].buy,
          exchangingCurrencyItem[1].buy,
          value
        )
      );
      return;
    }

    if (!exchangingCurrencyItem) {
      return;
    }

    if (currencyToExchange === "UAH") {
      setValueToExchange(
        calculateUAHRate(
          value,
          exchangingCurrencyItem.buy,
          MathOperators.MULTIPLY
        )
      );
    } else {
      setValueToExchange(
        calculateUAHRate(
          value,
          exchangingCurrencyItem.buy,
          MathOperators.DIVIDE
        )
      );
    }
  };

  const handleGetSelect = (value: CurrencyNames) => {
    if (currencyToGet !== value) {
      setCurrencyToExchange(value);
    } else {
      handleSwapValues();
    }
  };

  const handleExchangeSelect = (value: CurrencyNames) => {
    if (currencyToExchange !== value) {
      setCurrencyToGet(value);
    } else {
      handleSwapValues();
    }
  };

  const handleSwapValues = () => {
    setValueToGet(valueToExchange);
    setValueToExchange(valueToGet);
    setCurrencyToExchange(currencyToGet);
    setCurrencyToGet(currencyToExchange);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="16px"
      alignItems="center"
      marginTop="10px"
      width="500px"
      order={isTablet ? -1 : 1}
    >
      <CurrencyExchangeForm
        value={valueToExchange}
        currency={currencyToExchange}
        onInputChange={handleGetInput}
        onSelectChange={handleGetSelect}
      />
      <IconButton onClick={handleSwapValues}>
        <CurrencyExchange>Swap Values</CurrencyExchange>
      </IconButton>
      <CurrencyExchangeForm
        value={valueToGet}
        currency={currencyToGet}
        onInputChange={handleExchangeInput}
        onSelectChange={handleExchangeSelect}
      />
    </Box>
  );
};
