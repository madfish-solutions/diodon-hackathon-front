import BigNumber from 'bignumber.js';

import { Optional } from '@shared/types';

export interface TokenInputViewModelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokens?: any;
  readOnly?: boolean;
  disabled?: boolean;
  hiddenPercentSelector?: boolean;
  hiddenBalance?: boolean;
  onInputChange: (value: string) => void;
}

export interface TokenInputProps extends TokenInputViewModelProps {
  value: string;
  balance?: Optional<BigNumber.Value>;
  balanceText?: string;
  id?: string;
  className?: string;
  label: string;
  error?: string;
  decimals?: number;
  dollarEquivalent?: Optional<BigNumber.Value>;
  tokenInputDTI?: string;
  onSelectorClick?: () => void;
}
