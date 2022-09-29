import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { Cell } from '@components/card-cell';
import { Button } from '@shared/components';
import { MarketIcon } from '@shared/components/market-icon';
import { PositionTypeIcon } from '@shared/components/position-type-icon';
import { getPercentView, getTokensView, getUsdView } from '@shared/helpers';
import { CloseIcon } from '@shared/svg/close-icon';

import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const { position, positionBeingClosed, openHandler, closeHandler, isConnected } = useMarketItemViewModel(
    market.marketId
  );

  return (
    <div className={styles.item}>
      <div className={styles.market}>
        <div style={{ textAlign: 'start', marginRight: 8, minWidth: '110px' }}>
          <MarketIcon marketId={market.marketId} width={48} height={48} />
          <div>
            <b>{market.marketId}</b>
          </div>
        </div>
        <div className={styles.details}>
          <Cell label="Market Price" className={styles.Cell}>
            {getUsdView(market.marketPriceUsd)}
          </Cell>
          <Cell label="Index Price" className={styles.Cell}>
            {getUsdView(market.indexPriceUsd)}
          </Cell>
          <Cell label="Funding rate 8h" className={styles.Cell}>
            {getPercentView(market.fundingRateChange8Percent)}
          </Cell>
          <Cell label="Volume 24h" className={styles.Cell}>
            {getUsdView(market.volume24Usd)}
          </Cell>
        </div>
        {!position ? (
          <div className={styles.button}>
            <p>
              <Button onClick={openHandler} className={styles.openButton} disabled={!isConnected}>
                Open
              </Button>
            </p>
          </div>
        ) : (
          <div className={styles.closeButton}>
            <CloseIcon />
          </div>
        )}
      </div>
      {position ? (
        <div className={styles.position}>
          <div className={styles.positionTypeWrapper}>
            <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
          </div>
          <div className={styles.detailsPosition}>
            <Cell label="Amount" className={styles.Cell}>
              {getTokensView(position.amountTokens)}
            </Cell>
            <Cell label="Profit / Loss" className={styles.Cell}>
              {getPercentView(position.pnlPercent)}
            </Cell>
            <Cell label="Avg Open Price" className={styles.Cell}>
              {getUsdView(position.avgOpenPriceUsd)}
            </Cell>
            <Cell label="Liquidity 1 Price" className={styles.Cell}>
              {getUsdView(position.liqPrice1Usd)}
            </Cell>
          </div>
          <div className={styles.button}>
            <Button onClick={closeHandler} className={styles.manageButton} disabled={positionBeingClosed}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
});
