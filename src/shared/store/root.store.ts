import { action, makeObservable, observable } from 'mobx';

import { HomePageStore as IHomePageStore } from '@modules/home/home-page.store';
import { isNull } from '@shared/helpers';

import { Nullable } from '../types';
import { AuthStore } from './auth.store';

export class RootStore {
  authStore: AuthStore;

  homePageStore: Nullable<IHomePageStore> = null;

  constructor() {
    this.authStore = new AuthStore(this);

    makeObservable(this, {
      homePageStore: observable,

      createHomePageStore: action
    });
  }

  async createHomePageStore() {
    if (isNull(this.homePageStore)) {
      const { HomePageStore } = await import('@modules/home/home-page.store');
      this.homePageStore = new HomePageStore(this);
    }
  }
}
