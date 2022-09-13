import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useApi } from '@shared/hooks';
import { useMarketsStore } from '@shared/hooks/use-markets-store';

import { MarketItem } from '../market-item';

export const MarketsList: FC = observer(() => {
  const api = useApi();
  const marketsStore = useMarketsStore();
  const { markets } = marketsStore;

  useEffect(() => {
    (async () => {
      await api.call(async () => {
        await marketsStore.loadMarkets();
      });
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {markets.map(market => (
        <MarketItem market={market} key={market.marketId} />
      ))}
    </div>
  );
});
