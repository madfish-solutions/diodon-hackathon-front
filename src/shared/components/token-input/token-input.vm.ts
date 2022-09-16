import { ChangeEvent, useRef, useState } from 'react';

import { TokenInputViewModelProps } from './types';

export const useTokenInputViewModel = ({
  tokens,
  hiddenBalance,
  readOnly,
  hiddenPercentSelector,
  onInputChange
}: TokenInputViewModelProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const isFormReady = !readOnly;

  return {
    isFocused,
    inputRef,

    isFormReady,

    focusInput,
    handleInputFocus,
    handleInputBlur,

    handleInputChange
  };
};
