import { FC } from 'react';

import { IChartData, Position } from '@api/positions';
import { BarChart } from '@shared/charts/bar-chart';
import { Button, PositionTypeIcon } from '@shared/components';
import { getMultiplierView, GetUsdView, PercentView, TokensView } from '@shared/helpers';
import { Optional } from '@shared/types';

import { MarginSlider } from '../../../../account/components/margin-slider';
import { Cell } from '../../../../cell';
import styles from '../market-item.module.scss';

interface Props {
  position: Optional<Position>;
  chartData: IChartData[];
  onClose: () => void;
  positionBeingClosed: boolean;
}

export const PositionItemFull: FC<Props> = ({ position, chartData, positionBeingClosed, onClose }) => {
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
              </Cell>
              <Cell label="Open Price">
                <GetUsdView amount={position.avgOpenPriceUsd} />
              </Cell>
              <Cell label="Margin Level">
                <PercentView amount={13} />
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
            <div>
              <div className={styles.marginLevel}>Margin level:</div>
              <div className={styles.explanation}>Low risk – you’re going to get a good night’s sleep.</div>
            </div>
            <MarginSlider value={position.marginRatioPercentage} className={styles.slider} />
            <div className={styles.lastElementWrapper}>
              <Button
                onClick={event => {
                  event.stopPropagation();
                  onClose();
                }}
                className={styles.manageButton}
                disabled={positionBeingClosed}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
