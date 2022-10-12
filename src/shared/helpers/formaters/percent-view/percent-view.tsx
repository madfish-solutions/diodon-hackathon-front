import { FC, HTMLProps } from 'react';

import { BigNumber } from 'bignumber.js';
import cx from 'classnames';

import { formatValueBalance } from '../format-balance';
import styles from './percent-view.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  amount: BigNumber.Value;
  pnl?: boolean;
  decimalPlaces?: number;
}

const DEFAULT_DECIMAL_PLACES = 2;

export const PercentView: FC<Props> = ({ amount, pnl, decimalPlaces = DEFAULT_DECIMAL_PLACES, ...props }) => {
  // only for view on front different styles
  const isProfit = amount > 0 ? true : false;

  return (
    <span className={cx({ [styles.root]: pnl, [styles.red]: !isProfit && pnl })} {...props}>
      {formatValueBalance(amount, decimalPlaces)}
      <span className={styles.suffix}>%</span>
    </span>
  );
};
