import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cell } from '@components/cell';
import { Button } from '@shared/components/button';
import { LeverageSlider } from '@shared/components/leverage-slider';
import { Switcher } from '@shared/components/switcher';

import { formatValueBalance, GetUsdView, PercentView, TokensView } from '../../../helpers';
import { MarketId, PositionType, Undefined } from '../../../types';
import { CloseButton } from '../../close-button';
import { PositionTypeIcon } from '../../position-type-icon';
import { Tooltip } from '../../tooltip';
import { modalsStyle } from '../modals-style';
import modalsStyles from '../modals.module.scss';
import styles from './open-position-modal.module.scss';
import { useOpenPositionModalViewModel } from './use-open-position-modal.vm';

interface Props {
  marketId: Undefined<MarketId>;
  recommendedPositionType: Undefined<PositionType>;
}

const POSITION_OPTIONS = [
  { label: 'Long', value: PositionType.LONG },
  { label: 'Short', value: PositionType.SHORT }
];

export const OpenPositionModal: FC<Props> = observer(({ marketId, recommendedPositionType }) => {
  const {
    market,
    isOpen,
    balance,
    closeModalHandler,
    handleSubmit,
    submitDisabled,
    isLoading,
    error,
    positionType,
    value,
    handleChange,
    leverage,
    setPositionType,
    handleLeverageChange,
    slippagePercentage,
    positionSize,
    positionSizeUsd
  } = useOpenPositionModalViewModel(marketId, recommendedPositionType);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={modalsStyles.heading}>
        <CloseButton onClick={closeModalHandler} className={modalsStyles.closeButton} />
        Open <span className={modalsStyles.market}>{marketId}</span> position
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Switcher value={positionType} options={POSITION_OPTIONS} onClick={setPositionType} />
          <PositionTypeIcon type={positionType} />
        </div>
        <div className={styles.info}>
          <div>
            Margin <Tooltip content="Wished collateral amount to open a position" />
          </div>
          <div>Balance: {formatValueBalance(balance)} KDAI</div>
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
            disabled={isLoading}
          />
        </div>
        <div className={styles.info}>
          <div>
            Leverage: <b style={{ color: '#fff', marginRight: 8 }}>{leverage}</b>
            <Tooltip content="Multiplier of the open position value in relation to the collateral provided" />
          </div>
        </div>
        <LeverageSlider value={leverage} onChange={handleLeverageChange} disabled={isLoading} />
        <p style={{ color: 'red' }}>{error}</p>
        <div className={styles.additionalInfo}>
          <Cell label="Min. receive" tooltip="Minimum amount of the received asset">
            <TokensView amount={positionSize} suffix={marketId} dollarEquivalent={positionSizeUsd} />
          </Cell>
          <Cell label="Current price" tooltip="Current market price of the asset">
            <GetUsdView amount={market?.marketPriceUsd ?? 0} />
          </Cell>
        </div>
        <div className={styles.footer}>
          <Cell
            label="Slippage"
            tooltip="Maximum price deviation between the current price and when the transaction is confirmed on the blockchain"
          >
            <PercentView amount={slippagePercentage} />
          </Cell>
          <Button type="submit" disabled={submitDisabled} className={styles.opButton} loading={isLoading}>
            Open {positionType} position
          </Button>
        </div>
      </form>
    </Modal>
  );
});
