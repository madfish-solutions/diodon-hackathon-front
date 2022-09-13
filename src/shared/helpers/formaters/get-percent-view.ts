import { BigNumber } from 'bignumber.js';

import { formatValueBalance } from './format-balance';

export const getPercentView = (amount: BigNumber.Value) => `${formatValueBalance(amount, 2)}%`;
