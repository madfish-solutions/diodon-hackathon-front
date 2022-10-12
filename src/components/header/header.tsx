import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Socials } from '@components/socials';
import { GiveMeMoneyButton } from '@shared/components';
import { ConnectButton } from '@shared/components/connect-button';
import { useAuthStore } from '@shared/hooks';
import { FeedbackIcon } from '@shared/svg';

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
        <Link to="/" id="top-logo">
          <DiodonHeaderLogo />
        </Link>
        <Socials />
        <div id="feedback">
          <a href="https://quipuswap.com/" target="_blank" rel="noreferrer">
            <FeedbackIcon />
          </a>
        </div>
        <div className={styles.flex1} />
        {address && <UserMainStats className={styles.userMainStats} />}
        <div>
          <ConnectButton className={styles.button} id="connect-button" />
          <GiveMeMoneyButton className={styles.button} />
        </div>
      </header>
    </div>
  );
});
