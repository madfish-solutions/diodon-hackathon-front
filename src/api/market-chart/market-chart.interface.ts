import { MarketId } from '@shared/types';

/*
  URLS:
  https://diodon-mock-data.fly.dev/api/v1/market-chart/AMD
  https://diodon-mock-data.fly.dev/api/v1/market-chart/APPL
  https://diodon-mock-data.fly.dev/api/v1/market-chart/SHOP

 */

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
