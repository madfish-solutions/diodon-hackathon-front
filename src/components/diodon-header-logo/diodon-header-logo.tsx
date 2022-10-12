import { FC } from 'react';

import { DiodonLogoHeader as DiodonIcon } from '@shared/svg';

import styles from './diodon-header-logo.module.scss';

export const DiodonHeaderLogo: FC = () => {
  return (
    <div className={styles.root}>
      <DiodonIcon />
      <div className={styles.text}>
        <div className={styles.diodon}>diodon</div>
        <div className={styles.tradingChampion}>Trading Champion</div>
      </div>
    </div>
  );
};
