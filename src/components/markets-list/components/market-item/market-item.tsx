import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { Button } from '@shared/components';
import { MarketIcon } from '@shared/components/market-icon';
import { PositionTypeIcon } from '@shared/components/position-type-icon';
import { getPercentView, getTokensView, getUsdView } from '@shared/helpers';

import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const { position, openHandler, closeHandler, addHandler } = useMarketItemViewModel(market.marketId);

  return (
    <div className={styles.item}>
      <div className={styles.market}>
        <div style={{ textAlign: 'center', marginRight: 8 }}>
          <MarketIcon marketId={market.marketId} width={48} height={48} />
          <div>
            <b>{market.marketId}</b>
          </div>
        </div>
        <span>Market Price: {getUsdView(market.marketPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.marketPriceChange24Usd)}</span>
        <span>Index Price: {getUsdView(market.indexPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.indexPriceChange24Usd)}</span>
        <span>Volume 24h: {getUsdView(market.volume24Usd)}</span>
        <span>Founding rate 8h: {getPercentView(market.fundingRateChange8Percent)}</span>
        {!position && (
          <div>
            <p>
              <Button onClick={openHandler} className={styles.openButton}>
                Open
              </Button>
            </p>
          </div>
        )}
      </div>
      {position ? (
        <div className={styles.position}>
          <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
          <span>Amount: {getTokensView(position.amountTokens)}</span>
          <span>Amount USD: {getUsdView(position.amountUsd)}</span>
          <span>PNL: {getPercentView(position.pnlPercent)}</span>
          <span>PNL USD: {getUsdView(position.pnlUsd)}</span>
          <span>Avg Open Price: {getUsdView(position.avgOpenPriceUsd)}</span>
          <span>Liquidity 1 Price: {getUsdView(position.liqPrice1Usd)}</span>
          <span>ALiquidity 2 Price: {getUsdView(position.liqPrice2Usd)}</span>
          <div>
            <p>
              <Button onClick={closeHandler} className={styles.closeButton}>
                Close
              </Button>
            </p>
            <p>
              <Button onClick={addHandler} className={styles.addButton}>
                Add
              </Button>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
});
