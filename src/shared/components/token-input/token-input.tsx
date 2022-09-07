import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '../button';
import styles from './token-input.module.scss';
import { useTokenInputViewModel } from './token-input.vm';
import { TokenInputProps } from './types';

export const TokenInput: FC<TokenInputProps> = observer(
  ({
    id,
    className,
    label,
    dollarEquivalent,
    tokens,
    value,
    balance,
    error,
    disabled,
    hiddenPercentSelector,
    hiddenBalance,
    readOnly,
    balanceText,
    decimals,
    tokenInputDTI,
    onInputChange,
    onSelectorClick
  }) => {
    const {
      isFocused,
      inputRef,

      isFormReady,

      focusInput,
      handleInputFocus,
      handleInputBlur,

      handleInputChange
    } = useTokenInputViewModel({
      tokens,
      readOnly,
      hiddenPercentSelector,
      hiddenBalance,
      onInputChange
    });
    const compoundClassName = cx(
      { [styles.focused]: isFocused, [styles.error]: !!error, [styles.readOnly]: !isFormReady },
      className
    );

    const compoundSelectorClassName = cx(styles.selector, { [styles.frozen]: !Boolean(onSelectorClick) });

    return (
      <div
        className={compoundClassName}
        onClick={focusInput}
        onKeyPress={focusInput}
        role="button"
        tabIndex={0}
        data-test-id={tokenInputDTI}
      >
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={styles.background}>
          <div className={styles.shape}>
            <div className={cx(styles.dollarEquivalent, styles.label2)}>Dollar Equivalent</div>
            <div className={styles.balance}>Balance</div>
            <input
              id={id}
              className={cx(styles.item, styles.input)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              ref={inputRef}
              value={value}
              autoComplete="off"
              disabled={!isFormReady || disabled}
              onChange={handleInputChange}
            />
            <div className={styles.dangerContainer}>
              <Button disabled={!isFormReady} className={compoundSelectorClassName} onClick={onSelectorClick}>
                {tokens ? <>SYMBOL/LOGO</> : 'SELECT'}
                {Boolean(onSelectorClick) && '↓'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
