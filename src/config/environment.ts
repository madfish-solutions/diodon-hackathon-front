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
  [MarketId.AAPL]: '0xE9798F3CB911a6F6FBE036891Dc6a592c695B4CC',
  [MarketId.AMD]: '0xd65B19856fD5c07158b0e136fFf15D53B2CcC7A0',
  [MarketId.SHOP]: '0xEb832bCAF1777A364FeA0f7B6F68E917CCd3C891'
};

export const KNOWN_MARKETS = [MarketId.AAPL, MarketId.AMD, MarketId.SHOP];
