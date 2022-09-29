import { FC, useState } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cell } from '@components/cell';
import { Button, OperationSwitcher, Tab } from '@shared/components';
import { PercentView, isEqual, GetUsdView } from '@shared/helpers';
import { CloseIcon } from '@shared/svg/close-icon';

import styles from './fin-operation-modal.module.scss';
import { modalsStyle } from './modals-style';
import { useDepositModalViewModel } from './use-deposit-modal.vm';

export const FinOperationModal: FC = observer(() => {
  const [operation, setOperation] = useState(Tab.DEPOSIT);
  const { isOpen, market, dDAIBalance, closeModalHandler, handleSubmit, error, isSubmitting, value, handleChange } =
    useDepositModalViewModel(operation);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={styles.heading}>
        <CloseIcon onClick={closeModalHandler} className={styles.closeButton} />
        {operation} <span className={styles.market}>{market}</span>
      </h2>
      <OperationSwitcher operation={operation} onClick={setOperation} />
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div>Amount</div>
          <div>
            Balance: <GetUsdView amount={dDAIBalance} />
          </div>
        </div>
        <input type="number" name="orderAmount" className={styles.input} value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <div className={styles.additionalInfo}>
          <Cell label={`Min. ${isEqual(Tab.DEPOSIT, operation) ? 'receive' : 'withdraw'}`}>
            <GetUsdView amount={123} />
          </Cell>
          <Cell label="Current price">
            <GetUsdView amount={123} />
          </Cell>
        </div>
        <div className={styles.footer}>
          <Cell label="Slippage">
            <PercentView amount={0.23} />
          </Cell>
          <Button type="submit" disabled={isSubmitting} className={styles.opButton}>
            {operation}
          </Button>
        </div>
      </form>
    </Modal>
  );
});
