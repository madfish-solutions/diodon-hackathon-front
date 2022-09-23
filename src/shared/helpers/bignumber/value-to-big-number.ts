import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';

export const valueToBigNumber = (value: BigNumber.Value | EthersBigNumber) => {
  if (value instanceof EthersBigNumber) {
    return new BigNumber(value.toString());
  }

  return new BigNumber(value);
};
