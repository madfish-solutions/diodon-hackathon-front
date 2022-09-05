import { FC } from 'react';

import cx from 'classnames';

import styles from './header.module.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  /* const location = useLocation();
  const locationRef = useRef(location.pathname);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    if (isMenuOpened) {
      document.querySelector('body')?.classList.add('ReactModal__Body--open');
    } else {
      document.querySelector('body')?.classList.remove('ReactModal__Body--open');
    }
  }, [isMenuOpened]);

  /* useEffect(() => {
    if (locationRef.current !== location.pathname) {
      locationRef.current = location.pathname;
      setIsMenuOpened(false);
    }
  }, [location.pathname]); */

  return (
    <div className={styles.wrapper}>
      <header className={cx(styles.root, className)} data-test-id="header">
        <a href="/">Logo placeholder</a>
      </header>
    </div>
  );
};
