import { MarketId, PositionType } from '@shared/types';

/*
  URL: https://diodon-mock-data.fly.dev/api/v1/positions
 */

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
}

export interface AccountPositionResponse {
  accountPkh: string;
  positions: Position[];
}
