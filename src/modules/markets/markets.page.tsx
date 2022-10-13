import { MarketsList } from '@components/markets-list';
import { BannerIcon, Madfish } from '@shared/svg';

import styles from './markets.page.module.scss';

export const MarketsPage = () => {
  return (
    <div className={styles.root}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
          marginBottom: 24
        }}
      >
        <BannerIcon />
      </div>

      <h1 className={styles.title}>Markets</h1>
      <MarketsList />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
          marginBottom: 24
        }}
      >
        <a href="https://mad.fish/" target="_blank" rel="noreferrer">
          <Madfish />
        </a>
      </div>
    </div>
  );
};
