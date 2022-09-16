/*
  URL: https://diodon-mock-data.fly.dev/api/v1/account
 */

export interface AccountData {
  netCollateralAtomic: number;
  netCollateralUsd: number;
  freeCollateralAtomic: number;
  freeCollateralUsd: number;
  buyingPowerUsd: number;
  marginRatioPercent: number;
  leverage: number;
}

export interface AccountDataResponse {
  accountPkh: string;
  data: AccountData;
}
