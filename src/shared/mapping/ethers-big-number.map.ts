import { BigNumber, BigNumberish } from 'ethers';

import { Undefined } from '@shared/types';

import { checker } from '../model-builder';

export const ethersBigNumberMapper = (arg: unknown, optional: Undefined<boolean>, nullable: Undefined<boolean>) => {
  if (checker(arg, optional, nullable)) {
    return arg;
  }

  return BigNumber.from(arg as BigNumberish);
};
