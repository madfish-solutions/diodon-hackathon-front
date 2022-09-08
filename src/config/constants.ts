import { ConnectorConfig } from '@keshan3262/use-wallet/dist/cjs/types';
import { providers } from 'ethers';

import { BASE_URL, CHAIN_ID, RPC_URL } from './environment';

export const APP_NAME = 'Klaytn Derivatives';
export const LOGO_URL = `${BASE_URL}/favicon.ico`;

export const WALLET_CONNECTORS: Record<string, ConnectorConfig> = {
  walletconnect: { rpc: { [CHAIN_ID]: RPC_URL } },
  walletlink: {
    url: RPC_URL,
    appName: APP_NAME,
    appLogoUrl: LOGO_URL
  }
};

export const FALLBACK_PROVIDER = new providers.JsonRpcProvider(RPC_URL);
