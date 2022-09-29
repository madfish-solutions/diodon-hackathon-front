import { FC } from 'react';

import { BigNumber } from 'bignumber.js';

import { formatValueBalance } from '../format-balance';
import styles from './tokens-view.module.scss';

interface Props {
  amount: BigNumber.Value;
  dollarEquivalent?: BigNumber.Value;
}

export const TokensView: FC<Props> = ({ amount, dollarEquivalent }) => {
  return (
    <span className={styles.root}>
      {formatValueBalance(amount)}
      {dollarEquivalent && (
        <span className={styles.dollarEquivalent}>{`$ ${formatValueBalance(dollarEquivalent, 2)}`}</span>
      )}
    </span>
  );
};
