import { useCallback, useState } from 'react';

import BigNumber from 'bignumber.js';

import { useClearingHouse } from '@blockchain/hooks/use-clearing-house';
import { ZERO_AMOUNT } from '@config/constants';
import { AMMS } from '@config/environment';
import { useApi, useAuthStore, useModalsStore, usePositionsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';
import { MarketId } from '@shared/types';

export const useMarketItemViewModel = (marketId: MarketId) => {
  const modalsStore = useModalsStore();
  const { isConnected, address } = useAuthStore();
  const api = useApi();
  const { clearingHouse } = useClearingHouse();
  const [positionBeingClosed, setPositionBeingClosed] = useState(false);

  const positionsStore = usePositionsStore();
  const position = isConnected ? positionsStore.getPosition(marketId) : null;

  const openHandler = () => {
    modalsStore.open(ModalType.OpenPosition, { marketId });
  };

  const closeHandler = useCallback(async () => {
    try {
      setPositionBeingClosed(true);
      await api.call(async () => {
        if (!clearingHouse || !marketId) {
          return;
        }

        await clearingHouse.closePosition(AMMS[marketId], new BigNumber(ZERO_AMOUNT));
        modalsStore.close();
        await positionsStore.loadPositions(address!);
      });
    } finally {
      setPositionBeingClosed(false);
    }
  }, [api, clearingHouse, marketId, modalsStore, address, positionsStore]);

  return { position, positionBeingClosed, isConnected, openHandler, closeHandler };
};
