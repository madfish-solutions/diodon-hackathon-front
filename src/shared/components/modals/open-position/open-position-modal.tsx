import { FC } from 'react';

import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Side } from '@blockchain/facades/types';

import { getUsdView } from '../../../helpers';
import { MarketId, Undefined } from '../../../types';
import { modalsStyle } from '../modals-style';
import { LeverageSlider } from './components';
import { useOpenPositionModalViewModel } from './use-open-position-modal.vm';

interface Props {
  marketId: Undefined<MarketId>;
}

export const OpenPositionModal: FC<Props> = observer(({ marketId }) => {
  const {
    market,
    isOpen,
    buyingPowerUsd,
    closeModalHandler,
    handleSubmit,
    error,
    positionType,
    value,
    handleChange,
    leverage,
    handleLeverageChange
  } = useOpenPositionModalViewModel(marketId);

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
      <form onSubmit={handleSubmit}>
        <select name="positionType" value={positionType} onChange={handleChange}>
          <option value={Side.BUY}>Long</option>
          <option value={Side.SELL}>Short</option>
        </select>
        <input type="number" name="orderAmount" value={value} onChange={handleChange} />
        <LeverageSlider value={leverage} onChange={handleLeverageChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <button type="submit">Open position ({value})</button>
      </form>
    </Modal>
  );
});
