import { action, makeObservable, observable } from 'mobx';

import { HomePageStore as IHomePageStore } from '@modules/home/home-page.store';
import { isNull } from '@shared/helpers';

import { Nullable } from '../types';
import { AuthStore } from './auth.store';
import { MarketsStore } from './markets.store';

export class RootStore {
  authStore = new AuthStore(this);
  marketsStore = new MarketsStore();

  homePageStore: Nullable<IHomePageStore> = null;

  constructor() {
    makeObservable(this, {
      authStore: false,
      marketsStore: false,
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
