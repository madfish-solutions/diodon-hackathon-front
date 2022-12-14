import BigNumber from 'bignumber.js';
import { action, makeObservable, observable, computed } from 'mobx';

import { getAccountDataApi } from '@api/account';
import { ClearingHouseViewerContractWrapper } from '@blockchain/clearing-house-viewer-wrapper';
import { ERC20TokenContractWrapper } from '@blockchain/erc20-contract-wrapper';
import { DDAI_DECIMALS, FALLBACK_PROVIDER, ZERO_AMOUNT } from '@config/constants';
import { CLEARING_HOUSE_VIEWER_ADDRESS, DDAI_ADDRESS } from '@config/environment';
import { toReal } from '@shared/helpers/bignumber';

import { AccountData } from '../../api';
import { Nullable } from '../types';
import { RootStore } from './root.store';

const DEFAULT_BALANCE = new BigNumber(ZERO_AMOUNT);

export class AccountStore {
  data: Nullable<AccountData> = null;
  dDAIBalance = DEFAULT_BALANCE;
  freeCollateral = DEFAULT_BALANCE;

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      data: observable,
      dDAIBalance: observable,
      freeCollateral: observable,

      dDAIBalanceInUSD: computed,

      setData: action,
      setDDAIBalance: action,
      setFreeCollateral: action
    });
  }

  setData(data: Nullable<AccountData>) {
    this.data = data;
  }

  setDDAIBalance(balance: BigNumber) {
    this.dDAIBalance = balance;
  }

  setFreeCollateral(value: BigNumber) {
    this.freeCollateral = value;
  }

  async loadData(accountPkh: string) {
    const { data } = await getAccountDataApi(accountPkh);
    this.setData(data);
  }

  private getProvider() {
    return this.rootStore.authStore.connection?.provider ?? FALLBACK_PROVIDER;
  }

  async loadDDAIBalance(accountPkh: string) {
    const dDaiContract = new ERC20TokenContractWrapper(DDAI_ADDRESS, this.getProvider());
    const rawBalance = await dDaiContract.methods.balanceOf(accountPkh);
    this.setDDAIBalance(toReal(new BigNumber(rawBalance.toString()), DDAI_DECIMALS));
  }

  async loadFreeCollateral(amm: string, accountPkh: string) {
    const clearingHouseViewerContract = new ClearingHouseViewerContractWrapper(
      CLEARING_HOUSE_VIEWER_ADDRESS,
      this.getProvider()
    );
    const rawFreeCollateral = await clearingHouseViewerContract.methods.getFreeCollateral(amm, accountPkh);
    this.setFreeCollateral(toReal(new BigNumber(rawFreeCollateral.toString()), DDAI_DECIMALS));
  }

  get dDAIBalanceInUSD() {
    return this.dDAIBalance.decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber();
  }
}
