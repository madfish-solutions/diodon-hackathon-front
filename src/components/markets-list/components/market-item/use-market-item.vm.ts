import { useAuthStore, usePositionsStore } from '@shared/hooks';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const { isConnected } = useAuthStore();

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  return { position };
};
