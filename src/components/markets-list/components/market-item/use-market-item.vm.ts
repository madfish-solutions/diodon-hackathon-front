import { useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const modalsStore = useModalsStore();
  const { isConnected } = useAuthStore();

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const openHandler = () => {
    // eslint-disable-next-line no-console
    console.log('open', marketId);
    modalsStore.open(ModalType.OpenPosition);
  };

  const closeHandler = () => {
    // eslint-disable-next-line no-console
    console.log('close', marketId);
    modalsStore.open(ModalType.ClosePosition);
  };

  const addHandler = () => {
    // eslint-disable-next-line no-console
    console.log('add', marketId);
    modalsStore.open(ModalType.AddPosition);
  };

  return { position, openHandler, closeHandler, addHandler };
};
