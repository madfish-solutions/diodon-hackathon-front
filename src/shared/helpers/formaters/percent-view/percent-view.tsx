import { FC } from 'react';

import { BigNumber } from 'bignumber.js';
import cx from 'classnames';

import { formatValueBalance } from '../format-balance';
import styles from './percent-view.module.scss';

interface Props {
  amount: BigNumber.Value;
  pnl?: boolean;
  decimalPlaces?: number;
}

const DEFAULT_DECIMAL_PLACES = 2;

export const PercentView: FC<Props> = ({ amount, pnl, decimalPlaces = DEFAULT_DECIMAL_PLACES }) => {
  // only for view on front different styles
  const isProfit = amount > 0 ? true : false;

  return (
    <span className={cx({ [styles.root]: pnl, [styles.red]: !isProfit && pnl })}>{`${formatValueBalance(
      amount,
      decimalPlaces
    )}%`}</span>
  );
};
