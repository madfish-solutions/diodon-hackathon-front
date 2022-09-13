import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { useMarketsStore } from '@shared/hooks/use-markets-store';

import { MarketItem } from '../market-item';

export const MarketsList: FC = observer(() => {
  const marketsStore = useMarketsStore();
  const { markets } = marketsStore;

  return (
    <div>
      {markets.map(market => (
        <MarketItem market={market} key={market.marketId} />
      ))}
    </div>
  );
});
