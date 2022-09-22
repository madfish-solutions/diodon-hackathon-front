import { FC } from 'react';

import cx from 'classnames';
import { Link } from 'react-router-dom';

import { Socials } from '@components/socials';
import { ConnectButton } from '@shared/components/connect-button';

import { DiodonHeaderLogo } from '../diodon-header-logo';
import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <div className={styles.wrapper}>
      <header className={cx(styles.root, className)} data-test-id="header">
        <Link to="/">
          <DiodonHeaderLogo />
        </Link>
        <div className={styles.flex1} />
        <Socials />
        <ConnectButton className={styles.button} />
      </header>
    </div>
  );
};
