import { FC } from 'react';

import cx from 'classnames';

import { Cell } from '@components/cell';
import { TokensView } from '@shared/helpers';

import styles from './user-main-stats.module.scss';

const MOCK_MAIN_STATS = {
  netCollateral: 1000,
  openedPositions: 3000
};

interface Props {
  className?: string;
}

export const UserMainStats: FC<Props> = ({ className }) => {
  return (
    <div className={cx(styles.root, className)}>
      <Cell contentClassName={{ amountClassName: styles.amount }} label="Net collateral">
        <TokensView amount={MOCK_MAIN_STATS.netCollateral} dollarEquivalent={1000} />
      </Cell>
      <Cell
        className={styles.openedPositions}
        contentClassName={{ amountClassName: styles.amount }}
        label="Opened positions"
      >
        <TokensView amount={MOCK_MAIN_STATS.openedPositions} dollarEquivalent={1000} />
      </Cell>
    </div>
  );
};
