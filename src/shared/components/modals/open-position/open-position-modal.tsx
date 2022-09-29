import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Side } from '@blockchain/facades/types';
import { Cell } from '@components/card-cell';
import { Button } from '@shared/components/button';
import { Switcher } from '@shared/components/switcher';
import { CloseIcon } from '@shared/svg';

import { formatValueBalance, getPercentView, getUsdView } from '../../../helpers';
import { MarketId, Undefined } from '../../../types';
import { modalsStyle } from '../modals-style';
import modalsStyles from '../modals.module.scss';
import { LeverageSlider } from './components';
import styles from './open-position-modal.module.scss';
import { useOpenPositionModalViewModel } from './use-open-position-modal.vm';

interface Props {
  marketId: Undefined<MarketId>;
}

const POSITION_OPTIONS = [
  { label: 'Long', value: Side.BUY },
  { label: 'Short', value: Side.SELL }
];

export const OpenPositionModal: FC<Props> = observer(({ marketId }) => {
  const {
    market,
    isOpen,
    maxValue,
    closeModalHandler,
    handleSubmit,
    isSubmitting,
    error,
    positionType,
    positionTypeName,
    value,
    handleChange,
    leverage,
    setPositionType,
    handleLeverageChange
  } = useOpenPositionModalViewModel(marketId);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={modalsStyles.heading}>
        <CloseIcon onClick={closeModalHandler} className={styles.closeButton} />
        Open <span className={modalsStyles.market}>{marketId}</span> position
      </h2>
      <form onSubmit={handleSubmit}>
        <Switcher value={positionType} options={POSITION_OPTIONS} onClick={setPositionType} />
        <div className={styles.info}>
          <div>Margin</div>
          <div>Balance: {formatValueBalance(maxValue)}</div>
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
          <Cell label={'Min. receive'}>{getUsdView(123)}</Cell>
          <Cell label="Current price">{getUsdView(123)}</Cell>
        </div>
        <div className={styles.footer}>
          <Cell label="Slippage">{getPercentView(0.23)}</Cell>
          <Button type="submit" disabled={isSubmitting} className={styles.opButton}>
            Open {positionTypeName} position
          </Button>
        </div>
      </form>
    </Modal>
  );
});
