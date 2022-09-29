import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Socials } from '@components/socials';
import { GiveMeMoneyButton } from '@shared/components';
import { ConnectButton } from '@shared/components/connect-button';
import { useAuthStore } from '@shared/hooks';

import { DiodonHeaderLogo } from '../diodon-header-logo';
import { UserMainStats } from '../user-main-stats';
import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = observer(({ className }) => {
  const { address } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      <header className={cx(styles.root, className)} data-test-id="header">
        <Link to="/">
          <DiodonHeaderLogo />
        </Link>
        {address && <UserMainStats className={styles.userMainStats} />}
        <div className={styles.flex1} />
        <Socials />
        <div>
          <ConnectButton className={styles.button} />
          <GiveMeMoneyButton className={styles.button} />
        </div>
      </header>
    </div>
  );
});
