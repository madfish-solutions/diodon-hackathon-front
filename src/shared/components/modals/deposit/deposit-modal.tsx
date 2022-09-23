import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { getUsdView } from '../../../helpers';
import { modalsStyle } from '../modals-style';
import { useDepositModalViewModel } from './use-deposit-modal.vm';

export const DepositModal: FC = observer(() => {
  const { isOpen, market, dDAIBalance, closeModalHandler, handleSubmit, error, isSubmitting, value, handleChange } =
    useDepositModalViewModel();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Deposit</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Balance: {getUsdView(dDAIBalance)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <select name="market" value={market} onChange={handleChange}>
          <option value="AMD">AMD</option>
          <option value="AAPL">AAPL</option>
        </select>
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit" disabled={isSubmitting}>
          Deposit ({value} dDAI)
        </button>
      </form>
    </Modal>
  );
});
