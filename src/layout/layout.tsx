import cx from 'classnames';
import { browserName, isMobile } from 'react-device-detect';

import { BlockedUi } from '@components/blocked-ui';
import { Header } from '@components/header';
import { CFC } from '@shared/types';
import { ToastWrapper } from '@shared/utils/toasts';

import styles from './layout.module.scss';
import { useLayoutViewModel } from './use-layout.vm';

interface LayoutProps {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

export const Layout: CFC<LayoutProps> = ({ title, description, image, className, children }) => {
  const { isComponentDidMount } = useLayoutViewModel();

  const isBlocked = isMobile || browserName !== 'Chrome';

  return (
    <>
      {isComponentDidMount ? (
        <>
          <div className={styles.root}>
            <ToastWrapper />
            {!isBlocked && <Header />}
            <div className={cx(styles.mainWrapper)}>
              <main className={cx(styles.wrapper, className)}>{isBlocked ? <BlockedUi /> : children}</main>
            </div>
          </div>
        </>
      ) : (
        <div />
      )}
    </>
  );
};
