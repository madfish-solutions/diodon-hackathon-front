import { FC, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { MarginSlider } from '@components/account/components/margin-slider';
import { Cell } from '@components/cell';
import { Button } from '@shared/components';
import { MarketIcon } from '@shared/components/market-icon';
import { PositionTypeIcon } from '@shared/components/position-type-icon';
import { getMultiplierView, PercentView, TokensView, getUsdView, GetUsdView } from '@shared/helpers';
import { PositionType } from '@shared/types';

import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const [fullView, seFullView] = useState(false);
  const { position, openHandler, manageHandler, isConnected } = useMarketItemViewModel(market.marketId);

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
              <GetUsdView amount={market.marketPriceUsd} percentEquivalent={10} />
            </Cell>
            <Cell label="Index Price" className={styles.Cell}>
              <GetUsdView amount={market.indexPriceUsd} percentEquivalent={12} />
            </Cell>
            <Cell label="Funding rate 8h" className={styles.Cell}>
              <PercentView amount={market.fundingRateChange8Percent} />
            </Cell>
            <Cell label="Volume 24h" className={styles.Cell}>
              <GetUsdView amount={market.volume24Usd} percentEquivalent={14} />
            </Cell>
          </div>
          {!position ? (
            <div className={styles.button}>
              <p>
                <Button onClick={openHandler} className={styles.openButton} disabled={!isConnected}>
                  Open
                </Button>
              </p>
            </div>
          ) : (
            <div className={styles.lastElementWrapper} />
          )}
        </div>
        {fullView && (
          <div className={styles.positionFull}>
            <div className={styles.sidePanel}>
              <div className={styles.detailsPositionFull}>
                <Cell label="Amount">{<TokensView amount={1} dollarEquivalent={40} />}</Cell>
                <Cell label="Profit / Loss">
                  <PercentView amount={100} pnl />
                </Cell>
                <Cell label="Avg Open Price">{getUsdView(100)}</Cell>
                <Cell label="Liquidity 1 Price">{getUsdView(100)}</Cell>
                <Cell label="Laverage">{getMultiplierView(0.43)}</Cell>
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
                  <Button onClick={manageHandler} className={styles.manageButton}>
                    Manage
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
              <Cell label="Amount">{<TokensView amount={12345} dollarEquivalent={30673} />}</Cell>
              <Cell label="Profit / Loss">
                <PercentView amount={position.pnlPercent} pnl />
              </Cell>
              <Cell label="Avg Open Price">{getUsdView(position.avgOpenPriceUsd)}</Cell>
              <Cell label="Liquidity 1 Price">{getUsdView(position.liqPrice1Usd)}</Cell>
            </div>
            <div className={styles.lastElementWrapper}>
              <Button onClick={manageHandler} className={styles.manageButton}>
                Manage
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </button>
  );
});
