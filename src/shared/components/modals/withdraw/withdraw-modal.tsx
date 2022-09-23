import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { getUsdView } from '../../../helpers';
import { modalsStyle } from '../modals-style';
import { useWithdrawModalViewModel } from './use-withdraw-modal.vm';

export const WithdrawModal: FC = observer(() => {
  const { isOpen, isSubmitting, market, buyingPowerUsd, closeModalHandler, handleSubmit, error, value, handleChange } =
    useWithdrawModalViewModel();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Withraw</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Buying Power: {getUsdView(buyingPowerUsd)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <select name="market" value={market} onChange={handleChange}>
          <option value="AMD">AMD</option>
          <option value="AAPL">AAPL</option>
        </select>
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit" disabled={isSubmitting}>
          Withdraw ({value} dDAI)
        </button>
      </form>
    </Modal>
  );
});
