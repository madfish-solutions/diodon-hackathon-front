import { MARKETS_API_URL } from '@config/api';

export const getMarketsApi = async () => {
  const response = await fetch(MARKETS_API_URL);

  return response.json();
};
