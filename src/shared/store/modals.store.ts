import { action, makeObservable, observable } from 'mobx';

import { Nullable } from '../types';

export enum ModalType {
  OpenPosition,
  ClosePosition,
  AddPosition
}

export class ModalsStore {
  modal: Nullable<ModalType> = null;

  constructor() {
    makeObservable(this, {
      modal: observable,

      open: action,
      close: action
    });
  }

  open(modal: ModalType) {
    this.modal = modal;
  }

  close() {
    this.modal = null;
  }

  isOpen(modal: ModalType) {
    return this.modal === modal;
  }
}
