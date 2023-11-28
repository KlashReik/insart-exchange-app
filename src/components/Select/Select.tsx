import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React from "react";
import useCurrencyStore from "../../store/store";
import { Currency, CurrencyNames } from "../../types/types";

interface CurrencySelectProps {
  currency: string;
  onSelectChange: (value: CurrencyNames) => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currency,
  onSelectChange,
}) => {
  const currencyArray = useCurrencyStore((state) => state.currencyArray);

  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Currency
      </InputLabel>
      <NativeSelect
        value={currency}
        onChange={(e) => onSelectChange(e.target.value as CurrencyNames)}
      >
        <option value="UAH">UAH</option>
        {currencyArray.map((item: Currency) => (
          <option value={item.ccy} key={item.ccy}>
            {item.ccy}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
