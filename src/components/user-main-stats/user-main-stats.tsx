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
  const { netCollateralUsd, netCollateral, openedPositionsSum, openedPositionsSumUsd } = useUserMainStatsViewModel();

  return (
    <div className={cx(styles.root, className)}>
      <Cell contentClassName={{ amountClassName: styles.amount }} label="Net collateral">
        <TokensView amount={netCollateral} dollarEquivalent={netCollateralUsd} />
      </Cell>
      <Cell contentClassName={{ amountClassName: styles.amount }} label="Opened positions">
        <TokensView amount={openedPositionsSum} dollarEquivalent={openedPositionsSumUsd} />
      </Cell>
    </div>
  );
});
