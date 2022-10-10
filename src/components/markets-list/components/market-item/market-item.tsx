import { FC, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';

import { MarketInfo } from './components/market-info';
import { PositionItem } from './components/position-item';
import { PositionItemFull } from './components/position-item-full';
import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
}

export const MarketItem: FC<Props> = observer(({ market }) => {
  const [fullView, seFullView] = useState(false);
  const {
    chartData,
    position,
    positionBeingClosed,
    openHandler,
    closeHandler,
    isConnected,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  } = useMarketItemViewModel(market);

  return (
    <div className={styles.itemButton} onClick={() => seFullView(prev => !prev)}>
      <div className={styles.item}>
        <MarketInfo
          market={market}
          marketPriceChangePercentage={marketPriceChangePercentage}
          indexPriceChangePercentage={indexPriceChangePercentage}
          isConnected={isConnected}
          onOpen={openHandler}
          position={position}
        />
        {fullView && (
          <PositionItemFull
            position={position}
            chartData={chartData}
            onClose={closeHandler}
            positionBeingClosed={positionBeingClosed}
          />
        )}
        {position && !fullView && (
          <PositionItem position={position} onClose={closeHandler} positionBeingClosed={positionBeingClosed} />
        )}
      </div>
    </div>
  );
});
