import { FC } from 'react';

import { Position } from '@api/positions';
import { Button, PositionTypeIcon } from '@shared/components';
import { GetUsdView, PercentView, TokensView } from '@shared/helpers';

import { Cell } from '../../../../cell';
import styles from '../market-item.module.scss';

interface Props {
  position: Position;
  openManageModal: () => void;
}

export const PositionItem: FC<Props> = ({ position, openManageModal }) => {
  return (
    <div className={styles.position}>
      <div className={styles.positionTypeWrapper}>
        <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
      </div>
      <div className={styles.detailsPosition}>
        <Cell label="Position Amount">
          <TokensView suffix={position.marketId} amount={position.amountTokens} dollarEquivalent={position.amountUsd} />
        </Cell>
        <Cell label="Profit / Loss">
          <PercentView amount={position.pnlPercent} pnl />
        </Cell>
        <Cell label="Open Price">
          <GetUsdView amount={position.avgOpenPriceUsd} />
        </Cell>
        <Cell label="Liquidation Price">
          <GetUsdView amount={position.liqPrice1Usd} />
        </Cell>
      </div>
      <div className={styles.lastElementWrapper}>
        <Button
          onClick={event => {
            event.stopPropagation();
            openManageModal();
          }}
          className={styles.manageButton}
        >
          Manage position
        </Button>
      </div>
    </div>
  );
};
