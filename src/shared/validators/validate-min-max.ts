import BigNumber from 'bignumber.js';

export const validateMinMax = (min: number, max: number) => (value: string) =>
  !value || (new BigNumber(value).gt(new BigNumber(min)) && new BigNumber(value).lt(new BigNumber(max)))
    ? undefined
    : `Value has to be a number between ${min} and ${max}`;
