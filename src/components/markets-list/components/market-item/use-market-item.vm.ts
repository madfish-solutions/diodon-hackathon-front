import { usePositionsStore } from '@shared/hooks';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const positionsStore = usePositionsStore();
  const position = positionsStore.getPosition(marketId);

  return { position };
};
