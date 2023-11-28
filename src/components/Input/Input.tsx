import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { validateInput } from "../../utils/utils";

interface EditableInputProps {
  value: string;
  onInputChange: (value: string) => void;
}

export const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onInputChange,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const [originalValue, setOriginalValue] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    setInputValue(value);
    setOriginalValue(value);
  }, [value]);

  const handleToggleEditable = () => {
    if (!isEditable) {
      setOriginalValue(inputValue);
    }
    setIsEditable((prevState) => !prevState);
  };

  const handleCancelEdit = () => {
    setInputValue(originalValue);
    setIsEditable(false);
  };

  const handleAcceptEdit = () => {
    if (isInputValid) {
      setIsEditable(false);
      onInputChange(inputValue);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setIsInputValid(validateInput(newValue, value));

    setInputValue(newValue);
  };

  const isValueChanged = inputValue !== originalValue;

  return (
    <FormControl
      sx={{ width: "200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <InputLabel htmlFor="currency-amount" sx={{ paddingTop: "10px" }}>
        Amount
      </InputLabel>
      <Input
        inputRef={(input) => isEditable && input && input.focus()}
        disabled={!isEditable}
        id="currency-amount"
        value={inputValue}
        onChange={handleInputChange}
        endAdornment={
          <>
            {isEditable ? (
              <>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="cancel edit"
                    onClick={handleCancelEdit}
                  >
                    <CancelIcon />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="accept edit"
                    onClick={handleAcceptEdit}
                    disabled={!isInputValid || !isValueChanged}
                  >
                    <CheckIcon />
                  </IconButton>
                </InputAdornment>
              </>
            ) : (
              isHovered && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle editable"
                    onClick={handleToggleEditable}
                  >
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              )
            )}
          </>
        }
      />
    </FormControl>
  );
};
