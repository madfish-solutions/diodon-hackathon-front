import { MarketsList } from '@components/markets-list';

import styles from './markets.page.module.scss';

export const MarketsPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Markets</h1>
      <MarketsList />
    </div>
  );
};
