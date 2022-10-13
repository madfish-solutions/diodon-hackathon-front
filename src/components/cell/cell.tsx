import cx from 'classnames';

import { Tooltip } from '@shared/components';
import { CFC } from '@shared/types';

import styles from './cell.module.scss';

interface Props {
  label: string;
  className?: string;
  contentClassName?: {
    labelClassName?: string;
    amountClassName?: string;
  };
  tooltip?: string;
}

export const Cell: CFC<Props> = ({ label, contentClassName, className, children, tooltip }) => {
  return (
    <div className={cx(styles.root, className)}>
      <div className={cx(styles.label, contentClassName?.labelClassName)}>
        {label} {tooltip ? <Tooltip content={tooltip} /> : null}
      </div>
      <div className={cx(styles.amount, contentClassName?.amountClassName)}>{children}</div>
    </div>
  );
};
