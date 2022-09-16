import { action, makeObservable, observable, computed } from 'mobx';

import { ConnectedStatus, Connection, Nullable } from '../types';
import { RootStore } from './root.store';

export class AuthStore {
  connection: Nullable<Connection> = null;
  address: Nullable<string> = null;
  status: Nullable<ConnectedStatus> = null;

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      connection: observable,
      address: observable,
      status: observable,

      isConnected: computed,

      setConnection: action,
      setAddress: action,
      resetStore: action,
      setStatus: action
    });
  }

  setConnection(connection: Connection) {
    this.connection = connection;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setStatus(status: ConnectedStatus) {
    this.status = status;
  }

  get isConnected() {
    return this.status === ConnectedStatus.connected;
  }

  resetStore() {
    this.connection = null;
    this.address = null;
  }
}
