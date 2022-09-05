import { FC } from 'react';

import cx from 'classnames';

import { Navigation } from '../navigation';
import styles from './sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cx(styles.root, className)} data-test-id="sidebar">
      <Navigation className={styles.navigation} />
      <footer className={styles.footer}>Some footer</footer>
    </div>
  );
};
