import { action, makeObservable, observable } from 'mobx';

import { Connection } from '../types/connection.types';
import { Nullable } from '../types/types';
import { RootStore } from './root.store';

export class AuthStore {
  connection: Nullable<Connection> = null;
  address: Nullable<string> = null;

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      connection: observable,
      address: observable,

      setConnection: action,
      setAddress: action,
      resetStore: action
    });
  }

  setConnection(connection: Connection) {
    this.connection = connection;
  }

  setAddress(address: string) {
    this.address = address;
  }

  resetStore() {
    this.connection = null;
    this.address = null;
  }
}
