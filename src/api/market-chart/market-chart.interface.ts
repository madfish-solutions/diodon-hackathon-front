import { MarketId } from '@shared/types';

export interface MarketChartTick {
  timestamp: number;
  marketPriceUsd: number;
  indexPriceUsd: number;
  fundingRatePercent: number;
}

export interface MarketChartResponse {
  marketId: MarketId;
  ticks: MarketChartTick[];
}
