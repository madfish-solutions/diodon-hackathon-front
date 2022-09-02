import Caver from 'caver-js';
import { providers } from 'ethers';

export enum ConnectionType {
  Klaytn = 'Klaytn',
  Ethereum = 'Ethereum'
}

export interface KlaytnConnection {
  type: ConnectionType.Klaytn;
  caver: Caver;
}

export interface EthereumConnection {
  type: ConnectionType.Ethereum;
  ethereum: providers.ExternalProvider;
}

export type Connection = KlaytnConnection | EthereumConnection;
