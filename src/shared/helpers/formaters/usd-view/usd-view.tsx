import { FC } from 'react';

import { BigNumber } from 'bignumber.js';
import cx from 'classnames';

import { isExist } from '@shared/types';

import { formatValueBalance } from '../format-balance';
import styles from './usd-view.module.scss';

interface Props {
  amount: BigNumber.Value;
  percentEquivalent?: BigNumber.Value;
}

enum Sign {
  PLUS = '+',
  MINUS = '-'
}

export const GetUsdView: FC<Props> = ({ amount, percentEquivalent }) => {
  // only for view on front different styles
  const isProfit = amount > 100 ? true : false;
  const sign = isProfit ? Sign.MINUS : Sign.PLUS;

  return (
    <span className={styles.root}>
      <span className={styles.prefix}>$</span>
      {formatValueBalance(amount, 2)}
      {isExist(percentEquivalent) && (
        <span className={cx(styles.percentEquivalent, { [styles.red]: isProfit })}>{`${sign} ${formatValueBalance(
          percentEquivalent,
          2
        )}%`}</span>
      )}
    </span>
  );
};
