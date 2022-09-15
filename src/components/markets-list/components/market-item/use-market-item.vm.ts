import { useAuthStore, usePositionsStore } from '@shared/hooks';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const { isConnected } = useAuthStore();

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const openHandler = () => {
    // eslint-disable-next-line no-console
    console.log('open', marketId);
  };

  const closeHandler = () => {
    // eslint-disable-next-line no-console
    console.log('close', marketId);
  };

  const addHandler = () => {
    // eslint-disable-next-line no-console
    console.log('add', marketId);
  };

  return { position, openHandler, closeHandler, addHandler };
};
