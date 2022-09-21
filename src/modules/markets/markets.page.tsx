import { DataCard } from '@components/data-card';
import { MarketsList } from '@components/markets-list';
import { Socials } from '@components/socials';

import styles from './markets.page.module.scss';

export const MarketsPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <DataCard />
        <Socials />
      </div>
      <MarketsList />
    </div>
  );
};
