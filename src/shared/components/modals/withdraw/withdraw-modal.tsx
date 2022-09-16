import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { getUsdView } from '../../../helpers';
import { modalsStyle } from '../modals-style';
import { useWithdrawModalViewModel } from './use-withdraw-modal.vm';

export const WithdrawModal: FC = observer(() => {
  const { isOpen, buyingPowerUsd, closeModalHandler, handleSubmit, error, value, handleChange } =
    useWithdrawModalViewModel();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Withraw</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Buying Power: {getUsdView(buyingPowerUsd)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit">Open position ({value})</button>
      </form>
    </Modal>
  );
});
