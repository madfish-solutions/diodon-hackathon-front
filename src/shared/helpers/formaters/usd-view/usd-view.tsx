import { FC, HTMLProps, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';
import cx from 'classnames';

import { ZERO_AMOUNT } from '@config/constants';
import { isExist } from '@shared/types';

import { formatValueBalance } from '../format-balance';
import styles from './usd-view.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  amount: BigNumber.Value;
  percentEquivalent?: BigNumber.Value;
  pnl?: boolean;
}

export const GetUsdView: FC<Props> = ({ amount, percentEquivalent, pnl, ...props }) => {
  const roundedAmount = useMemo(() => new BigNumber(amount).decimalPlaces(2), [amount]);
  const roundedPercentEquivalent = useMemo(
    () => (isExist(percentEquivalent) ? new BigNumber(percentEquivalent).decimalPlaces(2) : null),
    [percentEquivalent]
  );

  // only for view on front different styles
  const isProfit = useMemo(() => {
    if (isExist(roundedPercentEquivalent)) {
      return new BigNumber(roundedPercentEquivalent).isPositive();
    }

    return roundedAmount.gt(ZERO_AMOUNT);
  }, [roundedAmount, roundedPercentEquivalent]);

  const sign = isProfit ? '+' : '';

  const color = isExist(pnl)
    ? { [styles.green]: new BigNumber(amount).gte(ZERO_AMOUNT), [styles.red]: new BigNumber(amount).lt(ZERO_AMOUNT) }
    : {};

  return (
    <span className={cx({ [styles.root]: true, ...color })} {...props}>
      <span className={styles.prefix}>$</span>
      <span title={`${amount}`}>{formatValueBalance(roundedAmount, 6)}</span>
      {isExist(roundedPercentEquivalent) && (
        <span
          title={`${percentEquivalent}`}
          className={cx(styles.percentEquivalent, { [styles.red]: !isProfit })}
        >{`${sign} ${formatValueBalance(roundedPercentEquivalent, 6)}%`}</span>
      )}
    </span>
  );
};
