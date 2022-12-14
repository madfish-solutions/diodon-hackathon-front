import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketItem } from './components/market-item';
import { useMarketsViewModel } from './use-markets.vm';

export const MarketsList: FC = observer(() => {
  const { markets, openedMarket, toggleMarketHandler } = useMarketsViewModel();

  return (
    <div id="markets-list">
      {markets.map(market => (
        <MarketItem
          market={market}
          key={market.marketId}
          isOpened={market.marketId === openedMarket?.marketId}
          toggleMarketHandler={element => toggleMarketHandler(market, element)}
        />
      ))}
    </div>
  );
});
