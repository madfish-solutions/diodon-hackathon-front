import { useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const modalsStore = useModalsStore();
  const { isConnected } = useAuthStore();

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const openHandler = () => {
    modalsStore.open(ModalType.OpenPosition, { marketId });
  };

  const manageHandler = () => {
    // eslint-disable-next-line no-console
    console.log('manageHandler');
    modalsStore.open(ModalType.ManagePosition, { marketId });
  };

  return { position, isConnected, openHandler, manageHandler };
};
