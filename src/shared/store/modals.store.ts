import { action, makeObservable, observable } from 'mobx';

import { MarketId, Nullable } from '../types';

export enum ModalType {
  OpenPosition,
  ClosePosition,
  AddPosition
}

interface OpenPositionPayload {
  marketId: MarketId;
}
interface AddPositionPayload {
  marketId: MarketId;
}
interface ClosePositionPayload {
  marketId: MarketId;
}

export type ModalPayload = OpenPositionPayload | AddPositionPayload | ClosePositionPayload;

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
