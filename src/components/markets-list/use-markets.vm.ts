import { useCallback, useEffect } from 'react';

import { MarketData } from '@api/markets';
import { useApi, useAuthStore, usePositionsStore } from '@shared/hooks';
import { useMarketsStore } from '@shared/hooks/use-markets-store';

export const useMarketsViewModel = () => {
  const api = useApi();

  const { address } = useAuthStore();

  const marketsStore = useMarketsStore();
  const { markets, openedMarket } = marketsStore;

  const positionsStore = usePositionsStore();

  // First load - only markets data
  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await marketsStore.loadMarkets();
      });
    })();
    // eslint-disable-next-line
  }, [address]);

  // Load positions
  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      await api.call(async () => {
        await positionsStore.loadPositions(address);
      });
    })();
    // eslint-disable-next-line
  }, [address]);

  const toggleMarketHandler = useCallback((market: MarketData) => marketsStore.toggleMarket(market), [marketsStore]);

  return { markets, openedMarket, toggleMarketHandler };
};
