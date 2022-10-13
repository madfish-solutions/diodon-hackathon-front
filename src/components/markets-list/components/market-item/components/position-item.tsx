import { FC } from 'react';

import { Position } from '@api/positions';
import { Button, PositionTypeIcon } from '@shared/components';
import { GetUsdView, PercentView, TokensView } from '@shared/helpers';

import { Cell } from '../../../../cell';
import styles from '../market-item.module.scss';
import { getMarginRiskColor } from './margin-risk';

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
        <Cell label="Position Amount" tooltip="Position size in stocks and dollars">
          <TokensView suffix={position.marketId} amount={position.amountTokens} dollarEquivalent={position.amountUsd} />
        </Cell>
        <Cell label="Profit / Loss" tooltip="Change in the value of the position">
          <GetUsdView amount={position.pnlUsd} pnl />
        </Cell>
        <Cell label="Open Price" tooltip="Asset price at the moment of opening the position">
          <GetUsdView amount={position.avgOpenPriceUsd} />
        </Cell>
        <Cell label="Margin level" tooltip="The ratio between position value and used margin">
          <PercentView
            amount={position.marginRatioPercentage}
            style={{ color: getMarginRiskColor(position.marginRatioPercentage) }}
          />
        </Cell>
      </div>
      <div className={styles.lastElementWrapper}>
        <Button
          onClick={event => {
            event.stopPropagation();
            openManageModal();
          }}
        >
          Manage position
        </Button>
      </div>
    </div>
  );
};
