import { FC } from 'react';

import cx from 'classnames';
import { Link } from 'react-router-dom';

import { ConnectButton } from '../connect-button';
import { DiodonLogo } from '../icons';
import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <div className={styles.wrapper}>
      <header className={cx(styles.root, className)} data-test-id="header">
        <Link to="/">
          <DiodonLogo width={177} height={48} />
        </Link>
        <div className={styles.flex1} />
        <ConnectButton />
      </header>
    </div>
  );
};
