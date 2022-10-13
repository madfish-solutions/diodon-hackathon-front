/*
  URL: https://diodon-mock-data.fly.dev/api/v1/markets
 */

import { MarketId } from '@shared/types';

export interface MarketData {
  marketId: MarketId;
  marketPriceUsd: number;
  marketPriceChange24Usd: string;
  indexPriceUsd: number;
  indexPriceChange24Usd: number;
  indexPriceChangePercentage: number;
  volume24Tokens: string;
  volume24Usd: number;
  fundingRateChangePercentage: number;
  marketPriceChangePercentage: number;
}
