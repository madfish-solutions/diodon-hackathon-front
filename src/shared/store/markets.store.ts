import { action, makeObservable, observable } from 'mobx';

import { FALLBACK_PROVIDER } from '@config/constants';

import { MarketData, getMarketsApi } from '../../api';
import { MarketId, Nullable } from '../types';
import { RootStore } from './root.store';

export class MarketsStore {
  openedMarket: Nullable<MarketData> = null;
  markets: MarketData[] = [];

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      markets: observable,
      openedMarket: observable,

      setMarkets: action,
      toggleMarket: action
    });
  }

  toggleMarket(market: MarketData) {
    this.openedMarket = this.openedMarket?.marketId === market.marketId ? null : market;
  }

  setMarkets(markets: MarketData[]) {
    this.markets = markets;
  }

  async loadMarkets() {
    const markets = await getMarketsApi(this.rootStore.authStore.connection?.provider ?? FALLBACK_PROVIDER);
    this.setMarkets(markets);
  }

  getMarket(marketId: MarketId) {
    return this.markets.find(market => market.marketId === marketId) ?? null;
  }
}
