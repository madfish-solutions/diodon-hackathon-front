import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber as EthersBigNumber, CallOverrides, Signer } from 'ethers';

import clearingHouseViewerAbi from '@abis/clearing-house-viewer.json';
import { ContractWrapper } from '@blockchain/contract-wrapper';

export enum PNLCalcOption {
  SPOT_PRICE = 0,
  TWAP = 1,
  ORACLE = 2
}

interface PersonalPositionWithFundingPaymentResponse extends ArrayLike<EthersBigNumber | [EthersBigNumber]> {
  size: [EthersBigNumber];
  margin: [EthersBigNumber];
  openNotional: [EthersBigNumber];
  lastUpdatedCumulativePremiumFraction: [EthersBigNumber];
  liquidityHistoryIndex: EthersBigNumber;
  blockNumber: EthersBigNumber;
}

type ClearingHouseViewerWrapperMethods = {
  clearingHouse: (overrides?: CallOverrides) => Promise<string>;
  getFreeCollateral: (amm: string, trader: string, overrides?: CallOverrides) => Promise<[EthersBigNumber | number]>;
  getMarginRatio: (amm: string, trader: string, overrides?: CallOverrides) => Promise<[EthersBigNumber | number]>;
  getPersonalBalanceWithFundingPayment: (
    quoteToken: string,
    trader: string,
    overrides?: CallOverrides
  ) => Promise<[EthersBigNumber | number]>;
  getPersonalPositionWithFundingPayment: (
    amm: string,
    trader: string,
    overrides?: CallOverrides
  ) => Promise<PersonalPositionWithFundingPaymentResponse>;
  getUnrealizedPnl: (
    amm: string,
    trader: string,
    pnlCalcOption: PNLCalcOption,
    overrides?: CallOverrides
  ) => Promise<[EthersBigNumber | number]>;
  isPositionNeedToBeMigrated: (amm: string, trader: string, overrides?: CallOverrides) => Promise<boolean>;
};

export class ClearingHouseViewerContractWrapper extends ContractWrapper<
  ClearingHouseViewerWrapperMethods,
  Record<string, never>
> {
  constructor(address: string, provider: Provider | Signer) {
    super(address, clearingHouseViewerAbi, provider);
  }
}
