import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { Cell } from '@components/cell';
import { TokensView } from '@shared/helpers';

import { useUserMainStatsViewModel } from './use-user-main-stats.vm';
import styles from './user-main-stats.module.scss';

interface Props {
  className?: string;
}

export const UserMainStats: FC<Props> = observer(({ className }) => {
  const { netCollateralUsd, openedPositionsSumUsd } = useUserMainStatsViewModel();

  return (
    <div className={cx(styles.root, className)}>
      <Cell contentClassName={{ amountClassName: styles.amount }} label="Net collateral">
        <TokensView prefix="$" amount={netCollateralUsd} />
      </Cell>
      <Cell
        className={styles.openedPositions}
        contentClassName={{ amountClassName: styles.amount }}
        label="Opened positions"
      >
        <TokensView prefix="$" amount={openedPositionsSumUsd} />
      </Cell>
    </div>
  );
});
