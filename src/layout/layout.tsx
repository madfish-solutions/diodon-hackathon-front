import cx from 'classnames';

import { Header } from '@components/header';
import { Sidebar } from '@components/sidebar';
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

  return (
    <>
      {isComponentDidMount ? (
        <>
          <div className={styles.root}>
            <ToastWrapper />
            <Header />
            <Sidebar className={styles.sidebar} />
            <div className={cx(styles.mainWrapper)}>
              <main className={cx(styles.wrapper, className)}>{children}</main>
            </div>
          </div>
        </>
      ) : (
        <div />
      )}
    </>
  );
};
