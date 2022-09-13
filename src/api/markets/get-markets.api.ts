import { MARKETS_API_URL } from '@config/api';

import { MarketResponse } from './markets.interface';

export const getMarketsApi = async (): Promise<MarketResponse> => {
  const response = await fetch(MARKETS_API_URL);

  return response.json();
};
