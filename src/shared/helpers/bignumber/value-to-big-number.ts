import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';

export const valueToBigNumber = (value: BigNumber.Value | EthersBigNumber | [EthersBigNumber]) => {
  if (value instanceof Array) {
    return new BigNumber(value[0].toString());
  }

  if (value instanceof EthersBigNumber) {
    return new BigNumber(value.toString());
  }

  return new BigNumber(value);
};
