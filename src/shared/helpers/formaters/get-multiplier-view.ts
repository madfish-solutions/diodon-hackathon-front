import { BigNumber } from 'bignumber.js';

import { formatValueBalance } from './format-balance';

export const getMultiplierView = (amount: BigNumber.Value) => `${formatValueBalance(amount)} x`;
