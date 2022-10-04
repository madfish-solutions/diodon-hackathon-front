import { FC } from 'react';

import { BigNumber } from 'bignumber.js';

import { isEmptyString } from '@shared/helpers/strings';
import { isExist } from '@shared/types';

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
      {isExist(dollarEquivalent) && !isEmptyString(dollarEquivalent) && (
        <span className={styles.dollarEquivalent}>{`$ ${formatValueBalance(dollarEquivalent, 2)}`}</span>
      )}
    </span>
  );
};
