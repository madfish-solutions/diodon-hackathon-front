import { providers } from 'ethers';

export enum ConnectionType {
  Ethereum = 'Ethereum'
}

export interface EthereumConnection {
  type: ConnectionType.Ethereum;
  signer: providers.JsonRpcSigner;
  provider: providers.Web3Provider;
}

// TODO: extend for Klaytn wallets integration
export type Connection = EthereumConnection;
