import { makeObservable } from 'mobx';

import { AuthStore } from './auth.store';

export class RootStore {
  authStore: AuthStore;
  // TODO: add other common stores

  // TODO: add page specific stores

  constructor() {
    this.authStore = new AuthStore(this);

    makeObservable(this, {
      // TODO: make page specific stores observable
    });
  }
}
