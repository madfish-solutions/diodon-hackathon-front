import { FC } from 'react';

import cx from 'classnames';

import { isEqual } from '@shared/helpers';

import { Button } from '../button';
import styles from './operation-switcher.module.scss';

export enum Tab {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw'
}

interface Props {
  operation: Tab;
  onClick: (tab: Tab) => void;
  className?: string;
}

export const OperationSwitcher: FC<Props> = ({ operation, onClick, className }) => {
  return (
    <div className={cx(styles.root, className)}>
      <Button
        theme="secondary"
        onClick={() => onClick(Tab.DEPOSIT)}
        className={cx(styles.tab, { [styles.active]: isEqual(Tab.DEPOSIT, operation) })}
      >
        {Tab.DEPOSIT}
      </Button>
      <Button
        theme="secondary"
        onClick={() => onClick(Tab.WITHDRAW)}
        className={cx(styles.tab, { [styles.active]: isEqual(Tab.WITHDRAW, operation) })}
      >
        {Tab.WITHDRAW}
      </Button>
    </div>
  );
};
