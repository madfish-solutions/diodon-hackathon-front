import { MARKETS_API_URL } from '@config/api';

import { MarketData } from './markets.interface';

export const getMarketsApi = async (): Promise<MarketData[]> => {
  const response = await fetch(MARKETS_API_URL);

  return response.json();
};
