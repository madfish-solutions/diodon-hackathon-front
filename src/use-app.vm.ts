import { useEffect } from 'react';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useMarketsStore } from '@shared/hooks/use-markets-store';

export const useAppViewModel = () => {
  const marketsStore = useMarketsStore();
  const { connect } = useConnectEthereum();

  useEffect(() => {
    (async () => {
      await connect();
      await marketsStore.loadMarkets();
    })();
    // eslint-disable-next-line
  }, []);
};
