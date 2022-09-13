import { BigNumber } from 'bignumber.js';

import { Optional } from '@shared/types';

const BASE = 10;
const FALLBACK_DECIMALS = 0;

export const toReal = (atomic: BigNumber, decimals: Optional<number>) =>
  atomic.div(new BigNumber(BASE).pow(decimals ?? FALLBACK_DECIMALS));
