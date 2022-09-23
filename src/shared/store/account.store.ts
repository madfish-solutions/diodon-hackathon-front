import BigNumber from 'bignumber.js';
import { action, makeObservable, observable } from 'mobx';

import { getAccountDataApi } from '@api/account';
import { ERC20TokenContractWrapper } from '@blockchain/erc20-contract-wrapper';
import { DDAI_DECIMALS, FALLBACK_PROVIDER, ZERO_AMOUNT } from '@config/constants';
import { DDAI_ADDRESS } from '@config/environment';
import { toReal } from '@shared/helpers/bignumber';

import { AccountData } from '../../api';
import { Nullable } from '../types';

const DEFAULT_BALANCE = new BigNumber(ZERO_AMOUNT);

export class AccountStore {
  data: Nullable<AccountData> = null;
  dDAIBalance = DEFAULT_BALANCE;

  constructor() {
    makeObservable(this, {
      data: observable,
      dDAIBalance: observable,

      setData: action,
      setDDAIBalance: action
    });
  }

  setData(data: Nullable<AccountData>) {
    this.data = data;
  }

  setDDAIBalance(balance: BigNumber) {
    this.dDAIBalance = balance;
  }

  async loadData(accountPkh: string) {
    const { data } = await getAccountDataApi(accountPkh);
    this.setData(data);
  }

  async loadDDAIBalance(accountPkh: string) {
    const dDaiContract = new ERC20TokenContractWrapper(DDAI_ADDRESS, FALLBACK_PROVIDER);
    const rawBalance = await dDaiContract.methods.balanceOf(accountPkh);
    this.setDDAIBalance(toReal(new BigNumber(rawBalance.toString()), DDAI_DECIMALS));
  }
}
