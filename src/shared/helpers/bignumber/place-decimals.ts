import BigNumber from 'bignumber.js';

export const placeDecimals = (
  amount: BigNumber,
  decimals: number,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
) => amount.decimalPlaces(decimals, roundingMode);
