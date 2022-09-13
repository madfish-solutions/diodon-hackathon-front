/*
  URL: https://diodon-mock-data.fly.dev/api/v1/markets
 */

import { MarketId } from '@shared/types';

export interface MarketData {
  marketId: MarketId;
  marketPriceUsd: number;
  marketPriceChange24Usd: number;
  indexPriceUsd: number;
  indexPriceChange24Usd: number;
  volume24Tokens: number;
  volume24Usd: number;
  fundingRateChange8Percent: number;
}

export interface MarketResponse {
  markets: MarketData[];
}
