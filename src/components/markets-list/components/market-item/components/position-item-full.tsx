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
  chartData: {
    volumeData: Array<IChartData>;
    spotPriceData: Array<IChartData>;
  };
  onClose: () => void;
  positionBeingClosed: boolean;
}

export const PositionItemFull: FC<Props> = ({
  position,
  chartData,
  openManagePositionModal,
  openOpenPositionModal
}) => {
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
          <span className={styles.mainText}>Market price & Volume, USD</span>
        </div>

        <BarChart volumeData={chartData.volumeData} spotPriceData={chartData.spotPriceData} />

        <div className={styles.footerInfo}>
          {position ? (
            <>
              <MarginRisk marginRatioPercentage={position.marginRatioPercentage} />
              <div className={styles.lastElementWrapper} style={{ marginLeft: 8 }}>
                <Button
                  onClick={event => {
                    event.stopPropagation();
                    openManagePositionModal();
                  }}
                  className={styles.manageButton}
                >
                  Manage position
                </Button>
              </div>
            </>
          ) : (
            <>
              <div style={{ flex: 1 }} />
              <div className={styles.lastElementWrapper}>
                <Button
                  onClick={event => {
                    event.stopPropagation();
                    openOpenPositionModal();
                  }}
                  className={styles.openButton}
                >
                  Open position
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
