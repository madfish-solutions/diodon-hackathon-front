import { FC, useState } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Button, OperationSwitcher, Tab } from '@shared/components';
import { getUsdView } from '@shared/helpers';
import { CloseIcon } from '@shared/svg/close-icon';
import { MarketId } from '@shared/types';

import modalsStyles from '../modals.module.scss';
import styles from './fin-operation-modal.module.scss';
import { modalsStyle } from './modals-style';
import { useFinOperationModalViewModel } from './use-fin-operation-modal.vm';

interface FinOperationModalProps {
  initialTab: Tab;
}

export const FinOperationModal: FC<FinOperationModalProps> = observer(({ initialTab }: FinOperationModalProps) => {
  const [operation, setOperation] = useState(initialTab);
  const { isOpen, market, closeModalHandler, handleSubmit, error, maxValue, isSubmitting, value, handleChange } =
    useFinOperationModalViewModel(operation);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={modalsStyles.heading}>
        <CloseIcon onClick={closeModalHandler} className={styles.closeButton} />
        {operation} <span className={modalsStyles.market}>{market}</span>
      </h2>
      <OperationSwitcher operation={operation} onClick={setOperation} />
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div>Amount</div>
          <div>Balance: {getUsdView(maxValue)}</div>
        </div>
        <input
          type="number"
          min={0}
          max={maxValue.toFixed()}
          step={0.01}
          name="orderAmount"
          className={cx(styles.input, styles.amount)}
          value={value}
          onChange={handleChange}
        />
        <div className={styles.info}>
          <div>Market</div>
        </div>
        <select name="market" className={cx(styles.input, styles.select)} value={market} onChange={handleChange}>
          <option className={styles.option} value={MarketId.AMD}>
            AMD
          </option>
          <option className={styles.option} value={MarketId.AAPL}>
            AAPL
          </option>
        </select>
        <p style={{ color: 'red' }}>{error}</p>
        <div className={styles.footer}>
          <Button type="submit" disabled={isSubmitting} className={styles.opButton}>
            {operation}
          </Button>
        </div>
      </form>
    </Modal>
  );
});
