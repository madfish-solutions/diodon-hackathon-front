import { Time } from 'lightweight-charts';

import { MarketId, PositionType } from '@shared/types';

export interface Position {
  marketId: MarketId;
  margin: number;
  type: PositionType;
  amountTokens: number;
  amountUsd: number;
  pnlPercent: number;
  pnlUsd: number;
  avgOpenPriceUsd: number;
  liqPrice1Usd: number;
  liqPrice2Usd: number;
  leverage: number;
  marginRatioPercentage: number;
}

export interface AccountPositionResponse {
  accountPkh: string;
  positions: Position[];
}

export interface IChartData {
  time: Time;
  value: number;
}
