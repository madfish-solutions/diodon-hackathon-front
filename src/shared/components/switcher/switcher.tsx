import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { isEqual } from '@shared/helpers';

import { Button } from '../button';
import styles from './switcher.module.scss';

interface Props<T extends BigNumber.Value> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onClick: (value: T) => void;
  className?: string;
}

export function Switcher<T extends BigNumber.Value>({ options, value, onClick, className }: Props<T>) {
  return (
    <div className={cx(styles.root, className)}>
      {options.map(({ label, value: optionValue }) => (
        <Button
          key={optionValue.toString()}
          theme="secondary"
          onClick={() => onClick(optionValue)}
          className={cx(styles.tab, { [styles.active]: isEqual(optionValue, value) })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
