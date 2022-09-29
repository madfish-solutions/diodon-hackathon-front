import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { GetUsdView } from '../../../helpers';
import { MarketId, Undefined } from '../../../types';
import { modalsStyle } from '../modals-style';
import { useManagePositionModalViewModel } from './use-manage-position-modal.vm';

interface Props {
  marketId: Undefined<MarketId>;
}

export const ManagePositionModal: FC<Props> = observer(({ marketId }) => {
  const { closePosition, market, isOpen, buyingPowerUsd, closeModalHandler, handleSubmit, error, value, handleChange } =
    useManagePositionModalViewModel(marketId);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Manage Position {marketId}</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Price: {<GetUsdView amount={market.marketPriceUsd} />}</p>
        <p>
          Buying Power: <GetUsdView amount={buyingPowerUsd} />
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <p>({value})</p>
        <button type="submit">Reduce position</button>
        <button type="submit">Increase position</button>
        <button type="button" onClick={closePosition}>
          Fully close position
        </button>
      </form>
    </Modal>
  );
});
