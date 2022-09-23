import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { CardCell } from '@components/card-cell';
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
  const { position, openHandler, manageHandler, isConnected } = useMarketItemViewModel(market.marketId);

  return (
    <div className={styles.item}>
      <div className={styles.market}>
        <div style={{ textAlign: 'center', marginRight: 8 }}>
          <MarketIcon marketId={market.marketId} width={48} height={48} />
          <div>
            <b>{market.marketId}</b>
          </div>
        </div>
        <div className={styles.details}>
          <CardCell label="Market Price" className={styles.cardCell}>
            {getUsdView(market.marketPriceUsd)}
          </CardCell>
          <CardCell label="Index Price" className={styles.cardCell}>
            {getUsdView(market.indexPriceUsd)}
          </CardCell>
          <CardCell label="Funding rate 8h" className={styles.cardCell}>
            {getPercentView(market.fundingRateChange8Percent)}
          </CardCell>
          <CardCell label="Volume 24h" className={styles.cardCell}>
            {getUsdView(market.volume24Usd)}
          </CardCell>
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
          <PositionTypeIcon type={position.type} width={64} height={64} style={{ marginRight: 8 }} />
          <div className={styles.detailsPosition}>
            <CardCell label="Amount" className={styles.cardCell}>
              {getTokensView(position.amountTokens)}
            </CardCell>
            <CardCell label="Profit / Loss" className={styles.cardCell}>
              {getPercentView(position.pnlPercent)}
            </CardCell>
            <CardCell label="Avg Open Price" className={styles.cardCell}>
              {getUsdView(position.avgOpenPriceUsd)}
            </CardCell>
            <CardCell label="Liquidity 1 Price" className={styles.cardCell}>
              {getUsdView(position.liqPrice1Usd)}
            </CardCell>
          </div>
          <div className={styles.button}>
            <Button onClick={manageHandler} className={styles.manageButton}>
              Manage
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
});
