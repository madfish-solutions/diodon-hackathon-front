export interface AccountData {
  netCollateralAtomic: number;
  netCollateralUsd: number;
  freeCollateralAtomic: number;
  freeCollateralUsd: number;
  marginRatioPercent: number;
  leverage: number;
}

export interface AccountDataResponse {
  accountPkh: string;
  data: AccountData;
}
