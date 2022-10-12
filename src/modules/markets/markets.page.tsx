import { MarketsList } from '@components/markets-list';

import styles from './markets.page.module.scss';

export const MarketsPage = () => {
  return (
    <div className={styles.root}>
      <MarketsList />
    </div>
  );
};
