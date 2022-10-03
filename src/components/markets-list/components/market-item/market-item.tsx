import { FC, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { MarginSlider } from '@components/account/components/margin-slider';
import { Cell } from '@components/cell';
import { Button } from '@shared/components';
import { MarketIcon } from '@shared/components/market-icon';
import { PositionTypeIcon } from '@shared/components/position-type-icon';
import { getMultiplierView, PercentView, TokensView, GetUsdView } from '@shared/helpers';
import { PositionType } from '@shared/types';

import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const [fullView, seFullView] = useState(false);
  const {
    position,
    positionBeingClosed,
    openHandler,
    closeHandler,
    isConnected,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  } = useMarketItemViewModel(market);

  return (
    <button type="button" className={styles.itemButton} onClick={() => seFullView(prev => !prev)}>
      <div className={styles.item}>
        <div className={styles.market}>
          <div style={{ textAlign: 'start', minWidth: '175px' }}>
            <MarketIcon marketId={market.marketId} width={48} height={48} />
            <div>
              <b>{market.marketId}</b>
            </div>
          </div>
          <div className={styles.details}>
            <Cell label="Market Price" className={styles.Cell}>
              <GetUsdView amount={market.marketPriceUsd} percentEquivalent={marketPriceChangePercentage} />
            </Cell>
            <Cell label="Index Price" className={styles.Cell}>
              <GetUsdView amount={market.indexPriceUsd} percentEquivalent={indexPriceChangePercentage} />
            </Cell>
            <Cell label="Funding rate 8h" className={styles.Cell}>
              <PercentView amount={market.fundingRateChange8Percent} decimalPlaces={4} />
            </Cell>
            <Cell label="Volume 24h" className={styles.Cell}>
              <TokensView amount={market.volume24Tokens} dollarEquivalent={market.volume24Usd} />
            </Cell>
          </div>
          {!position ? (
            <div className={styles.button}>
              <p>
                <Button
                  onClick={event => {
                    event.stopPropagation();
                    openHandler();
                  }}
                  className={styles.openButton}
                  disabled={!isConnected}
                >
                  Open
                </Button>
              </p>
            </div>
          ) : (
            <div className={styles.lastElementWrapper} />
          )}
        </div>
        {fullView && position && (
          <div className={styles.positionFull}>
            <div className={styles.sidePanel}>
              <div className={styles.detailsPositionFull}>
                <Cell label="Amount">
                  <TokensView amount={position.amountTokens} dollarEquivalent={position.amountUsd} />
                </Cell>
                <Cell label="Profit / Loss">
                  <PercentView amount={position.pnlPercent} pnl />
                </Cell>
                <Cell label="Avg Open Price">
                  <GetUsdView amount={position.avgOpenPriceUsd} />
                </Cell>
                <Cell label="Liquidity 1 Price">
                  <GetUsdView amount={position.liqPrice1Usd} />
                </Cell>
                <Cell label="Leverage">{getMultiplierView(0.43)}</Cell>
              </div>
              <PositionTypeIcon type={PositionType.LONG} width={64} height={64} style={{ marginRight: 8 }} />
            </div>
            <div className={styles.mainPanel}>
              <div className={styles.headerInfo}>
                <span className={styles.mainText}>Market price, USD</span>
                <span className={styles.secondaryText}>Index price, USD</span>
                <span className={styles.secondaryText}>Funding rate, %</span>
              </div>
              <div className={styles.chart} />
              <div className={styles.footerInfo}>
                <div>
                  <div className={styles.marginLevel}>Margin level:</div>
                  <div className={styles.explanation}>Low risk – you’re going to get a good night’s sleep.</div>
                </div>
                <MarginSlider value={14} className={styles.slider} />
                <div className={styles.lastElementWrapper}>
                  <Button
                    onClick={event => {
                      event.stopPropagation();
                      closeHandler();
                    }}
                    className={styles.manageButton}
                    disabled={positionBeingClosed}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {position && !fullView ? (
          <div className={styles.position}>
            <div className={styles.positionTypeWrapper}>
              <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
            </div>
            <div className={styles.detailsPosition}>
              <Cell label="Amount">
                <TokensView amount={position.amountTokens} dollarEquivalent={position.amountUsd} />
              </Cell>
              <Cell label="Profit / Loss">
                <PercentView amount={position.pnlPercent} pnl />
              </Cell>
              <Cell label="Avg Open Price">
                <GetUsdView amount={position.avgOpenPriceUsd} />
              </Cell>
              <Cell label="Liquidity 1 Price">
                <GetUsdView amount={position.liqPrice1Usd} />
              </Cell>
            </div>
            <div className={styles.lastElementWrapper}>
              <Button
                onClick={event => {
                  event.stopPropagation();
                  closeHandler();
                }}
                className={styles.manageButton}
                disabled={positionBeingClosed}
              >
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </button>
  );
});
