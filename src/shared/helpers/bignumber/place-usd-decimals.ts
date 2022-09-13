import BigNumber from 'bignumber.js';

import { placeDecimals } from './place-decimals';

export const placeUSDDecimals = (
  amount: BigNumber.Value,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
) => placeDecimals(new BigNumber(amount), 2, roundingMode);
