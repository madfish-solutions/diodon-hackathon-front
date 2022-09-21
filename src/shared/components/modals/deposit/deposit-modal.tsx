import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { getUsdView } from '../../../helpers';
import { modalsStyle } from '../modals-style';
import { useDepositModalViewModel } from './use-deposit-modal.vm';

export const DepositModal: FC = observer(() => {
  const { isOpen, market, buyingPowerUsd, closeModalHandler, handleSubmit, error, isSubmitting, value, handleChange } =
    useDepositModalViewModel();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Deposit</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Buying Power: {getUsdView(buyingPowerUsd)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="market" value={market} onChange={handleChange} />
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit" disabled={isSubmitting}>
          Deposit ({value} dDAI)
        </button>
      </form>
    </Modal>
  );
});
