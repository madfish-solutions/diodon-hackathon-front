import { MarketsList } from '@components/markets-list';
import { BannerIcon } from '@shared/svg';

import styles from './markets.page.module.scss';

export const MarketsPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Markets</h1>
      <MarketsList />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          marginTop: 64
        }}
      >
        <BannerIcon />
      </div>
    </div>
  );
};
