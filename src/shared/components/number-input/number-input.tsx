import { forwardRef } from 'react';

import cx from 'classnames';

import { Input, InputProps } from '../input';
import s from './number-input.module.scss';

export type NumberInputProps = {
  theme?: keyof typeof themeClass;
  onIncrementClick?: () => void;
  onDecrementClick?: () => void;
} & InputProps;

const themeClass: { small: string; medium: string } = {
  small: s.small,
  medium: s.medium
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ theme = 'small', className, labelClassName, onIncrementClick, onDecrementClick, disabled, ...props }, ref) => (
    <div className={cx(s.root, themeClass[theme], className)}>
      <Input
        type="number"
        ref={ref}
        className={cx(s.wrapper)}
        labelClassName={cx(s.label, labelClassName)}
        disabled={disabled}
        inputClassName={s.input}
        {...props}
      />
      <div className={s.buttons}>
        <button
          type="button"
          className={s.button}
          onMouseDown={onIncrementClick}
          disabled={disabled || !onIncrementClick}
          data-test-id="topArrowButton"
        >
          Up
        </button>
        <button
          type="button"
          className={s.button}
          onMouseDown={onDecrementClick}
          disabled={disabled || !onDecrementClick}
          data-test-id="botArrowButton"
        >
          Down
        </button>
      </div>
    </div>
  )
);
