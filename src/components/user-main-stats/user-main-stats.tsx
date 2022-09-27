import { FC } from 'react';

import cx from 'classnames';

import { Cell } from '@components/card-cell';

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
      <Cell label="Net collateral">{MOCK_MAIN_STATS.netCollateral}</Cell>
      <Cell label="Opened positions">{MOCK_MAIN_STATS.openedPositions}</Cell>
    </div>
  );
};
