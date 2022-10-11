import { action, makeObservable, observable } from 'mobx';

import { MarketId, Nullable, PositionType } from '../types';

export enum ModalType {
  OpenPosition,
  ManagePosition,
  Deposit,
  Withdraw
}

export interface OpenPositionPayload {
  marketId: MarketId;
  recommendedPositionType: PositionType;
}
export interface ManagePositionPayload {
  marketId: MarketId;
}

export type ModalPayload = OpenPositionPayload | ManagePositionPayload;

export class ModalsStore {
  modal: Nullable<ModalType> = null;
  payload: Nullable<ModalPayload> = null;

  constructor() {
    makeObservable(this, {
      modal: observable,
      payload: observable,

      open: action,
      close: action
    });
  }

  open(modal: ModalType, payload?: ModalPayload) {
    this.payload = payload ?? null;
    this.modal = modal;
  }

  close() {
    this.modal = null;
  }

  isOpen(modal: ModalType) {
    return this.modal === modal;
  }
}
