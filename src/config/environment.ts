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
  [MarketId.AAPL]: '0x339EdE517f4579dDE6B79ad356EA7bb9DcF9d1eC',
  [MarketId.AMD]: '0x0B77f0b48c4fE204E497c8993e0Ff72C85c9C7f1',
  [MarketId.SHOP]: '0xBF01142FA45E5aC376F955b62F059D585ab42e65'
};

export const KNOWN_MARKETS = [MarketId.AAPL, MarketId.AMD, MarketId.SHOP];
