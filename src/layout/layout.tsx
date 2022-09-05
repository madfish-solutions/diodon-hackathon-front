import cx from 'classnames';

import { Sidebar, Header } from '@shared/components';
import { CFC } from '@shared/types';

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
