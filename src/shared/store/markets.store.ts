import { action, makeObservable, observable } from 'mobx';

import { MarketData, getMarketsApi } from '../../api';

export class MarketsStore {
  markets: MarketData[] = [];

  constructor() {
    makeObservable(this, {
      markets: observable,

      setMarkets: action
    });
  }

  setMarkets(markets: MarketData[]) {
    this.markets = markets;
  }

  async loadMarkets() {
    const { markets } = await getMarketsApi();
    this.setMarkets(markets);
  }
}
