import Caver from 'caver-js';
import { ethers } from 'ethers';

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
  provider: ethers.providers.Web3Provider;
}

export type Connection = KlaytnConnection | EthereumConnection;
