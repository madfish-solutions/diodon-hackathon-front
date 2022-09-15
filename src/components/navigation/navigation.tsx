import { FC, useMemo } from 'react';

import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './navigation.module.scss';
import { isActivePath } from './utils';

interface NavigationProps {
  className?: string;
}

export const Navigation: FC<NavigationProps> = ({ className }) => {
  const router = useLocation();

  const content = useMemo(() => {
    return [
      <Link key="home" to="/" className={cx(styles.link, isActivePath(router.pathname, '/') && styles.active)}>
        Home
      </Link>,
      <Link
        key="about"
        to="/about"
        className={cx(styles.link, isActivePath(router.pathname, '/about') && styles.active)}
      >
        About
      </Link>,
      <Link
        key="workspace"
        to="/workspace"
        className={cx(styles.link, isActivePath(router.pathname, '/workspace') && styles.active)}
      >
        Workspace
      </Link>,
      <Link key="e404" to="/404" className={cx(styles.link, isActivePath(router.pathname, '/404') && styles.active)}>
        404
      </Link>
    ];
  }, [router.pathname]);

  return <nav className={cx(styles.root, className)}>{content}</nav>;
};
