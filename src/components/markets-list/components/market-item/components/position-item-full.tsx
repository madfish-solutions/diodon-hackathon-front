import { FC } from 'react';

import { IChartData, Position } from '@api/positions';
import { BarChart } from '@shared/charts/bar-chart';
import { Button, PositionTypeIcon } from '@shared/components';
import { getMultiplierView, GetUsdView, PercentView, TokensView } from '@shared/helpers';
import { Optional } from '@shared/types';

import { Cell } from '../../../../cell';
import styles from '../market-item.module.scss';
import { MarginRisk } from './margin-risk';

interface Props {
  position: Optional<Position>;
  chartData: IChartData[];
  openManageModal: () => void;
}

export const PositionItemFull: FC<Props> = ({ position, chartData, openManageModal }) => {
  return (
    <div className={styles.positionFull}>
      <div className={styles.sidePanel}>
        {position && (
          <>
            <div className={styles.detailsPositionFull}>
              <Cell label="Position Amount">
                <TokensView
                  amount={position.amountTokens}
                  suffix={position.marketId}
                  dollarEquivalent={position.amountUsd}
                />
              </Cell>
              <Cell label="Profit / Loss">
                <PercentView amount={position.pnlPercent} pnl />
                <span style={{ fontSize: '90%', marginLeft: 8 }}>
                  <GetUsdView amount={position.pnlUsd} />
                </span>
              </Cell>
              <Cell label="Open Price">
                <GetUsdView amount={position.avgOpenPriceUsd} />
              </Cell>
              <Cell label="Liquidation Price">
                <GetUsdView amount={position.liqPrice1Usd} />
              </Cell>
              <Cell label="Leverage">{getMultiplierView(position.leverage)}</Cell>
            </div>
            <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
          </>
        )}
      </div>
      <div className={styles.mainPanel}>
        <div className={styles.headerInfo}>
          <span className={styles.mainText}>Market price, USD</span>
          <span className={styles.secondaryText}>Index price, USD</span>
          <span className={styles.secondaryText}>Funding rate, %</span>
        </div>

        <BarChart data={chartData} />

        {position && (
          <div className={styles.footerInfo}>
            <MarginRisk marginRatioPercentage={position.marginRatioPercentage} />
            <div className={styles.lastElementWrapper}>
              <Button
                onClick={event => {
                  event.stopPropagation();
                  openManageModal();
                }}
                className={styles.manageButton}
              >
                Manage
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
