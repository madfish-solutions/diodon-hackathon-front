import { action, makeObservable, observable } from 'mobx';

import { getPositionsApi } from '@api/positions';

import { Position } from '../../api';
import { RootStore } from './root.store';

export class PositionsStore {
  positions: Position[] = [];

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      positions: observable,

      setPositions: action
    });
  }

  setPositions(positions: Position[]) {
    this.positions = positions;
  }

  async loadPositions(accountPkh: string) {
    const { connection } = this.rootStore.authStore;

    if (connection) {
      const { positions } = await getPositionsApi(accountPkh, connection.provider);
      this.setPositions(positions);
    } else {
      this.setPositions([]);
    }
  }

  getPosition(marketId: string) {
    return this.positions.find(position => position.marketId === marketId) ?? null;
  }
}
