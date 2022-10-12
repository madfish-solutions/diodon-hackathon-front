import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cell } from '@components/cell';
import { Button } from '@shared/components/button';
import { LeverageSlider } from '@shared/components/leverage-slider';
import { CloseIcon } from '@shared/svg';

import { formatValueBalance, GetUsdView, TokensView } from '../../../helpers';
import { MarketId, Undefined } from '../../../types';
import { modalsStyle } from '../modals-style';
import modalsStyles from '../modals.module.scss';
import styles from '../open-position/open-position-modal.module.scss';
import { useManagePositionModalViewModel } from './use-manage-position-modal.vm';

interface Props {
  marketId: Undefined<MarketId>;
}

export const ManagePositionModal: FC<Props> = observer(({ marketId }) => {
  const {
    closePosition,
    market,
    isOpen,
    balance,
    closeModalHandler,
    handleSubmit,
    error,
    value,
    leverage,
    handleChange,
    handleLeverageChange,
    positionBeingChanged,
    positionSize,
    positionSizeUsd
  } = useManagePositionModalViewModel(marketId);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={modalsStyles.heading}>
        <CloseIcon onClick={closeModalHandler} className={modalsStyles.closeButton} />
        Manage position <span className={modalsStyles.market}>{marketId}</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div>Margin</div>
          <div>Balance: {formatValueBalance(balance)}</div>
        </div>
        <div className={styles.inputWrapper}>
          <span className={styles.inputPostfix}>KDAI</span>
          <input
            type="number"
            min={0}
            step={0.01}
            name="orderAmount"
            className={cx(styles.input, styles.amount)}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className={styles.info}>
          <div>Leverage</div>
        </div>
        <LeverageSlider value={leverage} onChange={handleLeverageChange} />
        <p style={{ color: 'red' }}>{error}</p>
        <div className={styles.additionalInfo}>
          <Cell label="Min. new position size">
            <TokensView amount={positionSize} suffix={marketId} dollarEquivalent={positionSizeUsd} />
          </Cell>
          <Cell label="Current price">
            <GetUsdView amount={market?.marketPriceUsd ?? 0} />
          </Cell>
        </div>
        <div className={styles.footer}>
          <Button type="submit" disabled={positionBeingChanged}>
            Increase position
          </Button>
          <Button type="button" onClick={closePosition} disabled={positionBeingChanged}>
            Fully close position
          </Button>
        </div>
      </form>
    </Modal>
  );
});
