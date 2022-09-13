import { BigNumber } from 'bignumber.js';

import { Optional } from '@shared/types';

const DECIMALS_BASE = 10;
const FALLBACK_DECIMALS = 0;

export const toAtomic = (real: BigNumber, decimals: Optional<number>): BigNumber =>
  real.times(new BigNumber(DECIMALS_BASE).pow(decimals ?? FALLBACK_DECIMALS));
