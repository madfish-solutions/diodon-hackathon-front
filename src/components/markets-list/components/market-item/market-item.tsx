import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { PositionTypeIcon } from '@shared/components/position-type-icon';
import { getPercentView, getTokensView, getUsdView } from '@shared/helpers';

import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const { position } = useMarketItemViewModel(market.marketId);

  return (
    <div className={styles.item}>
      <div className={styles.market}>
        <b>Name: {market.marketId}</b>
        <span>Market Price: {getUsdView(market.marketPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.marketPriceChange24Usd)}</span>
        <span>Index Price: {getUsdView(market.indexPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.indexPriceChange24Usd)}</span>
        <span>Volume 24h: {getUsdView(market.volume24Usd)}</span>
        <span>Founding rate 8h: {getPercentView(market.fundingRateChange8Percent)}</span>
      </div>
      {position ? (
        <div className={styles.position}>
          <PositionTypeIcon type={position.type} width={64} height={64} />
          <span>Amount: {getTokensView(position.amountTokens)}</span>
          <span>Amount USD: {getUsdView(position.amountUsd)}</span>
          <span>PNL: {getPercentView(position.pnlPercent)}</span>
          <span>PNL USD: {getUsdView(position.pnlUsd)}</span>
          <span>Avg Open Price: {getUsdView(position.avgOpenPriceUsd)}</span>
          <span>Liquidity 1 Price: {getUsdView(position.liqPrice1Usd)}</span>
          <span>ALiquidity 2 Price: {getUsdView(position.liqPrice2Usd)}</span>
        </div>
      ) : null}
    </div>
  );
});
