import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { Cell } from '@components/cell';
import { GetUsdView, TokensView } from '@shared/helpers';

import { useUserMainStatsViewModel } from './use-user-main-stats.vm';
import styles from './user-main-stats.module.scss';

interface Props {
  className?: string;
}

export const UserMainStats: FC<Props> = observer(({ className }) => {
  const { netCollateralUsd, openedPositionsSumUsd, dDAIBalanceInUSD } = useUserMainStatsViewModel();

  return (
    <div className={cx(styles.root, className)} id="top-stats">
      <Cell contentClassName={{ amountClassName: styles.cell }} label="Net collateral">
        <GetUsdView prefix="$" amount={netCollateralUsd} />
      </Cell>
      <Cell
        className={styles.openedPositions}
        contentClassName={{ amountClassName: styles.cell }}
        label="Opened positions"
      >
        <GetUsdView prefix="$" amount={openedPositionsSumUsd} />
      </Cell>
      <Cell className={styles.cell} contentClassName={{ amountClassName: styles.amount }} label="Balance">
        <TokensView suffix="DDAI" amount={dDAIBalanceInUSD} />
      </Cell>
    </div>
  );
});
