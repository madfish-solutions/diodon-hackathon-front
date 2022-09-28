import { MarketId } from '@shared/types';

export const RPC_URL = process.env.REACT_APP_RPC_URL ?? 'https://api.baobab.klaytn.net:8651';
export const CHAIN_ID = Number(process.env.REACT_APP_CHAIN_ID ?? '1001');
export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:3000';
export const FORTMATIC_API_KEY = process.env.REACT_APP_FORTMATIC_API_KEY;
export const PORTIS_DAPP_ID = process.env.REACT_APP_PORTIS_DAPP_ID;
export const BLOCK_EXPLORER_URL = process.env.REACT_APP_BLOCK_EXPLORER_URL ?? 'https://baobab.scope.klaytn.com';
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME ?? 'Klaytn - Baobab Testnet';
export const DDAI_ADDRESS = process.env.REACT_APP_DDAI_ADDRESS!;
export const CLEARING_HOUSE_ADDRESS = process.env.REACT_APP_CLEARING_HOUSE_ADDRESS!;
export const CLEARING_HOUSE_VIEWER_ADDRESS = process.env.REACT_APP_CLEARING_HOUSE_VIEW_ADDRESS!;

export const AMMS = {
  [MarketId.AAPL]: '0x21f98596D0bb9da7fFcA2a3e29d47FcEA858e79B',
  [MarketId.AMD]: '0xA7675BDD2f6029e43F7EbB345da77B3deaf2B2cF',
  [MarketId.SHOP]: '0xxxxx'
};
