import { FC } from 'react';

import { AccountData } from '@api/account';
import { getUsdView } from '@shared/helpers';

import styles from './account-data-info.module.scss';

interface Props {
  data: AccountData;
}

export const AccountDataInfo: FC<Props> = ({ data }) => (
  <div className={styles.root}>
    <dl>
      <dt>
        <b>Buying Power:</b>
      </dt>
      <dd style={{ marginBottom: 8 }}>
        <b>{getUsdView(data.buyingPower)}</b>
      </dd>

      <dt>Net Collateral:</dt>
      <dd style={{ marginBottom: 8 }}>{getUsdView(data.netCollateralUsd)}</dd>

      <dt>Free Collateral:</dt>
      <dd style={{ marginBottom: 8 }}>{getUsdView(data.freeCollateralUsd)}</dd>

      <dt>Margin Ratio:</dt>
      <dd style={{ marginBottom: 8 }}>{data.marginRatioPercent}%</dd>

      <dt>Leverage:</dt>
      <dd style={{ marginBottom: 8 }}>{data.leverage}</dd>
    </dl>
  </div>
);
