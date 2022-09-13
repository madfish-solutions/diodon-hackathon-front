import { BigNumber } from 'bignumber.js';

import { formatValueBalance } from './format-balance';

export const getTokensView = (amount: BigNumber.Value) => `${formatValueBalance(amount)}`;
