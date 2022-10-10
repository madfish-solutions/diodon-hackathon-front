import { ConnectorConfig } from '@keshan3262/use-wallet/dist/cjs/types';
import { providers } from 'ethers';

import { BASE_URL, CHAIN_ID, DDAI_ADDRESS, RPC_URL } from './environment';

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

export const HEX_BASE = 16;
export const CHAIN_ID_AS_HEX = `0x${CHAIN_ID.toString(HEX_BASE)}`;
export const ZERO_AMOUNT = 0;
export const DDAI_DECIMALS = 18;
export const WHOLE_PERCENTAGE = 100;

export const DDAI_TOKEN = {
  address: DDAI_ADDRESS, // The address that the token is at.
  symbol: 'DDAI', // A ticker symbol or shorthand, up to 5 chars.
  decimals: DDAI_DECIMALS, // The number of decimals in the token
  image: 'https://etherscan.io/token/images/defirex_32.png' // A string url of the token logo
};
