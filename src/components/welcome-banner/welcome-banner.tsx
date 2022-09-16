import { FC } from 'react';

import { ConnectButton } from '@shared/components';

import styles from './welcome-banner.module.scss';

export const WelcomeBanner: FC = () => {
  return (
    <div>
      <h2 className={styles.title}>Welcome</h2>
      <ConnectButton />
    </div>
  );
};
