import { FC } from 'react';

import { LogoYellowIcon } from '../../svg';
import styles from './loading-animation.module.scss';

export const LoadingAnimation: FC = () => (
  <span className={styles.loadingAnimation}>
    <LogoYellowIcon className={styles.icon} size={24} />
  </span>
);
