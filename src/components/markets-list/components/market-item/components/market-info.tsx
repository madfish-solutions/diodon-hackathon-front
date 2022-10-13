import { FC, HTMLProps } from 'react';

import { MarketData } from '@api/markets';
import { MarketIcon } from '@shared/components/market-icon';
import { GetUsdView, PercentView, TokensView } from '@shared/helpers';
import { CloseIcon } from '@shared/svg';
import { DownIcon } from '@shared/svg/down-icon';

import { Cell } from '../../../../cell';
import styles from '../market-item.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  market: MarketData;
  marketPriceChangePercentage: number;
  indexPriceChangePercentage: number;
  isConnected: boolean;
  isOpened: boolean;
}

export const MarketInfo: FC<Props> = ({
  market,
  marketPriceChangePercentage,
  indexPriceChangePercentage,
  isConnected,
  isOpened,
  ...props
}) => {
  return (
    <div className={styles.market} {...props}>
      <div style={{ textAlign: 'start', minWidth: '100px' }}>
        <div style={{ textAlign: 'center', width: 50 }}>
          <div>
            <MarketIcon className={styles.marketItem} marketId={market.marketId} width={48} height={48} />
          </div>
          <div>
            <b>{market.marketId}</b>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <Cell label="Market Price" className={styles.Cell} tooltip="Asset price on the Diodon Finance platform">
          <GetUsdView amount={market.marketPriceUsd} percentEquivalent={marketPriceChangePercentage} />
        </Cell>
        <Cell label="Index Price" className={styles.Cell} tooltip="Actual asset price on the foreign market">
          <GetUsdView amount={market.indexPriceUsd} percentEquivalent={indexPriceChangePercentage} />
        </Cell>
        <Cell
          label="Funding rate 1h"
          className={styles.Cell}
          tooltip="Variable used to balance open long and short positions. Longs pay shorts if positive, shorts pay longs if negative"
        >
          <PercentView amount={market.fundingRateChangePercentage} decimalPlaces={4} />
        </Cell>
        <Cell
          label="Volume 24h"
          className={styles.Cell}
          tooltip="Total value of long and short positions for the last 24 hours"
        >
          <TokensView prefix="$" amount={market.volume24Usd} />
        </Cell>
      </div>
      <div className={styles.lastElementWrapper} style={{ cursor: 'pointer' }}>
        {isOpened ? <CloseIcon /> : <DownIcon />}
      </div>
    </div>
  );
};
