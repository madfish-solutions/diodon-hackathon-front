import { FC } from 'react';

import { AccountData } from '@api/account';
import { Button } from '@shared/components';
import { GetUsdView } from '@shared/helpers';
import { useModalsStore } from '@shared/hooks';
import { ModalType } from '@shared/store/modals.store';

import { MarginSlider } from '../margin-slider';
import styles from './account-data-info.module.scss';

interface Props {
  data: AccountData;
}

export const AccountDataInfo: FC<Props> = ({ data }) => {
  const modalsStore = useModalsStore();

  const handleDeposit = () => {
    modalsStore.open(ModalType.Deposit);
  };

  const handleWithraw = () => {
    modalsStore.open(ModalType.Withdraw);
  };

  return (
    <div className={styles.root}>
      <dl>
        <dt>
          <b>Buying Power:</b>
        </dt>
        <dd style={{ marginBottom: 8 }}>
          <b>
            <GetUsdView amount={data.buyingPowerUsd} percentEquivalent={23} />
          </b>
        </dd>

        <dt>Net Collateral:</dt>
        <dd style={{ marginBottom: 8 }}>
          <GetUsdView amount={data.netCollateralUsd} percentEquivalent={23} />
        </dd>

        <dt>Free Collateral:</dt>
        <dd style={{ marginBottom: 8 }}>
          <GetUsdView amount={data.freeCollateralUsd} percentEquivalent={23} />
        </dd>

        <dt>Margin Ratio:</dt>
        <dd style={{ marginBottom: 8 }}>{data.marginRatioPercent}%</dd>

        <dt>Leverage:</dt>
        <dd style={{ marginBottom: 8 }}>{data.leverage}</dd>
      </dl>
      <MarginSlider value={data.marginRatioPercent} />
      <p>
        <Button onClick={handleDeposit}>Deposit</Button>
        <Button onClick={handleWithraw}>Withdraw</Button>
      </p>
    </div>
  );
};
