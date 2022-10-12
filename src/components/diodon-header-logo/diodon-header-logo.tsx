import { FC } from 'react';

import { DiodonLogo } from '@shared/svg';

import styles from './diodon-header-logo.module.scss';

export const DiodonHeaderLogo: FC = () => {
  return (
    <div className={styles.root}>
      <DiodonLogo />
    </div>
  );
};
