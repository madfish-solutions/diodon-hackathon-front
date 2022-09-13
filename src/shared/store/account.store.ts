import { action, makeObservable, observable } from 'mobx';

import { getAccountDataApi } from '@api/account';

import { AccountData } from '../../api';
import { Nullable } from '../types';

export class AccountStore {
  data: Nullable<AccountData> = null;

  constructor() {
    makeObservable(this, {
      data: observable,

      setData: action
    });
  }

  setData(data: Nullable<AccountData>) {
    this.data = data;
  }

  async loadData(accountPkh: string) {
    const { data } = await getAccountDataApi(accountPkh);
    this.setData(data);
  }
}
