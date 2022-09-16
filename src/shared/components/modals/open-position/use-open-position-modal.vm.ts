import { useAccountStore, useModalsStore } from '../../../hooks';
import { useMarketsStore } from '../../../hooks/use-markets-store';
import { ModalType } from '../../../store/modals.store';
import { MarketId } from '../../../types';

export const useOpenPositionModalViewModel = (marketId: MarketId) => {
  const modalsStore = useModalsStore();
  const isOpen = modalsStore.isOpen(ModalType.OpenPosition);
  const closeModalHandler = () => modalsStore.close();
  const marketsStore = useMarketsStore();
  const market = marketsStore.getMarket(marketId);
  const { data } = useAccountStore();
  const buyingPowerUsd = data?.buyingPowerUsd ?? 0;

  return { market, isOpen, buyingPowerUsd, closeModalHandler };
};
