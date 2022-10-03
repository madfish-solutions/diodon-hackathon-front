import { makeObservable } from 'mobx';

import { AccountStore } from './account.store';
import { AuthStore } from './auth.store';
import { MarketsStore } from './markets.store';
import { ModalsStore } from './modals.store';
import { PositionsStore } from './positions.store';

export class RootStore {
  authStore = new AuthStore(this);
  marketsStore = new MarketsStore();
  accountStore = new AccountStore(this);
  positionsStore = new PositionsStore(this);

  modalsStore = new ModalsStore();

  constructor() {
    makeObservable(this, {
      authStore: false,
      marketsStore: false,
      accountStore: false,
      positionsStore: false,
      modalsStore: false
    });
  }
}
