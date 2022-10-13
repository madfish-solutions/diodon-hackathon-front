import { FC } from 'react';

import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { Cell } from '@components/cell';
import { SLIPPAGE_PERCENTAGE } from '@config/constants';
import { Button } from '@shared/components/button';
import { LeverageSlider } from '@shared/components/leverage-slider';

import { formatValueBalance, GetUsdView, PercentView, TokensView } from '../../../helpers';
import { MarketId, Undefined } from '../../../types';
import { CloseButton } from '../../close-button';
import { Switcher } from '../../switcher';
import { modalsStyle } from '../modals-style';
import modalsStyles from '../modals.module.scss';
import styles from '../open-position/open-position-modal.module.scss';
import { FORMS_OPTIONS, useManagePositionModalViewModel } from './use-manage-position-modal.vm';

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
    positionSizeUsd,
    formType,
    toggleFormType,
    isDeposit,
    isLoading,
    submitDisabled
  } = useManagePositionModalViewModel(marketId);

  if (!market) {
    throw new Error('Market is not defined');
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModalHandler} style={modalsStyle}>
      <h2 className={modalsStyles.heading}>
        <CloseButton onClick={closeModalHandler} className={modalsStyles.closeButton} />
        Manage <span className={modalsStyles.market}>{marketId}</span> position
      </h2>

      <div style={{ width: 318 }}>
        <form onSubmit={handleSubmit}>
          <Switcher value={formType} options={FORMS_OPTIONS} onClick={toggleFormType} />

          {isDeposit ? (
            <>
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
                  disabled={isLoading || submitDisabled}
                />
              </div>
              <div className={styles.info}>
                <div>Leverage</div>
              </div>
              <LeverageSlider value={leverage} onChange={handleLeverageChange} disabled={isLoading || submitDisabled} />
              <p style={{ color: 'red' }}>{error}</p>
              <div className={styles.additionalInfo}>
                <Cell label="Min. new position size">
                  <TokensView amount={positionSize} suffix={marketId} dollarEquivalent={positionSizeUsd} />
                </Cell>
                <Cell label="Current price">
                  <GetUsdView amount={market?.marketPriceUsd ?? 0} />
                </Cell>
              </div>
            </>
          ) : (
            <div>
              <div className={styles.additionalInfo}>
                <Cell label="Position size">
                  <TokensView amount={positionSize} suffix={marketId} dollarEquivalent={positionSizeUsd} />
                </Cell>
                <Cell label="Current price">
                  <GetUsdView amount={market?.marketPriceUsd ?? 0} />
                </Cell>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <Cell label="Slippage">
              <PercentView amount={SLIPPAGE_PERCENTAGE} />
            </Cell>
            {isDeposit ? (
              <Button type="submit" disabled={positionBeingChanged || submitDisabled} loading={isLoading}>
                Increase position
              </Button>
            ) : (
              <Button
                type="button"
                onClick={closePosition}
                disabled={positionBeingChanged || submitDisabled}
                loading={isLoading}
              >
                Fully close position
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
});
