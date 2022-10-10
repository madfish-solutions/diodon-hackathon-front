import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';

import { MarketInfo } from './components/market-info';
import { PositionItem } from './components/position-item';
import { PositionItemFull } from './components/position-item-full';
import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
  isOpened: boolean;
  toggleMarketHandler: () => void;
}

export const MarketItem: FC<Props> = observer(({ market, isOpened, toggleMarketHandler }) => {
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
    <div className={styles.itemButton}>
      <div className={styles.item}>
        <MarketInfo
          market={market}
          marketPriceChangePercentage={marketPriceChangePercentage}
          indexPriceChangePercentage={indexPriceChangePercentage}
          isConnected={isConnected}
          onOpen={openHandler}
          position={position}
          onClick={toggleMarketHandler}
        />
        {isOpened && (
          <PositionItemFull
            position={position}
            chartData={chartData}
            onClose={closeHandler}
            positionBeingClosed={positionBeingClosed}
          />
        )}
        {position && !isOpened && (
          <PositionItem position={position} onClose={closeHandler} positionBeingClosed={positionBeingClosed} />
        )}
      </div>
    </div>
  );
});
