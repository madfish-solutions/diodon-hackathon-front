import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { useAuthStore } from '@shared/hooks';

import { Account } from '../account';
import { Navigation } from '../navigation';
import { WelcomeBanner } from '../welcome-banner';
import styles from './sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

const SHOW_NAVIGATION = false;

export const Sidebar: FC<SidebarProps> = observer(({ className }) => {
  const { isConnected } = useAuthStore();

  return (
    <div className={cx(styles.root, className)} data-test-id="sidebar">
      {SHOW_NAVIGATION && <Navigation />}
      {isConnected ? <Account /> : <WelcomeBanner />}
    </div>
  );
});
