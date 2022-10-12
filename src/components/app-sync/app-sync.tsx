import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useApi, useAuthStore, useAccountStore, usePositionsStore } from '@shared/hooks';
import { useMarketsStore } from '@shared/hooks/use-markets-store';

export const AppSync: FC = observer(() => {
  const api = useApi();
  const { connect } = useConnectEthereum();
  const accountStore = useAccountStore();
  const marketsStore = useMarketsStore();
  const positionsStore = usePositionsStore();
  const { address } = useAuthStore();

  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await connect();
      });
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }

      await api.call(async () => Promise.all([accountStore.loadData(address), accountStore.loadDDAIBalance(address)]));
    })();
  }, [accountStore, address, api]);

  useEffect(() => {
    const updateCallback = async () =>
      api.call(async () => {
        await Promise.all([
          address && accountStore.loadDDAIBalance(address),
          marketsStore.loadMarkets(),
          address && positionsStore.loadPositions(address)
        ]);
      });

    const interval = setInterval(updateCallback, 10000);

    return () => clearInterval(interval);
  }, [accountStore, address, api, marketsStore, positionsStore]);

  return <div />;
});
