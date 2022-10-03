import BigNumber from 'bignumber.js';

export const valueChangeToPercentage = (currentValue: BigNumber.Value, change: BigNumber.Value) => {
  const initialValue = new BigNumber(currentValue).minus(change);

  return new BigNumber(change).div(initialValue).times(100);
};
