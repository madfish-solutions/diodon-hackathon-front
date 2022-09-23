import { useEffect } from 'react';

import { ClearingHouse } from '@blockchain/facades';
import { AMMS, CLEARING_HOUSE_ADDRESS } from '@config/environment';
import { useApi, useAuthStore, usePositionsStore } from '@shared/hooks';
import { useMarketsStore } from '@shared/hooks/use-markets-store';
import { MarketId } from '@shared/types';

export const useMarketsViewModel = () => {
  const api = useApi();

  const { address, connection } = useAuthStore();

  const marketsStore = useMarketsStore();
  const { markets } = marketsStore;

  const positionsStore = usePositionsStore();

  // First load - only markets data
  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await marketsStore.loadMarkets();
      });
    })();
    // eslint-disable-next-line
  }, []);

  // Load positions
  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      await api.call(async () => {
        await positionsStore.loadPositions(address);
        if (connection) {
          const clearingHouse = new ClearingHouse(connection.provider, CLEARING_HOUSE_ADDRESS, connection.signer);
          // eslint-disable-next-line no-console
          console.log(
            await Promise.all(
              [MarketId.AMD, MarketId.AAPL].map(async marketId =>
                clearingHouse.getPosition(AMMS[marketId], address).catch(e => e)
              )
            )
          );
        }
      });
    })();
    // eslint-disable-next-line
  }, [address]);

  return { markets };
};
