import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { getUsdView } from '../../../helpers';
import { MarketId } from '../../../types';
import { modalsStyle } from '../modals-style';
import { useOpenPositionModalViewModel } from './use-open-position-modal.vm';

interface Props {
  marketId: MarketId;
}

export const OpenPositionModal: FC<Props> = observer(({ marketId }) => {
  const { market, isOpen, buyingPowerUsd, closeModalHandler } = useOpenPositionModalViewModel(marketId);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2>Open Position {marketId}</h2>
      <button onClick={closeModalHandler}>close</button>
      <div>
        <p>Price: {getUsdView(market.marketPriceUsd)}</p>
        <p>Buying Power: {getUsdView(buyingPowerUsd)}</p>
      </div>
      <form>
        <input />
      </form>
    </Modal>
  );
});
