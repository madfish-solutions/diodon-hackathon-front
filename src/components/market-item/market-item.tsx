import { FC } from 'react';

import { MarketData } from '@api/markets';
import { getUsdView } from '@shared/helpers';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = ({ market }) => {
  return (
    <div style={{ border: '1px solid #666', margin: 4, padding: 4, display: 'flex' }}>
      <b>Name: {market.marketId}</b>
      <span>Market Price: {getUsdView(market.marketPriceUsd)}</span>
      <span>Market Price 24h change: {getUsdView(market.marketPriceChange24Usd)}</span>
      <span>Index Price: {getUsdView(market.indexPriceUsd)}</span>
      <span>Market Price 24h change: {getUsdView(market.indexPriceChange24Usd)}</span>
      <span>Volume 24h: {getUsdView(market.volume24Usd)}</span>
      <span>Founding rate 8h: {market.fundingRateChange8Percent}</span>
    </div>
  );
};
