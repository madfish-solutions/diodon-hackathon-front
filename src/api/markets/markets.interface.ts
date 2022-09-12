export interface MarketData {
  marketId: 'AMD' | 'APPL' | 'SHOP';
  marketPriceUsd: number;
  marketPriceChange24Usd: number;
  indexPriceUsd: number;
  indexPriceChange24Usd: number;
  volume24Atomic: number;
  volume24Usd: number;
  fundingRateChange8Percent: number;
}

export interface MarketResponse {
  markets: MarketData[];
}
