import cx from 'classnames';

import { CFC } from '@shared/types';

import styles from './card-cell.module.scss';

interface Props {
  label: string;
  className?: string;
}

export const Cell: CFC<Props> = ({ label, className, children }) => {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.amount}>{children}</div>
    </div>
  );
};
