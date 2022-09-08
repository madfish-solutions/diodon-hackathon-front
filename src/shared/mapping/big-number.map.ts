import { BigNumber } from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';

import { Undefined } from '@shared/types';

import { checker } from '../model-builder';

export const bigNumberMapper = (arg: unknown, optional: Undefined<boolean>, nullable: Undefined<boolean>) => {
  if (checker(arg, optional, nullable)) {
    return arg;
  }

  if (arg instanceof EthersBigNumber) {
    return new BigNumber(arg.toString());
  }

  return new BigNumber(arg as BigNumber.Value);
};
