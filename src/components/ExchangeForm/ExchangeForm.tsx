import React from "react";
import { EditableInput } from "../Input/Input";
import { CurrencySelect } from "../Select/Select";
import { CurrencyNames } from "../../types/types";

interface CurrencyExchangeFormProps {
  value: string;
  currency: string;
  onInputChange: (value: string) => void;
  onSelectChange: (value: CurrencyNames) => void;
}

const CurrencyExchangeForm: React.FC<CurrencyExchangeFormProps> = ({
  value,
  currency,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <div>
      <EditableInput value={value} onInputChange={onInputChange} />
      <CurrencySelect currency={currency} onSelectChange={onSelectChange} />
    </div>
  );
};

export default CurrencyExchangeForm;
