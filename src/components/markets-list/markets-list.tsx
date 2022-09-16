import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketItem } from './components/market-item';
import styles from './markets-list.module.scss';
import { useMarketsViewModel } from './use-markets.vm';

export const MarketsList: FC = observer(() => {
  const { markets } = useMarketsViewModel();

  return (
    <div>
      <h1 className={styles.title}>Synthetic Stocks Market</h1>
      {markets.map(market => (
        <MarketItem market={market} key={market.marketId} />
      ))}
    </div>
  );
});
