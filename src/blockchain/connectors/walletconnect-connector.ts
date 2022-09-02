import { type WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { Undefined } from '@shared/types';

export interface WalletConnectParams {
  rpc: { [chainId: number]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bridge: any;
}

let LazyWalletConnectConnector: Undefined<typeof WalletConnectConnector>;

export async function getWalletConnectConnector({ rpc, bridge }: WalletConnectParams) {
  if (!LazyWalletConnectConnector) {
    const walletConnectConnectorModule = await import('@web3-react/walletconnect-connector');
    LazyWalletConnectConnector = walletConnectConnectorModule.WalletConnectConnector;
  }

  return new LazyWalletConnectConnector({
    bridge,
    qrcode: true,
    rpc
  });
}
