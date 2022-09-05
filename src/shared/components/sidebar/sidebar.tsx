import { FC } from 'react';

import cx from 'classnames';

import styles from './sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cx(styles.root, className)} data-test-id="sidebar">
      TODO: add navigation
      <footer className={styles.footer}>Some footer</footer>
    </div>
  );
};
