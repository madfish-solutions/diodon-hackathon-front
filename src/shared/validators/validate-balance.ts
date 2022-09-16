import BigNumber from 'bignumber.js';

export const validateBalance = (balance: BigNumber) => (value: string) =>
  !value || balance.gte(new BigNumber(value)) ? undefined : `Insufficient funds`;
