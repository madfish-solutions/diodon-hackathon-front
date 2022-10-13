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
  openManagePositionModal: () => void;
  openOpenPositionModal: () => void;
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
              <Cell label="Position Amount" tooltip="Position size in stocks and dollars">
                <TokensView
                  amount={position.amountTokens}
                  suffix={position.marketId}
                  dollarEquivalent={position.amountUsd}
                />
              </Cell>
              <Cell label="Profit / Loss" tooltip="Change in the value of the position">
                <GetUsdView amount={position.pnlUsd} pnl />
                <span style={{ fontSize: '85%', marginLeft: 8, opacity: 0.8 }}>
                  <span style={{ opacity: 0.5 }}>/</span>{' '}
                  <PercentView amount={position.pnlPercent} decimalPlaces={2} pnl />
                </span>
              </Cell>
              <Cell label="Open Price" tooltip="Asset price at the moment of opening the position">
                <GetUsdView amount={position.avgOpenPriceUsd} />
              </Cell>
              <Cell label="Liquidation Price" tooltip="The price at which opened position will be liquidated">
                <GetUsdView amount={position.liqPrice1Usd} />
              </Cell>
              <Cell label="Leverage" tooltip="How many times the position size is bigger than collateral">
                {getMultiplierView(position.leverage)}
              </Cell>
            </div>
            <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
          </>
        )}
      </div>
      <div className={styles.mainPanel}>
        <div className={styles.headerInfo}>
          <span className={styles.mainText}>Market price & Volume, USD</span>
        </div>

        <BarChart spotPriceData={chartData.spotPriceData} volumeData={chartData.volumeData} />

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
