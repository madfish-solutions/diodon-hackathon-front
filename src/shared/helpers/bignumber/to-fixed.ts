import BigNumber from 'bignumber.js';

import { Optional } from '../../types';
import { isExist } from '../type-checks';

export const toFixed = (value: Optional<BigNumber>): string =>
  isExist(value) && !value.isNaN() ? value.toFixed() : '';
