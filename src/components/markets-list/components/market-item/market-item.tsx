import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { getPercentView, getTokensView, getUsdView } from '@shared/helpers';

import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const { position } = useMarketItemViewModel(market.marketId);

  return (
    <div style={{ border: '1px solid #666', margin: '32px 4px', padding: 4 }}>
      <div style={{ margin: 4, padding: 4, display: 'flex' }}>
        <b>Name: {market.marketId}</b>
        <span>Market Price: {getUsdView(market.marketPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.marketPriceChange24Usd)}</span>
        <span>Index Price: {getUsdView(market.indexPriceUsd)}</span>
        <span>Market Price 24h change: {getUsdView(market.indexPriceChange24Usd)}</span>
        <span>Volume 24h: {getUsdView(market.volume24Usd)}</span>
        <span>Founding rate 8h: {getPercentView(market.fundingRateChange8Percent)}</span>
      </div>
      {position ? (
        <div style={{ borderTop: '1px solid blue', display: 'flex' }}>
          <b>{position.type}</b>
          <span>{position.type}</span>
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
