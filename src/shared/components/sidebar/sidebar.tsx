import { FC } from 'react';

import cx from 'classnames';

import { Account } from '@components/account';
import { BlockNumber } from '@components/block-number';

import { Navigation } from '../navigation';
import styles from './sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cx(styles.root, className)} data-test-id="sidebar">
      <div className={styles.navigation}>
        <Navigation />
        <Account />
      </div>
      <footer className={styles.footer}>
        <BlockNumber />
      </footer>
    </div>
  );
};
