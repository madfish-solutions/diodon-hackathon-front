import { MarketId, PositionType } from '@shared/types';

export interface AccountPosition {
  marketId: MarketId;
  type: PositionType;
  amountAtomic: number;
  amountUsd: number;
  pnlPercent: number;
  pnlUsd: number;
  avgOpenPriceUsd: number;
  liqPrice1Usd: number;
  liqPrice2Usd: number;
}

export interface AccountPositionResponse {
  accountPkh: string;
  positions: AccountPosition[];
}
