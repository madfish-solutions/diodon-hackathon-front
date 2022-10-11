import { FC, useRef } from 'react';

import { observer } from 'mobx-react-lite';

import { MarketData } from '@api/markets';
import { defined } from '@shared/types';

import { MarketInfo } from './components/market-info';
import { PositionItem } from './components/position-item';
import { PositionItemFull } from './components/position-item-full';
import styles from './market-item.module.scss';
import { useMarketItemViewModel } from './use-market-item.vm';

interface Props {
  market: MarketData;
  isOpened: boolean;
  toggleMarketHandler: (element: HTMLDivElement) => void;
}

export const MarketItem: FC<Props> = observer(({ market, isOpened, toggleMarketHandler }) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    chartData,
    position,
    openHandler,
    openManageModal,
    isConnected,
    marketPriceChangePercentage,
    indexPriceChangePercentage
  } = useMarketItemViewModel(market);

  return (
    <div className={styles.itemButton} ref={ref}>
      <div className={styles.item}>
        <MarketInfo
          market={market}
          marketPriceChangePercentage={marketPriceChangePercentage}
          indexPriceChangePercentage={indexPriceChangePercentage}
          isConnected={isConnected}
          onOpen={openHandler}
          position={position}
          onClick={() => toggleMarketHandler(defined(ref.current))}
        />
        {isOpened && <PositionItemFull position={position} chartData={chartData} openManageModal={openManageModal} />}
        {position && !isOpened && <PositionItem position={position} openManageModal={openManageModal} />}
      </div>
    </div>
  );
});
