import { action, makeObservable, observable } from 'mobx';

import { getPositionsApi } from '@api/positions';

import { Position } from '../../api';

export class PositionsStore {
  positions: Position[] = [];

  constructor() {
    makeObservable(this, {
      positions: observable,

      setPositions: action
    });
  }

  setPositions(positions: Position[]) {
    this.positions = positions;
  }

  async loadPositions(accountPkh: string) {
    const { positions } = await getPositionsApi(accountPkh);
    this.setPositions(positions);
  }

  getPosition(marketId: string) {
    return this.positions.find(position => position.marketId === marketId) ?? null;
  }
}
